import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { caseStudies, type CaseStudy } from "@/content/caseStudies";
import Tablet3D from "@/components/Tablet3D";

type WorkPost = {
  id: string;
  title: string;
  description: string | null;
  gif_url: string | null;
};

type WorkSlide = {
  id: string;
  title: string;
  description: string;
  gif: string | null;
  story?: CaseStudy;
};

const projectOrder = ["easy-shelf-point", "hospital-workflow", "kzn-auction", "croctrack"];

const CasesSection = () => {
  const [posts, setPosts] = useState<WorkPost[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "previous">("next");
  const [dragStart, setDragStart] = useState<number | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const stories = useMemo(() => projectOrder.map((id) => caseStudies.find((story) => story.id === id)).filter((story): story is CaseStudy => Boolean(story)), []);

  useEffect(() => {
    supabase
      .from("work_posts")
      .select("id,title,description,gif_url")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false })
      .then(({ data }) => setPosts(data ?? []));
  }, []);

  const slides: WorkSlide[] = posts.length > 0
    ? posts.map((post) => ({
        id: post.id,
        title: post.title,
        description: post.description || "A project preview from Strauss-Strategies.",
        gif: post.gif_url,
      }))
    : stories.map((story) => ({
        id: story.id,
        title: story.name,
        description: story.oneLiner,
        gif: story.id === "croctrack" ? "/croc.gif" : null,
        story,
      }));

  useEffect(() => {
    setActiveIndex((index) => Math.min(index, Math.max(slides.length - 1, 0)));
  }, [slides.length]);

  const move = (nextIndex: number, nextDirection: "next" | "previous") => {
    setDirection(nextDirection);
    setActiveIndex((nextIndex + slides.length) % slides.length);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    setDragStart(event.clientX);
    viewportRef.current?.setPointerCapture(event.pointerId);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStart === null) return;
    const distance = event.clientX - dragStart;
    if (Math.abs(distance) > 48) move(activeIndex + (distance < 0 ? 1 : -1), distance < 0 ? "next" : "previous");
    setDragStart(null);
  };

  const current = slides[activeIndex];
  if (!current) return null;

  return (
    <section className="section-band bg-dark text-dark-foreground" id="work">
      <div className="site-shell">
        <div className="grid grid-cols-1 lg:grid-cols-[0.7fr_1.3fr] gap-10 items-end mb-14 reveal">
          <div className="eyebrow text-gold"><span className="inline-block w-6 h-px bg-gold" />Our Work</div>
          <h2 className="section-title text-dark-foreground">Systems built around real operations, not templates.</h2>
        </div>

        <div
          ref={viewportRef}
          className="work-carousel reveal"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => setDragStart(null)}
          role="region"
          aria-roledescription="carousel"
          aria-label="Project previews"
        >
          <div className={`work-carousel__slide work-carousel__slide--${direction}`} key={current.id} aria-live="polite">
            <div className="work-carousel__visual">
              <Tablet3D title={current.title} gif={current.gif ?? undefined} />
            </div>
            <div className="project-copy work-carousel__copy">
              <div className="technical-label text-gold">0{activeIndex + 1} / {String(slides.length).padStart(2, "0")}</div>
              <h3>{current.title}</h3>
              <p>{current.description}</p>
              {current.story && (
                <div className="project-outcome"><span>Outcome</span><strong>{current.story.stat}</strong></div>
              )}
              <div className="work-carousel__meta">
                <span>Animated project preview</span>
                <span>Swipe or use the arrows to browse</span>
              </div>
            </div>
          </div>

          <div className="work-carousel__footer">
            <div className="work-carousel__count" aria-label={`Project ${activeIndex + 1} of ${slides.length}`}>
              <strong>{String(activeIndex + 1).padStart(2, "0")}</strong><span>/ {String(slides.length).padStart(2, "0")}</span>
            </div>
            <div className="work-carousel__controls">
              <Button variant="ghost" size="icon" className="work-carousel__arrow" onPointerDown={(event) => event.stopPropagation()} onClick={() => move(activeIndex - 1, "previous")} aria-label="Previous project">
                <ArrowLeft />
              </Button>
              <Button variant="ghost" size="icon" className="work-carousel__arrow" onPointerDown={(event) => event.stopPropagation()} onClick={() => move(activeIndex + 1, "next")} aria-label="Next project">
                <ArrowRight />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CasesSection;
