import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Stethoscope,
  BadgeCheck,
  CalendarX2,
  ClipboardList,
  Eye,
  Pencil,
  Ban,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  FileText,
} from "lucide-react";

const summaryCards = [
  {
    label: "Total Doctors",
    value: "142",
    icon: Stethoscope,
    hoverClass: "hover:bg-primary-container",
    iconClass:
      "bg-primary/10 text-primary group-hover:bg-white group-hover:text-primary",
  },
  {
    label: "Active Today",
    value: "128",
    icon: BadgeCheck,
    hoverClass: "hover:bg-secondary",
    iconClass:
      "bg-secondary/10 text-secondary group-hover:bg-white group-hover:text-secondary",
  },
  {
    label: "On Leave",
    value: "12",
    icon: CalendarX2,
    hoverClass: "hover:bg-tertiary",
    iconClass:
      "bg-tertiary/10 text-tertiary group-hover:bg-white group-hover:text-tertiary",
  },
  {
    label: "New Apps",
    value: "5",
    icon: ClipboardList,
    hoverClass: "hover:bg-primary",
    iconClass:
      "bg-primary/10 text-primary group-hover:bg-white group-hover:text-primary",
  },
];

const filters = ["All", "Cardiology", "Neurology", "Pediatrics", "Orthopedics"];

const doctors = [
  {
    id: "#DOC-8821",
    initials: "DR",
    initialsClass: "bg-cyan-100 text-primary",
    name: "Dr. David Rossi",
    email: "david.r@clinical.com",
    specialty: "Cardiology",
    experience: "12 Years",
    status: "Active",
    statusClass: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "#DOC-8822",
    initials: "SA",
    initialsClass: "bg-orange-100 text-tertiary",
    name: "Dr. Sarah Adams",
    email: "sarah.a@clinical.com",
    specialty: "Neurology",
    experience: "8 Years",
    status: "On Leave",
    statusClass: "bg-orange-100 text-orange-700",
  },
  {
    id: "#DOC-8825",
    initials: "MK",
    initialsClass: "bg-slate-200 text-slate-500",
    name: "Dr. Michael Kim",
    email: "m.kim@clinical.com",
    specialty: "Pediatrics",
    experience: "15 Years",
    status: "Suspended",
    statusClass: "bg-red-100 text-red-700",
  },
  {
    id: "#DOC-8829",
    initials: "LW",
    initialsClass: "bg-teal-100 text-secondary",
    name: "Dr. Lisa Wang",
    email: "l.wang@clinical.com",
    specialty: "Orthopedics",
    experience: "5 Years",
    status: "Active",
    statusClass: "bg-emerald-100 text-emerald-700",
  },
];

const distribution = [
  { label: "Surgery", value: "45%", color: "bg-primary" },
  { label: "Emergency", value: "25%", color: "bg-secondary" },
  { label: "Diagnostics", value: "15%", color: "bg-tertiary" },
  { label: "Other", value: "15%", color: "bg-slate-200" },
];

function SummaryCard({ label, value, icon: Icon, hoverClass, iconClass }) {
  return (
    <div
      className={[
        "group flex items-center gap-5 rounded-2xl bg-white p-6 shadow-[0px_4px_20px_rgba(0,101,101,0.03)] transition-colors duration-300",
        hoverClass,
      ].join(" ")}
    >
      <div
        className={[
          "flex h-12 w-12 items-center justify-center rounded-2xl transition-colors",
          iconClass,
        ].join(" ")}
      >
        <Icon size={22} />
      </div>

      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-white/70">
          {label}
        </p>
        <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-white">
          {value}
        </h3>
      </div>
    </div>
  );
}

