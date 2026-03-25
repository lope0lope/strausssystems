const problemQuotes = [
  "Everything runs through me personally — if I'm not available, things grind to a halt.",
  "I know what I need — I just don't know how to build it or where to start.",
  "We're losing time and money to processes that should have been automated years ago.",
  "I've tried other developers but they don't understand the business side of what I'm asking.",
];

const ProblemSection = () => {
  return (
    <section className="bg-ink-soft px-[5vw] py-24" id="problem">
      <div className="flex items-center gap-3 text-[0.72rem] font-medium tracking-[0.18em] uppercase text-gold mb-4">
        <span className="inline-block w-6 h-px bg-gold" />
        The Problem
      </div>
      <h2 className="font-serif text-[clamp(2rem,3.5vw,3rem)] font-light leading-[1.2] text-cream">
        Sound <em className="italic text-gold-light">familiar?</em>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mt-16">
        <div className="space-y-5">
          <p className="text-[1.05rem] text-cream/75 leading-[1.85]">
            Most business owners we work with are running operations that depend entirely on them being in the room. <strong className="text-cream font-medium">They've got systems held together with WhatsApp messages, spreadsheets nobody else understands, and manual processes that eat hours every week.</strong>
          </p>
          <p className="text-[1.05rem] text-cream/75 leading-[1.85]">
            They know it's costing them. They've just never found someone who could fix it without making it complicated, expensive, or someone else's problem to maintain.
          </p>
          <p className="text-[1.05rem] text-cream/75 leading-[1.85]">
            That's exactly what we do. We sit down with you, understand how your business actually works, and <strong className="text-cream font-medium">build the tools that let it run without you having to carry it every day.</strong>
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {problemQuotes.map((quote, i) => (
            <div key={i} className="bg-ink border border-cream/[0.08] border-l-[3px] border-l-gold rounded-sm px-6 py-5 hover:border-l-gold-light transition-colors">
              <p className="text-[0.95rem] text-cream/70 leading-[1.65]">"{quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
