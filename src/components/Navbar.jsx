
import { useState } from "react";
import TalkToExpertPopup from "./TalkToExpertPopup";
import GetAppPopup from "./GetAppPopup";
import {
  PhoneCall,
  Download,
  ChevronDown,
  BadgeIndianRupee,
  Home,
  Briefcase,
  MoreHorizontal,
  CreditCard,
  Calculator,
  BarChart3,
  Menu,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
 const navigate = useNavigate();
const [showExpertCard, setShowExpertCard] = useState(false);
const [showAppPopup, setShowAppPopup] = useState(false);// get app state

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">

      {/* Top Bar */}
      <div className="hidden md:flex justify-end items-center px-8 py-2 text-sm border-b bg-gray-50">

       <div   
  className="relative"
  onMouseEnter={() => setShowExpertCard(true)}
  onMouseLeave={() => setShowExpertCard(false)}
>
  <div className="flex items-center gap-2 text-blue-600 cursor-pointer">
    <PhoneCall size={16} />
    Talk to Expert
  </div>

  {showExpertCard && <TalkToExpertPopup />}
</div>

        <span className="mx-4 text-gray-300">|</span>

       <div
  className="relative"
  onMouseEnter={() => setShowAppPopup(true)}
  onMouseLeave={() => setShowAppPopup(false)}
>
  <div className="flex items-center gap-2 text-blue-600 cursor-pointer font-medium">
    <Download size={16} />
    Get The App
  </div>

  {showAppPopup && <GetAppPopup />}
</div>

    </div>


      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-6 py-1">

        {/* Logo */}
        <img
          src="/logo.png"
          alt="Logo"
          //className="h-20 md:h-24 object-contain cursor-pointer" change navbar size and hieght
           className="h-12 md:h-20 object-contain cursor-pointer"
        />

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-8 font-medium text-gray-800">

          {/* CREDIT SCORE */}
          <div
            className="relative"
            onMouseEnter={() => setOpenMenu("score")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button className="flex items-center gap-1 hover:text-blue-600">
              Credit Score
              <ChevronDown size={18} />
            </button>

            {openMenu === "score" && (
              <div className="absolute top-full left-0 mt-2 w-80 bg-white shadow-xl rounded-xl p-5 border">
                <div className="space-y-5">

                  <div className="flex gap-3 cursor-pointer hover:text-blue-600">
                    <BadgeIndianRupee />
                    <div>
                      <p className="font-semibold">Credit Score FREE</p>
                      <span className="text-sm text-gray-500">
                        Know Your Score
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3 cursor-pointer hover:text-blue-600">
                    <BarChart3 />
                    <div>
                      <p className="font-semibold">FREE CIBIL Score</p>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>

          {/* LOANS */}
          <div
            className="relative"
            onMouseEnter={() => setOpenMenu("loan")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button className="flex items-center gap-1 hover:text-blue-600">
              Loans
              <ChevronDown size={18} />
            </button>

            {openMenu === "loan" && (
              <div className="absolute top-full left-0 mt-2 w-80 bg-white shadow-xl rounded-xl p-5 border">
                <div className="space-y-4">

                  <div className="flex gap-3 hover:text-blue-600 cursor-pointer">
                    <BadgeIndianRupee />
                    <span>Personal Loan</span>
                  </div>

                  <div className="flex gap-3 hover:text-blue-600 cursor-pointer">
                    <Home />
                    <span>Home Loan</span>
                  </div>

                  <div className="flex gap-3 hover:text-blue-600 cursor-pointer">
                    <Briefcase />
                    <span>Business Loan</span>
                  </div>

                  <div className="flex gap-3 hover:text-blue-600 cursor-pointer">
                    <MoreHorizontal />
                    <span>Other Options</span>
                  </div>

                </div>
              </div>
            )}
          </div>

          {/* CREDIT CARDS */}
          <div
            className="relative"
            onMouseEnter={() => setOpenMenu("card")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button className="flex items-center gap-1 hover:text-blue-600">
              Credit Cards
              <ChevronDown size={18} />
            </button>

            {openMenu === "card" && (
              <div className="absolute top-full left-0 mt-2 w-96 bg-white shadow-xl rounded-xl p-5 border">

                <div className="space-y-4">

                  <div className="flex gap-3 hover:text-blue-600 cursor-pointer">
                    <CreditCard />
                    <span>Best Credit Cards</span>
                  </div>

                  <div className="flex gap-3 hover:text-blue-600 cursor-pointer">
                    <CreditCard />
                    <span>Best Forex Cards</span>
                  </div>

                  <div className="flex gap-3 hover:text-blue-600 cursor-pointer">
                    <CreditCard />
                    <span>CIBIL Score for Credit Card</span>
                  </div>

                  <div className="flex gap-3 hover:text-blue-600 cursor-pointer">
                    <CreditCard />
                    <span>Credit Card Eligibility</span>
                  </div>

                  <div className="flex gap-3 hover:text-blue-600 cursor-pointer">
                    <CreditCard />
                    <span>Compare Credit Cards</span>
                  </div>

                </div>

              </div>
            )}
          </div>

          {/* CALCULATORS */}
          <div
            className="relative"
            onMouseEnter={() => setOpenMenu("calculator")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button className="flex items-center gap-1 hover:text-blue-600">
              Calculators
              <ChevronDown size={18} />
            </button>

            {openMenu === "calculator" && (
              <div className="absolute top-full left-0 mt-2 w-[450px] bg-white shadow-xl rounded-xl p-5 border">

                <div className="space-y-4">

                  <h3 className="font-semibold text-blue-600">
                    Loan EMI Calculators
                  </h3>

                  {[
                    "Personal Loan EMI Calculator",
                    "Home Loan EMI Calculator",
                    "Business Loan EMI Calculator",
                    "Loan Against Property EMI Calculator",
                    "Gold Loan EMI Calculator",
                    "Term Loan EMI Calculator",
                    "Tractor Loan EMI Calculator",
                    "Mudra Loan EMI Calculator",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex gap-3 hover:text-blue-600 cursor-pointer"
                    >
                      <Calculator size={18} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

              </div>
            )}
          </div>

        </nav>

        {/* Desktop Sign In
        <button className="hidden lg:block border border-blue-600 text-blue-600 px-6 py-2 rounded-md hover:bg-blue-600 hover:text-white transition">
          Sign In
        </button> */}

        <button
  onClick={() => navigate("/signin")}
  className="hidden lg:block border border-blue-600 text-blue-600 px-6 py-2 rounded-md hover:bg-blue-600 hover:text-white transition"
>
  Sign In
</button>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="lg:hidden border-t bg-white shadow-lg">

          <div className="p-4 space-y-4">

            <details>
              <summary className="font-semibold cursor-pointer">
                Credit Score
              </summary>

              <div className="pl-4 mt-3 space-y-2 text-sm">
                <div>Know Your Score</div>
                <div>Credit Score FREE</div>
                <div>FREE CIBIL Score</div>
              </div>
            </details>

            <details>
              <summary className="font-semibold cursor-pointer">
                Loans
              </summary>

              <div className="pl-4 mt-3 space-y-2 text-sm">
                <div>Personal Loan</div>
                <div>Home Loan</div>
                <div>Business Loan</div>
                <div>Other Options</div>
              </div>
            </details>

            <details>
              <summary className="font-semibold cursor-pointer">
                Credit Cards
              </summary>

              <div className="pl-4 mt-3 space-y-2 text-sm">
                <div>Best Credit Cards</div>
                <div>Best Forex Cards</div>
                <div>CIBIL Score for Credit Card</div>
                <div>Credit Card Eligibility</div>
                <div>Compare Credit Cards</div>
              </div>
            </details>

            <details>
              <summary className="font-semibold cursor-pointer">
                Calculators
              </summary>

              <div className="pl-4 mt-3 space-y-2 text-sm">
                <div>Personal Loan EMI Calculator</div>
                <div>Home Loan EMI Calculator</div>
                <div>Business Loan EMI Calculator</div>
                <div>Loan Against Property EMI Calculator</div>
                <div>Gold Loan EMI Calculator</div>
                <div>Term Loan EMI Calculator</div>
                <div>Tractor Loan EMI Calculator</div>
                <div>Mudra Loan EMI Calculator</div>
              </div>
            </details>

            <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
              Sign In
            </button>

          </div>
        </div>
      )}

   
    </header>
    );
    }
