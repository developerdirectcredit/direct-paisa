// // import { BrowserRouter, Routes, Route } from "react-router-dom";

// // import Home from "./pages/Home";
// // import Login from "./pages/Login";


// // function App() {
// //   return (
// //     <BrowserRouter>
// //       <Routes>
// //         <Route path="/" element={<Home />} />
// //         <Route path="/signin" element={<Login />} />
       
// //         {/* <Route path="/emi-calculator" element={<EmiCalculator />} /> */}
        
 



// //       </Routes>
// //     </BrowserRouter>
// //   );
// // }

// // export default App;

// // using claude ai code

// import { BrowserRouter, Routes, Route } from "react-router-dom";

// // Existing pages
// import Home from "./pages/Home";
// import Login from "./pages/Login";

// // Loan pages
// import PersonalLoan from "./pages/loans/PersonalLoan";
// import HomeLoan from "./pages/loans/HomeLoan";
// import BusinessLoan from "./pages/loans/BusinessLoan";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Main */}
//         <Route path="/" element={<Home />} />
//         <Route path="/signin" element={<Login />} />

//         {/* Loans */}
//         <Route path="/loans/personal" element={<PersonalLoan />} />
//         <Route path="/loans/home" element={<HomeLoan />} />
//         <Route path="/loans/business" element={<BusinessLoan />} />

//         {/* Baaki pages aane wale hain — abhi 404 fallback */}
//         <Route path="*" element={<ComingSoon />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// // Temporary placeholder for unbuilt pages
// function ComingSoon() {
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
//       <div className="text-6xl mb-6">🚧</div>
//       <h1 className="text-3xl font-bold text-gray-800 mb-2">Coming Soon</h1>
//       <p className="text-gray-500 mb-8">Yeh page abhi build ho raha hai</p>
//       <a href="/" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
//         Back to Home
//       </a>
//     </div>
//   );
// }

// export default App;

// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Home from "./pages/Home";
// import Login from "./pages/Login";


// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/signin" element={<Login />} />
       
//         {/* <Route path="/emi-calculator" element={<EmiCalculator />} /> */}
        
 



//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

// using claude ai code


import { BrowserRouter, Routes, Route } from "react-router-dom";

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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Login />} />

        {/* Loans */}
        <Route path="/loans/personal" element={<PersonalLoan />} />
        <Route path="/loans/home" element={<HomeLoan />} />
        <Route path="/loans/business" element={<BusinessLoan />} />

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