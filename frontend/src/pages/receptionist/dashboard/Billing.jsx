import React, { useState } from "react";
import {
  FileText,
  Heart,
  Mail,
  Pill,
  PlusCircle,
  Printer,
  ShieldCheck,
  TrendingUp,
  CheckCircle2,
  Clock3,
  AlertCircle,
  Wallet,
  X,
} from "lucide-react";

const initialInvoiceItems = [
  {
    service: "Consultation Fee",
    description: "General Physician Visit",
    provider: "Dr. Aris Thorne",
    cost: "$85.00",
    qty: 1,
    total: "$85.00",
    icon: Heart,
    iconWrap: "bg-primary/10 text-primary",
  },
  {
    service: "Blood Profile (Lipid)",
    description: "Diagnostic Laboratory",
    provider: "Lab Unit 2",
    cost: "$120.00",
    qty: 1,
    total: "$120.00",
    icon: FileText,
    iconWrap: "bg-mint/10 text-mint",
  },
  {
    service: "Lisinopril 10mg",
    description: "Pharmacy - 30 Tabs",
    provider: "In-house Pharmacy",
    cost: "$15.50",
    qty: 2,
    total: "$31.00",
    icon: Pill,
    iconWrap: "bg-green-100 text-green-600",
  },
  {
    service: "X-Ray Chest (PA)",
    description: "Radiology Imaging",
    provider: "Dr. Mira Vane",
    cost: "$145.00",
    qty: 1,
    total: "$145.00",
    icon: FileText,
    iconWrap: "bg-yellow-50 text-yellow-600",
  },
];

const stats = [
  {
    title: "Daily Billing",
    value: "$12,450.00",
    meta: "Updated this shift",
    metaClass: "text-slate-500",
    icon: TrendingUp,
    iconWrap: "bg-blue-100 text-blue-600",
  },
  {
    title: "Paid Today",
    value: "42 Patients",
    meta: "Strong collection rate",
    metaClass: "text-green-600",
    icon: CheckCircle2,
    iconWrap: "bg-green-100 text-green-600",
  },
  {
    title: "Pending Invoices",
    value: "8",
    meta: "Needs follow-up",
    metaClass: "text-red-500",
    icon: AlertCircle,
    iconWrap: "bg-orange-100 text-orange-600",
  },
  {
    title: "Avg Proc Time",
    value: "4.5 Minutes",
    meta: "Front desk average",
    metaClass: "text-slate-500",
    icon: Clock3,
    iconWrap: "bg-primary/10 text-primary",
  },
];

function StatCard({ title, value, meta, metaClass, icon: Icon, iconWrap }) {
  return (
    <div className="flex items-center gap-5 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-2xl ${iconWrap}`}
      >
        <Icon size={28} />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="font-manrope text-2xl font-bold text-[#2C3E50]">
          {value}
        </h3>
        <p className={`mt-1 text-xs font-semibold ${metaClass}`}>{meta}</p>
      </div>
    </div>
  );
}

