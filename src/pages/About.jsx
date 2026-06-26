import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {

     const expertise = [
    {
      title: "Business Financing",
      desc: "Working capital, project finance and expansion funding."
    },
    {
      title: "Financial Advisory",
      desc: "Expert guidance for optimal financing decisions."
    },
    {
      title: "MSME & Enterprise Solutions",
      desc: "Customized funding strategies for long-term growth."
    }
  ];

  
         const reasons = [
        "Personalized Financial Solutions",
        "Transparent & Ethical Process",
        "Extensive Lending Network",
        "Dedicated Expert Support",
        "Long-Term Partnership Approach",
        ];

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-950 via-blue-900 to-slate-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <div>
              <span className="bg-blue-500/20 px-4 py-2 rounded-full">
                ISO 9001:2015 Certified
              </span>

              <h1 className="text-5xl font-bold mt-6 leading-tight">
                Your Trusted Financial Partner
              </h1>

              <p className="mt-6 text-lg text-gray-300">
                Empowering MSMEs, Startups and Enterprises with
                customized funding solutions through India's leading
                Banks and NBFCs.
              </p>

              <div className="flex gap-4 mt-8">
                <button className="bg-blue-600 px-8 py-4 rounded-xl">
                  Apply Now
                </button>

                <button className="border px-8 py-4 rounded-xl">
                  Talk To Expert
                </button>
              </div>
            </div>

            <div>
              <img
                src="/images/business-finance.jpg"
                alt=""
                className="rounded-3xl shadow-2xl"
              />
            </div>

          </div>
        </div>
      </section>


      {/*  Certifications */}

<section className="pb-24">
  <div className="max-w-6xl mx-auto px-6">

    <div className="bg-blue-50 border border-blue-100 rounded-3xl p-10">

      <div className="grid md:grid-cols-2 gap-10 items-center">

        <div>
          <h3 className="text-3xl font-bold mb-6">
            ISO 9001:2015 Certified Excellence
          </h3>

          <p className="text-gray-600 leading-8">
           Welcome to Direct Credit, your trusted partner in achieving financial success.
            We are dedicated to helping individuals and businesses access the financial 
            solutions they need with confidence and ease. We understand that navigating
            the lending landscape can be complex, which is why our experienced team is 
            committed to simplifying the process and providing personalized guidance every
            step of the way.
          </p>

          <p>
            At Direct Credit, we take pride in being a reliable financial partner, driven
            by a commitment to excellence, transparency, and customer satisfaction.
            As an ISO 9001:2015 certified organization, we adhere to internationally
            recognized quality management standards, ensuring efficient processes, 
            consistent service delivery, and a customer-centric approach in everything we do.
          </p>

          <p>
            Our certification reflects our unwavering dedication to maintaining the highest 
            levels of professionalism, operational excellence, and continuous improvement. 
            By combining industry expertise with innovative financial solutions, we strive
            to empower our clients to make informed decisions and achieve their financial goals with confidence.
          </p>

          <p>
            Whether you are seeking funding for personal aspirations, business growth, or strategic investments,
             Direct Credit is here to provide trusted guidance and tailored financial solutions that support your
             journey every step of the way
          </p>
        </div>

        <div className="flex justify-center">
          <img
            src="/images/iso-certification.jpg"
            alt="ISO Certification"
            className="w-full h-full rounded-2xl shadow-2xl object-cover"
          />
        </div>

      </div>

    </div>

  </div>
</section>

     <section className="py-24">
  <div className="max-w-6xl mx-auto px-6">

    <h2 className="text-4xl font-bold mb-8">
      About Direct Credit
    </h2>

    <div className="space-y-6 text-gray-600 leading-8 text-lg">

      <p>
        At Direct Credit, we believe that access to the right financial
        resources can transform businesses, empower entrepreneurs, and
        accelerate economic growth.
      </p>

      <p>
        As a trusted financial advisory and funding partner, we specialize
        in helping individuals, MSMEs, startups, and enterprises secure
        customized financing solutions through a seamless and transparent
        process.
      </p>

      <p>
        Navigating the financial landscape can be complex, but with
        Direct Credit by your side, obtaining the right funding becomes
        simple, efficient, and stress-free.
      </p>

    </div>
  </div>
</section>



      {/* Vision Mission */}
 <section className="bg-slate-50 py-24">
  <div className="max-w-7xl mx-auto px-6">

    <h2 className="text-4xl font-bold text-center mb-16">
      Vision & Mission
    </h2>

    {/* Vision */}

    <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">

      <div>
        <img
          src="/images/vision.jpg"
          alt="Our Vision"
          className="w-full rounded-3xl shadow-xl"
        />
      </div>

      <div>
        <h3 className="text-3xl font-bold mb-6 text-blue-900">
          Our Vision
        </h3>

        <p className="text-gray-600 leading-8">
          We envision a future where businesses of all sizes have
          access to the capital and financial expertise required to
          achieve sustainable growth.
        </p>

        <p className="text-gray-600 leading-8 mt-4">
          Our goal is to become India's most trusted financial
          solutions platform, enabling entrepreneurs, MSMEs and
          enterprises to expand confidently and contribute to the
          nation's economic development.
        </p>
      </div>

    </div>

    {/* Mission */}

    <div className="grid lg:grid-cols-2 gap-12 items-center">

      <div>
        <img
          src="/images/mission.jpg"
          alt="Our Mission"
          className="w-full rounded-3xl shadow-xl"
        />
      </div>

      <div>
        <h3 className="text-3xl font-bold mb-6 text-blue-900">
          Our Mission
        </h3>

        <p className="text-gray-600 leading-8">
          Our mission is to empower businesses and individuals by
          providing strategic financial solutions tailored to their goals.
        </p>

        <p className="text-gray-600 leading-8 mt-4">
          We are committed to simplifying the lending process,
          reducing complexities, and ensuring our clients receive
          the best financing options through our extensive network
          of banking and financial partners.
        </p>
      </div>

    </div>

  </div>
</section>

{/* our expertise */}

<section className="py-24">
  <div className="max-w-7xl mx-auto px-6">

    <h2 className="text-4xl font-bold text-center mb-16">
      Our Expertise
    </h2>

    <div className="grid md:grid-cols-3 gap-8">
      {expertise.map((item, index) => (
        <div
          key={index}
          className="border rounded-3xl p-8 hover:shadow-xl transition"
        >
          <h3 className="text-2xl font-bold mb-4">
            {item.title}
          </h3>

          <p className="text-gray-600">
            {item.desc}
          </p>
        </div>
      ))}
    </div>

  </div>
</section>



      {/* Stats */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-4 gap-8">

            <div className="text-center">
              <h3 className="text-5xl font-bold text-blue-700">
                ₹5000Cr+
              </h3>
              <p>Funding Facilitated</p>
            </div>

            <div className="text-center">
              <h3 className="text-5xl font-bold text-blue-700">
                1000+
              </h3>
              <p>Businesses Served</p>
            </div>

            <div className="text-center">
              <h3 className="text-5xl font-bold text-blue-700">
                50+
              </h3>
              <p>Lending Partners</p>
            </div>

            <div className="text-center">
              <h3 className="text-5xl font-bold text-blue-700">
                95%
              </h3>
              <p>Client Satisfaction</p>
            </div>

          </div>

        </div>
      </section>

      {/* Why Choose Us */}

        <section className="bg-blue-950 text-white py-24">

  <div className="max-w-7xl mx-auto px-6">

    <h2 className="text-4xl font-bold text-center mb-16">
      Why Choose Direct Credit
    </h2>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

      {reasons.map((item, index) => (
        <div
          key={index}
          className="bg-white/10 rounded-2xl p-8"
        >
          ✓ {item}
        </div>
      ))}

    </div>

  </div>

</section>

{/* What Make us Different */}

<section className="py-24">

  <div className="max-w-6xl mx-auto px-6">

    <h2 className="text-4xl font-bold mb-10 text-center">
      What Makes Us Different
    </h2>

    <div className="grid md:grid-cols-2 gap-6">

      <div>✓ Access to Multiple Banks & NBFCs</div>
      <div>✓ Faster Loan Processing & Approvals</div>
      <div>✓ Dedicated Relationship Managers</div>
      <div>✓ End-to-End Documentation Support</div>
      <div>✓ Customized Funding Strategies</div>
      <div>✓ Transparent Advisory Services</div>
      <div>✓ Industry-Specific Financial Solutions</div>
      <div>✓ Commitment to Client Success</div>

    </div>

  </div>

</section>

{/* Final CTA */}
<section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-20">

  <div className="max-w-5xl mx-auto text-center px-6">

    <h2 className="text-5xl font-bold">
      Let's Build Your Financial Future Together
    </h2>

    <p className="mt-6 text-xl">
      Partner with Direct Credit and experience a smarter,
      faster and more reliable approach to financing.
    </p>

    <button className="mt-8 bg-white text-blue-700 px-8 py-4 rounded-xl font-bold">
      Apply Now
    </button>

  </div>

</section>

    

      {/* Funding Process */}
      {/* <section className="py-24">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-16">
            Our Funding Process
          </h2>

          <div className="grid md:grid-cols-5 gap-6">

            <div>1. Consultation</div>
            <div>2. Assessment</div>
            <div>3. Lender Match</div>
            <div>4. Approval</div>
            <div>5. Disbursement</div>

          </div>

        </div>

      </section> */}

      {/* Banking Partners */}

      {/* <section className="bg-slate-50 py-24">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-16">
            Trusted Lending Partners
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">

            <img src="/banks/hdfc.png" />
            <img src="/banks/icici.png" />
            <img src="/banks/axis.png" />
            <img src="/banks/bajaj.png" />
            <img src="/banks/indusind.png" />

          </div>

        </div>

      </section> */}

      {/* CTA */}

      {/* <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-20">

        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-5xl font-bold">
            Ready To Grow Your Business?
          </h2>

          <p className="mt-6">
            Get customized funding solutions from India's
            leading lenders.
          </p>

          <button className="bg-white text-blue-700 px-8 py-4 rounded-xl mt-8">
            Apply For Funding
          </button>

        </div>

      </section> */}

      <Footer />
    </>
  );
} 