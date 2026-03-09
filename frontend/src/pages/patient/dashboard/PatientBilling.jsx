import React from "react";
import {
  CreditCard,
  Wallet,
  ReceiptText,
  Filter,
  Download,
  Stethoscope,
  FlaskConical,
  Brain,
  Syringe,
  Cross,
  ArrowDownToLine,
} from "lucide-react";

const summaryCards = [
  {
    title: "Total Amount",
    value: "$4,250.00",
    meta: "+5.2% from last month",
    metaClass: "text-teal-600",
    icon: CreditCard,
    iconWrapClass: "bg-slate-100",
    iconClass: "text-teal-700",
  },
  {
    title: "Paid Amount",
    value: "$3,100.00",
    meta: "73% of total billed",
    metaClass: "text-emerald-500",
    icon: Wallet,
    iconWrapClass: "bg-slate-100",
    iconClass: "text-mint",
  },
  {
    title: "Pending Balance",
    value: "$1,150.00",
    meta: "2 payments overdue",
    metaClass: "text-red-500",
    icon: ReceiptText,
    iconWrapClass: "bg-red-50",
    iconClass: "text-red-500",
  },
];

const billingRows = [
  {
    service: "General Consultation",
    date: "Oct 12, 2023",
    amount: "$150.00",
    status: "Paid",
    statusClass: "bg-teal-50 text-teal-600",
    icon: Stethoscope,
    action: "download",
  },
  {
    service: "Full Blood Panel",
    date: "Oct 24, 2023",
    amount: "$450.00",
    status: "Pending",
    statusClass: "bg-amber-100 text-amber-600",
    icon: FlaskConical,
    action: "pay",
  },
  {
    service: "MRI Brain Scan",
    date: "Nov 02, 2023",
    amount: "$1,200.00",
    status: "Overdue",
    statusClass: "bg-red-100 text-red-500",
    icon: Brain,
    action: "pay",
  },
  {
    service: "Flu Vaccination",
    date: "Nov 05, 2023",
    amount: "$45.00",
    status: "Paid",
    statusClass: "bg-teal-50 text-teal-600",
    icon: Syringe,
    action: "download",
  },
  {
    service: "ER Visit - Sprained Ankle",
    date: "Nov 10, 2023",
    amount: "$850.00",
    status: "Pending",
    statusClass: "bg-amber-100 text-amber-600",
    icon: Cross,
    action: "pay",
  },
];

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
      <button className="inline-flex h-10 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-white transition hover:bg-primary/90">
        Pay Now
      </button>
    );
  }

  return (
    <button className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-mint transition hover:bg-mint/10">
      <ArrowDownToLine size={20} />
    </button>
  );
}

export default function BillingPaymentsContent() {
  return (
    <main className="min-h-screen  px-8 py-7 text-textMain">
      <div className="mx-auto max-w-7xl">
        {/* <div className="mb-9">
          <h1 className="text-[22px] font-bold tracking-tight text-textMain">
            Billing &amp; Payments
          </h1>
          <p className="mt-1 text-[15px] text-textSecondary">
            Manage your invoices and track healthcare expenses
          </p>
        </div> */}

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {summaryCards.map((card) => (
            <SummaryCard key={card.title} {...card} />
          ))}
        </section>

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
                {billingRows.map((row) => {
                  const Icon = row.icon;

                  return (
                    <tr
                      key={`${row.service}-${row.date}`}
                      className="border-t border-gray-100"
                    >
                      <td className="px-7 py-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
                            <Icon className="text-teal-700" size={22} />
                          </div>
                          <span className="text-[16px] font-semibold text-textMain">
                            {row.service}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-[15px] text-textSecondary">
                        {row.date}
                      </td>

                      <td className="px-6 py-4 text-[16px] font-semibold text-textMain">
                        {row.amount}
                      </td>

                      <td className="px-6 py-4">
                        <StatusBadge
                          label={row.status}
                          className={row.statusClass}
                        />
                      </td>

                      <td className="px-7 py-4 text-right">
                        <TableAction type={row.action} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 px-7 py-5">
            <p className="text-[15px] text-textSecondary">
              Showing 5 of 24 records
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
