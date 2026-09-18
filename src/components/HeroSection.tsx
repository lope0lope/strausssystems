const HeroSection = () => {
  return (
    <section id="hero" className="hero-section">
      <div className="site-shell grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-14 lg:gap-20 items-center">
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

        <div className="animate-fade-up animate-delay-350 relative">
          <div className="product-window hero-product-window" aria-label="Placeholder for a farm operations dashboard screenshot">
            <div className="window-bar"><span /><span /><span /><small>Operations overview</small></div>
            <div className="window-body">
              <div className="mock-sidebar" />
              <div className="mock-dashboard">
                <div className="mock-kicker">LIVE OPERATIONS</div>
                <div className="mock-heading">Welfare overview</div>
                <div className="mock-metrics"><span /><span /><span /></div>
                <div className="mock-chart"><i /><i /><i /><i /><i /><i /><i /></div>
                <div className="mock-rows"><span /><span /><span /></div>
              </div>
            </div>
          </div>
          <div className="hero-proof"><strong>2,000+</strong><span>animals tracked digitally</span></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
