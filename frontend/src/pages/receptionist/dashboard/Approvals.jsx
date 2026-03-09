import React, { useMemo, useState } from "react";
import { readJSON, writeJSON } from "../../../utils/storage";
import {
  BadgeCheck,
  Ban,
  CalendarDays,
  Clock,
  Stethoscope,
  Search,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const APPT_KEY = "hms_patient_appointments_v1";

const DOCTORS = [
  { id: "d1", name: "Dr. Asha Karki", dept: "Cardiology" },
  { id: "d2", name: "Dr. Bikash Shrestha", dept: "General Medicine" },
  { id: "d3", name: "Dr. Nisha Gurung", dept: "Dermatology" },
  { id: "d4", name: "Dr. Ramesh Adhikari", dept: "Orthopedics" },
  { id: "d5", name: "Dr. Suman Thapa", dept: "ENT" },
];

function formatDateTime(dateStr, timeStr) {
  if (!dateStr) return "";
  const d = new Date(`${dateStr}T${timeStr || "00:00"}`);
  if (Number.isNaN(d.getTime())) return `${dateStr} ${timeStr || ""}`.trim();
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function statusPill(status) {
  const base =
    "inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-black border";
  switch (status) {
    case "APPROVED":
      return `${base} bg-green-50 text-green-700 border-green-200`;
    case "COMPLETED":
      return `${base} bg-slate-50 text-slate-700 border-slate-200`;
    case "CANCELLED":
      return `${base} bg-red-50 text-red-700 border-red-200`;
    case "REJECTED":
      return `${base} bg-red-50 text-red-700 border-red-200`;
    default:
      return `${base} bg-amber-50 text-amber-700 border-amber-200`; // PENDING
  }
}

export default function Approvals() {
  const initial = useMemo(() => readJSON(APPT_KEY, []), []);
  const [appointments, setAppointments] = useState(initial);

  const [query, setQuery] = useState("");
  const [msg, setMsg] = useState({ type: "idle", text: "" });

  const persist = (next) => {
    setAppointments(next);
    writeJSON(APPT_KEY, next);
  };

  const pending = useMemo(
    () => appointments.filter((a) => a.status === "PENDING"),
    [appointments],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return pending;
    return pending.filter((a) => {
      const hay =
        `${a.department} ${a.doctorName} ${a.notes || ""} ${a.date} ${a.time}`.toLowerCase();
      return hay.includes(q);
    });
  }, [pending, query]);

  const pickDoctorsForDept = (dept) => DOCTORS.filter((d) => d.dept === dept);

  const approve = (id, doctorId) => {
    const doctor = DOCTORS.find((d) => d.id === doctorId) || null;
    if (!doctor) {
      setMsg({
        type: "error",
        text: "Please select a doctor before approving.",
      });
      return;
    }

    const next = appointments.map((a) =>
      a.id === id
        ? {
            ...a,
            status: "APPROVED",
            doctorId: doctor.id,
            doctorName: doctor.name,
            approvedAt: new Date().toISOString(),
          }
        : a,
    );

    persist(next);
    setMsg({
      type: "success",
      text: "Appointment approved and doctor assigned.",
    });
  };

  const reject = (id) => {
    const next = appointments.map((a) =>
      a.id === id
        ? { ...a, status: "REJECTED", rejectedAt: new Date().toISOString() }
        : a,
    );
    persist(next);
    setMsg({ type: "success", text: "Appointment rejected." });
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-black text-[#263238]">
          Approve Appointments
        </h2>
        <p className="mt-1 text-sm font-semibold text-[#607D8B]">
          Review pending requests and assign a doctor. (Local storage for now.)
        </p>
      </div>

      {msg.type !== "idle" && (
        <div
          className={[
            "rounded-xl border px-3 py-2 text-sm font-bold flex items-center gap-2",
            msg.type === "success"
              ? "border-green-200 bg-green-50 text-green-800"
              : "border-red-200 bg-red-50 text-red-800",
          ].join(" ")}
        >
          {msg.type === "success" ? (
            <CheckCircle2 size={16} />
          ) : (
            <XCircle size={16} />
          )}
          <span>{msg.text}</span>
        </div>
      )}

      {/* Search */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="text-sm font-black text-[#263238]">
          Pending Requests
        </div>

        <div className="mt-3 relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by department, date, notes..."
            className="w-full rounded-xl border border-slate-200 px-10 py-2.5 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1E88E5]/20"
          />
        </div>

        <div className="mt-3 text-xs font-bold text-[#607D8B]">
          Showing: <span className="text-[#263238]">{filtered.length}</span> /{" "}
          <span className="text-[#263238]">{pending.length}</span> pending
        </div>
      </div>

      {/* List */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        {filtered.length === 0 ? (
          <div className="text-sm font-semibold text-[#607D8B]">
            No pending requests found.
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((a) => (
              <ApprovalCard
                key={a.id}
                appt={a}
                pickDoctorsForDept={pickDoctorsForDept}
                onApprove={approve}
                onReject={reject}
              />
            ))}
          </div>
        )}
      </div>

      <div className="text-xs font-semibold text-[#607D8B]">
        Next steps: we’ll build Assign Doctor (for already approved) and Billing
        pages.
      </div>
    </div>
  );
}

function ApprovalCard({ appt, pickDoctorsForDept, onApprove, onReject }) {
  const doctors = pickDoctorsForDept(appt.department);
  const [doctorId, setDoctorId] = useState(doctors[0]?.id || "");

  return (
    <div className="rounded-2xl border border-slate-200 p-3 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className={statusPill(appt.status)}>{appt.status}</span>
            <div className="text-sm font-black text-[#263238] truncate">
              {appt.department}
            </div>
          </div>

          <div className="mt-1 text-xs font-semibold text-[#607D8B] flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1">
              <CalendarDays size={14} />
              {formatDateTime(appt.date, appt.time)}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock size={14} />
              Requested: {new Date(appt.createdAt).toLocaleString()}
            </span>
          </div>

          {appt.notes ? (
            <div className="mt-2 text-sm font-semibold text-slate-700">
              <span className="font-black text-[#263238]">Notes: </span>
              {appt.notes}
            </div>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-2 items-end">
        {/* Doctor select */}
        <div>
          <label className="text-sm font-black text-[#263238]">
            Assign Doctor
          </label>
          <div className="mt-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <Stethoscope size={16} />
            </span>
            <select
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 pl-10 pr-3 py-2.5 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1E88E5]/20 bg-white"
            >
              {doctors.length === 0 ? (
                <option value="">No doctors for dept</option>
              ) : (
                doctors.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))
              )}
            </select>
          </div>
          <div className="mt-1 text-[11px] font-bold text-[#607D8B]">
            Dept doctors shown only.
          </div>
        </div>

        <button
          type="button"
          onClick={() => onReject(appt.id)}
          className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-black text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-2"
        >
          <Ban size={16} />
          Reject
        </button>

        <button
          type="button"
          onClick={() => onApprove(appt.id, doctorId)}
          className="rounded-xl bg-[#1E88E5] hover:bg-[#1E88E5]/90 text-white px-3 py-2.5 text-sm font-black shadow flex items-center justify-center gap-2"
        >
          <BadgeCheck size={16} />
          Approve
        </button>
      </div>
    </div>
  );
}

// function statusPill(status) {
//   const base =
//     "inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-black border";
//   return `${base} bg-amber-50 text-amber-700 border-amber-200`;
// }
