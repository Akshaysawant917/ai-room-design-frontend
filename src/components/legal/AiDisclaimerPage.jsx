import LegalPage from "./LegalPage";

function AiDisclaimerPage() {
  return (
    <LegalPage title="AI Disclaimer" lastUpdated="September 9, 2026">
      <section>
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.03em] text-[#20221f]">
          AI-generated design guidance
        </h2>
        <p>
          AI Home Transform uses artificial intelligence to generate room-design
          visualizations. These designs are intended for visualization,
          inspiration, and exploring possible interior design ideas.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.03em] text-[#20221f]">
          Limitations of AI results
        </h2>
        <p>
          Generated designs may contain errors or inaccuracies involving room
          dimensions, furniture size, colors, materials, lighting, placement,
          architectural details, product appearance, costs, or feasibility.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.03em] text-[#20221f]">
          Real-world verification
        </h2>
        <p>
          Users should verify measurements, materials, pricing, availability,
          structural requirements, electrical and plumbing requirements, and other
          real-world considerations before making purchasing, construction,
          renovation, or safety decisions.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.03em] text-[#20221f]">
          No guarantee of exact implementation
        </h2>
        <p>
          AI Home Transform does not guarantee that an AI-generated design can be
          implemented exactly as shown. The design should not be treated as
          professional architectural, engineering, construction, financial, or
          safety advice.
        </p>
      </section>
    </LegalPage>
  );
}

export default AiDisclaimerPage;
