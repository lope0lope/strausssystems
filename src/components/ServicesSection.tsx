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
    <section className="px-[5vw] py-28" id="services">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-12 items-end mb-14 reveal">
        <div>
          <div className="eyebrow">
            <span className="inline-block w-6 h-px bg-gold" />
            How It Works
          </div>
          <h2 className="section-title">
            Three ways we <span className="text-gold">work together</span>
          </h2>
        </div>
        <p className="text-[1.05rem] text-muted-text leading-[1.8]">
          Most clients start with a Diagnostic — a focused session where we map your operations, identify the real problem, and decide together what the right solution looks like. From there, we build it, then stay involved as it grows. You don't need to know anything about technology. You just need to know your business.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <div
            key={s.num}
            className="glass-panel lift-card reveal rounded-[1.4rem] p-8"
            style={{ ["--reveal-delay" as string]: `${i * 100}ms` }}
          >
            <div className="text-[2.6rem] font-semibold text-gold/25 leading-none mb-5">{s.num}</div>
            <div className="text-[1.35rem] font-semibold text-cream mb-3">{s.name}</div>
            <span className="inline-block text-[0.72rem] font-semibold tracking-[0.06em] uppercase text-gold bg-gold-pale border border-gold/20 px-3 py-1 rounded-full mb-5">
              {s.tag}
            </span>
            <p className="text-[0.95rem] text-muted-text leading-[1.75]">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
