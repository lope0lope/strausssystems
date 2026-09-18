const problemQuotes = [
  "Everything runs through me personally — if I'm not available, things grind to a halt.",
  "I know what I need — I just don't know how to build it or where to start.",
  "We're losing time and money to processes that should have been automated years ago.",
  "I've tried other developers but they don't understand the business side of what I'm asking.",
];

const ProblemSection = () => {
  return (
    <section className="section-band bg-background" id="problem">
      <div className="site-shell">
      <div className="reveal max-w-[760px]">
        <div className="eyebrow">
          <span className="inline-block w-6 h-px bg-gold" />
          The Problem
        </div>
        <h2 className="section-title">
          What we keep hearing.
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[0.78fr_1.22fr] gap-16 lg:gap-24 mt-16">
        <div className="space-y-5 reveal">
          <p className="text-[1.05rem] text-muted-text leading-[1.8]">
            Most business owners we work with are running operations that depend entirely on them being in the room. <strong className="text-cream font-semibold">They've got systems held together with WhatsApp messages, spreadsheets nobody else understands, and manual processes that eat hours every week.</strong>
          </p>
          <p className="text-[1.05rem] text-muted-text leading-[1.8]">
            They know it's costing them. They've just never found someone who could fix it without making it complicated, expensive, or someone else's problem to maintain.
          </p>
          <p className="text-[1.05rem] text-muted-text leading-[1.8]">
            That's exactly what we do. We sit down with you, understand how your business actually works, and <strong className="text-cream font-semibold">build the tools that let it run without you having to carry it every day.</strong>
          </p>
        </div>
        <div className="border-t border-foreground/20">
          {problemQuotes.map((quote, i) => (
            <div
              key={i}
              className="reveal grid grid-cols-[3rem_1fr] gap-4 border-b border-foreground/20 py-7"
              style={{ ["--reveal-delay" as string]: `${i * 100}ms` }}
            >
              <span className="technical-label text-gold">0{i + 1}</span>
              <p className="text-[clamp(1.1rem,1.7vw,1.45rem)] text-cream leading-[1.45]">{quote}</p>
            </div>
          ))}
        </div>
      </div></div>
    </section>
  );
};

export default ProblemSection;
