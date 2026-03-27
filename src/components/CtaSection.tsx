const CtaSection = () => {
  return (
    <section className="text-center bg-ink px-[5vw] py-28 relative overflow-hidden" id="contact">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-[radial-gradient(ellipse,_rgba(200,146,42,0.06)_0%,_transparent_70%)] pointer-events-none" />
      <div className="relative z-10">
        <div className="flex items-center gap-3 text-[0.72rem] font-medium tracking-[0.18em] uppercase text-gold mb-4 justify-center">
          <span className="inline-block w-6 h-px bg-gold" />
          Get Started
        </div>
        <h2 className="font-serif text-[clamp(2rem,3.5vw,3rem)] font-light leading-[1.2] text-cream max-w-[640px] mx-auto mb-6">
          Let's talk about<br />your <em className="italic text-gold-light">biggest headache</em>
        </h2>
        <p className="text-[1.05rem] text-muted-text max-w-[520px] mx-auto mb-10 leading-[1.8]">
          Book a free 30-minute call. No pitch, no jargon — just a straight conversation about what's frustrating you in your business and whether we can help.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a className="bg-gold text-ink font-sans text-[0.82rem] font-semibold tracking-[0.1em] uppercase px-8 py-4 no-underline rounded-sm hover:bg-gold-light transition-colors" href="https://calendly.com/jason-bookings/discover-call" target="_blank" rel="noopener noreferrer">
            Book a Discovery Call
          </a>
          <a href="tel:+27836829642" className="text-cream-mid font-sans text-[0.82rem] font-medium tracking-[0.1em] uppercase px-8 py-4 no-underline border border-cream/20 rounded-sm hover:border-cream-mid hover:text-cream transition-colors">
            +27 83 682 9642
          </a>
        </div>
      </div>
    </section>);

};

export default CtaSection;