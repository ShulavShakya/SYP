import React from "react";
import {
  Download,
  Eye,
  Hospital,
  Bell,
  Settings,
  Search,
  ArrowRight,
} from "lucide-react";

const requests = [
  {
    id: "#REQ-1024",
    name: "Alice Johnson",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuChZgI7O-zw0l31_8Ah2SJCmmTECcT8nOVAzrXia7fx3OJiB1RZrgg1Q1Y6zRo_6QuwL5BPfjtGXMOAE6_wCTYpp5BgjPqaS5Abit0m6e5CNW8P85OM7UvvO54nlv3gCoois9Iix8sfLpSBLTzmyGH6VXdw2fS_vouZbl_CJXw05fruz4qcHkmeTbQ01iCcuGGlDLxrr7308j3d5L7ckCajzNuEY9bkUBYkNDPblyxL_LpgOBeKf9t0uCUzbcKZLU0EzE87fIq8G7sT",
    type: "Insurance Verification",
    doctor: "Dr. Smith",
    date: "Oct 24, 2023",
    status: "Pending",
  },
  {
    id: "#REQ-1025",
    name: "Bob Wilson",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAjbqLWVTg-7-bj2_KKu_DCk5mklaseT2X4ALhk7jhs3pwZpHTxYhSj3pK3shqB8g1TLJ6TZYPn0-zYVHpq0pkJncUt7NSP494Cn55vF8mnGRnReA5t-xzYgIgePl3tc1wdOsbhDBXUAR9wIyOS4hUL-8nHexGuTWiNBqhVHEUdmVabzHI2wB1mbvaJon7QpD2-hCC6fD6IG-B26xSZS61E5-1D-30ZQIHT3T4lneWG83yRhZsK_Ilxi79S9eocxb9MvlwCH2lalu0H",
    type: "Emergency Appointment",
    doctor: "Dr. Adams",
    date: "Oct 24, 2023",
    status: "Approved",
  },
  {
    id: "#REQ-1026",
    name: "Charlie Brown",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAzO_tQs73I_rfuxtU6WmKXAS1G_S0qH2qbGZXBm4LNYNdZLpL4RpLim6YMHbUv3pj3oKRc_NI7Ko6tMwb8ikk9B4qfGPiyInktrMzQmEtbuxkziLD_eqOW_Srf0H-hbaT0ClxLYYPJSEK8oq1-FMoo6VPjXKYNNrKONOCewkcJcImL9x794vUYaVt5bP3cAEshNhPYpGGL6FdFmuMxqmeq8JBQ1tMBfCxcEOzqO89KD6dwKS94wza7XFpcO03Gu0j3hLUuLc0JB_R6",
    type: "Special Consultation",
    doctor: "Dr. Lee",
    date: "Oct 23, 2023",
    status: "Rejected",
  },
  {
    id: "#REQ-1027",
    name: "Diana Prince",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDr2uBLDYiIRH_MdjosEpwB-IgPMTCRLhl4bWeSndMjsJvEFEekV1E73V_feSJI97mPNR3ePDQjMlpLhVsYr2lW-QbwqBXrFg6T92nS53x6ix07y3eJ66nb1Pko5-_pB1FZOf--ENZFjOeTwvXe5uP2kY7hJs-ohpEp95V_syuAY1w1bmvHdC1Ry4p5g5ybYXAdGTPb9iHJjy9ChuUL94ZG2lUpQ5SKl5ZCp4ToWTxHz0UkbPibqbCKhSNkd_znhFfD_J5kGunALaZu",
    type: "Insurance Verification",
    doctor: "Dr. Smith",
    date: "Oct 23, 2023",
    status: "Pending",
  },
];

const statusStyles = {
  Pending: "bg-amber-100 text-amber-800",
  Approved: "bg-emerald-100 text-emerald-800",
  Rejected: "bg-rose-100 text-rose-800",
};

