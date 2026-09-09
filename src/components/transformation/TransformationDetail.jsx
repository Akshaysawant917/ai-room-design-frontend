import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Check,
  Download,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getTransformation } from "../../api/transformations";

const GENERATION_MESSAGES = [
  {
    title: "Looking at your room",
    description:
      "Understanding the space, layout, lighting and existing structure.",
  },
  {
    title: "Planning your makeover",
    description:
      "Combining your room type, style, colours and budget into the design.",
  },
  {
    title: "Creating your concept",
    description:
      "Turning the design direction into a realistic room visual.",
  },
  {
    title: "Adding the finishing touches",
    description:
      "Making sure the final concept feels natural and consistent.",
  },
];

function TransformationDetail() {
  const { id } = useParams();

  const [transformation, setTransformation] = useState(null);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);

  const loadTransformation = async () => {
    setRefreshing(true);

    try {
      const response = await getTransformation(id);

      setTransformation(response.data);
      setError("");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadTransformation();
  }, [id]);

  const handleDownloadGeneratedImage = async (event) => {
    event.preventDefault();

    if (!transformation?.generatedImageUrl) {
      return;
    }

    try {
      const response = await fetch(transformation.generatedImageUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch generated image");
      }

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = objectUrl;
      link.download = `ai-home-transform-${transformation.id || "design"}.png`;
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
    } catch (error) {
      const fallbackLink = document.createElement("a");
      fallbackLink.href = transformation.generatedImageUrl;
      fallbackLink.download = `ai-home-transform-${transformation.id || "design"}.png`;
      fallbackLink.rel = "noopener noreferrer";
      document.body.appendChild(fallbackLink);
      fallbackLink.click();
      fallbackLink.remove();
    }
  };

  useEffect(() => {
    if (
      !transformation ||
      !["PENDING", "PROCESSING"].includes(transformation.status)
    ) {
      return undefined;
    }

    const timer = setInterval(loadTransformation, 4000);

    return () => clearInterval(timer);
  }, [transformation]);

  /*
   * Move through the visual generation stages while
   * the actual backend transformation is processing.
   *
   * These are UI stages only. They do not represent
   * the actual OpenAI generation progress.
   */
  useEffect(() => {
    if (
      !transformation ||
      !["PENDING", "PROCESSING"].includes(transformation.status)
    ) {
      return undefined;
    }

    const timer = setInterval(() => {
      setGenerationStep((current) =>
        current < GENERATION_MESSAGES.length - 1 ? current + 1 : current
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [transformation?.status]);

  if (error) {
    return (
      <main className="mx-auto min-h-[calc(100vh-82px)] max-w-[1100px] px-5 py-14 sm:px-12 sm:py-20">
        <div className="border border-[#d8d2c8] bg-[#f6f3ee] p-10 text-center sm:p-16">
          <p className="mb-5 text-[#a33d2c]">{error}</p>

          <button
            className="border border-[#20221f] bg-transparent px-5 py-3 text-xs font-semibold transition hover:bg-[#20221f] hover:text-white"
            onClick={loadTransformation}
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  if (!transformation) {
    return (
      <main className="grid min-h-[60vh] place-items-center bg-[#f6f3ee] text-sm text-[#6e7169]">
        Loading transformation...
      </main>
    );
  }

  const isComplete = transformation.status === "COMPLETED";
  const isFailed = transformation.status === "FAILED";
  const isProcessing = ["PENDING", "PROCESSING"].includes(
    transformation.status
  );

  const currentMessage = GENERATION_MESSAGES[generationStep];

  return (
    <main className="mx-auto min-h-[calc(100vh-82px)] max-w-[1100px] px-5 py-10 sm:px-12 sm:py-16">
      {/* Back */}
      <Link
        className="mb-9 inline-flex items-center gap-1 text-xs text-[#6e7169] transition hover:text-[#20221f]"
        to="/transformations"
      >
        <ArrowLeft size={16} />
        My transformations
      </Link>

      {/* Header */}
      <div className="mb-8 flex items-end justify-between gap-6 sm:mb-12">
        <div>
          <p className="mb-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[1.7px] text-[#bd5c42]">
            <Sparkles size={14} />

            {isComplete
              ? "Transformation ready"
              : isFailed
                ? "Transformation failed"
                : "AI transformation"}
          </p>

          <h1 className="text-5xl font-medium leading-[.98] tracking-[-2.5px] sm:text-7xl">
            {isComplete ? (
              <>
                Your room, <em>reimagined.</em>
              </>
            ) : isFailed ? (
              <>
                Something <em>went wrong.</em>
              </>
            ) : (
              <>
                Your room is <em>getting a makeover.</em>
              </>
            )}
          </h1>
        </div>

        <button
          className="hidden items-center gap-2 border-0 bg-transparent text-xs font-semibold sm:flex"
          onClick={loadTransformation}
          disabled={refreshing}
        >
          <RefreshCw
            size={15}
            className={refreshing ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </div>

      {/* FAILED */}
      {isFailed && (
        <div className="border border-[#d8d2c8] bg-[#f6f3ee] p-10 text-center sm:p-16">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#a33d2c]/10 text-[#a33d2c]">
            <span className="text-lg">!</span>
          </div>

          <h2 className="mt-5 text-xl font-medium">
            We couldn't complete this transformation.
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#6e7169]">
            Please try again with a clear room photo. Your room should be
            visible enough for the AI to understand the space.
          </p>

          <Link
            to="/transform/upload"
            className="mt-7 inline-flex items-center gap-2 bg-[#20221f] px-5 py-3 text-xs font-semibold text-white"
          >
            Try another room
            <ArrowRightIcon />
          </Link>
        </div>
      )}

      {/* GENERATING */}
      {isProcessing && (
        <GenerationExperience
          transformation={transformation}
          currentMessage={currentMessage}
          generationStep={generationStep}
        />
      )}

      {/* RESULT */}
      {isComplete && (
        <ResultView transformation={transformation} />
      )}
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* GENERATION EXPERIENCE                                                      */
/* -------------------------------------------------------------------------- */

function GenerationExperience({
  transformation,
  currentMessage,
  generationStep,
}) {
  return (
    <section className="overflow-hidden border border-[#d8d2c8] bg-[#f6f3ee]">
      {/* Top visual area */}
      <div className="relative min-h-[460px] overflow-hidden bg-[#e9e4da] sm:min-h-[520px]">
        {/* Original image */}
        {transformation.originalImageUrl && (
          <img
            src={transformation.originalImageUrl}
            alt="Your uploaded room"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        {/* Soft overlay */}
        <div className="absolute inset-0 bg-[#171817]/30" />

        {/* Blur layer to make waiting state feel intentional */}
        <div className="absolute inset-0 backdrop-blur-[3px]" />

        {/* Animated central card */}
        <div className="absolute inset-0 flex items-center justify-center px-5">
          <div className="w-full max-w-md">
            <div className="relative overflow-hidden border border-white/30 bg-[#f6f3ee]/95 p-7 shadow-2xl backdrop-blur-xl sm:p-9">
              {/* Animated sparkle */}
              <div className="relative mx-auto flex size-16 items-center justify-center">
                <div className="absolute inset-0 animate-ping rounded-full bg-[#bd5c42]/15" />

                <div className="relative flex size-14 items-center justify-center rounded-full bg-[#20221f] text-white">
                  <Sparkles
                    size={24}
                    className="animate-pulse"
                  />
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-[10px] font-bold uppercase tracking-[1.7px] text-[#bd5c42]">
                  AI is working on it
                </p>

                <h2 className="mt-3 text-2xl font-medium tracking-[-0.7px] text-[#20221f] sm:text-3xl">
                  {currentMessage.title}
                </h2>

                <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#6e7169]">
                  {currentMessage.description}
                </p>
              </div>

              {/* Animated dots */}
              <div className="mt-7 flex justify-center gap-2">
                {[0, 1, 2].map((dot) => (
                  <span
                    key={dot}
                    className="size-1.5 animate-bounce rounded-full bg-[#bd5c42]"
                    style={{
                      animationDelay: `${dot * 180}ms`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="absolute bottom-5 left-5 flex items-center gap-2 bg-[#171817]/75 px-3 py-2 text-[10px] font-medium text-white backdrop-blur-md sm:left-6">
          <span className="size-1.5 animate-pulse rounded-full bg-[#e7a18e]" />
          {transformation.status === "PENDING"
            ? "Preparing your transformation"
            : "Generating your room"}
        </div>
      </div>

      {/* Progress stages */}
      <div className="border-t border-[#d8d2c8] px-5 py-7 sm:px-8 sm:py-8">
        <div className="grid gap-5 sm:grid-cols-4">
          {GENERATION_MESSAGES.map((message, index) => {
            const isActive = index === generationStep;
            const isDone = index < generationStep;

            return (
              <div
                key={message.title}
                className={`flex gap-3 transition-opacity ${
                  index > generationStep ? "opacity-35" : "opacity-100"
                }`}
              >
                <div
                  className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border ${
                    isDone
                      ? "border-[#20221f] bg-[#20221f] text-white"
                      : isActive
                        ? "border-[#bd5c42] text-[#bd5c42]"
                        : "border-[#d8d2c8] text-[#6e7169]"
                  }`}
                >
                  {isDone ? (
                    <Check size={13} />
                  ) : (
                    <span className="text-[9px] font-bold">
                      {index + 1}
                    </span>
                  )}
                </div>

                <div>
                  <p className="text-xs font-semibold text-[#20221f]">
                    {message.title}
                  </p>

                  <p className="mt-1 text-[11px] leading-4 text-[#6e7169]">
                    {index === generationStep
                      ? "Working now"
                      : isDone
                        ? "Done"
                        : "Up next"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-7 border-t border-[#d8d2c8] pt-5 text-center">
          <p className="text-xs text-[#6e7169]">
            This can take a little while. You can safely leave this page
            open — we'll keep checking the transformation automatically.
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* RESULT                                                                     */
/* -------------------------------------------------------------------------- */

function ResultView({ transformation }) {
  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2">
        <figure className="relative m-0 overflow-hidden bg-[#ebe6dd] aspect-[1.25]">
          <img
            className="h-full w-full object-cover"
            src={transformation.originalImageUrl}
            alt="Original room"
          />

          <figcaption className="absolute bottom-4 left-4 bg-[#f6f3ee] px-3 py-2 text-[10px] font-medium">
            Original
          </figcaption>
        </figure>

        <figure className="relative m-0 overflow-hidden bg-[#ebe6dd] aspect-[1.25]">
          <img
            className="h-full w-full object-cover"
            src={transformation.generatedImageUrl}
            alt="Generated room"
          />

          <figcaption className="absolute bottom-4 left-4 bg-[#f6f3ee] px-3 py-2 text-[10px] font-medium">
            AI concept
          </figcaption>
        </figure>
      </div>

      <div className="mt-8 border-t border-[#d8d2c8] pt-6">
        <p className="text-lg">
          {transformation.summary}
        </p>

        <span className="mt-3 block text-xs text-[#6e7169]">
          {transformation.roomType} ·{" "}
          {transformation.styles?.join(" + ")} ·{" "}
          {transformation.colorPreference}
        </span>

        {transformation.generatedImageUrl && (
          <button
            type="button"
            className="mt-5 inline-flex items-center gap-4 bg-[#20221f] px-5 py-3 text-xs font-semibold text-[#f6f3ee] transition hover:bg-black"
            onClick={handleDownloadGeneratedImage}
          >
            <Download size={16} />
            Download image
          </button>
        )}
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* SMALL ICON                                                                  */
/* -------------------------------------------------------------------------- */

function ArrowRightIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export default TransformationDetail;