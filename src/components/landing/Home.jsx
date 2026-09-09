import { useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  IndianRupee,
  Paintbrush,
  Sparkles,
  Upload,
  X,
} from "lucide-react";
import { ROOM_IMAGES } from "../../utils/constants";

function Home({ onStart }) {
  return (
    <main className="bg-[#f7f5f0] text-[#171717]">
      {/* HERO */}
      <section className="mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl items-center gap-12 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-20">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 border border-black/10 bg-white/60 px-3 py-2 text-xs font-medium uppercase tracking-[0.16em] text-black/60">
            <Sparkles size={14} />
            AI interior ideas for Indian homes
          </div>

          <h1 className="text-5xl font-medium leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            See your room
            <br />
            <em className="font-serif font-normal">before you spend.</em>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-black/60 sm:text-lg">
            Upload a photo of your room, choose your style and budget, and get a
            realistic AI-generated makeover based on your actual space.
          </p>

          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <button
              onClick={onStart}
              className="group inline-flex items-center justify-center gap-3 bg-[#171717] px-6 py-4 text-sm font-medium text-white transition hover:bg-black"
            >
              Redesign my room
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>

            <span className="text-sm text-black/55">
              First transformation <strong className="text-black">₹49</strong>
            </span>
          </div>

          <div className="mt-5 flex items-center gap-2 text-xs text-black/50">
            <Check size={14} />
            No subscription · Pay per transformation
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[560px]">
          <div className="overflow-hidden bg-white p-2 shadow-[0_25px_80px_rgba(0,0,0,0.08)]">
            <img
              src="/hero-home-2.png"
              alt="Before and after AI room transformation"
              className="aspect-square w-full object-cover"
            />
          </div>

          <div className="absolute -bottom-4 left-4 bg-white px-4 py-3 shadow-lg sm:left-6">
            <p className="text-[10px] uppercase tracking-[0.16em] text-black/40">
              First transformation
            </p>
            <p className="mt-1 text-xl font-semibold">₹49</p>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-black/10 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-black/40">
            YOUR ROOM → YOUR BRIEF → AI CONCEPT
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-black/60">
            <span>Your actual room photo</span>
            <span>Your style</span>
            <span>Your budget</span>
            <span>AI-generated concept</span>
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <SectionIntro
          eyebrow="See what's possible"
          title={
            <>
              Your room.
              <br />
              <em>Your budget. Your possibilities.</em>
            </>
          }
          text="Whether you're working with ₹10k or ₹1L+, choose your budget and see how your space could be transformed around it."
        />

        <div className="mt-12 grid items-stretch gap-3 lg:grid-cols-[1fr_auto_1fr]">
          <ShowcaseImage
            image="Kitchen.jpg"
            alt="Indian kitchen before redesign"
            label="Before"
          />

          <div className="flex items-center justify-center py-2 lg:px-3">
            <div className="flex h-10 w-10 items-center justify-center border border-black/10 bg-white">
              <ArrowRight size={16} />
            </div>
          </div>

          <ShowcaseImage
            image="Kitchen-ai.png"
            alt="AI redesigned Indian kitchen"
            label="AI concept"
            after
          />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="border border-black/10 bg-[#f7f5f0] px-4 py-2 text-xs font-medium">
            Example budget: ₹10–20k
          </span>

          <span className="text-xs text-black/40">
            Your budget can be different.
          </span>
        </div>

        <div className="mx-auto mt-8 max-w-2xl text-center">
          <p className="text-base leading-7 text-black/60 sm:text-lg">
            Want to spend ₹20k, ₹50k or ₹1L+?
            <br className="hidden sm:block" />
            <strong className="font-medium text-black">
              Tell us your budget and we'll design around it.
            </strong>
          </p>
        </div>

        <p className="mt-5 text-center text-xs leading-5 text-black/40">
          Example transformation. AI-generated results can vary based on your
          photo, room and selected preferences. Budget is used to guide the AI
          concept and is not a renovation quote.
        </p>


        <div className="mt-20">
          <div className="mb-7">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-black/40">
              Different rooms. Same idea.
            </p>

            <h3 className="mt-3 text-3xl tracking-[-0.03em] sm:text-4xl">
              Start with the room
              <br />
              <em className="font-serif font-normal">you want to change.</em>
            </h3>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <ShowcaseImage
              image={ROOM_IMAGES.bedroom}
              alt="AI bedroom interior concept"
              label="Bedroom"
            />

            <ShowcaseImage
              image={ROOM_IMAGES.kitchen}
              alt="AI kitchen interior concept"
              label="Kitchen"
            />

            <ShowcaseImage
              image={ROOM_IMAGES.balcony}
              alt="AI balcony interior concept"
              label="Balcony"
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="border-y border-black/10 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <SectionIntro
            eyebrow="How it works"
            title={
              <>
                Your room is the starting point.
                <br />
                <em>Not a showroom.</em>
              </>
            }
            text="Give us a photo and a few preferences. We handle the visual part."
          />

          <div className="mt-14 grid border-l border-t border-black/10 md:grid-cols-3">
            <Step
              num="01"
              icon={<Upload />}
              title="Upload your room"
              text="Take a clear photo of your living room, bedroom, kitchen, balcony or other space."
            />

            <Step
              num="02"
              icon={<Paintbrush />}
              title="Choose your direction"
              text="Tell us the room type, style, budget and colour preference."
            />

            <Step
              num="03"
              icon={<Sparkles />}
              title="Get your AI concept"
              text="AI creates a visual concept based on your room and the preferences you selected."
            />
          </div>
        </div>
      </section>

      {/* BUDGET */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-black/45">
              <IndianRupee size={14} />
              Start with your budget
            </p>

            <h2 className="mt-5 text-4xl leading-[1.05] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
              What could your room look like
              <br />
              with <em className="font-serif font-normal">your budget?</em>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-black/60">
              Whether you're thinking about a simple ₹20k refresh, a ₹50k
              makeover or a bigger ₹1L+ project, your budget becomes part of the
              design brief.
            </p>

            <p className="mt-4 max-w-xl text-xs leading-5 text-black/40">
              The AI result is a visual concept for inspiration. Actual
              material, labour and renovation costs can vary.
            </p>
          </div>

          <div className="grid border border-black/10 bg-white">
            <BudgetItem amount="₹20K" label="Simple refresh" />
            <BudgetItem amount="₹50K" label="Room makeover" />
            <BudgetItem amount="₹1L+" label="Premium direction" />
          </div>
        </div>
      </section>

      {/* INDIAN HOMES */}
      <section className="bg-[#1b1b19] text-white">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:px-10 lg:py-28">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/45">
              Made for the way we actually live
            </p>

            <h2 className="mt-5 text-4xl leading-[1.05] tracking-[-0.035em] sm:text-5xl">
              Not every home needs to look
              <br />
              like a <em className="font-serif font-normal">showroom.</em>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-white/55">
              Your existing furniture, walls, windows and room size matter.
              Start with your actual space and explore ideas that feel more
              relevant to your home.
            </p>
          </div>

          <div className="grid grid-cols-2 border-l border-t border-white/10">
            <IndianHomePoint
              title="Living rooms"
              text="Make everyday spaces feel better."
            />

            <IndianHomePoint
              title="Kitchens"
              text="Explore practical visual directions."
            />

            <IndianHomePoint
              title="Bedrooms"
              text="Try different moods and styles."
            />

            <IndianHomePoint
              title="Balconies"
              text="Make use of smaller spaces too."
            />
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <SectionIntro
          eyebrow="Why use it"
          title={
            <>
              Make better decisions
              <br />
              <em>before buying anything.</em>
            </>
          }
          text="Use your own room as the starting point for exploring ideas."
        />

        <div className="mt-14 divide-y divide-black/10 border-y border-black/10">
          <Benefit
            num="01"
            title="Visualize before spending"
            text="See a possible direction before buying furniture, paint, lighting or decor."
          />

          <Benefit
            num="02"
            title="Try different styles"
            text="Explore modern, minimal, cozy and other visual directions using the same room."
          />

          <Benefit
            num="03"
            title="Keep your budget in the brief"
            text="Your selected budget becomes part of the AI design brief."
          />

          <Benefit
            num="04"
            title="Start with your actual space"
            text="You're not choosing from a generic showroom. The AI starts from your uploaded room."
          />
        </div>
      </section>

      {/* EXPECTATIONS */}
      <section className="border-y border-black/10 bg-[#ece9e1]">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:items-center lg:px-10 lg:py-20">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-black/45">
              We keep it simple
            </p>

            <h2 className="mt-4 text-3xl leading-tight tracking-[-0.03em] sm:text-4xl">
              AI design concept,
              <br />
              <em className="font-serif font-normal">
                not a renovation quote.
              </em>
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-6 text-black/60 lg:justify-self-end">
            Your generated image is a visual starting point for ideas and
            planning. It is not a construction drawing, contractor quote or
            guarantee of actual renovation cost.
          </p>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="bg-[#171717] text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:px-10 lg:py-24">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/45">
              Simple, transparent pricing
            </p>

            <h2 className="mt-5 text-4xl leading-[1.05] tracking-[-0.035em] sm:text-5xl">
              Try your first room
              <br />
              <em className="font-serif font-normal">for ₹49.</em>
            </h2>

            <p className="mt-5 text-sm leading-6 text-white/55">
              No subscription. Pay only when you create a transformation.
            </p>
          </div>

          <div className="border border-white/10">
            <PriceRow amount="₹49" title="First transformation" />

            <PriceRow amount="₹99" title="Every transformation after" />

            <div className="border-t border-white/10 p-5">
              <p className="mb-5 text-xs leading-5 text-white/45">
                One payment = one AI-generated room concept.
              </p>

              <button
                onClick={onStart}
                className="group flex w-full items-center justify-center gap-3 bg-white px-5 py-4 text-sm font-medium text-black transition hover:bg-white/90"
              >
                Start with my room
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="mb-12">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-black/40">
            Questions, answered
          </p>

          <h2 className="mt-4 text-4xl tracking-[-0.035em] sm:text-5xl">
            Good to <em className="font-serif font-normal">know.</em>
          </h2>
        </div>

        <div className="border-t border-black/10">
          <Faq
            q="How does the room redesign work?"
            a="Upload a room photo, choose your room type, style and budget, then receive an AI-generated concept based on those inputs."
          />

          <Faq
            q="How much does it cost?"
            a="Your first transformation costs 49. Every transformation after that costs ₹99."
          />

          <Faq
            q="Is ₹49 a subscription?"
            a="No. There is no subscription. You pay per transformation."
          />

          <Faq
            q="Can I use a photo taken from my phone?"
            a="Yes. A clear, well-lit JPG, PNG or WEBP photo under 10 MB works best."
          />

          <Faq
            q="Can I choose my room type and style?"
            a="Yes. You can choose the room type, up to two styles, your budget and colour preference."
          />

          <Faq
            q="Does the AI keep my existing room layout?"
            a="Your photo is used as the starting point, but the result is an AI-generated concept and may change details of the room."
          />

          <Faq
            q="Is the generated image a final renovation plan?"
            a="No. It is a visual concept for inspiration and planning. Material, labour and final renovation costs need separate planning."
          />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-black/10 bg-[#e8e4da]">
        <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 lg:py-28">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-black/40">
            Your room is a good place to start
          </p>

          <h2 className="mt-5 text-5xl leading-[0.95] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
            Ready to see your room
            <br />
            <em className="font-serif font-normal">differently?</em>
          </h2>

          <p className="mx-auto mt-6 max-w-lg text-sm leading-6 text-black/55 sm:text-base">
            Upload a photo and create your first AI room concept for ₹49.
          </p>

          <button
            onClick={onStart}
            className="group mt-8 inline-flex items-center gap-3 bg-[#171717] px-7 py-4 text-sm font-medium text-white transition hover:bg-black"
          >
            Redesign my room — ₹49
            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>
      </section>
    </main>
  );
}

function SectionIntro({ eyebrow, title, text }) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-black/40">
        {eyebrow}
      </p>

      <h2 className="mt-4 text-4xl leading-[1.05] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
        {title}
      </h2>

      {text && (
        <p className="mt-5 max-w-2xl text-sm leading-6 text-black/55 sm:text-base">
          {text}
        </p>
      )}
    </div>
  );
}

