import { useEffect, useState } from "react";
import { ArrowRight, Check, X } from "lucide-react";
import { verifyPayment } from "../../api/payments";

function PaymentModal({ onClose, onVerified, order }) {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async () => {
    setProcessing(true);
    setError("");

    try {
      if (!window.Razorpay) {
        throw new Error(
          "Payment is not configured yet. Please try again once Razorpay is connected.",
        );
      }

      const razorpay = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: "ai.home",
        description: "Room transformation",
        handler: async (response) => {
          try {
            const verification = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            const verificationData = verification.data || verification;
            await onVerified(
              verificationData.transformationId || order.transformationId,
            );
          } catch (verificationError) {
            setError(verificationError.message);
            setProcessing(false);
          }
        },
        modal: {
          ondismiss: () => setProcessing(false),
        },
      });

      razorpay.open();
    } catch (paymentError) {
      setError(paymentError.message);
      setProcessing(false);
    }
  };

  useEffect(() => {
    if (order) handlePayment();
  }, [order]);

  const price = Number(order?.amount || 0) / 100;
  const formattedPrice = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
  }).format(price);

  return (
    <div
      className="fixed inset-0 z-20 grid place-items-center bg-[#20221f]/60 p-5"
      role="presentation"
    >
      <section
        className="relative w-full max-w-[430px] bg-[#f6f3ee] px-6 py-10 text-center shadow-[0_20px_60px_#20221f40] sm:px-9"
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-title"
      >
        <button
          className="absolute right-3.5 top-3.5 border-0 bg-transparent text-[#6e7169]"
          onClick={onClose}
          aria-label="Close payment dialog"
        >
          <X size={18} />
        </button>
        <span className="mx-auto mb-5 grid size-11 place-items-center rounded-full bg-[#bd5c42] text-white">
          <Check size={19} />
        </span>
        <p className="mb-6 text-[10px] font-bold uppercase tracking-[1.7px] text-[#bd5c42]">
          One-time payment
        </p>
        <h2
          id="payment-title"
          className="text-4xl font-medium leading-[.98] tracking-[-2px]"
        >
          Keep designing
          <br />
          <em>your home.</em>
        </h2>
        <p className="mx-auto my-5 max-w-[300px] text-[13px] leading-relaxed text-[#6e7169]">
          Pay securely to start generating this room transformation.
        </p>
        <div className="border-y border-[#d8d2c8] py-4">
          <strong className="block font-serif text-4xl font-medium">
            ₹{formattedPrice}
          </strong>
          <span className="mt-1 block text-[10px] text-[#6e7169]">
            No subscription. No credits. No hidden charges.
          </span>
        </div>
        {error && <p className="mt-3 text-xs text-[#a33d2c]">{error}</p>}
        <button
          className="mt-5 inline-flex w-full items-center justify-center gap-5 border-0 bg-[#20221f] px-5 py-3 text-xs font-semibold text-[#f6f3ee] disabled:cursor-wait disabled:opacity-60"
          onClick={handlePayment}
          disabled={processing}
        >
          {processing ? (
            "Opening secure payment..."
          ) : (
            <>
              Pay ₹{formattedPrice} & transform <ArrowRight size={16} />
            </>
          )}
        </button>
      </section>
    </div>
  );
}

export default PaymentModal;
