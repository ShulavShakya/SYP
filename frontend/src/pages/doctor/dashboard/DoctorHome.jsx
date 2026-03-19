import React from "react";
import {
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Download,
  FileSpreadsheet,
  FlaskConical,
  Search,
  SlidersHorizontal,
  Stethoscope,
  Users,
  AlertTriangle,
  Clock3,
} from "lucide-react";

const navItems = ["Dashboard", "Patients", "Schedules", "Lab Results"];

const summaryCards = [
  {
    title: "Today's Appointments",
    value: "24",
    badge: "+4 from yesterday",
    icon: CalendarDays,
    iconWrap: "bg-blue-50",
    iconColor: "text-blue-600",
    badgeClass: "text-blue-600 bg-blue-50",
  },
  {
    title: "Patients Waiting",
    value: "8",
    badge: "High Priority",
    icon: Users,
    iconWrap: "bg-amber-50",
    iconColor: "text-amber-600",
    badgeClass: "text-amber-600 bg-amber-50",
  },
  {
    title: "Completed",
    value: "12",
    badge: "50% Goal",
    icon: CheckCircle2,
    iconWrap: "bg-emerald-50",
    iconColor: "text-emerald-600",
    badgeClass: "text-emerald-600 bg-emerald-50",
  },
  {
    title: "Pending Lab Results",
    value: "5",
    badge: "2 Critical",
    icon: FlaskConical,
    iconWrap: "bg-purple-50",
    iconColor: "text-purple-600",
    badgeClass: "text-purple-600 bg-purple-50",
  },
];

const scheduleRows = [
  {
    initials: "JD",
    initialsClass: "bg-blue-100 text-blue-700",
    name: "John Doe",
    time: "09:00 AM",
    department: "Cardiology",
    status: "Scheduled",
    statusClass: "bg-blue-100 text-blue-700",
    action: "View Details",
    actionVariant: "link",
  },
  {
    initials: "JS",
    initialsClass: "bg-amber-100 text-amber-700",
    name: "Jane Smith",
    time: "09:30 AM",
    department: "Pediatrics",
    status: "Waiting",
    statusClass: "bg-amber-100 text-amber-700",
    action: "Check In",
    actionVariant: "button",
  },
  {
    initials: "RB",
    initialsClass: "bg-purple-100 text-purple-700",
    name: "Robert Brown",
    time: "10:15 AM",
    department: "General Medicine",
    status: "In Consultation",
    statusClass: "bg-purple-100 text-purple-700",
    action: "Resume",
    actionVariant: "purple-link",
    rowClass: "bg-purple-50/20",
  },
  {
    initials: "EW",
    initialsClass: "bg-emerald-100 text-emerald-700",
    name: "Emily White",
    time: "11:00 AM",
    department: "Dermatology",
    status: "Completed",
    statusClass: "bg-emerald-100 text-emerald-700",
    action: "Summary",
    actionVariant: "muted-link",
  },
  {
    initials: "MT",
    initialsClass: "bg-blue-100 text-blue-700",
    name: "Mark Taylor",
    time: "11:45 AM",
    department: "Cardiology",
    status: "Scheduled",
    statusClass: "bg-blue-100 text-blue-700",
    action: "View Details",
    actionVariant: "link",
  },
];

