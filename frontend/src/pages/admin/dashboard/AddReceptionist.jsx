import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Clock3,
  CreditCard,
  EyeOff,
  Image as ImageIcon,
  Info,
  KeyRound,
  Mail,
  MapPin,
  Phone,
  Plus,
  Save,
  ShieldCheck,
  User,
  Users,
  Bell,
  HelpCircle,
  ClipboardList,
} from "lucide-react";

const progressSteps = [
  { icon: User, label: "Personal Info", active: true },
  { icon: Briefcase, label: "Employment", active: false },
  { icon: KeyRound, label: "Account Access", active: false },
  { icon: ShieldCheck, label: "Review", active: false },
];

const genderOptions = ["Female", "Male", "Other"];
const facilityOptions = [
  "Central Medical Hub",
  "North Wing General",
  "Eastside Clinic",
];
const shiftOptions = [
  "Morning (08:00 AM - 04:00 PM)",
  "Evening (04:00 PM - 12:00 AM)",
  "Night (12:00 AM - 08:00 AM)",
];
const employmentTypes = ["Full-time", "Part-time", "Contractual"];
const accessOptions = ["General OPD", "Emergency", "Radiology"];

export default function AddReceptionist() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    gender: "",
    dob: "",
    phone: "",
    email: "",
    address: "",
    emergencyContact: "",
    profileImage: null,
    staffId: "RCP-2024-089",
    facility: "Central Medical Hub",
    deskAssignment: "",
    shiftTiming: "Morning (08:00 AM - 04:00 PM)",
    employmentType: "Full-time",
    joiningDate: "",
    departmentAccess: ["General OPD", "Emergency", "Radiology"],
    permissions: {
      appointmentHandling: true,
      billingAccess: true,
      patientRegistration: true,
      messageHandling: false,
    },
    loginEmail: "",
    temporaryPassword: "",
    confirmPassword: "",
  });

  const [imagePreview, setImagePreview] = useState(
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA98X5Qh-goJfODbyFm-euheQiAd1F8pvSfxs8Ky_BFJRP4CbNp34Dad5hUGk4MJTkzi0S1JHcZmAxlfWLMp1TGEtyJu15g2-SB7Sdde6rxL1ML5Bx7j9aNn6PUPCKUi-6Z0e0Rpx1-3agwUrULA3SdzAbmiGo2zBiZpihxtbngP2mMv1CtxdTu6sPELd9H-pWWltEX9A2wkkj1883xgKSkSXMlghgavr15y-qnt87G8sgiWS_ZjhI613KPfpXiRe87_CX8dbTbPaY3",
  );
  const [err, setErr] = useState("");

  const canSubmit = useMemo(() => {
    return (
      form.fullName.trim() &&
      form.gender.trim() &&
      form.phone.trim() &&
      form.email.trim() &&
      form.staffId.trim() &&
      form.loginEmail.trim() &&
      form.temporaryPassword.trim() &&
      form.confirmPassword.trim() &&
      form.temporaryPassword === form.confirmPassword
    );
  }, [form]);

  const completion = useMemo(() => {
    const sections = [
      !!(form.fullName && form.gender && form.phone && form.email),
      !!(
        form.staffId &&
        form.facility &&
        form.shiftTiming &&
        form.employmentType
      ),
      Object.values(form.permissions).some(Boolean),
      !!(form.loginEmail && form.temporaryPassword && form.confirmPassword),
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
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const toggleDepartment = (name) => {
    setForm((prev) => ({
      ...prev,
      departmentAccess: prev.departmentAccess.includes(name)
        ? prev.departmentAccess.filter((item) => item !== name)
        : [...prev.departmentAccess, name],
    }));
  };

  const togglePermission = (key) => {
    setForm((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [key]: !prev.permissions[key],
      },
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setErr("");

    if (!canSubmit) {
      setErr("Please complete all required fields and ensure passwords match.");
      return;
    }

    console.log("Receptionist registered:", form);
    navigate("/admin/receptionists");
  };

  const onReset = () => {
    setForm({
      fullName: "",
      gender: "",
      dob: "",
      phone: "",
      email: "",
      address: "",
      emergencyContact: "",
      profileImage: null,
      staffId: "RCP-2024-089",
      facility: "Central Medical Hub",
      deskAssignment: "",
      shiftTiming: "Morning (08:00 AM - 04:00 PM)",
      employmentType: "Full-time",
      joiningDate: "",
      departmentAccess: ["General OPD", "Emergency", "Radiology"],
      permissions: {
        appointmentHandling: true,
        billingAccess: true,
        patientRegistration: true,
        messageHandling: false,
      },
      loginEmail: "",
      temporaryPassword: "",
      confirmPassword: "",
    });
    setImagePreview("");
    setErr("");
  };

  return (
    <div className="min-h-screen bg-[#f7fafa] text-slate-900 md:flex">
      <main className="flex-1">
        <div className="mx-auto w-full max-w-7xl px-4 py-8 pb-32 md:px-8">
          {/* <header className="sticky top-0 z-30 mb-8 flex h-16 items-center justify-between border-b border-teal-900/5 bg-white/80 px-4 backdrop-blur-xl md:px-8">
            <div className="flex items-center gap-4">
              <button type="button" className="text-slate-700 md:hidden">
                <ClipboardList size={20} />
              </button>
              <span className="text-lg font-semibold text-teal-700">
                Receptionist Onboarding
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

          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <button
                type="button"
                onClick={() => navigate("/admin/receptionists")}
                className="group mb-4 flex items-center gap-2 text-sm font-medium text-teal-700"
              >
                <ArrowLeft
                  size={16}
                  className="transition-transform group-hover:-translate-x-1"
                />
                Back to Receptionists List
              </button>

              <h2 className="mb-1 text-3xl font-extrabold tracking-tight text-slate-900">
                Add Receptionist
              </h2>
              <p className="text-slate-500">
                Onboard a new front-desk professional to the facility.
              </p>
            </div>

            <div>
              <span className="rounded-full bg-[#a0f2e3] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#137165]">
                Role: Receptionist
              </span>
            </div>
          </div>

          {err && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {err}
            </div>
          )}

          <form
            onSubmit={onSubmit}
            className="grid grid-cols-1 gap-8 lg:grid-cols-3"
          >
            <div className="space-y-8 lg:col-span-2">
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
                          alt="Receptionist preview"
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
                        JPG, PNG up to 5MB.
                      </p>
                      <label className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#008080] px-4 py-2 text-sm font-semibold text-white hover:bg-[#007070]">
                        <ImageIcon size={16} />
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
                    placeholder="e.g. Sarah Jenkins"
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
                      placeholder="sarah.j@clinic.com"
                      icon={<Mail size={18} />}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <TextareaField
                      label="Residential Address"
                      value={form.address}
                      onChange={onChange("address")}
                      placeholder="Enter complete home address..."
                      icon={<MapPin size={18} />}
                    />
                  </div>
                  <Field
                    label="Emergency Contact"
                    value={form.emergencyContact}
                    onChange={onChange("emergencyContact")}
                    placeholder="Name & Phone"
                    icon={<Phone size={18} />}
                  />
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm md:p-8">
                <SectionTitle
                  icon={<Briefcase size={18} />}
                  title="Employment Information"
                />

                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Field
                    label="Staff ID"
                    value={form.staffId}
                    onChange={onChange("staffId")}
                    icon={<CreditCard size={18} />}
                    required
                  />
                  <SelectField
                    label="Branch/Facility"
                    value={form.facility}
                    onChange={onChange("facility")}
                    icon={<Building2 size={18} />}
                    options={facilityOptions}
                    required
                  />
                  <Field
                    label="Desk Assignment"
                    value={form.deskAssignment}
                    onChange={onChange("deskAssignment")}
                    placeholder="e.g. Reception A-2"
                    icon={<Building2 size={18} />}
                  />
                  <SelectField
                    label="Shift Timing"
                    value={form.shiftTiming}
                    onChange={onChange("shiftTiming")}
                    icon={<Clock3 size={18} />}
                    options={shiftOptions}
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
                  icon={<ShieldCheck size={18} />}
                  title="Responsibilities & Access"
                />

                <div className="mt-6 space-y-8">
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-700">
                      Department Access
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {accessOptions.map((item) => {
                        const active = form.departmentAccess.includes(item);
                        return (
                          <button
                            key={item}
                            type="button"
                            onClick={() => toggleDepartment(item)}
                            className={[
                              "rounded-full border px-4 py-2 text-xs font-semibold transition-all",
                              active
                                ? "border-[#008080] bg-[#008080]/5 text-[#008080]"
                                : "border-slate-300 text-slate-500 hover:border-[#008080]/50",
                            ].join(" ")}
                          >
                            <span className="inline-flex items-center gap-2">
                              {item}
                              {active ? <span>×</span> : <Plus size={14} />}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
                    <PermissionCard
                      title="Appointment Handling"
                      description="Schedule, cancel or modify bookings"
                      checked={form.permissions.appointmentHandling}
                      onToggle={() => togglePermission("appointmentHandling")}
                    />
                    <PermissionCard
                      title="Billing Access"
                      description="Generate invoices and process payments"
                      checked={form.permissions.billingAccess}
                      onToggle={() => togglePermission("billingAccess")}
                    />
                    <PermissionCard
                      title="Patient Registration"
                      description="Create and update patient profiles"
                      checked={form.permissions.patientRegistration}
                      onToggle={() => togglePermission("patientRegistration")}
                    />
                    <PermissionCard
                      title="Message Handling"
                      description="Manage internal and external communications"
                      checked={form.permissions.messageHandling}
                      onToggle={() => togglePermission("messageHandling")}
                    />
                  </div>
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
                      label="Login Email"
                      type="email"
                      value={form.loginEmail}
                      onChange={onChange("loginEmail")}
                      placeholder="sarah.login@system.com"
                      icon={<Mail size={18} />}
                      required
                    />
                  </div>
                  <Field
                    label="Temporary Password"
                    type="password"
                    value={form.temporaryPassword}
                    onChange={onChange("temporaryPassword")}
                    icon={<KeyRound size={18} />}
                    suffix={<EyeOff size={16} />}
                    required
                  />
                  <Field
                    label="Confirm Password"
                    type="password"
                    value={form.confirmPassword}
                    onChange={onChange("confirmPassword")}
                    icon={<KeyRound size={18} />}
                    required
                  />
                  <div className="md:col-span-2 flex items-start gap-3 rounded-xl border border-teal-100 bg-teal-50 p-4">
                    <Info size={18} className="mt-0.5 text-[#006565]" />
                    <p className="text-xs font-medium leading-relaxed text-teal-800">
                      The user will be prompted to change their temporary
                      password upon their first login to the admin panel.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            <aside className="space-y-6">
              <div className="sticky top-24 overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm">
                <div className="bg-[#006565] p-6 text-white">
                  <h4 className="text-lg font-bold">Onboarding Summary</h4>
                  <p className="mt-1 text-xs text-white/80">
                    Completing receptionist profile setup
                  </p>
                </div>

                <div className="space-y-8 p-6">
                  <div className="space-y-2">
                    <div className="flex items-end justify-between">
                      <span className="text-xs font-bold uppercase text-slate-500">
                        Profile Completion
                      </span>
                      <span className="text-lg font-bold text-[#006565]">
                        {completion}%
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-[#006565]"
                        style={{ width: `${completion}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h5 className="flex items-center gap-2 text-sm font-bold text-slate-900">
                      <ClipboardList size={18} className="text-[#006565]" />
                      Role Permissions Preview
                    </h5>

                    <ul className="space-y-3 text-xs">
                      <SummaryItem label="Appointment Handling" complete />
                      <SummaryItem label="Billing Access" complete />
                      <SummaryItem label="Patient Registration" complete />
                      <SummaryItem label="Message Handling" complete={false} />
                    </ul>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Assignment Preview
                    </h5>

                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm">
                        <Building2 size={18} className="text-teal-700" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          {form.facility || "Central Medical Hub"}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          {form.deskAssignment || "Reception Desk Assignment"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex justify-between border-t border-slate-200 pt-3">
                      <Metric
                        title="Access"
                        value={`${form.departmentAccess.length}`}
                      />
                      <Metric title="Shift" value="AM" withDivider />
                      <Metric title="Status" value="Ready" />
                    </div>
                  </div>

                  <p className="text-center text-[10px] italic text-slate-500">
                    Please review access permissions before final activation.
                  </p>
                </div>
              </div>
            </aside>
          </form>
        </div>

        <footer className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/90 px-4 py-4 backdrop-blur-md md:px-8">
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
                onClick={() => navigate("/admin/receptionists")}
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
                Add Receptionist
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
  suffix,
  type = "text",
  required = false,
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
        <input
          type={type}
          required={required}
          className={[
            "w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pr-4 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-[#008080] focus:ring-2 focus:ring-[#008080]/20",
            icon ? "pl-10" : "px-4",
            suffix ? "pr-10" : "",
          ].join(" ")}
          {...props}
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function TextareaField({ label, icon, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-3 text-slate-400">{icon}</span>
        )}
        <textarea
          rows={3}
          className={[
            "w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pr-4 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-[#008080] focus:ring-2 focus:ring-[#008080]/20",
            icon ? "pl-10" : "px-4",
          ].join(" ")}
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
        {icon && (
          <span className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-slate-400">
            {icon}
          </span>
        )}
        <select
          required={required}
          className={[
            "h-[48px] w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pr-10 text-sm text-slate-700 outline-none transition-all focus:border-[#008080] focus:ring-2 focus:ring-[#008080]/20",
            icon ? "pl-10" : "px-4",
          ].join(" ")}
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

function PermissionCard({ title, description, checked, onToggle }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-slate-100/70 p-4">
      <div>
        <p className="font-bold text-slate-900">{title}</p>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
      <button
        type="button"
        onClick={onToggle}
        className={[
          "relative h-6 w-11 rounded-full transition-colors",
          checked ? "bg-[#006565]" : "bg-slate-300",
        ].join(" ")}
      >
        <span
          className={[
            "absolute top-[2px] h-5 w-5 rounded-full bg-white transition-transform",
            checked ? "left-[22px]" : "left-[2px]",
          ].join(" ")}
        />
      </button>
    </div>
  );
}
