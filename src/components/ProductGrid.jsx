

// == add view in product section

import { useState } from "react";
import { useNavigate } from "react-router-dom";


  const products = [
  {
     title: "  Personal Loan",
     icon: "/icons/personal-loan.png",
     path: "/loans/personal"
   },
   {
     title: "Credit Card",
     icon: "/icons/credit-card.png",
      path: "/credit-cards"
   },
   {
     title: "Business Loan",
     icon: "/icons/business-loan.png",
     path: "/loans/business"
   },
   {
     title: "Home Loan",
     icon: "/icons/home-loan.png",
     path: "/loans/home"
   },
   {
     title: "Loan Against Property",
    icon: "/icons/property-loan.png",
    path: "/loans-against-property",

    
  },
  {
    title: "Instant Personal Loan",
    icon: "/icons/Instant-Personal-Loan.png",
     path: "/loans/instant-personal"
  },

     {
    title: "Start-Up Loan",
    icon: "/icons/startup-lone.jpg",
    path: "/loans/startup"
  }, 

   {
    title: "Education Loan",
    icon: "/icons/educationloan.png",
    path: "/loans/education"
  },  
   {
    title: "Lease Rental Discounting ",
    icon: "/icons/LRD.png",
    path: "/loans/lease-rental-loan"
  },  

   {
    title: "Agri Loan ",
    icon: "/icons/Agri.png",
    path: "/loans/agri"
  },
    {
    title: "Bank Gurantee Loan ",
    icon: "/icons/bankgurantee.png",
    path: "/loans/bank-guarantee"
  },

    {
    title: "CGTMSE  Loan ",
    icon: "/icons/cgtmseloan.jpg",
    path: "/loans/cgtmse"
  },

    {
    title: "Foreign Currency Term Loan",
    icon: "/icons/Foreign.png",
     path: "/loans/foreign-currency-loan"
  },
      {
    title: "Hospital Loan",
    icon: "/icons/hospital.jpg",
    path: "/loans/hospital-loan"
  },
    {
    title: "Invoice Discounting Loan",
    icon: "/icons/invoice.png",
    path: "/loans/invoice-discounting"
  },
      {
    title: "Funding against Schools & Colleges",
    icon: "/icons/college icon.jpg",
    path: "/loans/school-college-loan"
  },
    {
    title: "PCFC Loan ",
    icon: "/icons/pcfc.png",
    path: "/loans/pcfc"
  },
   {
  title: "Professional Loan",
  icon: "/icons/professional.png",
  path: "/loans/professional"
},
 {
  title: "Project Loan",
  icon: "/icons/project.png",
  path: "/loans/project"
},
{
  title: "Warehouse Finance",
  icon: "/icons/warehouse.png",
  path: "/loans/warehouse-finance"
},
  
  ]
// kitne products pehle dikhane hain (View More se pehle)
const INITIAL_COUNT = 14;// chnage row section 

export default function ProductGrid() {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  // showAll false hai to sirf pehle INITIAL_COUNT dikhao, warna saare
  const visibleProducts = showAll ? products : products.slice(0, INITIAL_COUNT);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
        Loans & Cards
      </h2>

      <div className="grid grid-cols-4 md:grid-cols-8 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {visibleProducts.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              if (item.path) {
                navigate(item.path);
              }
            }}
            className="
              group bg-white rounded-2xl p-5 md:p-6 cursor-pointer text-center
              transition-all duration-300 hover:-translate-y-2 hover:shadow-xl
            "
          >
            <div
              className="
                w-16 h-16 mx-auto rounded-full bg-blue-50 flex items-center
                justify-center transition-all duration-300 group-hover:bg-blue-600
              "
            >
              <img
                src={item.icon}
                alt={item.title}
                className="w-15 h-15 object-contain" // icons size 
              />
            </div>

            <h3 className="mt-2 text-sm font-medium text-gray-700">
              {item.title}
            </h3>
          </div>
        ))}
      </div>

      {/* View More / View Less button — sirf tab dikhao jab products zyada ho */}
      {products.length > INITIAL_COUNT && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="
              inline-flex items-center gap-1 rounded-full border border-blue-600
              px-6 py-2 text-sm font-semibold text-blue-600
              transition-colors hover:bg-blue-600 hover:text-white
            "
          >
            {showAll ? "View Less" : "View More"}
          </button>
        </div>
      )}
    </section>
  );
}