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
  Image as ImageIcon,
  Info,
  Save,
  X,
  Shield,
  HeartPulse,
} from "lucide-react";

const genderOptions = ["Male", "Female", "Other"];

const emptyEditForm = {
  id: null,
  name: "",
  gender: "",
  dob: "",
  phone: "",
  email: "",
  address: "",
  emergencyContactName: "",
  emergencyContactPhone: "",
  profileImage: null,
  profileImageUrl: "",
};

// Reusable UI Components from your Reference
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
            error
              ? "border-red-300 focus:border-red-400 focus:ring-red-200"
              : "border-slate-200 focus:border-[#008080] focus:ring-[#008080]/20",
          ].join(" ")}
          {...props}
        />
      </div>
      {error && <p className="text-xs font-medium text-red-600">{error}</p>}
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
            "w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pr-4 text-sm text-slate-700 outline-none transition-all focus:border-[#008080] focus:ring-2 focus:ring-[#008080]/20",
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
        {label} {required && <span className="ml-1 text-red-500">*</span>}
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
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
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

export default function UpdatePatient() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [editForm, setEditForm] = useState(emptyEditForm);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [updateError, setUpdateError] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);

  const fetchPatient = async () => {
    try {
      setLoading(true);
      setPageError("");
      const res = await privateAPI.get("/admin/patients/");
      const patientList = Array.isArray(res.data) ? res.data : [];
      const patient = patientList.find(
        (item) => String(item.id) === String(id),
      );

      if (!patient) {
        setPageError("Patient not found.");
        return;
      }

      setImagePreview(patient.profile_image || "");
      setEditForm({
        id: patient.id,
        name: patient.name || "",
        gender: patient.gender || "",
        dob: patient.dob || "",
        phone: patient.phone || "",
        email: patient.username || "",
        address: patient.address || "",
        emergencyContactName: patient.emergency_contact_name || "",
        emergencyContactPhone: patient.emergency_contact_phone || "",
        profileImage: null,
        profileImageUrl: patient.profile_image || "",
      });
    } catch (err) {
      setPageError("Failed to load patient details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatient();
  }, [id]);

  const handleEditChange = (key) => (e) => {
    setEditForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0] || null;
    setEditForm((prev) => ({ ...prev, profileImage: file }));
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const isFormValid = useMemo(() => {
    return (
      editForm.name.trim() &&
      editForm.gender.trim() &&
      editForm.phone.length >= 7 &&
      /\S+@\S+\.\S+/.test(editForm.email)
    );
  }, [editForm]);

  const handleUpdate = async () => {
    setUpdateLoading(true);
    setUpdateError("");

    try {
      const formData = new FormData();
      formData.append("name", editForm.name);
      formData.append("gender", editForm.gender);
      formData.append("dob", editForm.dob);
      formData.append("phone", editForm.phone);
      formData.append("username", editForm.email);
      formData.append("address", editForm.address);
      formData.append("emergency_contact_name", editForm.emergencyContactName);
      formData.append(
        "emergency_contact_phone",
        editForm.emergencyContactPhone,
      );

      if (editForm.profileImage) {
        formData.append("profile_image", editForm.profileImage);
      }

      await privateAPI.patch(
        `/admin/update-patient/${editForm.id}/`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      toast.success("Patient record updated successfully");
      navigate("/admin/patient-management");
    } catch (err) {
      setUpdateError(err.response?.data?.detail || "Failed to update patient.");
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading) return <PageLoader caption="Fetching record..." />;
  if (pageError)
    return (
      <ErrorState title="Error" message={pageError} onRetry={fetchPatient} />
    );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
      <div className="h-[95vh] w-full max-w-5xl flex flex-col rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Update Patient Record
            </h2>
            <p className="text-sm text-slate-500">
              Modify patient history and personal data.
            </p>
          </div>
          <button
            onClick={() => navigate("/admin/patient-management")}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {updateError && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {updateError}
            </div>
          )}

          <div className="space-y-8">
            {/* Section 1: Personal */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
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
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <ImageIcon size={28} className="text-slate-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Profile Photo
                    </p>
                    <label className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#008080] px-4 py-2 text-sm font-semibold text-white hover:bg-[#007070]">
                      <ImageIcon size={16} /> Update Photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <Field
                  label="Full Name"
                  value={editForm.name}
                  onChange={handleEditChange("name")}
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
                  value={editForm.phone}
                  onChange={handleEditChange("phone")}
                  icon={<Phone size={18} />}
                  required
                />
                <div className="md:col-span-2">
                  <Field
                    label="Email Address"
                    type="email"
                    value={editForm.email}
                    onChange={handleEditChange("email")}
                    icon={<Mail size={18} />}
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <TextareaField
                    label="Residential Address"
                    value={editForm.address}
                    onChange={handleEditChange("address")}
                    icon={<MapPin size={18} />}
                  />
                </div>
              </div>
            </section>

            {/* Section 2: Emergency */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <SectionTitle
                icon={<Shield size={18} />}
                title="Emergency Contact"
              />
              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <Field
                  label="Contact Person"
                  value={editForm.emergencyContactName}
                  onChange={handleEditChange("emergencyContactName")}
                  icon={<User size={18} />}
                />
                <Field
                  label="Emergency Phone"
                  value={editForm.emergencyContactPhone}
                  onChange={handleEditChange("emergencyContactPhone")}
                  icon={<Phone size={18} />}
                />
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 bg-white px-6 py-4 sm:flex-row">
          <div className="flex items-center gap-2 text-slate-500">
            <Info size={16} />
            <span className="text-xs font-medium">
              Verify all information before saving the record.
            </span>
          </div>
          <div className="flex w-full items-center gap-4 sm:w-auto">
            <button
              onClick={() => navigate("/admin/patient-management")}
              className="flex-1 rounded-xl px-6 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 sm:flex-none"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              disabled={!isFormValid || updateLoading}
              className={[
                "flex flex-1 items-center justify-center gap-2 rounded-xl px-8 py-2.5 text-sm font-bold text-white transition-all sm:flex-none",
                isFormValid && !updateLoading
                  ? "bg-[#008080] hover:bg-[#007070]"
                  : "bg-slate-300 cursor-not-allowed",
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