const queueItems = [
  {
    name: "Liam Wilson",
    waitTime: "12 min",
    priority: "Critical",
    priorityIcon: AlertTriangle,
    priorityIconClass: "text-amber-600",
    priorityTextClass: "text-slate-500",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD5JyB1MSX932E-SlcRdk3Y9Gsw2q0PUJIxDt3qz36pebvlHFOpd9DBJ_c9hu9wzxTB0Bkp7EgA7FyOrfYcWnjakOEVZCkdIdU8F-jq-y0vQgQrBv1tduMxP4j8atiwpMTbBlZMvxgm8JDU5km9X9TWyDwrf-HiTMEo_L0M60FggXYS711aqeL0qJl_JCAT9iWlJfnGt3aYlDPbo8aPtpnZS90MOmYcl3_d-A1TKm1jGTegiuNuhEo96KAG4TdEYOGB4t3E8pNijDXz",
    cardClass: "bg-[#F7FAFA]",
  },
  {
    name: "Sophia Martinez",
    waitTime: "25 min",
    priority: "Regular",
    priorityIcon: Clock3,
    priorityIconClass: "text-slate-400",
    priorityTextClass: "text-slate-500",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBlHonULAAmvbeUreBwXsipUVKmor0A5ndZhPhArWoUNpFvuiGU-yO7gQNHxe8b7KZ-T9TeiSprRBs8UcsAOZNAC-rmbcH1vvYf3cYdYgaVoDbGu_kgn8Nj-20iWtnTbzYW1MIPJZTkZrgqoKqil9unViKDbqVkb9-mEN6WBW08QNs0CFuu1qjOaWuh8y1DdMtO-3_Hcxs_WLJZiQi_p2yQHTKRl0x9Vncm3AUJEY34qLYW0ykUc_zSTWMzg-Ed00XXOB5C_U2ZJHkx",
    cardClass: "bg-white",
  },
  {
    name: "David Chen",
    waitTime: "38 min",
    priority: "Regular",
    priorityIcon: Clock3,
    priorityIconClass: "text-slate-400",
    priorityTextClass: "text-slate-500",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCm-2Y1dbq9YMChXvLxLBNSiMl0Tses7NP2h5h0MYRXw8XPUZr2pvjsEUDPf1J_8dwY6ZgvVGZvf_RNqJavYa-XkUBzmkUeF2LpIncua4TZVjGxTKZOUr1_-JHaGDTYCMimpPZX21M7yDIbs-Wrp2BUvpZw-TdvEhbudx6zwOXm0PvMCsMd0uwslmEfZaajyd7P4Qn-MyIN-kPNC-fcPQSisfoTEkih_LnbtOdr5_H2AqTx9eMy2fsMVl6oZkoJSXh76n2v45A1365-",
    cardClass: "bg-white",
  },
  {
    name: "Emma Garcia",
    waitTime: "42 min",
    priority: "Follow-up",
    priorityIcon: AlertTriangle,
    priorityIconClass: "text-amber-600",
    priorityTextClass: "text-slate-500",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDIRLIJJKacfdaNQhM-bvobQfXhIqeHQ93oWlk-SwyCCOm2RI0L5mNdeStOsrM3c8c_sRuBOfHLrXtVSFR41goQmjseRh40tzf84IJmBT2QrB3mtp527Go5E6eZ-Nmzyidjc-HRhn7AawlAoqDa2jFixHZ3RmFUqWNc02hsrKsYhK_VIV1v3SW0wJO72u9imXTMg_3ZaoCvikxvroVaS1fdo37dy-6fQX6SGYxlewASpsdGjjSh2rITXaMAGrrBsX1vA6KsdM72QqEh",
    cardClass: "bg-white",
  },
];

