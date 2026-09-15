import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { caseStudies, type CaseStudy } from "@/content/caseStudies";

type WorkPost = {
  id: string;
  title: string;
  html: string;
};

type Slide =
  | { kind: "story"; id: string; title: string; story: CaseStudy }
  | { kind: "post"; id: string; title: string; html: string };

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

const StoryCard = ({ story }: { story: CaseStudy }) => (
  <div className="p-8 sm:p-12">
    <div className="text-[0.78rem] font-semibold tracking-[0.06em] uppercase text-gold mb-4">{story.name}</div>
    <h3 className="text-[clamp(1.6rem,2.6vw,2.4rem)] font-semibold leading-[1.1] text-cream mb-5 max-w-[16ch]">
      {story.headline}
    </h3>
    <p className="text-[1.05rem] text-muted-text leading-[1.75] max-w-[60ch] mb-8">{story.oneLiner}</p>

    <div className="inline-flex items-center rounded-full bg-gold-pale border border-gold/20 px-5 py-2 text-[0.92rem] font-medium text-gold mb-9">
      {story.stat}
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 sm:gap-6 items-center">
      <div className="rounded-[1.1rem] border border-cream/10 bg-ink-soft p-5">
        <div className="text-[0.72rem] uppercase tracking-[0.08em] text-muted-text mb-2">Before</div>
        <p className="text-[0.98rem] text-cream-mid leading-snug">{story.before}</p>
      </div>
      <ArrowRight className="w-5 h-5 text-gold mx-auto rotate-90 sm:rotate-0" aria-hidden />
      <div className="rounded-[1.1rem] border border-gold/25 bg-gold-pale p-5">
        <div className="text-[0.72rem] uppercase tracking-[0.08em] text-gold mb-2">After</div>
        <p className="text-[0.98rem] text-cream leading-snug font-medium">{story.after}</p>
      </div>
    </div>
  </div>
);

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

  const slides: Slide[] = [
    ...caseStudies.map<Slide>((s) => ({ kind: "story", id: s.id, title: s.name, story: s })),
    ...posts.map<Slide>((p) => ({ kind: "post", id: p.id, title: p.title, html: p.html })),
  ];

  const count = slides.length;
  const go = (dir: number) => setIndex((i) => (i + dir + count) % count);
  const current = slides[Math.min(index, count - 1)];

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
    if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
  };

  return (
    <section className="bg-ink-soft px-[5vw] py-28" id="work">
      <div className="reveal">
        <div className="eyebrow">
          <span className="inline-block w-6 h-px bg-gold" />
          Our Work
        </div>
        <h2 className="section-title">
          Problems solved. <span className="text-gold">Results delivered.</span>
        </h2>
      </div>

      {loading && count === 0 ? (
        <div className="mt-12 h-[420px] rounded-[1.6rem] glass-panel animate-pulse" />
      ) : (
        <div
          className="mt-12 glass-panel rounded-[1.6rem] p-3 sm:p-5 reveal"
          role="group"
          aria-roledescription="carousel"
          aria-label="Case studies"
          tabIndex={0}
          onKeyDown={onKeyDown}
        >
          <div className="flex items-center justify-between gap-4 mb-4 px-2">
            <h3 className="text-[1.05rem] font-semibold text-cream truncate">{current.title}</h3>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[0.8rem] text-muted-text tabular-nums">
                {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous case study"
                className="w-9 h-9 grid place-items-center rounded-full border border-cream/15 bg-card/70 text-cream hover:border-gold hover:text-gold transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next case study"
                className="w-9 h-9 grid place-items-center rounded-full border border-cream/15 bg-card/70 text-cream hover:border-gold hover:text-gold transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[1.3rem] border border-cream/10 bg-card shadow-glass">
            {current.kind === "story" ? (
              <StoryCard story={current.story} />
            ) : (
              <iframe
                key={current.id}
                title={current.title}
                srcDoc={withAutoHeight(current.html, current.id)}
                sandbox="allow-scripts allow-popups"
                loading="lazy"
                scrolling="no"
                style={{ height: heights[current.id] ?? 820 }}
                className="w-full border-0 block overflow-hidden"
              />
            )}
          </div>

          <div className="flex flex-wrap gap-2 mt-5">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-current={i === index}
                className={`text-[0.82rem] px-4 py-2 rounded-full border transition-colors ${
                  i === index
                    ? "bg-gold border-gold text-primary-foreground font-medium"
                    : "bg-card/70 border-cream/15 text-muted-text hover:text-cream hover:border-gold/50"
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default CasesSection;
