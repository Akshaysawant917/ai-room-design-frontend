import { ArrowLeft, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

function Login({ onBack }) {
  const handleLogin = () => {
    window.location.assign("http://localhost:5000/api/auth/google");
  };

  return (
    <main className="mx-auto min-h-[calc(100vh-82px)] max-w-[900px] px-5 py-8 sm:px-12 sm:py-11">
      <button
        className="mb-14 flex items-center gap-1 border-0 bg-transparent text-xs text-[#6e7169]"
        onClick={onBack}
      >
        <ArrowLeft size={16} /> Back to your review
      </button>
      <div className="mx-auto max-w-[560px] text-center">
        <div className="mx-auto mb-7 grid size-12 place-items-center rounded-full bg-[#bd5c42] text-[#f6f3ee]">
          <Sparkles size={20} />
        </div>
        <p className="mb-6 flex items-center justify-center text-[10px] font-bold uppercase tracking-[1.7px] text-[#bd5c42]">
          One last step
        </p>
        <h1 className="text-5xl font-medium leading-[.98] tracking-[-2.5px] sm:text-7xl">
          Sign in to see
          <br />
          <em>your room transformed.</em>
        </h1>
        <p className="mx-auto mb-9 mt-6 max-w-[330px] text-sm leading-relaxed text-[#6e7169]">
          Sign in to generate your room design and save it for later.
        </p>
        <button
          className="mx-auto flex w-full max-w-[330px] items-center gap-3 border border-[#d8d2c8] bg-white px-4 py-3.5 text-xs font-semibold shadow-[0_7px_20px_#43382c0d]"
          onClick={handleLogin}
        >
          <span className="grid size-6 place-items-center rounded-full border border-[#d8d2c8] font-bold text-[#4285f4]">
            G
          </span>
          Continue with Google
          <ArrowRight size={16} />
        </button>
        <p className="mt-6 flex items-center justify-center gap-1.5 text-[10px] text-[#6e7169]">
          <ShieldCheck size={14} className="text-[#748277]" /> Your photo stays
          yours. No spam, ever.
        </p>
      </div>
    </main>
  );
}

export default Login;
