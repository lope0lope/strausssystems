const problemQuotes = [
  "Everything runs through me personally — if I'm not available, things grind to a halt.",
  "I know what I need — I just don't know how to build it or where to start.",
  "We're losing time and money to processes that should have been automated years ago.",
  "I've tried other developers but they don't understand the business side of what I'm asking.",
];

const ProblemSection = () => {
  return (
    <section className="bg-background px-[5vw] py-28" id="problem">
      <div className="reveal">
        <div className="eyebrow">
          <span className="inline-block w-6 h-px bg-gold" />
          The Problem
        </div>
        <h2 className="section-title">
          Sound <span className="text-gold">familiar?</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center mt-14">
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
        <div className="flex flex-col gap-4">
          {problemQuotes.map((quote, i) => (
            <div
              key={i}
              className="glass-panel lift-card reveal border-l-[3px] border-l-gold rounded-[1.1rem] px-6 py-5"
              style={{ ["--reveal-delay" as string]: `${i * 100}ms` }}
            >
              <p className="text-[0.98rem] text-cream-mid leading-[1.65]">"{quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
