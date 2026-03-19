import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarPlus,
  ChevronDown,
  FileText,
  Info,
  LogIn,
  PlayCircle,
  RefreshCw,
  CircleX,
  Hourglass,
  UserCheck,
  CalendarDays,
} from "lucide-react";

const appointments = [
  {
    id: "#APT-402",
    patient: "Alice Murphy",
    initials: "AM",
    avatarClass: "bg-[#008080]/10 text-[#008080]",
    doctor: "Dr. Sarah Johnson",
    department: "Cardiology",
    time: "09:00 AM",
    status: "Scheduled",
    statusClass: "bg-blue-50 text-blue-700 border border-blue-200",
    actions: ["checkin", "reschedule", "cancel"],
  },
  {
    id: "#APT-403",
    patient: "Benjamin Wright",
    initials: "BW",
    avatarClass: "bg-emerald-100 text-emerald-700",
    doctor: "Dr. Michael Chen",
    department: "Neurology",
    time: "10:30 AM",
    status: "Checked-in",
    statusClass: "bg-[#008080]/10 text-[#008080] border border-[#008080]/20",
    actions: ["start", "details"],
  },
  {
    id: "#APT-398",
    patient: "Emily Miller",
    initials: "EM",
    avatarClass: "bg-slate-200 text-slate-600",
    doctor: "Dr. Robert Wilson",
    department: "General",
    time: "08:15 AM",
    status: "Completed",
    statusClass: "bg-slate-100 text-slate-600 border border-slate-200",
    actions: ["report"],
    muted: true,
  },
  {
    id: "#APT-405",
    patient: "Daniel Kim",
    initials: "DK",
    avatarClass: "bg-red-100 text-red-600",
    doctor: "Dr. Sarah Johnson",
    department: "Cardiology",
    time: "11:45 AM",
    status: "Cancelled",
    statusClass: "bg-red-50 text-red-600 border border-red-200",
    actions: ["rebook"],
  },
  {
    id: "#APT-406",
    patient: "Laura Ross",
    initials: "LR",
    avatarClass: "bg-[#008080]/10 text-[#008080]",
    doctor: "Dr. Emily Adams",
    department: "Pediatrics",
    time: "01:15 PM",
    status: "Scheduled",
    statusClass: "bg-blue-50 text-blue-700 border border-blue-200",
    actions: ["checkin", "reschedule", "cancel"],
  },
];

