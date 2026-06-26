import { useState } from "react";
import { AuthContext } from "./auth-context";

// Default profile jo login ke baad dikhega (demo data)
const defaultProfile = {
  name: "",
  fullName: "",
  mobile: "",
  email: "",
  dob: "",
  gender: "",
  address: "",
  pinCode: "",
  pan: "",
  employmentType: "Salaried",
  employerName: "",
  monthlyIncome: "",
  profileCompleted: false,
};

// localStorage se initial value padho (ek hi baar, render ke time)
function getInitialUser() {
  try {
    const saved = localStorage.getItem("dc_user");
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getInitialUser);

  // Login — mobile number ke saath. Demo: koi bhi number chalega.
 const login = (mobile) => {
  const savedUser = JSON.parse(localStorage.getItem("dc_user"));

  if (savedUser && savedUser.mobile === mobile) {
    setUser(savedUser);
    return savedUser;
  }

  const profile = {
    ...defaultProfile,
    mobile,
  };

  setUser(profile);
  localStorage.setItem("dc_user", JSON.stringify(profile));

  return profile;
};

  // Profile update (My Profile page se)
 const updateProfile = (updated) => {
  const merged = {
    ...user,
    ...updated,
    name: updated.fullName || user.name,
    profileCompleted: true,
  };

  setUser(merged);

  localStorage.setItem("dc_user", JSON.stringify(merged));
};
  const logout = () => {
    setUser(null);
    localStorage.removeItem("dc_user");
  };

  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, login, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}