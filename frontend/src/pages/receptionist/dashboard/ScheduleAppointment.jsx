import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DayPicker } from "react-day-picker";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  UserRoundSearch,
} from "lucide-react";

const departments = [
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "Dermatology",
  "General Medicine",
];

const doctors = [
  "Dr. Sarah Jenkins",
  "Dr. Michael Chen",
  "Dr. Elena Rodriguez",
  "Dr. James Wilson",
];

const initialTimeSlots = [
  { time: "09:00 AM", disabled: false },
  { time: "09:30 AM", disabled: false },
  { time: "10:00 AM", disabled: false },
  { time: "10:30 AM", disabled: false },
  { time: "11:00 AM", disabled: true },
  { time: "11:30 AM", disabled: false },
  { time: "12:00 PM", disabled: false },
  { time: "12:30 PM", disabled: false },
  { time: "02:00 PM", disabled: false },
  { time: "02:30 PM", disabled: false },
  { time: "03:00 PM", disabled: false },
  { time: "03:30 PM", disabled: false },
];

export default function ScheduleAppointment() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date(2023, 9, 5));
  const [selectedTime, setSelectedTime] = useState("10:00 AM");

  return (
    <div className="min-h-screen bg-background-light font-display text-slate-900">
      <div className="flex min-h-screen flex-col">
        <main className="flex flex-1 flex-col items-center px-4 py-10">
          <div className="w-full max-w-4xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
            <div className="bg-primary p-8 text-white">
              <h1 className="text-3xl font-black tracking-tight">
                Schedule Appointment
              </h1>
              <p className="mt-2 opacity-90">
                Receptionist Portal • Medical Flow Management
              </p>
            </div>

            <div className="space-y-8 p-8">
              <section>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Search Patient
                </label>
                <div className="group relative">
                  <UserRoundSearch
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-primary"
                  />
                  <input
                    type="text"
                    placeholder="Enter Patient Name, ID, or Phone Number"
                    className="w-full rounded-lg border-2 border-slate-100 bg-slate-50 py-4 pl-12 pr-4 text-base transition-all focus:border-primary focus:ring-0"
                  />
                </div>
              </section>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <section>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Department
                  </label>
                  <div className="relative">
                    <select className="w-full appearance-none rounded-lg border-2 border-slate-100 bg-slate-50 p-4 pr-10 text-base focus:border-primary focus:ring-0">
                      {departments.map((department) => (
                        <option key={department}>{department}</option>
                      ))}
                    </select>
                    <ChevronRight
                      size={18}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-slate-400"
                    />
                  </div>
                </section>

                <section>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Doctor
                  </label>
                  <div className="relative">
                    <select className="w-full appearance-none rounded-lg border-2 border-slate-100 bg-slate-50 p-4 pr-10 text-base focus:border-primary focus:ring-0">
                      {doctors.map((doctor) => (
                        <option key={doctor}>{doctor}</option>
                      ))}
                    </select>
                    <ChevronRight
                      size={18}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-slate-400"
                    />
                  </div>
                </section>
              </div>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
                <div className="space-y-3 lg:col-span-2">
                  <label className="block text-sm font-bold text-slate-700">
                    Appointment Date
                  </label>

                  <div className="rounded-[20px] border-2 border-slate-200 bg-[#f3f5f7] p-6">
                    <DayPicker
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      showOutsideDays={false}
                      className="w-full"
                      components={{
                        Chevron: ({ orientation, ...props }) =>
                          orientation === "left" ? (
                            <ChevronLeft {...props} size={22} />
                          ) : (
                            <ChevronRight {...props} size={22} />
                          ),
                      }}
                      classNames={{
                        months: "flex justify-center",
                        month: "w-full",
                        month_caption:
                          "relative mb-6 flex items-center justify-center px-10",
                        caption_label:
                          "text-lg font-bold tracking-tight text-slate-900",
                        nav: "absolute inset-x-0 top-0 flex items-center justify-between",
                        button_previous:
                          "flex h-10 w-10 items-center justify-center rounded-full text-slate-800 transition hover:bg-slate-200",
                        button_next:
                          "flex h-10 w-10 items-center justify-center rounded-full text-slate-800 transition hover:bg-slate-200",
                        month_grid: "w-full border-collapse",
                        weekdays: "grid grid-cols-7 gap-2 mb-4",
                        weekday:
                          "flex h-10 items-center justify-center text-xs font-bold text-slate-400",
                        week: "grid grid-cols-7 gap-2 mb-2",
                        day: "flex items-center justify-center",
                        day_button:
                          "flex h-10 w-10 items-center justify-center rounded-xl text-sm font-medium text-slate-900 transition hover:bg-primary/10",
                        selected:
                          "bg-primary text-white font-bold hover:bg-primary",
                        today: "font-bold text-primary",
                        outside: "invisible",
                        disabled:
                          "cursor-not-allowed text-slate-300 line-through",
                        hidden: "invisible",
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-3 lg:col-span-3">
                  <label className="block text-sm font-bold text-slate-700">
                    Select Time Slot
                  </label>

                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                    {initialTimeSlots.map((slot) => (
                      <button
                        key={slot.time}
                        type="button"
                        disabled={slot.disabled}
                        onClick={() =>
                          !slot.disabled && setSelectedTime(slot.time)
                        }
                        className={`rounded-lg border-2 px-2 py-3 text-sm transition-all ${
                          selectedTime === slot.time
                            ? "border-primary bg-primary/5 font-bold text-primary"
                            : slot.disabled
                              ? "cursor-not-allowed border-slate-100 bg-slate-100 text-slate-400 line-through"
                              : "border-slate-100 bg-white font-semibold hover:border-secondary"
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <section>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Reason for Visit
                </label>
                <textarea
                  rows={4}
                  placeholder="Briefly describe the symptoms or reason for the appointment..."
                  className="w-full resize-none rounded-lg border-2 border-slate-100 bg-slate-50 p-4 text-base transition-all focus:border-primary focus:ring-0"
                />
              </section>

              <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                <button
                  type="button"
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary py-4 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
                >
                  <CalendarDays size={18} />
                  Book Appointment
                </button>

                <button
                  type="button"
                  className="flex-1 rounded-lg border-2 border-slate-200 py-4 font-bold text-slate-600 transition-all hover:bg-slate-50"
                  onClick={() => {
                    navigate("/reception/appointments");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-8 py-4 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} />
                Secure Health Data Encrypted
              </div>
              <div>Form Ref: MF-APP-2023-4412</div>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-slate-500">
            <p>© 2023 MedFlow Health Systems. All rights reserved.</p>
          </div>
        </main>
      </div>
    </div>
  );
}
