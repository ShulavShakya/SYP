import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import {
  Search,
  ChevronDown,
  CircleCheck,
  Star,
  CalendarDays,
  Clock3,
  Info,
  ArrowLeft,
  Bell,
  HeartPulse,
} from "lucide-react";
import "react-day-picker/dist/style.css";
import { useNavigate } from "react-router-dom";

const DEPARTMENTS = [
  "Choose a medical department",
  "Cardiology",
  "Pediatrics",
  "Neurology",
  "Dermatology",
  "Orthopedics",
];

const DOCTORS = [
  {
    name: "Dr. Sarah Wilson",
    role: "Senior Cardiologist",
    rating: "4.9",
    reviews: "(120 reviews)",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA4zaImRyPpYAAUsc2NMm_b6QWXpFw0aQoY7UJg2yxrfMZsrggOr1yj_NiRCYWn7N5IzmCkGdOin7vIs6f_Ri1dt0KuwLBQFtf99PDCR8HqsBzRqJ7HU68CwDK-TQep-HclQjK-4f4klkIFo1RlLer92808jSxbZxVQ5e1m30A58hz7H2XwyH076dhM-D2D4mR3sG7KB6ndLXB4vOBJL...]",
  },
  {
    name: "Dr. Michael Chen",
    role: "Pediatrician",
    rating: "4.8",
    reviews: "(85 reviews)",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAijUNqHkDN77ijKabnT3Mx-dqHfGcqKUc3YC59BkzYjrvHdy9pgxKiOySgxFk3YMJM-xTS8o0T2AAX0-bpjTgPiImQuqhLmOZtTUqdajgy3jW4mT4TdcbZCwN0-N9gGXrN2JIOmDjxJK5hyk3LqXO3QIHEBdgqteZfey8fow1gnH4UPP-_m0ouzPzjK9pf0kHBYGrzlYqiSnaSz_wPuFXLU9CECmEFJHcTezKfyVif4rB7L4Cdq-ownQs7ok22Zs2i7WhMXGVacGQJ",
  },
  {
    name: "Dr. Emily Blunt",
    role: "Neurologist",
    rating: "4.9",
    reviews: "(94 reviews)",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAEA0K30keckvC4JcTfHKMv9rjSXxDYBvM2jYT1UkpkJiR7ZPpVjzVzrqknxFkUxPp07PNzY1J-VfHXV6w49-U8VLl_ya8euCr1hHEeyxCcJsQusyKa-98i3Tzhv3t2qZWBXAp7uqVmAhqi-MAJZvlBZ6yIc1Tj6ERusLUZaqByWRRkF-MrU1H6eD4Vnfgf_hnmaa-pCSPcBGcuu4zG-cRt-tnwQ4TOMSzuhhYUYuOkjCUbFxqm_8BSnj7gOtF83uQK7YkumSc32Th-",
  },
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

