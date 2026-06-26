// import { useState, useRef } from "react";
// import TalkToExpertPopup from "./TalkToExpertPopup";
// import GetAppPopup from "./GetAppPopup";
// import {
//   PhoneCall,
//   Download,
//   ChevronDown,
//   ChevronRight,
//   BadgeIndianRupee,
//   Home,
//   Briefcase,
//   MoreHorizontal,
//   CreditCard,
//   Calculator,
//   BarChart3,
//   Menu,
//   X,
//   TrendingUp,
//   Landmark,
//   Coins,
//   Wheat,
//   Building2,
//   Globe,
//   ShieldCheck,
//   SlidersHorizontal,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// // ─── Menu Data (ek jagah se manage karo) ────────────────────────────────────
// const menuConfig = [
//   {
//     id: "score",
//     label: "Credit Score",
//     items: [
//       {
//         icon: BadgeIndianRupee,
//         title: "Credit Score FREE",
//         desc: "Know Your Score Instantly",
//         path: "/credit-score",
//       },
//       {
//         icon: BarChart3,
//         title: "FREE CIBIL Score",
//         desc: "Check Your CIBIL Report",
//         path: "/cibil-score",
//       },
//       {
//         icon: ShieldCheck,
//         title: "Improve Credit Score",
//         desc: "Tips & Strategies",
//         path: "/improve-score",
//       },
//     ],
//   },
//   {
//     id: "loan",
//     label: "Loans",
//     items: [
//       {
//         icon: BadgeIndianRupee,
//         title: "Personal Loan",
//         desc: "Upto ₹40L, instant approval",
//         path: "/loans/personal",
//       },
//       {
//         icon: Home,
//         title: "Home Loan",
//         desc: "Best rates from top banks",
//         path: "/loans/home",
//       },
//       {
//         icon: Briefcase,
//         title: "Business Loan",
//         desc: "For MSMEs & startups",
//         path: "/loans/business",
//       },
//       {
//         icon: Landmark,
//         title: "Loan Against Property",
//         desc: "Unlock your asset value",
//         path: "/loans/lap",
//       },
//       {
//         icon: Coins,
//         title: "Gold Loan",
//         desc: "Quick cash against gold",
//         path: "/loans/gold",
//       },
//       {
//         icon: MoreHorizontal,
//         title: "Other Loans",
//         desc: "Education, Vehicle & more",
//         path: "/loans/other",
//       },
//     ],
//   },
//   {
//     id: "card",
//     label: "Credit Cards",
//     items: [
//       {
//         icon: CreditCard,
//         title: "Best Credit Cards",
//         desc: "Top picks for rewards",
//         path: "/credit-cards/best",
//       },
//       {
//         icon: Globe,
//         title: "Best Forex Cards",
//         desc: "Travel abroad hassle-free",
//         path: "/credit-cards/forex",
//       },
//       {
//         icon: BarChart3,
//         title: "CIBIL for Credit Card",
//         desc: "Check eligibility first",
//         path: "/credit-cards/cibil",
//       },
//       {
//         icon: ShieldCheck,
//         title: "Card Eligibility",
//         desc: "Know before you apply",
//         path: "/credit-cards/eligibility",
//       },
//       {
//         icon: SlidersHorizontal,
//         title: "Compare Cards",
//         desc: "Side-by-side comparison",
//         path: "/credit-cards/compare",
//       },
//     ],
//   },
//   {
//     id: "calculator",
//     label: "Calculators",
//     cols: 2,
//     items: [
//       {
//         icon: Calculator,
//         title: "Personal Loan EMI",
//         desc: "",
//         path: "/calculators/personal-loan",
//       },
//       {
//         icon: Calculator,
//         title: "Home Loan EMI",
//         desc: "",
//         path: "/calculators/home-loan",
//       },
//       {
//         icon: Calculator,
//         title: "Business Loan EMI",
//         desc: "",
//         path: "/calculators/business-loan",
//       },
//       {
//         icon: Calculator,
//         title: "Loan Against Property",
//         desc: "",
//         path: "/calculators/lap",
//       },
//       {
//         icon: Coins,
//         title: "Gold Loan EMI",
//         desc: "",
//         path: "/calculators/gold-loan",
//       },
//       {
//         icon: TrendingUp,
//         title: "FD Calculator",
//         desc: "",
//         path: "/calculators/fd",
//       },
//       {
//         icon: Wheat,
//         title: "Mudra Loan EMI",
//         desc: "",
//         path: "/calculators/mudra",
//       },
//       {
//         icon: Building2,
//         title: "Term Loan EMI",
//         desc: "",
//         path: "/calculators/term-loan",
//       },
//     ],
//   },
// ];

