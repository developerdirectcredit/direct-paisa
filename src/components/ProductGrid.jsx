import {
  Wallet,
  CreditCard,
  Briefcase,
  House,
  Landmark,
  Coins,
  Smartphone
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
    <section className="max-w-7xl mx-auto py-16">

      <h2 className="text-3xl font-bold mb-10">
        Loans & Cards
      </h2>

      <div className="grid md:grid-cols-4 gap-6">

        {products.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow hover:shadow-lg cursor-pointer p-6 transition"
            >
              <Icon size={40} className="text-blue-700"/>

              <h3 className="mt-4 font-semibold">
                {item.title}
              </h3>
            </div>
          );
        })}
      </div>

    </section>
  );
}