import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { privateAPI } from "../../../auth/config/api.js";
import PageLoader from "../../../component/PageLoader.jsx";
import ErrorState from "../../../component/ErrorState.jsx";
import EmptyState from "../../../component/EmptyState.jsx";
import {
  Plus,
  Users,
  UserCheck,
  UserX,
  Eye,
  Pencil,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  FileText,
} from "lucide-react";

const shiftFilters = ["All", "Morning", "Afternoon", "Night"];

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

function ReceptionistRow({
  receptionist_id,
  name,
  contact,
  shift,
  status,
  statusClass,
}) {
  return (
    <tr className="transition-colors hover:bg-slate-50/50">
      <td className="px-6 py-4 text-sm font-medium text-slate-500">
        {receptionist_id}
      </td>

      <td className="px-6 py-4">
        <p className="text-sm font-semibold text-slate-900 capitalize">
          {name}
        </p>
      </td>

      <td className="px-6 py-4">
        <span className="text-sm text-slate-600">{contact}</span>
      </td>

      <td className="px-6 py-4">
        <span className="text-sm font-medium text-slate-600">{shift}</span>
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
          >
            <Eye size={16} />
          </button>

          <button
            type="button"
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100"
          >
            <Pencil size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
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

      setReceptionists(listRes.data || []);
      setTotalReceptionists(totalRes.data.total_receptionists || 0);
      setOnDutyReceptionists(onDutyRes.data.on_duty_receptionists || 0);
      setOffDutyReceptionists(offDutyRes.data.off_duty_receptionists || 0);
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

  const filteredReceptionists = useMemo(() => {
    if (selectedShift === "All") return receptionists;
    return receptionists.filter(
      (receptionist) =>
        receptionist.shift?.toLowerCase() === selectedShift.toLowerCase(),
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

  const getStatusClass = (status) => {
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
  };

  const formatStatus = (status) => {
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
  };

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

        <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-[#f1f4f4] p-2">
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

        <div className="overflow-hidden rounded-2xl bg-white shadow-[0px_4px_20px_rgba(0,101,101,0.05)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse text-left">
              <thead>
                <tr className="bg-[#f1f4f4]/50">
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">
                    Receptionist ID
                  </th>
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">
                    Name
                  </th>
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">
                    Contact
                  </th>
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">
                    Shift
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
                {filteredReceptionists.length > 0 ? (
                  filteredReceptionists.map((receptionist) => (
                    <ReceptionistRow
                      key={receptionist.Receptionist_id}
                      receptionist_id={receptionist.Receptionist_id}
                      name={receptionist.name}
                      contact={receptionist.phone}
                      shift={receptionist.shift}
                      status={formatStatus(receptionist.status)}
                      statusClass={getStatusClass(receptionist.status)}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-16">
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

          <div className="flex flex-col gap-4 border-t border-slate-100/50 bg-[#f1f4f4]/30 p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-bold text-slate-900">
                {filteredReceptionists.length}
              </span>{" "}
              of{" "}
              <span className="font-bold text-slate-900">
                {totalReceptionists}
              </span>{" "}
              receptionists
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
  );
}
