import React, { useEffect, useMemo, useState, useRef } from "react";
import { DayPicker } from "react-day-picker";
import {
  CalendarDays,
  ChevronDown,
  ShieldCheck,
  UserRoundSearch,
  ArrowLeft,
  Search,
  Check,
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

const TIMES = [
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

export default function ScheduleAppointment() {
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [department, setDepartment] = useState(DEPARTMENTS[0]);
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [reason, setReason] = useState("");

  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  // 1. Fetch Patients and Doctors
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pRes, dRes] = await Promise.all([
          privateAPI.get("/receptionist/search-patients/"),
          privateAPI.get("/receptionist/doctors/basic/"),
        ]);
        setPatients(pRes.data);
        setDoctors(dRes.data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchData();
  }, []);

  // 2. Fetch Busy Slots
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await privateAPI.get(
          "/receptionist/appointments/active/",
        );
        console.log("Booked slots from backend:", response.data); // DEBUG LOG
        setBookedSlots(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching slots", error);
        setBookedSlots([]);
      }
    };
    fetchSlots();
  }, [selectedDate, selectedDoctorId]);

  // --- NEPAL TIMEZONE SAFE FORMATTING ---
  const formatDateForNepal = (date) => {
    if (!date) return "";
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const formatTimeForBackend = (time12h) => {
    if (!time12h) return "";
    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;
  };

  // --- THE SLOT CHECKER ---
  const isSlotBooked = (time12h) => {
    if (!selectedDoctorId || !selectedDate || bookedSlots.length === 0)
      return false;

    const dStr = formatDateForNepal(selectedDate);
    const tStr = formatTimeForBackend(time12h).slice(0, 5); // "HH:mm"

    return bookedSlots.some((s) => {
      // Comparison 1: ID (Convert both to string to be safe)
      const doctorMatches = String(s.doctor_id) === String(selectedDoctorId);

      // Comparison 2: Date
      const dateMatches = s.date === dStr;

      // Comparison 3: Time (Compare only HH:mm to ignore seconds)
      const timeMatches = s.time?.slice(0, 5) === tStr;

      // UNCOMMENT THIS LINE TO DEBUG IN BROWSER CONSOLE:
      // if (doctorMatches && dateMatches) console.log(`Checking ${time12h}:`, { doctorMatches, dateMatches, timeMatches, backendTime: s.time, uiTime: tStr });

      return doctorMatches && dateMatches && timeMatches;
    });
  };

  // Logic: Reset selected time if doctor or date changes
  useEffect(() => {
    setSelectedTime(null);
  }, [selectedDoctorId, selectedDate]);

  const filteredPatients = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const term = searchTerm.toLowerCase();
    return patients.filter(
      (p) =>
        p.name?.toLowerCase().includes(term) ||
        p.patient_id?.toLowerCase().includes(term) ||
        (p.phone && p.phone.includes(term)),
    );
  }, [searchTerm, patients]);

  const filteredDoctors = useMemo(() => {
    if (department === DEPARTMENTS[0]) return [];
    return doctors.filter(
      (d) => d.specialty?.toLowerCase() === department.toLowerCase(),
    );
  }, [department, doctors]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target))
        setShowResults(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleBooking = async () => {
    if (!selectedPatientId || !selectedDoctorId || !selectedTime) {
      setSubmitError("Please select a patient, doctor, and time.");
      return;
    }
    try {
      setLoading(true);
      const payload = {
        patient: selectedPatientId,
        department_name: department,
        doctor_id: selectedDoctorId,
        doctor_name: doctors.find(
          (d) => String(d.doctor_id) === String(selectedDoctorId),
        )?.name,
        date: formatDateForNepal(selectedDate),
        time: formatTimeForBackend(selectedTime),
        reason: reason.trim() || "Receptionist Booking",
        status: "SCHEDULED",
      };
      await privateAPI.post("/patient/create-appointment/", payload);
      alert("Appointment Created!");
      navigate(-1);
    } catch (err) {
      setSubmitError(err.response?.data?.message || "Booking failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f7f8] text-slate-900 antialiased font-sans">
      <main className="flex flex-col items-center px-4 py-10">
        <div className="w-full max-w-5xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
          <div className="bg-primary p-8 text-white">
            <h1 className="text-3xl font-black tracking-tight">
              Schedule Appointment
            </h1>
            <p className="mt-2 opacity-90 text-sm">
              Receptionist Portal • Nepal Timezone (NPT)
            </p>
          </div>

          <div className="space-y-8 p-8">
            {/* Patient Search */}
            <section className="relative" ref={searchRef}>
              <label className="mb-2 block text-sm font-bold text-slate-700 uppercase tracking-wide">
                Search Patient
              </label>
              <div className="group relative">
                <UserRoundSearch
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors"
                />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowResults(true);
                    if (selectedPatientId) setSelectedPatientId("");
                  }}
                  onFocus={() => setShowResults(true)}
                  placeholder="Enter Patient Name, ID, or Phone Number"
                  className={`w-full rounded-lg border-2 py-4 pl-12 pr-4 text-base transition-all outline-none ${selectedPatientId ? "border-green-500 bg-green-50" : "border-slate-100 bg-slate-50 focus:border-primary"}`}
                />
                {selectedPatientId && (
                  <Check
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500"
                    size={20}
                  />
                )}
              </div>

              {showResults && filteredPatients.length > 0 && (
                <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-slate-200 bg-white shadow-xl">
                  {filteredPatients.map((p) => (
                    <button
                      key={p.patient_id}
                      onClick={() => {
                        setSelectedPatientId(p.patient_id);
                        setSearchTerm(p.name);
                        setShowResults(false);
                      }}
                      className="flex w-full items-center justify-between border-b border-slate-50 p-4 text-left hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {p.profile_image ? (
                          <img
                            src={p.profile_image}
                            alt=""
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                            NA
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-slate-800">{p.name}</p>
                          <p className="text-xs text-slate-500">
                            ID: {p.patient_id} • {p.phone || "No phone"}
                          </p>
                        </div>
                      </div>
                      <Search size={16} className="text-slate-300" />
                    </button>
                  ))}
                </div>
              )}
            </section>

            {/* Dept & Doctor */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <section>
                <label className="mb-2 block text-sm font-bold text-slate-700 uppercase tracking-wide">
                  Department
                </label>
                <div className="relative">
                  <select
                    className="w-full appearance-none rounded-lg border-2 border-slate-100 bg-slate-50 p-4 text-base focus:border-primary outline-none"
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
                    size={18}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>
              </section>

              <section>
                <label className="mb-2 block text-sm font-bold text-slate-700 uppercase tracking-wide">
                  Doctor
                </label>
                <div className="relative">
                  <select
                    disabled={department === DEPARTMENTS[0]}
                    className="w-full appearance-none rounded-lg border-2 border-slate-100 bg-slate-50 p-4 text-base focus:border-primary outline-none disabled:opacity-50"
                    value={selectedDoctorId}
                    onChange={(e) => setSelectedDoctorId(e.target.value)}
                  >
                    <option value="">Select a Doctor</option>
                    {filteredDoctors.map((doc) => (
                      <option key={doc.doctor_id} value={doc.doctor_id}>
                        {doc.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={18}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>
              </section>
            </div>

            {/* Date & Time Grid */}
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5 space-y-3">
                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide">
                  Appointment Date
                </label>
                <div className="flex justify-center rounded-[20px] border-2 border-slate-200 bg-[#f3f5f7] p-6 shadow-sm">
                  <DayPicker
                    mode="single"
                    selected={selectedDate}
                    onSelect={(d) => d && setSelectedDate(d)}
                    disabled={{ before: today }}
                    className="mx-auto"
                  />
                </div>
              </div>

              <div className="lg:col-span-7 space-y-3">
                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide">
                  Select Time Slot
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {TIMES.map((t) => {
                    const booked = isSlotBooked(t);
                    const selected = selectedTime === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        disabled={booked || !selectedDoctorId}
                        onClick={() => setSelectedTime(t)}
                        className={`rounded-lg border-2 px-2 py-4 text-sm transition-all ${
                          selected
                            ? "border-primary bg-primary/5 font-bold text-primary"
                            : booked
                              ? "cursor-not-allowed border-slate-100 bg-slate-100 text-slate-400 line-through"
                              : "border-slate-100 bg-white font-semibold hover:border-secondary"
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <section>
              <label className="mb-2 block text-sm font-bold text-slate-700 uppercase tracking-wide">
                Reason for Visit
              </label>
              <textarea
                rows={4}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Symptoms..."
                className="w-full resize-none rounded-lg border-2 border-slate-100 bg-slate-50 p-4 text-base transition-all focus:border-primary outline-none"
              />
            </section>

            {submitError && (
              <div className="text-red-600 text-sm font-bold">
                {submitError}
              </div>
            )}

            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <button
                onClick={handleBooking}
                disabled={loading}
                className="flex flex-[2] bg-primary py-4 font-bold text-white rounded-lg shadow-lg hover:bg-primary/90 disabled:opacity-50"
              >
                <CalendarDays size={18} className="inline mr-2" />
                {loading ? "Processing..." : "Book Appointment"}
              </button>
              <button
                className="flex-1 rounded-lg border-2 border-slate-200 py-4 font-bold text-slate-600 hover:bg-slate-50"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
