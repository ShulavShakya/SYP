import React from "react";
import { XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PaymentFailure() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#f6f7f8] px-4 py-10">
      <div className="mx-auto max-w-2xl rounded-2xl border border-red-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <XCircle className="mb-4 text-red-600" size={64} />
          <h1 className="text-2xl font-black text-slate-800">Payment Failed</h1>
          <p className="mt-3 text-sm text-slate-600">
            Your payment was cancelled or could not be completed. No appointment
            was created.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => navigate("/patient/appointments")}
              className="rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white"
            >
              Try Again
            </button>

            <button
              onClick={() => navigate("/patient")}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
