const HeroSection = () => {
  return (
    <section id="hero" className="hero-section">
      <div className="site-shell">
        <div className="max-w-[760px]">
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

      </div>
    </section>
  );
};

export default HeroSection;