// // ─── Desktop Dropdown ─────────────────────────────────────────────────────────
// function DesktopDropdown({ menu, navigate }) {
//   const isTwoCol = menu.cols === 2;

//   return (
//     <div
//       className={`absolute top-full left-0 mt-3 bg-white shadow-2xl rounded-2xl border border-gray-100 p-5 z-50 ${
//         isTwoCol ? "w-[480px]" : "w-80"
//       }`}
//     >
//       {/* Arrow pointer */}
//       <div className="absolute -top-2 left-6 w-4 h-4 bg-white border-l border-t border-gray-100 rotate-45" />

//       {isTwoCol ? (
//         <>
//           <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-4 px-1">
//             Loan EMI Calculators
//           </p>
//           <div className="grid grid-cols-2 gap-2">
//             {menu.items.map((item) => {
//               const Icon = item.icon;
//               return (
//                 <div
//                   key={item.title}
//                   onClick={() => navigate(item.path)}
//                   className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-blue-50 cursor-pointer group transition-colors"
//                 >
//                   <div className="w-8 h-8 rounded-lg bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center flex-shrink-0 transition-colors">
//                     <Icon size={15} className="text-blue-600" />
//                   </div>
//                   <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
//                     {item.title}
//                   </span>
//                 </div>
//               );
//             })}
//           </div>
//         </>
//       ) : (
//         <div className="space-y-1">
//           {menu.items.map((item) => {
//             const Icon = item.icon;
//             return (
//               <div
//                 key={item.title}
//                 onClick={() => navigate(item.path)}
//                 className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-blue-50 cursor-pointer group transition-colors"
//               >
//                 <div className="w-9 h-9 rounded-xl bg-blue-50 group-hover:bg-blue-600 flex items-center justify-center flex-shrink-0 transition-colors">
//                   <Icon
//                     size={18}
//                     className="text-blue-600 group-hover:text-white transition-colors"
//                   />
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
//                     {item.title}
//                   </p>
//                   {item.desc && (
//                     <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
//                   )}
//                 </div>
//                 <ChevronRight
//                   size={14}
//                   className="text-gray-300 group-hover:text-blue-400 transition-colors flex-shrink-0"
//                 />
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

// // ─── Mobile Accordion Item ────────────────────────────────────────────────────
// function MobileAccordion({ menu, navigate, onClose }) {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="border-b border-gray-100 last:border-0">
//       {/* Header */}
//       <button
//         onClick={() => setOpen(!open)}
//         className="w-full flex items-center justify-between px-4 py-4 text-left"
//       >
//         <span className="font-semibold text-gray-800 text-[15px]">
//           {menu.label}
//         </span>
//         <ChevronDown
//           size={18}
//           className={`text-gray-400 transition-transform duration-300 ${
//             open ? "rotate-180" : ""
//           }`}
//         />
//       </button>

//       {/* Dropdown items */}
//       {open && (
//         <div className="pb-3 px-2 space-y-1">
//           {menu.items.map((item) => {
//             const Icon = item.icon;
//             return (
//               <div
//                 key={item.title}
//                 onClick={() => {
//                   navigate(item.path);
//                   onClose();
//                 }}
//                 className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-blue-50 active:bg-blue-100 cursor-pointer group transition-colors"
//               >
//                 <div className="w-9 h-9 rounded-xl bg-gray-100 group-hover:bg-blue-600 flex items-center justify-center flex-shrink-0 transition-colors">
//                   <Icon
//                     size={17}
//                     className="text-gray-500 group-hover:text-white transition-colors"
//                   />
//                 </div>
//                 <div className="flex-1">
//                   <p className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
//                     {item.title}
//                   </p>
//                   {item.desc && (
//                     <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
//                   )}
//                 </div>
//                 <ChevronRight size={14} className="text-gray-300 flex-shrink-0" />
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

