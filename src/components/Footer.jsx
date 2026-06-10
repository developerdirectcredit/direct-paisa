import { ChevronUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-[#050824] text-white mt-20">
      {/* Top Strip */}
      <div className="bg-[#02051A] border-b border-gray-800">
        <div className="max-w-7xl mx-auto py-5 px-6 text-center">
          <h3 className="font-semibold tracking-wide text-sm">
            MOST SEARCHED LINKS +
          </h3>
        </div>
      </div>

      {/* Partner Strip */}
      <div className="bg-[#11142F] border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-5 items-center">
            <div className="text-gray-300 font-semibold">
              OUR PARTNERS
            </div>

            <div className="bg-[#1B1E3A] p-4 rounded text-center">
              NBFC Partner
            </div>

            <div className="bg-[#1B1E3A] p-4 rounded text-center">
              Banking Partner
            </div>

            <div className="bg-[#1B1E3A] p-4 rounded text-center">
              MSME Funding
            </div>

            <div className="bg-[#1B1E3A] p-4 rounded text-center">
              Direct Credit
            </div>

            <div className="bg-[#1B1E3A] p-4 rounded text-center">
              Financial Partner
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Logo */}
          <div>
            <img
              src="/images/direct-credit-logo.jpg"
              alt="Direct Credit"
              className="w-52 mb-5"
            />

            <p className="text-gray-400 leading-7 text-sm">
              Direct Credit is India's trusted MSME funding and business
              loan consultancy helping enterprises secure funding from
              ₹50 Lakh to ₹200 Crore.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold mb-5">
              DIRECT CREDIT
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>About Us</li>
              <li>Careers</li>
              <li>Awards</li>
              <li>Contact Us</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-bold mb-5">
              PRODUCTS
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>Business Loan</li>
              <li>MSME Loan</li>
              <li>Working Capital Loan</li>
              <li>Project Finance</li>
              <li>Warehouse Loan</li>
              <li>Home Loan</li>
              <li>Personal Loan</li>
            </ul>
          </div>

          {/* Download App */}
          <div>
            <h3 className="font-bold mb-5">
              DOWNLOAD APP
            </h3>

            <div className="space-y-4">
              <button className="w-full bg-black border border-gray-700 rounded-lg p-3 text-left">
                📱 Get it on Google Play
              </button>

              <button className="w-full bg-black border border-gray-700 rounded-lg p-3 text-left">
                🍎 Download on App Store
              </button>
            </div>

            <div className="mt-6 text-gray-400">
              Follow us on LinkedIn
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2026 Direct Credit. All Rights Reserved.
          </p>

          <p className="text-gray-500 text-sm">
            THE MSME EXPERTS
          </p>
        </div>
      </div>

      {/* Scroll Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-pink-600 hover:bg-pink-700 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
      >
        <ChevronUp size={24} />
      </button>
    </footer>
  );
}