const CtaSection = () => {
  return (
    <section className="text-center bg-ink-soft px-[5vw] py-28 relative overflow-hidden" id="contact">
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] rounded-full bg-[radial-gradient(ellipse,_hsl(var(--gold)/0.10)_0%,_transparent_70%)] blur-2xl" />
      <div className="relative z-10 reveal">
        <div className="eyebrow justify-center">
          <span className="inline-block w-6 h-px bg-gold" />
          Get Started
        </div>
        <h2 className="section-title max-w-[680px] mx-auto mb-6">
          Let's talk about your <span className="text-gold">biggest headache</span>
        </h2>
        <p className="text-[1.1rem] text-muted-text max-w-[540px] mx-auto mb-9 leading-[1.7]">
          Book a free 30-minute call. No pitch, no jargon — just a straight conversation about what's frustrating you in your business and whether we can help.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
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
