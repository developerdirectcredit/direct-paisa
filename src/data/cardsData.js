// // src/data/cardsData.js

// export const ALL_CARDS = [
//   {
//     id: "bajaj-insta-emi",
//     name: "Bajaj Finserv Insta EMI Card",
//     image: "/cards/bajaj-emi.png",
//     tag: "Effective Free",
//     firstYearFee: "₹450",
//     joiningBenefit: "Get ₹530 Flipkart Voucher on joining",
//     benefits: [
//       "₹1000 cashback on 1st in-store transaction",
//       "Free Lifestyle, Domino's & Titan vouchers",
//     ],
//     minIncome: 0, // sabko milega
//   },
//   {
//     id: "sbi-simplyclick",
//     name: "SBI SimplyCLICK Credit Card",
//     image: "/cards/sbi.png",
//     tag: "Online Shopping",
//     firstYearFee: "₹499",
//     joiningBenefit: "₹500 Amazon voucher on joining",
//     benefits: [
//       "10X reward points on online spends",
//       "1% fuel surcharge waiver",
//     ],
//     minIncome: 300000, // 3 LPA+
//   },
//   {
//     id: "hdfc-millennia",
//     name: "HDFC Millennia Credit Card",
//     image: "/cards/hdfc.png",
//     tag: "Cashback",
//     firstYearFee: "₹1000",
//     joiningBenefit: "1000 CashPoints on joining",
//     benefits: [
//       "5% cashback on Amazon, Flipkart, Swiggy",
//       "1% cashback on all other spends",
//     ],
//     minIncome: 600000, // 6 LPA+
//   },
//   {
//     id: "axis-magnus",
//     name: "Axis Bank Magnus Credit Card",
//     image: "/cards/axis.png",
//     tag: "Travel",
//     firstYearFee: "₹12500",
//     joiningBenefit: "Premium travel & lounge access",
//     benefits: [
//       "Unlimited domestic lounge access",
//       "12 EDGE reward points per ₹200",
//     ],
//     minIncome: 1800000, // 18 LPA+ (premium)
//   },
// ];

// // Income ke according cards filter karo (gross annual income)
// export function getCardsByIncome(annualIncome) {
//   const income = Number(annualIncome) || 0;
//   return ALL_CARDS.filter((card) => income >= card.minIncome);
// }

// other bank add  with utm link

// src/data/cardsData.js
// ─────────────────────────────────────────────────────────────────────────────
// Har bank ka apply link UTM ke saath. Abhi DEMO links hain (example.com).
// Production me bas `applyUrl` ke andar asli bank/affiliate link daal dena —
// UTM params apne aap attach ho jaayenge buildUtmLink() se.
// ─────────────────────────────────────────────────────────────────────────────

// Common UTM config — apne campaign ke hisaab se badal lena
const UTM_DEFAULTS = {
  utm_source: "directcredit",
  utm_medium: "web",
  utm_campaign: "cc_apply",
};

// baseUrl me UTM params jod ke final apply link banata hai
export function buildUtmLink(baseUrl, card, extra = {}) {
  try {
    const url = new URL(baseUrl);
    const params = {
      ...UTM_DEFAULTS,
      utm_content: card.id,        // kis card se aaya (tracking)
      utm_term: card.bankCode,     // kaunsa bank
      ...extra,                    // user-specific (e.g. click id) yahan aa sakta
    };
    Object.entries(params).forEach(([k, v]) => {
      if (v) url.searchParams.set(k, v);
    });
    return url.toString();
  } catch {
    return baseUrl; // agar URL galat ho to plain link return
  }
}