// // ─── Main Navbar ──────────────────────────────────────────────────────────────
// export default function Navbar() {
//   const [openMenu, setOpenMenu] = useState(null);
//   const [mobileMenu, setMobileMenu] = useState(false);
//   const [showExpertCard, setShowExpertCard] = useState(false);
//   const [showAppPopup, setShowAppPopup] = useState(false);
//   const navigate = useNavigate();
//   const closeTimer = useRef(null);
//   const expertTimer = useRef(null);
//   const appTimer = useRef(null);

//   const handleMenuEnter = (id) => {
//     if (closeTimer.current) clearTimeout(closeTimer.current);
//     setOpenMenu(id);
//   };

//   const handleMenuLeave = () => {
//     closeTimer.current = setTimeout(() => setOpenMenu(null), 150);
//   };

//   const handleExpertEnter = () => {
//     if (expertTimer.current) clearTimeout(expertTimer.current);
//     setShowExpertCard(true);
//   };

//   const handleExpertLeave = () => {
//     expertTimer.current = setTimeout(() => setShowExpertCard(false), 150);
//   };

//   const handleAppEnter = () => {
//     if (appTimer.current) clearTimeout(appTimer.current);
//     setShowAppPopup(true);
//   };

//   const handleAppLeave = () => {
//     appTimer.current = setTimeout(() => setShowAppPopup(false), 150);
//   };

//   return (
//     <header className="bg-white border-b border-gray-200 sticky top-0 z-50">

//       {/* Top Bar */}
//       <div className="hidden md:flex justify-end items-center px-8 py-2 text-sm border-b bg-gray-50">

//         <div
//           className="relative"
//           onMouseEnter={handleExpertEnter}
//           onMouseLeave={handleExpertLeave}
//         >
//           <div className="flex items-center gap-2 text-blue-600 cursor-pointer hover:text-blue-700 transition-colors">
//             <PhoneCall size={15} />
//             Talk to Expert
//           </div>
//           {showExpertCard && <TalkToExpertPopup />}
//         </div>

//         <span className="mx-4 text-gray-300">|</span>

//         <div
//           className="relative"
//           onMouseEnter={handleAppEnter}
//           onMouseLeave={handleAppLeave}
//         >
//           <div className="flex items-center gap-2 text-blue-600 font-medium cursor-pointer hover:text-blue-700 transition-colors">
//             <Download size={15} />
//             Get The App
//           </div>
//           {showAppPopup && <GetAppPopup />}
//         </div>
//       </div>

//       {/* Main Navbar */}
//       <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-6 py-1">

//         {/* Logo */}
//         <img
//           src="/logo.png"
//           alt="Direct Credit Logo"
//           className="h-12 md:h-20 object-contain cursor-pointer"
//           onClick={() => navigate("/")}
//         />

//         {/* Desktop Menu */}
//         <nav className="hidden lg:flex items-center gap-1 font-medium text-gray-800">
//           {menuConfig.map((menu) => (
//             <div
//               key={menu.id}
//               className="relative"
//               onMouseEnter={() => handleMenuEnter(menu.id)}
//               onMouseLeave={handleMenuLeave}
//             >
//               <button
//                 className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//                   openMenu === menu.id
//                     ? "text-blue-600 bg-blue-50"
//                     : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
//                 }`}
//               >
//                 {menu.label}
//                 <ChevronDown
//                   size={15}
//                   className={`transition-transform duration-200 ${
//                     openMenu === menu.id ? "rotate-180 text-blue-600" : "text-gray-400"
//                   }`}
//                 />
//               </button>

//               {openMenu === menu.id && (
//                 <DesktopDropdown menu={menu} navigate={navigate} />
//               )}
//             </div>
//           ))}
//         </nav>

//         {/* Sign In Button */}
//         <button
//           onClick={() => navigate("/signin")}
//           className="hidden lg:block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm"
//         >
//           Sign In
//         </button>

//         {/* Mobile Menu Toggle */}
//         <button
//           className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
//           onClick={() => setMobileMenu(!mobileMenu)}
//           aria-label="Toggle menu"
//         >
//           {mobileMenu ? (
//             <X size={24} className="text-gray-700" />
//           ) : (
//             <Menu size={24} className="text-gray-700" />
//           )}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {mobileMenu && (
//         <div className="lg:hidden border-t border-gray-100 bg-white shadow-lg max-h-[80vh] overflow-y-auto">