function DoctorRow({
  id,
  initials,
  initialsClass,
  name,
  email,
  specialty,
  experience,
  status,
  statusClass,
}) {
  return (
    <tr className="transition-colors hover:bg-slate-50/50">
      <td className="px-6 py-4 text-sm font-medium text-slate-400">{id}</td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-xs font-bold shadow-sm ${initialsClass}`}
          >
            {initials}
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">{name}</p>
            <p className="text-xs text-slate-400">{email}</p>
          </div>
        </div>
      </td>

      <td className="px-6 py-4">
        <span className="text-sm font-medium text-slate-600">{specialty}</span>
      </td>

      <td className="px-6 py-4">
        <span className="text-sm text-slate-600">{experience}</span>
      </td>

      <td className="px-6 py-4">
        <span
          className={`rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest ${statusClass}`}
        >
          {status}
        </span>
      </td>

      <td className="px-6 py-4 text-right">
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="rounded-lg p-2 text-primary transition-colors hover:bg-primary/10"
          >
            <Eye size={16} />
          </button>

          <button
            type="button"
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100"
          >
            <Pencil size={16} />
          </button>

          <button
            type="button"
            className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50"
          >
            <Ban size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default function DoctorManagementContent() {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-[#f7fafa] px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
      <div className="w-full max-w-none space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-['Manrope',sans-serif] text-3xl font-extrabold tracking-tight text-slate-900">
              Manage Doctors
            </h2>
            <p className="mt-1 text-slate-600">
              Overview and management of your medical staff.
            </p>
          </div>

          <button
            type="button"
            className="flex items-center gap-2 self-start rounded-2xl bg-gradient-to-br from-[#006565] to-[#008080] px-6 py-3 font-['Manrope',sans-serif] font-bold text-white shadow-[0px_4px_20px_rgba(0,101,101,0.05)] transition-transform hover:scale-[1.02] active:scale-95 sm:self-auto"
            onClick={() => navigate("/admin/add-doctor")}
          >
            <Plus size={18} />
            <span>+ Add Doctor</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 2xl:grid-cols-4">
          {summaryCards.map((card) => (
            <SummaryCard key={card.label} {...card} />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 2xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0 space-y-6">
            <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-[#f1f4f4] p-2">
              <div className="flex flex-1 gap-2 overflow-x-auto py-1 pl-2">
                {filters.map((filter, index) => (
                  <button
                    key={filter}
                    type="button"
                    className={
                      index === 0
                        ? "whitespace-nowrap rounded-xl bg-white px-5 py-2 text-sm font-bold text-primary shadow-sm"
                        : "whitespace-nowrap rounded-xl px-5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-white/50"
                    }
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl bg-white shadow-[0px_4px_20px_rgba(0,101,101,0.05)]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] border-collapse text-left">
                  <thead>
                    <tr className="bg-[#f1f4f4]/50">
                      <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">
                        Doctor ID
                      </th>
                      <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">
                        Name
                      </th>
                      <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">
                        Specialty
                      </th>
                      <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">
                        Experience
                      </th>
                      <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">
                        Status
                      </th>
                      <th className="px-6 py-5 text-right text-xs font-bold uppercase tracking-widest text-slate-500">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100/50">
                    {doctors.map((doctor) => (
                      <DoctorRow key={doctor.id} {...doctor} />
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col gap-4 border-t border-slate-100/50 bg-[#f1f4f4]/30 p-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-500">
                  Showing <span className="font-bold text-slate-900">1-4</span>{" "}
                  of <span className="font-bold text-slate-900">142</span>{" "}
                  doctors
                </p>

                <div className="flex gap-2">
                  <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 transition-colors hover:border-primary hover:text-primary"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary font-['Manrope',sans-serif] font-bold text-white shadow-sm"
                  >
                    1
                  </button>

                  <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-colors hover:border-primary hover:text-primary"
                  >
                    2
                  </button>

                  <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-colors hover:border-primary hover:text-primary"
                  >
                    3
                  </button>

                  <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 transition-colors hover:border-primary hover:text-primary"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <aside className="w-full space-y-6 2xl:w-[320px]">
            <div className="rounded-2xl bg-white p-6 shadow-[0px_4px_20px_rgba(0,101,101,0.05)]">
              <h3 className="mb-6 font-['Manrope',sans-serif] text-lg font-bold text-slate-900">
                Staff Distribution
              </h3>

              <div className="relative mx-auto mb-8 h-40 w-40">
                <svg
                  className="h-full w-full -rotate-90 transform"
                  viewBox="0 0 36 36"
                >
                  <path
                    className="text-slate-100"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="text-primary"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="45, 100"
                    strokeLinecap="round"
                    strokeWidth="4"
                  />
                  <path
                    className="text-secondary"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="25, 100"
                    strokeDashoffset="-45"
                    strokeLinecap="round"
                    strokeWidth="4"
                  />
                  <path
                    className="text-tertiary"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="15, 100"
                    strokeDashoffset="-70"
                    strokeLinecap="round"
                    strokeWidth="4"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-['Manrope',sans-serif] text-2xl font-extrabold">
                    142
                  </span>
                  <span className="text-[10px] font-bold uppercase text-slate-400">
                    Total
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {distribution.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-full ${item.color}`} />
                      <span className="text-sm font-medium text-slate-600">
                        {item.label}
                      </span>
                    </div>
                    <span className="text-sm font-bold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-[0px_4px_20px_rgba(0,101,101,0.05)]">
              <h3 className="mb-6 font-['Manrope',sans-serif] text-lg font-bold text-slate-900">
                Performance Metric
              </h3>

              <div className="rounded-xl border border-primary/10 bg-primary/5 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-primary">
                    Retention Rate
                  </span>
                  <span className="text-lg font-extrabold text-primary">
                    98.2%
                  </span>
                </div>

                <div className="h-2 w-full overflow-hidden rounded-full bg-white">
                  <div className="h-full w-[98%] rounded-full bg-primary" />
                </div>

                <p className="mt-2 text-[10px] text-slate-500">
                  ↑ 2.4% from last quarter
                </p>
              </div>

              <div className="mt-8 space-y-6">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  Quick Actions
                </h4>

                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#f1f4f4] py-3 text-sm font-bold text-slate-600 transition-colors hover:bg-[#e6e9e9]"
                >
                  <CalendarDays size={18} />
                  <span>Duty Roster</span>
                </button>

                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#f1f4f4] py-3 text-sm font-bold text-slate-600 transition-colors hover:bg-[#e6e9e9]"
                >
                  <FileText size={18} />
                  <span>Staff Reports</span>
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
