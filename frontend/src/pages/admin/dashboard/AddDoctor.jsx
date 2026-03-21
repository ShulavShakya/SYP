import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  Camera,
  CheckCircle2,
  Clock3,
  HeartPulse,
  HelpCircle,
  Image as ImageIcon,
  Info,
  KeyRound,
  LayoutDashboard,
  Mail,
  MapPin,
  Phone,
  Save,
  Settings,
  Stethoscope,
  User,
  Users,
  Bell,
  BarChart3,
  Building2,
  ClipboardList,
  CreditCard,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: false },
  { icon: Stethoscope, label: "Doctors", active: true },
  { icon: Users, label: "Patients", active: false },
  { icon: Calendar, label: "Appointments", active: false },
  { icon: BarChart3, label: "Analytics", active: false },
  { icon: Settings, label: "Settings", active: false },
];

const specialtyOptions = [
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "General Surgery",
];

const employmentTypes = ["Full-Time", "Part-Time", "Contractual"];
const shiftOptions = [
  "Morning (08:00 - 14:00)",
  "Afternoon (14:00 - 20:00)",
  "Night (20:00 - 02:00)",
];
const branchOptions = [
  "Main Center - Downtown",
  "East Wing Clinic",
  "Suburban Specialist Hub",
];
const statusOptions = ["Active", "On Leave", "Training"];
const genderOptions = ["Male", "Female", "Other"];
const availableDayOptions = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export default function AddDoctor() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    gender: "",
    dob: "",
    phone: "",
    email: "",
    address: "",
    doctorId: "",
    specialty: "",
    experience: "",
    qualification: "",
    licenseNo: "",
    consultationFee: "",
    employmentType: "Full-Time",
    joiningDate: "",
    availableDays: ["MON", "WED", "THU"],
    shiftTime: "Morning (08:00 - 14:00)",
    roomNo: "",
    branchLocation: "Main Center - Downtown",
    initialStatus: "Active",
    username: "",
    temporaryPassword: "",
    confirmPassword: "",
    profileImage: null,
  });

  const [imagePreview, setImagePreview] = useState("");
  const [err, setErr] = useState("");

  const canSubmit = useMemo(() => {
    return (
      form.fullName.trim() &&
      form.gender.trim() &&
      form.phone.trim() &&
      form.email.trim() &&
      form.doctorId.trim() &&
      form.specialty.trim() &&
      form.username.trim() &&
      form.temporaryPassword.trim() &&
      form.confirmPassword.trim() &&
      form.temporaryPassword === form.confirmPassword
    );
  }, [form]);

  const completedSections = useMemo(() => {
    const sections = [
      !!(form.fullName && form.gender && form.phone && form.email),
      !!(
        form.doctorId &&
        form.specialty &&
        form.qualification &&
        form.licenseNo
      ),
      !!(form.shiftTime && form.branchLocation && form.initialStatus),
      !!(form.username && form.temporaryPassword && form.confirmPassword),
    ];

    return Math.round(
      (sections.filter(Boolean).length / sections.length) * 100,
    );
  }, [form]);

  const onChange = (key) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onImageChange = (e) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, profileImage: file }));

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview("");
    }
  };

  const toggleAvailableDay = (day) => {
    setForm((prev) => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter((item) => item !== day)
        : [...prev.availableDays, day],
    }));
  };

  const onReset = () => {
    setForm({
      fullName: "",
      gender: "",
      dob: "",
      phone: "",
      email: "",
      address: "",
      doctorId: "",
      specialty: "",
      experience: "",
      qualification: "",
      licenseNo: "",
      consultationFee: "",
      employmentType: "Full-Time",
      joiningDate: "",
      availableDays: ["MON", "WED", "THU"],
      shiftTime: "Morning (08:00 - 14:00)",
      roomNo: "",
      branchLocation: "Main Center - Downtown",
      initialStatus: "Active",
      username: "",
      temporaryPassword: "",
      confirmPassword: "",
      profileImage: null,
    });
    setImagePreview("");
    setErr("");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setErr("");

    if (!canSubmit) {
      setErr("Please complete all required fields and ensure passwords match.");
      return;
    }

    console.log("Doctor registered:", form);
    navigate("/admin/doctors");
  };

  return (
    <div className="min-h-screen bg-[#f7fafa] text-slate-900 md:flex">
      {/* <aside className="hidden h-screen w-64 shrink-0 flex-col bg-slate-50 md:sticky md:top-0 md:flex">
        <div className="flex items-center gap-3 p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#008080] text-white">
            <Stethoscope size={20} />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-teal-800">
              Clinical Serenity
            </h1>
            <p className="mt-1 text-xs text-slate-500">Admin Panel</p>
          </div>
        </div>

        <nav className="mt-4 flex-1 space-y-1 px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                type="button"
                className={[
                  "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition-colors",
                  item.active
                    ? "border-r-4 border-teal-600 bg-teal-50/70 font-semibold text-teal-700"
                    : "text-slate-500 hover:bg-teal-50 hover:text-teal-600",
                ].join(" ")}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-auto p-4">
          <div className="flex items-center gap-3 rounded-2xl bg-slate-100 p-4">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjrhJO49BNpH7T7ZBL1mRSNz4YQ0qL_Pw4C3oI6VMLsBGEgVIgQYGBbbw7mW7TI2rZLZWZCuUcujKmNd8_z6fDMtnCO8Qn4xmoEvtK2nV8tpa4X1779apjA5him_oh-jJ3lpf4vhu5XZKj3ocNKhSZZzGi8pnANy9hqLQ64KV61q3MmsFJVtxGOirFJpHI6NHXncMNHUDMMqSJq2zWQf3jf8D4CjqxJSXDMR6s_6B5_IpCIBOm2ZUMeIa-9_BNu9rSw-vp8esjYluJ"
              alt="Admin profile"
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-800">
                Admin Profile
              </p>
              <p className="truncate text-xs text-slate-500">Super Admin</p>
            </div>
          </div>
        </div>
      </aside> */}

      <main className="flex-1">
        {/* <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-teal-900/5 bg-white/80 px-4 backdrop-blur-xl md:px-8">
          <div className="flex items-center gap-4">
            <button type="button" className="text-slate-700 md:hidden">
              <ClipboardList size={20} />
            </button>
            <span className="text-lg font-semibold text-teal-700">
              Doctor Onboarding
            </span>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden items-center rounded-full bg-slate-100 px-4 py-2 md:flex">
              <input
                type="text"
                placeholder="Search patient or record..."
                className="w-64 border-none bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </div>
            <button
              type="button"
              className="text-slate-600 transition hover:opacity-80"
            >
              <Bell size={18} />
            </button>
            <button
              type="button"
              className="text-slate-600 transition hover:opacity-80"
            >
              <HelpCircle size={18} />
            </button>
          </div>
        </header> */}

        <div className="w-full max-w-none px-4 py-8 pb-32 md:px-8">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <button
                type="button"
                onClick={() => navigate("/admin/doctor-management")}
                className="group mb-4 flex items-center gap-2 text-sm font-medium text-teal-700"
              >
                <ArrowLeft
                  size={16}
                  className="transition-transform group-hover:-translate-x-1"
                />
                Back to Doctors List
              </button>

              <h2 className="mb-1 text-3xl font-extrabold tracking-tight text-slate-900">
                Add Doctor
              </h2>
              <p className="text-slate-500">
                Onboard a new medical professional to the hospital roster.
              </p>
            </div>

            <div>
              <span className="rounded-full bg-[#a0f2e3] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#137165]">
                Role: Doctor
              </span>
            </div>
          </div>

          {err && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {err}
            </div>
          )}

          <form onSubmit={onSubmit} className="w-full">
            <div className="space-y-8 w-full">
              <section className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm md:p-8">
                <SectionTitle
                  icon={<User size={18} />}
                  title="Personal Information"
                />

                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="md:col-span-2 flex flex-col gap-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 md:flex-row md:items-center">
                    <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Doctor preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <ImageIcon size={28} className="text-slate-400" />
                      )}
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-800">
                        Profile Image
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Min 400x400px. JPG, PNG or GIF. Max 2MB.
                      </p>
                      <label className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#008080] px-4 py-2 text-sm font-semibold text-white hover:bg-[#007070]">
                        <Camera size={16} />
                        Upload Image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={onImageChange}
                          className="hidden"
                        />
                      </label>
                      {form.profileImage && (
                        <p className="mt-2 text-xs font-medium text-slate-700">
                          {form.profileImage.name}
                        </p>
                      )}
                    </div>
                  </div>

                  <Field
                    label="Full Name"
                    value={form.fullName}
                    onChange={onChange("fullName")}
                    placeholder="Dr. Jane Smith"
                    icon={<User size={18} />}
                    required
                  />

                  <SelectField
                    label="Gender"
                    value={form.gender}
                    onChange={onChange("gender")}
                    icon={<Users size={18} />}
                    options={genderOptions}
                    required
                  />

                  <Field
                    label="Date of Birth"
                    type="date"
                    value={form.dob}
                    onChange={onChange("dob")}
                    icon={<Calendar size={18} />}
                  />

                  <Field
                    label="Phone Number"
                    type="tel"
                    value={form.phone}
                    onChange={onChange("phone")}
                    placeholder="+1 (555) 000-0000"
                    icon={<Phone size={18} />}
                    required
                  />

                  <div className="md:col-span-2">
                    <Field
                      label="Email Address"
                      type="email"
                      value={form.email}
                      onChange={onChange("email")}
                      placeholder="jane.smith@hospital.com"
                      icon={<Mail size={18} />}
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <TextareaField
                      label="Full Address"
                      value={form.address}
                      onChange={onChange("address")}
                      placeholder="Street, City, State, ZIP Code"
                      icon={<MapPin size={18} />}
                    />
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm md:p-8">
                <SectionTitle
                  icon={<Briefcase size={18} />}
                  title="Professional Information"
                />

                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Field
                    label="Doctor ID"
                    value={form.doctorId}
                    onChange={onChange("doctorId")}
                    placeholder="DOC-2024-001"
                    icon={<CreditCard size={18} />}
                    required
                  />

                  <SelectField
                    label="Specialty"
                    value={form.specialty}
                    onChange={onChange("specialty")}
                    icon={<HeartPulse size={18} />}
                    options={specialtyOptions}
                    required
                  />

                  <Field
                    label="Years of Experience"
                    type="number"
                    value={form.experience}
                    onChange={onChange("experience")}
                    placeholder="e.g. 10"
                    icon={<Briefcase size={18} />}
                  />

                  <Field
                    label="Qualification"
                    value={form.qualification}
                    onChange={onChange("qualification")}
                    placeholder="MBBS, MD (Cardiology)"
                    icon={<ShieldIcon />}
                    required
                  />

                  <Field
                    label="Medical License No"
                    value={form.licenseNo}
                    onChange={onChange("licenseNo")}
                    placeholder="LIC-987654321"
                    icon={<ShieldIcon />}
                    required
                  />

                  <Field
                    label="Consultation Fee ($)"
                    type="number"
                    value={form.consultationFee}
                    onChange={onChange("consultationFee")}
                    placeholder="150"
                    icon={<CreditCard size={18} />}
                  />

                  <SelectField
                    label="Employment Type"
                    value={form.employmentType}
                    onChange={onChange("employmentType")}
                    icon={<Briefcase size={18} />}
                    options={employmentTypes}
                  />

                  <Field
                    label="Joining Date"
                    type="date"
                    value={form.joiningDate}
                    onChange={onChange("joiningDate")}
                    icon={<Calendar size={18} />}
                  />
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm md:p-8">
                <SectionTitle
                  icon={<Calendar size={18} />}
                  title="Work Assignment"
                />

                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="md:col-span-2 flex flex-col gap-3">
                    <label className="text-sm font-semibold text-slate-700">
                      Available Days
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {availableDayOptions.map((day) => {
                        const active = form.availableDays.includes(day);
                        return (
                          <button
                            key={day}
                            type="button"
                            onClick={() => toggleAvailableDay(day)}
                            className={[
                              "rounded-full border px-4 py-2 text-xs font-semibold transition-all",
                              active
                                ? "border-[#008080] bg-[#008080]/5 text-[#008080]"
                                : "border-slate-300 text-slate-500 hover:border-[#008080]/50",
                            ].join(" ")}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <SelectField
                    label="Shift Time"
                    value={form.shiftTime}
                    onChange={onChange("shiftTime")}
                    icon={<Clock3 size={18} />}
                    options={shiftOptions}
                  />

                  <Field
                    label="Room / OP No"
                    value={form.roomNo}
                    onChange={onChange("roomNo")}
                    placeholder="e.g. B-204"
                    icon={<Building2 size={18} />}
                  />

                  <SelectField
                    label="Branch Location"
                    value={form.branchLocation}
                    onChange={onChange("branchLocation")}
                    icon={<MapPin size={18} />}
                    options={branchOptions}
                  />

                  <SelectField
                    label="Initial Status"
                    value={form.initialStatus}
                    onChange={onChange("initialStatus")}
                    icon={<Info size={18} />}
                    options={statusOptions}
                  />
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm md:p-8">
                <SectionTitle
                  icon={<KeyRound size={18} />}
                  title="Account Access"
                />

                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <Field
                      label="Username"
                      value={form.username}
                      onChange={onChange("username")}
                      placeholder="dr.jsmith"
                      prefix="@"
                      required
                    />
                  </div>

                  <Field
                    label="Temporary Password"
                    type="password"
                    value={form.temporaryPassword}
                    onChange={onChange("temporaryPassword")}
                    placeholder="Enter temporary password"
                    icon={<KeyRound size={18} />}
                    required
                  />

                  <Field
                    label="Confirm Password"
                    type="password"
                    value={form.confirmPassword}
                    onChange={onChange("confirmPassword")}
                    placeholder="Re-enter password"
                    icon={<KeyRound size={18} />}
                    required
                  />
                </div>
              </section>
            </div>

            {/* <aside className="space-y-6">
              <div className="sticky top-24 overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm">
                <div className="bg-[#006565] p-6 text-white">
                  <h4 className="text-lg font-bold">Onboarding Summary</h4>
                  <p className="mt-1 text-xs text-white/80">
                    Completing doctor profile setup
                  </p>
                </div>

                <div className="space-y-8 p-6">
                  <div className="space-y-2">
                    <div className="flex items-end justify-between">
                      <span className="text-xs font-bold uppercase text-slate-500">
                        Profile Completion
                      </span>
                      <span className="text-lg font-bold text-[#006565]">
                        {completedSections}%
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-[#006565]"
                        style={{ width: `${completedSections}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h5 className="flex items-center gap-2 text-sm font-bold text-slate-900">
                      <ClipboardList size={18} className="text-[#006565]" />
                      Required Documents
                    </h5>

                    <ul className="space-y-3 text-xs">
                      <SummaryItem
                        label="Medical Degree Certification"
                        complete
                      />
                      <SummaryItem
                        label="Valid Practitioner License"
                        complete
                      />
                      <SummaryItem label="Identity Document (Passport/ID)" />
                      <SummaryItem label="Insurance Liability Policy" />
                    </ul>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Department Preview
                    </h5>

                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm">
                        <HeartPulse size={18} className="text-teal-700" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          Cardiology Dept.
                        </p>
                        <p className="text-[10px] text-slate-500">
                          East Wing, Level 4
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex justify-between border-t border-slate-200 pt-3">
                      <Metric title="Doctors" value="12" />
                      <Metric title="Theaters" value="4" withDivider />
                      <Metric title="Rating" value="98%" />
                    </div>
                  </div>

                  <p className="text-center text-[10px] italic text-slate-500">
                    Please ensure all medical credentials are verified before
                    final activation.
                  </p>
                </div>
              </div>
            </aside> */}
          </form>
        </div>

        <footer className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/90 px-4 py-4 backdrop-blur-md md:left-64 md:px-8">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2 text-slate-500">
              <Info size={16} />
              <span className="text-xs font-medium">
                Auto-saving as draft... Last saved 2m ago
              </span>
            </div>

            <div className="flex w-full items-center gap-4 sm:w-auto">
              <button
                type="button"
                onClick={() => navigate("/admin/doctors")}
                className="flex-1 rounded-xl px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 sm:flex-none"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={onReset}
                className="flex-1 rounded-xl border border-[#008080] px-6 py-2.5 text-sm font-semibold text-[#008080] transition hover:bg-[#008080]/5 sm:flex-none"
              >
                Save Draft
              </button>

              <button
                type="submit"
                disabled={!canSubmit}
                className={[
                  "flex flex-1 items-center justify-center gap-2 rounded-xl px-8 py-2.5 text-sm font-bold text-white shadow-lg transition-all sm:flex-none",
                  canSubmit
                    ? "bg-gradient-to-br from-[#006565] to-[#008080] shadow-[#006565]/20 hover:scale-[1.02]"
                    : "cursor-not-allowed bg-slate-300 shadow-none",
                ].join(" ")}
              >
                <Save size={16} />
                Add Doctor
              </button>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

function SectionTitle({ icon, title }) {
  return (
    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
      <span className="text-[#008080]">{icon}</span>
      <h3 className="text-base font-bold text-slate-900">{title}</h3>
    </div>
  );
}

function Field({
  label,
  icon,
  type = "text",
  required = false,
  prefix,
  ...props
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-slate-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </span>
        )}
        {prefix && !icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
            {prefix}
          </span>
        )}
        <input
          type={type}
          required={required}
          className={[
            "w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pr-4 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-[#008080] focus:ring-2 focus:ring-[#008080]/20",
            icon || prefix ? "pl-10" : "px-4",
          ].join(" ")}
          {...props}
        />
      </div>
    </div>
  );
}

function TextareaField({ label, icon, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-3 text-slate-400">{icon}</span>
        <textarea
          rows={3}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-[#008080] focus:ring-2 focus:ring-[#008080]/20"
          {...props}
        />
      </div>
    </div>
  );
}

function SelectField({ label, icon, options, required = false, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-slate-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-slate-400">
          {icon}
        </span>
        <select
          required={required}
          className="h-[48px] w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-10 text-sm text-slate-700 outline-none transition-all focus:border-[#008080] focus:ring-2 focus:ring-[#008080]/20"
          {...props}
        >
          <option value="">Select</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
          ▾
        </span>
      </div>
    </div>
  );
}

function SummaryItem({ label, complete = false }) {
  return (
    <li className="flex items-center justify-between">
      <span className="text-slate-500">{label}</span>
      {complete ? (
        <CheckCircle2 size={16} className="text-teal-600" />
      ) : (
        <Clock3 size={16} className="text-slate-400" />
      )}
    </li>
  );
}

function Metric({ title, value, withDivider = false }) {
  return (
    <div
      className={[
        "flex-1 text-center",
        withDivider ? "border-x border-slate-200" : "",
      ].join(" ")}
    >
      <p className="text-xs font-bold text-slate-900">{value}</p>
      <p className="text-[9px] uppercase text-slate-500">{title}</p>
    </div>
  );
}

function ShieldIcon() {
  return <ShieldBadge size={18} />;
}

function ShieldBadge({ size = 18 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
