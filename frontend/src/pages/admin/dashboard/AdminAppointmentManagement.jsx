import React from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  XCircle,
  Filter,
  CalendarRange,
  UserRound,
  Building2,
  Flag,
  Eye,
  ChevronLeft,
  ChevronRight,
  Plus,
  Lightbulb,
} from "lucide-react";

const summaryCards = [
  {
    label: "Appointments Today",
    value: "328",
    valueClassName: "text-slate-900",
    badge: "+12%",
    badgeClassName: "text-teal-600",
    accentClassName: "bg-teal-100",
    icon: CalendarDays,
    iconClassName: "bg-teal-50 text-teal-700",
  },
  {
    label: "Completed",
    value: "142",
    valueClassName: "text-slate-900",
    accentClassName: "bg-emerald-100",
    icon: CheckCircle2,
    iconClassName: "bg-emerald-50 text-emerald-700",
  },
  {
    label: "Pending",
    value: "158",
    valueClassName: "text-slate-900",
    accentClassName: "bg-orange-100",
    icon: Clock3,
    iconClassName: "bg-orange-50 text-orange-700",
  },
  {
    label: "Cancelled",
    value: "28",
    valueClassName: "text-slate-900",
    accentClassName: "bg-red-100",
    icon: XCircle,
    iconClassName: "bg-red-50 text-red-700",
  },
];

const appointments = [
  {
    id: "#APT-2941",
    patient: "Robert Jenkins",
    patientInitials: "RJ",
    patientClassName: "bg-primary/10 text-primary",
    doctor: "Dr. Emily Stone",
    department: "Cardiology",
    date: "Oct 24, 2023",
    time: "10:30 AM",
    status: "Confirmed",
    statusClassName: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "#APT-2942",
    patient: "Sarah Miller",
    patientInitials: "SM",
    patientClassName: "bg-slate-100 text-slate-500",
    doctor: "Dr. Alan Vance",
    department: "Neurology",
    date: "Oct 24, 2023",
    time: "11:15 AM",
    status: "Completed",
    statusClassName: "bg-slate-200 text-slate-600",
  },
  {
    id: "#APT-2943",
    patient: "Michael Knight",
    patientInitials: "MK",
    patientClassName: "bg-orange-100 text-orange-700",
    doctor: "Dr. Sarah West",
    department: "General Medicine",
    date: "Oct 24, 2023",
    time: "12:00 PM",
    status: "Pending",
    statusClassName: "bg-orange-100 text-orange-700",
  },
  {
    id: "#APT-2944",
    patient: "Laura Brown",
    patientInitials: "LB",
    patientClassName: "bg-red-100 text-red-700",
    doctor: "Dr. Emily Stone",
    department: "Cardiology",
    date: "Oct 24, 2023",
    time: "01:30 PM",
    status: "Cancelled",
    statusClassName: "bg-red-100 text-red-700",
  },
];

const todaySchedule = [
  {
    hourBadge: "09",
    hourBadgeClassName: "bg-emerald-100 text-emerald-700",
    time: "09:30 AM",
    patient: "James Wilson",
    type: "Dental Checkup",
  },
  {
    hourBadge: "10",
    hourBadgeClassName: "bg-teal-600 text-white",
    time: "10:15 AM",
    patient: "Linda Parker",
    type: "Orthopedic Follow-up",
  },
  {
    hourBadge: "11",
    hourBadgeClassName: "bg-orange-100 text-orange-800",
    time: "11:45 AM",
    patient: "Mark Anthony",
    type: "Physiotherapy Session",
  },
  {
    hourBadge: "02",
    hourBadgeClassName: "bg-slate-200 text-slate-600",
    time: "02:30 PM",
    patient: "Anna Peterson",
    type: "Blood Test Results",
  },
  {
    hourBadge: "04",
    hourBadgeClassName: "bg-slate-200 text-slate-600",
    time: "04:00 PM",
    patient: "Robert Fox",
    type: "Skin Consultation",
  },
];

