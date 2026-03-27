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
  "Neurology",
  "Pediatrics",
  "General Surgery",
  "Dermatology",
  "Orthopedics",
];

const times = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
];

const BOOKING_FEE = 250;

export default function Appointments() {
  const navigate = useNavigate();

  const [department, setDepartment] = useState(DEPARTMENTS[0]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [selectedTime, setSelectedTime] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reason, setReason] = useState("");
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [doctorError, setDoctorError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [doctorAvgRatings, setDoctorAvgRatings] = useState({});

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await privateAPI.get("/patient/ratings/");
        const data = Array.isArray(response.data) ? response.data : [];
        setRatings(data);

        const avgRatings = data.reduce((acc, rating) => {
          if (!acc[rating.doctor_id])
            acc[rating.doctor_id] = { total: 0, count: 0 };
          acc[rating.doctor_id].total += rating.star;
          acc[rating.doctor_id].count += 1;
          return acc;
        }, {});

        const finalAvgRatings = {};
        for (const doctorId in avgRatings) {
          finalAvgRatings[doctorId] = (
            avgRatings[doctorId].total / avgRatings[doctorId].count
          ).toFixed(1);
        }

        setDoctorAvgRatings(finalAvgRatings);
      } catch (error) {
        console.error("Error fetching ratings:", error);
        setRatings([]);
        setDoctorAvgRatings({});
      }
    };

    fetchRatings();
  }, []);

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

  useEffect(() => {
    const fetchBookedSlots = async () => {
      try {
        const response = await privateAPI.get("/patient/date-time/");
        setBookedSlots(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching booked slots", error);
        setBookedSlots([]);
      }
    };
    fetchBookedSlots();
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

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const formatTimeForBackend = (time12h) => {
    if (!time12h) return "";
    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;
  };

  const isSlotBooked = (time12h) => {
    if (!selectedDoctorId || !selectedDate || !Array.isArray(bookedSlots))
      return false;

    const dateString = formatDateForBackend(selectedDate);
    const timeString = formatTimeForBackend(time12h);

    return bookedSlots.some((slot) => {
      const idMatches = String(slot.doctor_id) === String(selectedDoctorId);
      const dateMatches = slot.date === dateString;
      const timeMatches = slot.time?.slice(0, 5) === timeString?.slice(0, 5);
      return idMatches && dateMatches && timeMatches;
    });
  };

  useEffect(() => {
    if (selectedTime && isSlotBooked(selectedTime)) {
      setSelectedTime(null);
    }
  }, [selectedDate, selectedDoctorId, bookedSlots]);

  useEffect(() => {
    setSelectedDoctorId(null);
    setSelectedTime(null);
  }, [department]);

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
        doctor_id: selectedDoctor.id,
        date: formatDateForBackend(selectedDate),
        time: formatTimeForBackend(selectedTime),
        reason: reason.trim() || "Regular Checkup",
        status: "PENDING",
      };

      setSubmitting(true);

      await privateAPI.post("/patient/create-appointment/", payload);

      alert("Appointment requested successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Booking error:", error?.response?.data || error.message);
      setSubmitError(
        error?.response?.data?.message ||
          "Could not create appointment. Please try again.",
      );
    } finally {
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
              <label className="block text-sm font-bold text-slate-700 mb-3">
                Select Doctor
              </label>
              {loadingDoctors ? (
                <p className="text-sm text-slate-500">Loading doctors...</p>
              ) : doctorError ? (
                <p className="text-sm text-red-500">{doctorError}</p>
              ) : (
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
                              {doctorAvgRatings[doc.id] || doc.rating}{" "}
                            </span>
                          </div>
                        </div>
                        {doc.id === selectedDoctorId && (
                          <CircleCheck className="text-primary" size={20} />
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
                    onSelect={(date) => date && setSelectedDate(date)}
                    disabled={{ before: today }}
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
                    const isDisabled = isSlotBooked(time);
                    return (
                      <button
                        key={time}
                        type="button"
                        disabled={isDisabled}
                        onClick={() => setSelectedTime(time)}
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
                className="w-full resize-none rounded-lg border-2 border-slate-100 bg-slate-50 p-4 text-base focus:border-primary focus:ring-0"
                placeholder="Briefly describe the symptoms..."
              />
            </section>

            {submitError && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600">
                {submitError}
              </div>
            )}

            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <button
                type="button"
                onClick={handleRequestAppointment}
                disabled={submitting}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary py-4 font-bold text-white shadow-lg transition-all hover:bg-primary/90 disabled:opacity-70"
              >
                <CalendarDays size={18} />
                {submitting ? "Booking..." : "Request Appointment"}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-slate-200 py-4 font-bold text-slate-600 hover:bg-slate-50"
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
