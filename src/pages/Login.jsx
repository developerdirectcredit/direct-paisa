import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f7fb] flex items-center justify-center p-4">

      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-6xl">

        <div className="grid md:grid-cols-2">

          {/* Left Side */}
          <div className="bg-gradient-to-br from-blue-700 to-blue-500 flex items-center justify-center p-10">

            <div className="text-center">

              <img
                src="/logo.png"
                alt="Direct Credit"
                className="w-44 mx-auto mb-6"
              />

              <img
                src="/images/direct-credit-app.png"
                alt="Direct Credit App"
                className="w-72 md:w-80 mx-auto"
              />

              <h2 className="text-white text-3xl font-bold mt-6">
                Direct Credit App
              </h2>

              <p className="text-blue-100 mt-3">
                Apply for loans, compare offers, check eligibility and manage
                your financial journey seamlessly.
              </p>

            </div>

          </div>

          {/* Right Side */}
          <div className="p-8 md:p-12 flex flex-col justify-center">

            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-gray-600 mb-8"
            >
              <ArrowLeft size={20} />
              Back to Home
            </button>

            <div className="text-center mb-8">

              <img
                src="/logo.png"
                alt="Direct Credit"
                className="w-40 mx-auto mb-4"
              />

              <h1 className="text-3xl md:text-4xl font-bold">
                Login to your account
              </h1>

            </div>

            <button className="w-full border border-gray-300 rounded-xl py-4 font-semibold hover:bg-gray-50 transition">
              Continue with Google
            </button>

            <div className="flex items-center my-6">
              <div className="flex-1 border-t"></div>
              <span className="px-4 text-gray-500 text-sm">
                or continue with mobile number
              </span>
              <div className="flex-1 border-t"></div>
            </div>

            <input
              type="tel"
              placeholder="+91 Mobile Number"
              className="w-full border rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition">
              Get OTP
            </button>

            <p className="text-xs text-gray-500 text-center mt-6">
              By logging in, you agree to our Terms of Use and Privacy Policy.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}