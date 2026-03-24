import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { publicAPI } from "../../../../auth/config/api";
import { toast } from "react-toastify";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock3,
  Image as ImageIcon,
  Info,
  KeyRound,
  Mail,
  MapPin,
  Phone,
  Save,
  User,
  Users,
} from "lucide-react";

const genderOptions = ["Female", "Male", "Other"];

const shiftOptions = [
  { label: "Morning (08:00 AM - 04:00 PM)", value: "MORNING" },
  { label: "Evening (04:00 PM - 12:00 AM)", value: "EVENING" },
  { label: "Night (12:00 AM - 08:00 AM)", value: "NIGHT" },
];

const initialForm = {
  fullName: "",
  gender: "",
  dob: "",
  phone: "",
  email: "",
  address: "",
  profileImage: null,
  shiftTiming: "MORNING",
  username: "",
  password: "",
  confirmPassword: "",
};

export default function AddReceptionist() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [imagePreview, setImagePreview] = useState("");
  const [err, setErr] = useState("");
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
      form.username.trim() &&
      form.password.trim() &&
      form.confirmPassword.trim() &&
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

  const validateForm = () => {
    if (
      !form.fullName.trim() ||
      !form.gender.trim() ||
      !form.phone.trim() ||
      !form.email.trim() ||
      !form.username.trim() ||
      !form.password.trim() ||
      !form.confirmPassword.trim()
    ) {
      return "Please complete all required fields.";
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
    formData.append("shift", form.shiftTiming);
    formData.append("username", form.username);
    formData.append("password", form.password);

    if (form.profileImage) {
      formData.append("profile_image", form.profileImage);
    }

    return formData;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    const validationError = validateForm();
    if (validationError) {
      setErr(validationError);
      toast.error(validationError);
      return;
    }

    setLoading(true);

    try {
      const formData = buildFormData();

      const response = await publicAPI.post(
        "/admin/create-receptionist/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 10000,
        },
      );

      toast.success(
        response.data?.message || "Receptionist created successfully.",
      );

      setTimeout(() => {
        navigate("/admin/receptionist-management");
      }, 1000);
    } catch (error) {
      console.error("Create receptionist error:", error);

      if (error.code === "ERR_NETWORK") {
        toast.error("Network error. Please check your connection.");
      } else if (error.code === "ECONNABORTED") {
        toast.error("Request timed out. Please try again.");
      } else {
        const serverData = error.response?.data;

        if (typeof serverData === "string") {
          setErr(serverData);
          toast.error(serverData);
        } else if (serverData?.message) {
          setErr(serverData.message);
          toast.error(serverData.message);
        } else if (serverData?.detail) {
          setErr(serverData.detail);
          toast.error(serverData.detail);
        } else if (serverData && typeof serverData === "object") {
          const firstError = Object.values(serverData)?.[0];
          const errorMessage =
            Array.isArray(firstError) && firstError.length > 0
              ? firstError[0]
              : "Failed to create receptionist.";

          setErr(errorMessage);
          toast.error(errorMessage);
        } else {
          setErr("Failed to create receptionist.");
          toast.error("Failed to create receptionist.");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const onReset = () => {
    setForm({ ...initialForm });
    setImagePreview("");
    setErr("");
  };

  return (
    <div className="min-h-screen bg-[#f7fafa] text-slate-900 md:flex">
      <main className="flex-1">
        <div className="mx-auto w-full max-w-5xl px-4 py-8 pb-32 md:px-8">
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

          <form onSubmit={onSubmit} className="w-full">
            <div className="space-y-8">
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
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm md:p-8">
                <SectionTitle
                  icon={<Clock3 size={18} />}
                  title="Work Assignment"
                />

                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <SelectField
                    label="Shift Timing"
                    value={form.shiftTiming}
                    onChange={onChange("shiftTiming")}
                    icon={<Clock3 size={18} />}
                    options={shiftOptions}
                    required
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
                      type="text"
                      value={form.username}
                      onChange={onChange("username")}
                      placeholder="sarah.jenkins"
                      icon={<Mail size={18} />}
                      required
                    />
                  </div>

                  <Field
                    label="Password"
                    type="password"
                    value={form.password}
                    onChange={onChange("password")}
                    icon={<KeyRound size={18} />}
                    required
                  />

                  <Field
                    label="Confirm Password"
                    type="password"
                    value={form.confirmPassword}
                    onChange={onChange("confirmPassword")}
                    icon={<KeyRound size={18} />}
                    error={pwMismatch ? "Passwords do not match." : ""}
                    required
                  />

                  <div className="md:col-span-2 flex items-start gap-3 rounded-xl border border-teal-100 bg-teal-50 p-4">
                    <Info size={18} className="mt-0.5 text-[#006565]" />
                    <p className="text-xs font-medium leading-relaxed text-teal-800">
                      The user will be prompted to change their temporary
                      password upon their first login.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </form>
        </div>

        <footer className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/90 backdrop-blur-md">
          <div className="mx-auto w-full max-w-5xl px-4 py-4 md:px-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="flex items-center gap-2 text-slate-500">
                <Info size={16} />
                <span className="text-xs font-medium">
                  Fill in the receptionist details and save to continue.
                </span>
              </div>

              <div className="flex w-full items-center gap-4 sm:w-auto">
                <button
                  type="button"
                  onClick={() => navigate("/admin/receptionist-management")}
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
                  {loading ? "Adding..." : "Add Receptionist"}
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
  suffix,
  type = "text",
  required = false,
  error = "",
  value = "",
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
          value={value ?? ""}
          className={[
            "w-full rounded-xl border bg-slate-50 py-3 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:ring-2",
            icon ? "pl-10" : "px-4",
            suffix ? "pr-10" : "pr-4",
            error
              ? "border-red-300 focus:border-red-400 focus:ring-red-200"
              : "border-slate-200 focus:border-[#008080] focus:ring-[#008080]/20",
          ].join(" ")}
          {...props}
        />

        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
            {suffix}
          </span>
        )}
      </div>

      {error ? (
        <p className="text-xs font-medium text-red-600">{error}</p>
      ) : null}
    </div>
  );
}

function TextareaField({ label, icon, value = "", ...props }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-3 text-slate-400">{icon}</span>
        )}
        <textarea
          rows={3}
          value={value ?? ""}
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

function SelectField({
  label,
  icon,
  options,
  required = false,
  value = "",
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
          <span className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-slate-400">
            {icon}
          </span>
        )}
        <select
          required={required}
          value={value ?? ""}
          className={[
            "h-[48px] w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pr-10 text-sm text-slate-700 outline-none transition-all focus:border-[#008080] focus:ring-2 focus:ring-[#008080]/20",
            icon ? "pl-10" : "px-4",
          ].join(" ")}
          {...props}
        >
          <option value="">Select</option>
          {options.map((option) => {
            const value = typeof option === "string" ? option : option.value;
            const label = typeof option === "string" ? option : option.label;

            return (
              <option key={value} value={value}>
                {label}
              </option>
            );
          })}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
          ▾
        </span>
      </div>
    </div>
  );
}
