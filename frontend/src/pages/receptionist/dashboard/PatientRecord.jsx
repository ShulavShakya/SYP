import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  HeartPulse,
  Search,
  UserPlus,
} from "lucide-react";

const patients = [
  {
    id: "#PT-8821",
    initials: "SJ",
    name: "Sarah Johnson",
    age: 34,
    gender: "Female",
    phone: "(555) 123-4567",
    lastVisit: "Oct 12, 2023",
  },
  {
    id: "#PT-8822",
    initials: "MC",
    name: "Michael Chen",
    age: 45,
    gender: "Male",
    phone: "(555) 987-6543",
    lastVisit: "Oct 10, 2023",
    striped: true,
  },
  {
    id: "#PT-8823",
    initials: "ER",
    name: "Elena Rodriguez",
    age: 28,
    gender: "Female",
    phone: "(555) 456-7890",
    lastVisit: "Oct 09, 2023",
  },
  {
    id: "#PT-8824",
    initials: "DW",
    name: "David Wilson",
    age: 52,
    gender: "Male",
    phone: "(555) 222-3333",
    lastVisit: "Oct 08, 2023",
    striped: true,
  },
  {
    id: "#PT-8825",
    initials: "AO",
    name: "Amina Okafor",
    age: 41,
    gender: "Female",
    phone: "(555) 777-8888",
    lastVisit: "Oct 05, 2023",
  },
];

export default function PatientRecord() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background-light font-display text-slate-900">
      <div className="flex min-h-screen flex-col">
        {/* Top Navigation */}
        {/* <header className="sticky top-0 z-50 flex items-center justify-between border-b border-primary/10 bg-white px-8 py-4">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary p-2 text-white">
                <HeartPulse size={22} />
              </div>
              <h2 className="text-xl font-bold tracking-tight text-primary">
                Modern Wellness
              </h2>
            </div>

            <nav className="hidden items-center gap-6 lg:flex">
              <a
                href="#"
                className="text-sm font-semibold text-slate-500 transition-colors hover:text-primary"
              >
                Dashboard
              </a>
              <a
                href="#"
                className="border-b-2 border-primary pb-1 text-sm font-bold text-primary transition-colors"
              >
                Patients
              </a>
              <a
                href="#"
                className="text-sm font-semibold text-slate-500 transition-colors hover:text-primary"
              >
                Appointments
              </a>
              <a
                href="#"
                className="text-sm font-semibold text-slate-500 transition-colors hover:text-primary"
              >
                Billing
              </a>
              <a
                href="#"
                className="text-sm font-semibold text-slate-500 transition-colors hover:text-primary"
              >
                Staff
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative rounded-full p-2 transition-colors hover:bg-mint">
              <Bell size={20} className="text-slate-600" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-red-500" />
            </button>

            <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
              <div className="text-right">
                <p className="text-sm font-bold leading-none">Jane Cooper</p>
                <p className="mt-1 text-xs text-slate-500">Receptionist</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-primary/20 bg-mint">
                <img
                  alt="Profile"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDC-X3RuonmbbMfw7a06-R5_iwG1g289S3tQ5-fe83qraCH6CCGxrcUuFptJ3Hyv3XdH-2g4J5zm6Krqg4qRvLxzBOVLkIOu2J_NKLEES8fZGEGMqvcsk_D6Slzpmux-Vo6I-ZKu6kXAKyjZMe_1lZHIw2VBIcjlszl_3E3sDiYV0odDufytl5kRiwTZ2NuaJq0mf0SWCHBwSeqDxWZ4hxojaBMGJ0HptgEbnNgJ2i_mEsLQP6nPuSLolKVREaExJzS0pHUi7PNWGiy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </header> */}

        <main className="mx-auto w-full max-w-7xl px-8 py-8">
          {/* Header Section */}
          {/* <div className="mb-8">
            <h1 className="text-3xl font-black text-slate-900">
              Patient Directory
            </h1>
            <p className="mt-1 text-slate-500">
              Manage, register and search clinical patient records
            </p>
          </div> */}

          {/* Search Section */}
          <div className="mb-8 rounded-xl border border-primary/5 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-6">
              {/* <div className="relative flex-1">
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Search by Patient Name, ID, or Phone Number..."
                  className="w-full rounded-xl bg-background-light py-4 pl-12 pr-4 text-lg placeholder:text-slate-400 focus:ring-2 focus:ring-primary/50 border-none"
                />
              </div> */}

              {/* Filters Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 rounded-xl bg-background-light p-1">
                  <button className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all">
                    All Patients
                  </button>
                  <button className="rounded-lg px-5 py-2.5 text-sm font-semibold text-slate-600 transition-all hover:bg-mint">
                    Recent Visits
                  </button>
                  <button className="rounded-lg px-5 py-2.5 text-sm font-semibold text-slate-600 transition-all hover:bg-mint">
                    Active Patients
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50">
                    <span className="material-symbols-outlined text-xl">
                      filter_list
                    </span>
                    More Filters
                  </button>
                  <button
                    className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90"
                    onClick={() => navigate("/reception/register")}
                  >
                    <UserPlus size={18} />
                    Add New Patient
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="overflow-hidden rounded-xl border border-primary/5 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-primary/10 bg-mint/30">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-primary">
                      Patient ID
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-primary">
                      Name
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-primary">
                      Age
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-primary">
                      Gender
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-primary">
                      Phone
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-primary">
                      Last Visit
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-primary">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {patients.map((patient) => (
                    <tr
                      key={patient.id}
                      className={`group transition-colors hover:bg-mint/10 ${
                        patient.striped ? "bg-background-light/50" : ""
                      }`}
                    >
                      <td className="px-6 py-4 text-sm font-medium text-slate-500">
                        {patient.id}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                            {patient.initials}
                          </div>
                          <span className="text-sm font-bold text-slate-900">
                            {patient.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {patient.age}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {patient.gender}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {patient.phone}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {patient.lastVisit}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            className="rounded-lg p-2 text-primary transition-colors hover:bg-mint"
                            title="View Details"
                            type="button"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-mint hover:text-primary"
                            title="Edit Record"
                            type="button"
                          >
                            <Edit size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
              <p className="text-sm text-slate-500">
                Showing 1-5 of 1,248 patients
              </p>
              <div className="flex items-center gap-2">
                <button
                  className="rounded p-2 opacity-50"
                  disabled
                  type="button"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  className="flex h-8 w-8 items-center justify-center rounded bg-primary text-sm font-bold text-white"
                  type="button"
                >
                  1
                </button>
                <button
                  className="flex h-8 w-8 items-center justify-center rounded text-sm font-semibold hover:bg-slate-100"
                  type="button"
                >
                  2
                </button>
                <button
                  className="flex h-8 w-8 items-center justify-center rounded text-sm font-semibold hover:bg-slate-100"
                  type="button"
                >
                  3
                </button>
                <span className="px-1">...</span>
                <button
                  className="flex h-8 w-8 items-center justify-center rounded text-sm font-semibold hover:bg-slate-100"
                  type="button"
                >
                  25
                </button>
                <button
                  className="rounded p-2 hover:bg-slate-100"
                  type="button"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
