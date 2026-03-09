import React from "react";
import {
  ClipboardPenLine,
  Plus,
  Trash2,
  Printer,
  Save,
} from "lucide-react";

const patientSummary = [
  { label: "Patient Name", value: "Jonathan Miller" },
  { label: "Patient ID", value: "MF-99203" },
  { label: "Age / Gender", value: "34 Yrs / Male" },
  { label: "Date", value: "October 24, 2023" },
];

const medicationRows = [
  {
    medicine: "Paracetamol 500mg",
    dosage: "1 tablet",
    frequency: "Thrice daily (TDS)",
    duration: "5 days",
    notes: "After breakfast and dinner",
  },
];

export default function PrescriptionEditorScreen() {
  return (
    <div className="min-h-screen w-full bg-[#f7fafa] px-4 py-8 md:px-8 lg:px-16">
      <main className="mx-auto flex w-full max-w-[1152px] flex-col gap-8">
        <header className="flex flex-col gap-4 px-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-[30px] font-bold leading-9 text-[#008080]">
              MedFlow
            </h1>
            <p className="text-sm leading-5 text-[#7f8c8d]">
              Hospital Management System
            </p>
          </div>

          <div className="text-left sm:text-right">
            <p className="text-base font-bold leading-6 text-[#2c3e50]">
              Dr. Alexander Sterling
            </p>
            <p className="text-xs uppercase tracking-[0.6px] text-[#7f8c8d]">
              Internal Medicine
            </p>
          </div>
        </header>

        <section className="rounded-xl border border-[#e0e6ed] bg-white px-6 py-5 shadow-[0_4px_15px_rgba(0,0,0,0.05)]">
          <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {patientSummary.map((item) => (
              <div key={item.label}>
                <dt className="text-xs font-bold uppercase leading-4 text-[#7f8c8d]">
                  {item.label}
                </dt>
                <dd className="mt-1 text-lg font-bold leading-7 text-[#2c3e50]">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="overflow-hidden rounded-xl border border-[#e0e6ed] bg-white shadow-[0_4px_15px_rgba(0,0,0,0.05)]">
          <div className="flex flex-col gap-4 border-b border-[#e0e6ed] px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="flex items-center gap-2 text-2xl font-bold leading-7 text-[#2c3e50]">
              <ClipboardPenLine className="h-6 w-6 text-[#008080]" />
              Medication Details
            </h2>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-[#008080] px-4 py-2 text-base leading-6 text-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
            >
              <Plus className="h-5 w-5" />
              Add Medicine
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-[980px] w-full border-collapse">
              <thead className="border-b border-[#e0e6ed] bg-[#f7fafa]">
                <tr>
                  <HeaderCell>Medicine Name</HeaderCell>
                  <HeaderCell>Dosage</HeaderCell>
                  <HeaderCell>Frequency</HeaderCell>
                  <HeaderCell>Duration</HeaderCell>
                  <HeaderCell>Notes</HeaderCell>
                  <HeaderCell align="center">Action</HeaderCell>
                </tr>
              </thead>

              <tbody>
                {medicationRows.map((row, idx) => (
                  <tr key={`${row.medicine}-${idx}`} className="border-b border-[#e0e6ed]">
                    <DataCell>{row.medicine}</DataCell>
                    <DataCell>{row.dosage}</DataCell>
                    <DataCell>{row.frequency}</DataCell>
                    <DataCell>{row.duration}</DataCell>
                    <DataCell>{row.notes}</DataCell>
                    <DataCell align="center">
                      <button
                        type="button"
                        className="text-[#ef4444]"
                        aria-label="Delete medicine row"
                      >
                        <Trash2 className="mx-auto h-5 w-5" />
                      </button>
                    </DataCell>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-[rgba(247,250,250,0.5)] p-6">
            <label
              htmlFor="general-notes"
              className="text-xs font-bold uppercase leading-4 text-[#7f8c8d]"
            >
              General Instructions / Diagnosis
            </label>
            <textarea
              id="general-notes"
              className="mt-2 min-h-[86px] w-full resize-y rounded-lg border border-[#e0e6ed] bg-white px-[13px] py-[13px] text-sm leading-5 text-[#6b7280] outline-none"
              placeholder="Additional clinical observations or lifestyle advice..."
              defaultValue=""
            />
          </div>
        </section>

        <footer className="flex flex-col gap-4 px-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#008080] px-[34px] py-[14px] text-base font-bold leading-6 text-[#008080]"
          >
            <Printer className="h-5 w-5" />
            Print / Download
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#008080] px-12 py-3 text-base font-bold leading-6 text-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]"
          >
            <Save className="h-5 w-5" />
            Save Prescription
          </button>
        </footer>
      </main>
    </div>
  );
}

function HeaderCell({ children, align = "left" }) {
  return (
    <th
      className={`px-4 py-4 text-xs font-bold uppercase leading-4 text-[#7f8c8d] ${
        align === "center" ? "text-center" : "text-left"
      }`}
      scope="col"
    >
      {children}
    </th>
  );
}

function DataCell({ children, align = "left" }) {
  return (
    <td
      className={`px-4 py-4 text-base leading-6 text-[#2c3e50] ${
        align === "center" ? "text-center" : "text-left"
      }`}
    >
      {children}
    </td>
  );
}