export default function DoctorHome() {
  return (
    <div className="min-h-screen bg-[#F7FAFA] text-[#2C3E50]">
      <div className="relative flex flex-col w-full">
        <main className="mx-auto w-full max-w-[1440px] px-4 py-8 md:px-10">
          <section className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {summaryCards.map((card) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.title}
                  className="flex flex-col gap-4 rounded-xl border border-[#70C1B3]/10 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className={`rounded-lg p-2 ${card.iconWrap}`}>
                      <Icon size={20} className={card.iconColor} />
                    </div>
                    <span
                      className={`rounded px-2 py-1 text-xs font-bold ${card.badgeClass}`}
                    >
                      {card.badge}
                    </span>
                  </div>

                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-[#2C3E50]/60">
                      {card.title}
                    </p>
                    <p className="mt-1 text-3xl font-extrabold">{card.value}</p>
                  </div>
                </article>
              );
            })}
          </section>

          <section className="flex flex-col gap-8 lg:flex-row">
            <div className="flex-grow lg:w-2/3">
              <div className="overflow-hidden rounded-xl border border-[#70C1B3]/10 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-[#70C1B3]/10 px-6 py-5">
                  <h2 className="text-lg font-bold">Today's Schedule</h2>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="flex items-center gap-2 rounded-lg border border-[#70C1B3]/10 bg-[#F7FAFA] px-3 py-1.5 text-xs font-bold"
                    >
                      <SlidersHorizontal size={14} />
                      Filter
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-2 rounded-lg bg-[#008080] px-3 py-1.5 text-xs font-bold text-white"
                    >
                      <Download size={14} />
                      Export CSV
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-[#F7FAFA]/50">
                      <tr>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#2C3E50]/50">
                          Patient Name
                        </th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#2C3E50]/50">
                          Time
                        </th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#2C3E50]/50">
                          Department
                        </th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#2C3E50]/50">
                          Status
                        </th>
                        <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-[#2C3E50]/50">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-[#70C1B3]/5">
                      {scheduleRows.map((row) => (
                        <tr
                          key={`${row.name}-${row.time}`}
                          className={`transition-colors hover:bg-[#F7FAFA]/30 ${row.rowClass || ""}`}
                        >
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div
                                className={`flex size-8 items-center justify-center rounded-full text-xs font-bold ${row.initialsClass}`}
                              >
                                {row.initials}
                              </div>
                              <span className="text-sm font-semibold">
                                {row.name}
                              </span>
                            </div>
                          </td>

                          <td className="whitespace-nowrap px-6 py-4 text-sm text-[#2C3E50]/70">
                            {row.time}
                          </td>

                          <td className="whitespace-nowrap px-6 py-4 text-sm">
                            {row.department}
                          </td>

                          <td className="whitespace-nowrap px-6 py-4">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${row.statusClass}`}
                            >
                              {row.status}
                            </span>
                          </td>

                          <td className="whitespace-nowrap px-6 py-4 text-right">
                            {row.actionVariant === "button" ? (
                              <button
                                type="button"
                                className="rounded-lg bg-[#008080] px-3 py-1.5 text-xs font-bold text-white transition-all hover:bg-[#008080]/90"
                              >
                                {row.action}
                              </button>
                            ) : (
                              <button
                                type="button"
                                className={`text-sm font-bold hover:underline ${
                                  row.actionVariant === "purple-link"
                                    ? "text-purple-700"
                                    : row.actionVariant === "muted-link"
                                      ? "text-[#2C3E50]/50"
                                      : "text-[#008080]"
                                }`}
                              >
                                {row.action}
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-center border-t border-[#70C1B3]/10 bg-[#F7FAFA]/20 px-6 py-4">
                  <button
                    type="button"
                    className="flex items-center gap-1 text-sm font-bold text-[#008080] transition-all hover:gap-2"
                  >
                    View All Schedule <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* <aside className="flex w-full flex-col gap-6 lg:w-1/3">
            <div className="overflow-hidden rounded-xl border border-[#70C1B3]/10 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-[#70C1B3]/10 px-6 py-5">
                <h2 className="text-lg font-bold">Patient Queue</h2>
                <span className="rounded-lg bg-amber-100 px-2 py-1 text-xs font-extrabold text-amber-700">
                  8 Active
                </span>
              </div>

              <div className="flex flex-col gap-4 p-4">
                {queueItems.map((item) => {
                  const PriorityIcon = item.priorityIcon;

                  return (
                    <article
                      key={item.name}
                      className={`flex cursor-pointer items-center justify-between rounded-xl border border-[#70C1B3]/5 p-3 transition-shadow hover:shadow-md ${item.cardClass}`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="size-10 rounded-full border border-[#70C1B3]/20 object-cover"
                        />
                        <div>
                          <p className="text-sm font-bold">{item.name}</p>
                          <p className="text-xs font-medium text-[#70C1B3]">
                            Wait Time: {item.waitTime}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col items-end">
                        <PriorityIcon
                          size={18}
                          className={item.priorityIconClass}
                        />
                        <span
                          className={`text-[10px] font-bold uppercase ${item.priorityTextClass}`}
                        >
                          {item.priority}
                        </span>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="border-t border-[#70C1B3]/10 bg-[#F7FAFA]/20 px-6 py-4">
                <button
                  type="button"
                  className="w-full text-center text-sm font-bold text-[#008080] transition-colors hover:text-[#008080]/80"
                >
                  Manage Full Queue
                </button>
              </div>
            </div>
            {/* 
              <div className="relative overflow-hidden rounded-xl bg-[#008080] p-6 text-white shadow-lg">
                <div className="relative z-10">
                  <div className="mb-4 flex items-center gap-3">
                    <FileSpreadsheet size={18} className="text-[#70C1B3]" />
                    <h3 className="font-bold">Pending Lab Alerts</h3>
                  </div>

                  <p className="mb-4 text-sm leading-relaxed text-white/80">
                    You have 2 critical lab results that require immediate
                    review for Patient #8841 and #9213.
                  </p>

                  <button
                    type="button"
                    className="w-full rounded-lg bg-white py-2 text-sm font-bold text-[#008080] shadow-sm transition-colors hover:bg-slate-50"
                  >
                    Review Results
                  </button>
                </div>

                <div className="absolute -bottom-4 -right-4 size-32 rounded-full bg-[#70C1B3] opacity-20" />
                <div className="absolute right-12 top-[-16px] size-16 rounded-full bg-white opacity-10" />
              </div> */}
            {/* </aside> */}
          </section>
        </main>
      </div>
    </div>
  );
}
