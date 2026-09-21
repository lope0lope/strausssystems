import { useLayoutEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";

const GRID_SIZE = 11;
const PULL_DISTANCE = 92;

const HeroGrid = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const cellCentersRef = useRef<Array<{ x: number; y: number }>>([]);
  const geometryFrameRef = useRef<number>();
  const [isBursting, setIsBursting] = useState(false);

  useLayoutEffect(() => {
    const updateCellCenters = () => {
      if (!gridRef.current) return;

      cellCentersRef.current = Array.from(
        gridRef.current.querySelectorAll<HTMLElement>(".hero-grid-cell"),
        (cell) => {
          const bounds = cell.getBoundingClientRect();
          return {
            x: bounds.left + bounds.width / 2,
            y: bounds.top + bounds.height / 2,
          };
        },
      );
    };

    const scheduleGeometryUpdate = () => {
      if (geometryFrameRef.current) cancelAnimationFrame(geometryFrameRef.current);
      geometryFrameRef.current = requestAnimationFrame(updateCellCenters);
    };

    updateCellCenters();
    window.addEventListener("resize", scheduleGeometryUpdate);
    window.addEventListener("scroll", scheduleGeometryUpdate, { passive: true });
    window.visualViewport?.addEventListener("resize", scheduleGeometryUpdate);
    window.visualViewport?.addEventListener("scroll", scheduleGeometryUpdate);
    const resizeObserver = new ResizeObserver(scheduleGeometryUpdate);
    if (gridRef.current) resizeObserver.observe(gridRef.current);

    return () => {
      window.removeEventListener("resize", scheduleGeometryUpdate);
      window.removeEventListener("scroll", scheduleGeometryUpdate);
      window.visualViewport?.removeEventListener("resize", scheduleGeometryUpdate);
      window.visualViewport?.removeEventListener("scroll", scheduleGeometryUpdate);
      resizeObserver.disconnect();
      if (geometryFrameRef.current) cancelAnimationFrame(geometryFrameRef.current);
    };
  }, []);

  const resetCells = () => {
    gridRef.current?.querySelectorAll<HTMLElement>(".hero-grid-cell").forEach((cell) => {
      cell.style.transform = "translate3d(0, 0, 0)";
    });
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (isBursting || !gridRef.current) return;

    gridRef.current.querySelectorAll<HTMLElement>(".hero-grid-cell").forEach((cell, index) => {
      const center = cellCentersRef.current[index];
      if (!center) return;

      const distanceX = event.clientX - center.x;
      const distanceY = event.clientY - center.y;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
      const amount = distance / PULL_DISTANCE;
      const scale = distance < PULL_DISTANCE ? 1 + (1 - amount) * 0.18 : 1;

      cell.style.transform = distance < PULL_DISTANCE
        ? `translate3d(${distanceX * amount}px, ${distanceY * amount}px, 0) scale(${scale})`
        : "translate3d(0, 0, 0) scale(1)";
    });
  };

  const triggerBurst = () => {
    if (isBursting) return;
    resetCells();
    setIsBursting(true);
    window.setTimeout(() => setIsBursting(false), 1600);
  };

  return (
    <div
      ref={gridRef}
      className={`hero-grid${isBursting ? " is-bursting" : ""}`}
      role="img"
      aria-label="Interactive grid of business systems"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetCells}
      onClick={triggerBurst}
    >
      {Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => (
        <span
          className="hero-grid-cell"
          key={index}
          style={{ "--cell-index": index } as CSSProperties}
        />
      ))}
    </div>
  );
};

const HeroSection = () => {
  return (
    <section id="hero" className="hero-section">
      <div className="site-shell hero-layout">
        <div className="hero-copy">
          <div className="animate-fade-up animate-delay-100 eyebrow">
            <span className="inline-block w-8 h-px bg-gold" />
            Business Systems Consulting · South Africa
          </div>
          <h1 className="animate-fade-up animate-delay-200 display-title mb-7">
            Your business has outgrown{" "}
            <span className="text-gold">the tools holding it together.</span>
          </h1>
          <p className="animate-fade-up animate-delay-300 text-[1.12rem] text-muted-text leading-[1.75] max-w-[600px] mb-10">
            We build custom software and operational systems for business owners who know exactly what problem they have — and need someone who can actually fix it.
          </p>
          <div className="animate-fade-up animate-delay-400 flex items-center gap-7 flex-wrap">
            <a
              href="https://calendly.com/jason-bookings/discover-call"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Book a Free Discovery Call
            </a>
            <a href="#work" className="text-link">See our work <span aria-hidden="true">↘</span></a>
          </div>
        </div>
        <HeroGrid />
      </div>
    </section>
  );
};

export default HeroSection;
