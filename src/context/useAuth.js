import { useContext } from "react";
import { AuthContext } from "./auth-context";

// Hook — kisi bhi component mein useAuth() se access karo
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}