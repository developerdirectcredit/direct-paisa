

// using claude ai code
// add tracking system
import { useEffect } from "react";
import { captureUtmParams, initPageTimeTracking, track } from "./lib/analytics";


import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "./context/AuthContext";

// Account / dashboard pages
import Dashboard from "./pages/account/Dashboard";
import MyProfile from "./pages/account/MyProfile";
import MyInvoices from "./pages/account/MyInvoices";
import HelpSupport from "./pages/account/HelpSupport";
import CommunicationPreferences from "./pages/account/CommunicationPreferences";
import CompleteProfile from "./pages/account/CompleteProfile";

// Existing pages
import Home from "./pages/Home";
import Login from "./pages/Login";

// Loan pages
import PersonalLoan from "./pages/loans/PersonalLoan";
import HomeLoan from "./pages/loans/HomeLoan";
import BusinessLoan from "./pages/loans/BusinessLoan";

// Credit Score pages
import CreditScore from "./pages/CreditScore";
import CibilScore from "./pages/CibilScore";
import ImproveScore from "./pages/ImproveScore";
import EmiCalculator from "./pages/EmiCalculator";
import About from "./pages/About";
import Careers from "./pages/Careers";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ContactUs from "./pages/ContactUs";
import TermsConditions from "./pages/TermsConditions";
import Awards from "./pages/Awards";
import Culture from "./pages/Culture";
//import CompleteProfile from "./pages/account/CompleteProfile";
import WarehouseFinance from "./pages/loans/WarehouseFinance";
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

function App() {
  
  useEffect(() => {
    captureUtmParams();        // UTM URL se pakdo
    initPageTimeTracking();    // page time tracking
    track("page_view");        // page khula
  }, []);
  
  return (
    <AuthProvider>
    <BrowserRouter>
       <ScrollToTop />
      <Routes>
        {/* Main */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Login />} />

        {/* Account / Dashboard (login ke baad) */}
        <Route path="/account/dashboard" element={<Dashboard />} />
        <Route
          path="/account/complete-profile"
          element={<CompleteProfile />}
        />
        <Route path="/account/profile" element={<MyProfile />} />
        <Route path="/account/invoices" element={<MyInvoices />} />
        <Route path="/account/support" element={<HelpSupport />} />
        <Route path="/account/preferences" element={<CommunicationPreferences />} />

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
        <Route path="/loans/warehouse-finance" element={<WarehouseFinance />} />
        {/* Credit Score */}
        <Route path="/credit-score" element={<CreditScore />} />
        <Route path="/cibil-score" element={<CibilScore />} />
        <Route path="/improve-score" element={<ImproveScore />} />

        {/* Culture page */}
        <Route path="/culture" element={<Culture />} />

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
{/* same url put */}
<Route
  path="/business-loan-emi"
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

 {/* route path for about us */}
        <Route path="/about" element={<About />} />


         {/* route path for carrers */}
        <Route path="/careers" element={<Careers />} />

         {/* route path for Privacy Policy */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
              <Route path="/awards" element={<Awards />} />

        {/* 404 fallback — sabse last mein */}
        <Route path="*" element={<ComingSoon />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
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