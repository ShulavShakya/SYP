import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Download,
  UserPlus,
  Users,
  BadgeCheck,
  Moon,
  ClipboardList,
  Filter,
  MapPin,
  ShieldCheck,
  RefreshCw,
  Eye,
  Pencil,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Plus,
  TrendingUp,
} from "lucide-react";

const summaryCards = [
  {
    label: "Total Receptionists",
    value: "48",
    badge: "+12%",
    badgeIcon: TrendingUp,
    badgeClassName: "text-teal-600",
    accentClassName: "bg-teal-100",
  },
  {
    label: "On Duty",
    value: "12",
    pill: "Stable",
    pillClassName: "bg-emerald-100 text-emerald-700",
    accentClassName: "bg-emerald-100",
  },
  {
    label: "Off Duty",
    value: "32",
    accentClassName: "bg-slate-200",
  },
  {
    label: "Pending Onboarding",
    value: "4",
    valueClassName: "text-red-600",
    pill: "New",
    pillClassName: "bg-red-100 text-red-700",
    accentClassName: "bg-red-100",
  },
];

const staffRows = [
  {
    id: "#RP-2024-001",
    initials: "JS",
    initialsClass: "bg-cyan-100 text-cyan-900",
    name: "Jane Smith",
    role: "Front Desk Lead",
    phone: "+1 (555) 123-4567",
    email: "j.smith@serenity.hospital",
    shift: "Morning",
    branch: "Main Clinic",
    status: "Active",
    statusClass: "bg-emerald-100 text-emerald-700",
    dotClass: "bg-emerald-600",
  },
  {
    id: "#RP-2024-002",
    initials: "MK",
    initialsClass: "bg-teal-100 text-teal-900",
    name: "Mark Kinsley",
    role: "Receptionist",
    phone: "+1 (555) 234-5678",
    email: "m.kinsley@serenity.hospital",
    shift: "Afternoon",
    branch: "East Wing",
    status: "On Shift",
    statusClass: "bg-blue-100 text-blue-700",
    dotClass: "bg-blue-600",
  },
  {
    id: "#RP-2024-003",
    initials: "AL",
    initialsClass: "bg-orange-100 text-orange-900",
    name: "Alice Lo",
    role: "Night Coordinator",
    phone: "+1 (555) 345-6789",
    email: "a.lo@serenity.hospital",
    shift: "Night",
    branch: "Main Clinic",
    status: "Off Duty",
    statusClass: "bg-slate-200 text-slate-600",
    dotClass: "bg-slate-500",
  },
  {
    id: "#RP-2024-004",
    initials: "DR",
    initialsClass: "bg-red-100 text-red-800",
    name: "David Ross",
    role: "Receptionist",
    phone: "+1 (555) 456-7890",
    email: "d.ross@serenity.hospital",
    shift: "N/A",
    branch: "North Annex",
    status: "Suspended",
    statusClass: "bg-red-100 text-red-700",
    dotClass: "bg-red-600",
  },
];

function SummaryCard({
  label,
  value,
  valueClassName = "text-slate-900",
  badge,
  badgeIcon: BadgeIcon,
  badgeClassName = "text-teal-600",
  subtext,
  pill,
  pillClassName = "bg-teal-50 text-teal-700",
  accentClassName = "bg-teal-100",
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white p-6 shadow-[0_4px_20px_rgba(0,101,101,0.03)] transition-all hover:shadow-md">
      <div
        className={`absolute right-0 top-0 h-24 w-24 rounded-bl-full opacity-60 transition-transform group-hover:scale-110 ${accentClassName}`}
      />

      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
        {label}
      </p>

      <div className="flex items-baseline gap-2">
        <h3
          className={`font-['Manrope',sans-serif] text-3xl font-extrabold ${valueClassName}`}
        >
          {value}
        </h3>

        {badge && BadgeIcon && (
          <span
            className={`flex items-center text-xs font-bold ${badgeClassName}`}
          >
            <BadgeIcon size={12} className="mr-1" />
            {badge}
          </span>
        )}

        {!badge && BadgeIcon && (
          <span
            className={`flex items-center text-xs font-bold ${badgeClassName}`}
          >
            <BadgeIcon size={12} />
          </span>
        )}

        {subtext && (
          <span className="text-xs font-medium text-slate-400">{subtext}</span>
        )}

        {pill && (
          <span
            className={`ml-2 rounded-full px-2 py-0.5 text-[10px] font-bold ${pillClassName}`}
          >
            {pill}
          </span>
        )}
      </div>
    </div>
  );
}

