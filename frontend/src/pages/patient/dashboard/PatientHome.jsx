import React from "react";
import {
  Calendar,
  ClipboardPenLine,
  Clock3,
  CreditCard,
  Eye,
  FlaskConical,
  MapPin,
  SlidersHorizontal,
} from "lucide-react";

const summaryCards = [
  {
    title: "Next Activity",
    subtitle: "Upcoming Appointment",
    icon: Calendar,
    bgClass: "bg-[#0d8a8d]",
    iconBgClass: "bg-[#ffffff26]",
  },
  {
    title: "Medication",
    subtitle: "Recent Prescription",
    icon: ClipboardPenLine,
    bgClass: "bg-[#6ebeb4]",
    iconBgClass: "bg-[#ffffff26]",
  },
  {
    title: "Status",
    subtitle: "Pending Lab Results",
    icon: FlaskConical,
    bgClass: "bg-[#3f7fe3]",
    iconBgClass: "bg-[#ffffff2b]",
  },
  {
    title: "Finance",
    subtitle: "Outstanding Bills",
    icon: CreditCard,
    bgClass: "bg-[#f5a005]",
    iconBgClass: "bg-[#ffffff29]",
  },
];

const records = [
  {
    date: "Oct 12, 2023",
    title: "Blood Work Analysis",
    detail:
      "General Health Checkup results uploaded by Lab Central Diagnostic.",
    action: "Download PDF",
    color: "bg-[#0d8a8d]",
  },
  {
    date: "Sep 28, 2023",
    title: "Prescription Updated",
    detail: "Lisinopril 10mg - 30 Day Supply refilled at City Pharma.",
    action: "View Details",
    color: "bg-[#6ebeb4]",
  },
  {
    date: "Sep 15, 2023",
    title: "Radiology Report",
    detail: "Chest X-Ray imaging and final diagnosis report from St. Mary's.",
    action: "View Images",
    color: "bg-[#bcc8d8]",
  },
];

export default function PatientHome() {
  return (
    <div className="space-y-8 p-7">
      <section>
        <h2 className="text-lg font-bold text-slate-800 ">Health Summary</h2>
        <div className="mt-6 grid grid-cols-4 gap-6">
          {summaryCards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.subtitle}
                className={`rounded-2xl p-6 text-white shadow-lg flex flex-col justify-between h-44 group cursor-pointer hover:-translate-y-1 transition-transform ${card.bgClass}`}
              >
                <div
                  className={`size-12 rounded-xl flex items-center justify-center ${card.iconBgClass}`}
                >
                  <Icon size={24} />
                </div>
                <div>
                  <p className="text-xs font-medium text-white/80 mb-1">
                    {card.title}
                  </p>
                  <p className="text-lg font-bold leading-tight">
                    {card.subtitle}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-7 xl:grid-cols-[2.2fr_1fr]">
        <div>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800">
              Next Appointment
            </h2>
            <button
              type="button"
              className="text-primary font-semibold text-sm hover:underline"
            >
              View Schedule
            </button>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex gap-6">
                <div className="bg-slate-50 size-24 rounded-2xl flex flex-col items-center justify-center border border-slate-100">
                  <span className="text-primary font-bold text-xs uppercase tracking-wider">
                    Oct
                  </span>
                  <span className="text-slate-900 font-bold text-4xl">24</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-2xl font-bold text-slate-900">
                      Dr. Sarah Jenkins
                    </h3>
                    <span className="bg-mint/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      Confirmed
                    </span>
                  </div>
                  <p className="text-slate-500 font-medium mb-4">
                    Senior Cardiology Consultant • St. Mary's Hospital
                  </p>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Clock3 className="text-primary" size={18} />
                      <span className="text-sm">10:30 AM (45 min)</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <MapPin className="text-primary" size={18} />
                      <span className="text-sm">Main Building, Room 402</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex -space-x-3 mb-2">
                  <div className="size-8 rounded-full border-2 border-white bg-slate-200"></div>
                  <div className="size-8 rounded-full border-2 border-white bg-slate-300"></div>
                </div>
                <p className="text-[10px] text-slate-400 font-medium">
                  Assistant: Emily Chen
                </p>
              </div>
            </div>
            <div className="mt-10 flex gap-4">
              <button
                type="button"
                className="flex-1 bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity"
              >
                View Appointment Details
              </button>
              <button
                type="button"
                className="px-6 border border-slate-200 text-slate-600 font-bold py-4 rounded-xl hover:bg-slate-50 transition-colors"
              >
                Reschedule
              </button>
            </div>
          </div>
        </div>

        <aside>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800">
              Medical Records
            </h2>
            <button
              type="button"
              className="text-slate-400"
              aria-label="Filter records"
            >
              <SlidersHorizontal size={20} />
            </button>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="space-y-6">
              {records.map((record) => (
                <article
                  key={record.title}
                  className="relative pl-8 pb-6 border-l-2 border-slate-100 last:border-0 last:pb-0"
                >
                  <span
                    className={`absolute -left-[9px] top-0 size-4 rounded-full ring-4 ring-white ${record.color}`}
                  />

                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    {record.date}
                  </p>
                  <h4 className="font-bold text-slate-900 mb-1">
                    {record.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {record.detail}
                  </p>
                  {record.action && (
                    <button
                      type="button"
                      className="mt-2 text-primary text-[10px] font-bold flex items-center gap-1"
                    >
                      <Eye size={14} />
                      {record.action}
                    </button>
                  )}
                </article>
              ))}
            </div>

            <button
              type="button"
              className="w-full mt-8 py-3 border-t border-slate-50 text-xs font-bold text-slate-400 hover:text-primary transition-colors uppercase tracking-widest"
            >
              View Full History
            </button>
          </div>
        </aside>
      </section>
    </div>
  );
}
