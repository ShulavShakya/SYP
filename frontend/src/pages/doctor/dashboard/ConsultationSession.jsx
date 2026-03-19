import React from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  CheckCircle2,
  ChevronRight,
  FlaskConical,
  History,
  PlusCircle,
  Save,
  Search,
  Stethoscope,
  Trash2,
  Activity,
} from "lucide-react";

const labTests = [
  { label: "Complete Blood Work", checked: false },
  { label: "Chest X-Ray", checked: true },
  { label: "MRI Brain Scan", checked: false },
  { label: "Lipid Profile", checked: false },
];

const vitals = [
  { label: "BP (mmHg)", value: "130/85" },
  { label: "HEART RATE (bpm)", value: "72" },
  { label: "TEMP (°C)", value: "36.8" },
  { label: "SpO2 (%)", value: "98" },
];

export default function ConsultationSession() {
  const { id } = useParams();
  const location = useLocation();
  const patient = location.state?.patient;

  const patientData = patient || {
    id,
    name: "Unknown Patient",
    age: "--",
    complaint: "No complaint available",
    time: "--:--",
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F7FAFA] text-[#2C3E50]">
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="mb-2 flex items-center gap-2 text-sm text-[#2C3E50]/60">
            <a href="#" className="hover:text-[#008080]">
              Patients
            </a>
            <ChevronRight size={14} />
            <span className="text-[#2C3E50]">Consultation Session</span>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-[#2C3E50]">
                Patient Consultation
              </h1>
              <p className="text-[#2C3E50]/60">
                Patient ID: {patientData.id} • Active since {patientData.time}
              </p>
            </div>

            <div className="flex gap-3">
              <button className="flex items-center gap-2 rounded-lg border border-[#E0E6ED] bg-white px-4 py-2 text-sm font-semibold text-[#2C3E50] transition-colors hover:bg-slate-50">
                <History size={18} className="text-[#008080]" />
                View History
              </button>
            </div>
          </div>
        </div>

        <section className="mb-8 rounded-xl border border-[#E0E6ED] bg-white p-6 shadow-sm">
          <div className="flex flex-col items-start gap-8 md:flex-row">
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-[#008080]/10 text-[#008080]">
                <img
                  alt={patientData.name}
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJuigjQoOvDbYjrVg8P-Dldmivabk3abDnusyGSExQ6EAK-uZjF9hO5zNO_8EJjFTawd3QoKb0quuyERfDF4XzsntiE-4LSpM8xl4CQ08dy2vZWNu76vxgL67jF6aZKmHWIgWXBlvRLf555z9h9h5aCdEQLzOa3aWCrsszKRo_oajP-W6YrKUVPq070kHKp6QlJhP6p1ljfnwVMpG_ycRdMee_blHEsyzRm9-Zp0nX7NKW2ts2xyXsX5QrYlqLwb0mP3A6oaTnmtXs"
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#2C3E50]">
                  {patientData.name}
                </h3>
                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  <span className="rounded bg-[#F7FAFA] px-2 py-0.5 text-[#2C3E50]/70">
                    {patientData.age} Years
                  </span>
                  <span className="text-[#2C3E50]/60">
                    ID: {patientData.id}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid w-full flex-1 grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#2C3E50]/40">
                  Medical History
                </p>
                <p className="text-sm font-medium text-[#2C3E50]">
                  Hypertension, Type 2 Diabetes
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#2C3E50]/40">
                  Allergies
                </p>
                <span className="inline-flex items-center rounded bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">
                  Penicillin
                </span>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#2C3E50]/40">
                  Previous Visit
                </p>
                <p className="text-sm font-medium text-[#2C3E50]">
                  Oct 12, 2023 (Regular Checkup)
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <div className="rounded-xl border border-[#E0E6ED] bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <Activity size={18} className="text-[#008080]" />
                <h4 className="font-bold text-[#2C3E50]">
                  Symptoms / Chief Complaint
                </h4>
              </div>

              <textarea
                rows={3}
                defaultValue={patientData.complaint}
                placeholder="Describe the patient's current issues and duration..."
                className="w-full rounded-lg border border-[#E0E6ED] bg-[#F7FAFA] placeholder:text-[#2C3E50]/30 focus:border-[#008080] focus:ring-[#008080]"
              />
            </div>

            <div className="rounded-xl border border-[#E0E6ED] bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <Stethoscope size={18} className="text-[#008080]" />
                <h4 className="font-bold text-[#2C3E50]">
                  Diagnosis & Clinical Notes
                </h4>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-bold text-[#2C3E50]/60">
                    CLINICAL DIAGNOSIS
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search ICD-10 codes or enter diagnosis..."
                      className="w-full rounded-lg border border-[#E0E6ED] bg-[#F7FAFA] pr-10 focus:border-[#008080] focus:ring-[#008080]"
                    />
                    <Search
                      size={18}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2C3E50]/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold text-[#2C3E50]/60">
                    DETAILED DOCTOR NOTES
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Enter comprehensive consultation details, physical exam findings, and clinical reasoning..."
                    className="w-full rounded-lg border border-[#E0E6ED] bg-[#F7FAFA] focus:border-[#008080] focus:ring-[#008080]"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[#E0E6ED] bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PlusCircle size={18} className="text-[#008080]" />
                  <h4 className="font-bold text-[#2C3E50]">Prescriptions</h4>
                </div>

                <button className="flex items-center gap-1 text-sm font-bold text-[#008080] hover:text-[#008080]/80">
                  <PlusCircle size={18} />
                  Add Medication
                </button>
              </div>

              <div className="overflow-hidden rounded-lg border border-[#E0E6ED]">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#F7FAFA] font-bold text-[#2C3E50]/60">
                    <tr>
                      <th className="px-4 py-3">Drug Name</th>
                      <th className="px-4 py-3">Dosage</th>
                      <th className="px-4 py-3">Frequency</th>
                      <th className="w-10 px-4 py-3" />
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#E0E6ED]">
                    <tr>
                      <td className="px-4 py-3 font-medium">Amlodipine 5mg</td>
                      <td className="px-4 py-3">1 Tablet</td>
                      <td className="px-4 py-3">Once daily (morning)</td>
                      <td className="px-4 py-3">
                        <Trash2
                          size={16}
                          className="cursor-pointer text-slate-300 hover:text-red-500"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          placeholder="Enter drug name..."
                          className="w-full border-none bg-transparent p-0 text-sm placeholder:italic focus:ring-0"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          placeholder="e.g. 500mg"
                          className="w-full border-none bg-transparent p-0 text-sm focus:ring-0"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          placeholder="e.g. Twice daily"
                          className="w-full border-none bg-transparent p-0 text-sm focus:ring-0"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Trash2
                          size={16}
                          className="cursor-pointer text-slate-300 hover:text-red-500"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-xl border border-[#E0E6ED] bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-2">
                <Activity size={18} className="text-[#008080]" />
                <h4 className="font-bold text-[#2C3E50]">Patient Vitals</h4>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {vitals.map((item) => (
                  <div key={item.label} className="space-y-1">
                    <label className="text-[10px] font-bold text-[#2C3E50]/50">
                      {item.label}
                    </label>
                    <input
                      type="text"
                      defaultValue={item.value}
                      className="w-full rounded-lg border border-[#E0E6ED] bg-[#F7FAFA] text-center font-bold text-[#008080]"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-[#E0E6ED] pt-4">
                <p className="text-center text-[10px] font-bold text-[#2C3E50]/40">
                  LAST UPDATED: 10 MINS AGO
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-[#E0E6ED] bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <FlaskConical size={18} className="text-[#008080]" />
                <h4 className="font-bold text-[#2C3E50]">Order Lab Tests</h4>
              </div>

              <div className="space-y-3">
                {labTests.map((test) => (
                  <label
                    key={test.label}
                    className="group flex cursor-pointer items-center gap-3 rounded-lg border border-[#E0E6ED] p-3 transition-colors hover:bg-[#F7FAFA]"
                  >
                    <input
                      type="checkbox"
                      defaultChecked={test.checked}
                      className="h-5 w-5 rounded border-[#E0E6ED] text-[#008080] focus:ring-[#008080]"
                    />
                    <span className="text-sm font-medium text-[#2C3E50]/80">
                      {test.label}
                    </span>
                  </label>
                ))}
              </div>

              <div className="mt-4">
                <input
                  type="text"
                  placeholder="+ Custom lab request"
                  className="w-full rounded-lg border border-[#E0E6ED] bg-[#F7FAFA] py-2 text-xs"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-end gap-4 pb-12 sm:flex-row">
          <button className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#008080] px-8 py-3 font-bold text-[#008080] transition-colors hover:bg-[#008080]/5 sm:w-auto">
            <Save size={18} />
            Save Draft Notes
          </button>

          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#008080] px-10 py-3 font-bold text-white shadow-[0_10px_24px_rgba(0,128,128,0.18)] transition-all hover:bg-[#007272] sm:w-auto">
            <CheckCircle2 size={18} />
            Complete Consultation
          </button>
        </div>
      </main>

      <footer className="border-t border-[#E0E6ED] bg-white py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-xs font-medium text-[#2C3E50]/40 sm:px-6 md:flex-row lg:px-8">
          <p>
            © 2023 CarePoint Health Systems. All Patient Data is Encrypted and
            HIPAA Compliant.
          </p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-[#008080]">
              Help Center
            </a>
            <a href="#" className="hover:text-[#008080]">
              System Status
            </a>
            <a href="#" className="hover:text-[#008080]">
              Report an Issue
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
