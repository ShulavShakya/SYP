import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Eye, Download } from "lucide-react";

const prescriptions = [
  {
    date: "Oct 24, 2023",
    doctor: "Dr. Sarah Wilson",
    doctorImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBWoGVHuE0REolbDCuOGb36VrKo0h27eTH7SY60RtyCnPS9vWsVr_Tss5J3GUZzwS9W7mSq2SqUbFBLVp3IxHzyRLJOvsZN6B9I0RlUT6OHqsm-ttHgBexHyRDklvfxKzravLUwXZFrUJ6Zj5RFMJlwQhgpooV8WGrcEjtCbr6ULSRj0CDtbojuHDInurO69u2UrVj-tWEqwlrq7-vTR8yL8gEcmd7h_c7ybENsAotB7ONxvG-oj4Ky2FhQvv41FInXnUAYqmqcsdzz",
    medicine: "Amoxicillin",
    medicineType: "Antibiotic",
    dosage: "500mg, 1 tablet",
    duration: "7 days",
    durationClass: "bg-primary/10 text-primary",
    highlighted: true,
  },
  {
    date: "Oct 12, 2023",
    doctor: "Dr. Michael Chen",
    doctorImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBKdX0X2GMb7LJAoTmnbjiIGNPYTA3C37eW6c-E7-tmj3DFeE3h7grF1Xo1qVnEMnNF8XXaS5Gz6pfZPbD_1rFU99UAZNT2Do97WzKf2PVoMmzEla6m_MePosFvMWg4WTfTnbhMD14tI4MqHlxXKBxQikYIPVTy6Q6ZLNyR6P2SmJt1skPa08U-HJ_Puy1frd9VBIz409pj2eTSTN9Nlz2Y2dT45qc-nPaXAYRkOE1XMBEKXzFLI_Y80rwMjZUcfDGwssNUho2zXK3c",
    medicine: "Lisinopril",
    medicineType: "Blood Pressure",
    dosage: "10mg, 1 tablet",
    duration: "30 days",
    durationClass: "bg-slate-100 text-slate-600",
    highlighted: false,
  },
  {
    date: "Sep 30, 2023",
    doctor: "Dr. James Miller",
    doctorImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD8A9JFDeqnKn4qYAMrKrzwYL21HT9t8sOWLVcsC5VnK4g-d9pS7Chk97xtUqZQ0gIpHGrYrBDDbo-nqAcc4uL2oQA59mIMwIX1D1uxNzt6gXOx91W1mUrSuPOH27gdnUUkjgQe_-QPMnraZxgfnJQaqfbzLobf2drKtm-y5VyyPYCZFV-7jexTOFqgovWy0kjbdvasEVZZxAgXA251Uhsuy0baz4ECBmLDKqNuB2Ze9iGAZ20H-43EVwZ_mjASzeAkqYjENHcfclq1",
    medicine: "Metformin",
    medicineType: "Antidiabetic",
    dosage: "850mg, 2 tablets",
    duration: "Ongoing",
    durationClass: "bg-slate-100 text-slate-600",
    highlighted: false,
  },
];

const mobileNavItems = [
  { label: "Home", icon: "house", active: false },
  { label: "Schedule", icon: "schedule", active: false },
  { label: "Records", icon: "folder", active: false },
  { label: "Scripts", icon: "prescriptions", active: true },
  { label: "Pay", icon: "credit_card", active: false },
];

export default function Prescriptions() {
  return (
    <div className="flex h-screen overflow-hidden text-slate-900">
      <main className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <div className="mx-auto w-full max-w-6xl p-4 md:p-8">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Date
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Doctor
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Medicine
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Dosage
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Duration
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {prescriptions.map((item) => (
                    <tr
                      key={`${item.date}-${item.medicine}`}
                      className="cursor-pointer transition-colors hover:bg-slate-50"
                    >
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900">
                        {item.date}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            alt={item.doctor}
                            className="size-8 rounded-full object-cover"
                            src={item.doctorImage}
                          />
                          <span className="text-sm font-medium text-slate-900">
                            {item.doctor}
                          </span>
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm font-medium text-slate-900">
                          {item.medicine}
                        </div>
                        <div className="text-xs text-slate-500">
                          {item.medicineType}
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                        {item.dosage}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${item.durationClass}`}
                        >
                          {item.duration}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            className="rounded-lg p-2 text-primary transition hover:bg-primary/10"
                            title="View Details"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            type="button"
                            className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100"
                            title="Download PDF"
                          >
                            <Download size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
              <p className="text-sm text-slate-500">
                Showing 1 to {prescriptions.length} of 24 records
              </p>

              <div className="flex gap-2">
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-medium text-white"
                >
                  1
                </button>
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                >
                  2
                </button>
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-slate-200 bg-white px-2 md:hidden">
        {mobileNavItems.map((item) => (
          <button
            key={item.label}
            type="button"
            className={`flex flex-col items-center gap-1 ${
              item.active ? "text-primary" : "text-slate-400"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              {item.icon}
            </span>
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
