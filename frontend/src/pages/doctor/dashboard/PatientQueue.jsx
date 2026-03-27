import React, { useState, useEffect, useMemo } from "react";
import { privateAPI } from "../../../auth/config/api";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Plus,
  Users,
  Hourglass,
  Stethoscope,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Helper to map backend status to frontend design
const getStatusDetails = (status) => {
  switch (status?.toLowerCase()) {
    case "scheduled":
    case "pending":
      return {
        label: "Waiting",
        class: "bg-amber-100 text-amber-800",
        action: "Start Consultation",
        actionType: "button",
      };
    case "ongoing":
    case "consulting":
      return {
        label: "In Consultation",
        class: "bg-indigo-100 text-indigo-800",
        action: "On Going",
        actionType: "link",
      };
    case "completed":
      return {
        label: "Completed",
        class: "bg-emerald-100 text-emerald-800",
        action: "View Details",
        actionType: "muted-link",
      };
    default:
      return {
        label: status,
        class: "bg-gray-100 text-gray-800",
        action: "View",
        actionType: "link",
      };
  }
};

const getInitials = (name) => {
  if (!name) return "P";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};

export default function PatientQueue() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("ALL");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // number of rows per page
  const [totalPages, setTotalPages] = useState(1);

  // Filtered appointments based on active filter
  const filteredAppointments = useMemo(() => {
    switch (activeFilter) {
      case "WAITING":
        return appointments.filter(
          (a) =>
            a.status?.toLowerCase() === "scheduled" ||
            a.status?.toLowerCase() === "pending",
        );
      case "COMPLETED":
        return appointments.filter(
          (a) => a.status?.toLowerCase() === "completed",
        );
      default:
        return appointments;
    }
  }, [appointments, activeFilter]);

  // Paginate filtered appointments
  const paginatedAppointments = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredAppointments.slice(startIndex, startIndex + pageSize);
  }, [filteredAppointments, currentPage, pageSize]);

  useEffect(() => {
    setTotalPages(Math.ceil(filteredAppointments.length / pageSize));
    setCurrentPage(1); // reset to first page when filter changes
  }, [filteredAppointments, pageSize]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await privateAPI.get("/doctor/appointments/", {});
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartConsultation = (appt) => {
    navigate(`/doctor/consultations/${appt.id}`, {
      state: { patient: appt },
    });
  };

  // Dynamic Summary Calculations
  const stats = {
    total: appointments.length,
    waiting: appointments.filter(
      (a) =>
        a.status?.toLowerCase() === "scheduled" ||
        a.status?.toLowerCase() === "pending",
    ).length,
    consulting: appointments.filter(
      (a) => a.status?.toLowerCase() === "ongoing",
    ).length,
    completed: appointments.filter(
      (a) => a.status?.toLowerCase() === "completed",
    ).length,
  };

  const summaryCards = [
    {
      title: "Total Patients",
      value: stats.total.toString(),
      note: "Total assigned",
      icon: Users,
      iconClass: "text-[#008080]",
      iconBg: "bg-[#008080]/10",
      noteClass: "text-[#70C1B3]",
    },
    {
      title: "Waiting",
      value: stats.waiting.toString(),
      note: "In queue",
      icon: Hourglass,
      iconClass: "text-amber-600",
      iconBg: "bg-amber-50",
      noteClass: "text-amber-600",
    },
    {
      title: "In Consultation",
      value: stats.consulting.toString().padStart(2, "0"),
      note: "Currently active",
      icon: Stethoscope,
      iconClass: "text-indigo-600",
      iconBg: "bg-indigo-50",
      noteClass: "text-indigo-600",
    },
    {
      title: "Completed",
      value: stats.completed.toString(),
      note: "Finished today",
      icon: CheckCircle2,
      iconClass: "text-emerald-600",
      iconBg: "bg-emerald-50",
      noteClass: "text-emerald-600",
    },
  ];

  return (
    <div className="flex flex-col">
      <main className="mx-auto w-full max-w-7xl px-8 py-8">
        {/* Summary Cards Section */}
        <section className="mb-8 grid grid-cols-4 gap-6">
          {summaryCards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className="rounded-xl border border-[#E0E6ED] bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-semibold text-[#7F8C8D]">
                    {card.title}
                  </p>
                  <div className={`rounded-lg p-2 ${card.iconBg}`}>
                    <Icon size={20} className={card.iconClass} />
                  </div>
                </div>
                <p className="text-3xl font-bold text-[#2C3E50]">
                  {card.value}
                </p>
                <p className={`mt-2 text-xs font-medium ${card.noteClass}`}>
                  {card.note}
                </p>
              </article>
            );
          })}
        </section>

        {/* Filters */}
        <div className="mb-6 flex gap-3">
          <button
            onClick={() => setActiveFilter("ALL")}
            className={`rounded-full px-5 py-2 text-sm font-bold transition-all ${
              activeFilter === "ALL"
                ? "bg-[#008080] text-white shadow-sm"
                : "border border-[#E0E6ED] bg-white text-[#2C3E50] hover:border-[#008080]"
            }`}
          >
            All Patients
          </button>

          <button
            onClick={() => setActiveFilter("COMPLETED")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
              activeFilter === "COMPLETED"
                ? "bg-[#008080] text-white shadow-sm"
                : "border border-[#E0E6ED] bg-white text-[#2C3E50] hover:border-[#008080]"
            }`}
          >
            Completed
          </button>

          <button
            onClick={() => setActiveFilter("WAITING")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
              activeFilter === "WAITING"
                ? "bg-[#008080] text-white shadow-sm"
                : "border border-[#E0E6ED] bg-white text-[#2C3E50] hover:border-[#008080]"
            }`}
          >
            Waiting
          </button>
        </div>

        {/* Table Section */}
        <div className="overflow-hidden rounded-xl border border-[#E0E6ED] bg-white shadow-sm">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-[#E0E6ED] bg-[#F7FAFA]/50">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#7F8C8D]">
                  ID
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#7F8C8D]">
                  Patient Name
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#7F8C8D]">
                  Dept
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#7F8C8D]">
                  Complaint
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#7F8C8D]">
                  Time
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#7F8C8D]">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#7F8C8D]">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E0E6ED]">
              {loading ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-10 text-center text-[#7F8C8D]"
                  >
                    Loading queue...
                  </td>
                </tr>
              ) : paginatedAppointments.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-10 text-center text-[#7F8C8D]"
                  >
                    No appointments found for today.
                  </td>
                </tr>
              ) : (
                paginatedAppointments.map((appt) => {
                  const statusInfo = getStatusDetails(appt.status);
                  return (
                    <tr
                      key={appt.id}
                      className="group transition-colors hover:bg-[#F7FAFA]"
                    >
                      <td className="px-6 py-4 text-sm font-bold text-[#2C3E50]">
                        #{appt.id}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex size-8 items-center justify-center rounded-full text-xs font-bold bg-[#008080]/10 text-[#008080]">
                            {getInitials(appt.patient_name)}
                          </div>
                          <span className="text-sm font-semibold text-[#2C3E50]">
                            {appt.patient_name}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-[#7F8C8D]">
                        {appt.department_name}
                      </td>

                      <td className="px-6 py-4 text-sm font-medium italic text-[#7F8C8D] truncate max-w-[200px]">
                        {appt.reason}
                      </td>

                      <td className="px-6 py-4 text-sm font-semibold text-[#2C3E50]">
                        {appt.time}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${statusInfo.class}`}
                        >
                          {statusInfo.label}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        {statusInfo.actionType === "button" ? (
                          <button
                            onClick={() => handleStartConsultation(appt)}
                            className="rounded-lg bg-[#008080] px-4 py-1.5 text-xs font-bold text-white transition-opacity hover:opacity-90"
                          >
                            {statusInfo.action}
                          </button>
                        ) : (
                          <button
                            className={`text-sm font-bold ${
                              statusInfo.actionType === "muted-link"
                                ? "text-[#7F8C8D] hover:text-[#2C3E50]"
                                : "text-[#008080] hover:underline"
                            }`}
                          >
                            {statusInfo.action}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-[#E0E6ED] bg-[#F7FAFA]/30 px-6 py-4">
            <p className="text-xs font-semibold uppercase text-[#7F8C8D]">
              Showing {paginatedAppointments.length} of{" "}
              {filteredAppointments.length} patients
              {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
            </p>
            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="rounded border border-[#E0E6ED] p-2 text-[#7F8C8D] disabled:opacity-50"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className="rounded border border-[#E0E6ED] p-2 text-[#7F8C8D] disabled:opacity-50"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
