import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function AppointmentHistory() {
  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div className="flex gap-2 items-center overflow-x-auto pb-2 md:pb-0">
          <button className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium whitespace-nowrap">
            All Visits
          </button>
          <button className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-600 text-sm font-medium whitespace-nowrap hover:bg-slate-50">
            Scheduled
          </button>
          <button className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-600 text-sm font-medium whitespace-nowrap hover:bg-slate-50">
            Completed
          </button>
          <button className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-600 text-sm font-medium whitespace-nowrap hover:bg-slate-50">
            Cancelled
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600">
            <span className="material-symbols-outlined text-base">
              calendar_month
            </span>
            <span>This Month</span>
            <span className="material-symbols-outlined text-base">
              expand_more
            </span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600">
            <span className="material-symbols-outlined text-base">
              filter_list
            </span>
            <span>More Filters</span>
          </button>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Doctor
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50 transition-colors cursor-pointer group">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-navy-dark">
                  Oct 24, 2023
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <img
                      alt="Dr. Sarah"
                      className="size-8 rounded-full"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBO58b-h-zhD4Xq3plYnRkW0mKiJY-3RHLESeaoyZ8B4ArGStdgdpioRdNMuxLE1YGCS5sekpquiPr-jpb1ZvytSIIPGVl2pWwMi4sdjeZPiFgo0sl1a3mgL7xFmGPjd_LzKkoZaIGLP-s_Ft7C-P8EWZSG7igYsZiMBpGmhDV8nZVrvJZNqwNSwCr4N7U3I6J9I4EZ66o6995c4_NgC9Uxr6mOcoAhR1SkgEyV6fv4o2inNT8htlH6reK-1ZhVS8LnW73rjcV1V2YS"
                    />
                    <span className="text-sm font-medium text-navy-dark">
                      Dr. Sarah Jenkins
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  Cardiology
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  09:30 AM
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    Scheduled
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <button className="text-primary font-medium hover:underline">
                    Details
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors cursor-pointer group">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-navy-dark">
                  Oct 20, 2023
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <img
                      alt="Dr. Michael"
                      className="size-8 rounded-full"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBN7HVF6q9o4poWbSqbjv4kYCuB3yUU9y1zBvgrBwINL9UvVfmHOy2BmhJYDC5sYiEts0c-Ucaw9EYxPXocIbyfDfOjlYMVDqqeeMUs1VVZhwvl1HHQts_LxkWueCqmnGrszXhKbx6V9SKp8E-LQ3a85dL39AzbIdqouFtt6TLFwP-Mhq4x8thkvS-AhNyEJVocJ0k64qZTleC9wlds7YF5Lb_qjti8ow5KuYVoxOKkR3NZXE6UoNSL1a7YlsE1DBGFJtIdsdoa3jsY"
                    />
                    <span className="text-sm font-medium text-navy-dark">
                      Dr. Michael Chen
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  Dermatology
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  02:15 PM
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-mint/10 text-mint">
                    Completed
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <button className="text-primary font-medium hover:underline">
                    Details
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors cursor-pointer group">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-navy-dark">
                  Oct 15, 2023
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <img
                      alt="Dr. Emily"
                      className="size-8 rounded-full"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9x83xdQxYVqOmcYb1Q5eHzEOnA8Jvy5n-u1AezS5c44OJ7lCLHDpJwc9MqKyTedqCgT972dpT0d4gV9Ehlw0sF_Nu0dmFOFk5ufHuu_KBYiOR0uqTp26vgrEIJP38sXOY2JhURWcum_aw1LElhY4bR8NYFrdyA5rLeu7hYKvLe7_VnvBHA3QhUvGG1CJftu5IRdE-XFK6M3z8yt0g4IYtziDne7NmPH-vydQN4AWf8-2FKz2Dc4nMA8w4qpmQwsnQGxi5Q_QyOIqw"
                    />
                    <span className="text-sm font-medium text-navy-dark">
                      Dr. Emily Stone
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  Neurology
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  11:00 AM
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-status/10 text-gray-status">
                    Cancelled
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <button className="text-primary font-medium hover:underline">
                    Details
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors cursor-pointer group">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-navy-dark">
                  Oct 10, 2023
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <img
                      alt="Dr. Robert"
                      className="size-8 rounded-full"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0b8tNWPh7sHMqhqvgjCLqFF2k9C9z887zzCptLI7pgOdVc19vQ-U1MBQJNRgjFN7Rf8AT9FEAnWabiAW3n1OUqD9nGamq1LsQ2IDLu1p6gW6MWqMDDggsaWrmJo3S2oNfMs8TClqakUE5A2KuigLc34Gyg-jndAZgoqdlQZLSv54hrjSkhGDjKCJImkM4R7SSQcxzBQFfwkD6ehO35b7CmgT_gssKUKp6W1AtI7FPKRb5nRBU51L_fIDyd8qtL9Kng5cjUbffvLG9"
                    />
                    <span className="text-sm font-medium text-navy-dark">
                      Dr. Robert Fox
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  Orthopedics
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  03:45 PM
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-mint/10 text-mint">
                    Completed
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <button className="text-primary font-medium hover:underline">
                    Details
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
          <p className="text-sm text-slate-500">Showing 1 to 4 of 24 records</p>

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
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
            >
              3
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
      <div className="mt-6 flex justify-center">
        <Link
          to="/patient/appointments"
          className="px-6 py-3 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          New Appointment
        </Link>
      </div>
    </div>
  );
}
