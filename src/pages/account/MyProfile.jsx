

import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useAuth } from "../../context/useAuth";

export default function MyProfile() {
  const { user, updateProfile } = useAuth();

  const [isEditing, setIsEditing] = useState(false);

 const [form, setForm] = useState({
  fullName: user?.fullName || "",
  dob: user?.dob || "",
  email: user?.email || "",
  address: user?.address || "",
  pinCode: user?.pinCode || "",
  pan: user?.pan || "",
  employmentType: user?.employmentType || "Salaried",
  employerName: user?.employerName || "",
  monthlyIncome: user?.monthlyIncome || "",
});

  const [saved, setSaved] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
    setSaved(false);
  };

  const handleSave = () => {
    updateProfile(form);
    setSaved(true);
    setIsEditing(false);
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Welcome! {form.fullName.toUpperCase()}
        </h2>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            ✏ Edit Profile
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={() => setIsEditing(false)}
              className="px-5 py-2 border rounded-xl hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Personal Details */}

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-xl font-bold text-blue-900 mb-6">
          Personal Details
        </h3>

        <div className="grid md:grid-cols-2 gap-x-10 gap-y-7">

          <EditField
            label="Full Name"
            value={form.fullName}
            placeholder="Enter Full Name"
            disabled={!isEditing}
            onChange={(v) => handleChange("fullName", v)}
          />

         <DateField
            label="Date Of Birth"
            value={form.dob}
            disabled={!isEditing}
            onChange={(v) => handleChange("dob", v)}
          />

          <EditField
            label="Email Address"
            value={form.email}
            placeholder="Enter Email"
            disabled={!isEditing}
            onChange={(v) => handleChange("email", v)}
          />

          <Field
            label="Mobile Number"
            value={`+91 ${user?.mobile}`}
            locked
          />

          <EditField
            label="Address"
            value={form.address}
            placeholder="Enter Address"
            disabled={!isEditing}
            onChange={(v) => handleChange("address", v)}
          />

          <EditField
            label="Pin Code"
            value={form.pinCode}
            placeholder="Enter Pin Code"
            disabled={!isEditing}
            onChange={(v) => handleChange("pinCode", v)}
          />

          <EditField
            label="PAN Card Number"
            value={form.pan}
            placeholder="ABCDE1234F"
            disabled={!isEditing}
            onChange={(v) => handleChange("pan", v.toUpperCase())}
          />
        </div>
      </div>

      {/* Employment */}

      <div className="bg-white rounded-2xl shadow-sm p-6 mt-6">
        <h3 className="text-xl font-bold text-blue-900 mb-6">
          Employment Details
        </h3>

        <div className="grid md:grid-cols-2 gap-x-10 gap-y-7">

          <div>
            <label className="text-sm text-gray-500">
              Employment Type
            </label>

            <select
              disabled={!isEditing}
              value={form.employmentType}
              onChange={(e) =>
                handleChange("employmentType", e.target.value)
              }
              className={`w-full mt-1 border-b py-2 font-medium outline-none ${
                isEditing
                  ? "border-blue-500"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <option>Salaried</option>
              <option>Self Employed</option>
              <option>Business</option>
              <option>Student</option>
            </select>
          </div>

          <EditField
            label="Employer Name"
            value={form.employerName}
            placeholder="Employer Name"
            disabled={!isEditing}
            onChange={(v) => handleChange("employerName", v)}
          />

          <EditField
            label="Monthly Income"
            value={form.monthlyIncome}
            placeholder="Monthly Income"
            disabled={!isEditing}
            onChange={(v) => handleChange("monthlyIncome", v)}
          />
        </div>

        <p className="mt-6 text-sm text-blue-900 font-medium">
          Note: Please enter correct details to get accurate loan and credit
          card offers.
        </p>
      </div>

      {saved && (
        <div className="mt-5">
          <p className="text-green-600 font-semibold">
            ✔ Profile Updated Successfully
          </p>
        </div>
      )}
    </DashboardLayout>
  );
}

/* ---------------- Locked Field ---------------- */

function Field({ label, value, locked }) {
  return (
    <div>
      <label className="text-sm text-gray-500">{label}</label>

      <div className="flex justify-between items-center border-b border-gray-200 py-2">
        <span className="font-medium text-gray-800">
          {value || "NA"}
        </span>

        {locked && (
          <span className="text-gray-400 text-lg">
            🔒
          </span>
        )}
      </div>
    </div>
  );
}

function DateField({
  label,
  value,
  disabled,
  onChange,
}) {
  return (
    <div>
      <label className="text-sm text-gray-500">{label}</label>

      <input
        type="date"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full mt-1 border-b py-2 font-medium transition-all outline-none ${
          disabled
            ? "border-gray-200 bg-gray-50 cursor-not-allowed text-gray-700"
            : "border-blue-500 bg-white"
        }`}
      />
    </div>
  );
}
/* ---------------- Editable Field ---------------- */

function EditField({
  label,
  value,
  placeholder,
  disabled,
  onChange,
}) {
  return (
    <div>
      <label className="text-sm text-gray-500">
        {label}
      </label>

      <input
        type="text"
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full mt-1 border-b py-2 font-medium transition-all outline-none ${
          disabled
            ? "border-gray-200 bg-gray-50 cursor-not-allowed text-gray-700"
            : "border-blue-500 bg-white"
        }`}
      />
    </div>
  );
}