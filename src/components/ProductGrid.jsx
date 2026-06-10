


import {
  Wallet,
  CreditCard,
  Briefcase,
  House,
  Landmark,
  Coins,
  Smartphone,
} from "lucide-react";

const products = [
  { title: "Personal Loan", icon: Wallet },
  { title: "Credit Card", icon: CreditCard },
  { title: "Business Loan", icon: Briefcase },
  { title: "Home Loan", icon: House },
  { title: "Loan Against Property", icon: Landmark },
  { title: "FD", icon: Coins },
  { title: "UPI Card", icon: Smartphone },
];

export default function ProductGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 md:mb-12">
        Loans & Cards
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-5 md:gap-8">
        {products.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="
                group
                bg-white
                rounded-2xl
                p-5 md:p-6
                cursor-pointer
                text-center
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-xl
              "
            >
              {/* Icon Circle */}
              <div
                className="
                  w-16
                  h-16
                  mx-auto
                  rounded-full
                  bg-blue-50
                  flex
                  items-center
                  justify-center
                  transition-all
                  duration-300
                  group-hover:bg-blue-600
                "
              >
                <Icon
                  size={30}
                  className="
                    text-blue-700
                    transition-all
                    duration-300
                    group-hover:text-white
                  "
                />
              </div>

              {/* Title */}
              <h3
                className="
                  mt-4
                  text-sm
                  md:text-base
                  font-semibold
                  text-gray-800
                  leading-5
                "
              >
                {item.title}
              </h3>
            </div>
          );
        })}
      </div>
    </section>
  );
}