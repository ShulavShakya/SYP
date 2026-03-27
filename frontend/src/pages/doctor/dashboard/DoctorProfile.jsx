import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { privateAPI } from "../../../auth/config/api";
import { toast } from "react-toastify";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  Camera,
  Image as ImageIcon,
  KeyRound,
  Mail,
  MapPin,
  Phone,
  Save,
  Stethoscope,
  User,
  Users,
  Eye,
  EyeOff,
  RefreshCcw,
  Loader2,
} from "lucide-react";

const InputField = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  showToggle = false,
  required = false,
  icon: Icon,
  disabled = false,
}) => {
  const [visible, setVisible] = useState(false);
  const renderedType = showToggle ? (visible ? "text" : type) : type;

  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <Icon size={18} />
          </div>
        )}
        <input
          type={renderedType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base text-slate-800 outline-none transition focus:border-[#008080] focus:ring-2 focus:ring-[#008080]/15 disabled:bg-slate-50 disabled:text-slate-500 ${
            Icon ? "pl-11" : ""
          }`}
        />
        {showToggle && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
          >
            {visible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

const SectionWrapper = ({ title, children }) => (
  <section className="mt-8 overflow-hidden rounded-3xl border border-gray-200 bg-slate-50 shadow-sm">
    <div className="border-b border-gray-200 px-6 py-4">
      <h2 className="text-lg font-bold text-slate-800">{title}</h2>
    </div>
    <div className="bg-white p-6">{children}</div>
  </section>
);

const departmentOptions = [
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "General Surgery",
  "Dermatology",
  "Orthopedics",
];
const genderOptions = ["Male", "Female", "Other"];
const availableDayOptions = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export default function EditDoctor() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    gender: "",
    dob: "",
    phone: "",
    email: "",
    address: "",
    department: "",
    experience: "",
    qualifications: "",
    availabilityDays: [],
    username: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await privateAPI.get("/doctor/info/");
        const d = response.data;

        setForm({
          fullName: d.name || "",
          gender: d.gender || "",
          dob: d.dob || "",
          phone: d.phone || "",
          email: d.email || "",
          address: d.address || "",
          department: d.department || "",
          experience: d.experience_years || "",
          qualifications: d.qualifications || "",
          availabilityDays: Array.isArray(d.availability_days)
            ? d.availability_days
            : d.availability_days
              ? d.availability_days.split(",")
              : [],
          username: d.username || "",
          password: "",
          confirmPassword: "",
          profileImage: null,
        });
        if (d.profile_image) setImagePreview(d.profile_image);
      } catch (error) {
        toast.error("Failed to load your profile.");
      } finally {
        setInitialLoading(false);
      }
    };
    fetchDoctorData();
  }, []);

  const pwMismatch = useMemo(() => {
    return form.password !== form.confirmPassword;
  }, [form.password, form.confirmPassword]);

  const canSubmit = useMemo(() => {
    const basicFields =
      form.fullName.trim() && form.gender.trim() && form.email.trim();
    if (form.password && pwMismatch) return false;
    return basicFields && !loading;
  }, [form, pwMismatch, loading]);

  const onChange = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const onImageChange = (e) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setForm((prev) => ({ ...prev, profileImage: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const toggleAvailableDay = (day) => {
    setForm((prev) => {
      const currentDays = [...prev.availabilityDays];
      const index = currentDays.indexOf(day);

      if (index > -1) {
        currentDays.splice(index, 1);
      } else {
        currentDays.push(day);
      }

      return { ...prev, availabilityDays: currentDays };
    });
  };

  const onSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("gender", form.gender);
      formData.append("dob", form.dob || "");
      formData.append("phone", form.phone);
      formData.append("email", form.email);
      formData.append("address", form.address || "");
      formData.append("department", form.department);
      formData.append("experience_years", form.experience || "0");
      formData.append("qualifications", form.qualifications);

      form.availabilityDays.forEach((day) =>
        formData.append("availability_days", day),
      );

      if (form.profileImage)
        formData.append("profile_image", form.profileImage);
      if (form.password.trim()) formData.append("password", form.password);
      formData.append("name", form.fullName);

      await privateAPI.patch("/doctor/profile-update/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Profile updated successfully.");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f7fafa]">
        <Loader2 className="animate-spin text-[#008080]" size={40} />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7fafa] px-6 py-10 md:px-10">
      <div className="mx-auto max-w-5xl pb-10">
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="group mb-2 flex items-center gap-2 text-sm font-medium text-[#008080]"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />
            Go Back
          </button>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Edit My Profile
          </h1>
        </div>

        {/* Profile Card */}
        <section className="rounded-3xl border border-gray-200 bg-[#f8fafb] p-7 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="relative">
              <div className="h-28 w-28 overflow-hidden rounded-full bg-white ring-4 ring-white shadow-sm flex items-center justify-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <ImageIcon size={32} className="text-slate-300" />
                )}
              </div>
              <label className="absolute bottom-1 right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#008080] text-white shadow-md transition hover:scale-105">
                <Camera size={16} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={onImageChange}
                  className="hidden"
                />
              </label>
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Full Name"
                value={form.fullName}
                onChange={onChange("fullName")}
                required
                icon={User}
              />
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-semibold text-slate-700">
                  Gender *
                </label>
                <select
                  value={form.gender}
                  onChange={onChange("gender")}
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-slate-800 outline-none focus:border-[#008080] focus:ring-2 focus:ring-[#008080]/15"
                >
                  {genderOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        <SectionWrapper title="Professional Information">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-semibold text-slate-700">
                Medical department *
              </label>
              <select
                value={form.department}
                onChange={onChange("department")}
                className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-slate-800 outline-none focus:border-[#008080] focus:ring-2 focus:ring-[#008080]/15"
              >
                {departmentOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <InputField
              label="Years of Experience"
              type="number"
              value={form.experience}
              onChange={onChange("experience")}
              icon={Briefcase}
            />
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Qualifications *
              </label>
              <textarea
                value={form.qualifications}
                onChange={onChange("qualifications")}
                rows={3}
                className="w-full rounded-xl border border-slate-200 bg-white p-4 text-slate-800 outline-none transition focus:border-[#008080] focus:ring-2 focus:ring-[#008080]/15"
              />
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper title="Contact & Address">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <InputField
              label="Email Address"
              type="email"
              value={form.email}
              onChange={onChange("email")}
              required
              icon={Mail}
            />
            <InputField
              label="Phone Number"
              type="tel"
              value={form.phone}
              onChange={onChange("phone")}
              required
              icon={Phone}
            />
            <div className="md:col-span-2">
              <InputField
                label="Full Address"
                value={form.address}
                onChange={onChange("address")}
                icon={MapPin}
              />
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper title="Availability Schedule">
          <label className="mb-4 block text-sm font-semibold text-slate-700">
            Working Days *
          </label>
          <div className="flex flex-wrap gap-2">
            {availableDayOptions.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => toggleAvailableDay(day)}
                className={`rounded-xl px-5 py-2.5 text-sm font-bold transition-all ${
                  form.availabilityDays.includes(day)
                    ? "bg-[#008080] text-white shadow-md shadow-[#008080]/20"
                    : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper title="Security Settings">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <InputField
              label="Username"
              value={form.username}
              disabled
              icon={User}
            />
            <div className="hidden md:block" />
            <InputField
              label="New Password"
              type="password"
              value={form.password}
              onChange={onChange("password")}
              showToggle
              icon={KeyRound}
            />
            <InputField
              label="Confirm New Password"
              type="password"
              value={form.confirmPassword}
              onChange={onChange("confirmPassword")}
              showToggle
              icon={KeyRound}
            />
          </div>
        </SectionWrapper>

        <footer className="mt-8 rounded-3xl border border-slate-200 bg-white px-6 py-6 shadow-sm">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm font-medium text-slate-500">
              Update your profile information accurately.
            </p>
            <div className="flex w-full items-center gap-3 md:w-auto">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 rounded-xl px-6 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-100 md:flex-none"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onSubmit}
                disabled={!canSubmit || loading}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-10 py-3 text-sm font-bold text-white shadow-lg transition-all md:flex-none ${
                  canSubmit
                    ? "bg-[#008080] hover:bg-[#006666] hover:scale-[1.02]"
                    : "bg-slate-300 cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <RefreshCcw className="animate-spin" size={18} />
                ) : (
                  <Save size={18} />
                )}
                {loading ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
