import profileImg from "@/assets/jason-profile.png";

const HeroSection = () => {
  return (
    <section className="min-h-screen grid grid-cols-1 md:grid-cols-2 items-center px-[5vw] pt-28 pb-20 gap-16 relative overflow-hidden" id="hero">
      {/* Radial glow */}
      <div className="absolute -top-[10%] -right-[5%] w-[55vw] h-[110vh] bg-[radial-gradient(ellipse_at_70%_40%,_rgba(200,146,42,0.07)_0%,_transparent_65%)] pointer-events-none" />

      <div className="relative z-10">
        <div className="animate-fade-up animate-delay-100 inline-flex items-center gap-3 text-[0.75rem] font-medium tracking-[0.18em] uppercase text-gold mb-7">
          <span className="inline-block w-8 h-px bg-gold" />
          Business Systems Consulting · South Africa
        </div>
        <h1 className="animate-fade-up animate-delay-200 font-serif text-[clamp(2.8rem,5vw,4.5rem)] font-light leading-[1.1] tracking-tight text-cream mb-2">
          Your business has<br />
          <em className="italic text-gold-light">outgrown the tools</em><br />
          holding it together.
        </h1>
        <p className="animate-fade-up animate-delay-300 text-[1.05rem] text-muted-text leading-[1.75] max-w-[480px] mt-7 mb-10">
          We build custom software and operational systems for business owners who know exactly what problem they have — and need someone who can actually fix it.
        </p>
        <div className="animate-fade-up animate-delay-400 flex gap-4 flex-wrap">
          <a href="https://calendly.com/jason-bookings/discover-call" target="_blank" rel="noopener noreferrer" className="bg-gold text-ink font-sans text-[0.82rem] font-semibold tracking-[0.1em] uppercase px-8 py-4 no-underline rounded-sm hover:bg-gold-light transition-colors">
            Book a Free Discovery Call
          </a>
          <a href="#work" className="text-cream-mid font-sans text-[0.82rem] font-medium tracking-[0.1em] uppercase px-8 py-4 no-underline border border-cream/20 rounded-sm hover:border-cream-mid hover:text-cream transition-colors">
            See Our Work
          </a>
        </div>
      </div>

      <div className="flex justify-start md:justify-end items-center relative z-10">
        <div className="animate-fade-up animate-delay-350 bg-ink-soft border border-gold/20 rounded-sm p-10 w-full max-w-[400px] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold to-transparent rounded-t-sm" />
          <div className="grid grid-cols-2 gap-4 border-t border-cream/[0.08] pt-6">
            <div>
              <div className="text-[0.72rem] tracking-[0.1em] uppercase text-muted-text mb-1">Years Experience</div>
              <div className="font-serif text-[1.6rem] text-cream">7<span className="text-base text-gold">+</span></div>
            </div>
            <div>
              <div className="text-[0.72rem] tracking-[0.1em] uppercase text-muted-text mb-1">Based In</div>
              <div className="font-serif text-[1.15rem] text-cream pt-1">South Africa</div>
            </div>
            <div>
              <div className="text-[0.72rem] tracking-[0.1em] uppercase text-muted-text mb-1">Industries Served</div>
              <div className="font-serif text-[1.15rem] text-cream pt-1">Agri · Retail · Manufacturing</div>
            </div>
            <div>
              <div className="text-[0.72rem] tracking-[0.1em] uppercase text-muted-text mb-1">Approach</div>
              <div className="font-serif text-[1.15rem] text-cream pt-1">Build · Advise · Retain</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
