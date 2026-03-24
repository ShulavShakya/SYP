import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { privateAPI } from "../../../../auth/config/api.js";
import PageLoader from "../../../../component/PageLoader.jsx";
import ErrorState from "../../../../component/ErrorState.jsx";
import {
  Plus,
  CalendarX2,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  FileText,
  X,
} from "lucide-react";

const filters = ["All", "Cardiology", "Neurology", "Pediatrics", "Orthopedics"];

function SummaryCard({
  label,
  value,
  valueClassName = "text-slate-900",
  badge,
  badgeIcon: BadgeIcon,
  badgeClassName,
  subtext,
  pill,
  pillClassName,
  accentClassName = "bg-slate-100",
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white bg-white p-6 shadow-[0px_4px_20px_rgba(0,101,101,0.03)]">
      <div
        className={`absolute right-0 top-0 h-24 w-24 rounded-bl-full transition-transform duration-300 group-hover:scale-110 ${accentClassName}`}
      />

      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
        {label}
      </p>

      <div className="flex items-baseline gap-2">
        <h3 className={`text-3xl font-extrabold ${valueClassName}`}>{value}</h3>

        {badge && BadgeIcon ? (
          <span
            className={`flex items-center text-xs font-bold ${badgeClassName}`}
          >
            <BadgeIcon size={12} className="mr-1" />
            {badge}
          </span>
        ) : null}

        {BadgeIcon && !badge ? (
          <span
            className={`flex items-center text-xs font-bold ${badgeClassName}`}
          >
            <BadgeIcon size={12} />
          </span>
        ) : null}

        {subtext ? (
          <span className="text-xs font-medium text-slate-400">{subtext}</span>
        ) : null}

        {pill ? (
          <span
            className={`ml-2 rounded-full px-2 py-0.5 text-[10px] font-bold ${pillClassName}`}
          >
            {pill}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function DoctorRow({
  doctorCode,
  name,
  username,
  specialty,
  experience,
  status,
  statusClass,
  deleting,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <tr className="transition-colors hover:bg-slate-50/50">
      <td className="px-6 py-4 text-sm font-medium text-slate-400">
        {doctorCode}
      </td>

      <td className="px-6 py-4">
        <div>
          <p className="text-sm capitalize text-slate-900">{name}</p>
          <p className="text-xs text-slate-400">{username}</p>
        </div>
      </td>

      <td className="px-6 py-4">
        <span className="text-sm font-medium text-slate-600">{specialty}</span>
      </td>

      <td className="px-6 py-4">
        <span className="text-sm text-slate-600">{experience}</span>
      </td>

      <td className="px-6 py-4">
        <span
          className={`rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest ${statusClass}`}
        >
          {status}
        </span>
      </td>

      <td className="px-6 py-4 text-right">
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="rounded-lg p-2 text-primary transition-colors hover:bg-primary/10"
            onClick={onView}
            title="View"
          >
            <Eye size={16} />
          </button>

          <button
            type="button"
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100"
            onClick={onEdit}
            title="Edit"
          >
            <Pencil size={16} />
          </button>

          <button
            type="button"
            className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={onDelete}
            disabled={deleting}
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-4">
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <p className="text-sm text-slate-900">{value || "-"}</p>
    </div>
  );
}

export default function DoctorManagement() {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [activeDoctors, setActiveDoctors] = useState(0);
  const [onLeaveDoctors, setOnLeaveDoctors] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const fetchDoctorData = async () => {
    try {
      setLoading(true);
      setError("");

      const [doctorsRes, totalRes, activeRes, onLeaveRes] = await Promise.all([
        privateAPI.get("/admin/doctors/"),
        privateAPI.get("/admin/doctors/count/"),
        privateAPI.get("/admin/doctors/active/count/"),
        privateAPI.get("/admin/doctors/on-leave/count/"),
      ]);

      const doctorList = Array.isArray(doctorsRes.data) ? doctorsRes.data : [];

      setDoctors(doctorList);
      setTotalDoctors(totalRes.data?.total_doctors || 0);
      setActiveDoctors(activeRes.data?.active_doctors || 0);
      setOnLeaveDoctors(onLeaveRes.data?.on_leave_doctors || 0);
    } catch (err) {
      console.error("Failed to fetch doctors data:", err);
      setError(
        "We couldn’t load the doctors list right now. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctorData();
  }, []);

  const handleDeleteDoctor = async (doctor) => {
    if (!doctor?.id) {
      alert("Doctor id is missing. Cannot delete this record.");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete ${doctor.name || "this doctor"}?`,
    );

    if (!confirmed) return;

    try {
      setDeleteLoadingId(doctor.id);

      await privateAPI.delete(`/admin/delete-doctor/${doctor.id}/`);

      setDoctors((prev) => prev.filter((item) => item.id !== doctor.id));
      setTotalDoctors((prev) => Math.max(0, prev - 1));

      if (doctor.status === "ACTIVE") {
        setActiveDoctors((prev) => Math.max(0, prev - 1));
      } else if (doctor.status === "ON_LEAVE") {
        setOnLeaveDoctors((prev) => Math.max(0, prev - 1));
      }

      alert("Doctor deleted successfully.");
    } catch (err) {
      console.error("Failed to delete doctor:", err);
      alert(
        err?.response?.data?.error ||
          err?.response?.data?.detail ||
          "Failed to delete doctor.",
      );
    } finally {
      setDeleteLoadingId(null);
    }
  };

  const filteredDoctors = useMemo(() => {
    if (selectedFilter === "All") return doctors;
    return doctors.filter((doctor) => doctor.specialty === selectedFilter);
  }, [doctors, selectedFilter]);

  const summaryCards = [
    {
      label: "Total Doctors",
      value: totalDoctors,
      valueClassName: "text-primary",
      subtext: "registered",
      accentClassName: "bg-primary/5",
    },
    {
      label: "Active Today",
      value: activeDoctors,
      valueClassName: "text-slate-900",
      pill: "Available",
      pillClassName: "bg-emerald-100 text-emerald-700",
      accentClassName: "bg-emerald-500/10",
    },
    {
      label: "On Leave",
      value: onLeaveDoctors,
      valueClassName: "text-slate-900",
      badgeIcon: CalendarX2,
      badgeClassName: "text-orange-600",
      accentClassName: "bg-orange-500/10",
    },
    {
      label: "New Apps",
      value: 5,
      valueClassName: "text-slate-900",
      pill: "Pending",
      pillClassName: "bg-cyan-100 text-cyan-700",
      accentClassName: "bg-cyan-500/10",
    },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "ACTIVE":
        return "bg-emerald-100 text-emerald-700";
      case "ON_LEAVE":
        return "bg-orange-100 text-orange-700";
      case "SUSPENDED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const formatStatus = (status) => {
    switch (status) {
      case "ACTIVE":
        return "Active";
      case "ON_LEAVE":
        return "On Leave";
      case "SUSPENDED":
        return "Suspended";
      default:
        return status || "Unknown";
    }
  };

  const openViewModal = (doctor) => {
    setSelectedDoctor(doctor);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setSelectedDoctor(null);
    setIsViewModalOpen(false);
  };

  if (loading) {
    return <PageLoader caption="Loading doctors..." />;
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to load doctors"
        message={error}
        onRetry={fetchDoctorData}
      />
    );
  }

  return (
    <>
      <div className="w-full bg-[#f7fafa] px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
        <div className="w-full max-w-none space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-['Manrope',sans-serif] text-3xl font-extrabold tracking-tight text-slate-900">
                Manage Doctors
              </h2>
              <p className="mt-1 text-slate-600">
                Overview and management of your medical staff.
              </p>
            </div>

            <button
              type="button"
              className="flex items-center gap-2 self-start rounded-2xl bg-gradient-to-br from-[#006565] to-[#008080] px-6 py-3 font-['Manrope',sans-serif] font-bold text-white shadow-[0px_4px_20px_rgba(0,101,101,0.05)] transition-transform hover:scale-[1.02] active:scale-95 sm:self-auto"
              onClick={() => navigate("/admin/add-doctor")}
            >
              <Plus size={18} />
              <span>+ Add Doctor</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-4 2xl:grid-cols-4">
            {summaryCards.map((card) => (
              <SummaryCard key={card.label} {...card} />
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-[#f1f4f4] p-2">
            <div className="flex flex-1 gap-2 overflow-x-auto py-1 pl-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setSelectedFilter(filter)}
                  className={
                    selectedFilter === filter
                      ? "whitespace-nowrap rounded-xl bg-white px-5 py-2 text-sm font-bold text-primary shadow-sm"
                      : "whitespace-nowrap rounded-xl px-5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-white/50"
                  }
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl bg-white shadow-[0px_4px_20px_rgba(0,101,101,0.05)]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] border-collapse text-left">
                <thead>
                  <tr className="bg-[#f1f4f4]/50">
                    <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">
                      Doctor ID
                    </th>
                    <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">
                      Name
                    </th>
                    <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">
                      Specialty
                    </th>
                    <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">
                      Experience
                    </th>
                    <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">
                      Status
                    </th>
                    <th className="px-6 py-5 text-right text-xs font-bold uppercase tracking-widest text-slate-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100/50">
                  {filteredDoctors.length > 0 ? (
                    filteredDoctors.map((doctor, index) => (
                      <DoctorRow
                        key={doctor.id ?? doctor.doctor_id ?? index}
                        doctorCode={doctor.doctor_id}
                        name={doctor.name}
                        username={doctor.username}
                        specialty={doctor.specialty}
                        experience={`${doctor.experience_years} Years`}
                        status={formatStatus(doctor.status)}
                        statusClass={getStatusClass(doctor.status)}
                        deleting={deleteLoadingId === doctor.id}
                        onView={() => openViewModal(doctor)}
                        onEdit={() =>
                          navigate(`/admin/update-doctor/${doctor.id}`)
                        }
                        onDelete={() => handleDeleteDoctor(doctor)}
                      />
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                            <FileText className="text-slate-400" size={24} />
                          </div>
                          <h3 className="mt-4 text-lg font-bold text-slate-900">
                            No doctors match this filter
                          </h3>
                          <p className="mt-2 text-sm text-slate-500">
                            Try selecting another specialty or clear the filter.
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-4 border-t border-slate-100/50 bg-[#f1f4f4]/30 p-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">
                Showing{" "}
                <span className="font-bold text-slate-900">
                  {filteredDoctors.length}
                </span>{" "}
                of{" "}
                <span className="font-bold text-slate-900">{totalDoctors}</span>{" "}
                doctors
              </p>

              <div className="flex gap-2">
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 transition-colors hover:border-primary hover:text-primary"
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary font-['Manrope',sans-serif] font-bold text-white shadow-sm"
                >
                  1
                </button>

                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 transition-colors hover:border-primary hover:text-primary"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isViewModalOpen && selectedDoctor && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/50 px-4 py-6"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeViewModal();
          }}
        >
          <div className="w-full max-w-3xl rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Doctor Details
                </h3>
                <p className="text-sm text-slate-500">
                  View complete information for this doctor
                </p>
              </div>

              <button
                type="button"
                onClick={closeViewModal}
                className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[85vh] space-y-6 overflow-y-auto p-6">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h4 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-primary">
                  Basic Information
                </h4>
                <div className="space-y-4">
                  <InfoRow label="Doctor ID" value={selectedDoctor.doctor_id} />
                  <InfoRow label="Full Name" value={selectedDoctor.name} />
                  <InfoRow label="Username" value={selectedDoctor.username} />
                  <InfoRow label="Email" value={selectedDoctor.email} />
                  <InfoRow label="Phone" value={selectedDoctor.phone} />
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h4 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-primary">
                  Professional Details
                </h4>
                <div className="space-y-4">
                  <InfoRow label="Specialty" value={selectedDoctor.specialty} />
                  <InfoRow
                    label="Experience"
                    value={
                      selectedDoctor.experience_years
                        ? `${selectedDoctor.experience_years} Years`
                        : "-"
                    }
                  />
                  <InfoRow
                    label="Qualification"
                    value={selectedDoctor.qualification}
                  />
                  <InfoRow
                    label="Department"
                    value={selectedDoctor.department}
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h4 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-primary">
                  Account Status
                </h4>
                <div className="space-y-4">
                  <InfoRow
                    label="Status"
                    value={formatStatus(selectedDoctor.status)}
                  />
                  <InfoRow
                    label="Joined Date"
                    value={selectedDoctor.joined_date}
                  />
                  <InfoRow
                    label="Last Updated"
                    value={selectedDoctor.updated_at}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
