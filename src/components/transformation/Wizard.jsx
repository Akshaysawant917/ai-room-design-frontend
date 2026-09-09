import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  ImagePlus,
  Sparkles,
  X,
} from "lucide-react";
import {
  BUDGETS,
  COLORS,
  ROOM_IMAGES,
  ROOM_TYPES,
  STYLES,
} from "../../utils/constants";
import { uploadImage } from "../../api/images";
import { createPaymentOrder } from "../../api/payments";
import { saveDraftFile } from "../../services/draftStorage";
import PaymentModal from "../payment/PaymentModal";

function Wizard({
  view,
  setView,
  draft,
  setDraft,
  user,
  onSignIn,
  onResult,
  onTransformationCreated,
}) {
  const steps = ["Upload", "Space", "Budget", "Style", "Colours", "Review"];
  const stepViews = ["upload", "room", "budget", "style", "color", "review"];
  const stepIndex = {
    upload: 0,
    room: 1,
    budget: 2,
    style: 3,
    color: 4,
    review: 5,
    generating: 5,
    result: 5,
  }[view];

  const next = () => setView(stepViews[stepIndex + 1] || "review");
  const previous = () =>
    setView(stepIndex === 0 ? "home" : stepViews[stepIndex - 1]);

  return (
    <main className="mx-auto min-h-[calc(100vh-82px)] max-w-[1200px] px-5 pb-10 sm:px-12 sm:pb-16">
      <div className="flex h-[73px] items-center justify-between border-b border-[#d8d2c8] sm:h-24">
        <button
          className="flex items-center gap-1 border-0 bg-transparent text-xs text-[#6e7169]"
          onClick={previous}
        >
          <ChevronLeft size={16} /> Back
        </button>

        <div className="hidden gap-5 sm:flex">
          {steps.map((step, index) => (
            <div
              className={`flex items-center gap-2 text-[11px] ${index <= stepIndex ? "text-[#20221f]" : "text-[#ada9a1]"}`}
              key={step}
            >
              <span
                className={`grid size-[21px] place-items-center rounded-full border ${index <= stepIndex ? "border-[#20221f] bg-[#20221f] text-[#f6f3ee]" : "border-[#c8c4bc]"}`}
              >
                {index + 1}
              </span>
              {step}
            </div>
          ))}
        </div>

        <span className="text-[11px] text-[#6e7169] sm:hidden">
          Step {stepIndex + 1} of 6
        </span>
        <span className="rounded-full border border-[#d8a293] px-2.5 py-1.5 text-[10px] text-[#bd5c42]">
          ₹49 first · ₹99 after
        </span>
      </div>

      {view === "upload" && (
        <UploadStep draft={draft} setDraft={setDraft} next={next} />
      )}
      {view === "room" && (
        <OptionStep
          title="What are you transforming?"
          subtitle="Start with the room that needs a little more love."
          options={ROOM_TYPES}
          value={draft.room}
          onChange={(room) => setDraft({ ...draft, room })}
          next={next}
        />
      )}
      {view === "budget" && (
        <OptionStep
          title="What's your approximate budget?"
          subtitle="We'll use this to suggest practical furniture, materials and decor."
          options={BUDGETS}
          value={draft.budget}
          onChange={(budget) => setDraft({ ...draft, budget })}
          next={next}
        />
      )}
      {view === "style" && (
        <StyleStep draft={draft} setDraft={setDraft} next={next} />
      )}
      {view === "color" && (
        <OptionStep
          title="What colours do you like?"
          subtitle="Choose a palette that feels like home to you."
          options={COLORS}
          value={draft.color}
          onChange={(color) => setDraft({ ...draft, color })}
          next={next}
        />
      )}
      {view === "review" && (
        <ReviewStep
          draft={draft}
          user={user}
          onSignIn={onSignIn}
          onResult={onResult}
          setDraft={setDraft}
          onTransformationCreated={onTransformationCreated}
          setView={setView}
        />
      )}
      {view === "generating" && (
        <Generating draft={draft} setView={setView} onResult={onResult} />
      )}
      {view === "result" && <Result draft={draft} setView={setView} />}
    </main>
  );
}

