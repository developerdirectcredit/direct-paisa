import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import EmiCalculator from "./pages/EmiCalculator";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Login />} />
       
        {/* <Route path="/emi-calculator" element={<EmiCalculator />} /> */}
        <Route
  path="/personal-loan-emi"
  element={<EmiCalculator loanType="Personal Loan" />}
/>

<Route
  path="/home-loan-emi"
  element={<EmiCalculator loanType="Home Loan" />}
/>

<Route
  path="/business-loan-emi"
  element={<EmiCalculator loanType="Business Loan" />}
/>

<Route
  path="/gold-loan-emi"
  element={<EmiCalculator loanType="Gold Loan" />}
/>

<Route
  path="/mudra-loan-emi"
  element={<EmiCalculator loanType="Mudra Loan" />}
/>

<Route
  path="/tractor-loan-emi"
  element={<EmiCalculator loanType="Tractor Loan" />}
/>

<Route
  path="/term-loan-emi"
  element={<EmiCalculator loanType="Term Loan" />}
/>

<Route
  path="/lap-loan-emi"
  element={<EmiCalculator loanType="Loan Against Property" />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;