import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { privateAPI } from "../../../auth/config/api";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Shield,
  ArrowLeft,
  Image as ImageIcon,
  Save,
  Users,
  Lock,
} from "lucide-react";

export default function RegisterPatient() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    dob: "",
    gender: "",
    phone: "",
    username: "",
    password: "",
    address: "",
    blood_group: "",
    emergency_contact_name: "",
    emergency_contact_phone: "",
    profile_image: null,
  });

  const [imagePreview, setImagePreview] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidPhone = (num) => /^\d{10}$/.test(num);

  const canSubmit = useMemo(() => {
    return (
      form.first_name.trim() !== "" &&
      form.last_name.trim() !== "" &&
      form.gender.trim() !== "" &&
      isValidPhone(form.phone) &&
      form.username.trim() !== "" &&
      form.password.trim() !== ""
    );
  }, [form]);

  const onChange = (key) => (e) => {
    let value = e.target.value;

    if (key === "phone" || key === "emergency_contact_phone") {
      value = value.replace(/\D/g, "");
      if (value.length > 10) value = value.slice(0, 10);
    }

    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onImageChange = (e) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, profile_image: file }));

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview("");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    if (!isValidPhone(form.phone)) {
      setErr("Phone number must be exactly 10 digits.");
      return;
    }

    if (
      form.emergency_contact_phone &&
      !isValidPhone(form.emergency_contact_phone)
    ) {
      setErr("Emergency contact phone must be 10 digits.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        if (key !== "profile_image") {
          formData.append(key, form[key]);
        }
      });

      if (form.profile_image) {
        formData.append("profile_image", form.profile_image);
      }

      const response = await privateAPI.post(
        "/receptionist/patient/create/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      navigate("/reception/records");
    } catch (error) {
      console.error(error);
      if (error.response?.data) {
        const backendErrors = error.response.data;
        const firstError =
          typeof backendErrors === "string"
            ? backendErrors
            : Object.entries(backendErrors)
                .map(([k, v]) => `${k}: ${v}`)
                .join(" | ");
        setErr(firstError || "Failed to create patient.");
      } else {
        setErr("Something went wrong while creating the patient.");
      }
    } finally {
      setLoading(false);
    }
  };

  const onReset = () => {
    setForm({
      first_name: "",
      last_name: "",
      dob: "",
      gender: "",
      phone: "",
      username: "",
      password: "",
      address: "",
      blood_group: "",
      emergency_contact_name: "",
      emergency_contact_phone: "",
      profile_image: null,
    });
    setImagePreview("");
    setErr("");
  };

  return (
    <div className="min-h-screen text-slate-900">
      <main className="bg-gradient-to-b px-4 py-8 md:py-12">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-[#008080]/5 bg-white p-6 shadow-xl md:p-10">
            <div className="mb-6">
              <button
                type="button"
                onClick={() => navigate("/reception/records")}
                className="group flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-[#008080]"
              >
                <ArrowLeft
                  size={18}
                  className="transition-transform group-hover:-translate-x-1"
                />
                Back to Records
              </button>
            </div>

            {err && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {err}
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-8">
              <SectionTitle
                icon={<User size={18} />}
                title="Personal Information"
              />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Field
                  label="First Name"
                  value={form.first_name}
                  onChange={onChange("first_name")}
                  placeholder="John"
                  icon={<User size={18} />}
                  required
                />
                <Field
                  label="Last Name"
                  value={form.last_name}
                  onChange={onChange("last_name")}
                  placeholder="Doe"
                  icon={<User size={18} />}
                  required
                />
                <SelectField
                  label="Gender"
                  value={form.gender}
                  onChange={onChange("gender")}
                  icon={<Users size={18} />}
                  options={["Male", "Female", "Other", "Prefer not to say"]}
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
                  label="Blood Group"
                  value={form.blood_group}
                  onChange={onChange("blood_group")}
                  placeholder="A+"
                  icon={<Shield size={18} />}
                />
                <Field
                  label="Password"
                  type="password"
                  value={form.password}
                  onChange={onChange("password")}
                  placeholder="Enter password"
                  icon={<Lock size={18} />}
                  required
                />
              </div>

              {/* Profile Image Section */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700">
                  Profile Image
                </label>
                <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center">
                    <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-xl bg-white ring-1 ring-slate-200">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <ImageIcon size={28} className="text-slate-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <label className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-[#008080] px-4 py-2 text-sm font-semibold text-white hover:bg-[#007070]">
                        Choose Image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={onImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <SectionTitle
                icon={<Phone size={18} />}
                title="Contact Information"
              />
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Field
                  label="Phone Number"
                  type="tel"
                  value={form.phone}
                  onChange={onChange("phone")}
                  placeholder="98XXXXXXXX"
                  icon={<Phone size={18} />}
                  required
                  maxLength={10}
                />
                <Field
                  label="Email Address"
                  type="email"
                  value={form.username}
                  onChange={onChange("username")}
                  placeholder="john.doe@example.com"
                  icon={<Mail size={18} />}
                  required
                />
                <div className="md:col-span-2">
                  <Field
                    label="Residential Address"
                    value={form.address}
                    onChange={onChange("address")}
                    placeholder="123 Wellness Ave"
                    icon={<MapPin size={18} />}
                  />
                </div>
              </div>

              <SectionTitle
                icon={<Shield size={18} />}
                title="Emergency Contact"
              />
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Field
                  label="Emergency Contact Name"
                  value={form.emergency_contact_name}
                  onChange={onChange("emergency_contact_name")}
                  placeholder="Jane Doe"
                  icon={<User size={18} />}
                />
                <Field
                  label="Emergency Contact Phone"
                  type="tel"
                  value={form.emergency_contact_phone}
                  onChange={onChange("emergency_contact_phone")}
                  placeholder="98XXXXXXXX"
                  icon={<Phone size={18} />}
                  maxLength={10}
                />
              </div>

              <div className="flex flex-col items-center justify-end gap-4 border-t border-slate-200 pt-6 md:flex-row">
                <button
                  type="button"
                  onClick={onReset}
                  className="w-full rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 md:w-auto"
                >
                  Clear Form
                </button>
                <button
                  type="submit"
                  disabled={!canSubmit || loading}
                  className={[
                    "flex w-full items-center justify-center gap-2 rounded-xl px-8 py-3 text-sm font-bold text-white transition-all md:w-auto",
                    canSubmit && !loading
                      ? "bg-[#008080] hover:bg-[#007070]"
                      : "cursor-not-allowed bg-slate-300",
                  ].join(" ")}
                >
                  <Save size={16} />
                  {loading ? "Saving..." : "Save Patient"}
                </button>
              </div>
            </form>
          </div>
        </div>
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

function Field({ label, icon, type = "text", required = false, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-slate-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </span>
        <input
          type={type}
          required={required}
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
