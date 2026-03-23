import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { privateAPI } from "../../../../auth/config/api.js";
import PageLoader from "../../../../component/PageLoader.jsx";
import ErrorState from "../../../../component/ErrorState.jsx";
import EmptyState from "../../../../component/EmptyState.jsx";
import {
  Plus,
  Users,
  UserCheck,
  UserX,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  FileText,
  X,
  Mail,
  Phone,
  User,
  Calendar,
  Shield,
  Clock3,
  MapPin,
  Image as ImageIcon,
  Info,
} from "lucide-react";

const shiftFilters = ["All", "Morning", "Evening", "Night"];

function SummaryCard({
  label,
  value,
  valueClassName = "text-slate-900",
  subtext,
  pill,
  pillClassName,
  accentClassName = "bg-slate-100",
  icon: Icon,
  iconClassName = "text-slate-600",
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white bg-white p-6 shadow-[0px_4px_20px_rgba(0,101,101,0.03)]">
      <div
        className={`absolute right-0 top-0 h-24 w-24 rounded-bl-full transition-transform duration-300 group-hover:scale-110 ${accentClassName}`}
      />
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
          {label}
        </p>
        {Icon ? <Icon size={18} className={iconClassName} /> : null}
      </div>

      <div className="flex items-baseline gap-2">
        <h3 className={`text-3xl font-extrabold ${valueClassName}`}>{value}</h3>
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

function getInitials(name) {
  if (!name) return "NA";
  return name
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function ReceptionistRow({
  receptionistId,
  name,
  contact,
  shift,
  status,
  statusClass,
  striped,
  deleting,
  onView,
  onEdit,
  onDelete,
}) {
  const initials = getInitials(name);

  return (
    <tr
      className={`group transition-colors hover:bg-mint/10 ${
        striped ? "bg-background-light/50" : ""
      }`}
    >
      <td className="px-6 py-4 text-sm font-medium text-slate-500">
        {receptionistId}
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
            {initials}
          </div>
          <span className="text-sm font-bold capitalize text-slate-900">
            {name}
          </span>
        </div>
      </td>

      <td className="px-6 py-4 text-sm text-slate-600">{contact}</td>
      <td className="px-6 py-4 text-sm text-slate-600">{shift}</td>

      <td className="px-6 py-4">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest ${statusClass}`}
        >
          {status}
        </span>
      </td>

      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            className="rounded-lg p-2 text-primary transition-colors hover:bg-mint"
            onClick={onView}
            title="View"
          >
            <Eye size={18} />
          </button>

          <button
            type="button"
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-mint hover:text-primary"
            onClick={onEdit}
            title="Edit"
          >
            <Pencil size={18} />
          </button>

          <button
            type="button"
            className="rounded-lg p-2 text-red-400 transition-colors hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={onDelete}
            disabled={deleting}
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}

function SectionTitle({ icon, title }) {
  return (
    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
      <span className="text-[#008080]">{icon}</span>
      <h3 className="text-base font-bold text-slate-900">{title}</h3>
    </div>
  );
}

function Field({ label, icon, value = "", ...props }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-slate-700">{label}</label>

      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </span>
        )}

        <input
          value={value ?? ""}
          className={[
            "w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pr-4 text-sm text-slate-700 outline-none disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500",
            icon ? "pl-10" : "px-4",
          ].join(" ")}
          {...props}
        />
      </div>
    </div>
  );
}

function TextareaField({ label, icon, value = "", ...props }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-slate-700">{label}</label>

      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-3 text-slate-400">{icon}</span>
        )}

        <textarea
          rows={3}
          value={value ?? ""}
          className={[
            "w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pr-4 text-sm text-slate-700 outline-none disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500",
            icon ? "pl-10" : "px-4",
          ].join(" ")}
          {...props}
        />
      </div>
    </div>
  );
}

function normalizeShiftValue(shift) {
  if (!shift) return "";
  const upper = String(shift).toUpperCase();

  if (upper === "MORNING") return "MORNING";
  if (upper === "AFTERNOON" || upper === "EVENING") return "EVENING";
  if (upper === "NIGHT") return "NIGHT";

  return upper;
}

function formatShiftLabel(shift) {
  switch (normalizeShiftValue(shift)) {
    case "MORNING":
      return "Morning";
    case "EVENING":
      return "Evening";
    case "NIGHT":
      return "Night";
    default:
      return shift || "Unknown";
  }
}

function formatStatus(status) {
  switch (status) {
    case "ON_DUTY":
      return "On Duty";
    case "ON_LEAVE":
      return "Off Duty";
    case "SUSPENDED":
      return "Suspended";
    default:
      return status || "Unknown";
  }
}

function getStatusClass(status) {
  switch (status) {
    case "ON_DUTY":
      return "bg-emerald-100 text-emerald-700";
    case "ON_LEAVE":
      return "bg-orange-100 text-orange-700";
    case "SUSPENDED":
      return "bg-red-100 text-red-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

export default function ReceptionistManagement() {
  const navigate = useNavigate();

  const [receptionists, setReceptionists] = useState([]);
  const [totalReceptionists, setTotalReceptionists] = useState(0);
  const [onDutyReceptionists, setOnDutyReceptionists] = useState(0);
  const [offDutyReceptionists, setOffDutyReceptionists] = useState(0);
  const [selectedShift, setSelectedShift] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);

  const [selectedReceptionist, setSelectedReceptionist] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const fetchReceptionistData = async () => {
    try {
      setLoading(true);
      setError("");

      const [listRes, totalRes, onDutyRes, offDutyRes] = await Promise.all([
        privateAPI.get("/admin/receptionists/"),
        privateAPI.get("/admin/receptionists/count/"),
        privateAPI.get("/admin/receptionists/count/on-duty/"),
        privateAPI.get("/admin/receptionists/count/off-duty/"),
      ]);

      const receptionistList = Array.isArray(listRes.data) ? listRes.data : [];

      setReceptionists(receptionistList);
      setTotalReceptionists(totalRes.data?.total_receptionists || 0);
      setOnDutyReceptionists(onDutyRes.data?.on_duty_receptionists || 0);
      setOffDutyReceptionists(offDutyRes.data?.off_duty_receptionists || 0);
    } catch (err) {
      console.error("Failed to fetch receptionists data:", err);
      setError(
        "We couldn’t load the receptionist list right now. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReceptionistData();
  }, []);

  const openReceptionistModal = (receptionist) => {
    setSelectedReceptionist(receptionist);
    setImagePreview(receptionist?.profile_image || "");
  };

  const closeReceptionistModal = () => {
    setSelectedReceptionist(null);
    setImagePreview("");
  };

  const handleDeleteReceptionist = async (receptionist) => {
    if (!receptionist?.id) {
      alert("Receptionist id is missing. Cannot delete this record.");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete ${
        receptionist.name || "this receptionist"
      }?`,
    );

    if (!confirmed) return;

    try {
      setDeleteLoadingId(receptionist.id);

      await privateAPI.delete(`/admin/delete-receptionist/${receptionist.id}/`);

      setReceptionists((prev) =>
        prev.filter((item) => item.id !== receptionist.id),
      );
      setTotalReceptionists((prev) => Math.max(0, prev - 1));

      if (receptionist.status === "ON_DUTY") {
        setOnDutyReceptionists((prev) => Math.max(0, prev - 1));
      } else if (receptionist.status === "ON_LEAVE") {
        setOffDutyReceptionists((prev) => Math.max(0, prev - 1));
      }

      if (selectedReceptionist?.id === receptionist.id) {
        closeReceptionistModal();
      }

      alert("Receptionist deleted successfully.");
    } catch (err) {
      console.error("Failed to delete receptionist:", err);
      alert(
        err?.response?.data?.error ||
          err?.response?.data?.detail ||
          "Failed to delete receptionist.",
      );
    } finally {
      setDeleteLoadingId(null);
    }
  };

  const filteredReceptionists = useMemo(() => {
    if (selectedShift === "All") return receptionists;

    return receptionists.filter(
      (receptionist) =>
        formatShiftLabel(receptionist.shift).toLowerCase() ===
        selectedShift.toLowerCase(),
    );
  }, [receptionists, selectedShift]);

  const summaryCards = [
    {
      label: "Total Receptionists",
      value: totalReceptionists,
      valueClassName: "text-primary",
      subtext: "registered",
      accentClassName: "bg-primary/5",
      icon: Users,
      iconClassName: "text-primary",
    },
    {
      label: "On Duty",
      value: onDutyReceptionists,
      pill: "Available",
      pillClassName: "bg-emerald-100 text-emerald-700",
      accentClassName: "bg-emerald-500/10",
      icon: UserCheck,
      iconClassName: "text-emerald-600",
    },
    {
      label: "Off Duty",
      value: offDutyReceptionists,
      accentClassName: "bg-orange-500/10",
      icon: UserX,
      iconClassName: "text-orange-600",
    },
  ];

  if (loading) {
    return <PageLoader caption="Loading receptionists..." />;
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to load receptionists"
        message={error}
        onRetry={fetchReceptionistData}
      />
    );
  }

  return (
    <div className="w-full bg-[#f7fafa] px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
      <div className="w-full max-w-none space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-['Manrope',sans-serif] text-3xl font-extrabold tracking-tight text-slate-900">
              Receptionist Management
            </h2>
            <p className="mt-1 text-slate-600">
              Overview and management of front-desk staff.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={fetchReceptionistData}
              className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              <RefreshCw size={18} />
              Refresh
            </button>

            <button
              type="button"
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-br from-[#006565] to-[#008080] px-6 py-3 font-['Manrope',sans-serif] font-bold text-white shadow-[0px_4px_20px_rgba(0,101,101,0.05)] transition-transform hover:scale-[1.02] active:scale-95"
              onClick={() => navigate("/admin/add-receptionist")}
            >
              <Plus size={18} />
              <span>Add Receptionist</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {summaryCards.map((card) => (
            <SummaryCard key={card.label} {...card} />
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-surface-container-low/50 p-2 backdrop-blur-sm">
          <div className="flex flex-1 gap-2 overflow-x-auto py-1 pl-2">
            {shiftFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setSelectedShift(filter)}
                className={
                  selectedShift === filter
                    ? "whitespace-nowrap rounded-xl bg-white px-5 py-2 text-sm font-bold text-primary shadow-sm"
                    : "whitespace-nowrap rounded-xl px-5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-white/50"
                }
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-primary/5 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-primary/10 bg-mint/30">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-primary">
                    Receptionist ID
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-primary">
                    Name
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-primary">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-primary">
                    Shift
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-primary">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-primary">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredReceptionists.length > 0 ? (
                  filteredReceptionists.map((receptionist, index) => (
                    <ReceptionistRow
                      key={
                        receptionist.id ?? receptionist.Receptionist_id ?? index
                      }
                      receptionistId={receptionist.Receptionist_id}
                      name={receptionist.name}
                      contact={receptionist.phone}
                      shift={formatShiftLabel(receptionist.shift)}
                      status={formatStatus(receptionist.status)}
                      statusClass={getStatusClass(receptionist.status)}
                      striped={index % 2 !== 0}
                      deleting={deleteLoadingId === receptionist.id}
                      onView={() => openReceptionistModal(receptionist)}
                      onEdit={() =>
                        navigate(
                          `/admin/update-receptionist/${receptionist.id}`,
                        )
                      }
                      onDelete={() => handleDeleteReceptionist(receptionist)}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-10">
                      <EmptyState
                        title="No receptionists found"
                        message="No receptionist records match the selected shift."
                        icon={FileText}
                      />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-bold text-slate-900">
                {filteredReceptionists.length}
              </span>{" "}
              receptionist
              {filteredReceptionists.length !== 1 ? "s" : ""}
            </p>

            <div className="flex items-center gap-2">
              <button className="rounded p-2 opacity-50" disabled type="button">
                <ChevronLeft size={18} />
              </button>
              <button
                className="flex h-8 w-8 items-center justify-center rounded bg-primary text-sm font-bold text-white"
                type="button"
              >
                1
              </button>
              <button className="rounded p-2 opacity-50" disabled type="button">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {selectedReceptionist && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
          <div className="max-h-[95vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Receptionist Details
                </h2>
                <p className="text-sm text-slate-500">
                  View receptionist information
                </p>
              </div>

              <button
                type="button"
                onClick={closeReceptionistModal}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[calc(95vh-88px)] overflow-y-auto p-6 md:p-8">
              <div className="space-y-8">
                <section className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm">
                  <SectionTitle
                    icon={<User size={18} />}
                    title="Personal Information"
                  />

                  <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="md:col-span-2 flex flex-col gap-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 md:flex-row md:items-center">
                      <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200">
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Receptionist preview"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <ImageIcon size={28} className="text-slate-400" />
                        )}
                      </div>

                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-800">
                          Profile Image
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          Uploaded profile picture
                        </p>
                      </div>
                    </div>

                    <Field
                      label="Full Name"
                      value={selectedReceptionist.name}
                      icon={<User size={18} />}
                      disabled
                    />

                    <Field
                      label="Gender"
                      value={selectedReceptionist.gender}
                      icon={<Users size={18} />}
                      disabled
                    />

                    <Field
                      label="Date of Birth"
                      value={selectedReceptionist.dob}
                      icon={<Calendar size={18} />}
                      disabled
                    />

                    <Field
                      label="Phone Number"
                      value={selectedReceptionist.phone}
                      icon={<Phone size={18} />}
                      disabled
                    />

                    <div className="md:col-span-2">
                      <Field
                        label="Email Address"
                        value={selectedReceptionist.email}
                        icon={<Mail size={18} />}
                        disabled
                      />
                    </div>

                    <div className="md:col-span-2">
                      <TextareaField
                        label="Residential Address"
                        value={selectedReceptionist.address}
                        icon={<MapPin size={18} />}
                        disabled
                      />
                    </div>
                  </div>
                </section>

                <section className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm">
                  <SectionTitle
                    icon={<Clock3 size={18} />}
                    title="Work Assignment"
                  />

                  <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Field
                      label="Receptionist ID"
                      value={selectedReceptionist.Receptionist_id}
                      icon={<Shield size={18} />}
                      disabled
                    />

                    <Field
                      label="Shift Timing"
                      value={formatShiftLabel(selectedReceptionist.shift)}
                      icon={<Clock3 size={18} />}
                      disabled
                    />

                    <Field
                      label="Status"
                      value={formatStatus(selectedReceptionist.status)}
                      icon={<Info size={18} />}
                      disabled
                    />

                    <div className="md:col-span-2">
                      <Field
                        label="Username"
                        value={selectedReceptionist.username}
                        icon={<Mail size={18} />}
                        disabled
                      />
                    </div>
                  </div>
                </section>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-slate-200 bg-white px-6 py-4">
              <div className="flex items-center gap-2 text-slate-500">
                <Info size={16} />
                <span className="text-xs font-medium">
                  Viewing receptionist details.
                </span>
              </div>

              <button
                type="button"
                onClick={closeReceptionistModal}
                className="rounded-xl px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
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