export default function Appointments() {
  const navigate = useNavigate();

  const [department, setDepartment] = useState(DEPARTMENTS[0]);
  const [selectedDoctor, setSelectedDoctor] = useState(DOCTORS[0]);
  const [selectedTime, setSelectedTime] = useState("10:00 AM");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reason, setReason] = useState("");

  return (
    <main className="min-h-screen bg-[#f6f7f8] text-slate-900 antialiased">
      {/* Header */}
      {/* <header className="sticky top-0 z-50 border-b border-slate-200 bg-white px-8 py-4">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 text-primary">
              <HeartPulse size={28} className="text-primary" />
              <h2 className="text-xl font-extrabold tracking-tight text-primary">
                MedFlow
              </h2>
            </div>

            <nav className="hidden items-center gap-6 md:flex">
              <button className="text-sm font-semibold text-slate-600 transition-colors hover:text-primary">
                Dashboard
              </button>
              <button className="border-b-2 border-primary pb-1 text-sm font-bold text-primary">
                Appointments
              </button>
              <button className="text-sm font-semibold text-slate-600 transition-colors hover:text-primary">
                Patients
              </button>
              <button className="text-sm font-semibold text-slate-600 transition-colors hover:text-primary">
                Reports
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700"
            >
              <Bell size={18} />
            </button>

            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-primary/20 bg-secondary/30">
              <img
                className="h-full w-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2s_kdwssPV8-znYz2eAXmuLVLXm_l5_foDHRXyu-ZFC2NlJCEQd6YvUAasHIST7g4wm6PoH7587gEzJK0l1sCfU6MN77iL7-WGrwAjanoqq6VLeXIszPaxS7UFapSI7TADipvbv2D0Q5FzDI5eaPe_8lBC6PFLEVgUDqpU_Bsz_ABI28jgyocD653HLcdYfIDsXtnLuHE67QVm82hkGNPdnB_2YYyUKBDuCJbAH6HHVrhRE19XK4eCyHD5DYPztdkYdosMvHSw4AD"
                alt="Profile"
              />
            </div>
          </div>
        </div>
      </header> */}

      <div className="flex flex-1 flex-col items-center px-4 py-10">
        <div className="w-full max-w-4xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
          {/* Header Banner */}
          <div className="bg-primary p-8 text-white">
            <h1 className="text-3xl font-black tracking-tight">
              Schedule Appointment
            </h1>
            <p className="mt-2 opacity-90">
              Patient Portal • Medical Appointment Booking
            </p>
          </div>

          <div className="space-y-8 p-8">
            {/* Department */}
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

            {/* Doctors */}
            <section>
              <div className="mb-3 flex items-center justify-between">
                <label className="block text-sm font-bold text-slate-700">
                  Select Doctor
                </label>
                <button className="text-sm font-semibold text-primary hover:underline">
                  View All Doctors
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {DOCTORS.map((doc) => (
                  <article
                    key={doc.name}
                    onClick={() => setSelectedDoctor(doc)}
                    className={[
                      "flex cursor-pointer gap-4 rounded-xl border-2 p-4 transition-all",
                      doc === selectedDoctor
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
                        <span className="text-xs font-bold">{doc.rating}</span>
                        <span className="text-xs text-slate-400">
                          {doc.reviews}
                        </span>
                      </div>
                    </div>

                    {doc === selectedDoctor && (
                      <div className="flex items-center">
                        <CircleCheck className="text-primary" size={20} />
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </section>

            {/* Date + Time */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
              {/* Date */}
              <div className="space-y-3 lg:col-span-2">
                <label className="block text-sm font-bold text-slate-700">
                  Appointment Date
                </label>

                <div className="rounded-lg border-2 border-slate-100 bg-slate-50 p-4">
                  <DayPicker
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={{ before: new Date() }}
                    className="text-slate-900"
                    classNames={{
                      months: "flex justify-center",
                      month: "space-y-4",

                      // --- UPDATED CAPTION CLASSES ---
                      caption:
                        "relative flex justify-center items-center h-10 px-10",
                      caption_label: "text-sm font-bold text-slate-800",

                      nav: "flex items-center",
                      nav_button:
                        "h-8 w-8 bg-transparent hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-500 transition absolute top-1",
                      nav_button_previous: "absolute left-2",
                      nav_button_next: "absolute right-2",
                      // -------------------------------

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

              {/* Time */}
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

            {/* Reason */}
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

            {/* Info Box */}
            <div className="rounded-lg border border-primary/10 bg-primary/5 p-4">
              <div className="flex items-start gap-3">
                <Info className="mt-0.5 shrink-0 text-primary" size={18} />
                <p className="text-sm leading-relaxed text-slate-600">
                  Booking fee of{" "}
                  <span className="font-bold text-primary">$25.00</span> will be
                  charged upon confirmation. You can reschedule up to 24 hours
                  before the appointment.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <button
                type="button"
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary py-4 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
              >
                <CalendarDays size={18} />
                Request Appointment
              </button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-slate-200 py-4 font-bold text-slate-600 transition-all hover:bg-slate-50"
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

//     const newItem = {
//       id: uid(),
//       createdAt: new Date().toISOString(),
//       status: "PENDING",
//       department: form.department,
//       doctorId: doctor?.id || "",
//       doctorName: doctor?.name || "Not assigned yet",
//       date: form.date,
//       time: form.time,
//       notes: form.notes.trim(),
//     };

//     const next = [newItem, ...appointments];
//     persist(next);

//     setForm((p) => ({ ...p, doctorId: "", date: "", time: "", notes: "" }));
//     setMsg({
//       type: "success",
//       text: "Appointment request submitted (saved locally).",
//     });
//   };

//   const onCancel = (id) => {
//     const next = appointments.map((a) =>
//       a.id === id ? { ...a, status: "CANCELLED" } : a,
//     );
//     persist(next);
//     setMsg({ type: "success", text: "Appointment cancelled (saved locally)." });
//   };

//   const onDelete = (id) => {
//     const next = appointments.filter((a) => a.id !== id);
//     persist(next);
//     setMsg({ type: "success", text: "Appointment removed from list." });
//   };

//   // Optional: quick “demo” actions (can remove later)
//   const demoApproveFirstPending = () => {
//     const idx = appointments.findIndex((a) => a.status === "PENDING");
//     if (idx === -1) {
//       setMsg({ type: "error", text: "No pending appointment to approve." });
//       return;
//     }
//     const pickedDoctor = DOCTORS[idx % DOCTORS.length];
//     const next = appointments.map((a, i) =>
//       i === idx
//         ? {
//             ...a,
//             status: "APPROVED",
//             doctorId: pickedDoctor.id,
//             doctorName: pickedDoctor.name,
//           }
//         : a,
//     );
//     persist(next);
//     setMsg({
//       type: "success",
//       text: "Demo: marked one appointment as APPROVED.",
//     });
//   };

//   return (
//     <div className="space-y-4">
//       {/* Title */}
//       <div className="flex items-start justify-between gap-3">
//         <div>
//           <h2 className="text-lg font-black text-textMain">Appointments</h2>
//           <p className="mt-1 text-sm font-semibold text-textSecondary">
//             Request an appointment and track status. (Local storage for now.)
//           </p>
//         </div>

//         <button
//           type="button"
//           onClick={demoApproveFirstPending}
//           className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-divider px-3 py-2 text-xs font-black text-textSecondary hover:bg-background"
//           title="For UI demo only"
//         >
//           <BadgeCheck size={16} />
//           Demo Approve
//         </button>
//       </div>

//       {/* Message */}
//       {msg.type !== "idle" && (
//         <div
//           className={[
//             "rounded-xl border px-3 py-2 text-sm font-bold flex items-center gap-2",
//             msg.type === "success"
//               ? "border-green-200 bg-green-50 text-green-800"
//               : "border-red-200 bg-red-50 text-red-800",
//           ].join(" ")}
//         >
//           {msg.type === "success" ? (
//             <CheckCircle2 size={16} />
//           ) : (
//             <XCircle size={16} />
//           )}
//           <span>{msg.text}</span>
//         </div>
//       )}

//       {/* Request Form */}
//       <div className="rounded-2xl border border-divider bg-card p-4">
//         <div className="text-sm font-black text-textMain">
//           Request Appointment
//         </div>

//         <form
//           onSubmit={onSubmit}
//           className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4"
//         >
//           <Select
//             label="Department *"
//             value={form.department}
//             onChange={setField("department")}
//             icon={<Building2 size={16} />}
//             options={DEPARTMENTS}
//           />

//           <Select
//             label="Preferred Doctor (optional)"
//             value={form.doctorId}
//             onChange={setField("doctorId")}
//             icon={<Stethoscope size={16} />}
//             options={[
//               { value: "", label: "Any available doctor" },
//               ...filteredDoctors.map((d) => ({ value: d.id, label: d.name })),
//             ]}
//           />

//           <Field
//             label="Date *"
//             type="date"
//             value={form.date}
//             onChange={setField("date")}
//             icon={<CalendarDays size={16} />}
//           />

//           <Field
//             label="Time *"
//             type="time"
//             value={form.time}
//             onChange={setField("time")}
//             icon={<Clock size={16} />}
//           />

//           <div className="md:col-span-2">
//             <Textarea
//               label="Symptoms / Notes"
//               value={form.notes}
//               onChange={setField("notes")}
//               icon={<FileText size={16} />}
//               placeholder="Describe your symptoms briefly..."
//             />
//           </div>

//           <div className="md:col-span-2 flex justify-end">
//             <button
//               type="submit"
//               className="rounded-xl bg-primary hover:bg-primary/90 text-white px-4 py-2.5 text-sm font-black shadow flex items-center gap-2"
//             >
//               <Plus size={16} />
//               Submit Request
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* List */}
//       <div className="rounded-2xl border border-divider bg-card p-4">
//         <div className="flex items-center justify-between">
//           <div className="text-sm font-black text-textMain">Your Requests</div>
//           <div className="text-xs font-bold text-textSecondary">
//             Total: <span className="text-textMain">{appointments.length}</span>
//           </div>
//         </div>

//         {appointments.length === 0 ? (
//           <div className="mt-4 text-sm font-semibold text-textSecondary">
//             No appointments yet. Submit a request above.
//           </div>
//         ) : (
//           <div className="mt-4 space-y-3">
//             {appointments.map((a) => (
//               <div
//                 key={a.id}
//                 className="rounded-2xl border border-divider p-3 flex flex-col gap-2"
//               >
//                 <div className="flex items-start justify-between gap-3">
//                   <div className="min-w-0">
//                     <div className="flex flex-wrap items-center gap-2">
//                       <span className={statusPill(a.status)}>
//                         {a.status === "PENDING" ? "PENDING" : a.status}
//                       </span>
//                       <div className="text-sm font-black text-textMain truncate">
//                         {a.department}
//                       </div>
//                     </div>

//                     <div className="mt-1 text-xs font-semibold text-textSecondary">
//                       {formatDateTime(a.date, a.time)}
//                       <span className="mx-2">•</span>
//                       {a.doctorName}
//                     </div>

//                     {a.notes ? (
//                       <div className="mt-2 text-sm font-semibold text-textSecondary">
//                         <span className="font-black text-textMain">
//                           Notes:{" "}
//                         </span>
//                         {a.notes}
//                       </div>
//                     ) : null}
//                   </div>

//                   <div className="flex items-center gap-2 shrink-0">
//                     {a.status !== "CANCELLED" && a.status !== "COMPLETED" ? (
//                       <button
//                         type="button"
//                         onClick={() => onCancel(a.id)}
//                         className="rounded-xl border border-divider px-3 py-2 text-xs font-black text-textSecondary hover:bg-background"
//                         title="Cancel"
//                       >
//                         Cancel
//                       </button>
//                     ) : null}

//                     <button
//                       type="button"
//                       onClick={() => onDelete(a.id)}
//                       className="rounded-xl border border-divider px-3 py-2 text-xs font-black text-textSecondary hover:bg-background flex items-center gap-2"
//                       title="Remove from list"
//                     >
//                       <Trash2 size={14} />
//                       Delete
//                     </button>
//                   </div>
//                 </div>

//                 <div className="text-[11px] font-bold text-textSecondary">
//                   Requested on:{" "}
//                   <span className="text-textMain">
//                     {new Date(a.createdAt).toLocaleString()}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         <div className="mt-4 text-xs font-semibold text-textSecondary">
//           {/* Status flow (later via backend): <b>PENDING</b> → <b>APPROVED</b> →{" "}
//           <b>COMPLETED</b>. You can cancel while pending/approved. */}
//         </div>
//       </div>
//     </div>
//   );
// }

// function Field({ label, icon, type = "text", ...props }) {
//   return (
//     <div>
//       <label className="text-sm font-black text-textMain">{label}</label>
//       <div className="mt-1 relative">
//         <span className="absolute left-3 top-1/2 -translate-y-1/2 text-textSecondary">
//           {icon}
//         </span>
//         <input
//           type={type}
//           className="w-full rounded-xl border border-divider px-10 py-2.5 text-sm font-semibold text-textMain focus:outline-none focus:ring-2 focus:ring-primary/20 bg-card"
//           {...props}
//         />
//       </div>
//     </div>
//   );
// }

// function Textarea({ label, icon, ...props }) {
//   return (
//     <div>
//       <label className="text-sm font-black text-textMain">{label}</label>
//       <div className="mt-1 relative">
//         <span className="absolute left-3 top-3 text-textSecondary">{icon}</span>
//         <textarea
//           rows={3}
//           className="w-full rounded-xl border border-divider pl-10 pr-3 py-2.5 text-sm font-semibold text-textMain focus:outline-none focus:ring-2 focus:ring-primary/20 bg-card"
//           {...props}
//         />
//       </div>
//     </div>
//   );
// }

// function Select({ label, icon, options, value, onChange }) {
//   const normalized = Array.isArray(options)
//     ? options.map((o) => (typeof o === "string" ? { value: o, label: o } : o))
//     : [];

//   return (
//     <div>
//       <label className="text-sm font-black text-textMain">{label}</label>
//       <div className="mt-1 relative">
//         <span className="absolute left-3 top-1/2 -translate-y-1/2 text-textSecondary">
//           {icon}
//         </span>
//         <select
//           value={value}
//           onChange={onChange}
//           className="w-full appearance-none rounded-xl border border-divider pl-10 pr-3 py-2.5 text-sm font-semibold text-textMain focus:outline-none focus:ring-2 focus:ring-primary/20 bg-card"
//         >
//           {normalized.map((o) => (
//             <option key={o.value} value={o.value}>
//               {o.label}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// }

// import React from "react";
// import {
//   Bell,
//   CalendarDays,
//   ChevronDown,
//   ChevronLeft,
//   ChevronRight,
//   CircleCheck,
//   Clock3,
//   Info,
//   Search,
//   Star,
//   Stethoscope,
//   UserRoundSearch,
//   ArrowLeft,
// } from "lucide-react";

// const doctors = [
//   {
//     name: "Dr. Sarah Wilson",
//     role: "Senior Cardiologist",
//     rating: "4.9",
//     reviews: "(120 reviews)",
//     selected: true,
//     image:
//       "https://lh3.googleusercontent.com/aida-public/AB6AXuA4zaImRyPpYAAUsc2NMm_b6QWXpFw0aQoY7UJg2yxrfMZsrggOr1yj_NiRCYWn7N5IzmCkGdOin7vIs6f_Ri1dt0KuwLBQFtf99PDCR8HqsBzRqJ7HU68CwDK-TQep-HclQjK-4f4klkIFo1RlLer92808jSxbZxVQ5e1m30A58hz7H2XwyH076dhM-D2D4mR3sG7KB6ndLXB4yVOBLSRAhGsZQ7jvZ0puYuUiMKHkk6HM3VWCVjfgMKara5Y_l7I6cQn4BZO6l0Va",
//   },
//   {
//     name: "Dr. Michael Chen",
//     role: "Pediatrician",
//     rating: "4.8",
//     reviews: "(85 reviews)",
//     selected: false,
//     image:
//       "https://lh3.googleusercontent.com/aida-public/AB6AXuAijUNqHkDN77ijKabnT3Mx-dqHfGcqKUc3YC59BkzYjrvHdy9pgxKiOySgxFk3YMJM-xTS8o0T2AAX0-bpjTgPiImQuqhLmOZtTUqdajgy3jW4mT4TdcbZCwN0-N9gGXrN2JIOmDjxJK5hyk3LqXO3QIHEBdgqteZfey8fow1gnH4UPP-_m0ouzPzjK9pf0kHBYGrzlYqiSnaSz_wPuFXLU9CECmEFJHcTezKfyVif4rB7L4Cdq-ownQs7ok22Zs2i7WhMXGVacGQJ",
//   },
//   {
//     name: "Dr. Emily Blunt",
//     role: "Neurologist",
//     rating: "4.9",
//     reviews: "(94 reviews)",
//     selected: false,
//     image:
//       "https://lh3.googleusercontent.com/aida-public/AB6AXuAEA0K30keckvC4JcTfHKMv9rjSXxDYBvM2jYT1UkpkJiR7ZPpVjzVzrqknxFkUxPp07PNzY1J-VfHXV6w49-U8VLl_ya8euCr1hHEeyxCcJsQusyKa-98i3Tzhv3t2qZWBXAp7uqVmAhqi-MAJZvlBZ6yIc1Tj6ERusLUZaqByWRRkF-MrU1H6eD4Vnfgf_hnmaa-pCSPcBGcuu4zG-cRt-tnwQ4TOMSzuhhYUYuOkjCUbFxqm_8BSnj7gOtF83uQK7YkumSc32Th-",
//   },
// ];

// const times = [
//   "09:00 AM",
//   "09:30 AM",
//   "10:00 AM",
//   "11:00 AM",
//   "11:30 AM",
//   "01:00 PM",
//   "02:30 PM",
//   "04:00 PM",
//   "04:30 PM",
// ];

// export default function PatientAppointment() {
//   return (
//     <main className="min-h-screen bg-[#f5f8f8] text-slate-900 antialiased">
//       <header className="h-16 border-b border-slate-200 bg-white px-8">
//         <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-between">
//           <h1 className="text-xl font-bold text-slate-800">Book an Appointment</h1>
//           <div className="flex items-center gap-4">
//             <button className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100" type="button">
//               <Bell size={20} />
//               <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
//             </button>
//             <div className="mx-2 h-8 w-px bg-slate-200" />
//             <p className="text-sm font-medium text-slate-500">Monday, Oct 14, 2023</p>
//           </div>
//         </div>
//       </header>

//       <div className="mx-auto w-full max-w-6xl p-8">
//         <div className="mb-10 flex items-center justify-center">
//           <div className="flex w-full max-w-2xl items-center">
//             <StepNode active label="Department" step="1" />
//             <div className="mx-2 h-[2px] flex-1 bg-[#0080804d]" />
//             <StepNode label="Doctor" step="2" />
//             <div className="mx-2 h-[2px] flex-1 bg-slate-200" />
//             <StepNode label="Schedule" step="3" />
//           </div>
//         </div>

//         <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
//           <section className="mb-10">
//             <div className="mb-4 flex items-center gap-2">
//               <Stethoscope className="text-[#008080]" size={18} />
//               <h2 className="text-lg font-bold text-slate-800">1. Select Department</h2>
//             </div>
//             <div className="relative">
//               <select className="h-14 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-10 transition-all focus:border-[#008080] focus:ring-2 focus:ring-[#00808033]">
//                 <option value="">Choose a medical department...</option>
//                 <option value="cardiology">Cardiology</option>
//                 <option value="pediatrics">Pediatrics</option>
//                 <option value="neurology">Neurology</option>
//                 <option value="dermatology">Dermatology</option>
//                 <option value="orthopedics">Orthopedics</option>
//               </select>
//               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#008080]" size={18} />
//               <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
//             </div>
//           </section>

//           <section className="mb-10">
//             <div className="mb-4 flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <UserRoundSearch className="text-[#008080]" size={18} />
//                 <h2 className="text-lg font-bold text-slate-800">2. Select Doctor</h2>
//               </div>
//               <button className="text-sm font-semibold text-[#008080] hover:underline" type="button">
//                 View All Doctors
//               </button>
//             </div>

//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//               {doctors.map((doctor) => (
//                 <article
//                   key={doctor.name}
//                   className={[
//                     "flex cursor-pointer gap-4 rounded-xl border p-4 transition-all",
//                     doctor.selected
//                       ? "border-[#008080] bg-[#0080800d] ring-2 ring-[#008080]"
//                       : "border-slate-200 hover:border-[#00808080]",
//                   ].join(" ")}
//                 >
//                   <img alt={doctor.name} className="h-16 w-16 rounded-lg object-cover" src={doctor.image} />
//                   <div className="flex-1">
//                     <h3 className="font-bold text-slate-800">{doctor.name}</h3>
//                     <p className="mb-2 text-xs text-slate-500">{doctor.role}</p>
//                     <div className="flex items-center gap-1">
//                       <Star className="fill-yellow-500 text-yellow-500" size={16} />
//                       <span className="text-xs font-bold">{doctor.rating}</span>
//                       <span className="text-xs text-slate-400">{doctor.reviews}</span>
//                     </div>
//                   </div>
//                   {doctor.selected && (
//                     <div className="flex items-center">
//                       <CircleCheck className="text-[#008080]" size={20} />
//                     </div>
//                   )}
//                 </article>
//               ))}
//             </div>
//           </section>

//           <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
//             <section>
//               <div className="mb-4 flex items-center gap-2">
//                 <CalendarDays className="text-[#008080]" size={18} />
//                 <h2 className="text-lg font-bold text-slate-800">3. Select Date</h2>
//               </div>

//               <div className="rounded-xl border border-slate-100 bg-slate-50 p-6">
//                 <div className="mb-6 flex items-center justify-between">
//                   <h3 className="font-bold">October 2023</h3>
//                   <div className="flex gap-2">
//                     <button className="rounded-full p-1 hover:bg-slate-200" type="button">
//                       <ChevronLeft size={18} />
//                     </button>
//                     <button className="rounded-full p-1 hover:bg-slate-200" type="button">
//                       <ChevronRight size={18} />
//                     </button>
//                   </div>
//                 </div>

//                 <div className="mb-4 grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400">
//                   <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
//                 </div>

//                 <div className="grid grid-cols-7 gap-2 text-center text-sm">
//                   {[
//                     "25", "26", "27", "28", "29", "30", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15",
//                   ].map((day) => {
//                     const muted = ["25", "26", "27", "28", "29", "30"].includes(day);
//                     const selected = day === "14";
//                     return (
//                       <div
//                         key={day}
//                         className={[
//                           "flex h-10 items-center justify-center rounded-lg",
//                           selected
//                             ? "bg-[#70c1b3] font-bold text-white"
//                             : muted
//                               ? "text-slate-300"
//                               : "text-slate-800",
//                         ].join(" ")}
//                       >
//                         {day}
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </section>

//             <section>
//               <div className="mb-4 flex items-center gap-2">
//                 <Clock3 className="text-[#008080]" size={18} />
//                 <h2 className="text-lg font-bold text-slate-800">4. Select Time</h2>
//               </div>

//               <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
//                 {times.map((time) => {
//                   const selected = time === "10:00 AM";
//                   const disabled = time === "11:30 AM";
//                   return (
//                     <button
//                       key={time}
//                       className={[
//                         "rounded-lg border px-4 py-3 text-sm font-semibold transition-colors",
//                         selected
//                           ? "border-[#008080] bg-[#008080] text-white"
//                           : disabled
//                             ? "cursor-not-allowed border-slate-200 bg-slate-100 opacity-50"
//                             : "border-slate-200 hover:bg-[#0080801a]",
//                       ].join(" ")}
//                       disabled={disabled}
//                       type="button"
//                     >
//                       {time}
//                     </button>
//                   );
//                 })}
//               </div>

//               <div className="mt-8 rounded-lg border border-[#0080801a] bg-[#0080800d] p-4">
//                 <div className="flex items-start gap-3">
//                   <Info className="mt-0.5 text-[#008080]" size={18} />
//                   <p className="text-xs leading-relaxed text-slate-600">
//                     Booking fee of <span className="font-bold text-[#008080]">$25.00</span> will be charged upon confirmation. You can reschedule up to 24 hours before the appointment.
//                   </p>
//                 </div>
//               </div>
//             </section>
//           </div>

//           <div className="mt-12 flex items-center justify-between border-t border-slate-200 pt-8">
//             <button className="flex items-center gap-2 font-semibold text-slate-500 transition-colors hover:text-slate-800" type="button">
//               <ArrowLeft size={18} />
//               <span>Cancel Booking</span>
//             </button>

//             <button
//               className="rounded-xl bg-[#008080] px-10 py-4 font-bold text-white shadow-lg shadow-[#0080804d] transition-all hover:-translate-y-0.5 hover:bg-[#007070] active:translate-y-0"
//               type="button"
//             >
//               Confirm Appointment
//             </button>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

// function StepNode({ step, label, active = false }) {
//   return (
//     <div className={active ? "flex flex-1 flex-col items-center" : "flex flex-1 flex-col items-center text-slate-400"}>
//       <div
//         className={active
//           ? "flex h-10 w-10 items-center justify-center rounded-full bg-[#008080] font-bold text-white"
//           : "flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 font-bold"}
//       >
//         {step}
//       </div>
//       <span className={active ? "mt-2 text-xs font-medium text-[#008080]" : "mt-2 text-xs font-medium"}>{label}</span>
//     </div>
//   );
// }
