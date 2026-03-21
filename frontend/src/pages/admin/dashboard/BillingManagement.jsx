import React from "react";
import {
  Download,
  CreditCard,
  Wallet,
  CheckCircle2,
  Clock3,
  RotateCcw,
  Search,
  Filter,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const summaryCards = [
  {
    label: "Total Revenue",
    value: "$1,248,000",
    valueClassName: "text-slate-900",
    badge: "+12%",
    badgeClassName: "text-teal-600",
    accentClassName: "bg-teal-100",
    icon: Wallet,
    iconClassName: "bg-teal-50 text-teal-700",
  },
  {
    label: "Paid Invoices",
    value: "8,420",
    valueClassName: "text-slate-900",
    accentClassName: "bg-emerald-100",
    icon: CheckCircle2,
    iconClassName: "bg-emerald-50 text-emerald-700",
  },
  {
    label: "Pending Payments",
    value: "$42,500",
    valueClassName: "text-slate-900",
    subtext: "124 items",
    accentClassName: "bg-orange-100",
    icon: Clock3,
    iconClassName: "bg-orange-50 text-orange-700",
  },
  {
    label: "Refund Requests",
    value: "12",
    valueClassName: "text-slate-900",
    pill: "Needs Attention",
    pillClassName: "bg-red-100 text-red-700",
    accentClassName: "bg-red-100",
    icon: RotateCcw,
    iconClassName: "bg-red-50 text-red-700",
  },
];

const invoices = [
  {
    id: "#INV-001",
    patient: "Jane Doe",
    patientInitials: "JD",
    patientClassName: "bg-emerald-100 text-emerald-700",
    service: "Surgery",
    amount: "$12,400.00",
    paymentMethod: "Visa",
    paymentIcon: CreditCard,
    billingDate: "Oct 24, 2023",
    status: "Paid",
    statusClassName: "bg-emerald-100 text-emerald-700",
    dotClassName: "bg-emerald-600",
  },
  {
    id: "#INV-002",
    patient: "Robert Smith",
    patientInitials: "RS",
    patientClassName: "bg-teal-100 text-teal-700",
    service: "Consultation",
    amount: "$250.00",
    paymentMethod: "Cash",
    paymentIcon: Wallet,
    billingDate: "Oct 24, 2023",
    status: "Pending",
    statusClassName: "bg-orange-100 text-orange-700",
    dotClassName: "bg-orange-600",
  },
  {
    id: "#INV-003",
    patient: "Alice Wong",
    patientInitials: "AW",
    patientClassName: "bg-red-100 text-red-700",
    service: "Lab Test",
    amount: "$1,100.00",
    paymentMethod: "Mastercard",
    paymentIcon: CreditCard,
    billingDate: "Oct 23, 2023",
    status: "Failed",
    statusClassName: "bg-red-100 text-red-700",
    dotClassName: "bg-red-600",
  },
  {
    id: "#INV-004",
    patient: "Mark Klein",
    patientInitials: "MK",
    patientClassName: "bg-slate-200 text-slate-600",
    service: "Consultation",
    amount: "$350.00",
    paymentMethod: "Visa",
    paymentIcon: CreditCard,
    billingDate: "Oct 22, 2023",
    status: "Refunded",
    statusClassName: "bg-slate-200 text-slate-600",
    dotClassName: "bg-slate-500",
  },
];

function SummaryCard({
  label,
  value,
  valueClassName = "text-slate-900",
  badge,
  badgeClassName = "text-teal-600",
  subtext,
  pill,
  pillClassName = "bg-teal-50 text-teal-700",
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

      <div className="flex items-baseline gap-2">
        <h3
          className={`font-['Manrope',sans-serif] text-3xl font-extrabold ${valueClassName}`}
        >
          {value}
        </h3>

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

function InvoiceRow({
  id,
  patient,
  patientInitials,
  patientClassName,
  service,
  amount,
  paymentMethod,
  paymentIcon: PaymentIcon,
  billingDate,
  status,
  statusClassName,
  dotClassName,
}) {
  return (
    <tr className="group transition-colors hover:bg-slate-50/70">
      <td className="px-6 py-5 font-bold text-teal-700">{id}</td>

      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${patientClassName}`}
          >
            {patientInitials}
          </div>
          <span className="font-medium text-slate-900">{patient}</span>
        </div>
      </td>

      <td className="px-6 py-5 text-slate-600">{service}</td>

      <td className="px-6 py-5 font-bold text-slate-900">{amount}</td>

      <td className="px-6 py-5">
        <div className="flex items-center gap-2">
          <PaymentIcon size={16} className="text-slate-400" />
          <span>{paymentMethod}</span>
        </div>
      </td>

      <td className="px-6 py-5 text-slate-600">{billingDate}</td>

      <td className="px-6 py-5">
        <span
          className={`inline-flex w-fit items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${statusClassName}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${dotClassName}`} />
          {status}
        </span>
      </td>

      <td className="px-6 py-5 text-right">
        <div className="flex justify-end gap-2">
          <button className="rounded-lg p-2 text-teal-700 transition-all hover:bg-teal-50">
            <Eye size={18} />
          </button>
          <button className="rounded-lg p-2 text-teal-700 transition-all hover:bg-teal-50">
            <Download size={18} />
          </button>
          <button className="rounded-lg p-2 text-red-600 transition-all hover:bg-red-50">
            <RotateCcw size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default function BillingManagement() {
  return (
    <div className="w-full bg-[#f7fafa] px-4 py-6 text-slate-900 sm:px-6 lg:px-8 xl:px-10">
      <div className="mx-auto w-full max-w-7xl space-y-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="space-y-1">
            <h2 className="font-['Manrope',sans-serif] text-3xl font-extrabold tracking-tight text-slate-900">
              Billing &amp; Revenue
            </h2>
            <p className="font-medium text-slate-500">
              Manage and track all financial transactions and invoices.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-xl bg-slate-200 px-5 py-2.5 font-semibold text-slate-800 transition-all hover:bg-slate-300">
              <Download size={18} />
              Export Report
            </button>
            <button className="flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-2.5 font-semibold text-white shadow-md shadow-teal-700/20 transition-all hover:brightness-110">
              <CreditCard size={18} />
              Process Payment
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {summaryCards.map((card) => (
            <SummaryCard key={card.label} {...card} />
          ))}
        </div>

        <div className="flex flex-col gap-4 rounded-2xl bg-slate-100 p-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search by Invoice ID, Patient Name..."
              className="w-full rounded-xl border-none bg-white py-3 pl-11 pr-4 text-sm shadow-sm outline-none transition-all focus:ring-2 focus:ring-teal-700/20"
            />
          </div>

          <div className="flex w-full flex-wrap items-center gap-3 lg:w-auto">
            <select className="min-w-[140px] rounded-xl border-none bg-white px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-teal-700/20">
              <option>Status: All</option>
              <option>Paid</option>
              <option>Pending</option>
              <option>Failed</option>
              <option>Refunded</option>
            </select>

            <select className="min-w-[140px] rounded-xl border-none bg-white px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-teal-700/20">
              <option>Date: Last 30 Days</option>
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
              <option>Custom Range</option>
            </select>

            <select className="min-w-[160px] rounded-xl border-none bg-white px-4 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-teal-700/20">
              <option>Method: All</option>
              <option>Visa</option>
              <option>Mastercard</option>
              <option>Cash</option>
            </select>

            <button className="rounded-xl bg-white p-3 text-teal-700 shadow-sm transition-colors hover:bg-teal-50">
              <Filter size={18} />
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-[0px_4px_20px_rgba(0,101,101,0.05)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] border-collapse text-left">
              <thead>
                <tr className="bg-slate-100/70">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                    Invoice ID
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                    Patient Name
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                    Service
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                    Payment Method
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                    Billing Date
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-widest text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {invoices.map((invoice) => (
                  <InvoiceRow key={invoice.id} {...invoice} />
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between bg-slate-50/80 p-6">
            <p className="text-sm text-slate-500">
              Showing 1 to 4 of 8,420 invoices
            </p>

            <div className="flex items-center gap-2">
              <button className="rounded-lg border border-slate-200 bg-white p-2 text-slate-400 cursor-not-allowed">
                <ChevronLeft size={18} />
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-700 text-sm font-bold text-white">
                1
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium text-slate-900 transition-all hover:bg-white">
                2
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium text-slate-900 transition-all hover:bg-white">
                3
              </button>
              <span className="text-slate-400">...</span>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium text-slate-900 transition-all hover:bg-white">
                2105
              </button>
              <button className="rounded-lg border border-slate-200 bg-white p-2 text-slate-900 transition-all hover:bg-teal-50">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
