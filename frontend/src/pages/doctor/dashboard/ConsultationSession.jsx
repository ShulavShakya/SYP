import React, { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  ChevronRight,
  History,
  Save,
  Search,
  Stethoscope,
  Trash2,
  Activity,
  FileText,
  Plus,
} from "lucide-react";

const frequencyOptions = [
  "Once daily",
  "Twice daily (BD)",
  "Thrice daily (TDS)",
  "Four times daily (QDS)",
  "As needed (PRN)",
];

const createEmptyMedicine = () => ({
  medicineName: "",
  dosage: "",
  frequency: "Once daily",
  duration: "",
  notes: "",
});

export default function ConsultationSession() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const patient = location.state?.patient;

  const patientData = patient || {
    id,
    name: "Unknown Patient",
    age: "--",
    complaint: "No complaint available",
    time: "--:--",
  };

  const [medicines, setMedicines] = useState([
    {
      medicineName: "Amlodipine 5mg",
      dosage: "1 Tablet",
      frequency: "Once daily (morning)",
      duration: "",
      notes: "",
    },
  ]);

  const [generalNotes, setGeneralNotes] = useState("");

  const handleMedicineChange = (index, field, value) => {
    setMedicines((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
  };

  const addMedicineRow = () => {
    setMedicines((prev) => [...prev, createEmptyMedicine()]);
  };

  const removeMedicineRow = (index) => {
    setMedicines((prev) => prev.filter((_, i) => i !== index));
  };

  if (!id || !patient) {
    return (
      <div className="mx-auto w-full max-w-5xl px-8 py-10">
        <div className="rounded-2xl border border-[#E0E6ED] bg-white p-10 shadow-sm">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-4 rounded-full bg-[#008080]/10 p-4">
              <Stethoscope className="text-[#008080]" size={32} />
            </div>

            <h2 className="text-2xl font-bold text-[#2C3E50]">
              No consultation in progress
            </h2>

            <p className="mt-3 max-w-md text-sm text-[#7F8C8D]">
              There is no active consultation session right now. Please go to
              the patient queue and start a consultation for a patient.
            </p>

            <button
              onClick={() => navigate("/doctor/patient-queue")}
              className="mt-6 rounded-lg bg-[#008080] px-5 py-2.5 text-sm font-bold text-white hover:opacity-90"
            >
              Go to Patient Queue
            </button>
          </div>
        </div>
      </div>
    );
  }

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

        <div className="grid grid-cols-1 gap-8">
          <div className="w-full space-y-8">
            <div className="rounded-xl border border-[#E0E6ED] bg-white p-8 shadow-sm">
              <div className="mb-5 flex items-center gap-2">
                <Activity size={18} className="text-[#008080]" />
                <h4 className="font-bold text-[#2C3E50]">
                  Symptoms / Chief Complaint
                </h4>
              </div>

              <textarea
                rows={5}
                defaultValue={patientData.complaint}
                placeholder="Describe the patient's current issues and duration..."
                className="w-full rounded-lg border border-[#E0E6ED] bg-[#F7FAFA] placeholder:text-[#2C3E50]/30 focus:border-[#008080] focus:ring-[#008080]"
              />
            </div>

            <div className="rounded-xl border border-[#E0E6ED] bg-white p-8 shadow-sm">
              <div className="mb-5 flex items-center gap-2">
                <Stethoscope size={18} className="text-[#008080]" />
                <h4 className="font-bold text-[#2C3E50]">
                  Diagnosis & Clinical Notes
                </h4>
              </div>

              <div className="space-y-5">
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
                    rows={8}
                    placeholder="Enter comprehensive consultation details, physical exam findings, and clinical reasoning..."
                    className="w-full rounded-lg border border-[#E0E6ED] bg-[#F7FAFA] focus:border-[#008080] focus:ring-[#008080]"
                  />
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-[#E0E6ED] bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-[#E0E6ED] p-6">
                <div className="flex items-center gap-2">
                  <FileText size={18} className="text-[#008080]" />
                  <h4 className="font-bold text-[#2C3E50]">Prescriptions</h4>
                </div>

                <button
                  type="button"
                  onClick={addMedicineRow}
                  className="flex items-center gap-2 rounded-lg bg-[#008080] px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-[#007272]"
                >
                  <Plus className="h-4 w-4" />
                  Add Medicine
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <thead className="border-b border-[#E0E6ED] bg-[#F7FAFA]">
                    <tr>
                      <th className="p-4 text-xs font-bold uppercase text-[#7F8C8D]">
                        Medicine Name
                      </th>
                      <th className="p-4 text-xs font-bold uppercase text-[#7F8C8D]">
                        Dosage
                      </th>
                      <th className="p-4 text-xs font-bold uppercase text-[#7F8C8D]">
                        Frequency
                      </th>
                      <th className="p-4 text-xs font-bold uppercase text-[#7F8C8D]">
                        Duration
                      </th>
                      <th className="p-4 text-xs font-bold uppercase text-[#7F8C8D]">
                        Notes
                      </th>
                      <th className="w-16 p-4 text-center text-xs font-bold uppercase text-[#7F8C8D]">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#E0E6ED]">
                    {medicines.map((medicine, index) => (
                      <tr
                        key={index}
                        className="transition-colors hover:bg-gray-50"
                      >
                        <td className="p-2">
                          <input
                            type="text"
                            value={medicine.medicineName}
                            onChange={(e) =>
                              handleMedicineChange(
                                index,
                                "medicineName",
                                e.target.value,
                              )
                            }
                            placeholder="e.g. Amoxicillin"
                            className="w-full rounded bg-transparent p-2 transition focus:bg-[#f0fdfa] focus:outline-none focus:ring-2 focus:ring-[#70C1B3]"
                          />
                        </td>

                        <td className="w-32 p-2">
                          <input
                            type="text"
                            value={medicine.dosage}
                            onChange={(e) =>
                              handleMedicineChange(
                                index,
                                "dosage",
                                e.target.value,
                              )
                            }
                            placeholder="1 tablet"
                            className="w-full rounded bg-transparent p-2 transition focus:bg-[#f0fdfa] focus:outline-none focus:ring-2 focus:ring-[#70C1B3]"
                          />
                        </td>

                        <td className="w-48 p-2">
                          <select
                            value={medicine.frequency}
                            onChange={(e) =>
                              handleMedicineChange(
                                index,
                                "frequency",
                                e.target.value,
                              )
                            }
                            className="w-full rounded bg-transparent p-2 transition focus:bg-[#f0fdfa] focus:outline-none focus:ring-2 focus:ring-[#70C1B3]"
                          >
                            {frequencyOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </td>

                        <td className="w-32 p-2">
                          <input
                            type="text"
                            value={medicine.duration}
                            onChange={(e) =>
                              handleMedicineChange(
                                index,
                                "duration",
                                e.target.value,
                              )
                            }
                            placeholder="5 days"
                            className="w-full rounded bg-transparent p-2 transition focus:bg-[#f0fdfa] focus:outline-none focus:ring-2 focus:ring-[#70C1B3]"
                          />
                        </td>

                        <td className="p-2">
                          <input
                            type="text"
                            value={medicine.notes}
                            onChange={(e) =>
                              handleMedicineChange(
                                index,
                                "notes",
                                e.target.value,
                              )
                            }
                            placeholder="After food"
                            className="w-full rounded bg-transparent p-2 transition focus:bg-[#f0fdfa] focus:outline-none focus:ring-2 focus:ring-[#70C1B3]"
                          />
                        </td>

                        <td className="p-2 text-center">
                          <button
                            type="button"
                            onClick={() => removeMedicineRow(index)}
                            className="rounded-full p-2 text-red-400 transition-colors hover:bg-red-50 hover:text-red-600"
                            title="Remove row"
                          >
                            <Trash2 className="mx-auto h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-[#F7FAFA]/50 p-6">
                <label className="mb-2 block text-xs font-bold uppercase text-[#7F8C8D]">
                  General Instructions / Diagnosis
                </label>
                <textarea
                  rows={3}
                  value={generalNotes}
                  onChange={(e) => setGeneralNotes(e.target.value)}
                  placeholder="Additional clinical observations or lifestyle advice..."
                  className="w-full rounded-lg border border-[#E0E6ED] p-3 text-sm focus:border-[#70C1B3] focus:outline-none focus:ring-2 focus:ring-[#70C1B3]"
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