function Step({ num, icon, title, text }) {
  return (
    <div className="border-r border-b border-black/10 px-6 py-8 sm:px-8 sm:py-10">
      <div className="flex items-start justify-between">
        <span className="text-xs font-medium tracking-[0.15em] text-black/35">
          {num}
        </span>

        <div className="flex h-10 w-10 items-center justify-center border border-black/10">
          {icon}
        </div>
      </div>

      <h3 className="mt-10 text-xl font-medium tracking-[-0.02em]">{title}</h3>

      <p className="mt-3 text-sm leading-6 text-black/55">{text}</p>
    </div>
  );
}

function ShowcaseImage({ image, alt, label }) {
  return (
    <figure className="group relative overflow-hidden bg-white">
      <img
        src={image}
        alt={alt}
        className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.015]"
      />

      <figcaption className="absolute bottom-3 left-3 bg-white/95 px-3 py-2 text-xs font-medium">
        {label}
      </figcaption>
    </figure>
  );
}

function BudgetItem({ amount, label }) {
  return (
    <div className="flex items-center justify-between border-b border-black/10 px-6 py-7 last:border-b-0 sm:px-8">
      <span className="text-3xl font-medium tracking-[-0.03em]">{amount}</span>

      <span className="text-sm text-black/50">{label}</span>
    </div>
  );
}