function SummaryCard({
  label,
  value,
  valueClassName = "text-slate-900",
  badge,
  badgeClassName = "text-teal-600",
  accentClassName = "bg-teal-100",
  icon: Icon,
  iconClassName = "bg-teal-50 text-teal-700",
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white p-6 shadow-[0_4px_20px_rgba(0,101,101,0.03)] transition-all hover:shadow-md">
      <div
        className={`absolute right-0 top-0 h-24 w-24 rounded-bl-full opacity-60 transition-transform group-hover:scale-110 ${accentClassName}`}
      />

      <div className="mb-4 flex items-start justify-between">
        {Icon ? (
          <div className={`rounded-xl p-2.5 ${iconClassName}`}>
            <Icon size={18} />
          </div>
        ) : (
          <div />
        )}

        {badge ? (
          <span className={`text-xs font-bold ${badgeClassName}`}>{badge}</span>
        ) : null}
      </div>

      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
        {label}
      </p>

      <h3
        className={`font-['Manrope',sans-serif] text-3xl font-extrabold ${valueClassName}`}
      >
        {value}
      </h3>
    </div>
  );
}

function FilterSelect({ icon: Icon, options }) {
  return (
    <div className="min-w-[150px] flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 focus-within:border-primary/20">
      <div className="flex items-center gap-2">
        <Icon size={16} className="text-slate-400" />
        <select className="w-full cursor-pointer border-none bg-transparent p-0 text-sm font-medium text-slate-700 focus:ring-0">
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

function AppointmentRow({
  id,
  patient,
  patientInitials,
  patientClassName,
  doctor,
  department,
  date,
  time,
  status,
  statusClassName,
}) {
  return (
    <tr className="group transition-colors hover:bg-slate-50/70">
      <td className="px-6 py-4 text-sm font-bold text-teal-700">{id}</td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${patientClassName}`}
          >
            {patientInitials}
          </div>
          <span className="text-sm font-semibold text-slate-900">
            {patient}
          </span>
        </div>
      </td>

      <td className="px-6 py-4 text-sm font-medium text-slate-900">{doctor}</td>

      <td className="px-6 py-4 text-sm text-slate-700">{department}</td>

      <td className="px-6 py-4">
        <div className="text-sm font-semibold text-slate-900">{date}</div>
        <div className="text-[11px] text-slate-500">{time}</div>
      </td>

      <td className="px-6 py-4">
        <span
          className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${statusClassName}`}
        >
          {status}
        </span>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <button
            className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-primary"
            title="View"
          >
            <Eye size={16} />
          </button>
          {status !== "Completed" && (
            <button
              className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-primary"
              title="Reschedule"
            >
              <CalendarDays size={16} />
            </button>
          )}
          {status === "Confirmed" && (
            <button
              className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-red-600"
              title="Cancel"
            >
              <XCircle size={16} />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

function ScheduleItem({ hourBadge, hourBadgeClassName, time, patient, type }) {
  return (
    <div className="relative flex gap-4">
      <div
        className={`z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-4 border-white text-[10px] font-bold ${hourBadgeClassName}`}
      >
        {hourBadge}
      </div>
      <div className="flex-1">
        <p className="text-xs font-bold text-primary">{time}</p>
        <p className="mt-0.5 text-sm font-semibold text-slate-900">{patient}</p>
        <p className="text-[10px] uppercase tracking-tight text-slate-500">
          {type}
        </p>
      </div>
    </div>
  );
}

export default function AdminAppointmentManagement() {
  return (
    <div className="w-full bg-[#f7fafa] px-4 py-6 text-slate-900 sm:px-6 lg:px-8 xl:px-10">
      <div className="w-full max-w-none">
        <div className="mb-8">
          <h2 className="font-['Manrope',sans-serif] text-3xl font-extrabold tracking-tight text-slate-900">
            Appointment Management
          </h2>
          <p className="mt-1 font-medium text-slate-500">
            Manage and track all hospital appointments across departments.
          </p>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {summaryCards.map((card) => (
            <SummaryCard key={card.label} {...card} />
          ))}
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex-1 space-y-6 min-w-0">
            <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-slate-100 p-4">
              <FilterSelect
                icon={CalendarRange}
                options={["Filter by Date", "Today", "Tomorrow", "This Week"]}
              />
              <FilterSelect
                icon={UserRound}
                options={["Doctor", "Dr. Aris", "Dr. Grey"]}
              />
              <FilterSelect
                icon={Building2}
                options={["Department", "Cardiology", "Neurology"]}
              />
              <FilterSelect
                icon={Flag}
                options={["Status", "Confirmed", "Pending"]}
              />

              <button className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-container">
                <Filter size={16} />
                Apply Filters
              </button>
            </div>

            <div className="overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,101,101,0.03)] ring-1 ring-slate-200/50">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[980px] border-collapse text-left">
                  <thead>
                    <tr className="bg-slate-100/70">
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                        ID
                      </th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                        Patient
                      </th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                        Doctor
                      </th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                        Department
                      </th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                        Date &amp; Time
                      </th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                        Status
                      </th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {appointments.map((appointment) => (
                      <AppointmentRow key={appointment.id} {...appointment} />
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/80 px-6 py-4">
                <p className="text-xs font-medium text-slate-500">
                  Showing 1 to 10 of 328 appointments
                </p>

                <div className="flex gap-2">
                  <button className="rounded-lg border border-transparent p-1 transition-all hover:border-slate-200 hover:bg-white">
                    <ChevronLeft size={18} />
                  </button>
                  <button className="rounded-lg border border-transparent p-1 transition-all hover:border-slate-200 hover:bg-white">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full space-y-6 lg:w-80">
            <div className="rounded-2xl border border-primary/5 bg-white p-6 shadow-[0_4px_20px_rgba(0,101,101,0.03)]">
              <div className="mb-6 flex items-center justify-between">
                <h4 className="font-['Manrope',sans-serif] text-lg font-bold text-slate-900">
                  Today's Schedule
                </h4>
                <Clock3 size={20} className="text-primary" />
              </div>

              <div className="relative space-y-6 before:absolute before:bottom-2 before:left-[15px] before:top-2 before:w-[2px] before:bg-slate-200">
                {todaySchedule.map((item, index) => (
                  <ScheduleItem key={`${item.time}-${index}`} {...item} />
                ))}
              </div>

              <button className="mt-8 w-full rounded-xl border-2 border-primary/10 py-3 text-sm font-bold text-primary transition-all hover:bg-primary/5">
                View Full Calendar
              </button>
            </div>

            {/* <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary-container p-6 text-white shadow-xl shadow-primary/20">
              <div className="relative z-10">
                <h4 className="mb-2 text-lg font-bold">Efficiency Tip</h4>
                <p className="text-xs font-medium leading-relaxed text-white/85">
                  Use the "Department" filter to quickly manage overcrowding in
                  specific units during peak hours.
                </p>
                <button className="mt-4 rounded-lg bg-white/20 px-3 py-1.5 text-xs font-bold transition-all hover:bg-white/30">
                  Dismiss
                </button>
              </div>
              <Lightbulb className="absolute -bottom-6 -right-6 h-24 w-24 opacity-10" />
            </div> */}
          </div>
        </div>
      </div>

      <button className="fixed bottom-8 right-8 z-50 flex items-center justify-center rounded-full bg-primary p-4 text-white shadow-2xl transition-all hover:scale-105 hover:bg-primary-container active:scale-95">
        <Plus size={24} />
        <span className="ml-0 max-w-0 overflow-hidden whitespace-nowrap font-bold transition-all duration-300 hover:max-w-xs group-hover:ml-2">
          Book Appointment
        </span>
      </button>
    </div>
  );
}
