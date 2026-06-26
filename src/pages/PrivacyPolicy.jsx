import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ShieldCheck, Mail, Phone, MapPin } from "lucide-react";

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

const SubHeading = ({ children }) => (
  <h3 className="text-base font-semibold text-gray-800 mt-6 mb-2">{children}</h3>
);

const Term = ({ name, children }) => (
  <p>
    <span className="font-semibold text-gray-800">{name}</span> {children}
  </p>
);

const sections = [
  { id: "definitions", title: "Interpretation and Definitions" },
  { id: "collecting", title: "Collecting and Using Your Personal Data" },
  { id: "partners", title: "Lending Partners" },
  { id: "use", title: "Use of Your Personal Data" },
  { id: "retention", title: "Retention of Your Personal Data" },
  { id: "transfer", title: "Transfer of Your Personal Data" },
  { id: "delete", title: "Delete Your Personal Data" },
  { id: "disclosure", title: "Disclosure of Your Personal Data" },
  { id: "security", title: "Security of Your Personal Data" },
  { id: "children", title: "Children's Privacy" },
  { id: "links", title: "Links to Other Websites" },
  { id: "changes", title: "Changes to this Privacy Policy" },
  { id: "contact", title: "Contact Us" },
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#050824] to-[#11142F] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-white/10 flex items-center justify-center">
            <ShieldCheck size={32} className="text-blue-300" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Privacy Policy</h1>
          <p className="text-gray-300 text-sm">Last updated: January 04, 2024</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-5 py-12 grid lg:grid-cols-[260px_1fr] gap-8">
        {/* Quick Navigation (sticky on desktop) */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">
              On this page
            </p>
            <nav className="space-y-1.5">
              {sections.map((s, i) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="block text-sm text-gray-600 hover:text-[#050824] hover:font-medium transition-colors py-1"
                >
                  {i + 1}. {s.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <article className="bg-white px-6 md:px-10 py-10 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-600 leading-relaxed mb-4 text-[15px]">
            This Privacy Policy describes our policies and procedures on the
            collection, use and disclosure of your information when you use the
            Service, and tells you about your privacy rights and how the law
            protects you.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4 text-[15px]">
            We use your personal data to provide and improve the Service. By using
            the Service, you agree to the collection and use of information in
            accordance with this Privacy Policy.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 px-5 py-4 rounded-r-lg mb-10">
            <p className="text-gray-700 font-medium text-[15px]">
              Note: We do <span className="font-bold">NOT</span> access your
              phone&apos;s contacts, SMS, call logs, or telephony data.
            </p>
          </div>

          <Section id="definitions" number="1" title="Interpretation and Definitions">
            <SubHeading>Interpretation</SubHeading>
            <p>
              The words of which the initial letter is capitalized have meanings
              defined under the following conditions. The following definitions
              shall have the same meaning regardless of whether they appear in
              singular or in plural.
            </p>

            <SubHeading>Definitions</SubHeading>
            <p>For the purposes of this Privacy Policy:</p>

            <Term name="Account">
              means a unique account created for you to access our Service or parts
              of our Service.
            </Term>
            <Term name="Affiliate">
              means an entity that controls, is controlled by or is under common
              control with a party, where &quot;control&quot; means ownership of 50%
              or more of the shares, equity interest or other securities entitled to
              vote for election of directors or other managing authority.
            </Term>
            <Term name="Company">
              (referred to as either &quot;the Company&quot;, &quot;We&quot;,
              &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to YSS
              Direct Credit Private Limited, 1004, 10th Floor, Gulshan One29, Sector
              129, Noida.
            </Term>
            <Term name="Cookies">
              are small files that are placed on your computer, mobile device or any
              other device by a website, containing the details of your browsing
              history on that website among its many uses.
            </Term>
            <Term name="Country">refers to: Uttar Pradesh, India.</Term>
            <Term name="Device">
              means any device that can access the Service such as a computer, a
              cellphone or a digital tablet.
            </Term>
            <Term name="Personal Data">
              is any information that relates to an identified or identifiable
              individual.
            </Term>
            <Term name="Service">refers to the Website.</Term>
            <Term name="Service Provider">
              means any natural or legal person who processes the data on behalf of
              the Company. It refers to third-party companies or individuals employed
              by the Company to facilitate the Service, to provide the Service on
              behalf of the Company, or to assist the Company in analyzing how the
              Service is used.
            </Term>
            <Term name="Usage Data">
              refers to data collected automatically, either generated by the use of
              the Service or from the Service infrastructure itself.
            </Term>
            <Term name="You">
              means the individual accessing or using the Service, or the company, or
              other legal entity on behalf of which such individual is accessing or
              using the Service, as applicable.
            </Term>
          </Section>

          <Section id="collecting" number="2" title="Collecting and Using Your Personal Data">
            <SubHeading>Types of Data Collected — Personal Data</SubHeading>
            <p>
              While using our Service, we may ask you to provide us with certain
              personally identifiable information that can be used to contact or
              identify you, including but not limited to: email address, first and
              last name, phone number, and usage data.
            </p>

            <SubHeading>Usage Data</SubHeading>
            <p>
              Usage Data is collected automatically when using the Service. It may
              include your device&apos;s IP address, browser type and version, the
              pages of our Service that you visit, the time and date of your visit,
              the time spent on those pages, unique device identifiers and other
              diagnostic data.
            </p>
            <p>
              When you access the Service through a mobile device, we may collect
              certain information automatically, such as the type of mobile device,
              its unique ID, IP address, mobile operating system, and the type of
              mobile internet browser you use.
            </p>

            <SubHeading>Tracking Technologies and Cookies</SubHeading>
            <p>
              We use Cookies and similar tracking technologies (beacons, tags and
              scripts) to track activity on our Service and store certain
              information. Cookies can be &quot;Persistent&quot; or
              &quot;Session&quot; Cookies. We use both for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <span className="font-semibold text-gray-800">Necessary / Essential Cookies (Session):</span>{" "}
                essential to provide you with services available through the Website
                and to enable its features, including authentication and fraud
                prevention.
              </li>
              <li>
                <span className="font-semibold text-gray-800">Acceptance Cookies (Persistent):</span>{" "}
                identify whether users have accepted the use of cookies on the
                Website.
              </li>
              <li>
                <span className="font-semibold text-gray-800">Functionality Cookies (Persistent):</span>{" "}
                allow us to remember choices you make, such as login details or
                language preference, for a more personal experience.
              </li>
            </ul>
          </Section>

          <Section id="partners" number="3" title="Lending Partners">
            <p>
              We work with multiple RBI-registered lending institutions. The latest
              list of our partners is made available to you within our Service.
            </p>
          </Section>

          <Section id="use" number="4" title="Use of Your Personal Data">
            <p>The Company may use Personal Data for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide and maintain our Service, including monitoring usage.</li>
              <li>To manage your account and registration as a user of the Service.</li>
              <li>For the performance of a contract you have entered into with us.</li>
              <li>
                To contact you via email, phone, SMS or push notifications regarding
                updates or informative communications.
              </li>
              <li>
                To provide you with news, special offers and general information
                about similar goods, services and events (unless you opt out).
              </li>
              <li>To manage and attend to your requests.</li>
              <li>
                For business transfers such as a merger, restructuring or sale of
                assets.
              </li>
              <li>
                For other purposes like data analysis, identifying usage trends, and
                improving our Service and your experience.
              </li>
            </ul>
            <p className="mt-2">
              We may share your personal information with Service Providers,
              affiliates, business partners, for business transfers, with other
              users in public areas, or with your consent.
            </p>
          </Section>

          <Section id="retention" number="5" title="Retention of Your Personal Data">
            <p>
              The Company will retain your Personal Data only for as long as is
              necessary for the purposes set out in this Privacy Policy, and to
              comply with our legal obligations, resolve disputes and enforce our
              agreements. Usage Data is generally retained for a shorter period,
              except when used to strengthen security or improve functionality.
            </p>
          </Section>

          <Section id="transfer" number="6" title="Transfer of Your Personal Data">
            <p>
              Your information may be processed at the Company&apos;s operating
              offices and other locations where the parties involved are located.
              This means your information may be transferred to computers outside
              your jurisdiction. Your consent to this Privacy Policy followed by your
              submission of such information represents your agreement to that
              transfer. We take all reasonable steps to ensure your data is treated
              securely.
            </p>
          </Section>

          <Section id="delete" number="7" title="Delete Your Personal Data">
            <p>
              You have the right to delete or request that we assist in deleting the
              Personal Data we have collected about you. You may update, amend or
              delete your information at any time by signing in to your account, or
              by contacting us. Please note we may need to retain certain information
              where we have a legal obligation or lawful basis to do so.
            </p>
          </Section>

          <Section id="disclosure" number="8" title="Disclosure of Your Personal Data">
            <SubHeading>Business Transactions</SubHeading>
            <p>
              If the Company is involved in a merger, acquisition or asset sale, your
              Personal Data may be transferred. We will provide notice before it
              becomes subject to a different Privacy Policy.
            </p>
            <SubHeading>Law Enforcement &amp; Other Legal Requirements</SubHeading>
            <p>
              The Company may disclose your Personal Data if required by law or in
              response to valid requests by public authorities, and in good faith
              where necessary to comply with legal obligations, protect the rights or
              property of the Company, prevent wrongdoing, protect user safety, or
              protect against legal liability.
            </p>
          </Section>

          <Section id="security" number="9" title="Security of Your Personal Data">
            <p>
              The security of your Personal Data is important to us, but no method of
              transmission over the Internet or electronic storage is 100% secure.
              While we strive to use commercially acceptable means to protect your
              data, we cannot guarantee its absolute security.
            </p>
          </Section>

          <Section id="children" number="10" title="Children's Privacy">
            <p>
              Our Service does not address anyone under the age of 13. We do not
              knowingly collect personally identifiable information from anyone under
              13. If you are a parent or guardian and aware that your child has
              provided us with Personal Data, please contact us, and we will take
              steps to remove that information.
            </p>
          </Section>

          <Section id="links" number="11" title="Links to Other Websites">
            <p>
              Our Service may contain links to other websites not operated by us. We
              strongly advise you to review the Privacy Policy of every site you
              visit. We have no control over and assume no responsibility for the
              content or practices of any third-party sites.
            </p>
          </Section>

          <Section id="changes" number="12" title="Changes to this Privacy Policy">
            <p>
              We may update our Privacy Policy from time to time. We will notify you
              of any changes by posting the new Privacy Policy on this page and
              updating the &quot;Last updated&quot; date. You are advised to review
              this Privacy Policy periodically for any changes.
            </p>
          </Section>

          <Section id="contact" number="13" title="Contact Us">
            <p>
              If you have any questions about this Privacy Policy, you can contact us:
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

            <SubHeading>Grievance Officer</SubHeading>
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 space-y-3">
              <p className="font-semibold text-gray-800">Rajnikant Shukla</p>
              <p className="flex items-start gap-3 text-gray-600">
                <MapPin size={18} className="text-[#050824] flex-shrink-0 mt-0.5" />
                Vision Business Park, 2nd Floor, Tower A, I.T Square, Knowledge Park
                – 3, Greater Noida, Gautam Buddha Nagar, Uttar Pradesh – 201306
              </p>
              <p className="flex items-center gap-3 text-gray-600">
                <Mail size={18} className="text-[#050824] flex-shrink-0" />
                <a
                  href="mailto:grievance@directcredit.in"
                  className="text-blue-600 hover:underline"
                >
                  grievance@directcredit.in
                </a>
              </p>
              <p className="flex items-center gap-3 text-gray-600">
                <Phone size={18} className="text-[#050824] flex-shrink-0" />
                <a href="tel:8700860176" className="hover:underline">
                  8700860176
                </a>
              </p>
            </div>
          </Section>
        </article>
      </div>

      <Footer />
    </div>
  );
}