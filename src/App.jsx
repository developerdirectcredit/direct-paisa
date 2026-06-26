

// using claude ai code


import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

// Existing pages
import Home from "./pages/Home";
import Login from "./pages/Login";

// Loan pages
import PersonalLoan from "./pages/loans/PersonalLoan";
import HomeLoan from "./pages/loans/HomeLoan";
import BusinessLoan from "./pages/loans/BusinessLoan";
import InstantPersonalLoan from "./pages/loans/InstantPersonalLoan";
import LoanAgainstProperty from "./pages/loans/LoanAgainstProperty";
import CreditCards from "./pages/CreditCards";
import EducationLoan from "./pages/loans/EducationLoan";
import StartupLoan from "./pages/loans/StartupLoan";
import LeaseRentalLoan from "./pages/loans/LeaseRentalLoan";
import AgriLoan from "./pages/loans/AgriLoan"; 
import BankGuarantee from "./pages/loans/BankGuarantee";
import Cgtmse from "./pages/loans/Cgtmse";
import ForeignCurrencyLoan from "./pages/loans/ForeignCurrencyLoan";
import HospitalLoan from "./pages/loans/HospitalLoan";
import InvoiceDiscounting from "./pages/loans/InvoiceDiscounting";
 import SchoolCollegeLoan from "./pages/loans/SchoolCollegeLoan";
import PcfcLoan from "./pages/loans/PcfcLoan";
import ProfessionalLoan from "./pages/loans/ProfessionalLoan";
import ProjectLoan from "./pages/loans/ProjectLoan";
// Credit Score pages
import CreditScore from "./pages/CreditScore";
import CibilScore from "./pages/CibilScore";
import ImproveScore from "./pages/ImproveScore";
import EmiCalculator from "./pages/EmiCalculator";


function App() {
  return (
    <BrowserRouter>
       <ScrollToTop />
    
      <Routes>
        {/* Main */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Login />} />

        {/* Loans */}
        <Route path="/loans/personal" element={<PersonalLoan />} />
        <Route path="/loans/home" element={<HomeLoan />} />
        <Route path="/loans/business" element={<BusinessLoan />} />
         <Route path="/loans/instant-personal" element={<InstantPersonalLoan />} />
        <Route path="/loans-against-property" element={<LoanAgainstProperty />} />
        <Route path="/credit-cards" element={<CreditCards />} />
        <Route path="/loans/education" element={<EducationLoan />} />
        <Route path="/loans/startup" element={<StartupLoan />} />
        <Route path="/loans/lease-rental-loan" element={<LeaseRentalLoan />} />
        <Route path="/loans/agri" element={<AgriLoan />} />
        <Route path="/loans/bank-guarantee" element={<BankGuarantee />} />
        <Route path="/loans/cgtmse" element={<Cgtmse />} />
        <Route path="/loans/foreign-currency-loan" element={<ForeignCurrencyLoan />} />
        <Route path="/loans/hospital-loan" element={<HospitalLoan />} />
        <Route path="/loans/invoice-discounting" element={<InvoiceDiscounting />} />
        <Route path="/loans/school-college-loan" element={<SchoolCollegeLoan />} />
        <Route path="/loans/pcfc" element={<PcfcLoan />} />
        <Route path="/loans/professional" element={<ProfessionalLoan />} />
           <Route path="/loans/project" element={<ProjectLoan />} />
        {/* Credit Score */}
        <Route path="/credit-score" element={<CreditScore />} />
        <Route path="/cibil-score" element={<CibilScore />} />
        <Route path="/improve-score" element={<ImproveScore />} />
        {/* <Route path="/credit-score" element={<CibilScore />} /> */}

        {/* Baaki pages aane wale hain — abhi 404 fallback */}
        <Route path="*" element={<ComingSoon />} />

        {/* emi calculator  */}

        <Route
  path="/calculators/personal-loan"
  element={<EmiCalculator loanType="Personal Loan" />}
/>

<Route
  path="/calculators/home-loan"
  element={<EmiCalculator loanType="Home Loan" />}
/>

<Route
  path="/calculators/business-loan"
  element={<EmiCalculator loanType="Business Loan" />}
/>

<Route
  path="/calculators/gold-loan"
  element={<EmiCalculator loanType="Gold Loan" />}
/>

<Route
  path="/calculators/mudra-loan"
  element={<EmiCalculator loanType="Mudra Loan" />}
/>

<Route
  path="/calculators/term-loan"
  element={<EmiCalculator loanType="Term Loan" />}
/>

<Route
  path="/calculators/lap"
  element={<EmiCalculator loanType="Loan Against Property Loan" />}
/>
      </Routes>
    </BrowserRouter>
  );
}

// Temporary placeholder for unbuilt pages
function ComingSoon() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      <div className="text-6xl mb-6">🚧</div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Coming Soon</h1>
      <p className="text-gray-500 mb-8">Yeh page abhi build ho raha hai</p>
      <a href="/" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
        Back to Home
      </a>
    </div>
  );
}

export default App;