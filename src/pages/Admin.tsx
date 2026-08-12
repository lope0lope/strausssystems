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
      .select("id,title,published,sort_order,created_at")
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
    if (!file) return toast.error("Choose an HTML file");
    setBusy(true);
    const html = await file.text();
    const { error } = await supabase.from("work_posts").insert({
      title: title.trim() || file.name.replace(/\.html?$/i, ""),
      html,
      sort_order: posts.length,
      created_by: session?.user.id ?? null,
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Post published to the Our Work carousel");
    setTitle("");
    setFile(null);
    (document.getElementById("html-file") as HTMLInputElement | null)?.value &&
      ((document.getElementById("html-file") as HTMLInputElement).value = "");
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

  const inputClass =
    "w-full bg-ink border border-cream/15 rounded-sm px-4 py-3 text-cream placeholder:text-muted-text focus:outline-none focus:border-gold";
  const btnClass =
    "text-[0.8rem] font-medium tracking-[0.08em] uppercase text-gold border border-gold px-5 py-3 rounded-sm hover:bg-gold hover:text-ink transition-colors disabled:opacity-50";

  return (
    <>
      <Helmet>
        <title>Post Manager | Strauss-Strategies</title>
        <meta name="description" content="Private area for publishing case study posts to the Strauss-Strategies work carousel." />
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <main className="min-h-screen bg-ink px-[5vw] py-20">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 text-[0.72rem] font-medium tracking-[0.18em] uppercase text-gold mb-4">
            <span className="inline-block w-6 h-px bg-gold" />
            Post Manager
          </div>
          <h1 className="font-serif text-[clamp(2rem,3.5vw,3rem)] font-light text-cream mb-10">
            Publish a <em className="italic text-gold-light">case study</em>
          </h1>

          {checking ? (
            <p className="text-cream/60">Loading…</p>
          ) : !session ? (
            <form onSubmit={handleAuth} className="max-w-sm space-y-4">
              <input className={inputClass} type="email" placeholder="Email" value={email} required onChange={(e) => setEmail(e.target.value)} />
              <input className={inputClass} type="password" placeholder="Password" value={password} required minLength={6} onChange={(e) => setPassword(e.target.value)} />
              <button className={btnClass} disabled={busy} type="submit">
                {mode === "signin" ? "Sign in" : "Create account"}
              </button>
              <button type="button" onClick={handleGoogle} className="block text-[0.8rem] tracking-[0.08em] uppercase text-cream/70 border border-cream/20 px-5 py-3 rounded-sm hover:border-gold hover:text-gold transition-colors">
                Continue with Google
              </button>
              <button type="button" className="text-[0.8rem] text-muted-text hover:text-gold" onClick={() => setMode(mode === "signin" ? "signup" : "signin")}>
                {mode === "signin" ? "Need an account? Create one" : "Already have an account? Sign in"}
              </button>
            </form>
          ) : !isAdmin ? (
            <div className="space-y-4">
              <p className="text-cream/70">This account does not have publishing access.</p>
              <button className={btnClass} onClick={() => supabase.auth.signOut()}>Sign out</button>
            </div>
          ) : (
            <div className="space-y-12">
              <div className="flex items-center justify-between">
                <p className="text-[0.85rem] text-muted-text">Signed in as {session.user.email}</p>
                <button className="flex items-center gap-2 text-[0.8rem] text-muted-text hover:text-gold" onClick={() => supabase.auth.signOut()}>
                  <LogOut className="w-4 h-4" /> Sign out
                </button>
              </div>

              <form onSubmit={handleUpload} className="space-y-4 border border-cream/[0.08] rounded-sm p-8 bg-ink-soft">
                <label className="block text-[0.75rem] tracking-[0.12em] uppercase text-gold">Title</label>
                <input className={inputClass} value={title} placeholder="e.g. CrocTrack — KZN Case Study" onChange={(e) => setTitle(e.target.value)} />
                <label className="block text-[0.75rem] tracking-[0.12em] uppercase text-gold pt-2">HTML file</label>
                <input id="html-file" className={inputClass} type="file" accept=".html,.htm,text/html" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
                <button className={`${btnClass} flex items-center gap-2`} disabled={busy} type="submit">
                  <Upload className="w-4 h-4" /> Publish post
                </button>
              </form>

              <div>
                <h2 className="font-serif text-2xl text-cream mb-4">Existing posts</h2>
                {posts.length === 0 ? (
                  <p className="text-cream/60">No posts yet.</p>
                ) : (
                  <ul className="space-y-3">
                    {posts.map((p) => (
                      <li key={p.id} className="flex items-center justify-between gap-4 border border-cream/[0.08] rounded-sm px-5 py-4 bg-ink-soft">
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
