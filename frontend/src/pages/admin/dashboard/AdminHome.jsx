import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  MoreHorizontal,
  TrendingUp,
  ChartPie,
  UserPlus,
  UserRoundPlus,
  BadgePlus,
  BarChart3,
  ChevronRight,
} from "lucide-react";

const stats = [
  { label: "Total Doctors", value: "142", badge: "+3%" },
  { label: "Total Patients", value: "12,480", badge: "+8%" },
  { label: "Receptionists", value: "45" },
  { label: "Appointments", value: "328" },
  { label: "Pending", value: "12", valueClassName: "text-red-600" },
  { label: "Revenue", value: "$128k", valueClassName: "text-teal-700" },
];

const quickActions = [
  { label: "Add Doctor", icon: UserPlus, path: "/admin/add-doctor" },
  {
    label: "Register Patient",
    icon: UserRoundPlus,
    path: "/admin/add-patient",
  },
  {
    label: "Add Receptionist",
    icon: BadgePlus,
    path: "/admin/add-receptionist",
  },
  { label: "View Reports", icon: BarChart3, path: "/admin/view-reports" },
];

function StatCard({ label, value, badge, valueClassName = "text-slate-900" }) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-white bg-white p-5 shadow-[0_4px_20px_rgba(0,101,101,0.02)]">
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
        {label}
      </p>

      <div className="mt-3 flex items-baseline gap-2">
        <span className={`text-2xl font-extrabold ${valueClassName}`}>
          {value}
        </span>
        {badge ? (
          <span className="rounded-full bg-teal-50 px-1.5 py-0.5 text-[10px] font-bold text-teal-600">
            {badge}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function QuickAction({ icon: Icon, label }) {
  return (
    <button
      type="button"
      className="group flex flex-col items-center gap-2 rounded-xl bg-white/10 p-4 backdrop-blur-md transition-all hover:bg-white/20"
    >
      <Icon size={28} className="transition-transform group-hover:scale-110" />
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}

function ApprovalRow({ id, description, status, statusClassName }) {
  return (
    <tr className="transition-colors hover:bg-slate-50/50">
      <td className="px-6 py-4 font-mono text-sm font-bold text-teal-800">
        {id}
      </td>
      <td className="px-6 py-4 text-sm font-medium">{description}</td>
      <td className="px-6 py-4">
        <span
          className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${statusClassName}`}
        >
          {status}
        </span>
      </td>
      <td className="px-6 py-4 text-right">
        <button
          type="button"
          className="text-slate-400 transition-colors hover:text-teal-600"
        >
          <MoreHorizontal size={18} />
        </button>
      </td>
    </tr>
  );
}

function ActivityItem({ title, description, time, dotClassName }) {
  return (
    <div className="relative flex gap-4 pl-10">
      <div
        className={`absolute left-2 h-4 w-4 rounded-full border-4 border-white shadow-sm ring-1 ${dotClassName}`}
      />
      <div>
        <p className="text-sm font-bold">{title}</p>
        <p className="mt-0.5 text-xs text-slate-500">{description}</p>
        <p className="mt-2 text-[10px] font-medium uppercase text-slate-400">
          {time}
        </p>
      </div>
    </div>
  );
}

function StaffItem({ name, role, image }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-transparent p-3 transition-all hover:border-slate-100 hover:bg-slate-50">
      <img
        src={image}
        alt={name}
        className="h-10 w-10 rounded-xl object-cover"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold">{name}</p>
        <p
          className={`truncate text-xs font-medium ${
            role === "Front Desk" ? "text-slate-500" : "text-teal-600"
          }`}
        >
          {role}
        </p>
      </div>
      <ChevronRight size={16} className="text-slate-300" />
    </div>
  );
}

export default function AdminHome() {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-[#f7fafa] text-[#181c1d]">
      <div className="w-full px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
        <div className="w-full max-w-none space-y-8">
          <section>
            <h2 className="font-['Manrope',sans-serif] text-3xl font-extrabold tracking-tight text-slate-900">
              Hospital Overview
            </h2>
            <p className="mt-1 font-medium text-slate-600">
              Welcome back, Admin. Here's what's happening today at Upachaar.
            </p>
          </section>

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </section>

          <div className="grid grid-cols-1 gap-8 2xl:grid-cols-12">
            <div className="space-y-8 2xl:col-span-8">
              <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#006565] to-[#008080] p-8 text-white">
                <div className="relative z-10">
                  <h3 className="mb-4 font-['Manrope',sans-serif] text-xl font-bold">
                    Quick Management
                  </h3>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {quickActions.map((action) => (
                      <QuickAction
                        key={action.label}
                        icon={action.icon}
                        label={action.label}
                        onClick={() => {
                          navigate(action.path);
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-teal-900/20 blur-2xl" />
              </section>
            </div>
          </div>

          <footer className="flex flex-col gap-4 border-t border-slate-100 pt-8 text-[10px] font-medium uppercase tracking-widest text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2024 Upachaar Ecosystem</p>
            <div className="flex flex-wrap gap-4 sm:gap-6">
              <a href="#" className="transition-colors hover:text-teal-600">
                Privacy
              </a>
              <a href="#" className="transition-colors hover:text-teal-600">
                Compliance
              </a>
              <a href="#" className="transition-colors hover:text-teal-600">
                Audit Logs
              </a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
