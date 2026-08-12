import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type WorkPost = {
  id: string;
  title: string;
  html: string;
};

const CasesSection = () => {
  const [posts, setPosts] = useState<WorkPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

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
        <div className="mt-16 h-[600px] rounded-sm border border-cream/[0.08] bg-ink animate-pulse" />
      ) : count === 0 ? (
        <p className="mt-16 text-cream/60">Case studies are on their way.</p>
      ) : (
        <div className="mt-12">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h3 className="font-serif text-xl text-cream truncate">{posts[index].title}</h3>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[0.75rem] tracking-[0.12em] text-muted-text">
                {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous case study"
                className="w-9 h-9 grid place-items-center rounded-sm border border-cream/15 text-cream hover:border-gold hover:text-gold transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next case study"
                className="w-9 h-9 grid place-items-center rounded-sm border border-cream/15 text-cream hover:border-gold hover:text-gold transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-sm border border-cream/[0.08] bg-ink">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold to-gold/20 z-10" />
            <iframe
              key={posts[index].id}
              title={posts[index].title}
              srcDoc={posts[index].html}
              sandbox="allow-scripts allow-popups"
              loading="lazy"
              className="w-full h-[720px] md:h-[820px] border-0 block"
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
                    : "border-cream/15 text-cream/60 hover:text-cream hover:border-gold/50"
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
