import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { loginWithToken } = useAuth();
  const [error, setError] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setError("We could not find a valid sign-in token.");
      return;
    }

    loginWithToken(token)
      .then(() => navigate("/transform/review", { replace: true }))
      .catch((authError) =>
        setError(authError.message || "Sign in failed. Please try again."),
      );
  }, [loginWithToken, navigate, searchParams]);

  return (
    <main className="mx-auto min-h-[calc(100vh-82px)] max-w-[900px] px-5 py-8 sm:px-12 sm:py-11">
      <div className="mx-auto max-w-[560px] text-center">
        <div className="mx-auto mb-7 grid size-12 place-items-center rounded-full bg-[#bd5c42] text-[#f6f3ee]">
          <Sparkles size={20} />
        </div>
        {error ? (
          <>
            <p className="mb-6 text-[10px] font-bold uppercase tracking-[1.7px] text-[#bd5c42]">
              Sign-in problem
            </p>
            <h1 className="text-5xl font-medium leading-[.98] tracking-[-2.5px] sm:text-7xl">
              We couldn't
              <br />
              <em>sign you in.</em>
            </h1>
            <p className="mx-auto mb-9 mt-6 max-w-[330px] text-sm leading-relaxed text-[#6e7169]">
              {error}
            </p>
            <Link
              className="inline-flex items-center justify-center gap-5 bg-[#20221f] px-5 py-3 text-xs font-semibold text-[#f6f3ee]"
              to="/login"
            >
              Return to login
            </Link>
          </>
        ) : (
          <>
            <p className="mb-6 text-[10px] font-bold uppercase tracking-[1.7px] text-[#bd5c42]">
              Just a moment
            </p>
            <h1 className="text-5xl font-medium leading-[.98] tracking-[-2.5px] sm:text-7xl">
              Setting up
              <br />
              <em>your home.</em>
            </h1>
            <p className="mx-auto mb-9 mt-6 max-w-[330px] text-sm leading-relaxed text-[#6e7169]">
              Verifying your account and loading your saved designs.
            </p>
            <div
              className="mx-auto size-7 animate-spin rounded-full border-2 border-[#ebe6dd] border-t-[#bd5c42]"
              aria-label="Signing you in"
            />
          </>
        )}
      </div>
    </main>
  );
}

export default AuthCallback;
