import React, { useEffect, useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import {
  Search,
  ChevronDown,
  CircleCheck,
  Star,
  CalendarDays,
  Info,
  ArrowLeft,
} from "lucide-react";
import "react-day-picker/dist/style.css";
import { useNavigate } from "react-router-dom";
import { privateAPI } from "../../../auth/config/api.js";

const DEPARTMENTS = [
  "Choose a medical department",
  "Cardiology",
  "Pediatrics",
  "Neurology",
  "Dermatology",
  "Orthopedics",
];

const times = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
];

const BOOKING_FEE = 250;

export default function Appointments() {
  const navigate = useNavigate();

  const [department, setDepartment] = useState(DEPARTMENTS[0]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [selectedTime, setSelectedTime] = useState("10:00 AM");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reason, setReason] = useState("");
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [doctorError, setDoctorError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoadingDoctors(true);
        setDoctorError("");

        const response = await privateAPI.get("/patient/doctors/basic/");
        const data = response.data;

        const mappedDoctors = data.map((doc, index) => ({
          id: doc.id ?? index + 1,
          name: doc.name,
          role: doc.specialty || "General Doctor",
          department: doc.specialty || "",
          rating: "4.8",
          reviews: "(0 reviews)",
          image: doc.profile_image || "https://via.placeholder.com/150",
        }));

        setDoctors(mappedDoctors);

        if (mappedDoctors.length > 0) {
          setSelectedDoctorId(mappedDoctors[0].id);
        }
      } catch (error) {
        console.error(
          "Doctor fetch error:",
          error?.response?.data || error.message,
        );
        setDoctorError("Could not load doctors.");
      } finally {
        setLoadingDoctors(false);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = useMemo(() => {
    if (department === "Choose a medical department") return doctors;

    return doctors.filter(
      (doc) => doc.department?.toLowerCase() === department.toLowerCase(),
    );
  }, [department, doctors]);

  useEffect(() => {
    if (!filteredDoctors.length) {
      setSelectedDoctorId(null);
      return;
    }

    const stillExists = filteredDoctors.some(
      (doc) => doc.id === selectedDoctorId,
    );

    if (!stillExists) {
      setSelectedDoctorId(filteredDoctors[0].id);
    }
  }, [filteredDoctors, selectedDoctorId]);

  const selectedDoctor =
    doctors.find((doc) => doc.id === selectedDoctorId) || null;

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const formatDateForBackend = (date) => {
    if (!(date instanceof Date) || Number.isNaN(date.getTime())) return "";
    return date.toISOString().split("T")[0];
  };

  const formatTimeForBackend = (time12h) => {
    if (!time12h) return "";

    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "AM" && hours === 12) {
      hours = 0;
    } else if (modifier === "PM" && hours !== 12) {
      hours += 12;
    }

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;
  };

  const submitEsewaForm = (gatewayUrl, fields) => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = gatewayUrl;

    Object.entries(fields).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };

  const handleRequestAppointment = async () => {
    if (submitting) return;

    try {
      setSubmitError("");

      if (department === "Choose a medical department") {
        setSubmitError("Please select a department.");
        return;
      }

      if (!selectedDoctor) {
        setSubmitError("Please select a doctor.");
        return;
      }

      if (!selectedDate) {
        setSubmitError("Please select an appointment date.");
        return;
      }

      if (!selectedTime) {
        setSubmitError("Please select a time slot.");
        return;
      }

      const payload = {
        department_name: department,
        doctor_name: selectedDoctor.name,
        date: formatDateForBackend(selectedDate),
        time: formatTimeForBackend(selectedTime),
        reason: reason.trim(),
        amount: BOOKING_FEE,
      };

      setSubmitting(true);

      const response = await privateAPI.post(
        "/patient/payment/initiate/",
        payload,
      );

      const gatewayUrl = response?.data?.gateway_url;
      const fields = response?.data?.fields;

      if (!gatewayUrl || !fields || typeof fields !== "object") {
        throw new Error("Payment form data not returned by server.");
      }

      submitEsewaForm(gatewayUrl, fields);
    } catch (error) {
      console.error(
        "Payment initiation error:",
        error?.response?.data || error.message,
      );

      setSubmitError(
        error?.response?.data?.message ||
          "Could not initiate payment. Please try again.",
      );
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f6f7f8] text-slate-900 antialiased">
      <div className="flex flex-1 flex-col items-center px-4 py-10">
        <div className="w-full max-w-4xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
          <div className="bg-primary p-8 text-white">
            <h1 className="text-3xl font-black tracking-tight">
              Schedule Appointment
            </h1>
            <p className="mt-2 opacity-90">
              Patient Portal • Medical Appointment Booking
            </p>
          </div>

          <div className="space-y-8 p-8">
            <section>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Department
              </label>
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <select
                  className="w-full appearance-none rounded-lg border-2 border-slate-100 bg-slate-50 p-4 pl-12 pr-10 text-base focus:border-primary focus:ring-0"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  {DEPARTMENTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
              </div>
            </section>

            <section>
              <div className="mb-3 flex items-center justify-between">
                <label className="block text-sm font-bold text-slate-700">
                  Select Doctor
                </label>
                <button
                  type="button"
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  View All Doctors
                </button>
              </div>

              {loadingDoctors && (
                <p className="text-sm text-slate-500">Loading doctors...</p>
              )}

              {doctorError && (
                <p className="text-sm text-red-500">{doctorError}</p>
              )}

              {!loadingDoctors && !doctorError && (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredDoctors.length > 0 ? (
                    filteredDoctors.map((doc) => (
                      <article
                        key={doc.id}
                        onClick={() => setSelectedDoctorId(doc.id)}
                        className={[
                          "flex cursor-pointer gap-4 rounded-xl border-2 p-4 transition-all",
                          doc.id === selectedDoctorId
                            ? "border-primary bg-primary/5"
                            : "border-slate-100 bg-white hover:border-secondary",
                        ].join(" ")}
                      >
                        <img
                          alt={doc.name}
                          className="h-16 w-16 rounded-lg object-cover"
                          src={doc.image}
                        />

                        <div className="min-w-0 flex-1">
                          <h3 className="truncate font-bold text-slate-800">
                            {doc.name}
                          </h3>
                          <p className="mb-2 truncate text-xs text-slate-500">
                            {doc.role}
                          </p>
                          <div className="flex items-center gap-1">
                            <Star
                              className="fill-yellow-500 text-yellow-500"
                              size={14}
                            />
                            <span className="text-xs font-bold">
                              {doc.rating}
                            </span>
                            <span className="text-xs text-slate-400">
                              {doc.reviews}
                            </span>
                          </div>
                        </div>

                        {doc.id === selectedDoctorId && (
                          <div className="flex items-center">
                            <CircleCheck className="text-primary" size={20} />
                          </div>
                        )}
                      </article>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">
                      No doctors found for this department.
                    </p>
                  )}
                </div>
              )}
            </section>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
              <div className="space-y-3 lg:col-span-2">
                <label className="block text-sm font-bold text-slate-700">
                  Appointment Date
                </label>

                <div className="rounded-lg border-2 border-slate-100 bg-slate-50 p-4">
                  <DayPicker
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      if (date) setSelectedDate(date);
                    }}
                    disabled={{ before: today }}
                    className="text-slate-900"
                    classNames={{
                      months: "flex justify-center",
                      month: "space-y-4",
                      caption:
                        "relative flex justify-center items-center h-10 px-10",
                      caption_label: "text-sm font-bold text-slate-800",
                      nav: "flex items-center",
                      nav_button:
                        "h-8 w-8 bg-transparent hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-500 transition absolute top-1",
                      nav_button_previous: "absolute left-2",
                      nav_button_next: "absolute right-2",
                      table: "w-full border-collapse",
                      head_row: "flex",
                      head_cell: "w-10 text-[11px] font-bold text-slate-400",
                      row: "flex w-full mt-1",
                      cell: "h-8 w-10 text-center text-sm",
                      day: "h-8 w-8 rounded hover:bg-primary/10",
                      day_selected: "bg-primary text-white font-bold",
                      day_today:
                        "border border-primary text-primary font-semibold",
                      day_disabled:
                        "text-slate-300 opacity-50 cursor-not-allowed",
                    }}
                  />
                </div>
              </div>

              <div className="space-y-3 lg:col-span-3">
                <label className="block text-sm font-bold text-slate-700">
                  Select Time Slot
                </label>

                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                  {times.map((time) => {
                    const isSelected = time === selectedTime;
                    const isDisabled = time === "11:00 AM";

                    return (
                      <button
                        key={time}
                        type="button"
                        disabled={isDisabled}
                        onClick={() => !isDisabled && setSelectedTime(time)}
                        className={[
                          "rounded-lg border-2 px-2 py-3 text-sm font-semibold transition-all",
                          isSelected
                            ? "border-primary bg-primary/5 text-primary"
                            : isDisabled
                              ? "cursor-not-allowed border-slate-100 bg-slate-100 text-slate-400 line-through"
                              : "border-slate-100 bg-white hover:border-secondary",
                        ].join(" ")}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <section>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Reason for Visit
              </label>
              <textarea
                rows={4}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full resize-none rounded-lg border-2 border-slate-100 bg-slate-50 p-4 text-base transition-all focus:border-primary focus:ring-0"
                placeholder="Briefly describe the symptoms or reason for the appointment..."
              />
            </section>

            {submitError && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600">
                {submitError}
              </div>
            )}

            <div className="rounded-lg border border-primary/10 bg-primary/5 p-4">
              <div className="flex items-start gap-3">
                <Info className="mt-0.5 shrink-0 text-primary" size={18} />
                <p className="text-sm leading-relaxed text-slate-600">
                  Booking fee of{" "}
                  <span className="font-bold text-primary">
                    Rs. {BOOKING_FEE.toFixed(2)}
                  </span>{" "}
                  will be charged upon confirmation. You can reschedule up to 24
                  hours before the appointment.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <button
                type="button"
                onClick={handleRequestAppointment}
                disabled={submitting}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary py-4 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <CalendarDays size={18} />
                {submitting
                  ? "Redirecting to Payment..."
                  : "Request Appointment"}
              </button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                disabled={submitting}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-slate-200 py-4 font-bold text-slate-600 transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <ArrowLeft size={18} />
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
