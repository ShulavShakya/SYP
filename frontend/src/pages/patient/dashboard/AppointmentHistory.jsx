import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Link } from "react-router-dom";

const appointments = [
  {
    id: 1,
    date: "Oct 24, 2023",
    doctor: "Dr. Sarah Jenkins",
    doctorImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBO58b-h-zhD4Xq3plYnRkW0mKiJY-3RHLESeaoyZ8B4ArGStdgdpioRdNMuxLE1YGCS5sekpquiPr-jpb1ZvytSIIPGVl2pWwMi4sdjeZPiFgo0sl1a3mgL7xFmGPjd_LzKkoZaIGLP-s_Ft7C-P8EWZSG7igYsZiMBpGmhDV8nZVrvJZNqwNSwCr4N7U3I6J9I4EZ66o6995c4_NgC9Uxr6mOcoAhR1SkgEyV6fv4o2inNT8htlH6reK-1ZhVS8LnW73rjcV1V2YS",
    department: "Cardiology",
    time: "09:30 AM",
    status: "Scheduled",
    reason: "Chest pain and shortness of breath during exercise.",
    bookingFee: 250,
  },
  {
    id: 2,
    date: "Oct 20, 2023",
    doctor: "Dr. Michael Chen",
    doctorImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBN7HVF6q9o4poWbSqbjv4kYCuB3yUU9y1zBvgrBwINL9UvVfmHOy2BmhJYDC5sYiEts0c-Ucaw9EYxPXocIbyfDfOjlYMVDqqeeMUs1VVZhwvl1HHQts_LxkWueCqmnGrszXhKbx6V9SKp8E-LQ3a85dL39AzbIdqouFtt6TLFwP-Mhq4x8thkvS-AhNyEJVocJ0k64qZTleC9wlds7YF5Lb_qjti8ow5KuYVoxOKkR3NZXE6UoNSL1a7YlsE1DBGFJtIdsdoa3jsY",
    department: "Dermatology",
    time: "02:15 PM",
    status: "Completed",
    reason: "Persistent skin rash and itching for the past two weeks.",
    bookingFee: 250,
  },
  {
    id: 3,
    date: "Oct 15, 2023",
    doctor: "Dr. Emily Stone",
    doctorImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC9x83xdQxYVqOmcYb1Q5eHzEOnA8Jvy5n-u1AezS5c44OJ7lCLHDpJwc9MqKyTedqCgT972dpT0d4gV9Ehlw0sF_Nu0dmFOFk5ufHuu_KBYiOR0uqTp26vgrEIJP38sXOY2JhURWcum_aw1LElhY4bR8NYFrdyA5rLeu7hYKvLe7_VnvBHA3QhUvGG1CJftu5IRdE-XFK6M3z8yt0g4IYtziDne7NmPH-vydQN4AWf8-2FKz2Dc4nMA8w4qpmQwsnQGxi5Q_QyOIqw",
    department: "Neurology",
    time: "11:00 AM",
    status: "Cancelled",
    reason: "Recurring headaches and dizziness.",
    bookingFee: 250,
  },
  {
    id: 4,
    date: "Oct 10, 2023",
    doctor: "Dr. Robert Fox",
    doctorImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD0b8tNWPh7sHMqhqvgjCLqFF2k9C9z887zzCptLI7pgOdVc19vQ-U1MBQJNRgjFN7Rf8AT9FEAnWabiAW3n1OUqD9nGamq1LsQ2IDLu1p6gW6MWqMDDggsaWrmJo3S2oNfMs8TClqakUE5A2KuigLc34Gyg-jndAZgoqdlQZLSv54hrjSkhGDjKCJImkM4R7SSQcxzBQFfwkD6ehO35b7CmgT_gssKUKp6W1AtI7FPKRb5nRBU51L_fIDyd8qtL9Kng5cjUbffvLG9",
    department: "Orthopedics",
    time: "03:45 PM",
    status: "Completed",
    reason: "Knee pain after a sports injury.",
    bookingFee: 250,
  },
];

const getStatusClasses = (status) => {
  switch (status) {
    case "Scheduled":
      return "bg-primary/10 text-primary";
    case "Completed":
      return "bg-mint/10 text-mint";
    case "Cancelled":
      return "bg-gray-status/10 text-gray-status";
    default:
      return "bg-slate-100 text-slate-600";
  }
};

export default function AppointmentHistory() {
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const closeModal = () => setSelectedAppointment(null);

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
              {appointments.map((appointment) => (
                <tr
                  key={appointment.id}
                  className="hover:bg-slate-50 transition-colors group"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-navy-dark">
                    {appointment.date}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <img
                        alt={appointment.doctor}
                        className="size-8 rounded-full object-cover"
                        src={appointment.doctorImage}
                      />
                      <span className="text-sm font-medium text-navy-dark">
                        {appointment.doctor}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    {appointment.department}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    {appointment.time}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClasses(
                        appointment.status,
                      )}`}
                    >
                      {appointment.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button
                      type="button"
                      onClick={() => setSelectedAppointment(appointment)}
                      className="text-primary font-medium hover:underline"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
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

      {selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  Appointment Details
                </h2>
                <p className="text-sm text-slate-500">
                  Full information submitted in the request form
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-6 px-6 py-5">
              <div className="flex items-center gap-4">
                <img
                  src={selectedAppointment.doctorImage}
                  alt={selectedAppointment.doctor}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-base font-semibold text-slate-800">
                    {selectedAppointment.doctor}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {selectedAppointment.department}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Appointment Date
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-800">
                    {selectedAppointment.date}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Time Slot
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-800">
                    {selectedAppointment.time}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Department
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-800">
                    {selectedAppointment.department}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Status
                  </p>
                  <span
                    className={`mt-2 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusClasses(
                      selectedAppointment.status,
                    )}`}
                  >
                    {selectedAppointment.status}
                  </span>
                </div>

                <div className="rounded-xl bg-slate-50 p-4 sm:col-span-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Reason for Visit
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-700">
                    {selectedAppointment.reason || "No reason provided."}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4 sm:col-span-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Booking Fee
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-800">
                    Rs. {selectedAppointment.bookingFee?.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
