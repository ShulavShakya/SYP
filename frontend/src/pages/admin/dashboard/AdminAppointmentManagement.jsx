import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  XCircle,
  Filter,
  CalendarRange,
  UserRound,
  Building2,
  Flag,
  Eye,
  ChevronLeft,
  ChevronRight,
  Plus,
  Activity,
  Check,
  X,
  User,
  Stethoscope,
  ClipboardList,
  Loader2,
} from "lucide-react";
import { privateAPI } from "../../../auth/config/api.js";
import PageLoader from "../../../component/PageLoader.jsx";

// --- Helpers ---
const isAwaiting = (app) => app.r_status === false;
const isAccepted = (app) => app.r_status === true;

const getStatusMeta = (app) => {
  if (isAccepted(app)) {
    return {
      label: "Accepted",
      className: "bg-emerald-100 text-emerald-700",
    };
  }

  switch (app.status?.toUpperCase()) {
    case "PENDING":
      return { label: "Pending", className: "bg-orange-100 text-orange-700" };
    case "SCHEDULED":
      return { label: "Scheduled", className: "bg-blue-100 text-blue-700" };
    case "COMPLETED":
      return { label: "Completed", className: "bg-slate-200 text-slate-600" };
    case "CANCELLED":
      return { label: "Cancelled", className: "bg-red-100 text-red-700" };
    default:
      return { label: "Unknown", className: "bg-slate-100 text-slate-500" };
  }
};

