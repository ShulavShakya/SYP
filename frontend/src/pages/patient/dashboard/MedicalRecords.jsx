import React, { useState } from "react";
import {
  FolderOpen,
  CalendarDays,
  CalendarRange,
  FilePlus2,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  X,
  Activity,
  Stethoscope,
  FileText,
} from "lucide-react";

const records = [
  {
    id: 1,
    date: "Oct 24, 2023",
    time: "10:30 AM",
    doctor: "Dr. Jane Aris",
    initials: "JA",
    diagnosis: "Hypertension",
    diagnosisClass: "bg-red-100 text-red-600",
    notes: "Patient reported mild chest tightness and recurring headaches...",
    complaint:
      "Mild chest tightness and recurring headaches for the past week.",
    detailedDoctorNotes:
      "Blood pressure was elevated during examination. Patient advised to reduce salt intake, monitor blood pressure at home, and return for follow-up in 2 weeks. No acute distress noted.",
    generalInstructions:
      "Avoid oily and salty food, take proper rest, and check BP every morning.",
    prescriptions: [
      {
        medicineName: "Amlodipine 5mg",
        dosage: "1 Tablet",
        frequency: "Once daily",
        duration: "30 days",
        notes: "After breakfast",
      },
      {
        medicineName: "Paracetamol 500mg",
        dosage: "1 Tablet",
        frequency: "As needed (PRN)",
        duration: "5 days",
        notes: "Only if headache persists",
      },
    ],
  },
  {
    id: 2,
    date: "Sep 12, 2023",
    time: "02:15 PM",
    doctor: "Dr. Robert King",
    initials: "RK",
    diagnosis: "Routine Checkup",
    diagnosisClass: "bg-blue-100 text-blue-600",
    notes: "All vitals within normal range. Recommended increased hydration...",
    complaint: "Routine follow-up checkup with no specific complaints.",
    detailedDoctorNotes:
      "Vitals stable. Blood pressure, pulse, and temperature within normal range. Encouraged regular exercise and hydration.",
    generalInstructions:
      "Drink more water, continue healthy diet, and maintain daily walking routine.",
    prescriptions: [],
  },
  {
    id: 3,
    date: "Aug 05, 2023",
    time: "09:00 AM",
    doctor: "Dr. Mark Lee",
    initials: "ML",
    diagnosis: "Vitamin D Deficiency",
    diagnosisClass: "bg-amber-100 text-amber-600",
    notes: "Prescribed 50,000 IU supplements weekly for 8 weeks...",
    complaint: "Fatigue, low energy, and body aches.",
    detailedDoctorNotes:
      "Lab findings suggest Vitamin D deficiency. No neurological deficit noted. Patient advised on sunlight exposure and supplementation.",
    generalInstructions:
      "Take supplements regularly and spend at least 15–20 minutes in sunlight daily.",
    prescriptions: [
      {
        medicineName: "Vitamin D3 50,000 IU",
        dosage: "1 Capsule",
        frequency: "Once weekly",
        duration: "8 weeks",
        notes: "Take after meal",
      },
    ],
  },
  {
    id: 4,
    date: "Jul 20, 2023",
    time: "11:45 AM",
    doctor: "Dr. Sarah Wong",
    initials: "SW",
    diagnosis: "Post-Surgery Followup",
    diagnosisClass: "bg-green-100 text-green-600",
    notes: "Surgical wound healing well. No signs of infection...",
    complaint: "Follow-up review after recent surgery.",
    detailedDoctorNotes:
      "Surgical wound inspected. Healing properly with no discharge or redness. Pain level reduced significantly compared to previous visit.",
    generalInstructions:
      "Keep wound area clean, avoid heavy lifting, and return immediately if fever or swelling develops.",
    prescriptions: [
      {
        medicineName: "Ibuprofen 400mg",
        dosage: "1 Tablet",
        frequency: "Twice daily (BD)",
        duration: "5 days",
        notes: "After food",
      },
    ],
  },
];

