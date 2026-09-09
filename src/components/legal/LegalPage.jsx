import { ArrowUpRight } from "lucide-react";

function LegalPage({ title, lastUpdated, children }) {
  return (
    <main className="bg-[#f7f5f0] text-[#171717]">
      <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
        <div className="mb-8 inline-flex items-center gap-2 border border-black/10 bg-white/60 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-black/55">
          <span className="size-2 rounded-full bg-[#bd5c42]" />
          AI Home Transform
        </div>

        <h1 className="text-4xl font-medium leading-[0.96] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
          {title}
        </h1>

        <p className="mt-3 text-sm text-black/55">Last updated: {lastUpdated}</p>

        <article className="mt-10 rounded-[28px] border border-black/10 bg-white p-5 shadow-[0_12px_30px_rgba(0,0,0,0.03)] sm:p-8 lg:p-10">
          <div className="space-y-8 text-base leading-7 text-black/70">
            {children}
          </div>
        </article>

        <div className="mt-8 flex items-center justify-start">
          <a
            href="mailto:akshaysawant917@gmail.com"
            className="inline-flex items-center gap-2 border border-[#d8d2c8] bg-[#20221f] px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#f6f3ee]"
          >
            Email support
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </main>
  );
}

export default LegalPage;