function UploadStep({ draft, setDraft, next }) {
  const input = useRef();
  const [error, setError] = useState("");

  const handle = (file) => {
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Please upload a JPG, PNG or WEBP image.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("That image is too large. Please choose one under 10 MB.");
      return;
    }

    setError("");
    setDraft({
      ...draft,
      file,
      image: URL.createObjectURL(file),
      imageId: "",
      imageUrl: "",
    });
    saveDraftFile(file).catch(() => {});
  };

  return (
    <div className="mx-auto mt-14 max-w-[730px] sm:mt-[75px]">
      <div className="text-center">
        <p className="mb-6 text-[10px] font-bold uppercase tracking-[1.7px] text-[#bd5c42]">
          Let's start with a photo
        </p>
        <h1 className="text-5xl font-medium leading-[.98] tracking-[-2.5px] sm:text-7xl">
          Show us your <em>space.</em>
        </h1>
        <p className="mx-auto mt-6 max-w-[450px] text-sm leading-relaxed text-[#6e7169]">
          A clear photo taken in good light works best. Don't worry about making
          it perfect.
        </p>
      </div>

      <div
        className={`relative mt-10 flex h-[280px] cursor-pointer flex-col items-center justify-center overflow-hidden border border-dashed border-[#b5b0a5] bg-[#f9f7f3] sm:mt-[51px] sm:h-[350px] ${draft.image ? "border-0" : "hover:border-[#bd5c42]"}`}
        onClick={() => input.current?.click()}
        onDrop={(event) => {
          event.preventDefault();
          handle(event.dataTransfer.files[0]);
        }}
        onDragOver={(event) => event.preventDefault()}
      >
        {draft.image ? (
          <>
            <img
              className="h-full w-full object-cover"
              src={draft.image}
              alt="Your room preview"
            />
            <button
              className="absolute bottom-4 left-4 inline-flex items-center gap-2 border-0 bg-[#f6f3ee] px-3 py-2 text-xs"
              onClick={(event) => {
                event.stopPropagation();
                setDraft({
                  ...draft,
                  file: null,
                  image: null,
                  imageId: "",
                  imageUrl: "",
                });
              }}
            >
              <X size={15} /> Change photo
            </button>
          </>
        ) : (
          <>
            <div className="mb-4 grid size-12 place-items-center rounded-full bg-[#ebe6dd] text-[#bd5c42]">
              <ImagePlus />
            </div>
            <h3 className="text-base font-medium">
              Upload a photo of your room
            </h3>
            <p className="mt-1 text-xs text-[#6e7169]">
              Drag & drop here, or <strong>browse photos</strong>
            </p>
            <small className="mt-2 text-xs text-[#6e7169]">
              JPG, PNG or WEBP · Max 10 MB
            </small>
          </>
        )}
        <input
          ref={input}
          hidden
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(event) => handle(event.target.files[0])}
        />
      </div>
      {error && (
        <p className="mt-3 text-center text-xs text-[#a33d2c]">{error}</p>
      )}

      <WizardButton disabled={!draft.image} onClick={next}>
        Continue <ArrowRight size={17} />
      </WizardButton>
    </div>
  );
}

function OptionStep({ title, subtitle, options, value, onChange, next }) {
  return (
    <div className="mx-auto mt-14 max-w-[730px] sm:mt-[75px]">
      <div className="text-center">
        <p className="mb-6 text-[10px] font-bold uppercase tracking-[1.7px] text-[#bd5c42]">
          A good place to begin
        </p>
        <h1 className="text-5xl font-medium leading-[.98] tracking-[-2.5px] sm:text-7xl">
          {title}
        </h1>
        <p className="mx-auto mt-6 max-w-[450px] text-sm leading-relaxed text-[#6e7169]">
          {subtitle}
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-3 sm:mt-[51px] sm:grid-cols-2">
        {options.map((option, index) => (
          <button
            className={`flex items-center gap-3 border p-4 text-left text-sm transition ${value === option ? "border-[#20221f] bg-[#20221f] text-[#f6f3ee]" : "border-[#d8d2c8] bg-transparent hover:border-[#bd5c42]"}`}
            onClick={() => onChange(option)}
            key={option}
          >
            <span className="text-[10px] text-[#bd5c42]">0{index + 1}</span>
            <span>{option}</span>
            {value === option && <Check size={17} />}
          </button>
        ))}
      </div>

      <WizardButton disabled={!value} onClick={next}>
        Continue <ArrowRight size={17} />
      </WizardButton>
    </div>
  );
}

