import LegalPage from "./LegalPage";

function TermsPage() {
  return (
    <LegalPage title="Terms of Service" lastUpdated="September 9, 2026">
      <section>
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.03em] text-[#20221f]">
          1. Acceptance of Terms
        </h2>
        <p>
          By accessing or using AI Home Transform, you agree to these Terms of
          Service. If you do not agree, you should not use the service.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.03em] text-[#20221f]">
          2. Description of Service
        </h2>
        <p>
          AI Home Transform allows users to upload room images and receive
          AI-generated interior design visualizations. The service is intended to
          help users explore room redesign ideas and visualize possible
          alternatives before making design or purchase decisions.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.03em] text-[#20221f]">
          3. Google Authentication
        </h2>
        <p>
          Users authenticate using Google. AI Home Transform relies on Google
          sign-in to identify the user account and maintain access to saved
          transformation history and related account features.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.03em] text-[#20221f]">
          4. User Responsibilities
        </h2>
        <p>
          Users must:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>Upload images they have the right to use</li>
          <li>Not upload illegal, harmful, abusive, or infringing content</li>
          <li>Not misuse the service</li>
          <li>Not attempt to disrupt or abuse the service</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.03em] text-[#20221f]">
          5. AI-Generated Content
        </h2>
        <p>
          Results are generated using AI. They are intended for visualization and
          inspiration. AI results may contain inaccuracies. Room dimensions,
          colors, furniture, materials, lighting, placement, and other details
          may not accurately represent real-world outcomes.
        </p>
        <p className="mt-3">
          AI Home Transform does not guarantee that the generated design will
          exactly match the user's actual room or that it can be implemented
          precisely as shown.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.03em] text-[#20221f]">
          6. Pricing
        </h2>
        <p>
          Current pricing is as follows:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>First transformation: ₹49</li>
          <li>Additional transformations: ₹99 each</li>
        </ul>
        <p className="mt-3">
          These are individual transformation purchases, not subscriptions or
          recurring credits. Pricing may change in the future.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.03em] text-[#20221f]">
          7. Payments
        </h2>
        <p>
          Payments are processed through Razorpay. Users are responsible for
          providing accurate payment details and ensuring that any purchase is
          authorized by them.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.03em] text-[#20221f]">
          8. Failed Transformations
        </h2>
        <p>
          If payment succeeds but the transformation fails, users should contact
          support at akshaysawant917@gmail.com. Support may work to resolve the
          issue, provide the generated image, or ensure the transformation becomes
          available in the user's dashboard. This does not create an automatic
          refund entitlement.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.03em] text-[#20221f]">
          9. Intellectual Property
        </h2>
        <p>
          Users retain ownership of their uploaded content and any content they
          submit to the service. AI Home Transform processes that content to
          provide the requested transformation service. Generated results are
          provided for user convenience and inspiration and do not constitute a
          guarantee of final design or implementation. We do not make broad claims
          about ownership of generated outputs beyond what is necessary to provide
          the service and to make generated results available to the user.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.03em] text-[#20221f]">
          10. Prohibited Use
        </h2>
        <p>
          Users may not use the service to upload or generate content that is
          illegal, harmful, abusive, infringing, deceptive, or otherwise in
          violation of applicable law or the reasonable use of the platform.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.03em] text-[#20221f]">
          11. Service Availability
        </h2>
        <p>
          AI Home Transform aims to provide a reliable service, but uninterrupted
          availability is not guaranteed. Service interruptions, maintenance, or
          technical issues may occur.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.03em] text-[#20221f]">
          12. Limitation of Liability
        </h2>
        <p>
          AI Home Transform is provided as-is for inspiration and visualization.
          We do not guarantee specific outcomes, exact visual matches, or
          real-world implementation accuracy. To the extent permitted by law, we
          are not liable for incidental, indirect, or consequential damages arising
          from the use of the service.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.03em] text-[#20221f]">
          13. Changes to Terms
        </h2>
        <p>
          These Terms may change from time to time. Continued use of the service
          after updated terms are posted constitutes acceptance of those changes.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.03em] text-[#20221f]">
          14. Contact
        </h2>
        <p>
          For support or questions, contact:
          <br />
          <a
            href="mailto:akshaysawant917@gmail.com"
            className="font-medium text-[#20221f] underline underline-offset-4"
          >
            akshaysawant917@gmail.com
          </a>
        </p>
      </section>
    </LegalPage>
  );
}

export default TermsPage;
