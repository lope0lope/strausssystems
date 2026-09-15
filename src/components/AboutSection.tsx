const AboutSection = () => {
  return (
    <section className="px-[5vw] py-28" id="about">
      <div className="reveal">
        <div className="eyebrow">
          <span className="inline-block w-6 h-px bg-gold" />
          About
        </div>
        <h2 className="section-title">
          The team behind <span className="text-gold">the system</span>
        </h2>
      </div>

      <div className="max-w-[720px] mt-12 reveal" style={{ ["--reveal-delay" as string]: "100ms" }}>
        <p className="text-[1.05rem] text-muted-text leading-[1.8] mb-5">
          We've spent the better part of a decade at the intersection of engineering, manufacturing, operations, and technology. We've run labs, managed factories, and built software for industries from additive manufacturing to agricultural technology.
        </p>
        <p className="text-[1.05rem] text-muted-text leading-[1.8] mb-5">
          <strong className="text-cream font-semibold">What makes this different</strong> is that we understand business operations before we touch any technology. We've managed budgets, led teams, optimised workflows, and had to justify every decision to a bottom line. When we build something for you, it's built by people who have sat in your chair.
        </p>
        <p className="text-[1.05rem] text-muted-text leading-[1.8] mb-8">
          We're based in South Africa and work with businesses nationally. We work with a small number of clients at a time — deliberately — so that every engagement gets the focus it deserves.
        </p>
        <a
          href="https://calendly.com/jason-bookings/discover-call"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          Start a Conversation
        </a>
      </div>
    </section>
  );
};

export default AboutSection;
