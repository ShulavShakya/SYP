import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { privateAPI } from "../../../auth/config/api";

// Change these to match your Django model exactly!
const getStatusClasses = (status) => {
  switch (status) {
    case "SCHEDULED":
      return "bg-primary/10 text-primary";
    case "COMPLETED":
      return "bg-mint/10 text-mint";
    case "PENDING":
      return "bg-amber-100 text-amber-600";
    default:
      return "bg-slate-100 text-slate-600";
  }
};

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export default function AppointmentHistory() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [payingId, setPayingId] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await privateAPI.get("/patient/appointments/");

      const mappedData = response.data.data.map((app) => ({
        ...app,
        doctor: app.doctor_name,
        department: app.department_name,
        doctorImage: `https://ui-avatars.com/api/?name=${app.doctor_name}&background=random`,
        bookingFee: 25000 / 100,
        formattedDate: formatDate(app.date),
      }));

      setAppointments(mappedData);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  const handlePayNow = async (appointmentId) => {
    if (!appointmentId) {
      alert("Invalid appointment ID");
      return;
    }

    try {
      setPayingId(appointmentId);

      const { data } = await privateAPI.post("/patient/payment/initiate/", {
        appointment_id: appointmentId,
      });

      console.log("Khalti Init Response:", data);

      if (data?.payment_url) {
        window.location.href = data.payment_url;
        return;
      }

      console.warn("Unexpected response format:", data);
      alert("Payment initiated but no redirect URL received.");
    } catch (err) {
      const errorData = err.response?.data;

      console.error("Payment Error:", err);
      console.error("Backend Error Data:", errorData);

      let message = "Payment initiation failed.";

      if (errorData?.error) {
        message = errorData.error;
      }

      if (errorData?.details) {
        message += `\n${errorData.details}`;
      }

      alert(message);
    } finally {
      setPayingId(null);
    }
  };

  const closeModal = () => setSelectedAppointment(null);

  const filteredAppointments = appointments.filter((app) => {
    if (app.r_status !== true) return false;

    if (filter === "All") return true;
    return app.status === filter;
  });

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-20">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div className="flex gap-2 items-center overflow-x-auto pb-2 md:pb-0">
          {["All", "Scheduled", "Completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                filter === f
                  ? "bg-primary text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {f === "All" ? "All Visits" : f}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg border border-red-100">
          {error}
        </div>
      )}

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
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Payment & History
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((appointment) => (
                  <tr
                    key={appointment.id}
                    className="hover:bg-slate-50 transition-colors group"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-navy-dark">
                      {appointment.formattedDate}
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
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClasses(appointment.status)}`}
                      >
                        {appointment.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        {appointment.status !== "SCHEDULED" &&
                        appointment.status !== "COMPLETED" ? (
                          <button
                            onClick={() => handlePayNow(appointment.id)}
                            disabled={payingId === appointment.id}
                            className="bg-primary text-white px-3 py-1.5 rounded-md text-xs font-semibold hover:bg-primary/90 flex items-center gap-1 disabled:opacity-50"
                          >
                            {payingId === appointment.id ? (
                              <Loader2 size={12} className="animate-spin" />
                            ) : (
                              "Pay Now"
                            )}
                          </button>
                        ) : (
                          <span className="text-xs text-mint font-medium bg-mint/10 px-2 py-1 rounded">
                            Paid
                          </span>
                        )}
                        <button
                          onClick={() => setSelectedAppointment(appointment)}
                          className="border border-slate-200 text-slate-600 px-3 py-1.5 rounded-md text-xs font-semibold hover:bg-slate-50"
                        >
                          View History
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-10 text-center text-slate-500"
                  >
                    No appointments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
          <p className="text-sm text-slate-500">
            Showing {filteredAppointments.length} records
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
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
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
                    {selectedAppointment.formattedDate}
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
                    className={`mt-2 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusClasses(selectedAppointment.status)}`}
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
