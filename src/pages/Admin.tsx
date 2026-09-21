import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { toast } from "sonner";
import { Trash2, Upload, LogOut, Eye, EyeOff } from "lucide-react";

type WorkPost = {
  id: string;
  title: string;
  description: string | null;
  project_url: string | null;
  html: string | null;
  published: boolean;
  sort_order: number;
  created_at: string;
};

const Admin = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [busy, setBusy] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [posts, setPosts] = useState<WorkPost[]>([]);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) {
      setIsAdmin(false);
      return;
    }
    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin")
      .maybeSingle()
      .then(({ data }) => setIsAdmin(!!data));
  }, [session]);

  const loadPosts = async () => {
    const { data } = await supabase
      .from("work_posts")
      .select("id,title,description,project_url,html,published,sort_order,created_at")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    setPosts(data ?? []);
  };

  useEffect(() => {
    if (isAdmin) loadPosts();
  }, [isAdmin]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const fn =
      mode === "signin"
        ? supabase.auth.signInWithPassword({ email, password })
        : supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: `${window.location.origin}/admin` },
          });
    const { error } = await fn;
    setBusy(false);
    if (error) toast.error(error.message);
    else if (mode === "signup") toast.success("Account created. Check your email if confirmation is required.");
  };

  const handleGoogle = async () => {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) toast.error("Google sign-in failed");
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectUrl.trim() && !file) return toast.error("Add a project URL or choose an HTML file");
    if (projectUrl.trim() && !/^https?:\/\//i.test(projectUrl.trim())) return toast.error("Project URL must start with http:// or https://");
    setBusy(true);
    const html = file ? await file.text() : null;
    const { error } = await supabase.from("work_posts").insert({
      title: title.trim() || file?.name.replace(/\.html?$/i, "") || projectUrl.trim(),
      description: description.trim() || null,
      project_url: projectUrl.trim() || null,
      html,
      sort_order: posts.length,
      created_by: session?.user.id ?? null,
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Post published to the Our Work carousel");
    setTitle("");
    setDescription("");
    setProjectUrl("");
    setFile(null);
    const fileInput = document.getElementById("html-file") as HTMLInputElement | null;
    if (fileInput) fileInput.value = "";
    loadPosts();
  };

  const togglePublish = async (p: WorkPost) => {
    const { error } = await supabase.from("work_posts").update({ published: !p.published }).eq("id", p.id);
    if (error) toast.error(error.message);
    else loadPosts();
  };

  const remove = async (p: WorkPost) => {
    const { error } = await supabase.from("work_posts").delete().eq("id", p.id);
    if (error) toast.error(error.message);
    else {
      toast.success("Post removed");
      loadPosts();
    }
  };

  const btnClass =
    "text-[0.8rem] font-medium tracking-[0.08em] uppercase text-gold border border-gold px-5 py-3 rounded-sm hover:bg-gold hover:text-primary-foreground transition-colors disabled:opacity-50";

  return (
    <>
      <Helmet>
        <title>Post Manager | Strauss-Strategies</title>
        <meta name="description" content="Private area for publishing case study posts to the Strauss-Strategies work carousel." />
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <main className="admin-page px-[5vw] py-20">
        <div className="max-w-3xl mx-auto">
          <div className="eyebrow mb-4">
            <span className="inline-block w-6 h-px bg-gold" />
            Post Manager
          </div>
          <h1 className="section-title mb-10">
            Publish a <em className="italic text-gold-light">case study</em>
          </h1>

          {checking ? (
            <p className="admin-status">Loading...</p>
          ) : !session ? (
            <form onSubmit={handleAuth} className="max-w-sm space-y-4">
              <input className="admin-input" type="email" placeholder="Email" value={email} required onChange={(e) => setEmail(e.target.value)} />
              <input className="admin-input" type="password" placeholder="Password" value={password} required minLength={6} onChange={(e) => setPassword(e.target.value)} />
              <button className={btnClass} disabled={busy} type="submit">
                {mode === "signin" ? "Sign in" : "Create account"}
              </button>
              <button type="button" onClick={handleGoogle} className="block text-[0.8rem] tracking-[0.08em] uppercase text-cream-mid border border-border px-5 py-3 rounded-sm hover:border-gold hover:text-gold transition-colors">
                Continue with Google
              </button>
              <button type="button" className="text-[0.8rem] text-muted-text hover:text-gold" onClick={() => setMode(mode === "signin" ? "signup" : "signin")}>
                {mode === "signin" ? "Need an account? Create one" : "Already have an account? Sign in"}
              </button>
            </form>
          ) : !isAdmin ? (
            <div className="space-y-4">
              <p className="text-cream-mid">This account does not have publishing access.</p>
              <button className={btnClass} onClick={() => supabase.auth.signOut()}>Sign out</button>
            </div>
          ) : (
            <div className="space-y-12">
              <div className="flex items-center justify-between">
                <p className="admin-status">Signed in as {session.user.email}</p>
                <button className="flex items-center gap-2 text-[0.8rem] text-muted-text hover:text-gold" onClick={() => supabase.auth.signOut()}>
                  <LogOut className="w-4 h-4" /> Sign out
                </button>
              </div>

              <form onSubmit={handleUpload} className="admin-panel space-y-4 p-8">
                <label className="block text-[0.75rem] tracking-[0.12em] uppercase text-gold">Title</label>
                <input className="admin-input" value={title} placeholder="e.g. CrocTrack - KZN Case Study" onChange={(e) => setTitle(e.target.value)} />
                <label className="block text-[0.75rem] tracking-[0.12em] uppercase text-gold pt-2">Short write-up</label>
                <textarea className="admin-input min-h-28 resize-y" value={description} placeholder="What did this project change?" onChange={(e) => setDescription(e.target.value)} />
                <label className="block text-[0.75rem] tracking-[0.12em] uppercase text-gold pt-2">Live project URL</label>
                <input className="admin-input" type="url" value={projectUrl} placeholder="https://your-project.com" onChange={(e) => setProjectUrl(e.target.value)} />
                <p className="admin-status">Use a live URL or upload an HTML page below.</p>
                <label className="block text-[0.75rem] tracking-[0.12em] uppercase text-gold pt-2">HTML page</label>
                <input id="html-file" className="admin-input admin-file" type="file" accept=".html,.htm,text/html" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
                <button className={`${btnClass} flex items-center gap-2`} disabled={busy} type="submit">
                  <Upload className="w-4 h-4" /> Add project
                </button>
              </form>

              <div>
                <h2 className="font-serif text-2xl text-cream mb-4">Existing posts</h2>
                {posts.length === 0 ? (
                  <p className="admin-status">No posts yet.</p>
                ) : (
                  <ul className="space-y-3">
                    {posts.map((p) => (
                      <li key={p.id} className="admin-panel flex items-center justify-between gap-4 px-5 py-4">
                        <span className="text-cream truncate">{p.title}</span>
                        <span className="flex items-center gap-4 shrink-0">
                          <button onClick={() => togglePublish(p)} className="text-muted-text hover:text-gold" aria-label={p.published ? "Unpublish" : "Publish"}>
                            {p.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          </button>
                          <button onClick={() => remove(p)} className="text-muted-text hover:text-destructive" aria-label="Delete post">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Admin;
