import React, { useState } from "react";
import { FileText, Plus, Trash2, Printer, Save } from "lucide-react";

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

export default function PrescriptionCreation() {
  const [medicines, setMedicines] = useState([
    {
      medicineName: "Paracetamol 500mg",
      dosage: "1 tablet",
      frequency: "Thrice daily (TDS)",
      duration: "5 days",
      notes: "After breakfast and dinner",
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

  const handlePrint = () => {
    window.print();
  };

  const handleSave = () => {
    console.log("Prescription saved:", { medicines, generalNotes });
  };

  return (
    <div className="min-h-screen bg-[#F7FAFA] px-4 py-8 font-sans text-[#2C3E50]">
      <main className="mx-auto max-w-6xl">
        <section className="mb-6 rounded-[12px] border border-[#E0E6ED] bg-white p-6 shadow-[0_4px_15px_rgba(0,0,0,0.05)]">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            <div>
              <label className="block text-xs font-bold uppercase text-[#7F8C8D]">
                Patient Name
              </label>
              <p className="text-lg font-semibold">Jonathan Miller</p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#7F8C8D]">
                Patient ID
              </label>
              <p className="text-lg font-semibold">MF-99203</p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#7F8C8D]">
                Age / Gender
              </label>
              <p className="text-lg font-semibold">34 Yrs / Male</p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#7F8C8D]">
                Date
              </label>
              <p className="text-lg font-semibold">October 24, 2023</p>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-[12px] border border-[#E0E6ED] bg-white shadow-[0_4px_15px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between border-b border-[#E0E6ED] p-6">
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <FileText className="h-6 w-6 text-[#008080]" />
              Medication Details
            </h2>

            <button
              type="button"
              onClick={addMedicineRow}
              className="flex items-center gap-2 rounded-lg bg-[#008080] px-4 py-2 font-medium text-white shadow-sm transition-all hover:bg-[#007272]"
            >
              <Plus className="h-5 w-5" />
              Add Medicine
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
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
                          handleMedicineChange(index, "dosage", e.target.value)
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
                          handleMedicineChange(index, "notes", e.target.value)
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
        </section>

        <footer className="mt-10 flex flex-col items-center justify-end gap-4 px-2 md:flex-row">
          <button
            type="button"
            onClick={handlePrint}
            className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-[#008080] px-8 py-3 font-semibold text-[#008080] transition-all hover:bg-[#008080] hover:text-white md:w-auto"
          >
            <Printer className="h-5 w-5" />
            Print / Download
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#008080] px-12 py-3 font-semibold text-white shadow-md transition-all hover:opacity-90 md:w-auto"
          >
            <Save className="h-5 w-5" />
            Save Prescription
          </button>
        </footer>
      </main>
    </div>
  );
}
