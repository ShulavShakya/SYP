import React from "react";
import {
  Search,
  Bell,
  HelpCircle,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
  Plus,
  TrendingUp,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock3,
  Eye,
  MoreVertical,
} from "lucide-react";

const summaryCards = [
  {
    title: "Pending Requests",
    value: "18",
    badge: "+12% vs last week",
    icon: Clock3,
    iconWrap: "bg-teal-100 text-teal-700",
    accentClassName: "bg-teal-100",
    badgeClassName: "text-teal-600",
  },
  {
    title: "Approved Today",
    value: "42",
    icon: CheckCircle2,
    iconWrap: "bg-emerald-100 text-emerald-700",
    accentClassName: "bg-emerald-100",
  },
  {
    title: "Rejected Today",
    value: "5",
    icon: XCircle,
    iconWrap: "bg-red-100 text-red-700",
    accentClassName: "bg-red-100",
  },
  {
    title: "Urgent Items",
    value: "3",
    icon: AlertTriangle,
    iconWrap: "bg-amber-100 text-amber-700",
    accentClassName: "bg-amber-100",
    dot: true,
  },
];

const filters = [
  "All",
  "Doctor Requests",
  "Receptionist Requests",
  "Billing Adjustments",
  "Prescription Reviews",
  "Schedule Changes",
];

const approvals = [
  {
    id: "#REQ-101",
    type: "Leave Request",
    submittedBy: "Dr. James Wilson",
    department: "Cardiology",
    date: "Oct 24, 2023",
    priority: "High",
    status: "Pending",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBGZ5yzaBzG59_ymM3tJ60jK4Kmac9U_859UJKBDNPUwzAzp2u2kG9bmeuDxoZYGwuhKlLY60CDgexRBeJ1RYNI9EKf176rcZYTMQ0OmH6N3BflAGWRxHTOIeQ690OVBCHEzRcqvf0mOjTNe3MRc4cQt8X392_28WMJCtndtJ1xcsEbPdXVXXTHZhzVdWcenKKuySfQ-EON_zZbyTfBZ37KbVz1cNJVsLC2k3zUqYIUFVYhdN0574JY--SSlgThnAhMcx67vTQHS_p1",
    avatarAlt: "Portrait of Dr. James Wilson",
  },
  {
    id: "#REQ-102",
    type: "Budget Approval",
    submittedBy: "Elena Martinez",
    department: "Operations",
    date: "Oct 24, 2023",
    priority: "Medium",
    status: "Approved",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAVxhkunA1NrUI0vtiC1jS7eyLV4BNDuDgI1-B3XVD74jrif9Xl8pBgwqz8wmZSZ0ye2FPv4gu6NSNmoIW3bYmyeAS3qO1QOVOL2Yxx1nLXWL0q_RoiMVdkSrwNl-dbG4CpupISKf3Qm96ShVSHtLIifagZc0IKzrpFPeTrYDypMkIq-mv0gUR1GmKaVvcFSpT12VUgL04f7KFXnCFOnSfkXFKXmvK4FlM3plw7pgK9Rqt7rJpvgrFHWaJOVPR16yFyCcS9OquKF1pP",
    avatarAlt: "Portrait of Elena Martinez",
  },
  {
    id: "#REQ-103",
    type: "Prescription Review",
    submittedBy: "Dr. Robert Glass",
    department: "Pharmacy",
    date: "Oct 23, 2023",
    priority: "Low",
    status: "Pending",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDNBsPAfwlmupcQuevJypEs0cuZrXPQ8CpPuugLtQ5Ml1lRFNl7DAMCGOEN5jvZII7QCmZwNsVLb-UmcjI0XEyp7riGkSXiUlNI9HtD1dIn3kiWmo6WjrR_VIM1duQFtssBNdsmOcsaxzeYFBRpApG0JJwMi-0uAXjNC0FhNjV3Hgs4huoITanKSvJNt22nmXfjlc6bABkgp1bEnSikN6i8Bj-1t7cOnY_8H4a31lLJB3IZpZARqwZgBn_T82poUvuYMMjRVQUbqc4R",
    avatarAlt: "Portrait of Dr. Robert Glass",
  },
  {
    id: "#REQ-104",
    type: "Schedule Change",
    submittedBy: "Sarah Miller",
    department: "Reception",
    date: "Oct 23, 2023",
    priority: "Medium",
    status: "Rejected",
    initials: "SM",
  },
];

