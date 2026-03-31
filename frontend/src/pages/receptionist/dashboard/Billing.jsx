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
  Eye,
} from "lucide-react";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
  }).format((amount || 0) / 100);

const getInitials = (name) =>
  name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)
    : "??";

const getStatusStyles = (status) => {
  switch (status) {
    case "COMPLETED":
    case "PAID":
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
    case "UNPAID":
      return {
        bg: "bg-red-100 text-red-700",
        dot: "bg-red-600",
        label: "Unpaid",
      };
    default:
      return {
        bg: "bg-slate-100 text-slate-600",
        dot: "bg-slate-500",
        label: status || "Unknown",
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
      const response = await privateAPI.get("/admin/billing/get_all_payments/");
      setPayments(response.data.data || []);
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Stats
  const stats = {
    totalRevenue: payments
      .filter((p) => ["COMPLETED", "PAID"].includes(p.status))
      .reduce((acc, curr) => acc + (curr.amount || 0), 0),

    paidCount: payments.filter((p) => ["COMPLETED", "PAID"].includes(p.status))
      .length,

    pendingAmount: payments
      .filter((p) => p.status === "PENDING")
      .reduce((acc, curr) => acc + (curr.amount || 0), 0),

    failedCount: payments.filter((p) => ["FAILED", "UNPAID"].includes(p.status))
      .length,
  };

  // const summaryCards = [
  //   {
  //     label: "Total Revenue",
  //     value: formatCurrency(stats.totalRevenue),
  //     accentClassName: "bg-teal-100",
  //     icon: Wallet,
  //     iconClassName: "bg-teal-50 text-teal-700",
  //   },
  //   {
  //     label: "Paid Invoices",
  //     value: stats.paidCount.toString(),
  //     accentClassName: "bg-emerald-100",
  //     icon: CheckCircle2,
  //     iconClassName: "bg-emerald-50 text-emerald-700",
  //   },
  //   {
  //     label: "Pending Payments",
  //     value: formatCurrency(stats.pendingAmount),
  //     subtext: `${payments.filter((p) => p.status === "PENDING").length} items`,
  //     accentClassName: "bg-orange-100",
  //     icon: Clock3,
  //     iconClassName: "bg-orange-50 text-orange-700",
  //   },
  //   {
  //     label: "Unpaid / Failed",
  //     value: stats.failedCount.toString(),
  //     pill: stats.failedCount > 0 ? "Needs Attention" : null,
  //     pillClassName: "bg-red-100 text-red-700",
  //     accentClassName: "bg-red-100",
  //     icon: AlertCircle,
  //     iconClassName: "bg-red-50 text-red-700",
  //   },
  // ];

  const filteredPayments = payments.filter((p) => {
    const name = p.patient_name || p.patient?.full_name || "";
    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.pidx?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="w-full bg-[#f7fafa] px-4 py-6 text-slate-900 sm:px-6 lg:px-8 xl:px-10">
      <div className="mx-auto w-full max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="text-3xl font-extrabold">Billing & Revenue</h2>
            <p className="text-slate-500">
              Manage and track all financial transactions.
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-xl bg-slate-200 px-5 py-2.5 font-semibold hover:bg-slate-300">
            <Download size={18} /> Export
          </button>
        </div>

        {/* Summary
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {summaryCards.map((card) => (
            <SummaryCard key={card.label} {...card} />
          ))}
        </div> */}

        {/* Search */}
        <div className="rounded-2xl bg-slate-100 p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Patient or PIDX..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl bg-white py-3 pl-10 pr-4 shadow-sm outline-none focus:ring-2 focus:ring-teal-700/20"
            />
          </div>
        </div>
        {/* Table */}
        <div className="overflow-hidden rounded-2xl bg-white shadow">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead>
                <tr className="bg-slate-100">
                  <th className="px-6 py-4 text-xs text-slate-500">PIDX</th>
                  <th className="px-6 py-4 text-xs text-slate-500">Patient</th>
                  <th className="px-6 py-4 text-xs text-slate-500">
                    Appointment
                  </th>
                  <th className="px-6 py-4 text-xs text-slate-500">Amount</th>
                  <th className="px-6 py-4 text-xs text-slate-500">Method</th>
                  <th className="px-6 py-4 text-xs text-slate-500">Date</th>
                  <th className="px-6 py-4 text-xs text-slate-500">Status</th>
                  <th className="px-6 py-4 text-xs text-right text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan="8" className="py-10 text-center">
                      Loading payments...
                    </td>
                  </tr>
                ) : filteredPayments.length === 0 ? (
                  <tr>
                    <td
                      colSpan="8"
                      className="py-10 text-center text-slate-500"
                    >
                      No payments found
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

// Components
// function SummaryCard({
//   label,
//   value,
//   subtext,
//   pill,
//   pillClassName,
//   accentClassName,
//   icon: Icon,
//   iconClassName,
// }) {
//   return (
//     <div className="relative rounded-2xl border bg-white p-6 shadow-sm">
//       <div
//         className={`absolute top-0 right-0 h-24 w-24 rounded-bl-full ${accentClassName}`}
//       />
//       <div className={`mb-4 inline-block rounded-xl p-2 ${iconClassName}`}>
//         <Icon size={18} />
//       </div>
//       <p className="text-xs text-slate-500">{label}</p>
//       <h3 className="text-2xl font-bold">{value}</h3>
//       {subtext && <p className="text-xs text-slate-400">{subtext}</p>}
//       {pill && <span className={`text-xs ${pillClassName}`}>{pill}</span>}
//     </div>
//   );
// }

function InvoiceRow({ payment }) {
  const styles = getStatusStyles(payment.status);

  const patientName =
    payment.patient_name || payment.patient?.full_name || "Unknown";

  return (
    <tr className="hover:bg-slate-50">
      <td className="px-6 py-4 text-teal-700 font-bold text-xs">
        {payment.pidx || "-"}
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 flex items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-700">
            {getInitials(patientName)}
          </div>
          {patientName}
        </div>
      </td>

      <td className="px-6 py-4">#{payment.appointment?.id || "-"}</td>

      <td className="px-6 py-4 font-bold">{formatCurrency(payment.amount)}</td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <CreditCard size={16} />
          {payment.payment_method || "N/A"}
        </div>
      </td>

      <td className="px-6 py-4">
        {payment.created_at
          ? new Date(payment.created_at).toLocaleDateString()
          : "-"}
      </td>

      <td className="px-6 py-4">
        <span className={`px-3 py-1 text-xs rounded-full ${styles.bg}`}>
          <span
            className={`inline-block w-2 h-2 mr-1 rounded-full ${styles.dot}`}
          />
          {styles.label}
        </span>
      </td>

      <td className="px-6 py-4 text-right">
        <button className="p-2 hover:bg-teal-50 rounded-lg text-teal-700">
          <Eye size={18} />
        </button>
      </td>
    </tr>
  );
}
