// import { useState } from "react";
// import DashboardLayout from "../../components/DashboardLayout";
// import { useAuth } from "../../context/useAuth";

// export default function MyProfile() {
//   const { user, updateProfile } = useAuth();

//   // Local editable copy
//   const [form, setForm] = useState({
//     email: user?.email || "",
//     address: user?.address || "",
//     pan: user?.pan || "",
//     employmentType: user?.employmentType || "Salaried",
//     employerName: user?.employerName || "",
//     monthlyIncome: user?.monthlyIncome || "",
//   });
//   const [saved, setSaved] = useState(false);

//   const handleChange = (field, value) => {
//     setForm({ ...form, [field]: value });
//     setSaved(false);
//   };

//   const handleSave = () => {
//     updateProfile(form);
//     setSaved(true);
//   };

//   return (
//     <DashboardLayout>
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">
//         Welcome! {user?.name?.toUpperCase()}
//       </h2>

//       {/* Personal Details */}
//       <div className="bg-white rounded-2xl shadow-sm p-6">
//         <h3 className="text-lg font-bold text-blue-900 mb-6">Personal Details</h3>

//         <div className="grid md:grid-cols-2 gap-x-10 gap-y-6">
//           <Field label="Full Name" locked value={user?.fullName} />
//           <Field label="Date Of Birth" locked value={user?.dob} />

//           <EditField
//             label="Email Address"
//             placeholder="Eg. example@xyz.com"
//             value={form.email}
//             onChange={(v) => handleChange("email", v)}
//           />
//           <Field label="Mobile Number" locked value={`+91 ${user?.mobile}`} />

//           <EditField
//             label="Address"
//             placeholder="Enter your address"
//             value={form.address}
//             onChange={(v) => handleChange("address", v)}
//           />
//           <Field label="Pin Code" locked value={user?.pinCode || "Undefined"} />

//           <EditField
//             label="PAN Card Number"
//             placeholder="Eg. ABCDE1234F"
//             value={form.pan}
//             onChange={(v) => handleChange("pan", v.toUpperCase())}
//           />
//         </div>
//       </div>

//       {/* Employment Details */}
//       <div className="bg-white rounded-2xl shadow-sm p-6 mt-6">
//         <h3 className="text-lg font-bold text-blue-900 mb-6">Employment Details</h3>

//         <div className="grid md:grid-cols-2 gap-x-10 gap-y-6">
//           <div>
//             <label className="text-sm text-gray-500">Employment Type</label>
//             <select
//               value={form.employmentType}
//               onChange={(e) => handleChange("employmentType", e.target.value)}
//               className="w-full mt-1 border-b border-gray-300 py-2 font-medium text-gray-800 focus:outline-none focus:border-blue-500 bg-transparent"
//             >
//               <option>Salaried</option>
//               <option>Self Employed</option>
//               <option>Business</option>
//               <option>Student</option>
//             </select>
//           </div>

//           <EditField
//             label="Employer Name"
//             placeholder="Enter employer name"
//             value={form.employerName}
//             onChange={(v) => handleChange("employerName", v)}
//           />

//           <EditField
//             label="Monthly Income"
//             placeholder="Enter monthly income"
//             value={form.monthlyIncome}
//             onChange={(v) => handleChange("monthlyIncome", v)}
//           />
//         </div>

//         <p className="text-sm text-blue-900 font-medium mt-6">
//           Note: Please enter correct details to get accurate loan and credit
//           card offers
//         </p>
//       </div>

//       {/* Save */}
//       <div className="flex items-center justify-end gap-4 mt-6">
//         {saved && (
//           <span className="text-green-600 text-sm font-medium">
//             ✓ Profile saved successfully
//           </span>
//         )}
//         <button
//           onClick={handleSave}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-xl font-semibold transition-colors"
//         >
//           Save
//         </button>
//       </div>
//     </DashboardLayout>
//   );
// }

// // Locked (read-only) field
// function Field({ label, value, locked }) {
//   return (
//     <div>
//       <label className="text-sm text-gray-500">{label}</label>
//       <div className="flex items-center justify-between border-b border-gray-200 py-2">
//         <span className="font-medium text-gray-800">{value || "NA"}</span>
//         {locked && <span className="text-gray-300">🔒</span>}
//       </div>
//     </div>
//   );
// }

// // Editable field
// function EditField({ label, value, placeholder, onChange }) {
//   return (
//     <div>
//       <label className="text-sm text-gray-500">{label}</label>
//       <input
//         type="text"
//         value={value}
//         placeholder={placeholder}
//         onChange={(e) => onChange(e.target.value)}
//         className="w-full mt-1 border-b border-gray-300 py-2 font-medium text-gray-800 focus:outline-none focus:border-blue-500 bg-transparent"
//       />
//     </div>
//   );
// }

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