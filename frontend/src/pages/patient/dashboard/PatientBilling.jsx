import React, { useState, useEffect } from "react";
import { privateAPI } from "../../../auth/config/api";
import {
  CreditCard,
  Wallet,
  ReceiptText,
  Filter,
  Download,
  Stethoscope,
  ArrowDownToLine,
} from "lucide-react";

// Helper: Format amount from paisa to currency string
const formatCurrency = (paisa) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NPR", // or USD based on your preference
  }).format(paisa / 100);
};

// Helper: Map backend status to your design classes
const getStatusStyles = (status) => {
  switch (status?.toUpperCase()) {
    case "COMPLETED":
      return {
        label: "Paid",
        class: "bg-teal-50 text-teal-600",
        action: "download",
      };
    case "PENDING":
      return {
        label: "Pending",
        class: "bg-amber-100 text-amber-600",
        action: "pay",
      };
    case "FAILED":
      return {
        label: "Failed",
        class: "bg-red-100 text-red-500",
        action: "pay",
      };
    default:
      return {
        label: status,
        class: "bg-gray-100 text-gray-600",
        action: "none",
      };
  }
};

export default function BillingPaymentsContent() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await privateAPI.get("/patient/payment/amount/", {});
        setPayments(response.data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  // --- Dynamic Calculations for Summary Cards ---
  const totalAmount = payments.reduce((acc, curr) => acc + curr.amount, 0);
  const paidAmount = payments
    .filter((p) => p.status === "COMPLETED")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const pendingAmount = payments
    .filter((p) => p.status === "PENDING")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const summaryCards = [
    {
      title: "Total Amount",
      value: formatCurrency(totalAmount),
      meta: "Lifetime billing",
      metaClass: "text-teal-600",
      icon: CreditCard,
      iconWrapClass: "bg-slate-100",
      iconClass: "text-teal-700",
    },
    {
      title: "Paid Amount",
      value: formatCurrency(paidAmount),
      meta: `${payments.length > 0 ? Math.round((paidAmount / totalAmount) * 100) : 0}% of total billed`,
      metaClass: "text-emerald-500",
      icon: Wallet,
      iconWrapClass: "bg-slate-100",
      iconClass: "text-mint",
    },
    {
      title: "Pending Balance",
      value: formatCurrency(pendingAmount),
      meta: `${payments.filter((p) => p.status === "PENDING").length} payments pending`,
      metaClass: "text-red-500",
      icon: ReceiptText,
      iconWrapClass: "bg-red-50",
      iconClass: "text-red-500",
    },
  ];

  return (
    <main className="min-h-screen px-8 py-7 text-textMain">
      <div className="mx-auto max-w-7xl">
        {/* Summary Section */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {summaryCards.map((card) => (
            <SummaryCard key={card.title} {...card} />
          ))}
        </section>

        {/* Billing History Section */}
        <section className="mt-8 rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-7 py-5">
            <h2 className="text-[18px] font-bold tracking-tight text-textMain">
              Billing History
            </h2>
            <div className="flex items-center gap-3">
              <button className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-gray-200 text-textSecondary transition hover:bg-background">
                <Filter size={20} />
              </button>
              <button className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-gray-200 text-textSecondary transition hover:bg-background">
                <Download size={20} />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-7 py-5 text-left text-sm font-bold uppercase tracking-wide text-textSecondary">
                    Service
                  </th>
                  <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wide text-textSecondary">
                    Date
                  </th>
                  <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wide text-textSecondary">
                    Amount
                  </th>
                  <th className="px-6 py-5 text-left text-sm font-bold uppercase tracking-wide text-textSecondary">
                    Status
                  </th>
                  <th className="px-7 py-5 text-right text-sm font-bold uppercase tracking-wide text-textSecondary">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="py-10 text-center text-textSecondary"
                    >
                      Loading billing data...
                    </td>
                  </tr>
                ) : payments.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="py-10 text-center text-textSecondary"
                    >
                      No billing records found.
                    </td>
                  </tr>
                ) : (
                  payments.map((payment) => {
                    const statusInfo = getStatusStyles(payment.status);
                    const formattedDate = new Date(
                      payment.created_at,
                    ).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    });

                    return (
                      <tr key={payment.id} className="border-t border-gray-100">
                        <td className="px-7 py-4">
                          <div className="flex items-center gap-4">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
                              <Stethoscope
                                className="text-teal-700"
                                size={22}
                              />
                            </div>
                            <span className="text-[16px] font-semibold text-textMain">
                              Appointment #{payment.appointment_id}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-[15px] text-textSecondary">
                          {formattedDate}
                        </td>

                        <td className="px-6 py-4 text-[16px] font-semibold text-textMain">
                          {formatCurrency(payment.amount)}
                        </td>

                        <td className="px-6 py-4">
                          <StatusBadge
                            label={statusInfo.label}
                            className={statusInfo.class}
                          />
                        </td>

                        <td className="px-7 py-4 text-right">
                          <TableAction type={statusInfo.action} />
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 px-7 py-5">
            <p className="text-[15px] text-textSecondary">
              Showing {payments.length} records
            </p>
            <div className="flex items-center gap-3">
              <button className="rounded-2xl border border-gray-200 bg-white px-5 py-3 text-[15px] font-semibold text-textMain transition hover:bg-background">
                Previous
              </button>
              <button className="rounded-2xl border border-gray-200 bg-white px-5 py-3 text-[15px] font-semibold text-textMain transition hover:bg-background">
                Next
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

// Sub-components kept exactly the same
function SummaryCard({
  title,
  value,
  meta,
  metaClass,
  icon: Icon,
  iconWrapClass,
  iconClass,
}) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[15px] font-medium text-textSecondary">{title}</p>
          <h3 className="mt-2 text-[28px] font-bold tracking-tight text-textMain">
            {value}
          </h3>
          <p className={`mt-3 text-sm font-semibold ${metaClass}`}>{meta}</p>
        </div>
        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl ${iconWrapClass}`}
        >
          <Icon className={iconClass} size={28} />
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ label, className }) {
  return (
    <span
      className={`inline-flex min-w-[78px] justify-center rounded-full px-3 py-1.5 text-sm font-semibold ${className}`}
    >
      {label}
    </span>
  );
}

function TableAction({ type }) {
  if (type === "pay") {
    return (
      <button className="inline-flex h-10 items-center justify-center rounded-xl bg-teal-700 px-5 text-sm font-semibold text-white transition hover:bg-teal-800">
        Pay Now
      </button>
    );
  }
  if (type === "download") {
    return (
      <button className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-teal-600 transition hover:bg-teal-50">
        <ArrowDownToLine size={20} />
      </button>
    );
  }
  return null;
}
