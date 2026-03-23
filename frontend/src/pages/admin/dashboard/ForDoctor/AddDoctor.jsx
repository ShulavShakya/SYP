import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { publicAPI } from "../../../../auth/config/api";
import { toast } from "react-toastify";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  Camera,
  Clock3,
  Image as ImageIcon,
  KeyRound,
  Mail,
  MapPin,
  Phone,
  Save,
  Stethoscope,
  User,
  Users,
  CheckCircle2,
} from "lucide-react";

const specialtyOptions = [
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "General Surgery",
  "Dermatology",
  "Orthopedics",
];

const shiftOptions = ["MORNING", "EVENING", "NIGHT"];

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
    specialty: "",
    experience: "",
    qualifications: "",
    shiftTime: "MORNING",
    availabilityDays: ["MON", "WED", "THU"],
    username: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  const pwMismatch = useMemo(() => {
    return (
      form.password &&
      form.confirmPassword &&
      form.password !== form.confirmPassword
    );
  }, [form.password, form.confirmPassword]);

  const canSubmit = useMemo(() => {
    return (
      form.fullName.trim() &&
      form.gender.trim() &&
      form.phone.trim() &&
      form.email.trim() &&
      form.specialty.trim() &&
      form.qualifications.trim() &&
      form.username.trim() &&
      form.password.trim() &&
      form.confirmPassword.trim() &&
      form.availabilityDays.length > 0 &&
      !pwMismatch
    );
  }, [form, pwMismatch]);

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
      availabilityDays: prev.availabilityDays.includes(day)
        ? prev.availabilityDays.filter((item) => item !== day)
        : [...prev.availabilityDays, day],
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
      specialty: "",
      experience: "",
      qualifications: "",
      shiftTime: "MORNING",
      availabilityDays: ["MON", "WED", "THU"],
      username: "",
      password: "",
      confirmPassword: "",
      profileImage: null,
    });
    setImagePreview("");
  };

  const validateForm = () => {
    if (
      !form.fullName.trim() ||
      !form.gender.trim() ||
      !form.phone.trim() ||
      !form.email.trim() ||
      !form.specialty.trim() ||
      !form.qualifications.trim() ||
      !form.username.trim() ||
      !form.password.trim() ||
      !form.confirmPassword.trim()
    ) {
      return "Please fill all required fields.";
    }

    if (form.availabilityDays.length === 0) {
      return "Please select at least one availability day.";
    }

    if (pwMismatch) {
      return "Passwords do not match.";
    }

    return "";
  };

  const buildFormData = () => {
    const formData = new FormData();

    formData.append("name", form.fullName);
    formData.append("gender", form.gender);
    formData.append("dob", form.dob || "");
    formData.append("phone", form.phone);
    formData.append("email", form.email);
    formData.append("address", form.address || "");
    formData.append("specialty", form.specialty);
    formData.append("experience_years", form.experience || "0");
    formData.append("qualifications", form.qualifications);
    formData.append("shift", form.shiftTime);
    formData.append("username", form.username);
    formData.append("password", form.password);

    form.availabilityDays.forEach((day) => {
      formData.append("availability_days", day);
    });

    if (form.profileImage) {
      formData.append("profile_image", form.profileImage);
    }

    return formData;
  };

  const onSubmit = async (e) => {
    if (e) e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    setLoading(true);

    try {
      const formData = buildFormData();

      const response = await publicAPI.post("/admin/create-doctor/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 10000,
      });

      console.log("Doctor created:", response.data);
      toast.success(response.data?.message || "Doctor created successfully.");

      setTimeout(() => {
        navigate("/admin/doctor-management");
      }, 1000);
    } catch (error) {
      console.error("Create doctor error:", error);

      if (error.code === "ERR_NETWORK") {
        toast.error("Network error. Please check your connection.");
      } else if (error.code === "ECONNABORTED") {
        toast.error("Request timed out. Please try again.");
      } else {
        const serverData = error.response?.data;

        if (typeof serverData === "string") {
          toast.error(serverData);
        } else if (serverData?.message) {
          toast.error(serverData.message);
        } else if (serverData?.detail) {
          toast.error(serverData.detail);
        } else if (serverData && typeof serverData === "object") {
          const firstError = Object.values(serverData)?.[0];
          if (Array.isArray(firstError) && firstError.length > 0) {
            toast.error(firstError[0]);
          } else {
            toast.error("Failed to create doctor.");
          }
        } else {
          toast.error("Failed to create doctor.");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7fafa] text-slate-900 md:flex">
      <main className="flex-1">
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

          <form onSubmit={onSubmit} className="w-full">
            <div className="w-full space-y-8">
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
                        JPG, PNG or GIF. Optional.
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
                  <SelectField
                    label="Specialty"
                    value={form.specialty}
                    onChange={onChange("specialty")}
                    icon={<HeartPulseIcon />}
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

                  <div className="md:col-span-2">
                    <TextareaField
                      label="Qualifications"
                      value={form.qualifications}
                      onChange={onChange("qualifications")}
                      placeholder="MBBS, MD (Cardiology)"
                      icon={<Stethoscope size={18} />}
                      required
                    />
                  </div>
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
                      Availability Days
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <div className="flex flex-wrap gap-2">
                      {availableDayOptions.map((day) => {
                        const active = form.availabilityDays.includes(day);

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
                    label="Password"
                    type="password"
                    value={form.password}
                    onChange={onChange("password")}
                    placeholder="Enter password"
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
          </form>
        </div>

        <footer className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/90 backdrop-blur-md">
          <div className="w-full max-w-none px-4 py-4 md:px-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="flex items-center gap-2 text-slate-500">
                <span className="text-xs font-medium">
                  Fill in the doctor details and save to continue.
                </span>
              </div>

              <div className="flex w-full items-center gap-4 sm:w-auto">
                <button
                  type="button"
                  onClick={() => navigate("/admin/doctor-management")}
                  className="flex-1 rounded-xl px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 sm:flex-none"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={onReset}
                  className="flex-1 rounded-xl border border-[#008080] px-6 py-2.5 text-sm font-semibold text-[#008080] transition hover:bg-[#008080]/5 sm:flex-none"
                >
                  Reset
                </button>

                <button
                  type="button"
                  onClick={onSubmit}
                  disabled={!canSubmit || loading}
                  className={[
                    "flex flex-1 items-center justify-center gap-2 rounded-xl px-8 py-2.5 text-sm font-bold text-white shadow-lg transition-all sm:flex-none",
                    canSubmit && !loading
                      ? "bg-gradient-to-br from-[#006565] to-[#008080] shadow-[#006565]/20 hover:scale-[1.02]"
                      : "cursor-not-allowed bg-slate-300 shadow-none",
                  ].join(" ")}
                >
                  <Save size={16} />
                  {loading ? "Adding..." : "Add Doctor"}
                </button>
              </div>
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

function TextareaField({ label, icon, required = false, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-slate-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
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

function HeartPulseIcon() {
  return <Stethoscope size={18} />;
}