function StyleStep({ draft, setDraft, next }) {
  const toggle = (style) => {
    const selectedStyles = draft.style.includes(style)
      ? draft.style.filter((item) => item !== style)
      : draft.style.length < 2
        ? [...draft.style, style]
        : draft.style;

    setDraft({ ...draft, style: selectedStyles });
  };

  return (
    <div className="mx-auto mt-14 max-w-[730px] sm:mt-[75px]">
      <div className="text-center">
        <p className="mb-6 text-[10px] font-bold uppercase tracking-[1.7px] text-[#bd5c42]">
          Make it feel like you
        </p>
        <h1 className="text-5xl font-medium leading-[.98] tracking-[-2.5px] sm:text-7xl">
          How should your space <em>feel?</em>
        </h1>
        <p className="mx-auto mt-6 max-w-[450px] text-sm leading-relaxed text-[#6e7169]">
          Choose up to two styles that speak to you.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-3 sm:mt-[51px] sm:grid-cols-2">
        {STYLES.map((style, index) => {
          const selected = draft.style.includes(style);
          const disabled = draft.style.length === 2 && !selected;

          return (
            <button
              className={`flex items-center gap-3 border p-4 text-left text-sm transition ${selected ? "border-[#20221f] bg-[#20221f] text-[#f6f3ee]" : "border-[#d8d2c8] bg-transparent hover:border-[#bd5c42]"} ${disabled ? "cursor-not-allowed opacity-40" : ""}`}
              onClick={() => toggle(style)}
              key={style}
            >
              <span className="text-[10px] text-[#bd5c42]">0{index + 1}</span>
              <span>{style}</span>
              {selected && <Check size={17} />}
            </button>
          );
        })}
      </div>

      <WizardButton disabled={!draft.style.length} onClick={next}>
        Continue <ArrowRight size={17} />
      </WizardButton>
    </div>
  );
}

