import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Monitor, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { caseStudies, type CaseStudy } from "@/content/caseStudies";

type WorkPost = { id: string; title: string; html: string };

const withAutoHeight = (html: string, id: string) => {
  const script = `<script>(function(){var id=${JSON.stringify(id)};function send(){var d=document.documentElement,b=document.body;var h=Math.max(d.scrollHeight,b?b.scrollHeight:0,d.offsetHeight,b?b.offsetHeight:0);parent.postMessage({__postHeight:true,id:id,height:h},'*')}window.addEventListener('load',send);window.addEventListener('resize',send);if(window.ResizeObserver){new ResizeObserver(send).observe(document.documentElement)}setInterval(send,500);send()})();<\/script>`;
  return html.includes("</body>") ? html.replace("</body>", script + "</body>") : html + script;
};

const projectOrder = ["easy-shelf-point", "hospital-workflow", "kzn-auction", "croctrack"];
const visualType: Record<string, "phone" | "browser"> = {
  "easy-shelf-point": "phone",
  "hospital-workflow": "browser",
  "kzn-auction": "browser",
  croctrack: "phone",
};

const ProjectVisual = ({ story }: { story: CaseStudy }) => {
  const phone = visualType[story.id] === "phone";
  return (
    <div className={`project-visual ${phone ? "project-visual--phone" : "project-visual--browser"}`}>
      {phone ? (
        <div className="phone-frame" aria-label={`Placeholder for a ${story.name} app screenshot`}>
          <div className="phone-speaker" />
          <div className="phone-screen">
            <div className="mock-kicker">{story.name}</div>
            <div className="mock-heading">Operations</div>
            <div className="mock-metrics"><span /><span /></div>
            <div className="mock-rows"><span /><span /><span /><span /></div>
          </div>
        </div>
      ) : (
        <div className="product-window" aria-label={`Placeholder for a ${story.name} interface screenshot`}>
          <div className="window-bar"><span /><span /><span /><small>{story.name}</small></div>
          <div className="window-body">
            <div className="mock-sidebar" />
            <div className="mock-dashboard">
              <div className="mock-kicker">SYSTEM OVERVIEW</div>
              <div className="mock-heading">Live workflow</div>
              <div className="mock-metrics"><span /><span /><span /></div>
              <div className="mock-chart"><i /><i /><i /><i /><i /><i /></div>
              <div className="mock-rows"><span /><span /><span /></div>
            </div>
          </div>
        </div>
      )}
      <div className="visual-caption">Screenshot placeholder · replace when ready</div>
    </div>
  );
};

const CasesSection = () => {
  const [posts, setPosts] = useState<WorkPost[]>([]);
  const [openPost, setOpenPost] = useState<WorkPost | null>(null);
  const [heights, setHeights] = useState<Record<string, number>>({});
  const stories = useMemo(() => projectOrder.map((id) => caseStudies.find((story) => story.id === id)).filter((story): story is CaseStudy => Boolean(story)), []);

  useEffect(() => {
    supabase.from("work_posts").select("id,title,html").eq("published", true).order("sort_order", { ascending: true }).order("created_at", { ascending: false }).then(({ data }) => setPosts(data ?? []));
  }, []);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const data = event.data;
      if (data && data.__postHeight && typeof data.height === "number" && data.height > 0) {
        setHeights((previous) => Math.abs((previous[data.id] ?? 0) - data.height) > 2 ? { ...previous, [data.id]: data.height } : previous);
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const matchingPost = (story: CaseStudy) => posts.find((post) => {
    const haystack = `${post.title} ${story.name}`.toLowerCase();
    return story.name.toLowerCase().split(" ").some((word) => word.length > 4 && post.title.toLowerCase().includes(word)) || haystack.includes(story.id.replace(/-/g, " "));
  });

  return (
    <section className="section-band bg-dark text-dark-foreground" id="work">
      <div className="site-shell">
        <div className="grid grid-cols-1 lg:grid-cols-[0.7fr_1.3fr] gap-10 items-end mb-20 reveal">
          <div className="eyebrow text-gold"><span className="inline-block w-6 h-px bg-gold" />Our Work</div>
          <h2 className="section-title text-dark-foreground">Systems built around real operations, not templates.</h2>
        </div>

        <div className="space-y-28 lg:space-y-36">
          {stories.map((story, index) => {
            const post = matchingPost(story);
            return (
              <article key={story.id} id={`case-${story.id}`} className={`project-feature reveal ${index % 2 ? "project-feature--reverse" : ""}`}>
                <ProjectVisual story={story} />
                <div className="project-copy">
                  <div className="technical-label text-gold">0{index + 1} / {story.name}</div>
                  <h3>{story.headline}</h3>
                  <p>{story.oneLiner}</p>
                  <div className="project-outcome"><span>Outcome</span><strong>{story.stat}</strong></div>
                  <div className="before-after"><span><small>Before</small>{story.before}</span><span><small>After</small>{story.after}</span></div>
                  {post ? (
                    <Button variant="link" className="case-link" onClick={() => setOpenPost(post)}>View case study <ArrowUpRight /></Button>
                  ) : (
                    <a href={`#case-${story.id}`} className="case-link" aria-label={`View ${story.name} case study details`}>View case study <ArrowUpRight /></a>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {openPost && (
          <div className="published-post reveal" id="published-case-study">
            <div className="flex items-center justify-between gap-5 border-b border-dark-foreground/15 px-5 py-4">
              <h3 className="text-lg font-semibold">{openPost.title}</h3>
              <Button variant="ghost" className="text-dark-foreground hover:text-gold" onClick={() => setOpenPost(null)}>Close</Button>
            </div>
            <iframe title={openPost.title} srcDoc={withAutoHeight(openPost.html, openPost.id)} sandbox="allow-scripts allow-popups" scrolling="no" style={{ height: heights[openPost.id] ?? 820 }} className="block w-full border-0 bg-background" />
          </div>
        )}

        {posts.length > 0 && (
          <div className="mt-24 border-t border-dark-foreground/15 pt-8">
            <div className="technical-label text-dark-muted mb-5">Published case studies</div>
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              {posts.map((post) => <Button key={post.id} variant="link" className="case-link" onClick={() => setOpenPost(post)}>{post.title} <ArrowUpRight /></Button>)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CasesSection;