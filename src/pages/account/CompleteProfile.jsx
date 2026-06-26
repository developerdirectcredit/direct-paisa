import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";
import { useAuth } from "../../context/useAuth";

export default function CompleteProfile() {
  const navigate = useNavigate();
  const {  updateProfile } = useAuth();

  const [form, setForm] = useState({
    fullName: "",
    dob: "",
    gender: "",
    email: "",
    address: "",
    pinCode: "",
    pan: "",
    employmentType: "Salaried",
    employerName: "",
    monthlyIncome: "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (!form.fullName || !form.dob || !form.email) {
      alert("Please fill all required fields.");
      return;
    }

    updateProfile({
      ...form,
      profileCompleted: true,
    });

    navigate("/account/dashboard");
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">

        <div className="bg-white rounded-2xl shadow-sm p-8">

          <h2 className="text-3xl font-bold text-blue-900">
            Complete Your Profile
          </h2>

          <p className="text-gray-500 mt-2 mb-8">
            Complete your profile to get personalized loan offers.
          </p>

          <div className="grid md:grid-cols-2 gap-6">

            <Input
              label="Full Name *"
              value={form.fullName}
              onChange={(v) => handleChange("fullName", v)}
            />

            <DateInput
              label="Date of Birth *"
              value={form.dob}
              onChange={(v) => handleChange("dob", v)}
            />

            <SelectInput
              label="Gender"
              value={form.gender}
              onChange={(v) => handleChange("gender", v)}
              options={["Male", "Female", "Other"]}
            />

            <Input
              label="Email *"
              value={form.email}
              onChange={(v) => handleChange("email", v)}
            />

            <Input
              label="Address"
              value={form.address}
              onChange={(v) => handleChange("address", v)}
            />

            <Input
              label="Pin Code"
              value={form.pinCode}
              onChange={(v) => handleChange("pinCode", v)}
            />

            <Input
              label="PAN Card"
              value={form.pan}
              onChange={(v) =>
                handleChange("pan", v.toUpperCase())
              }
            />

            <SelectInput
              label="Employment Type"
              value={form.employmentType}
              onChange={(v) =>
                handleChange("employmentType", v)
              }
              options={[
                "Salaried",
                "Self Employed",
                "Business",
                "Student",
              ]}
            />

            <Input
              label="Employer Name"
              value={form.employerName}
              onChange={(v) =>
                handleChange("employerName", v)
              }
            />

            <Input
              label="Monthly Income"
              value={form.monthlyIncome}
              onChange={(v) =>
                handleChange("monthlyIncome", v)
              }
            />

          </div>

          <div className="mt-10 flex justify-end">

            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-xl font-semibold transition"
            >
              Continue
            </button>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

/* ---------- Components ---------- */

function Input({ label, value, onChange }) {
  return (
    <div>
      <label className="text-sm text-gray-500">{label}</label>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-2 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

function DateInput({ label, value, onChange }) {
  return (
    <div>
      <label className="text-sm text-gray-500">{label}</label>

      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-2 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

function SelectInput({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <div>
      <label className="text-sm text-gray-500">{label}</label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-2 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
    </div>
  );
}