function ReviewStep({
  draft,
  user,
  onSignIn,
  onResult,
  setDraft,
  onTransformationCreated,
  setView,
}) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentOrder, setPaymentOrder] = useState(null);
  const submittedImageId = useRef(draft.imageId);

  const buildPayload = (imageId) => ({
    imageId,
    roomType: draft.room.toLowerCase().replaceAll(" ", "-"),
    budget:
      {
        "Under ₹20,000": "under-20k",
        "₹20,000 – ₹50,000": "low",
        "₹50,000 – ₹1 Lakh": "medium",
        "₹1 Lakh – ₹3 Lakh": "high",
      }[draft.budget] || draft.budget,
    styles: draft.style.map((style) => style.toLowerCase()),
    colorPreference:
      {
        "Warm & neutral": "warm neutrals",
        "White & beige": "white beige",
        "Dark & moody": "dark moody",
        "Let AI decide": "ai decide",
      }[draft.color] || draft.color.toLowerCase(),
  });

  const submit = async (existingImageId = draft.imageId) => {
    if (!user) {
      onSignIn();
      return;
    }

    if (!draft.file && !draft.imageId) {
      setError("Please upload your room photo before continuing.");
      setView("upload");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      let imageId = existingImageId;
      let imageUrl = draft.imageUrl || draft.image;

      if (!imageId) {
        const uploadResponse = await uploadImage(draft.file);
        imageId = uploadResponse.data.id;
        imageUrl = uploadResponse.data.url;
        submittedImageId.current = imageId;
        setDraft({ ...draft, imageId, imageUrl });
      }

      const payload = buildPayload(imageId);
      const orderResponse = await createPaymentOrder(payload);
      const order = orderResponse.data || orderResponse;
      setPaymentOrder({ ...order, image: imageUrl });
      setShowPaymentModal(true);
    } catch (requestError) {
      setError(
        requestError.code === "PAYMENT_REQUIRED"
          ? "Payment is required before your room can be generated."
          : requestError.message,
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto mt-14 max-w-[730px] sm:mt-[75px]">
      <div className="text-center">
        <p className="mb-6 text-[10px] font-bold uppercase tracking-[1.7px] text-[#bd5c42]">
          Almost there
        </p>
        <h1 className="text-5xl font-medium leading-[.98] tracking-[-2.5px] sm:text-7xl">
          Your room, <em>reimagined.</em>
        </h1>
        <p className="mx-auto mt-6 max-w-[450px] text-sm leading-relaxed text-[#6e7169]">
          Here's what we'll use to create your transformation.
        </p>
      </div>

      <div className="mt-10 grid border border-[#d8d2c8] sm:grid-cols-[1.05fr_1fr]">
        <div className="relative h-[230px] sm:h-[330px]">
          <img
            className="h-full w-full object-cover"
            src={draft.image || ROOM_IMAGES.livingBefore}
            alt="Uploaded room"
          />
          <span className="absolute bottom-4 left-4 bg-[#f6f3ee] px-2.5 py-1.5 text-[10px]">
            Original photo
          </span>
        </div>
        <div className="p-4 sm:p-5">
          <ReviewLine label="Space" value={draft.room || "Living room"} />
          <ReviewLine
            label="Budget"
            value={draft.budget || "₹50,000 – ₹1 Lakh"}
          />
          <ReviewLine
            label="Style"
            value={
              draft.style.length ? draft.style.join(" + ") : "Modern + Cozy"
            }
          />
          <ReviewLine label="Colours" value={draft.color || "Warm & neutral"} />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[1px] text-[#bd5c42]">
            Paid generation
          </span>
          <p className="mt-1 text-xs text-[#6e7169]">
            ₹49 for your first generation, then 99 each.
          </p>
        </div>
        {error && <p className="text-xs text-[#a33d2c]">{error}</p>}
        <WizardButton disabled={submitting} onClick={() => submit()}>
          {submitting ? (
            "Starting transformation..."
          ) : (
            <>
              Transform my room <ArrowRight size={17} />
            </>
          )}
        </WizardButton>
      </div>
      {showPaymentModal && (
        <PaymentModal
          order={paymentOrder}
          onClose={() => setShowPaymentModal(false)}
          onVerified={async (transformationId) => {
            setShowPaymentModal(false);
            setView("generating");
            onTransformationCreated(transformationId);
          }}
        />
      )}
    </div>
  );
}

function ReviewLine({ label, value }) {
  return (
    <div className="flex items-center gap-3 border-b border-[#d8d2c8] py-3 text-xs">
      <span className="w-20 text-[#6e7169]">{label}</span>
      <strong className="font-medium">{value}</strong>
      <ChevronRight className="ml-auto text-[#aca79e]" size={15} />
    </div>
  );
}

function WizardButton({ children, disabled, onClick }) {
  return (
    <button
      className="mt-5 inline-flex w-full items-center justify-center gap-5 border-0 bg-[#20221f] px-5 py-3 text-xs font-semibold text-[#f6f3ee] transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60 sm:w-auto"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function Generating({ draft, setView, onResult }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      const result = { image: ROOM_IMAGES.livingAfter, id: Date.now() };
      onResult(result);
      setView("result");
    }, 3400);

    return () => clearTimeout(timer);
  }, [setView, onResult]);

  return (
    <div className="mx-auto mt-12 max-w-[650px] text-center">
      <div className="relative mb-10 h-[250px] overflow-hidden sm:h-[300px]">
        <img
          className="h-full w-full object-cover saturate-50"
          src={draft.image || ROOM_IMAGES.livingBefore}
          alt="Your room being transformed"
        />
        <div className="absolute top-0 h-0.5 w-full animate-pulse bg-[#bd5c42] shadow-[0_0_17px_3px_#c86c52]" />
      </div>
      <p className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[1.7px] text-[#bd5c42]">
        <Sparkles size={14} /> Your room is becoming
      </p>
      <h1 className="text-5xl font-medium leading-[.98] tracking-[-2.5px] sm:text-6xl">
        Something <em>beautiful.</em>
      </h1>
      <p className="mt-5 text-sm text-[#6e7169]">
        We're shaping a space around your style, budget and the way you live.
      </p>
      <div className="mt-9 h-0.5 bg-[#ebe6dd]">
        <span className="block h-full w-[63%] animate-pulse bg-[#bd5c42]" />
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-4 text-[10px] text-[#a8a49b]">
        <span className="flex gap-1">
          <Check size={14} /> Reading your room
        </span>
        <span className="flex gap-1">
          <Check size={14} /> Understanding your style
        </span>
        <span className="flex gap-1 text-[#bd5c42]">
          <Sparkles size={14} /> Designing your new space
        </span>
      </div>
    </div>
  );
}

function Result({ draft, setView }) {
  const [after, setAfter] = useState(true);

  return (
    <div className="mx-auto my-14 max-w-[1050px] px-5 sm:my-20">
      <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[1.7px] text-[#bd5c42]">
            <Sparkles size={14} /> Your transformation is ready
          </p>
          <h1 className="mt-5 text-5xl font-medium leading-[.98] tracking-[-2.5px] sm:text-6xl">
            Here's your <em>new room.</em>
          </h1>
          <p className="mt-4 text-sm text-[#6e7169]">
            A warm, modern space made for slow mornings and everyday living.
          </p>
        </div>
        <button
          className="inline-flex items-center gap-5 border border-[#20221f] bg-transparent px-5 py-3 text-xs font-semibold"
          onClick={() => setView("upload")}
        >
          Transform another room <ArrowRight size={16} />
        </button>
      </div>

      <div className="relative h-[370px] sm:h-[560px]">
        <img
          className="h-full w-full object-cover"
          src={
            after
              ? ROOM_IMAGES.livingAfter
              : draft.image || ROOM_IMAGES.livingBefore
          }
          alt="Transformed living room"
        />
        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 bg-[#f6f3ee] p-1">
          <button
            className={`border-0 px-4 py-2 text-[11px] ${!after ? "bg-[#20221f] text-[#f6f3ee]" : "bg-transparent text-[#6e7169]"}`}
            onClick={() => setAfter(false)}
          >
            Before
          </button>
          <button
            className={`border-0 px-4 py-2 text-[11px] ${after ? "bg-[#20221f] text-[#f6f3ee]" : "bg-transparent text-[#6e7169]"}`}
            onClick={() => setAfter(true)}
          >
            After
          </button>
        </div>
        <span className="absolute left-4 top-4 bg-[#f6f3ee] px-2.5 py-1.5 text-[10px]">
          {after ? "AI concept" : "Original photo"}
        </span>
      </div>

      <div className="mt-7 grid grid-cols-2 gap-6 sm:grid-cols-4">
        <ReviewLine label="Space" value={draft.room || "Living room"} />
        <ReviewLine
          label="Budget"
          value={draft.budget || "₹50,000 – ₹1 Lakh"}
        />
        <ReviewLine
          label="Style"
          value={draft.style.join(" + ") || "Modern + Cozy"}
        />
        <ReviewLine label="Estimated cost" value="₹72,000" />
      </div>

      <div className="mt-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <button
          className="inline-flex items-center gap-2 border-0 bg-transparent text-xs font-semibold"
          onClick={() =>
            alert(
              "Your image is ready to download when connected to the backend.",
            )
          }
        >
          <Download size={16} /> Download image
        </button>
        <button
          className="inline-flex items-center justify-center gap-5 border-0 bg-[#20221f] px-5 py-3 text-xs font-semibold text-[#f6f3ee]"
          onClick={() => setView("home")}
        >
          Back to home <ArrowUpRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default Wizard;
