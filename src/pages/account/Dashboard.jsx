import DashboardLayout from "../../components/DashboardLayout";
import { useAuth } from "../../context/useAuth";
import { useNavigate } from "react-router-dom";

// Recommended product cards (demo)
// const recommended = [
//   {
//     tag: "Credit +",
//     title: "Score improvement service",
//     points: ["In Depth Credit Report Analysis", "Tips to build healthy Credit Score"],
//     cta: "Apply Now",
//   },
//   {
//     tag: "Credit Card",
//     title: "Your First Credit Card. Totally Free.",
//     points: ["Get up to 20% cashback", "62 Days interest-free period", "No joining or annual fees"],
//     cta: "Apply Now",
//   },
//   {
//     tag: "Bajaj Insta EMI Card",
//     title: "Instant Credit Limit upto ₹3,00,000",
//     points: ["100% Digital process", "Approval in 30 Seconds*", "No Annual Charges"],
//     cta: "Apply Now",
//   },
// ];

// Explore more icons (demo)
// const explore = [
//   "Personal Loan",
//   "Credit Cards",
//   "Business Loan",
//   "Home Loan",
//   "Bonds",
//   "Loan Against Property",
//   "Transfer Home Loan",
// ];

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      {/* Welcome card */}
      <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">{user?.name}</h2>
            <p className="text-gray-500">{user?.mobile}</p>
          </div>
        </div>
        <button
          onClick={() => navigate("/account/profile")}
          className="text-blue-600 font-medium text-sm flex items-center gap-1 hover:underline"
        >
          View Details ›
        </button>
      </div>

      {/* Recommended products
      <h3 className="text-lg font-bold text-gray-700 mt-8 mb-4 uppercase tracking-wide">
        Recommended Products
      </h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {recommended.map((p, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col"
          >
            <span className="self-start bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
              {p.tag}
            </span>
            <h4 className="text-lg font-bold text-gray-800 mt-4">{p.title}</h4>
            <ul className="mt-3 space-y-2 flex-1">
              {p.points.map((pt, j) => (
                <li key={j} className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="text-pink-500 mt-0.5">⊘</span>
                  {pt}
                </li>
              ))}
            </ul>
            <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors">
              {p.cta} →
            </button>
          </div>
        ))}
      </div> */}
{/* 
      Explore more
      <div className="bg-white rounded-2xl shadow-sm p-6 mt-8">
        <h3 className="text-lg font-bold text-gray-700 mb-6">EXPLORE MORE</h3>
        <div className="grid grid-cols-3 md:grid-cols-7 gap-4">
          {explore.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center gap-2 cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center text-2xl transition-colors">
                💰
              </div>
              <span className="text-xs text-gray-600 leading-tight">{item}</span>
            </div>
          ))}
        </div>
      </div> */}

      App promo
      {/* <div className="bg-blue-50 rounded-2xl p-6 mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-gray-800">
            Get the Direct Credit App Now
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Scan the QR code or click the buttons to get started.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-black text-white text-xs px-4 py-2 rounded-lg">▶ Google Play</div>
          <div className="bg-black text-white text-xs px-4 py-2 rounded-lg"> App Store</div>
        </div>
      </div> */}

      {/* App Promo */}
<div className="mt-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl overflow-hidden shadow-lg">
  <div className="grid md:grid-cols-2 items-center">

    {/* Left Content */}
    <div className="p-8 text-white">
      <span className="inline-block bg-white/20 px-4 py-1 rounded-full text-sm font-medium">
        📱 Direct Credit Mobile App
      </span>

      <h3 className="text-3xl font-bold mt-4 leading-tight">
        Get the Direct Credit App
      </h3>

      <p className="mt-4 text-blue-100 leading-7">
        Apply for Personal Loans, Business Loans, Home Loans,
        check your Credit Score, track applications and manage
        your finances anytime, anywhere.
      </p>

      <div className="flex flex-wrap gap-3 mt-6">
        <button className="bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-900 transition">
          ▶ Google Play
        </button>

        <button className="bg-white text-gray-900 px-5 py-3 rounded-xl hover:bg-gray-100 transition">
          🍎 App Store
        </button>
      </div>
    </div>

    {/* Right Image */}
    <div className="flex justify-center p-6">
   {/* </div> <div className="grid md:grid-cols-2 items-center min-h-[340px]"> */}
      <img
        src="/images/direct-credit-app.png"
        alt="Direct Credit App"
         //className="w-52 md:w-64 lg:w-72 h-auto object-contain drop-shadow-2xl"
         className="h-64 md:h-72 lg:h-80 w-auto object-contain"
        //className="w-40 md:w-48 lg:w-56 h-auto object-contain"
      />
    </div>

  </div>
</div>
    </DashboardLayout>
  );
}