const mobileNavItems = [
  { label: "Home", icon: CalendarDays, active: true },
  { label: "Records", icon: FolderOpen, active: false },
  { label: "Schedule", icon: CalendarDays, active: false },
  { label: "More", icon: MoreHorizontal, active: false },
];

export default function MedicalRecords() {
  const [selectedRecord, setSelectedRecord] = useState(null);

  const closeModal = () => setSelectedRecord(null);

  return (
    <div className="flex h-screen overflow-hidden text-slate-900">
      <main className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <div className="mx-auto w-full max-w-[1440px] p-4 md:p-8">
          {/* Patient summary */}
          <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
              <div className="relative">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB81sCsMvVPDItteAvs9dEjVewgxkXiWpZPdy3F1GxPwJDIqYi9r2A6aDK4x2-IsvkUpWyYbiwoeHy7e8x7hdey4FvzmXN2bmRYZIefoQH3Ml2myyHVLH90d9Jpn70QA7-qplAzyX5A5NmYQtpw2TyDduS3g9-YPL8GA4NyTkRux2OZ4EllFZD2IbWyfhSC2NcI5siaaTiit56Vrc2T5bJOwEuCPiqi5f8--dPaoIaSFckmjvdw61sFLuwSWIrHC2uswmUDQDIYsUgd"
                  alt="Patient Avatar"
                  className="h-24 w-24 rounded-full border-4 border-white object-cover"
                />
                <span className="absolute bottom-1 right-1 h-5 w-5 rounded-full border-2 border-white bg-green-500" />
              </div>

              <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Patient Name
                  </p>
                  <p className="text-base font-semibold text-slate-900">
                    John Doe
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Patient ID
                  </p>
                  <p className="text-base font-semibold text-slate-900">
                    #MR-88291
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Date of Birth
                  </p>
                  <p className="text-base font-semibold text-slate-900">
                    05/12/1985
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Blood Group
                  </p>
                  <p className="text-base font-semibold text-slate-900">
                    O Positive (O+)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2">
              <CalendarRange size={16} className="text-primary" />
              <select className="border-none bg-transparent text-sm text-slate-600 outline-none focus:ring-0">
                <option>Last 6 Months</option>
                <option>Last 12 Months</option>
                <option>All Time</option>
              </select>
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2">
              <FolderOpen size={16} className="text-primary" />
              <select className="border-none bg-transparent text-sm text-slate-600 outline-none focus:ring-0">
                <option>All Departments</option>
                <option>Cardiology</option>
                <option>Neurology</option>
                <option>Orthopedics</option>
              </select>
            </div>

            <button
              type="button"
              className="ml-auto inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white transition hover:bg-primary/90"
            >
              <FilePlus2 size={16} />
              New Entry
            </button>
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Date
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Doctor
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Diagnosis
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Notes Summary
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {records.map((record) => (
                    <tr
                      key={record.id}
                      className="group cursor-pointer transition-colors hover:bg-slate-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm font-medium text-slate-900">
                          {record.date}
                        </p>
                        <p className="text-xs text-slate-500">{record.time}</p>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                            {record.initials}
                          </div>
                          <span className="text-sm font-medium text-slate-900">
                            {record.doctor}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${record.diagnosisClass}`}
                        >
                          {record.diagnosis}
                        </span>
                      </td>

                      <td className="max-w-xs truncate px-6 py-4 text-sm text-slate-600">
                        {record.notes}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <button
                          type="button"
                          onClick={() => setSelectedRecord(record)}
                          className="font-medium text-primary hover:underline"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
              <p className="text-sm text-slate-500">
                Showing 1 to 4 of 24 entries
              </p>

              <div className="flex gap-2">
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-medium text-white"
                >
                  1
                </button>
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                >
                  2
                </button>
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                >
                  3
                </button>
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Details Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Consultation Record Details
                </h2>
                <p className="text-sm text-slate-500">
                  Full details added by the doctor during consultation
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[calc(90vh-80px)] overflow-y-auto p-6">
              <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Date
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {selectedRecord.date}
                  </p>
                  <p className="text-xs text-slate-500">
                    {selectedRecord.time}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Doctor
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {selectedRecord.doctor}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Diagnosis
                  </p>
                  <span
                    className={`mt-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${selectedRecord.diagnosisClass}`}
                  >
                    {selectedRecord.diagnosis}
                  </span>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Record ID
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    #{selectedRecord.id}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <section className="rounded-xl border border-slate-200 bg-white p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <Activity size={18} className="text-primary" />
                    <h3 className="font-semibold text-slate-900">
                      Symptoms / Chief Complaint
                    </h3>
                  </div>
                  <p className="text-sm leading-6 text-slate-600">
                    {selectedRecord.complaint || "No complaint recorded."}
                  </p>
                </section>

                <section className="rounded-xl border border-slate-200 bg-white p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <Stethoscope size={18} className="text-primary" />
                    <h3 className="font-semibold text-slate-900">
                      Diagnosis & Clinical Notes
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="rounded-lg bg-slate-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Clinical Diagnosis
                      </p>
                      <p className="mt-1 text-sm font-medium text-slate-800">
                        {selectedRecord.diagnosis || "No diagnosis recorded."}
                      </p>
                    </div>

                    <div className="rounded-lg bg-slate-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Detailed Doctor Notes
                      </p>
                      <p className="mt-1 text-sm leading-6 text-slate-700 whitespace-pre-line">
                        {selectedRecord.detailedDoctorNotes ||
                          "No detailed notes recorded."}
                      </p>
                    </div>
                  </div>
                </section>

                <section className="rounded-xl border border-slate-200 bg-white p-5">
                  <div className="mb-4 flex items-center gap-2">
                    <FileText size={18} className="text-primary" />
                    <h3 className="font-semibold text-slate-900">
                      Prescriptions
                    </h3>
                  </div>

                  {selectedRecord.prescriptions?.length ? (
                    <div className="overflow-x-auto rounded-lg border border-slate-200">
                      <table className="w-full border-collapse text-left text-sm">
                        <thead className="bg-slate-50">
                          <tr className="border-b border-slate-200">
                            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                              Medicine
                            </th>
                            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                              Dosage
                            </th>
                            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                              Frequency
                            </th>
                            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                              Duration
                            </th>
                            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                              Notes
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {selectedRecord.prescriptions.map(
                            (medicine, index) => (
                              <tr key={index}>
                                <td className="px-4 py-3 text-slate-800">
                                  {medicine.medicineName || "-"}
                                </td>
                                <td className="px-4 py-3 text-slate-600">
                                  {medicine.dosage || "-"}
                                </td>
                                <td className="px-4 py-3 text-slate-600">
                                  {medicine.frequency || "-"}
                                </td>
                                <td className="px-4 py-3 text-slate-600">
                                  {medicine.duration || "-"}
                                </td>
                                <td className="px-4 py-3 text-slate-600">
                                  {medicine.notes || "-"}
                                </td>
                              </tr>
                            ),
                          )}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">
                      No medicines were prescribed for this consultation.
                    </div>
                  )}
                </section>

                <section className="rounded-xl border border-slate-200 bg-white p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <FileText size={18} className="text-primary" />
                    <h3 className="font-semibold text-slate-900">
                      General Instructions / Diagnosis
                    </h3>
                  </div>
                  <p className="text-sm leading-6 text-slate-600 whitespace-pre-line">
                    {selectedRecord.generalInstructions ||
                      "No general instructions recorded."}
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-slate-200 bg-white px-4 py-2 md:hidden">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              type="button"
              className={`flex flex-col items-center gap-1 ${
                item.active ? "text-primary" : "text-slate-500"
              }`}
            >
              <Icon size={18} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
