import React, { useState } from "react";
import {
  Bell,
  CalendarDays,
  ClipboardCheck,
  CreditCard,
  Heart,
  Home,
  Menu,
  Search,
  Settings,
  Stethoscope,
  UserCog,
  Users,
  UserPlus,
  RefreshCw,
  AlertTriangle,
  Package,
  CalendarPlus,
  ChevronDown,
  FileText,
  Info,
  LogIn,
  PlayCircle,
  CircleX,
  Hourglass,
  UserCheck,
} from "lucide-react";

const summaryCards = [
  {
    title: "Total Patients Today",
    value: "124",
    meta: "+12% vs yesterday",
    metaClass: "text-green-600",
    icon: Users,
    iconWrap: "bg-primary/10 text-primary",
  },
  {
    title: "Appointments Today",
    value: "48",
    meta: "+5% vs avg.",
    metaClass: "text-green-600",
    icon: CalendarDays,
    iconWrap: "bg-mint/10 text-mint",
  },
  {
    title: "Patients Waiting",
    value: "12",
    meta: "3 urgent cases",
    metaClass: "text-red-500",
    icon: ClipboardCheck,
    iconWrap: "bg-yellow-50 text-yellow-600",
  },
  {
    title: "Doctors Available",
    value: "8",
    meta: "Across 4 departments",
    metaClass: "text-slate-500",
    icon: Stethoscope,
    iconWrap: "bg-indigo-50 text-indigo-600",
  },
];

const appointments = [
  {
    patient: "John Doe",
    initials: "JD",
    avatarClass: "bg-primary/20 text-primary",
    doctor: "Dr. Smith",
    department: "Cardiology",
    time: "09:00 AM",
    status: "Scheduled",
    statusClass: "bg-blue-100 text-blue-700",
    action: "Check-in",
    actionClass: "text-primary hover:text-primary/70",
  },
  {
    patient: "Jane Roe",
    initials: "JR",
    avatarClass: "bg-mint/20 text-mint",
    doctor: "Dr. Adams",
    department: "Pediatrics",
    time: "09:30 AM",
    status: "Waiting",
    statusClass: "bg-yellow-100 text-yellow-700",
    action: "Check-in",
    actionClass: "text-primary hover:text-primary/70",
  },
  {
    patient: "Sam Brown",
    initials: "SB",
    avatarClass: "bg-green-100 text-green-600",
    doctor: "Dr. Taylor",
    department: "General Medicine",
    time: "10:00 AM",
    status: "Completed",
    statusClass: "bg-green-100 text-green-700",
    action: "View",
    actionClass: "text-slate-400 hover:text-slate-600",
  },
  {
    patient: "Lisa Ray",
    initials: "LR",
    avatarClass: "bg-red-100 text-red-600",
    doctor: "Dr. Smith",
    department: "Cardiology",
    time: "10:15 AM",
    status: "Cancelled",
    statusClass: "bg-red-100 text-red-700",
    action: "Reschedule",
    actionClass: "text-primary hover:text-primary/70",
  },
  {
    patient: "Paul Low",
    initials: "PL",
    avatarClass: "bg-slate-100 text-slate-600",
    doctor: "Dr. Adams",
    department: "Pediatrics",
    time: "11:00 AM",
    status: "Scheduled",
    statusClass: "bg-blue-100 text-blue-700",
    action: "Check-in",
    actionClass: "text-primary hover:text-primary/70",
  },
];

const actionConfig = {
  checkin: {
    label: "Check-in",
    icon: LogIn,
  },
  reschedule: {
    label: "Reschedule",
    icon: RefreshCw,
  },
  cancel: {
    label: "Cancel",
    icon: CircleX,
  },
  start: {
    label: "Start Session",
    icon: PlayCircle,
  },
  details: {
    label: "Details",
    icon: Info,
  },
  report: {
    label: "View Report",
    icon: FileText,
  },
  rebook: {
    label: "Re-book",
    icon: RefreshCw,
  },
};

function SummaryCard({ title, value, meta, metaClass, icon: Icon, iconWrap }) {
  return (
    <div className="flex items-center gap-5 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-2xl ${iconWrap}`}
      >
        <Icon size={28} />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="font-manrope text-2xl font-bold text-[#2C3E50]">
          {value}
        </h3>
        <p className={`mt-1 text-xs font-semibold ${metaClass}`}>{meta}</p>
      </div>
    </div>
  );
}

function ActionDropdown({ actions, appointment, onAction }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
      >
        Actions
        <ChevronDown
          size={16}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
          <div className="py-1">
            {actions.map((action) => {
              const config = actionConfig[action];
              if (!config) return null;
              const Icon = config.icon;

              return (
                <button
                  key={action}
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    onAction(action, appointment);
                  }}
                  className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-50"
                >
                  <Icon size={16} />
                  <span>{config.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ReceptionistHome() {
  const handleAction = (action, appointment) => {
    switch (action) {
      case "checkin":
        console.log("Check-in:", appointment.patient);
        break;
      case "reschedule":
        console.log("Reschedule:", appointment.patient);
        break;
      case "cancel":
        console.log("Cancel:", appointment.patient);
        break;
      case "start":
        console.log("Start Session:", appointment.patient);
        break;
      case "details":
        console.log("Details:", appointment.patient);
        break;
      case "report":
        console.log("View Report:", appointment.patient);
        break;
      case "rebook":
        console.log("Re-book:", appointment.patient);
        break;
      default:
        break;
    }
  };

  const handleViewDetails = (appointment) => {
    console.log("View Details:", appointment.patient);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Content */}
        <main className="flex-1 overflow-y-auto p-8 space-y-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {summaryCards.map((card) => (
              <SummaryCard key={card.title} {...card} />
            ))}
          </div>

          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Table */}
            <div className="flex-1 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 p-6">
                <div>
                  <h2 className="font-manrope text-xl font-bold text-[#2C3E50]">
                    Today&apos;s Appointments
                  </h2>
                  <p className="text-sm text-slate-500">
                    Live view of scheduled patient visits
                  </p>
                </div>

                <div className="flex gap-2">
                  <button className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-200">
                    Export CSV
                  </button>
                  <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90">
                    <RefreshCw size={14} />
                    Refresh List
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                        Patient Name
                      </th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                        Doctor
                      </th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                        Department
                      </th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                        Time
                      </th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                        Status
                      </th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {appointments.map((item) => (
                      <tr
                        key={`${item.patient}-${item.time}`}
                        className="transition-colors hover:bg-slate-50/50"
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${item.avatarClass}`}
                            >
                              {item.initials}
                            </div>
                            <span className="text-sm font-semibold text-slate-700">
                              {item.patient}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-sm text-slate-600">
                          {item.doctor}
                        </td>
                        <td className="px-6 py-5 text-sm text-slate-600">
                          {item.department}
                        </td>
                        <td className="px-6 py-5 text-sm font-medium text-slate-700">
                          {item.time}
                        </td>
                        <td className="px-6 py-5">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold ${item.statusClass}`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          {item.status === "Scheduled" ? (
                            <ActionDropdown
                              actions={["checkin", "reschedule", "cancel"]}
                              appointment={item}
                              onAction={handleAction}
                            />
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleViewDetails(item)}
                              className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-slate-700"
                            >
                              View Details
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </main>
    </div>
  );
}