// ─── Saare cards (image wale banks) ──────────────────────────────────────────
export const CARDS = [
  {
    id: "scapia-ltf",
    bankCode: "scapia",
    name: "Scapia Credit Card (LTF)",
    tag: "Lifetime Free",
    image: "",
    firstYearFee: "₹0 (Lifetime Free)",
    joiningBenefit: "Zero forex markup + unlimited lounge access",
    benefits: [
      "20% cashback on travel via Scapia",
      "No forex markup on international spends",
      "Unlimited domestic lounge access",
    ],
    minIncome: 0,
    // DEMO apply link — yahan asli bank link daalna hai
    applyUrl: "https://example.com/apply/scapia",
  },
  {
    id: "sbi-all",
    bankCode: "sbi",
    name: "SBI Credit Card (All Variants)",
    tag: "Most Popular",
    image: "",
    firstYearFee: "Varies by variant",
    joiningBenefit: "Welcome gift vouchers up to ₹2,000",
    benefits: [
      "Reward points on every spend",
      "Fuel surcharge waiver",
      "Wide acceptance across India",
    ],
    minIncome: 0,
    applyUrl: "https://example.com/apply/sbi",
  },
  {
    id: "axis-cc",
    bankCode: "axis",
    name: "Axis Bank Credit Card",
    tag: "Premium Rewards",
    image: "",
    firstYearFee: "Varies by variant",
    joiningBenefit: "Bonus reward points on activation",
    benefits: [
      "Accelerated rewards on online spends",
      "Airport lounge access",
      "Dining & shopping offers",
    ],
    minIncome: 0,
    applyUrl: "https://example.com/apply/axis",
  },
  {
    id: "jupiter-ltf",
    bankCode: "jupiter",
    name: "Jupiter Credit Card (LTF)",
    tag: "Lifetime Free",
    image: "",
    firstYearFee: "₹0 (Lifetime Free)",
    joiningBenefit: "Instant rewards on UPI & card spends",
    benefits: [
      "Rewards on UPI payments",
      "No joining or annual fee",
      "Easy app-based management",
    ],
    minIncome: 0,
    applyUrl: "https://example.com/apply/jupiter",
  },
  {
    id: "yespop-ltf",
    bankCode: "yespop",
    name: "Yes POP Club Credit Card (LTF)",
    tag: "Lifetime Free",
    image: "",
    firstYearFee: "₹0 (Lifetime Free)",
    joiningBenefit: "POP coins on every transaction",
    benefits: [
      "Earn POP coins on all spends",
      "No annual fee",
      "Special partner offers",
    ],
    minIncome: 0,
    applyUrl: "https://example.com/apply/yespop",
  },
  {
    id: "bajaj-insta-emi",
    bankCode: "bajaj",
    name: "Bajaj Insta EMI Card",
    tag: "No Cost EMI",
    image: "",
    firstYearFee: "Low one-time fee",
    joiningBenefit: "Pre-approved EMI limit",
    benefits: [
      "Convert purchases into easy EMIs",
      "No-cost EMI at partner stores",
      "Accepted at 1.5L+ outlets",
    ],
    minIncome: 0,
    applyUrl: "https://example.com/apply/bajaj",
  },
  {
    id: "kreditpe-ltf",
    bankCode: "kreditpe",
    name: "Kredit.Pe Credit Card (LTF)",
    tag: "Lifetime Free",
    image: "",
    firstYearFee: "₹0 (Lifetime Free)",
    joiningBenefit: "Instant digital card on approval",
    benefits: [
      "Fully digital application",
      "No joining fee",
      "Quick approval process",
    ],
    minIncome: 0,
    applyUrl: "https://example.com/apply/kreditpe",
  },
  {
    id: "indusind-tiger-ltf",
    bankCode: "indusind",
    name: "IndusInd Tiger Credit Card (LTF)",
    tag: "Lifetime Free",
    image: "",
    firstYearFee: "₹0 (Lifetime Free)",
    joiningBenefit: "Reward points + lounge access",
    benefits: [
      "Lifetime free card",
      "Airport lounge access",
      "Reward points on spends",
    ],
    minIncome: 0,
    applyUrl: "https://example.com/apply/indusind",
  },
];

// Offers page ke liye saare cards return (filter chahiye to yahan laga lena)
export function getAllCards() {
  return CARDS;
}

// (purana income-based filter abhi rakha hai — chaaho to use kar sakte ho)
export function getCardsByIncome(income) {
  const val = Number(income) || 0;
  return CARDS.filter((c) => val >= (c.minIncome || 0));
}