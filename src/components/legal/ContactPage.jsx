import { ArrowUpRight } from "lucide-react";

function ContactPage() {
  return (
    <main className="bg-[#f7f5f0] text-[#171717]">
      <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
        <div className="mb-8 inline-flex items-center gap-2 border border-black/10 bg-white/60 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-black/55">
          <span className="size-2 rounded-full bg-[#bd5c42]" />
          AI Home Transform
        </div>

        <h1 className="text-4xl font-medium leading-[0.96] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
          Need help?
        </h1>

        <div className="mt-10 rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_12px_30px_rgba(0,0,0,0.03)] sm:p-8 lg:p-10">
          <p className="text-base leading-7 text-black/70">
            Our support team can help with payment issues, failed transformations,
            missing generated images, account or login issues, privacy or data
            questions, and general support.
          </p>

          <div className="mt-8 rounded-2xl border border-[#d8d2c8] bg-[#f7f5f0] p-5 sm:p-6">
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-black/45">
              Email
            </p>
            <p className="mt-3 text-lg font-medium text-[#20221f] sm:text-xl">
              akshaysawant917@gmail.com
            </p>
          </div>

          <div className="mt-8 flex items-center justify-start">
            <a
              href="mailto:akshaysawant917@gmail.com"
              className="inline-flex items-center gap-2 border border-[#d8d2c8] bg-[#20221f] px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#f6f3ee]"
            >
              Email Support
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ContactPage;
