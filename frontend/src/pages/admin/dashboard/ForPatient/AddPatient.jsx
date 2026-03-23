import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { privateAPI } from "../../../../auth/config/api";
import { toast } from "react-toastify";
import {
  ArrowLeft,
  Calendar,
  Image as ImageIcon,
  Mail,
  MapPin,
  Phone,
  Save,
  Shield,
  User,
  Users,
  Droplets,
  Lock,
  CheckCircle2,
  Camera,
} from "lucide-react";

const genderOptions = ["Male", "Female", "Other", "Prefer not to say"];
const bloodGroupOptions = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const initialForm = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  dob: "",
  gender: "",
  bloodGroup: "",
  address: "",
  emergencyContactName: "",
  emergencyContactPhone: "",
  password: "",
  confirmPassword: "",
  profileImage: null,
  agree: false,
};

export default function AddPatient() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
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
      form.first_name.trim() &&
      form.last_name.trim() &&
      form.email.trim() &&
      form.phone.trim() &&
      form.dob.trim() &&
      form.gender.trim() &&
      form.bloodGroup.trim() &&
      form.address.trim() &&
      form.emergencyContactName.trim() &&
      form.emergencyContactPhone.trim() &&
      form.password.trim() &&
      form.confirmPassword.trim() &&
      !pwMismatch &&
      form.agree
    );
  }, [form, pwMismatch]);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const onChange = (key) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onImageChange = (e) => {
    const file = e.target.files?.[0] || null;

    setForm((prev) => ({
      ...prev,
      profileImage: file,
    }));

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setImagePreview(file ? URL.createObjectURL(file) : "");
  };

  const onReset = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setForm(initialForm);
    setImagePreview("");
  };

  const validateForm = () => {
    if (
      !form.first_name.trim() ||
      !form.last_name.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.dob.trim() ||
      !form.gender.trim() ||
      !form.bloodGroup.trim() ||
      !form.address.trim() ||
      !form.emergencyContactName.trim() ||
      !form.emergencyContactPhone.trim() ||
      !form.password.trim() ||
      !form.confirmPassword.trim()
    ) {
      return "Please fill all required fields.";
    }

    if (pwMismatch) {
      return "Passwords do not match.";
    }

    if (!form.agree) {
      return "Please confirm the patient information to continue.";
    }

    return "";
  };

  const buildFormData = () => {
    const formData = new FormData();

    formData.append("first_name", form.first_name);
    formData.append("last_name", form.last_name);
    formData.append("username", form.email);
    formData.append("password", form.password);
    formData.append("phone", form.phone);
    formData.append("dob", form.dob);
    formData.append("gender", form.gender);
    formData.append("blood_group", form.bloodGroup);
    formData.append("address", form.address);
    formData.append("emergency_contact_name", form.emergencyContactName);
    formData.append("emergency_contact_phone", form.emergencyContactPhone);

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

      const response = await privateAPI.post(
        "/admin/create-patient/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 10000,
        },
      );

      console.log("Patient created successfully:", response.data);
      toast.success("Patient added successfully!");

      setTimeout(() => {
        navigate("/admin/patient-management");
      }, 1000);
    } catch (error) {
      console.error("Create patient error:", error);

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
          const firstErrorEntry = Object.values(serverData)?.[0];

          if (Array.isArray(firstErrorEntry) && firstErrorEntry.length > 0) {
            toast.error(firstErrorEntry[0]);
          } else if (typeof firstErrorEntry === "string") {
            toast.error(firstErrorEntry);
          } else {
            toast.error("Failed to add patient.");
          }
        } else {
          toast.error("Failed to add patient.");
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
                onClick={() => navigate("/admin/patient-management")}
                className="group mb-4 flex items-center gap-2 text-sm font-medium text-teal-700"
              >
                <ArrowLeft
                  size={16}
                  className="transition-transform group-hover:-translate-x-1"
                />
                Back to Patients List
              </button>

              <h2 className="mb-1 text-3xl font-extrabold tracking-tight text-slate-900">
                Add Patient
              </h2>
              <p className="text-slate-500">
                Register a new patient profile in the hospital system.
              </p>
            </div>

            <div>
              <span className="rounded-full bg-[#a0f2e3] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#137165]">
                Role: Patient
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
                          alt="Patient preview"
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

                  <Field
                    label="Email Address"
                    type="email"
                    value={form.email}
                    onChange={onChange("email")}
                    placeholder="john@example.com"
                    icon={<Mail size={18} />}
                    required
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

                  <Field
                    label="Date of Birth"
                    type="date"
                    value={form.dob}
                    onChange={onChange("dob")}
                    icon={<Calendar size={18} />}
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

                  <SelectField
                    label="Blood Group"
                    value={form.bloodGroup}
                    onChange={onChange("bloodGroup")}
                    icon={<Droplets size={18} />}
                    options={bloodGroupOptions}
                    required
                  />

                  <div className="md:col-span-2">
                    <TextareaField
                      label="Residential Address"
                      value={form.address}
                      onChange={onChange("address")}
                      placeholder="123 Medical Way, Health City"
                      icon={<MapPin size={18} />}
                      required
                    />
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm md:p-8">
                <SectionTitle
                  icon={<Shield size={18} />}
                  title="Emergency Contact Details"
                />

                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Field
                    label="Emergency Contact Name"
                    value={form.emergencyContactName}
                    onChange={onChange("emergencyContactName")}
                    placeholder="Jane Doe"
                    icon={<User size={18} />}
                    required
                  />

                  <Field
                    label="Emergency Contact Phone"
                    type="tel"
                    value={form.emergencyContactPhone}
                    onChange={onChange("emergencyContactPhone")}
                    placeholder="+1 (555) 111-2222"
                    icon={<Phone size={18} />}
                    required
                  />
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm md:p-8">
                <SectionTitle
                  icon={<Lock size={18} />}
                  title="Account Access"
                />

                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Field
                    label="Temporary Password"
                    type="password"
                    value={form.password}
                    onChange={onChange("password")}
                    placeholder="Enter password"
                    icon={<Lock size={18} />}
                    required
                  />

                  <Field
                    label="Confirm Password"
                    type="password"
                    value={form.confirmPassword}
                    onChange={onChange("confirmPassword")}
                    placeholder="Re-enter password"
                    icon={<Lock size={18} />}
                    required
                    error={pwMismatch ? "Passwords do not match." : ""}
                  />

                  <div className="md:col-span-2">
                    <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <input
                        type="checkbox"
                        checked={form.agree}
                        onChange={onChange("agree")}
                        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#008080] focus:ring-[#008080]"
                      />
                      <span className="text-sm leading-relaxed text-slate-600">
                        I confirm that the patient information entered above is
                        accurate and ready to be saved in the hospital system.
                      </span>
                    </label>
                  </div>
                </div>
              </section>
            </div>
          </form>
        </div>

        <footer className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/90 backdrop-blur-md md:left-0">
          <div className="flex justify-center">
            <div className="w-full max-w-none px-4 py-4 md:px-8">
              <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                <div className="flex items-center gap-2 text-slate-500">
                  <CheckCircle2 size={16} />
                  <span className="text-xs font-medium">
                    Fill in the patient details and save to continue.
                  </span>
                </div>

                <div className="flex w-full items-center gap-4 sm:w-auto">
                  <button
                    type="button"
                    onClick={() => navigate("/admin/patients")}
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
                    {loading ? "Adding..." : "Add Patient"}
                  </button>
                </div>
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
  error = "",
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
            "w-full rounded-xl border bg-slate-50 py-3 pr-4 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:ring-2",
            icon ? "pl-10" : "px-4",
            error
              ? "border-red-300 focus:border-red-400 focus:ring-red-200"
              : "border-slate-200 focus:border-[#008080] focus:ring-[#008080]/20",
          ].join(" ")}
          {...props}
        />
      </div>

      {error ? (
        <p className="text-xs font-medium text-red-600">{error}</p>
      ) : null}
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
        {icon && (
          <span className="absolute left-3 top-3 text-slate-400">{icon}</span>
        )}
        <textarea
          rows={3}
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
        {icon && (
          <span className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-slate-400">
            {icon}
          </span>
        )}

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
