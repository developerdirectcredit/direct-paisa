import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FileText, Mail } from "lucide-react";

/* ---------- Reusable building blocks ---------- */
const Section = ({ id, number, title, children }) => (
  <section id={id} className="scroll-mt-24 mb-12">
    <h2 className="flex items-start gap-3 text-xl md:text-2xl font-bold text-gray-800 mb-4 pb-3 border-b border-gray-200">
      <span className="flex-shrink-0 mt-0.5 w-8 h-8 rounded-lg bg-[#050824] text-white text-sm flex items-center justify-center font-semibold">
        {number}
      </span>
      {title}
    </h2>
    <div className="space-y-4 text-gray-600 leading-relaxed text-[15px]">
      {children}
    </div>
  </section>
);

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#050824] to-[#11142F] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-white/10 flex items-center justify-center">
            <FileText size={32} className="text-blue-300" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Terms &amp; Conditions
          </h1>
          <p className="text-gray-300 text-sm">Last updated: June 2026</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-5 py-12">
        <article className="bg-white px-6 md:px-10 py-10 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-600 leading-relaxed mb-4 text-[15px]">
            Welcome to Direct Credit. These Terms &amp; Conditions
            (&quot;Terms&quot;) govern your access to and use of the website
            operated by YSS Direct Credit Private Limited (&quot;Direct Credit&quot;,
            &quot;Company&quot;, &quot;we&quot;, &quot;us&quot; or &quot;our&quot;)
            and the services offered through it (collectively, the
            &quot;Service&quot;).
          </p>
          <p className="text-gray-600 leading-relaxed mb-10 text-[15px]">
            By accessing or using our Service, you agree to be bound by these
            Terms. If you do not agree with any part of these Terms, please do not
            use our Service.
          </p>

          <Section id="eligibility" number="1" title="Eligibility">
            <p>
              You must be at least 21 years of age and competent to enter into a
              legally binding contract under applicable Indian laws to use our
              Service. By using the Service, you represent and warrant that you
              meet these eligibility requirements and that all information you
              provide is true, accurate and complete.
            </p>
          </Section>

          <Section id="services" number="2" title="Our Services">
            <p>
              Direct Credit acts as a facilitator that helps connect users with
              banks, NBFCs and other RBI-registered lending institutions for loan
              and financial products. We do not lend money directly. Any loan
              approval, interest rate, sanction amount and disbursal is solely at
              the discretion of the respective lending partner, subject to their
              terms, eligibility criteria and verification process.
            </p>
            <p>
              The information provided on our Service is for general informational
              purposes only and should not be treated as financial, legal or
              investment advice.
            </p>
          </Section>

          <Section id="accounts" number="3" title="User Accounts">
            <p>
              To access certain features, you may need to create an account. You
              are responsible for maintaining the confidentiality of your account
              credentials and for all activities that occur under your account. You
              agree to notify us immediately of any unauthorized use of your
              account. We are not liable for any loss arising from your failure to
              safeguard your login details.
            </p>
          </Section>

          <Section id="obligations" number="4" title="User Obligations">
            <p>While using our Service, you agree that you will not:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide false, misleading or fraudulent information.</li>
              <li>
                Use the Service for any unlawful, fraudulent or unauthorized
                purpose.
              </li>
              <li>
                Attempt to gain unauthorized access to our systems, networks or
                data.
              </li>
              <li>
                Upload or transmit any virus, malware or other harmful code.
              </li>
              <li>
                Copy, reproduce, distribute or exploit any part of the Service
                without our prior written permission.
              </li>
              <li>
                Interfere with or disrupt the integrity or performance of the
                Service.
              </li>
            </ul>
          </Section>

          <Section id="fees" number="5" title="Fees and Charges">
            <p>
              Direct Credit does not charge customers for connecting them with
              lending partners unless explicitly stated. Any processing fees,
              interest, penalties or other charges are determined and levied by the
              respective lending institution as per their policies. You are advised
              to read the loan agreement and all related documents carefully before
              accepting any offer.
            </p>
            <div className="bg-amber-50 border-l-4 border-amber-500 px-5 py-4 rounded-r-lg mt-4">
              <p className="text-gray-700 text-[15px]">
                <span className="font-semibold">Important:</span> Do not pay any
                amount to Direct Credit employees or representatives. Payments must
                be made only into the official company bank account or directly to
                the lending Bank/NBFC. The Company is not responsible for any loss
                arising from payments made otherwise.
              </p>
            </div>
          </Section>

          <Section id="ip" number="6" title="Intellectual Property">
            <p>
              All content on the Service, including text, graphics, logos, icons,
              images, page layouts and software, is the property of Direct Credit or
              its licensors and is protected by applicable intellectual property
              laws. You may not use, copy, modify or distribute any such content
              without our prior written consent.
            </p>
          </Section>

          <Section id="thirdparty" number="7" title="Third-Party Links and Partners">
            <p>
              Our Service may contain links to third-party websites or services
              that are not owned or controlled by Direct Credit. We have no control
              over, and assume no responsibility for, the content, privacy policies
              or practices of any third-party websites or services. Your dealings
              with lending partners and third parties are solely between you and
              them.
            </p>
          </Section>

          <Section id="disclaimer" number="8" title="Disclaimer of Warranties">
            <p>
              The Service is provided on an &quot;as is&quot; and &quot;as
              available&quot; basis without warranties of any kind, whether express
              or implied. While we strive to keep information accurate and up to
              date, we do not warrant that the Service will be uninterrupted,
              error-free or completely secure, or that the information provided is
              accurate, complete or current at all times.
            </p>
          </Section>

          <Section id="liability" number="9" title="Limitation of Liability">
            <p>
              To the maximum extent permitted by law, Direct Credit shall not be
              liable for any indirect, incidental, special, consequential or
              punitive damages, or any loss of profits or revenues, arising out of
              or in connection with your use of the Service or any loan obtained
              through a lending partner.
            </p>
          </Section>

          <Section id="indemnity" number="10" title="Indemnification">
            <p>
              You agree to indemnify and hold harmless Direct Credit, its officers,
              directors, employees and partners from and against any claims,
              liabilities, damages, losses and expenses arising out of your use of
              the Service, your violation of these Terms, or your violation of any
              rights of a third party.
            </p>
          </Section>

          <Section id="termination" number="11" title="Termination">
            <p>
              We may suspend or terminate your access to the Service at any time,
              without prior notice or liability, for any reason, including if you
              breach these Terms. Upon termination, your right to use the Service
              will immediately cease.
            </p>
          </Section>

          <Section id="governing" number="12" title="Governing Law and Jurisdiction">
            <p>
              These Terms shall be governed by and construed in accordance with the
              laws of India. Any disputes arising out of or relating to these Terms
              or the Service shall be subject to the exclusive jurisdiction of the
              courts located in Gautam Buddha Nagar, Uttar Pradesh.
            </p>
          </Section>

          <Section id="changes" number="13" title="Changes to These Terms">
            <p>
              We reserve the right to modify or replace these Terms at any time. We
              will notify you of any changes by posting the updated Terms on this
              page and revising the &quot;Last updated&quot; date. Your continued
              use of the Service after any changes constitutes your acceptance of
              the revised Terms.
            </p>
          </Section>

          <Section id="contact" number="14" title="Contact Us">
            <p>
              If you have any questions about these Terms &amp; Conditions, you can
              contact us:
            </p>
            <div className="flex items-center gap-3 mt-2">
              <Mail size={18} className="text-[#050824] flex-shrink-0" />
              <a
                href="mailto:contact@directcredit.in"
                className="text-blue-600 hover:underline"
              >
                contact@directcredit.in
              </a>
            </div>
          </Section>
        </article>
      </div>

      <Footer />
    </div>
  );
}