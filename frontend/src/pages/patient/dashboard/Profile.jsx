import React, { useState } from "react";
import {
  Camera,
  Mail,
  Phone,
  Save,
  RefreshCcw,
  LogOut,
  Eye,
  EyeOff,
} from "lucide-react";

function InputField({
  label,
  defaultValue = "",
  type = "text",
  placeholder = "",
  showToggle = false,
}) {
  const [visible, setVisible] = useState(false);
  const renderedType = showToggle ? (visible ? "text" : type) : type;

  return (
    <div>
      <label className="mb-3 block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <div className="relative">
        <input
          type={renderedType}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base text-slate-800 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
        />
        {showToggle && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
          >
            {visible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}

export default function PatientProfile() {
  return (
    <main className="min-h-screen px-6 py-10 text-textMain md:px-10">
      <div className="mx-auto max-w-4xl">
        {/* Profile Card */}
        <section className="rounded-3xl border border-gray-200 bg-card p-7 shadow-sm bg-[#f8fafb]">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="relative">
                <img
                  src="/mnt/data/ba729bc9-1af5-4d39-ae01-0cdb5acc4d22.png"
                  alt="Profile"
                  className="h-28 w-28 rounded-full object-cover object-left-top ring-4 ring-white"
                />
                <button className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white shadow-md transition hover:bg-primary/90">
                  <Camera size={16} />
                </button>
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-textMain">
                  Sarah Jenkins
                </h1>
                <p className="mt-1 text-lg font-semibold text-mint">
                  Senior Receptionist
                </p>

                <div className="mt-5 flex flex-col gap-3 text-textSecondary sm:flex-row sm:items-center sm:gap-8">
                  <div className="flex items-center gap-2 text-base">
                    <Mail size={16} />
                    <span>s.jenkins@medflow.com</span>
                  </div>
                  <div className="flex items-center gap-2 text-base">
                    <Phone size={16} />
                    <span>+1 234-567-890</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="self-start rounded-full bg-background px-4 py-2 text-sm font-bold uppercase tracking-wide text-primary">
              Active Status
            </div>
          </div>
        </section>

        {/* Account Information */}
        <section className="mt-8 overflow-hidden rounded-3xl border border-gray-200 bg-slate-50 shadow-sm">
          <div className="border-b border-gray-200 px-6 py-5">
            <h2 className="text-xl font-bold text-textMain">
              Account Information
            </h2>
          </div>

          <div className="p-6 bg-white">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <InputField label="Full Name" defaultValue="Sarah Jenkins" />
              <InputField label="Email" defaultValue="s.jenkins@medflow.com" />
              <InputField label="Phone Number" defaultValue="+1 234-567-890" />
              <InputField
                label="Address"
                defaultValue="123 Medical Plaza, City, State"
              />
            </div>

            <div className="mt-10 flex justify-end">
              <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-primary/90">
                <Save size={18} />
                Update Profile
              </button>
            </div>
          </div>
        </section>

        {/* Password Change */}
        <section className="mt-8 overflow-hidden rounded-3xl border border-gray-200 bg-slate-50 shadow-sm">
          <div className="border-b border-gray-200 px-6 py-5">
            <h2 className="text-xl font-bold text-textMain">Password Change</h2>
          </div>

          <div className="p-6 bg-white">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="md:col-span-1">
                <InputField
                  label="Current Password"
                  type="password"
                  placeholder="Enter current password"
                  // defaultValue="password123"
                />
              </div>
              <div className="hidden md:block" />

              <InputField
                label="New Password"
                type="password"
                placeholder="Enter new password"
                // defaultValue="password123"
                showToggle
              />
              <InputField
                label="Confirm New Password"
                type="password"
                placeholder="Confirm new password"
                // defaultValue="password123"
                showToggle
              />
            </div>

            <div className="mt-10 flex justify-end">
              <button className="inline-flex items-center gap-2 rounded-xl bg-mint px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-mint/90">
                <RefreshCcw size={18} />
                Change Password
              </button>
            </div>
          </div>
        </section>

        {/* Footer Row */}
        {/* <section className="mt-8 border-t border-gray-200 pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-lg italic text-textSecondary">
              Last updated: Oct 24, 2023 at 10:45 AM
            </p>

            <button className="inline-flex items-center gap-2 rounded-2xl border border-red-200 bg-white px-6 py-3 text-lg font-semibold text-red-500 transition hover:bg-red-50">
              <LogOut size={18} />
              Logout from Account
            </button>
          </div>
        </section> */}

        {/* Copyright */}
        <p className="mt-14 text-center text-sm text-slate-400">
          © 2024 MedFlow Health Systems. All rights reserved. Professional Use
          Only.
        </p>
      </div>
    </main>
  );
}