// --- Modal ---
function AppointmentDetailsModal({ app, onClose }) {
  if (!app) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="bg-primary p-6 text-white flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold">Appointment Details</h3>
            <p className="text-sm opacity-80">ID: #{app.id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-slate-100 rounded-lg text-slate-500">
                <User size={18} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">
                  Patient
                </p>
                <p className="text-sm font-bold text-slate-800">
                  {app.patient_name}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-slate-100 rounded-lg text-slate-500">
                <Stethoscope size={18} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">
                  Doctor
                </p>
                <p className="text-sm font-bold text-slate-800">
                  {app.doctor_name}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-2 mb-2 text-slate-500">
              <ClipboardList size={16} />
              <p className="text-[10px] uppercase font-bold">
                Reason for Visit
              </p>
            </div>
            <p className="text-sm text-slate-700 italic leading-relaxed">
              "{app.reason || "No specific reason provided."}"
            </p>
          </div>

          <div className="flex justify-between items-center pt-2">
            <div className="flex flex-col">
              <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                Clinic Arrival
              </p>
              <span
                className={`text-[10px] font-black px-3 py-1 rounded-full uppercase border ${
                  isAwaiting(app)
                    ? "bg-slate-100 text-slate-400 border-slate-200"
                    : "bg-emerald-50 text-emerald-600 border-emerald-100"
                }`}
              >
                {isAwaiting(app) ? "Awaiting" : "Accepted"}
              </span>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Sub-Components ---
function SummaryCard({
  label,
  value,
  badge,
  badgeClassName,
  accentClassName,
  icon: Icon,
  iconClassName,
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <div
        className={`absolute right-0 top-0 h-24 w-24 rounded-bl-full opacity-60 transition-transform group-hover:scale-110 ${accentClassName}`}
      />
      <div className="mb-4 flex items-start justify-between">
        <div className={`rounded-xl p-2.5 ${iconClassName}`}>
          <Icon size={18} />
        </div>
        {badge && (
          <span className={`text-xs font-bold ${badgeClassName}`}>{badge}</span>
        )}
      </div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
        {label}
      </p>
      <h3 className="font-['Manrope',sans-serif] text-3xl font-extrabold text-slate-900">
        {value}
      </h3>
    </div>
  );
}

function FilterSelect({ icon: Icon, options, value, onChange }) {
  return (
    <div className="min-w-[160px] flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 focus-within:border-primary/20">
      <div className="flex items-center gap-2">
        <Icon size={16} className="text-slate-400" />
        <select
          className="w-full cursor-pointer border-none bg-transparent p-0 text-sm font-medium text-slate-700 focus:ring-0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default function AdminAppointmentManagement() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  // Filter States
  const [filterDate, setFilterDate] = useState("All Dates");
  const [filterDept, setFilterDept] = useState("All Departments");
  const [filterStatus, setFilterStatus] = useState("All Status");

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await privateAPI.get("/admin/appointments/");
      setAppointments(
        Array.isArray(response.data) ? response.data : response.data.data || [],
      );
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setTimeout(() => setLoading(false), 600);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Accept/Reject status update (PENDING → SCHEDULED or CANCELLED)
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      setActionLoading(id);
      await privateAPI.patch(`/admin/appointments/${id}/update-status/`, {
        status: newStatus,
      });
      await fetchAppointments();
    } catch (error) {
      alert("Failed to update status.");
    } finally {
      setActionLoading(null);
    }
  };

  // Accept checked-in patient (r_status awaiting → accepted)
  const handleAcceptCheckedIn = async (id) => {
    try {
      setActionLoading(id);
      await privateAPI.patch(`/admin/appointments/${id}/yes/`);
      await fetchAppointments();
    } catch {
      alert("Failed to accept request.");
    } finally {
      setActionLoading(null);
    }
  };

  // Summary Calculations
  const stats = useMemo(() => {
    const todayStr = new Date().toLocaleDateString("en-CA");
    return {
      today: appointments.filter((a) => a.date === todayStr).length,
      completed: appointments.filter((a) => a.status === "COMPLETED").length,
      pending: appointments.filter((a) => a.status === "PENDING").length,
      cancelled: appointments.filter((a) => a.status === "CANCELLED").length,
    };
  }, [appointments]);

  // Filtering
  const filteredAppointments = useMemo(() => {
    const now = new Date();
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

    return appointments.filter((app) => {
      const statusMeta = getStatusMeta(app);

      const dateMatch =
        filterDate === "All Dates" ||
        (filterDate === "Today" && app.date === todayStr);

      const deptMatch =
        filterDept === "All Departments" || app.department_name === filterDept;

      const statusMatch =
        filterStatus === "All Status" ||
        statusMeta.label.toUpperCase() === filterStatus.toUpperCase();

      return dateMatch && deptMatch && statusMatch;
    });
  }, [appointments, filterDate, filterDept, filterStatus]);

  if (loading) {
    return <PageLoader caption="Loading Appointments..." />;
  }

  return (
    <div className="w-full bg-[#f7fafa] px-4 py-6 text-slate-900 sm:px-6 lg:px-8 xl:px-10 font-sans antialiased">
      <AppointmentDetailsModal
        app={selectedApp}
        onClose={() => setSelectedApp(null)}
      />

      <div className="w-full max-w-none">
        {/* Header */}
        <div className="mb-8">
          <h2 className="font-['Manrope',sans-serif] text-3xl font-extrabold tracking-tight text-slate-900">
            Appointment Management
          </h2>
          <p className="mt-1 font-medium text-slate-500">
            Manage and track all hospital appointments across departments.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            label="Appointments Today"
            value={stats.today}
            accentClassName="bg-teal-100"
            icon={CalendarDays}
            iconClassName="bg-teal-50 text-teal-700"
          />
          <SummaryCard
            label="Completed"
            value={stats.completed}
            accentClassName="bg-emerald-100"
            icon={CheckCircle2}
            iconClassName="bg-emerald-50 text-emerald-700"
          />
          <SummaryCard
            label="Pending"
            value={stats.pending}
            accentClassName="bg-orange-100"
            icon={Clock3}
            iconClassName="bg-orange-50 text-orange-700"
          />
          <SummaryCard
            label="Cancelled"
            value={stats.cancelled}
            accentClassName="bg-red-100"
            icon={XCircle}
            iconClassName="bg-red-50 text-red-700"
          />
        </div>

        <div className="space-y-6">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-slate-100 p-4">
            <FilterSelect
              icon={CalendarRange}
              value={filterDate}
              onChange={setFilterDate}
              options={["All Dates", "Today"]}
            />
            <FilterSelect
              icon={Building2}
              value={filterDept}
              onChange={setFilterDept}
              options={[
                "All Departments",
                "Cardiology",
                "Neurology",
                "Pediatrics",
                "Dermatology",
                "Orthopedics",
              ]}
            />
            <FilterSelect
              icon={Flag}
              value={filterStatus}
              onChange={setFilterStatus}
              options={[
                "All Status",
                "Pending",
                "Scheduled",
                "Completed",
                "Cancelled",
                "Accepted",
              ]}
            />
            <button
              onClick={fetchAppointments}
              className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2 text-sm font-bold text-white shadow-lg transition-all hover:opacity-90"
            >
              <Activity size={16} />
              Refresh
            </button>
          </div>

          {/* Table Container - Full Width */}
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/50">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] border-collapse text-left">
                <thead>
                  <tr className="bg-slate-100/70">
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-500">
                      ID
                    </th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-500">
                      Patient
                    </th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-500">
                      Doctor
                    </th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-500">
                      Department
                    </th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-500">
                      Date & Time
                    </th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-500">
                      Status
                    </th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-right">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredAppointments.map((app) => {
                    const statusMeta = getStatusMeta(app);
                    const isLoadingThis = actionLoading === app.id;

                    return (
                      <tr
                        key={app.id}
                        className="group transition-colors hover:bg-slate-50/70"
                      >
                        <td className="px-6 py-4 text-sm font-bold text-teal-700">
                          #{app.id}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold uppercase">
                              {app.patient_name?.charAt(0)}
                            </div>
                            <span className="text-sm font-semibold text-slate-900">
                              {app.patient_name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-slate-900">
                          {app.doctor_name}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700">
                          {app.department_name}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-semibold text-slate-900">
                            {app.date}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {app.time?.slice(0, 5)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${statusMeta.className}`}
                          >
                            {statusMeta.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {isLoadingThis ? (
                              <Loader2
                                size={16}
                                className="animate-spin text-slate-400"
                              />
                            ) : isAwaiting(app) ? (
                              <>
                                <button
                                  onClick={() => handleAcceptCheckedIn(app.id)}
                                  className="rounded-lg p-2 text-emerald-600 bg-emerald-50 hover:bg-emerald-600 hover:text-white transition-all"
                                  title="Accept Check-in"
                                >
                                  <Check size={16} />
                                </button>
                                <button
                                  onClick={() =>
                                    handleStatusUpdate(app.id, "CANCELLED")
                                  }
                                  className="rounded-lg p-2 text-red-600 bg-red-50 hover:bg-red-600 hover:text-white transition-all"
                                  title="Reject"
                                >
                                  <X size={16} />
                                </button>
                              </>
                            ) : !isAccepted(app) && app.status === "PENDING" ? (
                              <>
                                <button
                                  onClick={() =>
                                    handleStatusUpdate(app.id, "SCHEDULED")
                                  }
                                  className="rounded-lg p-2 text-emerald-600 bg-emerald-50 hover:bg-emerald-600 hover:text-white transition-all"
                                  title="Accept"
                                >
                                  <Check size={16} />
                                </button>
                                <button
                                  onClick={() =>
                                    handleStatusUpdate(app.id, "CANCELLED")
                                  }
                                  className="rounded-lg p-2 text-red-600 bg-red-50 hover:bg-red-600 hover:text-white transition-all"
                                  title="Reject"
                                >
                                  <X size={16} />
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => setSelectedApp(app)}
                                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
                                title="View Details"
                              >
                                <Eye size={16} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/80 px-6 py-4">
              <p className="text-xs font-medium text-slate-500">
                Showing {filteredAppointments.length} records
              </p>
              <div className="flex gap-2">
                <button className="rounded-lg border border-slate-200 bg-white p-1 hover:bg-slate-50">
                  <ChevronLeft size={18} />
                </button>
                <button className="rounded-lg border border-slate-200 bg-white p-1 hover:bg-slate-50">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => navigate("/reception/add-appointment")}
        className="fixed bottom-8 right-8 z-50 flex items-center gap-2 rounded-full bg-primary p-4 text-white shadow-2xl transition-all hover:scale-105 hover:bg-primary-container group"
      >
        <Plus size={24} />
        <span className="max-w-0 overflow-hidden whitespace-nowrap font-bold transition-all duration-300 group-hover:max-w-xs group-hover:ml-2">
          New Appointment
        </span>
      </button>
    </div>
  );
}
