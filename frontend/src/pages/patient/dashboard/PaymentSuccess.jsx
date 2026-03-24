import React from "react";
import { CheckCircle2, CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#f6f7f8] px-4 py-10">
      <div className="mx-auto max-w-2xl rounded-2xl border border-green-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <CheckCircle2 className="mb-4 text-green-600" size={64} />
          <h1 className="text-2xl font-black text-slate-800">
            Payment Successful
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            Your payment was completed successfully and your appointment has
            been created.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => navigate("/patient/appointment-history")}
              className="rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white"
            >
              View Appointments
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