function FilterSelect({ icon: Icon, defaultValue, options }) {
  return (
    <div className="min-w-[200px] flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2">
      <div className="flex items-center gap-2">
        <Icon size={18} className="text-slate-400" />
        <select className="w-full border-none bg-transparent p-0 text-sm font-semibold text-slate-600 focus:ring-0">
          {[defaultValue, ...options].map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

function StaffRow({
  id,
  initials,
  initialsClass,
  name,
  role,
  phone,
  email,
  shift,
  branch,
  status,
  statusClass,
  dotClass,
}) {
  return (
    <tr className="transition-colors hover:bg-slate-50/70">
      <td className="px-6 py-5">
        <span className="font-mono text-sm font-bold text-teal-700">{id}</span>
      </td>

      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold ${initialsClass}`}
          >
            {initials}
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">{name}</p>
            <p className="text-xs text-slate-400">{role}</p>
          </div>
        </div>
      </td>

      <td className="px-6 py-5">
        <div className="text-sm">
          <p className="font-medium text-slate-900">{phone}</p>
          <p className="text-xs text-slate-400">{email}</p>
        </div>
      </td>

      <td className="px-6 py-5">
        <div className="text-sm">
          <p className="font-semibold text-slate-900">{shift}</p>
          <p className="text-xs text-slate-400">{branch}</p>
        </div>
      </td>

      <td className="px-6 py-5 text-center">
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${statusClass}`}
        >
          <span className={`mr-2 h-1.5 w-1.5 rounded-full ${dotClass}`} />
          {status}
        </span>
      </td>

      <td className="px-6 py-5 text-right">
        <div className="flex items-center justify-end gap-2">
          <button className="rounded-lg p-2 text-teal-700 transition-colors hover:bg-teal-50">
            <Eye size={18} />
          </button>
          <button className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100">
            <Pencil size={18} />
          </button>
          <button className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100">
            <MoreVertical size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default function ReceptionistManagement() {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-[#f7fafa] px-4 py-6 text-slate-900 sm:px-6 lg:px-8 xl:px-10">
      <div className="w-full max-w-none">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="font-['Manrope',sans-serif] text-3xl font-extrabold tracking-tight text-slate-900">
              Receptionist Management
            </h2>
            <p className="mt-1 font-medium text-slate-500">
              Manage and monitor front-desk staff across hospital branches.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button className="flex items-center gap-2 rounded-xl bg-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-300">
              <Download size={18} />
              Export CSV
            </button>
            <button
              className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-teal-700 to-cyan-700 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-teal-700/20 transition-all hover:brightness-110"
              onClick={() => {
                navigate("/admin/add-receptionist");
              }}
            >
              <UserPlus size={18} />
              Add Receptionist
            </button>
          </div>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {summaryCards.map((card) => (
            <SummaryCard key={card.label} {...card} />
          ))}
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-4 rounded-2xl bg-slate-100 p-4">
          <FilterSelect
            icon={Filter}
            defaultValue="Shift: All"
            options={["Morning", "Afternoon", "Night"]}
          />
          <FilterSelect
            icon={MapPin}
            defaultValue="Branch: All"
            options={["Main Clinic", "East Wing", "North Annex"]}
          />
          <FilterSelect
            icon={ShieldCheck}
            defaultValue="Status: All"
            options={["Active", "On Shift", "Off Duty", "Suspended"]}
          />
          <button className="rounded-xl bg-slate-200 p-2.5 text-slate-700 transition-colors hover:bg-slate-300">
            <RefreshCw size={18} />
          </button>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow-[0px_8px_32px_rgba(0,101,101,0.04)] ring-1 ring-slate-200/60">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] border-collapse text-left">
              <thead>
                <tr className="bg-slate-100/70">
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">
                    Staff ID
                  </th>
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">
                    Receptionist
                  </th>
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">
                    Contact Details
                  </th>
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">
                    Shift / Branch
                  </th>
                  <th className="px-6 py-5 text-center text-xs font-bold uppercase tracking-widest text-slate-500">
                    Status
                  </th>
                  <th className="px-6 py-5 text-right text-xs font-bold uppercase tracking-widest text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {staffRows.map((row) => (
                  <StaffRow key={row.id} {...row} />
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between bg-slate-50 px-6 py-5">
            <p className="text-sm font-medium text-slate-500">
              Showing 1-10 of 48 staff members
            </p>

            <div className="flex items-center gap-2">
              <button
                disabled
                className="rounded-lg p-2 text-slate-400 transition-colors disabled:opacity-50"
              >
                <ChevronLeft size={18} />
              </button>
              <button className="h-8 w-8 rounded-lg bg-teal-700 text-sm font-bold text-white">
                1
              </button>
              <button className="h-8 w-8 rounded-lg text-sm font-bold text-slate-600 transition-colors hover:bg-slate-200">
                2
              </button>
              <button className="h-8 w-8 rounded-lg text-sm font-bold text-slate-600 transition-colors hover:bg-slate-200">
                3
              </button>
              <button className="rounded-lg p-2 text-slate-400 transition-colors hover:text-teal-700">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <button className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-teal-700 text-white shadow-2xl md:hidden">
        <Plus size={22} />
      </button>
    </div>
  );
}