const summaryCards = [
  {
    label: "Total Today",
    value: "24",
    wrap: "bg-white border-[#E0E6ED]",
    iconWrap: "bg-[#008080]",
    icon: CalendarDays,
    valueClass: "text-[#2C3E50]",
    labelClass: "text-slate-500",
  },
  {
    label: "Checked-in",
    value: "12",
    wrap: "bg-white border-[#E0E6ED]",
    iconWrap: "bg-emerald-500",
    icon: UserCheck,
    valueClass: "text-[#2C3E50]",
    labelClass: "text-slate-500",
  },
  {
    label: "Pending",
    value: "8",
    wrap: "bg-white border-[#E0E6ED]",
    iconWrap: "bg-amber-500",
    icon: Hourglass,
    valueClass: "text-[#2C3E50]",
    labelClass: "text-slate-500",
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

export default function AppointmentManagement() {
  const navigate = useNavigate();

  const handleAction = (action, appointment) => {
    const cleanId = appointment.id.replace("#", "");

    switch (action) {
      case "start":
        navigate(`/doctor/consultations/${cleanId}`, {
          state: {
            patient: {
              id: appointment.id,
              name: appointment.patient,
              age: "--",
              complaint: appointment.department,
              time: appointment.time,
            },
          },
        });
        break;

      case "reschedule":
      case "rebook":
        navigate("/reception/add-appointment", {
          state: { appointment },
        });
        break;

      case "checkin":
        console.log("Check-in:", appointment.id);
        break;

      case "cancel":
        console.log("Cancel:", appointment.id);
        break;

      case "details":
        console.log("Details:", appointment.id);
        break;

      case "report":
        console.log("View Report:", appointment.id);
        break;

      default:
        break;
    }
  };

  const handleViewDetails = (appointment) => {
    console.log("View Details:", appointment.id);
  };

  return (
    <div className="min-h-screen bg-[#F7FAFA] text-slate-900">
      <div className="flex min-h-screen flex-col">
        <main className="mx-auto w-full max-w-7xl flex-1 px-8 py-8">
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {summaryCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.label}
                  className={`flex items-center gap-4 rounded-xl border p-6 shadow-sm ${card.wrap}`}
                >
                  <div
                    className={`flex size-12 items-center justify-center rounded-lg text-white ${card.iconWrap}`}
                  >
                    <Icon size={22} />
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${card.labelClass}`}>
                      {card.label}
                    </p>
                    <p className={`text-2xl font-bold ${card.valueClass}`}>
                      {card.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6">
              <div className="flex gap-8">
                <button
                  type="button"
                  className="flex items-center gap-2 border-b-2 border-[#008080] py-4 text-sm font-semibold text-[#008080]"
                >
                  <span className="material-symbols-outlined text-lg">
                    today
                  </span>
                  Today
                </button>
                <button
                  type="button"
                  className="flex items-center gap-2 border-b-2 border-transparent py-4 text-sm font-medium text-slate-500 transition-colors hover:text-slate-700"
                >
                  <span className="material-symbols-outlined text-lg">
                    calendar_month
                  </span>
                  Upcoming
                </button>
                <button
                  type="button"
                  className="flex items-center gap-2 border-b-2 border-transparent py-4 text-sm font-medium text-slate-500 transition-colors hover:text-slate-700"
                >
                  <span className="material-symbols-outlined text-lg">
                    check_circle
                  </span>
                  Completed
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="p-2 text-slate-400 transition-colors hover:text-slate-600"
                >
                  <span className="material-symbols-outlined">filter_list</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/50">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      ID
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Patient Name
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Doctor
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Department
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
                      Time
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {appointments.map((item) => (
                    <tr
                      key={item.id}
                      className={`transition-colors hover:bg-slate-50 ${
                        item.muted ? "bg-slate-50/30" : ""
                      }`}
                    >
                      <td className="px-6 py-4 text-sm font-semibold text-slate-400">
                        {item.id}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex size-8 items-center justify-center rounded-full text-xs font-bold ${item.avatarClass}`}
                          >
                            {item.initials}
                          </div>
                          <span
                            className={`text-sm font-semibold ${
                              item.muted ? "text-slate-400" : "text-slate-900"
                            }`}
                          >
                            {item.patient}
                          </span>
                        </div>
                      </td>

                      <td
                        className={`px-6 py-4 text-sm ${
                          item.muted ? "text-slate-400" : "text-slate-600"
                        }`}
                      >
                        {item.doctor}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium ${
                            item.muted ? "text-slate-400" : "text-slate-600"
                          }`}
                        >
                          {item.department}
                        </span>
                      </td>

                      <td
                        className={`px-6 py-4 text-center text-sm font-medium ${
                          item.muted ? "text-slate-400" : "text-slate-600"
                        }`}
                      >
                        {item.time}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${item.statusClass}`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        {item.status === "Scheduled" ? (
                          <ActionDropdown
                            actions={item.actions}
                            appointment={item}
                            onAction={handleAction}
                          />
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleViewDetails(item)}
                            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
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

            <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50/30 px-6 py-4">
              <p className="text-xs font-medium text-slate-500">
                Showing 5 of 24 appointments for Oct 24, 2023
              </p>

              <div className="flex gap-2">
                <button
                  type="button"
                  disabled
                  className="rounded border border-slate-200 bg-white px-3 py-1 text-sm text-slate-600 opacity-50"
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="rounded border border-slate-200 bg-white px-3 py-1 text-sm text-slate-600 transition hover:bg-slate-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#008080] px-6 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#007272]"
              onClick={() => {
                navigate("/reception/add-appointment");
              }}
            >
              <CalendarPlus size={18} />
              <span>New Appointment</span>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