function IndianHomePoint({ title, text }) {
  return (
    <div className="border-r border-b border-white/10 p-6 sm:p-8">
      <h3 className="text-base font-medium">{title}</h3>

      <p className="mt-2 text-sm leading-5 text-white/45">{text}</p>
    </div>
  );
}

function Benefit({ num, title, text }) {
  return (
    <article className="grid gap-4 py-7 sm:grid-cols-[70px_1fr] sm:items-start">
      <span className="text-xs font-medium tracking-[0.15em] text-black/30">
        {num}
      </span>

      <div className="grid gap-2 sm:grid-cols-[0.8fr_1fr] sm:gap-10">
        <h3 className="text-xl font-medium tracking-[-0.02em]">{title}</h3>

        <p className="text-sm leading-6 text-black/55">{text}</p>
      </div>
    </article>
  );
}

function PriceRow({ amount, title }) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 px-5 py-6">
      <div>
        <p className="text-2xl font-medium tracking-[-0.03em]">{amount}</p>

        <p className="mt-1 text-xs text-white/45">{title}</p>
      </div>

      <Check size={17} className="text-white/50" />
    </div>
  );
}

function Faq({ q, a }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-black/10">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="text-base font-medium">{q}</span>

        <span className="shrink-0">
          {open ? <X size={18} /> : <ChevronDown size={18} />}
        </span>
      </button>

      {open && (
        <p className="max-w-3xl pb-6 pr-10 text-sm leading-6 text-black/55">
          {a}
        </p>
      )}
    </div>
  );
}

export default Home;
