import React, { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { privateAPI } from "../../../auth/config/api";
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
  const { id } = useParams(); // This is the appointment_id from the URL
  const location = useLocation();
  const navigate = useNavigate();

  const patient = location.state?.patient;

  const patientData = {
    id: patient?.id || id,
    db_patient_id: patient?.patient,
    name: patient?.patient_name || "Unknown Patient",
    age: patient?.age || "N/A",
    complaint: patient?.reason || "",
    time: patient?.time || "--:--",
    dept: patient?.department_name || "General",
    dob: patient?.dob || null,
  };

  const [symptoms, setSymptoms] = useState(patientData.complaint);
  const [diagnosis, setDiagnosis] = useState("");
  const [detailedNotes, setDetailedNotes] = useState("");
  const [generalNotes, setGeneralNotes] = useState("");
  const [medicines, setMedicines] = useState([createEmptyMedicine()]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputBaseStyles =
    "w-full rounded-xl border border-slate-300 bg-white p-3 text-sm shadow-sm transition-all focus:border-[#008080] focus:ring-4 focus:ring-[#008080]/10 focus:outline-none placeholder:text-slate-400";

  const handleMedicineChange = (index, field, value) => {
    setMedicines((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
  };

  const addMedicineRow = () => {
    setMedicines((prev) => [...prev, createEmptyMedicine()]);
  };

  const removeMedicineRow = (index) => {
    if (medicines.length > 1) {
      setMedicines((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // --- CONNECTED SUBMIT LOGIC ---
  const handleCompleteConsultation = async () => {
    if (!diagnosis) {
      alert("Please enter a clinical diagnosis.");
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        appointment_id: id, // Extracted from useParams
        clinic_diagnosis: diagnosis,
        // Combining symptoms and detailed notes as backend only has detailed_notes
        detailed_notes: `Symptoms: ${symptoms}\n\nNotes: ${detailedNotes}`,
        medicine_name: medicines
          .map((m) => m.medicineName)
          .filter(Boolean)
          .join(", "),
        dosage: medicines
          .map((m) => m.dosage)
          .filter(Boolean)
          .join(", "),
        frequency: medicines.map((m) => m.frequency).join(", "),
        duration: medicines
          .map((m) => m.duration)
          .filter(Boolean)
          .join(", "),
        notes: generalNotes,
      };

      const response = await privateAPI.post("/doctor/consultation/", payload);

      if (response.status === 201) {
        alert("Consultation completed and saved!");
        navigate("/doctor/patient-queue");
      }
    } catch (error) {
      console.error("Failed to save consultation:", error);
      alert(error.response?.data?.error || "Error saving consultation data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  function calculateAge(dob) {
    if (!dob) return "N/A";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  }

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
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-[#2C3E50]">
                Patient Consultation
              </h1>
              <p className="text-slate-500 font-medium">
                Patient ID: {patientData.id}
              </p>
            </div>
          </div>
        </div>

        {/* Patient Info Card */}
        <section className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col items-start gap-8 md:flex-row">
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#008080]/10 text-[#008080] font-bold text-2xl shadow-inner">
                {patientData.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#2C3E50]">
                  {patientData.name}
                </h3>
                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  <span className="rounded-md bg-slate-100 px-2.5 py-1 text-slate-700 font-semibold">
                    {calculateAge(patientData.dob)} Years
                  </span>
                  <span className="text-slate-500 font-medium pt-1">
                    ID: {patientData.id}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-8">
          <div className="w-full space-y-8">
            {/* Symptoms Section */}
            <div className="rounded-xl border border-[#E0E6ED] bg-white p-8 shadow-sm">
              <div className="mb-5 flex items-center gap-2">
                <Activity size={18} className="text-[#008080]" />
                <h4 className="font-bold text-[#2C3E50]">
                  Symptoms / Chief Complaint
                </h4>
              </div>
              <textarea
                rows={5}
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Describe symptoms..."
                className={inputBaseStyles}
              />
            </div>

            {/* Diagnosis & Notes */}
            <div className="rounded-xl border border-[#E0E6ED] bg-white p-8 shadow-sm">
              <div className="mb-5 flex items-center gap-2">
                <Stethoscope size={18} className="text-[#008080]" />
                <h4 className="font-bold text-[#2C3E50]">
                  Diagnosis & Clinical Notes
                </h4>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="mb-1 block text-xs font-bold text-[#2C3E50]/60 uppercase">
                    Clinical Diagnosis
                  </label>
                  <input
                    type="text"
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                    placeholder="Enter main diagnosis..."
                    className={inputBaseStyles}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold text-[#2C3E50]/60 uppercase">
                    Detailed Doctor Notes
                  </label>
                  <textarea
                    rows={8}
                    value={detailedNotes}
                    onChange={(e) => setDetailedNotes(e.target.value)}
                    placeholder="Enter examination details..."
                    className={inputBaseStyles}
                  />
                </div>
              </div>
            </div>

            {/* Prescriptions Table */}
            <div className="overflow-hidden rounded-xl border border-[#E0E6ED] bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-[#E0E6ED] p-6">
                <div className="flex items-center gap-2">
                  <FileText size={18} className="text-[#008080]" />
                  <h4 className="font-bold text-[#2C3E50]">Prescriptions</h4>
                </div>
                <button
                  type="button"
                  onClick={addMedicineRow}
                  className="flex items-center gap-2 rounded-lg bg-[#008080] px-4 py-2 text-sm font-medium text-white hover:bg-[#007272]"
                >
                  <Plus className="h-4 w-4" /> Add Medicine
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
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="p-3">
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
                            className="w-full rounded-lg border border-slate-200 bg-white p-2 focus:border-[#008080] focus:ring-2 focus:ring-[#008080]/10 focus:outline-none"
                            placeholder="e.g. Amoxicillin"
                          />
                        </td>
                        <td className="w-32 p-3">
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
                            className="w-full rounded-lg border border-slate-200 bg-white p-2 focus:border-[#008080] focus:ring-2 focus:ring-[#008080]/10 focus:outline-none"
                            placeholder="1 tab"
                          />
                        </td>
                        <td className="w-48 p-3">
                          <select
                            value={medicine.frequency}
                            onChange={(e) =>
                              handleMedicineChange(
                                index,
                                "frequency",
                                e.target.value,
                              )
                            }
                            className="w-full rounded-lg border border-slate-200 bg-white p-2 focus:border-[#008080] focus:ring-2 focus:ring-[#008080]/10 focus:outline-none"
                          >
                            {frequencyOptions.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="w-32 p-3">
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
                            className="w-full rounded-lg border border-slate-200 bg-white p-2 focus:border-[#008080] focus:ring-2 focus:ring-[#008080]/10 focus:outline-none"
                            placeholder="5 days"
                          />
                        </td>
                        <td className="p-3">
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
                            className="w-full rounded-lg border border-slate-200 bg-white p-2 focus:border-[#008080] focus:ring-2 focus:ring-[#008080]/10 focus:outline-none"
                            placeholder="After food"
                          />
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => removeMedicineRow(index)}
                            className="rounded-full p-2 text-red-400 hover:bg-red-50 hover:text-red-600 transition-all"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* General Instructions Area */}
              {/* <div className="bg-[#F7FAFA]/50 p-6 border-t border-[#E0E6ED]">
                <label className="mb-2 block text-xs font-bold uppercase text-[#7F8C8D]">
                  General Instructions
                </label>
                <textarea
                  rows={3}
                  value={generalNotes}
                  onChange={(e) => setGeneralNotes(e.target.value)}
                  placeholder="Additional lifestyle advice or follow-up instructions..."
                  className={inputBaseStyles}
                />
              </div> */}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex flex-col items-center justify-end gap-4 pb-12 sm:flex-row">
          <button
            disabled={isSubmitting}
            onClick={handleCompleteConsultation}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#008080] px-10 py-3 font-bold text-white shadow-lg transition-all hover:bg-[#007272] sm:w-auto disabled:opacity-50"
          >
            <CheckCircle2 size={18} />
            {isSubmitting ? "Completing..." : "Complete Consultation"}
          </button>
        </div>
      </main>
    </div>
  );
}
