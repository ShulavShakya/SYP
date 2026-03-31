import React, { useState, useEffect } from "react";
import { privateAPI } from "../../../auth/config/api";
import {
  Download,
  CreditCard,
  Wallet,
  CheckCircle2,
  Clock3,
  AlertCircle,
  Search,
  Filter,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
  }).format((amount || 0) / 100);
};

const getInitials = (name) => {
  if (!name) return "??";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};

const getStatusStyles = (status) => {
  switch (status) {
    case "COMPLETED":
      return {
        bg: "bg-emerald-100 text-emerald-700",
        dot: "bg-emerald-600",
        label: "Paid",
      };
    case "PENDING":
      return {
        bg: "bg-orange-100 text-orange-700",
        dot: "bg-orange-600",
        label: "Pending",
      };
    case "FAILED":
      return {
        bg: "bg-red-100 text-red-700",
        dot: "bg-red-600",
        label: "Failed",
      };
    default:
      return {
        bg: "bg-slate-100 text-slate-600",
        dot: "bg-slate-500",
        label: status,
      };
  }
};

export default function BillingManagement() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);

      const response = await privateAPI.get(
        "/admin/billing/get_all_payments/",
        {},
      );
      console.log(response.data);
      setPayments(response.data.data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    totalRevenue: payments
      .filter((p) => p.status === "COMPLETED")
      .reduce((acc, curr) => acc + curr.amount, 0),
    paidCount: payments.filter((p) => p.status === "COMPLETED").length,
    pendingAmount: payments
      .filter((p) => p.status === "PENDING")
      .reduce((acc, curr) => acc + curr.amount, 0),
    failedCount: payments.filter((p) => p.status === "FAILED").length,
  };

  const summaryCards = [
    {
      label: "Total Revenue",
      value: formatCurrency(stats.totalRevenue),
      accentClassName: "bg-teal-100",
      icon: Wallet,
      iconClassName: "bg-teal-50 text-teal-700",
    },
    {
      label: "Paid Invoices",
      value: stats.paidCount.toString(),
      accentClassName: "bg-emerald-100",
      icon: CheckCircle2,
      iconClassName: "bg-emerald-50 text-emerald-700",
    },
    {
      label: "Pending Payments",
      value: formatCurrency(stats.pendingAmount),
      subtext: `${payments.filter((p) => p.status === "PENDING").length} items`,
      accentClassName: "bg-orange-100",
      icon: Clock3,
      iconClassName: "bg-orange-50 text-orange-700",
    },
    {
      label: "Failed Payments",
      value: stats.failedCount.toString(),
      pill: stats.failedCount > 0 ? "Needs Attention" : null,
      pillClassName: "bg-red-100 text-red-700",
      accentClassName: "bg-red-100",
      icon: AlertCircle,
      iconClassName: "bg-red-50 text-red-700",
    },
  ];

  const filteredPayments = payments.filter(
    (p) =>
      p.patient?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.pidx.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="w-full bg-[#f7fafa] px-4 py-6 text-slate-900 sm:px-6 lg:px-8 xl:px-10">
      <div className="mx-auto w-full max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="space-y-1">
            <h2 className="font-['Manrope',sans-serif] text-3xl font-extrabold tracking-tight text-slate-900">
              Billing & Revenue
            </h2>
            <p className="font-medium text-slate-500">
              Manage and track all financial transactions.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-xl bg-slate-200 px-5 py-2.5 font-semibold text-slate-800 transition-all hover:bg-slate-300">
              <Download size={18} /> Export
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {summaryCards.map((card) => (
            <SummaryCard key={card.label} {...card} />
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 rounded-2xl bg-slate-100 p-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search by Patient Name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border-none bg-white py-3 pl-11 pr-4 text-sm shadow-sm outline-none focus:ring-2 focus:ring-teal-700/20"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-[0px_4px_20px_rgba(0,101,101,0.05)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] border-collapse text-left">
              <thead>
                <tr className="bg-slate-100/70">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                    ID (PIDX)
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                    Patient
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                    Service/Appt ID
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                    Method
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                    Date
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
                {loading ? (
                  <tr>
                    <td
                      colSpan="8"
                      className="py-10 text-center text-slate-500"
                    >
                      Loading payments...
                    </td>
                  </tr>
                ) : (
                  filteredPayments.map((payment) => (
                    <InvoiceRow key={payment.id} payment={payment} />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-components
function SummaryCard({
  label,
  value,
  subtext,
  pill,
  pillClassName,
  accentClassName,
  icon: Icon,
  iconClassName,
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <div
        className={`absolute right-0 top-0 h-24 w-24 rounded-bl-full opacity-60 ${accentClassName}`}
      />
      <div className="mb-4 flex items-start justify-between">
        <div className={`rounded-xl p-2.5 ${iconClassName}`}>
          <Icon size={18} />
        </div>
      </div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
        {label}
      </p>
      <div className="flex items-baseline gap-2">
        <h3 className="text-2xl font-extrabold text-slate-900">{value}</h3>
        {subtext && (
          <span className="text-xs font-medium text-slate-400">{subtext}</span>
        )}
        {pill && (
          <span
            className={`ml-2 rounded-full px-2 py-0.5 text-[10px] font-bold ${pillClassName}`}
          >
            {pill}
          </span>
        )}
      </div>
    </div>
  );
}

function InvoiceRow({ payment }) {
  const styles = getStatusStyles(payment.status);

  return (
    <tr className="group transition-colors hover:bg-slate-50/70">
      <td className="px-6 py-5 font-bold text-teal-700 text-xs">
        {payment.pidx.substring(0, 12)}...
      </td>
      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 text-teal-700 text-xs font-bold">
            {getInitials(payment.patient_name)}
          </div>
          <span className="font-medium text-slate-900">
            {payment.patient_name || "Unknown"}
          </span>
        </div>
      </td>
      <td className="px-6 py-5 text-slate-600">
        Appt #{payment.appointment?.id}
      </td>
      <td className="px-6 py-5 font-bold text-slate-900">
        {formatCurrency(payment.amount)}
      </td>
      <td className="px-6 py-5">
        <div className="flex items-center gap-2">
          <CreditCard size={16} className="text-slate-400" />
          <span>{payment.payment_method}</span>
        </div>
      </td>
      <td className="px-6 py-5 text-slate-600">
        {new Date(payment.created_at).toLocaleDateString()}
      </td>
      <td className="px-6 py-5">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${styles.bg}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
          {styles.label}
        </span>
      </td>
      <td className="px-6 py-5 text-right">
        <div className="flex justify-end gap-2">
          <button className="rounded-lg p-2 text-teal-700 hover:bg-teal-50">
            <Eye size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}
