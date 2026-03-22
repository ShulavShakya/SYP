import React, { useEffect, useMemo, useState } from "react";
import PageLoader from "../../../component/PageLoader";
import ErrorState from "../../../component/ErrorState";
import {
  UserPlus,
  ArrowUp,
  AlertCircle,
  FilterX,
  Eye,
  Pencil,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { privateAPI } from "../../../auth/config/api";

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

function PatientRow({
  id,
  name,
  age,
  gender,
  contact,
  lastVisit,
  blood_group,
}) {
  return (
    <tr className="group transition-colors hover:bg-primary/5">
      <td className="px-6 py-5 font-mono text-xs font-bold text-slate-400">
        {id}
      </td>

      <td className="px-6 py-5">
        <p className="font-headline text-sm capitalize text-on-surface">
          {name}
        </p>
      </td>

      <td className="px-6 py-5 text-center">
        <p className="text-sm font-semibold text-on-surface">{age}</p>
        <p className="text-[10px] font-bold uppercase text-slate-500">
          {gender}
        </p>
      </td>

      <td className="px-6 py-5">
        <p className="text-sm font-medium text-on-surface">{contact}</p>
      </td>

      <td className="px-6 py-5 text-center">
        <p className="text-sm text-on-surface">{lastVisit}</p>
      </td>

      <td className="px-6 py-5 text-center">
        <p className="text-sm text-on-surface">{blood_group}</p>
      </td>

      <td className="px-6 py-5 text-right">
        <div className="flex justify-end gap-2">
          <button className="rounded-lg bg-surface p-2 text-primary hover:bg-white">
            View
          </button>
          <button className="rounded-lg bg-surface p-2 text-slate-600 hover:bg-white">
            Edit
          </button>
          <button className="rounded-lg bg-error-container p-2 text-error hover:bg-error hover:text-white">
            Delete
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

  const fetchPatientData = async () => {
    try {
      setLoading(true);
      setError("");

      const [countRes, patientsRes] = await Promise.all([
        privateAPI.get("/admin/patients/count/"),
        // privateAPI.get("/admin/patients/today/count/"),
        privateAPI.get("/admin/patients/"),
      ]);

      const patientList = Array.isArray(patientsRes.data)
        ? patientsRes.data
        : [];

      const mappedPatients = patientList.map((patient) => ({
        id: patient.patient_id || "N/A",
        name: patient.name || "N/A",
        age: "N/A",
        gender: patient.gender || "N/A",
        contact: patient.phone || "N/A",
        blood_group: patient.blood_group || "N/A",
        lastVisit: "N/A",
      }));

      setTotalPatients(countRes.data?.total_patients || 0);
      //   setTodayCount(todayCountRes.data?.today_patients || 0);
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

          <button className="flex items-center gap-2 self-start rounded-xl bg-gradient-to-br from-[#006565] to-[#008080] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#006565]/20 transition-transform active:scale-95 sm:self-auto">
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

        <div className="overflow-hidden rounded-2xl border border-white bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] border-collapse text-left">
              <thead className="border-b border-[#bdc9c8]/10 bg-[#f1f4f4]/50">
                <tr>
                  <th className="px-6 py-4 text-[11px] font-extrabold uppercase tracking-widest text-slate-500">
                    Patient ID
                  </th>
                  <th className="px-6 py-4 text-[11px] font-extrabold uppercase tracking-widest text-slate-500">
                    Name
                  </th>
                  <th className="px-6 py-4 text-center text-[11px] font-extrabold uppercase tracking-widest text-slate-500">
                    Age / Gender
                  </th>
                  <th className="px-6 py-4 text-[11px] font-extrabold uppercase tracking-widest text-slate-500">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-[11px] font-extrabold uppercase tracking-widest text-slate-500">
                    Last Visit
                  </th>
                  <th className="px-6 py-4 text-[11px] font-extrabold uppercase tracking-widest text-slate-500">
                    Blood Group
                  </th>
                  <th className="px-6 py-4 text-center text-[11px] font-extrabold uppercase tracking-widest text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-6 py-8 text-center text-slate-500"
                    >
                      Loading patients...
                    </td>
                  </tr>
                ) : patients.length > 0 ? (
                  patients.map((patient) => (
                    <PatientRow key={patient.id} {...patient} />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-6 py-8 text-center text-slate-500"
                    >
                      No patients found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col gap-4 pb-12 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium text-slate-500">
            Showing{" "}
            <span className="font-bold text-on-surface">{patients.length}</span>{" "}
            of{" "}
            <span className="font-bold text-on-surface">{totalPatients}</span>{" "}
            patients
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled
              className="rounded-xl border border-[#bdc9c8]/20 bg-white p-2 text-slate-400 transition-colors disabled:opacity-50"
            >
              <ChevronLeft size={18} />
            </button>

            <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white shadow-md">
              1
            </button>

            <button
              disabled
              className="rounded-xl border border-[#bdc9c8]/20 bg-white p-2 text-slate-400 transition-colors disabled:opacity-50"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
