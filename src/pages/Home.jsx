import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";
import AppPromo from "../components/AppPromo";
import CreditCards from "../components/CreditCards";
import WhyChooseUs from "../components/WhychooseUs";
import Testimonials from "../components/Testimonials";
import Calculators from "../components/Calculators";
import Partners from "../components/Partners";
import Footer from "../components/Footer";
// import AppDownloadSection from "../components/AppDownloadSection";
export default function Home() {
  return (
    <>
      <Navbar />
  
      <Hero />
     <ProductGrid />
      <AppPromo />
      <CreditCards />
      <WhyChooseUs />
      <Testimonials />
      <Calculators />
      <Partners />
      <Footer />
    

    </>
  );
}