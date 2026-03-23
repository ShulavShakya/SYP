import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  UserPlus,
  X,
  User,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Shield,
} from "lucide-react";
import { privateAPI } from "../../../auth/config/api";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

function InfoBlock({ icon, label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 px-4 py-3">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        <span className="text-primary">{icon}</span>
        <span>{label}</span>
      </div>
      <p className="mt-2 text-sm font-medium text-slate-800">
        {value || "Not provided"}
      </p>
    </div>
  );
}

function calculateAge(dob) {
  if (!dob) return "N/A";

  const birthDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
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

export default function PatientRecord() {
  const navigate = useNavigate();
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await privateAPI.get("/receptionist/patients/");
        setPatients(response.data || []);
      } catch (err) {
        setError(
          err?.response?.data?.error ||
            err?.response?.data?.detail ||
            err.message ||
            "Failed to fetch patients",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const mappedPatients = useMemo(() => {
    return patients.map((patient, index) => {
      const profileImage = patient.profile_image
        ? patient.profile_image.startsWith("http")
          ? patient.profile_image
          : `${BASE_URL}${patient.profile_image}`
        : "";

      return {
        rawId: patient.id,
        id: patient.patient_id || `#${patient.id}`,
        fullName: patient.full_name || "Unknown Patient",
        name: patient.full_name || "Unknown Patient",
        initials: getInitials(patient.full_name),
        age: calculateAge(patient.dob),
        dob: patient.dob || "",
        gender: patient.gender || "N/A",
        phone: patient.phone || "Not provided",
        email: patient.username || "Not provided",
        address: patient.address || "Not provided",
        bloodGroup: patient.blood_group || "Not provided",
        profileImage,
        emergencyContactName: patient.emergency_contact_name || "Not provided",
        emergencyContactPhone:
          patient.emergency_contact_phone || "Not provided",
        lastVisit: formatDate(patient.recent_visit),
        recentVisitRaw: patient.recent_visit,
        createdAt: patient.created_at,
        striped: index % 2 !== 0,
      };
    });
  }, [patients]);

  if (loading) {
    return (
      <div className="p-10 text-center text-slate-600">Loading patients...</div>
    );
  }

  if (error) {
    return <div className="p-10 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-background-light font-display text-slate-900">
      <div className="flex min-h-screen flex-col">
        <main className="mx-auto w-full max-w-7xl px-8 py-8">
          <div className="mb-8 rounded-xl border border-primary/5 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 rounded-xl bg-background-light p-1">
                  <button className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all">
                    All Patients
                  </button>
                  <button className="rounded-lg px-5 py-2.5 text-sm font-semibold text-slate-600 transition-all hover:bg-mint">
                    Recent Visits
                  </button>
                  <button className="rounded-lg px-5 py-2.5 text-sm font-semibold text-slate-600 transition-all hover:bg-mint">
                    Active Patients
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50">
                    <span className="material-symbols-outlined text-xl">
                      filter_list
                    </span>
                    More Filters
                  </button>
                  <button
                    className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90"
                    onClick={() => navigate("/reception/register")}
                  >
                    <UserPlus size={18} />
                    Add New Patient
                  </button>
                </div>
              </div>
            </div>
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
                  {mappedPatients.length > 0 ? (
                    mappedPatients.map((patient) => (
                      <tr
                        key={patient.rawId}
                        className={`group transition-colors hover:bg-mint/10 ${
                          patient.striped ? "bg-background-light/50" : ""
                        }`}
                      >
                        <td className="px-6 py-4 text-sm font-medium text-slate-500">
                          {patient.id}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {patient.profileImage ? (
                              <img
                                src={patient.profileImage}
                                alt={patient.fullName}
                                className="size-8 rounded-full object-cover"
                              />
                            ) : (
                              <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                                {patient.initials}
                              </div>
                            )}
                            <span className="text-sm font-bold text-slate-900">
                              {patient.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {patient.age}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {patient.gender}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {patient.phone}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {patient.lastVisit}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              className="rounded-lg p-2 text-primary transition-colors hover:bg-mint"
                              title="View Details"
                              type="button"
                              onClick={() => setSelectedPatient(patient)}
                            >
                              <Eye size={18} />
                            </button>
                            <button
                              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-mint hover:text-primary"
                              title="Edit Record"
                              type="button"
                            >
                              <Edit size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
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
                Showing {mappedPatients.length} patient
                {mappedPatients.length !== 1 ? "s" : ""}
              </p>
              <div className="flex items-center gap-2">
                <button
                  className="rounded p-2 opacity-50"
                  disabled
                  type="button"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  className="flex h-8 w-8 items-center justify-center rounded bg-primary text-sm font-bold text-white"
                  type="button"
                >
                  1
                </button>
                <button
                  className="rounded p-2 opacity-50"
                  disabled
                  type="button"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {selectedPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Patient Details
                </h2>
                <p className="text-sm text-slate-500">
                  Full patient information
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPatient(null)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[calc(90vh-80px)] overflow-y-auto p-6">
              <div className="mb-6 flex items-center gap-4">
                {selectedPatient.profileImage ? (
                  <img
                    src={selectedPatient.profileImage}
                    alt={selectedPatient.fullName}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                    {selectedPatient.initials}
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {selectedPatient.fullName}
                  </h3>
                  <p className="text-sm text-slate-500">{selectedPatient.id}</p>
                </div>
              </div>

              <div className="space-y-6">
                <section>
                  <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">
                    Personal Information
                  </h4>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <InfoBlock
                      icon={<User size={14} />}
                      label="Full Name"
                      value={selectedPatient.fullName}
                    />
                    <InfoBlock
                      icon={<Calendar size={14} />}
                      label="Age"
                      value={selectedPatient.age}
                    />
                    <InfoBlock
                      icon={<Calendar size={14} />}
                      label="Date of Birth"
                      value={selectedPatient.dob}
                    />
                    <InfoBlock
                      icon={<User size={14} />}
                      label="Gender"
                      value={selectedPatient.gender}
                    />
                  </div>
                </section>

                <section>
                  <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">
                    Contact Information
                  </h4>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <InfoBlock
                      icon={<Phone size={14} />}
                      label="Phone Number"
                      value={selectedPatient.phone}
                    />
                    <InfoBlock
                      icon={<Mail size={14} />}
                      label="Email Address"
                      value={selectedPatient.email}
                    />
                    <div className="md:col-span-2">
                      <InfoBlock
                        icon={<MapPin size={14} />}
                        label="Residential Address"
                        value={selectedPatient.address}
                      />
                    </div>
                  </div>
                </section>

                <section>
                  <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">
                    Emergency Contact
                  </h4>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <InfoBlock
                      icon={<Shield size={14} />}
                      label="Emergency Contact Name"
                      value={selectedPatient.emergencyContactName}
                    />
                    <InfoBlock
                      icon={<Phone size={14} />}
                      label="Emergency Contact Phone"
                      value={selectedPatient.emergencyContactPhone}
                    />
                  </div>
                </section>

                <section>
                  <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">
                    Visit Information
                  </h4>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <InfoBlock
                      icon={<Calendar size={14} />}
                      label="Last Visit"
                      value={selectedPatient.lastVisit}
                    />
                    <InfoBlock
                      icon={<User size={14} />}
                      label="Patient ID"
                      value={selectedPatient.id}
                    />
                  </div>
                </section>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
              <button
                type="button"
                onClick={() => setSelectedPatient(null)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Close
              </button>
              <button
                type="button"
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
              >
                Edit Patient
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
