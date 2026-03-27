import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { privateAPI } from "../../../../auth/config/api.js";
import PageLoader from "../../../../component/PageLoader.jsx";
import ErrorState from "../../../../component/ErrorState.jsx";
import { toast } from "react-toastify";
import {
  User,
  Users,
  Calendar,
  Phone,
  Mail,
  MapPin,
  BriefcaseMedical,
  GraduationCap,
  Building2,
  Image as ImageIcon,
  KeyRound,
  Info,
  Save,
  X,
  Shield,
  Clock3,
} from "lucide-react";

const genderOptions = ["Female", "Male", "Other"];
const specialtyOptions = [
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
];
const statusOptions = ["ACTIVE", "ON_LEAVE", "SUSPENDED"];

const emptyEditForm = {
  id: null,
  fullName: "",
  gender: "",
  dob: "",
  phone: "",
  email: "",
  address: "",
  profileImage: null,
  profileImageUrl: "",
  specialty: "",
  experienceYears: "",
  qualification: "",
  username: "",
  password: "",
  confirmPassword: "",
  status: "",
};

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
            "w-full rounded-xl border bg-slate-50 py-3 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:ring-2 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500",
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
            const optionValue =
              typeof option === "string" ? option : option.value;
            const optionLabel =
              typeof option === "string" ? option : option.label;

            return (
              <option key={optionValue} value={optionValue}>
                {optionLabel}
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

function formatStatus(status) {
  switch (status) {
    case "ACTIVE":
      return "Active";
    case "ON_LEAVE":
      return "On Leave";
    case "SUSPENDED":
      return "Suspended";
    default:
      return status || "Unknown";
  }
}

export default function UpdateDoctor() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [editForm, setEditForm] = useState(emptyEditForm);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [updateError, setUpdateError] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);

  const fetchDoctor = async () => {
    try {
      setLoading(true);
      setPageError("");

      const res = await privateAPI.get("/admin/doctors/");
      const doctorList = Array.isArray(res.data) ? res.data : [];
      const doctor = doctorList.find((item) => String(item.id) === String(id));

      if (!doctor) {
        setPageError("Doctor not found.");
        return;
      }

      setImagePreview(doctor?.profile_image || "");

      setEditForm({
        id: doctor?.id ?? null,
        fullName: doctor?.name || "",
        gender: doctor?.gender || "",
        dob: doctor?.dob || "",
        phone: doctor?.phone || "",
        email: doctor?.email || "",
        address: doctor?.address || "",
        profileImage: null,
        profileImageUrl: doctor?.profile_image || "",
        specialty: doctor?.specialty || "",
        experienceYears: doctor?.experience_years ?? "",
        qualification: doctor?.qualification || "",
        username: doctor?.username || "",
        password: "",
        confirmPassword: "",
        status: doctor?.status || "",
      });
    } catch (err) {
      console.error("Failed to fetch doctor:", err);
      setPageError("Failed to load doctor details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctor();
  }, [id]);

  const handleEditChange = (key) => (e) => {
    const value = e.target.value;
    setEditForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files?.[0] || null;
    setEditForm((prev) => ({ ...prev, profileImage: file }));

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(editForm.profileImageUrl || "");
    }
  };

  const passwordMismatch =
    editForm.password &&
    editForm.confirmPassword &&
    editForm.password !== editForm.confirmPassword;

  const isEmailValid = /\S+@\S+\.\S+/.test(editForm.email);
  const isPhoneValid = editForm.phone.length >= 7;

  const canUpdate = useMemo(() => {
    return (
      editForm.fullName.trim() &&
      editForm.gender.trim() &&
      isEmailValid &&
      isPhoneValid &&
      editForm.specialty.trim() &&
      !passwordMismatch
    );
  }, [editForm, passwordMismatch]);

  const handleUpdateDoctor = async () => {
    if (!editForm?.id) {
      setUpdateError("Doctor id is missing.");
      return;
    }

    if (!canUpdate) {
      setUpdateError("Please complete all required fields correctly.");
      return;
    }

    setUpdateLoading(true);
    setUpdateError("");

    try {
      const formData = new FormData();
      formData.append("name", editForm.fullName);
      formData.append("gender", editForm.gender);
      formData.append("dob", editForm.dob || "");
      formData.append("phone", editForm.phone);
      formData.append("email", editForm.email);
      formData.append("address", editForm.address || "");
      formData.append("specialty", editForm.specialty);
      formData.append("experience_years", editForm.experienceYears || "");
      formData.append("qualifications", editForm.qualification || "");
      formData.append("username", editForm.username || "");

      if (editForm.password) {
        formData.append("password", editForm.password);
      }

      if (editForm.profileImage) {
        formData.append("profile_image", editForm.profileImage);
      }

      await privateAPI.patch(`/admin/update-doctor/${editForm.id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Profile updated successfully");

      navigate("/admin/doctor-management");
    } catch (err) {
      console.error("Failed to update doctor:", err);

      const data = err?.response?.data;
      if (typeof data === "string") {
        setUpdateError(data);
      } else if (data?.message) {
        setUpdateError(data.message);
      } else if (data?.detail) {
        setUpdateError(data.detail);
      } else if (data && typeof data === "object") {
        const firstError = Object.values(data)?.[0];
        setUpdateError(
          Array.isArray(firstError) && firstError.length > 0
            ? firstError[0]
            : "Failed to update doctor.",
        );
      } else {
        setUpdateError("Failed to update doctor.");
      }
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading) {
    return <PageLoader caption="Loading doctor details..." />;
  }

  if (pageError) {
    return (
      <ErrorState
        title="Failed to load doctor"
        message={pageError}
        onRetry={fetchDoctor}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
      <div className="h-[95vh] w-full max-w-5xl flex flex-col rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Update Doctor</h2>
            <p className="text-sm text-slate-500">
              Edit doctor information and save changes.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/admin/doctor-management")}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {updateError && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {updateError}
            </div>
          )}

          <div className="space-y-8">
            <section className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm">
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
                      JPG, PNG up to 5MB.
                    </p>
                    <label className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#008080] px-4 py-2 text-sm font-semibold text-white hover:bg-[#007070]">
                      <ImageIcon size={16} />
                      Upload Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleEditImageChange}
                        className="hidden"
                      />
                    </label>
                    {editForm.profileImage && (
                      <p className="mt-2 text-xs font-medium text-slate-700">
                        {editForm.profileImage.name}
                      </p>
                    )}
                  </div>
                </div>

                <Field
                  label="Full Name"
                  value={editForm.fullName}
                  onChange={handleEditChange("fullName")}
                  placeholder="e.g. Dr. Sarah Jenkins"
                  icon={<User size={18} />}
                  required
                />

                <SelectField
                  label="Gender"
                  value={editForm.gender}
                  onChange={handleEditChange("gender")}
                  icon={<Users size={18} />}
                  options={genderOptions}
                  required
                />

                <Field
                  label="Date of Birth"
                  type="date"
                  value={editForm.dob}
                  onChange={handleEditChange("dob")}
                  icon={<Calendar size={18} />}
                />

                <Field
                  label="Phone Number"
                  type="tel"
                  value={editForm.phone}
                  onChange={handleEditChange("phone")}
                  placeholder="+1 (555) 000-0000"
                  icon={<Phone size={18} />}
                  required
                />

                <div className="md:col-span-2">
                  <Field
                    label="Email Address"
                    type="email"
                    value={editForm.email}
                    onChange={handleEditChange("email")}
                    placeholder="doctor@clinic.com"
                    icon={<Mail size={18} />}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <TextareaField
                    label="Residential Address"
                    value={editForm.address}
                    onChange={handleEditChange("address")}
                    placeholder="Enter complete home address..."
                    icon={<MapPin size={18} />}
                  />
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm">
              <SectionTitle
                icon={<BriefcaseMedical size={18} />}
                title="Professional Details"
              />

              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <SelectField
                  label="Specialty"
                  value={editForm.specialty}
                  onChange={handleEditChange("specialty")}
                  icon={<BriefcaseMedical size={18} />}
                  options={specialtyOptions}
                  required
                />

                <Field
                  label="Experience"
                  type="number"
                  min="0"
                  value={editForm.experienceYears}
                  onChange={handleEditChange("experienceYears")}
                  placeholder="e.g. 5"
                  icon={<Clock3 size={18} />}
                  suffix="Years"
                />

                <Field
                  label="Qualification"
                  value={editForm.qualification}
                  onChange={handleEditChange("qualification")}
                  placeholder="e.g. MBBS, MD"
                  icon={<GraduationCap size={18} />}
                />

                <SelectField
                  label="Status"
                  value={editForm.status}
                  onChange={handleEditChange("status")}
                  icon={<Info size={18} />}
                  options={statusOptions}
                  disabled
                />
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm">
              <SectionTitle
                icon={<KeyRound size={18} />}
                title="Account Access"
              />

              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="md:col-span-2">
                  <Field
                    label="Username"
                    type="text"
                    value={editForm.username}
                    onChange={handleEditChange("username")}
                    placeholder="doctor.username"
                    icon={<Mail size={18} />}
                  />
                </div>

                <Field
                  label="New Password"
                  type="password"
                  value={editForm.password}
                  onChange={handleEditChange("password")}
                  icon={<KeyRound size={18} />}
                />

                <Field
                  label="Confirm New Password"
                  type="password"
                  value={editForm.confirmPassword}
                  onChange={handleEditChange("confirmPassword")}
                  icon={<KeyRound size={18} />}
                  error={passwordMismatch ? "Passwords do not match." : ""}
                />
              </div>
            </section>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 bg-white px-6 py-4 sm:flex-row">
          <div className="flex items-center gap-2 text-slate-500">
            <Info size={16} />
            <span className="text-xs font-medium">
              Review doctor details before saving changes.
            </span>
          </div>

          <div className="flex w-full items-center gap-4 sm:w-auto">
            <button
              type="button"
              onClick={() => navigate("/admin/doctor-management")}
              className="flex-1 rounded-xl px-6 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 sm:flex-none"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleUpdateDoctor}
              disabled={!canUpdate || updateLoading}
              className={[
                "flex flex-1 items-center justify-center gap-2 rounded-xl px-8 py-2.5 text-sm font-bold text-white transition-all sm:flex-none",
                canUpdate && !updateLoading
                  ? "bg-[#008080] hover:bg-[#007070]"
                  : "cursor-not-allowed bg-slate-300",
              ].join(" ")}
            >
              <Save size={16} />
              {updateLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
