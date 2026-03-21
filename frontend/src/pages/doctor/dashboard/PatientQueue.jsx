import React from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Plus,
  Users,
  Hourglass,
  Stethoscope,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const summaryCards = [
  {
    title: "Total Patients",
    value: "28",
    note: "+4 from yesterday",
    icon: Users,
    iconClass: "text-[#008080]",
    iconBg: "bg-[#008080]/10",
    noteClass: "text-[#70C1B3]",
  },
  {
    title: "Waiting",
    value: "12",
    note: "Avg wait: 14m",
    icon: Hourglass,
    iconClass: "text-amber-600",
    iconBg: "bg-amber-50",
    noteClass: "text-amber-600",
  },
  {
    title: "In Consultation",
    value: "02",
    note: "Currently active",
    icon: Stethoscope,
    iconClass: "text-indigo-600",
    iconBg: "bg-indigo-50",
    noteClass: "text-indigo-600",
  },
  {
    title: "Completed",
    value: "14",
    note: "50% of today's goal",
    icon: CheckCircle2,
    iconClass: "text-emerald-600",
    iconBg: "bg-emerald-50",
    noteClass: "text-emerald-600",
  },
];

const patients = [
  {
    id: "TK-104",
    initials: "JD",
    initialsClass: "bg-[#008080]/10 text-[#008080]",
    name: "Johnathan Doe",
    age: 45,
    complaint: "Chronic Back Pain",
    time: "09:00 AM",
    status: "In Consultation",
    statusClass: "bg-indigo-100 text-indigo-800",
    action: "View Details",
    actionType: "link",
  },
  {
    id: "TK-105",
    initials: "SM",
    initialsClass: "bg-[#70C1B3]/10 text-[#70C1B3]",
    name: "Sarah Miller",
    age: 29,
    complaint: "Severe Migraine",
    time: "09:15 AM",
    status: "Waiting",
    statusClass: "bg-amber-100 text-amber-800",
    action: "Start Consultation",
    actionType: "button",
  },
  {
    id: "TK-106",
    initials: "RB",
    initialsClass: "bg-amber-500/10 text-amber-500",
    name: "Robert Brown",
    age: 62,
    complaint: "Post-Op Checkup",
    time: "09:30 AM",
    status: "Waiting",
    statusClass: "bg-amber-100 text-amber-800",
    action: "Start Consultation",
    actionType: "button",
  },
  {
    id: "TK-107",
    initials: "EW",
    initialsClass: "bg-indigo-500/10 text-indigo-500",
    name: "Emily White",
    age: 12,
    complaint: "Seasonal Flu",
    time: "09:45 AM",
    status: "Completed",
    statusClass: "bg-emerald-100 text-emerald-800",
    action: "View Summary",
    actionType: "muted-link",
  },
  {
    id: "TK-108",
    initials: "MG",
    initialsClass: "bg-emerald-500/10 text-emerald-500",
    name: "Michael Green",
    age: 35,
    complaint: "High Blood Pressure",
    time: "10:00 AM",
    status: "Waiting",
    statusClass: "bg-amber-100 text-amber-800",
    action: "Start Consultation",
    actionType: "button",
  },
  {
    id: "TK-109",
    initials: "LC",
    initialsClass: "bg-[#008080]/10 text-[#008080]",
    name: "Linda Carter",
    age: 58,
    complaint: "Diabetes Follow-up",
    time: "10:15 AM",
    status: "Waiting",
    statusClass: "bg-amber-100 text-amber-800",
    action: "Start Consultation",
    actionType: "button",
  },
];

export default function PatientQueue() {
  const navigate = useNavigate();

  const handleStartConsultation = (patient) => {
    navigate(`/doctor/consultations/${patient.id}`, {
      state: { patient },
    });
  };

  return (
    <div className="flex flex-col">
      <main className="mx-auto w-full max-w-7xl px-8 py-8">
        <section className="mb-8 grid grid-cols-4 gap-6">
          {summaryCards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className="rounded-xl border border-[#E0E6ED] bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-semibold text-[#7F8C8D]">
                    {card.title}
                  </p>
                  <div className={`rounded-lg p-2 ${card.iconBg}`}>
                    <Icon size={20} className={card.iconClass} />
                  </div>
                </div>
                <p className="text-3xl font-bold text-[#2C3E50]">
                  {card.value}
                </p>
                <p className={`mt-2 text-xs font-medium ${card.noteClass}`}>
                  {card.note}
                </p>
              </article>
            );
          })}
        </section>

        <div className="mb-6 flex gap-3">
          <button className="rounded-full bg-[#008080] px-5 py-2 text-sm font-bold text-white shadow-sm">
            All Patients
          </button>
          <button className="rounded-full border border-[#E0E6ED] bg-white px-5 py-2 text-sm font-semibold text-[#2C3E50] transition-colors hover:border-[#008080]">
            Completed
          </button>
          <button className="rounded-full border border-[#E0E6ED] bg-white px-5 py-2 text-sm font-semibold text-[#2C3E50] transition-colors hover:border-[#008080]">
            Waiting
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border border-[#E0E6ED] bg-white shadow-sm">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-[#E0E6ED] bg-[#F7FAFA]/50">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#7F8C8D]">
                  ID
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#7F8C8D]">
                  Patient Name
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#7F8C8D]">
                  Age
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#7F8C8D]">
                  Complaint
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#7F8C8D]">
                  Time
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#7F8C8D]">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#7F8C8D]">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E0E6ED]">
              {patients.map((patient) => (
                <tr
                  key={patient.id}
                  className="group transition-colors hover:bg-[#F7FAFA]"
                >
                  <td className="px-6 py-4 text-sm font-bold text-[#2C3E50]">
                    {patient.id}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex size-8 items-center justify-center rounded-full text-xs font-bold ${patient.initialsClass}`}
                      >
                        {patient.initials}
                      </div>
                      <span className="text-sm font-semibold text-[#2C3E50]">
                        {patient.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-[#7F8C8D]">
                    {patient.age}
                  </td>

                  <td className="px-6 py-4 text-sm font-medium italic text-[#7F8C8D]">
                    {patient.complaint}
                  </td>

                  <td className="px-6 py-4 text-sm font-semibold text-[#2C3E50]">
                    {patient.time}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${patient.statusClass}`}
                    >
                      {patient.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    {patient.actionType === "button" ? (
                      <button
                        onClick={() => handleStartConsultation(patient)}
                        className="rounded-lg bg-[#008080] px-4 py-1.5 text-xs font-bold text-white transition-opacity hover:opacity-90"
                      >
                        {patient.action}
                      </button>
                    ) : (
                      <button
                        className={`text-sm font-bold ${
                          patient.actionType === "muted-link"
                            ? "text-[#7F8C8D] hover:text-[#2C3E50]"
                            : "text-[#008080] hover:underline"
                        }`}
                      >
                        {patient.action}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex items-center justify-between border-t border-[#E0E6ED] bg-[#F7FAFA]/30 px-6 py-4">
            <p className="text-xs font-semibold uppercase text-[#7F8C8D]">
              Showing 6 of 28 patients
            </p>

            <div className="flex gap-2">
              <button
                disabled
                className="rounded border border-[#E0E6ED] p-2 text-[#7F8C8D] disabled:opacity-50"
              >
                <ChevronLeft size={16} />
              </button>
              <button className="rounded border border-[#E0E6ED] p-2 text-[#7F8C8D] hover:bg-white">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
