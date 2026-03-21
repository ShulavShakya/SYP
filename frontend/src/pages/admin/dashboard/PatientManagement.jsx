import React from "react";
import {
  UserPlus,
  ArrowUp,
  AlertCircle,
  FilterX,
  Eye,
  Pencil,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const summaryCards = [
  {
    label: "Total Patients",
    value: "12,480",
    valueClassName: "text-primary",
    badge: "4%",
    badgeIcon: ArrowUp,
    badgeClassName: "text-secondary",
    accentClassName: "bg-primary/5",
  },
  {
    label: "New Registrations",
    value: "142",
    valueClassName: "text-on-surface",
    subtext: "this month",
    accentClassName: "bg-secondary/5",
  },
  {
    label: "Admitted",
    value: "328",
    valueClassName: "text-on-surface",
    badgeIcon: AlertCircle,
    badgeClassName: "text-error",
    accentClassName: "bg-tertiary-container/5",
  },
  {
    label: "Follow-up Required",
    value: "85",
    valueClassName: "text-[#8b4823]",
    pill: "Action Needed",
    pillClassName: "bg-orange-100 text-[#341100]",
    accentClassName: "bg-[#ffb692]/10",
  },
];

const patients = [
  {
    id: "#CS-4829",
    initials: "JS",
    avatarType: "initials",
    avatarClassName: "bg-secondary-container text-on-secondary-container",
    name: "Jonathan Smith",
    nationalId: "882-991-00",
    age: "32",
    gender: "Male",
    contact: "+1 202-555-0143",
    lastVisit: "Oct 24, 2023",
    doctor: "Dr. Aris Thorne",
    doctorImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAPguDqZTK19RWNCHEQWqX21nstifNzn7RuIch27Lqr-6tDcM_j1nFnkuO9BuVOsKAF8J-diSGHPjClRgIgj9lOTlRr8vUKSTZaEo7O5FcZow9zrcCn4eolQxxbPk3kFeAhKaj0d1m33R7o70qL0X6ChVRKuQmcqVJrmFYn7nu0HPJVqfnja3Ka1Su_5xaynk6tMmwz9KqmBsDKX51YA25hljxXJPElO90M8xQrehdf6H5TAmoUvJJJH7Hb8M_MMfbpKkF2xhw-z2Vr",
    status: "Admitted",
    statusClassName: "bg-secondary-container text-on-secondary-container",
  },
  {
    id: "#CS-5102",
    avatarType: "image",
    avatarImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuADBCkmyDy4e-sSnzKZRDVFEKpvWQVPHlLz1A9zeC-iJzeJRxTq4Y026xTxV9yQirIfQudJhjTIrFTLYRh5At_PfAu2iRJuhnS5S4yxBjU974btrZm21io4uWu-B7F1Rm4EJD8KbTHVNneYQk3w9zjMe5wAUXEJAr2Sd1xkrFm2s_9rArbUv33r1gXYLVwy4gniU5Ncwoh3U4Dkqdqg7VrFht2BvtYpLtEgimXgI87XCn4AXn5jcPzUKBSWrGInPBpxlfREADH2MJd8",
    name: "Sarah McAlister",
    nationalId: "104-223-90",
    age: "28",
    gender: "Female",
    contact: "+1 202-555-0199",
    lastVisit: "Oct 22, 2023",
    doctor: "Dr. Sarah Jenkins",
    doctorImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBpkxO7IpywrBp3H5ftcPYjJkO8oq8Wk_N7Mphg9RcpGADHCEcAW_C7nAMSlIPSZ5Jl2S-Gy0C5boz7ud2Yf8DMaM8bA6gB5qHJJc_30fQ0aF2dh57vQXQqBQBSC0Q9hQ2e4Ts7pzbCqcPRKupgUwkHPDrpwhr-OtzycsfPKIIi6fFbAWmWD4SBLQIBOemAyeK-oWXagV9x1zJfVxhognxEW25AmlmhiOHRlxap7RZ0RK1_2AU6PmbQAUGuVeDplvcH_ObprfM-cA6i",
    status: "Follow-up",
    statusClassName: "bg-orange-100 text-[#341100]",
  },
  {
    id: "#CS-2911",
    initials: "BW",
    avatarType: "initials",
    avatarClassName: "bg-primary-fixed text-on-primary-fixed",
    name: "Bruce Wayne",
    nationalId: "990-112-44",
    age: "42",
    gender: "Male",
    contact: "+1 202-555-0155",
    lastVisit: "Oct 21, 2023",
    doctor: "Dr. Aris Thorne",
    doctorImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD4C18hoB08sq9-9AAodTKQZu-b3yaF1UgDCmfbYjowusydDBvlYMTEO-swdjd5Acf76VCn0-P7pHbTWnIXJuj3KY62o76YRKl-jK6BK9W6BxmLKiqt2xu32dJ_8JRCDu9ArK7I2icB0uXsqL0q4e2x-JcEQ5L12DJkTVMw2sZXfMbu-zkGFJ-7fO-t-esJTg3cb0ga--ov3BKn3BPMg_T_gNe0T59iTQKFAd7iHpjEndlU2ZvflFLEEahbcC1ejOJhZPK6uP-4CNle",
    status: "Active",
    statusClassName: "bg-primary/10 text-primary",
  },
  {
    id: "#CS-1093",
    avatarType: "image",
    avatarImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDCkd0WGVRbpE7fngDMZsCk4nboj___ko1WzrcaJYCIS8slcB0_lNCnS5w-jJZLAjdPf3lOycn3sxfeOZI-P0iATU0ldomXxUE27dnP9lfcJPxAuxGLf89uyb6OgVCo79IuflIoVsbU2Bzv_SeQhjjAc3Py2Gfvb2m2us35G6ynsMUyboI9IPEJeJGE0SAJ-zrgX9juva15mO2dyOBjJf_7axMys-RMzYBikQAflHIT-NxaEfldSPrsVq0WeemTJbXAVQ2YDC9AeG51",
    name: "Emily Blunt",
    nationalId: "554-102-11",
    age: "36",
    gender: "Female",
    contact: "+1 202-555-0108",
    lastVisit: "Oct 19, 2023",
    doctor: "Dr. Sarah Jenkins",
    doctorImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCZ_a2mjXufXytBkLwo-mhZYbl5k1_4pkZj4eNVkCqY2hFLkpXK4REvwQCnR0moHqztsFPjZuIclg3511SfvgnT3GYNuQ8iO5zFuHdVXfLGW-SMq-aG0MDaCQdUQ6BEkINOmRqqBMfONkXn8zcE4iSuEAiBZvmd8TwQZ3UdWze6xASc632FQizd-iKgd2Q7DrZARXQ6uHJiJQhbtk0kEZqWV1ls3gnAtvFPZSviklzuG3LlH_Atl0-A1SJgiWcLAoIa4m_Riz8mq3-k",
    status: "Discharged",
    statusClassName: "bg-slate-200 text-slate-600",
  },
];

function SummaryCard({
  label,
  value,
  valueClassName,
  badge,
  badgeIcon: BadgeIcon,
  badgeClassName,
  subtext,
  pill,
  pillClassName,
  accentClassName,
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white bg-white p-6 shadow-[0px_4px_20px_rgba(0,101,101,0.03)]">
      <div
        className={`absolute right-0 top-0 h-24 w-24 rounded-bl-full transition-transform group-hover:scale-110 ${accentClassName}`}
      />
      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <div className="flex items-baseline gap-2">
        <h3 className={`text-3xl font-extrabold ${valueClassName}`}>{value}</h3>

        {badge && BadgeIcon ? (
          <span
            className={`flex items-center text-xs font-bold ${badgeClassName}`}
          >
            <BadgeIcon size={12} className="mr-1" />
            {badge}
          </span>
        ) : null}

        {BadgeIcon && !badge ? (
          <span
            className={`flex items-center text-xs font-bold ${badgeClassName}`}
          >
            <BadgeIcon size={12} />
          </span>
        ) : null}

        {subtext ? (
          <span className="text-xs font-medium text-slate-400">{subtext}</span>
        ) : null}

        {pill ? (
          <span
            className={`ml-2 rounded-full px-2 py-0.5 text-[10px] font-bold ${pillClassName}`}
          >
            {pill}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function PatientRow({
  id,
  initials,
  avatarType,
  avatarClassName,
  avatarImage,
  name,
  nationalId,
  age,
  gender,
  contact,
  lastVisit,
  doctor,
  doctorImage,
  status,
  statusClassName,
}) {
  return (
    <tr className="group transition-colors hover:bg-primary/5">
      <td className="px-6 py-5 font-mono text-xs font-bold text-slate-400">
        {id}
      </td>

      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          {avatarType === "image" ? (
            <img
              src={avatarImage}
              alt={name}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${avatarClassName}`}
            >
              {initials}
            </div>
          )}

          <div>
            <p className="font-headline text-sm font-bold text-on-surface">
              {name}
            </p>
            <p className="text-xs text-slate-500">ID: {nationalId}</p>
          </div>
        </div>
      </td>

      <td className="px-6 py-5 text-center">
        <p className="text-sm font-semibold text-on-surface">{age}</p>
        <p className="text-[10px] font-bold uppercase text-slate-500">
          {gender}
        </p>
      </td>

      <td className="px-6 py-5">
        <p className="text-sm font-medium text-on-surface">{contact}</p>
      </td>

      <td className="px-6 py-5">
        <p className="text-sm text-on-surface">{lastVisit}</p>
      </td>

      <td className="px-6 py-5">
        <div className="flex items-center gap-2">
          <img
            src={doctorImage}
            alt={doctor}
            className="h-6 w-6 rounded-full object-cover"
          />
          <span className="text-sm font-medium">{doctor}</span>
        </div>
      </td>

      <td className="px-6 py-5">
        <span
          className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${statusClassName}`}
        >
          {status}
        </span>
      </td>

      <td className="px-6 py-5 text-right">
        <div className="flex justify-end gap-2">
          <button className="rounded-lg border border-transparent bg-surface p-2 text-primary transition-colors hover:border-[#bdc9c8]/20 hover:bg-white">
            <Eye size={18} />
          </button>
          <button className="rounded-lg border border-transparent bg-surface p-2 text-slate-600 transition-colors hover:border-[#bdc9c8]/20 hover:bg-white">
            <Pencil size={18} />
          </button>
          <button className="rounded-lg bg-error-container p-2 text-error transition-colors hover:bg-error hover:text-white">
            <LogOut size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default function PatientManagement() {
  return (
    <div className="w-full bg-[#f7fafa] px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
      <div className="w-full max-w-none space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold leading-none tracking-tight text-on-surface">
              Patient Management
            </h1>
            <p className="mt-2 font-body text-slate-500">
              Manage and track all hospital patient records across departments.
            </p>
          </div>

          <button className="flex items-center gap-2 self-start rounded-xl bg-gradient-to-br from-[#006565] to-[#008080] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#006565]/20 transition-transform active:scale-95 sm:self-auto">
            <UserPlus size={18} />
            Add Patient
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => (
            <SummaryCard key={card.label} {...card} />
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-surface-container-low/50 p-2 backdrop-blur-sm">
          <div className="flex items-center gap-2 rounded-xl border border-[#bdc9c8]/20 bg-white px-3 py-2">
            <span className="text-xs font-bold uppercase text-slate-400">
              Gender
            </span>
            <select className="border-none bg-transparent p-0 pr-8 text-sm font-semibold focus:ring-0">
              <option>All</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-[#bdc9c8]/20 bg-white px-3 py-2">
            <span className="text-xs font-bold uppercase text-slate-400">
              Age Group
            </span>
            <select className="border-none bg-transparent p-0 pr-8 text-sm font-semibold focus:ring-0">
              <option>All Ages</option>
              <option>0-18</option>
              <option>19-45</option>
              <option>46-65</option>
              <option>65+</option>
            </select>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-[#bdc9c8]/20 bg-white px-3 py-2">
            <span className="text-xs font-bold uppercase text-slate-400">
              Status
            </span>
            <select className="border-none bg-transparent p-0 pr-8 text-sm font-semibold focus:ring-0">
              <option>All Status</option>
              <option>Active</option>
              <option>Admitted</option>
              <option>Follow-up</option>
              <option>Discharged</option>
            </select>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-[#bdc9c8]/20 bg-white px-3 py-2">
            <span className="text-xs font-bold uppercase text-slate-400">
              Reg. Date
            </span>
            <input
              type="date"
              className="border-none bg-transparent p-0 text-sm font-semibold focus:ring-0"
            />
          </div>

          <button className="ml-auto flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-primary transition-colors hover:bg-white">
            <FilterX size={18} />
            Reset Filters
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] border-collapse text-left">
              <thead className="border-b border-[#bdc9c8]/10 bg-[#f1f4f4]/50">
                <tr>
                  <th className="px-6 py-4 text-[11px] font-extrabold uppercase tracking-widest text-slate-500">
                    Patient ID
                  </th>
                  <th className="px-6 py-4 text-[11px] font-extrabold uppercase tracking-widest text-slate-500">
                    Name
                  </th>
                  <th className="px-6 py-4 text-center text-[11px] font-extrabold uppercase tracking-widest text-slate-500">
                    Age / Gender
                  </th>
                  <th className="px-6 py-4 text-[11px] font-extrabold uppercase tracking-widest text-slate-500">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-[11px] font-extrabold uppercase tracking-widest text-slate-500">
                    Last Visit
                  </th>
                  <th className="px-6 py-4 text-[11px] font-extrabold uppercase tracking-widest text-slate-500">
                    Assigned Doctor
                  </th>
                  <th className="px-6 py-4 text-[11px] font-extrabold uppercase tracking-widest text-slate-500">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-[11px] font-extrabold uppercase tracking-widest text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-50">
                {patients.map((patient) => (
                  <PatientRow key={patient.id} {...patient} />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col gap-4 pb-12 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium text-slate-500">
            Showing <span className="font-bold text-on-surface">1-10</span> of{" "}
            <span className="font-bold text-on-surface">12,480</span> patients
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled
              className="rounded-xl border border-[#bdc9c8]/20 bg-white p-2 text-slate-400 transition-colors disabled:opacity-50"
            >
              <ChevronLeft size={18} />
            </button>

            <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white shadow-md">
              1
            </button>

            <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#bdc9c8]/20 bg-white text-sm font-bold text-slate-600 transition-colors hover:bg-primary/10">
              2
            </button>

            <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#bdc9c8]/20 bg-white text-sm font-bold text-slate-600 transition-colors hover:bg-primary/10">
              3
            </button>

            <span className="px-2 font-bold text-slate-400">...</span>

            <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#bdc9c8]/20 bg-white text-sm font-bold text-slate-600 transition-colors hover:bg-primary/10">
              1248
            </button>

            <button className="rounded-xl border border-[#bdc9c8]/20 bg-white p-2 text-slate-400 transition-colors hover:text-primary">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
