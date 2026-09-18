const CtaSection = () => {
  return (
    <section className="section-band bg-dark text-dark-foreground" id="contact">
      <div className="site-shell grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-end reveal">
        <div>
        <div className="eyebrow text-gold">
          <span className="inline-block w-6 h-px bg-gold" />
          Get Started
        </div>
        <h2 className="section-title text-dark-foreground max-w-[780px] mb-6">
          Let's talk about your biggest headache.
        </h2>
        <p className="text-[1.1rem] text-dark-muted max-w-[620px] leading-[1.7]">
          Book a free 30-minute call. No pitch, no jargon — just a straight conversation about what's frustrating you in your business and whether we can help.
        </p>
        </div><div>
          <a
            className="btn-primary"
            href="https://calendly.com/jason-bookings/discover-call"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a Discovery Call
          </a>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
