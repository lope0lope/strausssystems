const services = [
  {
    num: "01",
    name: "Diagnostic & Strategy",
    tag: "Entry Point",
    desc: "We spend a half-day mapping your current workflows, identifying where time and money are being lost, and recommending whether custom software, an AI integration, or a process change is the right move. You leave with a clear plan — whether you proceed with us or not.",
  },
  {
    num: "02",
    name: "Custom Build",
    tag: "Core Service",
    desc: "We design and build the software or system your business needs — end to end. Management platforms, monitoring tools, automation workflows, AI integrations. Every solution is built for your specific problem, not adapted from a template.",
  },
  {
    num: "03",
    name: "Advisory Retainer",
    tag: "Ongoing",
    desc: "Once your system is live, we stay involved as your in-house technology partner — without the full-time salary. Maintenance, continuous improvement, strategic advice, and a team that already knows your business inside out. Most clients move here after their first build.",
  },
];

const ServicesSection = () => {
  return (
    <section className="px-[5vw] py-24" id="services">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16 items-start mb-16">
        <div>
          <div className="flex items-center gap-3 text-[0.72rem] font-medium tracking-[0.18em] uppercase text-gold mb-4">
            <span className="inline-block w-6 h-px bg-gold" />
            How It Works
          </div>
          <h2 className="font-serif text-[clamp(2rem,3.5vw,3rem)] font-light leading-[1.2] text-cream">
            Three ways<br />we <em className="italic text-gold-light">work together</em>
          </h2>
        </div>
        <p className="text-[1.05rem] text-cream/65 leading-[1.8]">
          Most clients start with a Diagnostic — a focused session where we map your operations, identify the real problem, and decide together what the right solution looks like. From there, we build it, then stay involved as it grows. You don't need to know anything about technology. You just need to know your business.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((s) => (
          <div key={s.num} className="group glass-panel rounded-sm p-8 relative overflow-hidden hover:border-gold/35 hover:-translate-y-1 hover:shadow-glass transition-all duration-300">
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
            <div className="font-serif text-5xl font-light text-gold/20 leading-none mb-4">{s.num}</div>
            <div className="font-serif text-[1.45rem] text-cream mb-2">{s.name}</div>
            <span className="inline-block text-[0.7rem] font-semibold tracking-[0.12em] uppercase text-gold bg-gold/10 border border-gold/25 px-2.5 py-0.5 rounded-sm mb-5">
              {s.tag}
            </span>
            <p className="text-[0.9rem] text-cream/60 leading-[1.75]">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
