import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Download,
  Hourglass,
  FlaskConical,
  ScanLine,
  TestTube2,
  Info,
  HelpCircle,
} from "lucide-react";

const reports = [
  {
    id: 1,
    testName: "Complete Blood Count",
    department: "Hematology Lab",
    date: "Oct 24, 2023",
    status: "Completed",
    statusClass: "bg-mint/10 text-primary",
    icon: FlaskConical,
    pending: false,
  },
  {
    id: 2,
    testName: "MRI - Lumbar Spine",
    department: "Radiology Dept",
    date: "Oct 22, 2023",
    status: "Pending",
    statusClass: "bg-amber-100 text-amber-700",
    icon: ScanLine,
    pending: true,
  },
  {
    id: 3,
    testName: "Thyroid Profile (T3, T4, TSH)",
    department: "Biochemistry Lab",
    date: "Oct 18, 2023",
    status: "Completed",
    statusClass: "bg-mint/10 text-primary",
    icon: TestTube2,
    pending: false,
  },
];

export default function LabReports() {
  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Test Name
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Date
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {reports.map((report) => {
                  const Icon = report.icon;

                  return (
                    <tr
                      key={report.id}
                      className="cursor-pointer transition-colors hover:bg-slate-50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Icon size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-900">
                              {report.testName}
                            </p>
                            <p className="text-xs text-slate-500">
                              {report.department}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                        {report.date}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${report.statusClass}`}
                        >
                          {report.status}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                        {report.pending ? (
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              disabled
                              className="rounded-lg p-2 text-slate-400 opacity-50"
                              title="Pending"
                            >
                              <Hourglass size={18} />
                            </button>
                          </div>
                        ) : (
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              className="rounded-lg p-2 text-primary transition hover:bg-primary/10"
                              title="View Report"
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
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
            <p className="text-sm text-slate-500">
              Showing 1 to {reports.length} of 24 records
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

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-slate-900">
              <Info size={18} className="text-primary" />
              Note from Lab Doctor
            </h3>
            <p className="text-sm leading-relaxed text-slate-600">
              Your CBC results show values within the normal physiological
              range. However, we recommend a follow-up consultation with your
              primary physician to discuss the Thyroid results once they are
              fully processed.
            </p>
          </div>

          <div className="flex items-center gap-6 rounded-xl border border-primary/20 bg-primary/5 p-6">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-white">
              <HelpCircle size={28} />
            </div>

            <div>
              <h3 className="mb-1 text-base font-bold text-slate-900">
                Need help interpreting results?
              </h3>
              <p className="mb-3 text-sm text-slate-600">
                Book an online session with our specialists.
              </p>
              <button className="rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-primary/90">
                Book Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
