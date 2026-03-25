const cases = [
  {
    industry: "Agriculture · South Africa",
    title: "Herd Health Monitoring Platform",
    body: "A livestock farmer was consistently identifying herd health issues too late — costing him animals and revenue every season. He knew there was a pattern in his data; he just had no way to surface it. We built a monitoring tool that analyses herd behaviour and biological indicators, flagging issues months before they escalate. The system paid for itself within the first season.",
    metrics: [
      { val: "< 1 season", label: "Payback period" },
    ],
  },
  {
    industry: "Marketplace · B2B Commerce",
    title: "Multi-Business Commerce Platform",
    body: "A business owner had a clear vision for a platform that would allow other businesses to sell their products through a shared marketplace. The idea was solid — what he needed was someone who could turn it into a real product, not just a concept. We produced a full 13-page implementation plan covering architecture, feature costs, timelines, and commercialisation strategy, then executed the build.",
    metrics: [
      { val: "2 months", label: "Concept to delivery" },
    ],
  },
];

const CasesSection = () => {
  return (
    <section className="bg-ink-soft px-[5vw] py-24" id="work">
      <div className="flex items-center gap-3 text-[0.72rem] font-medium tracking-[0.18em] uppercase text-gold mb-4">
        <span className="inline-block w-6 h-px bg-gold" />
        Our Work
      </div>
      <h2 className="font-serif text-[clamp(2rem,3.5vw,3rem)] font-light leading-[1.2] text-cream">
        Problems solved.<br /><em className="italic text-gold-light">Results delivered.</em>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
        {cases.map((c, i) => (
          <div key={i} className="bg-ink border border-cream/[0.08] rounded-sm p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold to-gold/20" />
            <div className="text-[0.72rem] font-semibold tracking-[0.15em] uppercase text-gold mb-3">{c.industry}</div>
            <h3 className="font-serif text-[1.6rem] font-normal leading-[1.25] text-cream mb-6">{c.title}</h3>
            <p className="text-[0.95rem] text-cream/65 leading-[1.8] mb-8">{c.body}</p>
            <div className="flex gap-8 border-t border-cream/[0.08] pt-6">
              {c.metrics.map((m, j) => (
                <div key={j}>
                  <div className="font-serif text-2xl text-cream">{m.val}</div>
                  <div className="text-[0.75rem] text-muted-text mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CasesSection;
