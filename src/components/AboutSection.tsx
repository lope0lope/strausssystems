const AboutSection = () => {
  return (
    <section className="px-[5vw] py-24" id="about">
      <div className="flex items-center gap-3 text-[0.72rem] font-medium tracking-[0.18em] uppercase text-gold mb-4">
        <span className="inline-block w-6 h-px bg-gold" />
        About
      </div>
      <h2 className="font-serif text-[clamp(2rem,3.5vw,3rem)] font-light leading-[1.2] text-cream">
        The team<br />behind the <em className="italic text-gold-light">system</em>
      </h2>

      <div className="max-w-[680px] mt-16">
        <p className="text-base text-cream/70 leading-[1.85] mb-5">
          We've spent the better part of a decade at the intersection of engineering, manufacturing, operations, and technology. We've run labs, managed factories, and built software for industries from additive manufacturing to agricultural technology.
        </p>
        <p className="text-base text-cream/70 leading-[1.85] mb-5">
          <strong className="text-cream font-medium">What makes this different</strong> is that we understand business operations before we touch any technology. We've managed budgets, led teams, optimised workflows, and had to justify every decision to a bottom line. When we build something for you, it's built by people who have sat in your chair.
        </p>
        <p className="text-base text-cream/70 leading-[1.85] mb-5">
          We're based in South Africa and work with businesses nationally. We work with a small number of clients at a time — deliberately — so that every engagement gets the focus it deserves.
        </p>
        <div className="w-16 h-px bg-gold/40 my-8" />
        <a href="#contact" className="bg-gold text-ink font-sans text-[0.82rem] font-semibold tracking-[0.1em] uppercase px-8 py-4 no-underline rounded-sm hover:bg-gold-light transition-colors">
          Start a Conversation
        </a>
      </div>
    </section>
  );
};

export default AboutSection;
