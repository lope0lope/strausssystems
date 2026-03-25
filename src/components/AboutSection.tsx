const credentials = [
  { year: "2024", name: "Project Management Diploma", detail: "Certified Project Management Professional" },
  { year: "2024", name: "Lean Six Sigma Certification", detail: "Process optimisation & operational efficiency" },
  { year: "2023", name: "Design Thinking Facilitator", detail: "Human-centred problem solving" },
  { year: "2021", name: "Data Science Diploma", detail: "Python, Pandas, data-driven decision making" },
  { year: "2023–", name: "Founder, Proto3D", detail: "Additive manufacturing & R&D consultancy, KZN" },
  { year: "2022", name: "National Lab Manager, Regent Business School", detail: "4IR integration, national operations leadership" },
];

const AboutSection = () => {
  return (
    <section className="px-[5vw] py-24" id="about">
      <div className="flex items-center gap-3 text-[0.72rem] font-medium tracking-[0.18em] uppercase text-gold mb-4">
        <span className="inline-block w-6 h-px bg-gold" />
        About
      </div>
      <h2 className="font-serif text-[clamp(2rem,3.5vw,3rem)] font-light leading-[1.2] text-cream">
        The person<br />behind the <em className="italic text-gold-light">system</em>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-start mt-16">
        <div>
          <p className="text-base text-cream/70 leading-[1.85] mb-5">
            I've spent the better part of a decade at the intersection of engineering, manufacturing, operations, and technology. I've run labs, managed factories, founded my own company, and built software for industries from additive manufacturing to agricultural technology.
          </p>
          <p className="text-base text-cream/70 leading-[1.85] mb-5">
            <strong className="text-cream font-medium">What makes this different</strong> is that I understand business operations before I touch any technology. I've managed budgets, led teams, optimised workflows, and had to justify every decision to a bottom line. When I build something for you, it's built by someone who has sat in your chair.
          </p>
          <p className="text-base text-cream/70 leading-[1.85] mb-5">
            I'm based in Pietermaritzburg and work across KZN and nationally. I work with a small number of clients at a time — deliberately — so that every engagement gets the focus it deserves.
          </p>
          <div className="w-16 h-px bg-gold/40 my-8" />
          <a href="#contact" className="bg-gold text-ink font-sans text-[0.82rem] font-semibold tracking-[0.1em] uppercase px-8 py-4 no-underline rounded-sm hover:bg-gold-light transition-colors">
            Start a Conversation
          </a>
        </div>

        <div className="flex flex-col gap-4">
          {credentials.map((c, i) => (
            <div key={i} className="flex gap-4 items-start py-4 border-b border-cream/[0.06] last:border-b-0">
              <div className="text-[0.75rem] font-medium tracking-[0.08em] text-gold min-w-[3rem] mt-0.5">{c.year}</div>
              <div>
                <div className="text-[0.9rem] text-cream font-medium mb-0.5">{c.name}</div>
                <div className="text-[0.8rem] text-muted-text">{c.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
