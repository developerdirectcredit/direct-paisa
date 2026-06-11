import { useState } from "react";

export default function Partners() {
  const [activeTab, setActiveTab] = useState("All");

  const tabs = [
    "All",
    "Personal Loan",
    "Credit Card",
    "Home Loan",
    "Business Loan",
  ];

  const partners = [
    {
      name: "American Express",
      logo: "/partners/americanexpress.png",
      category: "Credit Card",
    },
    {
      name: "Axis Bank",
      logo: "/partners/axis.png",
      category: "Personal Loan",
    },
    {
      name: "HDFC Bank",
      logo: "/partners/hdfc.png",
      category: "Personal Loan",
    },
    {
      name: "ICICI Bank",
      logo: "/partners/icici.png",
      category: "Personal Loan",
    },
    {
      name: "Kotak Bank",
      logo: "/partners/kotak.png",
      category: "Personal Loan",
    },
    {
      name: "IDFC First",
      logo: "/partners/idfc.png",
      category: "Personal Loan",
    },
    {
      name: "RBL Bank",
      logo: "/partners/rbl.png",
      category: "Credit Card",
    },

    {
  name: "UCO Bank",
  logo: "/partners/uco.png",
  category: "Personal Loan",
},
{
  name: "Bank of Baroda",
  logo: "/partners/bankofbaroda.png",
  categories: ["Personal Loan", "Home Loan", "Business Loan"],
},
{
  name: "IndusInd Bank",
  logo: "/partners/indusind.jpg",
  category: "Personal Loan",
},
 {
    name: "SBI",
    logo: "/partners/sbi.png",
    categories: ["Personal Loan", "Home Loan", "Business Loan"],
  },

{
  name: "YES Bank",
  logo: "/partners/yes.png",
  category: "Personal Loan",
},
  ];

  const filteredPartners =
  activeTab === "All"
    ? partners
    : partners.filter((partner) =>
        partner.categories
          ? partner.categories.includes(activeTab)
          : partner.category === activeTab
      );

  // const filteredPartners =
  //   activeTab === "All"
  //     ? partners
  //     : partners.filter((p) => p.category === activeTab);

  return (
    <section className="bg-[#f4f7fc] py-20">
      <div className="max-w-7xl mx-auto px-4">

        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-10">
          Our partners from
          <br />
          across the industry
        </h2>

        {/* Category Buttons */}
        <div className="flex flex-wrap gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">

          {filteredPartners.map((partner, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl h-32 flex items-center justify-center p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-14 w-auto object-contain"
              />
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}