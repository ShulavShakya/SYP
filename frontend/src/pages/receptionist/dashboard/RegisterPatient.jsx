import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  HeartPulse,
  User,
  Phone,
  ShieldCheck,
  Save,
  ChevronLeft,
} from "lucide-react";

function Field({ label, placeholder, type = "text", required = false }) {
  return (
    <label className="flex flex-col">
      <span className="mb-2 text-sm font-semibold text-slate-700">{label}</span>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        className="h-12 rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </label>
  );
}

export default function RegisterPatient() {
  return (
    <div className="min-h-screen bg-[#f6f7f8] font-display text-slate-900">
      <div className="flex min-h-screen flex-col">
        {/* Top Navigation Bar */}
        {/* <header className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 md:px-20">
          <div className="flex items-center gap-3 text-primary">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
              <HeartPulse size={18} className="text-primary" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              MedFlow
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <Link
              to="#"
              className="flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-primary"
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>

            <div
              className="h-10 w-10 rounded-full border-2 border-primary/10 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA7N9Y_HvkxAMd_ONfw0zwZZK6fGL-vOT6B3OaAPUJI5g57A51K4wXWAdo_3NhbLv_lbYq2ioMVr20WYWPp2lRCPT7bCfjK3X_cQdf0PBgY7X2hEamHebsEpE3-gwUlxKv64nXok2a8kfRXb_ypSq92k34aCutipIdEi_JAZzSy8j5dvR7Q8-YYnm6-N6e8mr_shQXJRh_fIcH8aarKhOwRWEMlYcHe-gWU7oGEwpeGz_GVL72kncKdjrdeJwgzpKIqzkuQiV3fLUL2")',
              }}
              aria-label="User avatar"
            />
          </div>
        </header> */}

        <main className="flex flex-1 justify-center px-4 py-10 md:px-0">
          <div className="flex w-full max-w-4xl flex-col space-y-8">
            {/* Header Section */}
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-black tracking-tight text-slate-900">
                Patient Registration
              </h1>
              <p className="text-base text-slate-500">
                Register a new patient to the MedFlow clinical network.
              </p>
            </div>

            {/* Main Form Card */}
            <form className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              {/* Personal Information */}
              <div className="border-b border-slate-100 p-8">
                <div className="mb-6 flex items-center gap-2">
                  <User size={18} className="text-primary" />
                  <h3 className="text-lg font-bold text-slate-800">
                    Personal Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <Field
                    label="Full Name"
                    placeholder="Johnathan Doe"
                    required
                  />

                  <Field label="Age" placeholder="25" type="number" required />

                  <label className="flex flex-col">
                    <span className="mb-2 text-sm font-semibold text-slate-700">
                      Gender
                    </span>
                    <select className="h-12 rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20">
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not">Prefer not to say</option>
                    </select>
                  </label>
                </div>
              </div>

              {/* Contact Information */}
              <div className="border-b border-slate-100 bg-slate-50/30 p-8">
                <div className="mb-6 flex items-center gap-2">
                  <Phone size={18} className="text-primary" />
                  <h3 className="text-lg font-bold text-slate-800">
                    Contact Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Field
                    label="Phone Number"
                    placeholder="+1 (555) 000-0000"
                    type="tel"
                  />

                  <Field
                    label="Email Address"
                    placeholder="john.doe@example.com"
                    type="email"
                  />

                  <div className="md:col-span-2">
                    <Field
                      label="Residential Address"
                      placeholder="123 Wellness Ave, Suite 100"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Field
                      label="Emergency Contact (Name & Phone)"
                      placeholder="Jane Doe - +1 (555) 111-2222"
                    />
                  </div>
                </div>
              </div>

              {/* Insurance Details */}
              <div className="p-8">
                <div className="mb-6 flex items-center gap-2">
                  <ShieldCheck size={18} className="text-primary" />
                  <h3 className="text-lg font-bold text-slate-800">
                    Insurance Details
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Field
                    label="Insurance Provider"
                    placeholder="HealthShield Inc."
                  />

                  <Field label="Insurance Number" placeholder="HS-9988776655" />
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex flex-col items-center justify-end gap-4 border-t border-slate-200 bg-slate-50 px-8 py-6 md:flex-row">
                <button
                  type="button"
                  onClick={() => navigate("reception/records")}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  <ChevronLeft size={18} />
                  Back
                </button>
                <button
                  type="reset"
                  className="w-full rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-100 md:w-auto"
                >
                  Clear Form
                </button>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-10 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 md:w-auto"
                >
                  <Save size={16} />
                  Save Patient
                </button>
              </div>
            </form>

            {/* Page Footer Helper */}
            <div className="flex justify-center py-4 text-xs text-slate-400">
              <p>
                © 2024 MedFlow Health Systems. Secured by 256-bit encryption.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
