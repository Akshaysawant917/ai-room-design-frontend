import { ArrowUpRight, Clock3, LogOut, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

function Header({
  user,
  onStart,
  onHistory,
  onLogout,
  mobileMenu,
  setMobileMenu,
}) {
  return (
    <header className="mx-auto flex h-[82px] max-w-[1320px] items-center justify-between border-b border-[#d8d2c8] px-5 sm:px-12">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-xl font-bold tracking-[-1px]"
      >
        <span className="grid size-7 place-items-center rounded-full bg-[#20221f] font-serif text-xl italic text-[#f6f3ee]">
          a
        </span>
        <span>
          ai<span className="text-[#bd5c42]">.</span>home
        </span>
      </Link>
      <nav
        className={`${mobileMenu ? "flex" : "hidden"} absolute left-0 right-0 top-[68px] z-10 flex-col gap-5 border-b border-[#d8d2c8] bg-[#f6f3ee] p-5 text-sm text-[#6e7169] sm:static sm:flex sm:flex-row sm:gap-8 sm:border-0 sm:bg-transparent sm:p-0`}
      >
        <a
          href="#how-it-works"
          onClick={() => setMobileMenu(false)}
          className="hover:text-[#20221f]"
        >
          How it works
        </a>
        <a
          href="#styles"
          onClick={() => setMobileMenu(false)}
          className="hover:text-[#20221f]"
        >
          Styles
        </a>
        <a
          href="#pricing"
          onClick={() => setMobileMenu(false)}
          className="hover:text-[#20221f]"
        >
          Pricing
        </a>
      </nav>
      <div className="hidden items-center gap-6 text-xs sm:flex">
        <button
          className="flex items-center gap-2 border-0 bg-transparent text-[#6e7169]"
          onClick={onHistory}
        >
          <Clock3 size={15} /> My transformations
        </button>
        {user ? (
          <button
            className="flex items-center gap-2 rounded-full border border-[#d8d2c8] bg-transparent px-2 py-1.5"
            onClick={onLogout}
          >
            {user.avatarUrl ? (
              <img
                className="size-6 rounded-full object-cover"
                src={user.avatarUrl}
                alt=""
              />
            ) : (
              <span className="grid size-6 place-items-center rounded-full bg-[#bd5c42] text-white">
                {user.name?.[0] || "U"}
              </span>
            )}
            {user.name}
            <LogOut size={14} />
          </button>
        ) : (
          <button
            className="flex items-center gap-2 border-0 bg-transparent font-semibold"
            onClick={() => window.location.assign("/login")}
          >
            Sign in <ArrowUpRight size={15} />
          </button>
        )}
      </div>
      <button
        className="border-0 bg-transparent sm:hidden"
        aria-label="Open menu"
        onClick={() => setMobileMenu(!mobileMenu)}
      >
        {mobileMenu ? <X /> : <Menu />}
      </button>
    </header>
  );
}

export default Header;