//           {/* Mobile Top Bar links */}
//           <div className="flex gap-4 px-4 py-3 bg-blue-50 border-b border-blue-100">
//             <div className="flex items-center gap-2 text-blue-600 text-sm font-medium cursor-pointer">
//               <PhoneCall size={15} />
//               Talk to Expert
//             </div>
//             <span className="text-blue-200">|</span>
//             <div className="flex items-center gap-2 text-blue-600 text-sm font-medium cursor-pointer">
//               <Download size={15} />
//               Get The App
//             </div>
//           </div>

//           {/* Accordion Menus */}
//           {menuConfig.map((menu) => (
//             <MobileAccordion
//               key={menu.id}
//               menu={menu}
//               navigate={navigate}
//               onClose={() => setMobileMenu(false)}
//             />
//           ))}

//           {/* Sign In */}
//           <div className="p-4">
//             <button
//               onClick={() => {
//                 navigate("/signin");
//                 setMobileMenu(false);
//               }}
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-semibold text-sm transition-colors"
//             >
//               Sign In
//             </button>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }

// after changing on 25 june 
import { useState, useRef } from "react";
import TalkToExpertPopup from "./TalkToExpertPopup";
import GetAppPopup from "./GetAppPopup";
import {
  PhoneCall,
  Download,
  ChevronDown,
  ChevronRight,
  BadgeIndianRupee,
  Home,
  Briefcase,
  MoreHorizontal,
  CreditCard,
  Calculator,
  BarChart3,
  Menu,
  X,
  TrendingUp,
  Landmark,
  Coins,
  Wheat,
  Building2,
  Globe,
  ShieldCheck,
  SlidersHorizontal,
  UserCircle,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

// ─── Menu Data (ek jagah se manage karo) ────────────────────────────────────
const menuConfig = [
  {
    id: "score",
    label: "Credit Score",
    items: [
      {
        icon: BadgeIndianRupee,
        title: "Credit Score FREE",
        desc: "Know Your Score Instantly",
        path: "/credit-score",
      },
      {
        icon: BarChart3,
        title: "FREE CIBIL Score",
        desc: "Check Your CIBIL Report",
        path: "/cibil-score",
      },
      {
        icon: ShieldCheck,
        title: "Improve Credit Score",
        desc: "Tips & Strategies",
        path: "/improve-score",
      },
    ],
  },
  {
    id: "loan",
    label: "Loans",
    items: [
      {
        icon: BadgeIndianRupee,
        title: "Personal Loan",
        desc: "Upto ₹40L, instant approval",
        path: "/loans/personal",
      },
      {
        icon: Home,
        title: "Home Loan",
        desc: "Best rates from top banks",
        path: "/loans/home",
      },
      {
        icon: Briefcase,
        title: "Business Loan",
        desc: "For MSMEs & startups",
        path: "/loans/business",
      },
      {
        icon: Landmark,
        title: "Loan Against Property",
        desc: "Unlock your asset value",
        path: "/loans-against-property",
      },
      {
        icon: Coins,
        title: "Gold Loan",
        desc: "Quick cash against gold",
        path: "/loans/gold",
      },
      {
        icon: MoreHorizontal,
        title: "Other Loans",
        desc: "Education, Vehicle & more",
        path: "/loans/other",
      },

      {
        icon: ShieldCheck,
        title: "Bank Guarantee",
        desc: "Financial, Performance, Bid Bond & more",
        path: "/loans/bank-guarantee",
      },
    ],
  },
  {
    id: "card",
    label: "Credit Cards",
    items: [
      {
        icon: CreditCard,
        title: "Best Credit Cards",
        desc: "Top picks for rewards",
        path: "/credit-cards/best",
      },
      {
        icon: Globe,
        title: "Best Forex Cards",
        desc: "Travel abroad hassle-free",
        path: "/credit-cards/forex",
      },
      {
        icon: BarChart3,
        title: "CIBIL for Credit Card",
        desc: "Check eligibility first",
        path: "/credit-cards/cibil",
      },
      {
        icon: ShieldCheck,
        title: "Card Eligibility",
        desc: "Know before you apply",
        path: "/credit-cards/eligibility",
      },
      {
        icon: SlidersHorizontal,
        title: "Compare Cards",
        desc: "Side-by-side comparison",
        path: "/credit-cards/compare",
      },
    ],
  },
  {
    id: "calculator",
    label: "Calculators",
    cols: 2,
    items: [
      {
        icon: Calculator,
        title: "Personal Loan EMI",
        desc: "",
        path: "/calculators/personal-loan",
      },
      {
        icon: Calculator,
        title: "Home Loan EMI",
        desc: "",
        path: "/calculators/home-loan",
      },
      {
        icon: Calculator,
        title: "Business Loan EMI",
        desc: "",
        path: "/calculators/business-loan",
      },
      {
        icon: Calculator,
        title: "Loan Against Property",
        desc: "",
        path: "/calculators/lap",
      },
      {
        icon: Coins,
        title: "Gold Loan EMI",
        desc: "",
        path: "/calculators/gold-loan",
      },
      {
        icon: TrendingUp,
        title: "FD Calculator",
        desc: "",
        path: "/calculators/fd",
      },
      {
        icon: Wheat,
        title: "Mudra Loan EMI",
        desc: "",
        path: "/calculators/mudra",
      },
      {
        icon: Building2,
        title: "Term Loan EMI",
        desc: "",
        path: "/calculators/term-loan",
      },
    ],
  },
];

// ─── Desktop Dropdown ─────────────────────────────────────────────────────────
function DesktopDropdown({ menu, navigate }) {
  const isTwoCol = menu.cols === 2;

  return (
    <div
      className={`absolute top-full left-0 mt-3 bg-white shadow-2xl rounded-2xl border border-gray-100 p-5 z-50 ${isTwoCol ? "w-[480px]" : "w-80"
        }`}
    >
      {/* Arrow pointer */}
      <div className="absolute -top-2 left-6 w-4 h-4 bg-white border-l border-t border-gray-100 rotate-45" />

      {isTwoCol ? (
        <>
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-4 px-1">
            Loan EMI Calculators
          </p>
          <div className="grid grid-cols-2 gap-2">
            {menu.items.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  onClick={() => navigate(item.path)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-blue-50 cursor-pointer group transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center flex-shrink-0 transition-colors">
                    <Icon size={15} className="text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </span>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="space-y-1">
          {menu.items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                onClick={() => navigate(item.path)}
                className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-blue-50 cursor-pointer group transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-50 group-hover:bg-blue-600 flex items-center justify-center flex-shrink-0 transition-colors">
                  <Icon
                    size={18}
                    className="text-blue-600 group-hover:text-white transition-colors"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </p>
                  {item.desc && (
                    <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                  )}
                </div>
                <ChevronRight
                  size={14}
                  className="text-gray-300 group-hover:text-blue-400 transition-colors flex-shrink-0"
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Mobile Accordion Item ────────────────────────────────────────────────────
function MobileAccordion({ menu, navigate, onClose }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-0">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-4 text-left"
      >
        <span className="font-semibold text-gray-800 text-[15px]">
          {menu.label}
        </span>
        <ChevronDown
          size={18}
          className={`text-gray-400 transition-transform duration-300 ${open ? "rotate-180" : ""
            }`}
        />
      </button>

      {/* Dropdown items */}
      {open && (
        <div className="pb-3 px-2 space-y-1">
          {menu.items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                onClick={() => {
                  navigate(item.path);
                  onClose();
                }}
                className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-blue-50 active:bg-blue-100 cursor-pointer group transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-gray-100 group-hover:bg-blue-600 flex items-center justify-center flex-shrink-0 transition-colors">
                  <Icon
                    size={17}
                    className="text-gray-500 group-hover:text-white transition-colors"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </p>
                  {item.desc && (
                    <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                  )}
                </div>
                <ChevronRight size={14} className="text-gray-300 flex-shrink-0" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────
export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showExpertCard, setShowExpertCard] = useState(false);
  const [showAppPopup, setShowAppPopup] = useState(false);
  const navigate = useNavigate();
  const closeTimer = useRef(null);
  const expertTimer = useRef(null);
  const appTimer = useRef(null);
  const { isLoggedIn, user, logout } = useAuth();
  const [userMenu, setUserMenu] = useState(false);

  const handleMenuEnter = (id) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(id);
  };

  const handleMenuLeave = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 150);
  };

  const handleExpertEnter = () => {
    if (expertTimer.current) clearTimeout(expertTimer.current);
    setShowExpertCard(true);
  };

  const handleExpertLeave = () => {
    expertTimer.current = setTimeout(() => setShowExpertCard(false), 150);
  };

  const handleAppEnter = () => {
    if (appTimer.current) clearTimeout(appTimer.current);
    setShowAppPopup(true);
  };

  const handleAppLeave = () => {
    appTimer.current = setTimeout(() => setShowAppPopup(false), 150);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">

      {/* Top Bar */}
      <div className="hidden md:flex justify-end items-center px-8 py-2 text-sm border-b bg-gray-50">

        <div
          className="relative"
          onMouseEnter={handleExpertEnter}
          onMouseLeave={handleExpertLeave}
        >
          <div className="flex items-center gap-2 text-blue-600 cursor-pointer hover:text-blue-700 transition-colors">
            <PhoneCall size={15} />
            Talk to Expert
          </div>
          {showExpertCard && <TalkToExpertPopup />}
        </div>

        <span className="mx-4 text-gray-300">|</span>

        <div
          className="relative"
          onMouseEnter={handleAppEnter}
          onMouseLeave={handleAppLeave}
        >
          <div className="flex items-center gap-2 text-blue-600 font-medium cursor-pointer hover:text-blue-700 transition-colors">
            <Download size={15} />
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
          alt="Direct Credit Logo"
          className="h-12 md:h-20 object-contain cursor-pointer"
          onClick={() => navigate("/")}
        />

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-1 font-medium text-gray-800">
          {menuConfig.map((menu) => (
            <div
              key={menu.id}
              className="relative"
              onMouseEnter={() => handleMenuEnter(menu.id)}
              onMouseLeave={handleMenuLeave}
            >
              <button
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${openMenu === menu.id
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
              >
                {menu.label}
                <ChevronDown
                  size={15}
                  className={`transition-transform duration-200 ${openMenu === menu.id ? "rotate-180 text-blue-600" : "text-gray-400"
                    }`}
                />
              </button>

              {openMenu === menu.id && (
                <DesktopDropdown menu={menu} navigate={navigate} />
              )}
            </div>
          ))}
        </nav>

        {/* Sign In Button / User Dropdown */}
        {isLoggedIn ? (
          <div
            className="hidden lg:block relative"
            onMouseEnter={() => setUserMenu(true)}
            onMouseLeave={() => setUserMenu(false)}
          >
            <button className="flex items-center gap-2 border border-blue-600 text-blue-600 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-50 transition-colors">
              <UserCircle size={18} />
              {user?.name}
              <ChevronDown size={15} />
            </button>

            {userMenu && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-2xl rounded-xl border border-gray-100 py-2 z-50">
                <button
                  onClick={() => navigate("/account/profile")}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <UserCircle size={18} />
                  My Profile
                </button>
                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/signin")}
            className="hidden lg:block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm"
          >
            Sign In
          </button>
        )}

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label="Toggle menu"
        >
          {mobileMenu ? (
            <X size={24} className="text-gray-700" />
          ) : (
            <Menu size={24} className="text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="lg:hidden border-t border-gray-100 bg-white shadow-lg max-h-[80vh] overflow-y-auto">

          {/* Mobile Top Bar links */}
          <div className="flex gap-4 px-4 py-3 bg-blue-50 border-b border-blue-100">
            <div className="flex items-center gap-2 text-blue-600 text-sm font-medium cursor-pointer">
              <PhoneCall size={15} />
              Talk to Expert
            </div>
            <span className="text-blue-200">|</span>
            <div className="flex items-center gap-2 text-blue-600 text-sm font-medium cursor-pointer">
              <Download size={15} />
              Get The App
            </div>
          </div>

          {/* Accordion Menus */}
          {menuConfig.map((menu) => (
            <MobileAccordion
              key={menu.id}
              menu={menu}
              navigate={navigate}
              onClose={() => setMobileMenu(false)}
            />
          ))}

          {/* Sign In / User options */}
          <div className="p-4">
            {isLoggedIn ? (
              <div className="space-y-2">
                <button
                  onClick={() => {
                    navigate("/account/profile");
                    setMobileMenu(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 border border-blue-600 text-blue-600 py-3.5 rounded-xl font-semibold text-sm"
                >
                  <UserCircle size={18} />
                  My Profile
                </button>
                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                    setMobileMenu(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-500 py-3.5 rounded-xl font-semibold text-sm"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  navigate("/signin");
                  setMobileMenu(false);
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-semibold text-sm transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}





























































































































































































































































































































































































































































































































































































































