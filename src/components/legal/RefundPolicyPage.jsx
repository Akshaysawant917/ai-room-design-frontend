import LegalPage from "./LegalPage";

function RefundPolicyPage() {
  return (
    <LegalPage title="Refund & Cancellation Policy" lastUpdated="September 9, 2026">
      <section>
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.03em] text-[#20221f]">
          1. Purchases
        </h2>
        <p>
          Users purchase individual room transformations. Each transformation is a
          separate paid request.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.03em] text-[#20221f]">
          2. Pricing
        </h2>
        <p>
          Current pricing is as follows:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>First transformation: ₹49</li>
          <li>Additional transformations: ₹99</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.03em] text-[#20221f]">
          3. Refunds
        </h2>
        <p>
          Successful and completed transformations are generally not eligible for
          refunds. If a transformation has been successfully delivered and is
          available to the user, it is usually considered a completed service.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.03em] text-[#20221f]">
          4. Failed Transformations
        </h2>
        <p>
          If a payment succeeds but the AI transformation fails or there is a
          technical problem, users should contact support at:
          <br />
          <a
            href="mailto:akshaysawant917@gmail.com"
            className="font-medium text-[#20221f] underline underline-offset-4"
          >
            akshaysawant917@gmail.com
          </a>
        </p>
        <p className="mt-3">
          In such cases, support may fix the transformation, provide the
          generated image, or make the result available in the user's dashboard.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.03em] text-[#20221f]">
          5. Duplicate or Technical Payment Issues
        </h2>
        <p>
          If a user believes they were charged incorrectly or experienced a
          payment or technical issue, they should contact support at
          akshaysawant917@gmail.com for review.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.03em] text-[#20221f]">
          6. Cancellation
        </h2>
        <p>
          Because transformations are individually purchased and processing may
          begin immediately, cancellation may not be available after the
          transformation process begins. If you believe your request should be
          reviewed before processing begins, please contact support as soon as
          possible.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.03em] text-[#20221f]">
          7. Contact
        </h2>
        <p>
          For refund, cancellation, or payment questions, contact:
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

export default RefundPolicyPage;
