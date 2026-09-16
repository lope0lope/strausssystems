import { useSpotlight } from "@/hooks/useSpotlight";

const stats = [
  { label: "Years Experience", value: "7+" },
  { label: "Based In", value: "South Africa" },
  { label: "Industries Served", value: "Agri · Retail · Manufacturing" },
  { label: "Approach", value: "Build · Advise · Retain" },
];

const HeroSection = () => {
  const ref = useSpotlight<HTMLElement>();

  return (
    <section
      ref={ref}
      id="hero"
      className="hero-pattern relative isolate overflow-hidden px-[5vw] pt-36 pb-24 md:min-h-[92vh] flex items-center bg-ink-soft"
    >
      <div className="hero-pattern__field hero-pattern__field--one" aria-hidden="true" />
      <div className="hero-pattern__field hero-pattern__field--two" aria-hidden="true" />
      <div className="hero-pattern__grid" aria-hidden="true" />
      <div className="hero-pattern__grain" aria-hidden="true" />
      {/* cursor spotlight (pointer devices set --mx/--my) */}
      <div
        className="pointer-events-none absolute inset-0 -z-[1] opacity-70"
        style={{
          background:
            "radial-gradient(360px circle at var(--mx, -400px) var(--my, -400px), hsl(var(--gold) / 0.10), transparent 70%)",
        }}
      />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-14 items-center w-full">
        <div>
          <div className="animate-fade-up animate-delay-100 eyebrow">
            <span className="inline-block w-8 h-px bg-gold" />
            Business Systems Consulting · South Africa
          </div>
          <h1 className="animate-fade-up animate-delay-200 text-[clamp(2.6rem,5.2vw,4.4rem)] font-semibold leading-[1.05] text-cream mb-6">
            Your business has outgrown{" "}
            <span className="text-gold">the tools holding it together.</span>
          </h1>
          <p className="animate-fade-up animate-delay-300 text-[1.15rem] text-muted-text leading-[1.7] max-w-[520px] mb-9">
            We build custom software and operational systems for business owners who know exactly what problem they have — and need someone who can actually fix it.
          </p>
          <div className="animate-fade-up animate-delay-400 flex gap-3 flex-wrap">
            <a
              href="https://calendly.com/jason-bookings/discover-call"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Book a Free Discovery Call
            </a>
            <a href="#work" className="btn-ghost">See Our Work</a>
          </div>
        </div>

        <div className="flex md:justify-end">
          <div className="animate-fade-up animate-delay-350 glass-panel lift-card rounded-[1.4rem] p-8 w-full max-w-[420px]">
            <div className="grid grid-cols-2 gap-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-[0.75rem] tracking-[0.04em] uppercase text-muted-text mb-1.5">{s.label}</div>
                  <div className="text-[1.05rem] font-medium text-cream leading-snug">{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