function SummaryCard({
  title,
  value,
  badge,
  icon: Icon,
  iconWrap,
  accentClassName,
  badgeClassName = "text-teal-600",
  dot,
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white p-6 shadow-[0_4px_20px_rgba(0,101,101,0.03)] transition-all hover:shadow-md">
      <div
        className={`absolute right-0 top-0 h-24 w-24 rounded-bl-full opacity-60 transition-transform group-hover:scale-110 ${accentClassName}`}
      />

      <div className="mb-4 flex items-center justify-between">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconWrap}`}
        >
          <Icon size={22} />
        </div>

        {badge && (
          <span
            className={`flex items-center text-xs font-bold ${badgeClassName}`}
          >
            <TrendingUp size={12} className="mr-1" />
            {badge}
          </span>
        )}

        {dot && (
          <div className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
        )}
      </div>

      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
        {title}
      </p>
      <h3 className="font-['Manrope',sans-serif] text-3xl font-extrabold text-slate-900">
        {value}
      </h3>
    </div>
  );
}

function getPriorityBadge(priority) {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-700";
    case "Medium":
      return "bg-amber-100 text-amber-700";
    case "Low":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-slate-100 text-slate-600";
  }
}

function getStatusBadge(status) {
  switch (status) {
    case "Pending":
      return {
        wrap: "bg-amber-100 text-amber-700",
        dot: "bg-amber-500",
      };
    case "Approved":
      return {
        wrap: "bg-emerald-100 text-emerald-700",
        dot: "bg-emerald-600",
      };
    case "Rejected":
      return {
        wrap: "bg-red-100 text-red-700",
        dot: "bg-red-600",
      };
    default:
      return {
        wrap: "bg-slate-100 text-slate-600",
        dot: "bg-slate-500",
      };
  }
}

function ApprovalRow(item) {
  const statusStyle = getStatusBadge(item.status);

  return (
    <tr key={item.id} className="transition-colors hover:bg-slate-50/70">
      <td className="px-6 py-5">
        <span className="font-mono text-sm font-bold text-teal-700">
          {item.id}
        </span>
      </td>

      <td className="px-6 py-5">
        <p className="text-sm font-semibold text-slate-900">{item.type}</p>
      </td>

      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          {item.avatar ? (
            <img
              src={item.avatar}
              alt={item.avatarAlt}
              className="h-10 w-10 rounded-xl object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-200 text-sm font-bold text-slate-600">
              {item.initials}
            </div>
          )}

          <div>
            <p className="text-sm font-bold text-slate-900">
              {item.submittedBy}
            </p>
            <p className="text-xs text-slate-400">{item.department}</p>
          </div>
        </div>
      </td>

      <td className="px-6 py-5 text-sm font-medium text-slate-600">
        {item.date}
      </td>

      <td className="px-6 py-5">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${getPriorityBadge(
            item.priority,
          )}`}
        >
          {item.priority}
        </span>
      </td>

      <td className="px-6 py-5">
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${statusStyle.wrap}`}
        >
          <span
            className={`mr-2 h-1.5 w-1.5 rounded-full ${statusStyle.dot}`}
          />
          {item.status}
        </span>
      </td>

      <td className="px-6 py-5 text-right">
        <div className="flex items-center justify-end gap-2">
          <button className="rounded-lg p-2 text-teal-700 transition-colors hover:bg-teal-50">
            <Eye size={18} />
          </button>

          {item.status === "Pending" ? (
            <>
              <button className="rounded-xl bg-teal-700 px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-teal-800">
                Approve
              </button>
              <button className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-200">
                Reject
              </button>
            </>
          ) : (
            <button className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100">
              <MoreVertical size={18} />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

export default function ApprovalManagement() {
  return (
    <div className="min-h-screen bg-[#f7fafa] text-slate-900">
      {/* <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8 xl:px-10">


          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search approvals..."
                className="w-64 rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
              />
            </div>

            <button className="rounded-xl bg-slate-100 p-2.5 text-slate-600 transition-colors hover:bg-slate-200">
              <Bell size={18} />
            </button>

            <button className="rounded-xl bg-slate-100 p-2.5 text-slate-600 transition-colors hover:bg-slate-200">
              <HelpCircle size={18} />
            </button>

            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuqvMCZFjobgtxkx4OOufJQbHVgKc8KmDt3zKUYBJ3kQwn-XuMz4BE9sNeQM8jh7BN7SN-_4WP9J4F-V1F2GmER7zwKxWJfFSyIONPBK7rknPIBxg9KF2S5vXEueo3-sd3dCdkl0xfqK_iXKvVHrxvcyd-CretjF-ftOzTvq1qUZabMQMbmZRuQWNqXWvzDgSHbYjWEPDw2wVnc3hyoZ2yA9xqImzGh-7RdPRk6ShiY21Om_DxQXTArU1-gpAytLAupp5X9pM5xMgl"
              alt="Admin Avatar"
              className="h-9 w-9 rounded-xl object-cover"
            />
          </div>
        </div>
      </header> */}
      <div className="flex flex-col px-4 py-4 sm:px-6 lg:px-8 xl:px-10">
        <h2 className="font-['Manrope',sans-serif] text-2xl font-extrabold tracking-tight text-slate-900">
          Approval Management
        </h2>
        <p className="mt-1 text-sm font-medium text-slate-500">
          Review and process clinical and administrative requests with surgical
          precision.
        </p>
      </div>

      <main className="w-full px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
        {/* <div>
          <h2 className="font-['Manrope',sans-serif] text-2xl font-extrabold tracking-tight text-slate-900">
            Approval Management
          </h2>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Review and process clinical and administrative requests with
            surgical precision.
          </p>
        </div> */}
        {/* <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="font-['Manrope',sans-serif] text-3xl font-extrabold tracking-tight text-slate-900">
              Approval Queue
            </h1>
            <p className="mt-1 font-medium text-slate-500">
              Track requests, review statuses, and act on urgent items faster.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button className="flex items-center gap-2 rounded-xl bg-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-300">
              <Filter size={18} />
              Filters
            </button>
            <button className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-teal-700 to-cyan-700 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-teal-700/20 transition-all hover:brightness-110">
              <Download size={18} />
              Export
            </button>
          </div>
        </div> */}

        <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {summaryCards.map((card) => (
            <SummaryCard key={card.title} {...card} />
          ))}
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-3 rounded-2xl bg-slate-100 p-4">
          {filters.map((filter, index) => (
            <button
              key={filter}
              className={
                index === 0
                  ? "rounded-full bg-teal-700 px-5 py-2 text-sm font-bold text-white shadow-sm"
                  : "rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-600 ring-1 ring-slate-200 transition hover:bg-slate-50"
              }
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow-[0px_8px_32px_rgba(0,101,101,0.04)] ring-1 ring-slate-200/60">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
            <h3 className="font-['Manrope',sans-serif] text-xl font-bold text-slate-900">
              Queue Overview
            </h3>

            <div className="flex items-center gap-2">
              <button className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-teal-700">
                <Filter size={18} />
              </button>
              <button className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-teal-700">
                <Download size={18} />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] border-collapse text-left">
              <thead>
                <tr className="bg-slate-100/70">
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">
                    Request ID
                  </th>
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">
                    Type
                  </th>
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">
                    Submitted By
                  </th>
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">
                    Date
                  </th>
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">
                    Priority
                  </th>
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">
                    Status
                  </th>
                  <th className="px-6 py-5 text-right text-xs font-bold uppercase tracking-widest text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {approvals.map((item) => ApprovalRow(item))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between bg-slate-50 px-6 py-5">
            <p className="text-sm font-medium text-slate-500">
              Showing 1-4 of 18 pending requests
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
      </main>

      <button className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-teal-700 text-white shadow-2xl transition hover:bg-teal-800 md:hidden">
        <Plus size={22} />
      </button>
    </div>
  );
}
