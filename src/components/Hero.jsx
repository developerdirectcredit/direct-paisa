


import { Percent, Clock3 } from "lucide-react";
import BannerSlider from "./BannerSlider";

export default function Hero() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-10 items-center">

        {/* Left Side Content */}
        <div>
              
              <h2 className="text-[42px] md:text-[52px] font-serif text-[#4a4a4a] leading-tight"> 
            India's best platform for
          </h2> 

          <h1 className="text-[42px] md:text-[56px] font-bold text-gray-900 leading-tight mt-3">
            Loans, Cards & Investments
          </h1>

          <div className="flex flex-wrap gap-12 mt-12">
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border-4 border-orange-400 flex items-center justify-center">
                <Percent size={24} className="text-sky-500" />
              </div>

              <div>
                <p className="text-xl font-medium text-gray-800">
                  One Stop for all
                </p>
                <p className="text-xl font-medium text-gray-800">
                  Financial Solutions
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border-4 border-orange-400 flex items-center justify-center">
                <Clock3 size={24} className="text-sky-500" />
              </div>

              <div>
                <p className="text-xl font-medium text-gray-800">
                  Quick, easy &
                </p>
                <p className="text-xl font-medium text-gray-800">
                  hassle free
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Right Side Slider */}
        <div className="flex justify-center">
          <BannerSlider />
        </div>

      </div>
    </section>
  );
}