import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { privateAPI } from "../../../auth/config/api";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

export default function PaymentVerify() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    const verifyPaymentOnBackend = async () => {
      const pidx = searchParams.get("pidx");
      const appointmentId = searchParams.get("purchase_order_id");

      if (!pidx || !appointmentId) {
        setStatus("error");
        return;
      }

      try {
        const response = await privateAPI.get(
          `/patient/payment/verify/?pidx=${pidx}&purchase_order_id=${appointmentId}`,
        );

        if (response.data.success) {
          setStatus("success");

          setTimeout(() => navigate("/patient/appointment-history"), 3000);
        } else {
          setStatus("error");
        }
      } catch (err) {
        console.error("Verification error:", err);
        setStatus("error");
      }
    };

    verifyPaymentOnBackend();
  }, [searchParams, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
      {status === "verifying" && (
        <div className="space-y-4">
          <Loader2 className="animate-spin text-[#008080] mx-auto" size={50} />
          <h2 className="text-xl font-bold text-slate-800">
            Verifying Transaction...
          </h2>
          <p className="text-slate-500">
            Please do not refresh or close this page.
          </p>
        </div>
      )}

      {status === "success" && (
        <div className="space-y-4 animate-in fade-in zoom-in duration-300">
          <CheckCircle className="text-emerald-500 mx-auto" size={80} />
          <h2 className="text-2xl font-bold text-slate-900">
            Payment Successful!
          </h2>
          <p className="text-slate-600">Your appointment is now confirmed.</p>
          <p className="text-sm text-[#008080] font-semibold">
            Redirecting you back to your records...
          </p>
        </div>
      )}

      {status === "error" && (
        <div className="space-y-4">
          <XCircle className="text-red-500 mx-auto" size={80} />
          <h2 className="text-2xl font-bold text-slate-900">
            Payment Verification Failed
          </h2>
          <p className="text-slate-600">
            We couldn't verify your payment with Khalti.
          </p>
          <button
            onClick={() => navigate("/patient/appointment-history")}
            className="mt-6 px-6 py-3 bg-[#008080] text-white rounded-xl font-bold hover:brightness-110 transition-all"
          >
            Go Back to Appointments
          </button>
        </div>
      )}
    </div>
  );
}