export default function BillingPage() {
  const [invoiceItems, setInvoiceItems] = useState(initialInvoiceItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    service: "",
    description: "",
    provider: "",
    cost: "",
    qty: 1,
  });

  const subtotal = 381.0;
  const taxes = 19.05;
  const insuranceDiscount = 40.0;
  const totalDue = 360.05;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      service: "",
      description: "",
      provider: "",
      cost: "",
      qty: 1,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "qty" ? Number(value) : value,
    }));
  };

  const handleAddItem = (e) => {
    e.preventDefault();

    const numericCost = Number(formData.cost);
    const qty = Number(formData.qty);

    if (
      !formData.service.trim() ||
      !formData.description.trim() ||
      !formData.provider.trim() ||
      !numericCost ||
      !qty
    ) {
      return;
    }

    const total = (numericCost * qty).toFixed(2);

    const newItem = {
      service: formData.service,
      description: formData.description,
      provider: formData.provider,
      cost: `$${numericCost.toFixed(2)}`,
      qty,
      total: `$${total}`,
      icon: FileText,
      iconWrap: "bg-primary/10 text-primary",
    };

    setInvoiceItems((prev) => [...prev, newItem]);
    closeModal();
  };

  return (
    <div className="min-h-screen text-[#2C3E50]">
      <div className="flex min-h-screen overflow-hidden">
        <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <main className="flex-1 space-y-8 overflow-y-auto p-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((card) => (
                <StatCard key={card.title} {...card} />
              ))}
            </div>

            <div className="flex flex-col gap-8 lg:flex-row">
              <div className="flex-1 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                <div className="flex flex-col gap-4 border-b border-slate-100 p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-manrope text-xl font-bold text-[#2C3E50]">
                      Active Invoice: #INV-99021
                    </h3>
                    <p className="text-sm text-slate-500">
                      Patient: Sarah Jenkins (ID: MW-2210)
                    </p>
                  </div>

                  <span className="inline-flex w-fit rounded-full bg-orange-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange-700">
                    Unpaid
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                          Service / Item
                        </th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                          Doctor / Dept
                        </th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                          Cost
                        </th>
                        <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
                          Qty
                        </th>
                        <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                          Total
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {invoiceItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <tr
                            key={`${item.service}-${item.provider}-${item.total}`}
                            className="transition-colors hover:bg-slate-50/60"
                          >
                            <td className="px-6 py-5">
                              <div className="flex items-center gap-4">
                                <div>
                                  <p className="text-sm font-semibold text-slate-700">
                                    {item.service}
                                  </p>
                                  <p className="text-xs text-slate-400">
                                    {item.description}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-5 text-sm text-slate-600">
                              {item.provider}
                            </td>
                            <td className="px-6 py-5 text-sm text-slate-600">
                              {item.cost}
                            </td>
                            <td className="px-6 py-5 text-center text-sm font-medium text-slate-700">
                              {item.qty}
                            </td>
                            <td className="px-6 py-5 text-right text-sm font-bold text-[#2C3E50]">
                              {item.total}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/70 p-6 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    onClick={openModal}
                    className="flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/70"
                  >
                    <PlusCircle size={18} />
                    Add Service / Medication
                  </button>

                  <p className="text-xs text-slate-400">
                    Last updated: 2 mins ago by reception_02
                  </p>
                </div>
              </div>

              <aside className="w-full space-y-6 lg:w-96">
                <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                  <div className="bg-primary px-6 py-5 text-white">
                    <h3 className="font-manrope text-lg font-bold">
                      Billing Summary
                    </h3>
                  </div>

                  <div className="space-y-4 p-6">
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <span>Subtotal</span>
                      <span className="font-semibold">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <span>Taxes (5%)</span>
                      <span className="font-semibold">${taxes.toFixed(2)}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <span>Insurance Discount</span>
                      <span className="font-semibold text-green-600">
                        -${insuranceDiscount.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-end justify-between border-t border-slate-100 pt-5">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                          Total Amount Due
                        </p>
                        <p className="mt-1 text-4xl font-bold text-primary">
                          ${totalDue.toFixed(2)}
                        </p>
                      </div>

                      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold uppercase text-red-700">
                        Unpaid
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                  <h3 className="mb-5 font-manrope text-lg font-bold text-[#2C3E50]">
                    Actions
                  </h3>

                  <div className="flex flex-col gap-3">
                    <button className="flex w-full items-center justify-center gap-3 rounded-xl bg-primary px-4 py-4 font-semibold text-white shadow-lg transition-all hover:opacity-90">
                      <Wallet size={18} />
                      Record Payment
                    </button>

                    <div className="grid grid-cols-2 gap-3">
                      <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100">
                        <FileText size={18} />
                        Invoice
                      </button>

                      <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100">
                        <Printer size={18} />
                        Receipt
                      </button>
                    </div>

                    <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-mint/15 px-4 py-3 font-semibold text-primary transition-colors hover:bg-mint/25">
                      <Mail size={18} />
                      Send to Patient Email
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl border border-mint/20 bg-mint/5 p-6 shadow-sm">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <ShieldCheck size={20} />
                    </div>
                    <h4 className="font-manrope text-lg font-bold text-[#2C3E50]">
                      Insurance Information
                    </h4>
                  </div>

                  <div className="space-y-2 text-sm text-slate-600">
                    <p>
                      <span className="font-semibold text-[#2C3E50]">
                        Provider:
                      </span>{" "}
                      Blue Cross Health
                    </p>
                    <p>
                      <span className="font-semibold text-[#2C3E50]">
                        Policy:
                      </span>{" "}
                      #BC-88921-X
                    </p>
                    <p>
                      <span className="font-semibold text-[#2C3E50]">
                        Coverage:
                      </span>{" "}
                      80% Medical, 50% Lab
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </main>
        </main>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <h3 className="text-xl font-bold text-[#2C3E50]">
                  Add Service / Medication
                </h3>
                <p className="text-sm text-slate-500">
                  Enter invoice item details below.
                </p>
              </div>

              <button
                onClick={closeModal}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddItem} className="space-y-5 p-6">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Service / Item
                  </label>
                  <input
                    type="text"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    placeholder="Enter service or medication"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Doctor / Dept
                  </label>
                  <input
                    type="text"
                    name="provider"
                    value={formData.provider}
                    onChange={handleChange}
                    placeholder="Enter doctor or department"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter item description"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Cost
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    name="cost"
                    value={formData.cost}
                    onChange={handleChange}
                    placeholder="Enter cost"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    name="qty"
                    value={formData.qty}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
                >
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
