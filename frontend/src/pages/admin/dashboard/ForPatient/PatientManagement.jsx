import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLoader from "../../../../component/PageLoader";
import ErrorState from "../../../../component/ErrorState";
import {
  UserPlus,
  ArrowUp,
  AlertCircle,
  FilterX,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
  Mail,
  MapPin,
  Shield,
  User,
  Calendar,
  Phone,
} from "lucide-react";
import { privateAPI } from "../../../../auth/config/api";

function SummaryCard({
  label,
  value,
  valueClassName,
  badge,
  badgeIcon: BadgeIcon,
  badgeClassName,
  subtext,
  pill,
  pillClassName,
  accentClassName,
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white bg-white p-6 shadow-[0px_4px_20px_rgba(0,101,101,0.03)]">
      <div
        className={`absolute right-0 top-0 h-24 w-24 rounded-bl-full transition-transform group-hover:scale-110 ${accentClassName}`}
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

function DetailItem({ label, value, icon: Icon }) {
  return (
    <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-4">
      <p className="flex items-center gap-2 text-sm font-semibold text-slate-500">
        {Icon ? <Icon size={14} className="text-primary" /> : null}
        {label}
      </p>
      <p className="text-sm text-slate-900">{value || "-"}</p>
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

function calculateAge(dob) {
  if (!dob || typeof dob !== "string") return "N/A";

  const match = dob.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return "N/A";

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  const birthDate = new Date(year, month - 1, day);

  if (
    birthDate.getFullYear() !== year ||
    birthDate.getMonth() !== month - 1 ||
    birthDate.getDate() !== day
  ) {
    return "N/A";
  }

  const today = new Date();
  let age = today.getFullYear() - year;

  const hadBirthday =
    today.getMonth() > month - 1 ||
    (today.getMonth() === month - 1 && today.getDate() >= day);

  if (!hadBirthday) age -= 1;

  return age >= 0 && age <= 130 ? age : "N/A";
}

function formatDate(dateString) {
  if (!dateString) return "No visit yet";

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "No visit yet";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

function formatDOB(dateString) {
  if (!dateString) return "Not provided";

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "Not provided";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

function PatientRow({
  patientId,
  name,
  age,
  gender,
  contact,
  lastVisit,
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
        {patientId}
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
            {initials}
          </div>
          <span className="text-sm font-bold text-slate-900">{name}</span>
        </div>
      </td>

      <td className="px-6 py-4 text-sm text-slate-600">{age}</td>
      <td className="px-6 py-4 text-sm text-slate-600">{gender}</td>
      <td className="px-6 py-4 text-sm text-slate-600">{contact}</td>
      <td className="px-6 py-4 text-sm text-slate-600">{lastVisit}</td>

      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-2">
          <button
            className="rounded-lg p-2 text-primary transition-colors hover:bg-mint"
            title="View Details"
            type="button"
            onClick={onView}
          >
            <Eye size={18} />
          </button>

          <button
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-mint hover:text-primary"
            title="Edit Record"
            type="button"
            onClick={onEdit}
          >
            <Pencil size={18} />
          </button>

          <button
            className="rounded-lg p-2 text-red-400 transition-colors hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
            title="Delete Record"
            type="button"
            onClick={onDelete}
            disabled={deleting}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default function PatientManagement() {
  const [patients, setPatients] = useState([]);
  const [totalPatients, setTotalPatients] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const navigate = useNavigate();

  const fetchPatientData = async () => {
    try {
      setLoading(true);
      setError("");

      const [countRes, patientsRes] = await Promise.all([
        privateAPI.get("/admin/patients/count/"),
        privateAPI.get("/admin/patients/"),
      ]);

      const patientList = Array.isArray(patientsRes.data)
        ? patientsRes.data
        : [];

      const mappedPatients = patientList.map((patient, index) => ({
        id: patient.id ?? null,
        rowKey: patient.id ?? `patient-row-${index}`,
        patientId: patient.patient_id || `PAT-${patient.id ?? index}`,
        name:
          `${patient.first_name || ""} ${patient.last_name || ""}`.trim() ||
          "Unknown Patient",
        age: calculateAge(patient.dob),
        dob: patient.dob || "",
        gender: patient.gender || "N/A",
        contact: patient.phone || "N/A",
        phone: patient.phone || "",
        email: patient.username || "",
        address: patient.address || "",
        emergencyContactName: patient.emergency_contact_name || "",
        emergencyContactPhone: patient.emergency_contact_phone || "",
        profileImage: patient.profile_image || "",
        lastVisit: formatDate(patient.last_visit),
        striped: index % 2 !== 0,
      }));

      setTotalPatients(countRes.data?.total_patients || 0);
      setPatients(mappedPatients);
    } catch (err) {
      console.error("Failed to fetch patient data:", err);
      setError("Unable to load the patient list right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatientData();
  }, []);

  const handleDeletePatient = async (patient) => {
    if (!patient.id) {
      alert("Patient id is missing. Cannot delete this record.");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete ${patient.name}?`,
    );

    if (!confirmed) return;

    try {
      setDeleteLoadingId(patient.id);

      await privateAPI.delete(`/admin/delete-patient/${patient.id}/`);

      setPatients((prev) => prev.filter((item) => item.id !== patient.id));
      setTotalPatients((prev) => Math.max(0, prev - 1));

      if (selectedPatient?.id === patient.id) {
        setSelectedPatient(null);
      }

      alert("Patient deleted successfully.");
    } catch (err) {
      console.error("Delete failed:", err);
      alert(
        err?.response?.data?.error ||
          err?.response?.data?.detail ||
          "Failed to delete patient.",
      );
    } finally {
      setDeleteLoadingId(null);
    }
  };

  const summaryCards = useMemo(
    () => [
      {
        label: "Total Patients",
        value: loading ? "..." : totalPatients.toLocaleString(),
        valueClassName: "text-primary",
        badge: "Live",
        badgeIcon: ArrowUp,
        badgeClassName: "text-secondary",
        accentClassName: "bg-primary/5",
      },
      {
        label: "New Registrations",
        value: "--",
        valueClassName: "text-on-surface",
        subtext: "not connected",
        accentClassName: "bg-secondary/5",
      },
      {
        label: "Admitted",
        value: "--",
        valueClassName: "text-on-surface",
        badgeIcon: AlertCircle,
        badgeClassName: "text-error",
        accentClassName: "bg-tertiary-container/5",
      },
      {
        label: "Follow-up Required",
        value: "--",
        valueClassName: "text-[#8b4823]",
        pill: "Pending API",
        pillClassName: "bg-orange-100 text-[#341100]",
        accentClassName: "bg-[#ffb692]/10",
      },
    ],
    [totalPatients, loading],
  );

  if (loading) {
    return <PageLoader caption="Loading patients..." />;
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to load patients"
        message={error}
        onRetry={fetchPatientData}
      />
    );
  }

  return (
    <div className="w-full bg-[#f7fafa] px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
      <div className="w-full max-w-none space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold leading-none tracking-tight text-on-surface">
              Patient Management
            </h1>
            <p className="mt-2 font-body text-slate-500">
              Manage and track all hospital patient records across departments.
            </p>
          </div>

          <button
            className="flex items-center gap-2 self-start rounded-xl bg-gradient-to-br from-[#006565] to-[#008080] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#006565]/20 transition-transform active:scale-95 sm:self-auto"
            onClick={() => navigate("/admin/add-patient")}
          >
            <UserPlus size={18} />
            Add Patient
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => (
            <SummaryCard key={card.label} {...card} />
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-surface-container-low/50 p-2 backdrop-blur-sm">
          <div className="flex items-center gap-2 rounded-xl border border-[#bdc9c8]/20 bg-white px-3 py-2">
            <span className="text-xs font-bold uppercase text-slate-400">
              Gender
            </span>
            <select className="border-none bg-transparent p-0 pr-8 text-sm font-semibold focus:ring-0">
              <option>All</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <button className="ml-auto flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-primary transition-colors hover:bg-white">
            <FilterX size={18} />
            Reset Filters
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border border-primary/5 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-primary/10 bg-mint/30">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-primary">
                    Patient ID
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-primary">
                    Name
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-primary">
                    Age
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-primary">
                    Gender
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-primary">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-primary">
                    Last Visit
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-primary">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {patients.length > 0 ? (
                  patients.map((patient) => (
                    <PatientRow
                      key={patient.rowKey}
                      {...patient}
                      deleting={deleteLoadingId === patient.id}
                      onView={() => setSelectedPatient(patient)}
                      onEdit={() => console.log("Edit", patient)}
                      onDelete={() => handleDeletePatient(patient)}
                    />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-10 text-center text-sm text-slate-500"
                    >
                      No patients found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
            <p className="text-sm text-slate-500">
              Showing {patients.length} patient
              {patients.length !== 1 ? "s" : ""}
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

      {selectedPatient && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/50 px-4 py-6"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedPatient(null);
          }}
        >
          <div className="w-full max-w-3xl rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Patient Details
                </h3>
                <p className="text-sm text-slate-500">
                  View complete information for this patient
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPatient(null)}
                className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[85vh] space-y-6 overflow-y-auto p-6">
              <div className="mb-2 flex items-center gap-4">
                {selectedPatient.profileImage ? (
                  <img
                    src={selectedPatient.profileImage}
                    alt={selectedPatient.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                    {getInitials(selectedPatient.name)}
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {selectedPatient.name}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {selectedPatient.patientId}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h4 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-primary">
                  Basic Information
                </h4>
                <div className="space-y-4">
                  <DetailItem
                    label="Patient ID"
                    value={selectedPatient.patientId}
                    icon={User}
                  />
                  <DetailItem
                    label="Full Name"
                    value={selectedPatient.name}
                    icon={User}
                  />
                  <DetailItem
                    label="Gender"
                    value={selectedPatient.gender}
                    icon={User}
                  />
                  <DetailItem
                    label="Date of Birth"
                    value={formatDOB(selectedPatient.dob)}
                    icon={Calendar}
                  />
                  <DetailItem
                    label="Age"
                    value={selectedPatient.age}
                    icon={Calendar}
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h4 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-primary">
                  Contact Information
                </h4>
                <div className="space-y-4">
                  <DetailItem
                    label="Phone Number"
                    value={selectedPatient.phone}
                    icon={Phone}
                  />
                  <DetailItem
                    label="Email Address"
                    value={selectedPatient.email}
                    icon={Mail}
                  />
                  <DetailItem
                    label="Residential Address"
                    value={selectedPatient.address}
                    icon={MapPin}
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h4 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-primary">
                  Emergency Contact
                </h4>
                <div className="space-y-4">
                  <DetailItem
                    label="Emergency Contact Name"
                    value={selectedPatient.emergencyContactName}
                    icon={User}
                  />
                  <DetailItem
                    label="Emergency Contact Phone"
                    value={selectedPatient.emergencyContactPhone}
                    icon={Shield}
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h4 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-primary">
                  Visit Information
                </h4>
                <div className="space-y-4">
                  <DetailItem
                    label="Last Visit"
                    value={selectedPatient.lastVisit}
                    icon={Calendar}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
