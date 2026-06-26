// src/context/CreditCardContext.jsx
import { createContext, useContext, useState } from "react";

const CreditCardContext = createContext();

export function CreditCardProvider({ children }) {
  const [formData, setFormData] = useState({
    mobile: "",
    employmentType: "",
    primaryBank: "",
    annualIncome: "",
    pincode: "",
    fullName: "",
    email: "",
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <CreditCardContext.Provider value={{ formData, updateField }}>
      {children}
    </CreditCardContext.Provider>
  );
}

export function useCreditCard() {
  return useContext(CreditCardContext);
}