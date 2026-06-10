import { Percent, Clock3 } from "lucide-react";
import BannerSlider from "./BannerSlider";

export default function Hero() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12">

        <div>
          <h1 className="text-6xl font-bold leading-tight">
            Loans, Cards &
            Investments
          </h1>

          <div className="flex gap-10 mt-10">

            <div className="flex gap-3">
              <Percent className="text-orange-500" />
              <p>Financial Solutions</p>
            </div>

            <div className="flex gap-3">
              <Clock3 className="text-blue-500" />
              <p>Quick & Easy</p>
            </div>

          </div>
        </div>

        <div>
          <BannerSlider />
        </div>

      </div>
    </section>
  );
}