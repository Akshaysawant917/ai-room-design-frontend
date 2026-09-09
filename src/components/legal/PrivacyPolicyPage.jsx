import LegalPage from "./LegalPage";

function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="September 9, 2026">
      <section>
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.03em] text-[#20221f]">
          1. Introduction
        </h2>
        <p>
          AI Home Transform allows users to upload room images and generate
          AI-powered interior design visualizations. To provide this service, we
          need to process the information users share with us, including images,
          design preferences, account details, and payment information required to
          complete a transformation request.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.03em] text-[#20221f]">
          2. Information We Collect
        </h2>
        <p>
          We may collect and use information that users provide or access as part
          of using the service, including:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>Name</li>
          <li>Email address</li>
          <li>Google account ID</li>
          <li>Google profile picture/avatar</li>
          <li>Uploaded room images</li>
          <li>Transformation/design information submitted by the user</li>
          <li>Payment/order-related information necessary to process purchases</li>
        </ul>
        <p className="mt-3">
          AI Home Transform does not currently use advertising or tracking
          services for analytics, advertising, cookies, IP address logging, device
          information, or similar tracking systems as part of the service
          described here.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.03em] text-[#20221f]">
          3. Google Sign-In
        </h2>
        <p>
          Authentication is provided through Google OAuth. When users sign in with
          Google, we may receive basic profile information such as:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>Name</li>
          <li>Email</li>
          <li>Google ID</li>
          <li>Profile picture/avatar</li>
        </ul>
        <p className="mt-3">
          We do not receive the user's Google password. Google handles the
          authentication process and provides only the profile information needed
          to identify the account and personalize the experience.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.03em] text-[#20221f]">
          4. Uploaded Images
        </h2>
        <p>
          Users upload room images to generate transformations. These images are
          stored using Cloudinary. Original uploaded images may be retained after
          generation to support the service and transformation history. We may
          delete stored user data or images after approximately 30 days as part of
          our retention practices. We do not promise permanent storage.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.03em] text-[#20221f]">
          5. AI Processing
        </h2>
        <p>
          Uploaded images may be sent to OpenAI or other necessary service
          providers to process the requested AI transformation. This is done to
          provide the room-design service requested by the user. We do not claim
          that user images are used to train AI models unless that practice has
          been explicitly verified and disclosed.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.03em] text-[#20221f]">
          6. Payments
        </h2>
        <p>
          Payments are processed through Razorpay. AI Home Transform does not
          directly store users' complete card or payment credentials. Payment
          information is handled by the payment provider as part of the purchase
          process.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.03em] text-[#20221f]">
          7. How We Use Information
        </h2>
        <p>
          We use information to:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>Authenticate users</li>
          <li>Provide room transformation services</li>
          <li>Store transformation history</li>
          <li>Process payments</li>
          <li>Display generated designs in the user's dashboard</li>
          <li>Provide customer support</li>
          <li>Resolve failed or incorrect transformations</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.03em] text-[#20221f]">
          8. Data Retention
        </h2>
        <p>
          User information and uploaded images may be retained to provide the
          service and may be deleted after approximately 30 days. Retention may
          vary depending on service needs, technical requirements, and support
          issues. We do not promise a permanent retention period.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.03em] text-[#20221f]">
          9. Data Security
        </h2>
        <p>
          We use reasonable measures to protect user information and uploaded
          images, but no online service can guarantee absolute security. Users
          should also take care when sharing images and personal information.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.03em] text-[#20221f]">
          10. Third-Party Services
        </h2>
        <p>
          AI Home Transform uses third-party providers to support the service,
          including Google OAuth for sign-in, Cloudinary for image storage,
          OpenAI for AI processing, and Razorpay for payments. These providers are
          involved in the delivery of the service, but the specific details of
          their internal data handling are governed by their own policies.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.03em] text-[#20221f]">
          11. User Rights / Account
        </h2>
        <p>
          Users currently cannot directly delete their account or uploaded images
          through the website. For account or data-related requests, users may
          contact us at akshaysawant917@gmail.com.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.03em] text-[#20221f]">
          12. Children's Privacy
        </h2>
        <p>
          The service is not intended for children, and users should not use the
          service if they are under the age required by applicable law.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.03em] text-[#20221f]">
          13. Changes to Privacy Policy
        </h2>
        <p>
          This Privacy Policy may be updated from time to time. Continued use of
          the service after changes are made indicates acceptance of the updated
          policy.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-medium tracking-[-0.03em] text-[#20221f]">
          14. Contact
        </h2>
        <p>
          For privacy questions or data requests, contact:
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

export default PrivacyPolicyPage;
