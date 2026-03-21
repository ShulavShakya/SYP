import React, { useState } from "react";
import {
  Camera,
  Mail,
  Phone,
  Save,
  RefreshCcw,
  Eye,
  EyeOff,
  Stethoscope,
  Building2,
  Award,
  Clock3,
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

export default function DoctorProfile() {
  return (
    <main className="min-h-screen px-6 py-10 text-textMain md:px-10">
      <div className="mx-auto max-w-5xl">
        {/* Profile Card */}
        <section className="rounded-3xl border border-gray-200 bg-card p-7 shadow-sm bg-[#f8fafb]">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="relative">
                <img
                  src="/mnt/data/ba729bc9-1af5-4d39-ae01-0cdb5acc4d22.png"
                  alt="Doctor Profile"
                  className="h-28 w-28 rounded-full object-cover object-left-top ring-4 ring-white"
                />
                <button className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white shadow-md transition hover:bg-primary/90">
                  <Camera size={16} />
                </button>
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-textMain">
                  Dr. Sarah Jenkins
                </h1>
                <p className="mt-1 text-lg font-semibold text-mint">
                  Consultant Cardiologist
                </p>

                <div className="mt-5 grid grid-cols-1 gap-3 text-textSecondary sm:grid-cols-2 sm:gap-x-8">
                  <div className="flex items-center gap-2 text-base">
                    <Mail size={16} />
                    <span>dr.sjenkins@medflow.com</span>
                  </div>
                  <div className="flex items-center gap-2 text-base">
                    <Phone size={16} />
                    <span>+1 234-567-890</span>
                  </div>
                  <div className="flex items-center gap-2 text-base">
                    <Building2 size={16} />
                    <span>Cardiology Department</span>
                  </div>
                  <div className="flex items-center gap-2 text-base">
                    <Award size={16} />
                    <span>License No: MD-48291</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="self-start rounded-full bg-background px-4 py-2 text-sm font-bold uppercase tracking-wide text-primary">
              On Duty
            </div>
          </div>
        </section>

        {/* Professional Information */}
        <section className="mt-8 overflow-hidden rounded-3xl border border-gray-200 bg-slate-50 shadow-sm">
          <div className="border-b border-gray-200 px-6 py-5">
            <h2 className="text-xl font-bold text-textMain">
              Professional Information
            </h2>
          </div>

          <div className="bg-white p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <InputField label="Full Name" defaultValue="Dr. Sarah Jenkins" />
              <InputField
                label="Email"
                defaultValue="dr.sjenkins@medflow.com"
              />
              <InputField label="Phone Number" defaultValue="+1 234-567-890" />
              <InputField
                label="Department"
                defaultValue="Cardiology Department"
              />
              <InputField
                label="Specialization"
                defaultValue="Interventional Cardiology"
              />
              <InputField
                label="Medical License Number"
                defaultValue="MD-48291"
              />
              <InputField label="Years of Experience" defaultValue="12 Years" />
              <InputField
                label="Consultation Room"
                defaultValue="Room 302, East Wing"
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

        {/* Availability */}
        <section className="mt-8 overflow-hidden rounded-3xl border border-gray-200 bg-slate-50 shadow-sm">
          <div className="border-b border-gray-200 px-6 py-5">
            <h2 className="text-xl font-bold text-textMain">
              Availability & Schedule
            </h2>
          </div>

          <div className="bg-white p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <InputField label="Working Days" defaultValue="Monday - Friday" />
              <InputField
                label="Consultation Hours"
                defaultValue="09:00 AM - 04:00 PM"
              />
              <InputField
                label="Emergency Availability"
                defaultValue="Available on-call"
              />
              <InputField
                label="Appointment Slot Duration"
                defaultValue="30 Minutes"
              />
            </div>

            <div className="mt-10 flex justify-end">
              <button className="inline-flex items-center gap-2 rounded-xl bg-mint px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-mint/90">
                <Clock3 size={18} />
                Update Schedule
              </button>
            </div>
          </div>
        </section>

        {/* Password Change */}
        <section className="mt-8 overflow-hidden rounded-3xl border border-gray-200 bg-slate-50 shadow-sm">
          <div className="border-b border-gray-200 px-6 py-5">
            <h2 className="text-xl font-bold text-textMain">Password Change</h2>
          </div>

          <div className="bg-white p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="md:col-span-1">
                <InputField
                  label="Current Password"
                  type="password"
                  placeholder="Enter current password"
                />
              </div>
              <div className="hidden md:block" />

              <InputField
                label="New Password"
                type="password"
                placeholder="Enter new password"
                showToggle
              />
              <InputField
                label="Confirm New Password"
                type="password"
                placeholder="Confirm new password"
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

        {/* Quick Stats */}
        <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 text-primary">
              <Stethoscope size={20} />
              <h3 className="text-lg font-bold">Patients Seen</h3>
            </div>
            <p className="mt-4 text-3xl font-bold text-textMain">1,248</p>
            <p className="mt-1 text-sm text-textSecondary">This year</p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 text-primary">
              <Clock3 size={20} />
              <h3 className="text-lg font-bold">Upcoming Appointments</h3>
            </div>
            <p className="mt-4 text-3xl font-bold text-textMain">18</p>
            <p className="mt-1 text-sm text-textSecondary">Today</p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 text-primary">
              <Award size={20} />
              <h3 className="text-lg font-bold">Experience</h3>
            </div>
            <p className="mt-4 text-3xl font-bold text-textMain">12 yrs</p>
            <p className="mt-1 text-sm text-textSecondary">Clinical practice</p>
          </div>
        </section>

        <p className="mt-14 text-center text-sm text-slate-400">
          © 2024 MedFlow Health Systems. All rights reserved. Professional Use
          Only.
        </p>
      </div>
    </main>
  );
}