export default function ApprovalRequests() {
  return (
    <div className="min-h-screen bg-background-light font-display text-slate-900">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          {/* <header className="flex items-center justify-between whitespace-nowrap border-b border-slate-200 bg-white px-10 py-3">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-4 text-primary">
                <div className="flex size-6 items-center justify-center">
                  <Hospital className="h-7 w-7" />
                </div>
                <h2 className="text-lg font-bold leading-tight tracking-tight text-slate-900">
                  Modern Wellness
                </h2>
              </div>

              <nav className="flex items-center gap-6">
                <a
                  className="text-sm font-medium text-slate-600 transition-colors hover:text-primary"
                  href="#"
                >
                  Dashboard
                </a>
                <a
                  className="text-sm font-medium text-slate-600 transition-colors hover:text-primary"
                  href="#"
                >
                  Patients
                </a>
                <a
                  className="text-sm font-medium text-slate-600 transition-colors hover:text-primary"
                  href="#"
                >
                  Schedules
                </a>
                <a
                  className="border-b-2 border-primary pb-1 text-sm font-bold text-primary"
                  href="#"
                >
                  Approvals
                </a>
              </nav>
            </div>

            <div className="flex flex-1 items-center justify-end gap-6">
              <label className="flex h-10 min-w-40 max-w-64 flex-col">
                <div className="flex h-full w-full flex-1 items-stretch rounded-lg bg-slate-100">
                  <div className="flex items-center justify-center pl-4 text-slate-500">
                    <Search className="h-5 w-5" />
                  </div>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 border-none bg-transparent px-2 text-base font-normal placeholder:text-slate-500 focus:ring-0"
                    placeholder="Search requests..."
                    defaultValue=""
                  />
                </div>
              </label>

              <div className="flex gap-2">
                <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition-colors hover:bg-slate-200">
                  <Bell className="h-5 w-5" />
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition-colors hover:bg-slate-200">
                  <Settings className="h-5 w-5" />
                </button>
              </div>

              <div className="size-10 rounded-full border border-slate-200 bg-cover bg-center bg-no-repeat">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZc5pNUxrRmHIGjlEqEpOUyrPnAeGsZ64Lse0ZDTOIaET3L8KSR68ekEtrAa07tCWX4EGa9gfxUww3pmXLiWVw1zaU3jgEwgJ1JQKTOeq-20BNazfjguwKBWDYMI8tjIM1Vec_Eqrdbgt9wNSNjx0qqq88i4eeCm_f7VWecr_tK0-3F2YK_eVr4NAT09iWt5ZIW7j-NZnU1QAUfkssQK4e6sZ0DWuWAgI4vN2rgU5SitXZcSbkNE_-kvR6LFVIbdcOwm821eR6izWs"
                  alt="Receptionist avatar"
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
            </div>
          </header> */}

          <main className="flex flex-1 px-10 py-8">
            <div className="flex flex-1 flex-col gap-6">
              {/* <div className="flex items-end justify-between">
                <div>
                  <h2 className="text-3xl font-black tracking-tight text-slate-900">
                    Approval Requests
                  </h2>
                  <p className="mt-1 text-slate-500">
                    Manage and review pending patient requests and insurance
                    verifications.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm transition-colors hover:bg-slate-50">
                    <Download className="h-4 w-4" />
                    Export Report
                  </button>
                </div>
              </div> */}

              <div className="flex border-b border-slate-200">
                <button className="border-b-2 border-primary px-6 py-3 text-sm font-bold text-primary">
                  All Requests
                </button>
                <button className="px-6 py-3 text-sm font-medium text-slate-500 transition-colors hover:text-slate-700">
                  Pending
                </button>
                <button className="px-6 py-3 text-sm font-medium text-slate-500 transition-colors hover:text-slate-700">
                  Approved
                </button>
                <button className="px-6 py-3 text-sm font-medium text-slate-500 transition-colors hover:text-slate-700">
                  Rejected
                </button>
              </div>

              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50">
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                          Request ID
                        </th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                          Patient Name
                        </th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                          Type
                        </th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                          Doctor
                        </th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                          Date
                        </th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                          Status
                        </th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-200">
                      {requests.map((request) => (
                        <tr
                          key={request.id}
                          className="transition-colors hover:bg-slate-50/50"
                        >
                          <td className="px-6 py-4 text-sm font-medium text-slate-900">
                            {request.id}
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-full bg-slate-200">
                                <img
                                  src={request.avatar}
                                  alt={request.name}
                                  className="h-full w-full rounded-full object-cover"
                                />
                              </div>
                              <span className="text-sm font-semibold text-slate-700">
                                {request.name}
                              </span>
                            </div>
                          </td>

                          <td className="px-6 py-4 text-sm text-slate-600">
                            {request.type}
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600">
                            {request.doctor}
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600">
                            {request.date}
                          </td>

                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${statusStyles[request.status]}`}
                            >
                              {request.status}
                            </span>
                          </td>

                          <td className="px-6 py-4">
                            {request.status === "Pending" ? (
                              <div className="flex items-center gap-2">
                                <button className="rounded bg-primary px-3 py-1 text-xs font-bold text-white transition-colors hover:bg-primary/90">
                                  Approve
                                </button>
                                <button className="rounded bg-rose-100 px-3 py-1 text-xs font-bold text-rose-700 transition-colors hover:bg-rose-200">
                                  Reject
                                </button>
                                <a
                                  className="p-1 text-slate-400 transition-colors hover:text-primary"
                                  href="#"
                                >
                                  <Eye className="h-5 w-5" />
                                </a>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <a
                                  className="flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                                  href="#"
                                >
                                  View Details
                                  <ArrowRight className="h-4 w-4" />
                                </a>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4">
                  <p className="text-xs font-medium tracking-wide text-slate-500">
                    Showing 1 to 4 of 24 requests
                  </p>
                  <div className="flex gap-2">
                    <button className="rounded border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-50">
                      Previous
                    </button>
                    <button className="rounded border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-50">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
