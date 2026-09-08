import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#20221f] px-5 py-10 text-[#f6f3ee] sm:px-[7%]">
      <div className="flex flex-col gap-8 border-b border-white/10 pb-9 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xl font-bold tracking-[-1px]"
          >
            <span className="grid size-7 place-items-center rounded-full bg-[#f6f3ee] font-serif text-xl italic text-[#20221f]">
              a
            </span>
            <span>
              ai<span className="text-[#bd5c42]">.</span>home
            </span>
          </Link>
          <p className="mt-5 max-w-[230px] text-xs leading-relaxed text-[#b1b1aa]">
            Visualise a better room before you spend on it.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-7 gap-y-3 text-[11px] text-[#b1b1aa]">
          <a className="hover:text-[#f6f3ee]" href="#how-it-works">
            How it works
          </a>
          <a className="hover:text-[#f6f3ee]" href="#pricing">
            Pricing
          </a>
          <a className="hover:text-[#f6f3ee]" href="#">
            Privacy
          </a>
          <a className="hover:text-[#f6f3ee]" href="#">
            Terms
          </a>
          <a className="hover:text-[#f6f3ee]" href="mailto:hello@aihome.in">
            Contact
          </a>
        </div>
      </div>
      <div className="flex flex-col gap-2 pt-5 text-[10px] text-[#888982] sm:flex-row sm:justify-between">
        <span>© 2026 ai.home</span>
        <span>Made for Indian homes, with care.</span>
      </div>
    </footer>
  );
}

export default Footer;
