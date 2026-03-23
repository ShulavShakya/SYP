import React, { useEffect, useState } from "react";
import {
  Camera,
  Mail,
  Phone,
  Save,
  RefreshCcw,
  Eye,
  EyeOff,
} from "lucide-react";
import { privateAPI } from "../../../auth/config/api";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

function InputField({
  label,
  value = "",
  type = "text",
  placeholder = "",
  showToggle = false,
  disabled = false,
  onChange,
}) {
  const [visible, setVisible] = useState(false);
  const renderedType = showToggle ? (visible ? "text" : type) : type;

  return (
    <div>
      <label className="mb-3 block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <div className="relative">
        <input
          type={renderedType}
          value={value || ""}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          className={`h-12 w-full rounded-xl border px-4 text-base outline-none transition ${
            disabled
              ? "cursor-not-allowed bg-gray-100 text-gray-400"
              : "border-slate-200 bg-white text-slate-800 focus:border-primary focus:ring-2 focus:ring-primary/15"
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
}

export default function PatientProfile() {
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    username: "",
    phone: "",
    profile_image: "",
    full_name: "",
    email: "",
  });

  const [passwords, setPasswords] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await privateAPI.get("/patient/patient/profile-card/");
        const data = response.data;

        const fullName = data.full_name || "";
        const parts = fullName.trim().split(/\s+/).filter(Boolean);
        const first_name = parts[0] || "";
        const last_name = parts.slice(1).join(" ") || "";

        setProfile({
          first_name,
          last_name,
          username: data.username || "",
          email: data.email || "",
          phone: data.phone || "",
          profile_image: data.profile_image || "",
          full_name: fullName,
        });
      } catch (err) {
        setError(
          err?.response?.data?.error ||
            err?.response?.data?.detail ||
            err.message ||
            "Something went wrong",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (field) => (e) => {
    const value = e.target.value;

    setProfile((prev) => {
      const updated = {
        ...prev,
        [field]: value,
      };

      updated.full_name = `${updated.first_name} ${updated.last_name}`.trim();

      return updated;
    });
  };

  const handlePasswordChange = (field) => (e) => {
    setPasswords((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleUpdateProfile = async () => {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        first_name: profile.first_name,
        last_name: profile.last_name,
        phone: profile.phone,
      };

      const response = await privateAPI.patch(
        "/patient/patient/update/",
        payload,
      );

      const updatedData = response.data?.data || {};

      setProfile((prev) => ({
        ...prev,
        first_name: updatedData.first_name ?? prev.first_name,
        last_name: updatedData.last_name ?? prev.last_name,
        phone: updatedData.phone ?? prev.phone,
        full_name: `${updatedData.first_name ?? prev.first_name} ${
          updatedData.last_name ?? prev.last_name
        }`.trim(),
      }));

      setSuccess(response.data?.message || "Profile updated successfully");
    } catch (err) {
      const data = err?.response?.data;

      if (data?.first_name?.[0]) {
        setError(data.first_name[0]);
      } else if (data?.last_name?.[0]) {
        setError(data.last_name[0]);
      } else if (data?.phone?.[0]) {
        setError(data.phone[0]);
      } else {
        setError(
          data?.error ||
            data?.detail ||
            err.message ||
            "Failed to update profile",
        );
      }
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    setChangingPassword(true);
    setPasswordError("");
    setPasswordSuccess("");

    if (
      !passwords.old_password ||
      !passwords.new_password ||
      !passwords.confirm_password
    ) {
      setPasswordError("All password fields are required");
      setChangingPassword(false);
      return;
    }

    if (passwords.new_password !== passwords.confirm_password) {
      setPasswordError("New password and confirm password do not match");
      setChangingPassword(false);
      return;
    }

    try {
      const payload = {
        old_password: passwords.old_password,
        new_password: passwords.new_password,
      };

      const response = await privateAPI.put(
        "/patient/patient/change-password/",
        payload,
      );

      setPasswordSuccess(
        response.data?.message || "Password updated successfully",
      );

      setPasswords({
        old_password: "",
        new_password: "",
        confirm_password: "",
      });
    } catch (err) {
      const data = err?.response?.data;

      if (data?.old_password?.[0]) {
        setPasswordError(data.old_password[0]);
      } else if (data?.new_password?.[0]) {
        setPasswordError(data.new_password[0]);
      } else if (data?.error) {
        setPasswordError(data.error);
      } else if (typeof data === "object") {
        const firstError = Object.values(data)[0];
        setPasswordError(
          Array.isArray(firstError)
            ? firstError[0]
            : "Failed to change password",
        );
      } else {
        setPasswordError(err.message || "Failed to change password");
      }
    } finally {
      setChangingPassword(false);
    }
  };

  const profileImageUrl = profile.profile_image
    ? profile.profile_image.startsWith("http")
      ? profile.profile_image
      : `${BASE_URL}${profile.profile_image}`
    : "/default-avatar.png";

  if (loading) {
    return <div className="p-10 text-center">Loading profile...</div>;
  }

  if (error && !profile.username && !profile.first_name && !profile.last_name) {
    return <div className="p-10 text-center text-red-500">{error}</div>;
  }

  return (
    <main className="min-h-screen px-6 py-10 text-textMain md:px-10">
      <div className="mx-auto max-w-4xl">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="relative">
                <div className="rounded-full bg-slate-50 p-1 ring-1 ring-slate-200">
                  <img
                    src={profileImageUrl}
                    alt="Profile"
                    className="h-24 w-24 rounded-full object-cover object-left-top"
                  />
                </div>

                <button
                  type="button"
                  className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-primary text-white shadow-sm transition hover:bg-primary/90"
                >
                  <Camera size={15} />
                </button>
              </div>

              <div className="min-w-0">
                <h1 className="truncate text-2xl font-bold tracking-tight text-slate-900">
                  {profile.full_name || "No name"}
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Patient Account Information
                </p>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Mail size={16} className="text-slate-400" />
                    <span className="truncate">
                      {profile.email || profile.username || "No email"}
                    </span>
                  </div>

                  <div className="hidden text-slate-300 sm:block">•</div>

                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Phone size={16} className="text-slate-400" />
                    <span>{profile.phone || "No phone"}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:w-auto">
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                <p className="text-xs font-medium text-slate-500">First Name</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {profile.first_name || "N/A"}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                <p className="text-xs font-medium text-slate-500">Last Name</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {profile.last_name || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 overflow-hidden rounded-3xl border border-gray-200 bg-slate-50 shadow-sm">
          <div className="border-b border-gray-200 px-6 py-5">
            <h2 className="text-xl font-bold text-textMain">
              Account Information
            </h2>
          </div>

          <div className="bg-white p-6">
            {error && (
              <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-600">
                {success}
              </div>
            )}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <InputField
                label="First Name"
                value={profile.first_name}
                onChange={handleChange("first_name")}
              />
              <InputField
                label="Last Name"
                value={profile.last_name}
                onChange={handleChange("last_name")}
              />
              <InputField
                label="Phone Number"
                value={profile.phone}
                onChange={handleChange("phone")}
              />
              <InputField label="Email" value={profile.username} disabled />
            </div>

            <div className="mt-10 flex justify-end">
              <button
                type="button"
                onClick={handleUpdateProfile}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Save size={18} />
                {saving ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </div>
        </section>

        <section className="mt-8 overflow-hidden rounded-3xl border border-gray-200 bg-slate-50 shadow-sm">
          <div className="border-b border-gray-200 px-6 py-5">
            <h2 className="text-xl font-bold text-textMain">Password Change</h2>
          </div>

          <div className="bg-white p-6">
            {passwordError && (
              <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {passwordError}
              </div>
            )}

            {passwordSuccess && (
              <div className="mb-4 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-600">
                {passwordSuccess}
              </div>
            )}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="md:col-span-1">
                <InputField
                  label="Current Password"
                  type="password"
                  placeholder="Enter current password"
                  value={passwords.old_password}
                  onChange={handlePasswordChange("old_password")}
                  showToggle
                />
              </div>

              <div className="hidden md:block" />

              <InputField
                label="New Password"
                type="password"
                placeholder="Enter new password"
                value={passwords.new_password}
                onChange={handlePasswordChange("new_password")}
                showToggle
              />
              <InputField
                label="Confirm New Password"
                type="password"
                placeholder="Confirm new password"
                value={passwords.confirm_password}
                onChange={handlePasswordChange("confirm_password")}
                showToggle
              />
            </div>

            <div className="mt-10 flex justify-end">
              <button
                type="button"
                onClick={handleChangePassword}
                disabled={changingPassword}
                className="inline-flex items-center gap-2 rounded-xl bg-mint px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-mint/90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <RefreshCcw size={18} />
                {changingPassword ? "Changing..." : "Change Password"}
              </button>
            </div>
          </div>
        </section>

        <p className="mt-14 text-center text-sm text-slate-400">
          © 2024 MedFlow Health Systems. All rights reserved. Professional Use
          Only.
        </p>
      </div>
    </main>
  );
}