// src/data/cardsData.js

export const ALL_CARDS = [
  {
    id: "bajaj-insta-emi",
    name: "Bajaj Finserv Insta EMI Card",
    image: "/cards/bajaj-emi.png",
    tag: "Effective Free",
    firstYearFee: "₹450",
    joiningBenefit: "Get ₹530 Flipkart Voucher on joining",
    benefits: [
      "₹1000 cashback on 1st in-store transaction",
      "Free Lifestyle, Domino's & Titan vouchers",
    ],
    minIncome: 0, // sabko milega
  },
  {
    id: "sbi-simplyclick",
    name: "SBI SimplyCLICK Credit Card",
    image: "/cards/sbi.png",
    tag: "Online Shopping",
    firstYearFee: "₹499",
    joiningBenefit: "₹500 Amazon voucher on joining",
    benefits: [
      "10X reward points on online spends",
      "1% fuel surcharge waiver",
    ],
    minIncome: 300000, // 3 LPA+
  },
  {
    id: "hdfc-millennia",
    name: "HDFC Millennia Credit Card",
    image: "/cards/hdfc.png",
    tag: "Cashback",
    firstYearFee: "₹1000",
    joiningBenefit: "1000 CashPoints on joining",
    benefits: [
      "5% cashback on Amazon, Flipkart, Swiggy",
      "1% cashback on all other spends",
    ],
    minIncome: 600000, // 6 LPA+
  },
  {
    id: "axis-magnus",
    name: "Axis Bank Magnus Credit Card",
    image: "/cards/axis.png",
    tag: "Travel",
    firstYearFee: "₹12500",
    joiningBenefit: "Premium travel & lounge access",
    benefits: [
      "Unlimited domestic lounge access",
      "12 EDGE reward points per ₹200",
    ],
    minIncome: 1800000, // 18 LPA+ (premium)
  },
];

// Income ke according cards filter karo (gross annual income)
export function getCardsByIncome(annualIncome) {
  const income = Number(annualIncome) || 0;
  return ALL_CARDS.filter((card) => income >= card.minIncome);
}