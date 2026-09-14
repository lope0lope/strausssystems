import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type WorkPost = {
  id: string;
  title: string;
  html: string;
};

const withAutoHeight = (html: string, id: string) => {
  const script = `<script>(function(){
    var id=${JSON.stringify(id)};
    function send(){
      var d=document.documentElement, b=document.body;
      var h=Math.max(d.scrollHeight,b?b.scrollHeight:0,d.offsetHeight,b?b.offsetHeight:0);
      parent.postMessage({__postHeight:true,id:id,height:h},'*');
    }
    window.addEventListener('load',send);
    window.addEventListener('resize',send);
    if(window.ResizeObserver){new ResizeObserver(send).observe(document.documentElement);}
    setInterval(send,500);
    send();
  })();<\/script>`;
  return html.includes("</body>") ? html.replace("</body>", script + "</body>") : html + script;
};

const CasesSection = () => {
  const [posts, setPosts] = useState<WorkPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [heights, setHeights] = useState<Record<string, number>>({});

  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      const d = e.data;
      if (d && d.__postHeight && typeof d.height === "number" && d.height > 0) {
        setHeights((prev) =>
          Math.abs((prev[d.id] ?? 0) - d.height) > 2 ? { ...prev, [d.id]: d.height } : prev
        );
      }
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);


  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("work_posts")
        .select("id,title,html")
        .eq("published", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });
      setPosts(data ?? []);
      setLoading(false);
    };
    load();
  }, []);

  const count = posts.length;
  const go = (dir: number) => setIndex((i) => (i + dir + count) % count);

  return (
    <section className="bg-ink-soft px-[5vw] py-24" id="work">
      <div className="flex items-center gap-3 text-[0.72rem] font-medium tracking-[0.18em] uppercase text-gold mb-4">
        <span className="inline-block w-6 h-px bg-gold" />
        Our Work
      </div>
      <h2 className="font-serif text-[clamp(2rem,3.5vw,3rem)] font-light leading-[1.2] text-cream">
        Problems solved.<br /><em className="italic text-gold-light">Results delivered.</em>
      </h2>

      {loading ? (
        <div className="mt-16 h-[600px] rounded-sm glass-panel animate-pulse" />
      ) : count === 0 ? (
        <p className="mt-16 text-cream/60">Case studies are on their way.</p>
      ) : (
        <div className="mt-12 glass-panel rounded-sm p-3 sm:p-5">
          <div className="flex items-center justify-between gap-4 mb-4 px-1">
            <h3 className="font-serif text-xl text-cream truncate">{posts[index].title}</h3>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[0.75rem] tracking-[0.12em] text-muted-text">
                {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous case study"
                className="w-9 h-9 grid place-items-center rounded-sm bg-cream/5 backdrop-blur-md border border-cream/15 text-cream hover:border-gold hover:text-gold hover:bg-gold/10 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next case study"
                className="w-9 h-9 grid place-items-center rounded-sm bg-cream/5 backdrop-blur-md border border-cream/15 text-cream hover:border-gold hover:text-gold hover:bg-gold/10 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-sm border border-cream/10 bg-ink/80 shadow-glass">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold to-gold/20 z-10" />
            <iframe
              key={posts[index].id}
              title={posts[index].title}
              srcDoc={withAutoHeight(posts[index].html, posts[index].id)}
              sandbox="allow-scripts allow-popups"
              loading="lazy"
              scrolling="no"
              style={{ height: heights[posts[index].id] ?? 820 }}
              className="w-full border-0 block overflow-hidden"
            />
          </div>


          <div className="flex flex-wrap gap-2 mt-5">
            {posts.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-current={i === index}
                className={`text-[0.72rem] tracking-[0.08em] px-3 py-2 rounded-sm border transition-colors ${
                  i === index
                    ? "bg-gold border-gold text-ink font-medium"
                    : "bg-cream/5 backdrop-blur-md border-cream/15 text-cream/60 hover:text-cream hover:border-gold/50"
                }`}
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default CasesSection;
