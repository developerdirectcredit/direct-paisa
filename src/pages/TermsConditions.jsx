// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { FileText, Mail } from "lucide-react";

// /* ---------- Reusable building blocks ---------- */
// const Section = ({ id, number, title, children }) => (
//   <section id={id} className="scroll-mt-24 mb-12">
//     <h2 className="flex items-start gap-3 text-xl md:text-2xl font-bold text-gray-800 mb-4 pb-3 border-b border-gray-200">
//       <span className="flex-shrink-0 mt-0.5 w-8 h-8 rounded-lg bg-[#050824] text-white text-sm flex items-center justify-center font-semibold">
//         {number}
//       </span>
//       {title}
//     </h2>
//     <div className="space-y-4 text-gray-600 leading-relaxed text-[15px]">
//       {children}
//     </div>
//   </section>
// );

// export default function TermsConditions() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />

//       {/* Hero */}
//       <section className="bg-gradient-to-br from-[#050824] to-[#11142F] text-white py-16 px-4">
//         <div className="max-w-4xl mx-auto text-center">
//           <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-white/10 flex items-center justify-center">
//             <FileText size={32} className="text-blue-300" />
//           </div>
//           <h1 className="text-3xl md:text-4xl font-bold mb-3">
//             Terms &amp; Conditions
//           </h1>
//           <p className="text-gray-300 text-sm">Last updated: June 2026</p>
//         </div>
//       </section>

//       <div className="max-w-4xl mx-auto px-5 py-12">
//         <article className="bg-white px-6 md:px-10 py-10 rounded-2xl shadow-sm border border-gray-100">
//           <p className="text-gray-600 leading-relaxed mb-4 text-[15px]">
//             Welcome to Direct Credit. These Terms &amp; Conditions
//             (&quot;Terms&quot;) govern your access to and use of the website
//             operated by YSS Direct Credit Private Limited (&quot;Direct Credit&quot;,
//             &quot;Company&quot;, &quot;we&quot;, &quot;us&quot; or &quot;our&quot;)
//             and the services offered through it (collectively, the
//             &quot;Service&quot;).
//           </p>
//           <p className="text-gray-600 leading-relaxed mb-10 text-[15px]">
//             By accessing or using our Service, you agree to be bound by these
//             Terms. If you do not agree with any part of these Terms, please do not
//             use our Service.
//           </p>

//           <Section id="eligibility" number="1" title="Eligibility">
//             <p>
//               You must be at least 21 years of age and competent to enter into a
//               legally binding contract under applicable Indian laws to use our
//               Service. By using the Service, you represent and warrant that you
//               meet these eligibility requirements and that all information you
//               provide is true, accurate and complete.
//             </p>
//           </Section>

//           <Section id="services" number="2" title="Our Services">
//             <p>
//               Direct Credit acts as a facilitator that helps connect users with
//               banks, NBFCs and other RBI-registered lending institutions for loan
//               and financial products. We do not lend money directly. Any loan
//               approval, interest rate, sanction amount and disbursal is solely at
//               the discretion of the respective lending partner, subject to their
//               terms, eligibility criteria and verification process.
//             </p>
//             <p>
//               The information provided on our Service is for general informational
//               purposes only and should not be treated as financial, legal or
//               investment advice.
//             </p>
//           </Section>

//           <Section id="accounts" number="3" title="User Accounts">
//             <p>
//               To access certain features, you may need to create an account. You
//               are responsible for maintaining the confidentiality of your account
//               credentials and for all activities that occur under your account. You
//               agree to notify us immediately of any unauthorized use of your
//               account. We are not liable for any loss arising from your failure to
//               safeguard your login details.
//             </p>
//           </Section>

//           <Section id="obligations" number="4" title="User Obligations">
//             <p>While using our Service, you agree that you will not:</p>
//             <ul className="list-disc pl-6 space-y-2">
//               <li>Provide false, misleading or fraudulent information.</li>
//               <li>
//                 Use the Service for any unlawful, fraudulent or unauthorized
//                 purpose.
//               </li>
//               <li>
//                 Attempt to gain unauthorized access to our systems, networks or
//                 data.
//               </li>
//               <li>
//                 Upload or transmit any virus, malware or other harmful code.
//               </li>
//               <li>
//                 Copy, reproduce, distribute or exploit any part of the Service
//                 without our prior written permission.
//               </li>
//               <li>
//                 Interfere with or disrupt the integrity or performance of the
//                 Service.
//               </li>
//             </ul>
//           </Section>

//           <Section id="fees" number="5" title="Fees and Charges">
//             <p>
//               Direct Credit does not charge customers for connecting them with
//               lending partners unless explicitly stated. Any processing fees,
//               interest, penalties or other charges are determined and levied by the
//               respective lending institution as per their policies. You are advised
//               to read the loan agreement and all related documents carefully before
//               accepting any offer.
//             </p>
//             <div className="bg-amber-50 border-l-4 border-amber-500 px-5 py-4 rounded-r-lg mt-4">
//               <p className="text-gray-700 text-[15px]">
//                 <span className="font-semibold">Important:</span> Do not pay any
//                 amount to Direct Credit employees or representatives. Payments must
//                 be made only into the official company bank account or directly to
//                 the lending Bank/NBFC. The Company is not responsible for any loss
//                 arising from payments made otherwise.
//               </p>
//             </div>
//           </Section>

//           <Section id="ip" number="6" title="Intellectual Property">
//             <p>
//               All content on the Service, including text, graphics, logos, icons,
//               images, page layouts and software, is the property of Direct Credit or
//               its licensors and is protected by applicable intellectual property
//               laws. You may not use, copy, modify or distribute any such content
//               without our prior written consent.
//             </p>
//           </Section>

//           <Section id="thirdparty" number="7" title="Third-Party Links and Partners">
//             <p>
//               Our Service may contain links to third-party websites or services
//               that are not owned or controlled by Direct Credit. We have no control
//               over, and assume no responsibility for, the content, privacy policies
//               or practices of any third-party websites or services. Your dealings
//               with lending partners and third parties are solely between you and
//               them.
//             </p>
//           </Section>

//           <Section id="disclaimer" number="8" title="Disclaimer of Warranties">
//             <p>
//               The Service is provided on an &quot;as is&quot; and &quot;as
//               available&quot; basis without warranties of any kind, whether express
//               or implied. While we strive to keep information accurate and up to
//               date, we do not warrant that the Service will be uninterrupted,
//               error-free or completely secure, or that the information provided is
//               accurate, complete or current at all times.
//             </p>
//           </Section>

//           <Section id="liability" number="9" title="Limitation of Liability">
//             <p>
//               To the maximum extent permitted by law, Direct Credit shall not be
//               liable for any indirect, incidental, special, consequential or
//               punitive damages, or any loss of profits or revenues, arising out of
//               or in connection with your use of the Service or any loan obtained
//               through a lending partner.
//             </p>
//           </Section>

//           <Section id="indemnity" number="10" title="Indemnification">
//             <p>
//               You agree to indemnify and hold harmless Direct Credit, its officers,
//               directors, employees and partners from and against any claims,
//               liabilities, damages, losses and expenses arising out of your use of
//               the Service, your violation of these Terms, or your violation of any
//               rights of a third party.
//             </p>
//           </Section>

//           <Section id="termination" number="11" title="Termination">
//             <p>
//               We may suspend or terminate your access to the Service at any time,
//               without prior notice or liability, for any reason, including if you
//               breach these Terms. Upon termination, your right to use the Service
//               will immediately cease.
//             </p>
//           </Section>

//           <Section id="governing" number="12" title="Governing Law and Jurisdiction">
//             <p>
//               These Terms shall be governed by and construed in accordance with the
//               laws of India. Any disputes arising out of or relating to these Terms
//               or the Service shall be subject to the exclusive jurisdiction of the
//               courts located in Gautam Buddha Nagar, Uttar Pradesh.
//             </p>
//           </Section>

//           <Section id="changes" number="13" title="Changes to These Terms">
//             <p>
//               We reserve the right to modify or replace these Terms at any time. We
//               will notify you of any changes by posting the updated Terms on this
//               page and revising the &quot;Last updated&quot; date. Your continued
//               use of the Service after any changes constitutes your acceptance of
//               the revised Terms.
//             </p>
//           </Section>

//           <Section id="contact" number="14" title="Contact Us">
//             <p>
//               If you have any questions about these Terms &amp; Conditions, you can
//               contact us:
//             </p>
//             <div className="flex items-center gap-3 mt-2">
//               <Mail size={18} className="text-[#050824] flex-shrink-0" />
//               <a
//                 href="mailto:contact@directcredit.in"
//                 className="text-blue-600 hover:underline"
//               >
//                 contact@directcredit.in
//               </a>
//             </div>
//           </Section>
//         </article>
//       </div>

//       <Footer />
//     </div>
//   );
// }



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
            Welcome to{" "}
            {/* <a
              href="https://directcredit.in/"
              className="text-blue-600 hover:underline"
            >
              https://directcredit.in/
            </a>{" "} */}
            (the &quot;Website&quot;), maintained and operated by Direct Credit
            (&quot;Direct Credit&quot;, &quot;Company&quot;, &quot;we&quot;,
            &quot;us&quot; or &quot;our&quot;). Direct Credit provides its
            services to you subject to the following Terms of Use
            (&quot;Terms&quot;). Before using the Website, you must read and
            accept these Terms and the linked Privacy Policy, which is
            incorporated into and made part of these Terms.
          </p>
          <p className="text-gray-600 leading-relaxed mb-10 text-[15px]">
            Use of any functionality of the Website constitutes acceptance of
            these Terms. If these Terms conflict with any other document,
            these Terms will control for the purposes of your use of the
            Website. If you do not agree to be bound by these Terms and the
            Privacy Policy, you may not use the Website in any way. We
            reserve the right, at our sole discretion, to change or otherwise
            modify these Terms at any time without prior notice, and your
            continued access or use of the Website signifies your acceptance
            of the updated Terms. We recommend you return to this page
            periodically to review the most current version.
          </p>

          <Section id="services" number="1" title="Description of Services">
            <p>
              Through the Website, Direct Credit provides users with access
              to information primarily about financial services, including
              but not limited to loans, credit cards, and related
              communication services (the &quot;Services&quot;). You are
              responsible for obtaining access to the Website, which may
              involve third-party charges such as internet service provider
              or airtime fees, and for the equipment necessary to access it.
            </p>
            <p>
              By using the Website and providing your personal or contact
              details, you confirm that you are interested in availing the
              Services you have selected. You agree that Direct Credit may
              contact you electronically or by phone to understand your
              interest in the selected products and Services, to follow up,
              and to send renewal reminders. You further agree that Direct
              Credit may share your details with its partners, who may
              contact you by email, telephone or SMS for information and
              sales purposes, and you consent to receive promotional
              materials and special offers from Direct Credit through email,
              SMS or WhatsApp.
            </p>
            <p>
              You expressly authorize Direct Credit to send service-related
              transactional messages, WhatsApp messages and calls even if
              your contact number is registered under the National Do Not
              Disturb (DND) list with the relevant telecom regulatory
              authority.
            </p>
          </Section>

          <Section
            id="regulatory"
            number="2"
            title="Regulatory Disclosures and Clarifications"
          >
            <p>
              <span className="font-semibold text-gray-700">
                Role of Direct Credit:
              </span>{" "}
              Direct Credit operates strictly as a Direct Selling Agent
              (DSA). It is not a Non-Banking Financial Company (NBFC), bank,
              or direct lender, and does not itself provide loans or other
              credit facilities.
            </p>
            <p>
              <span className="font-semibold text-gray-700">
                Loan Provider:
              </span>{" "}
              All loans and financial products accessed through the Website
              are offered, sanctioned and disbursed solely by partnered
              NBFCs and/or banks with whom Direct Credit has formal tie-ups.
            </p>
            <p>
              <span className="font-semibold text-gray-700">
                Discretion of Lending Partners:
              </span>{" "}
              Loan eligibility, sanction, terms and disbursal are determined
              entirely at the discretion of the respective NBFC or bank.
              Direct Credit has no role or influence in the final credit
              decision.
            </p>
            <p>
              <span className="font-semibold text-gray-700">
                Data Sharing &amp; Consent:
              </span>{" "}
              By using the Website, you expressly authorize Direct Credit to
              collect, process and share your data with its partnered
              NBFCs/banks, credit bureaus, and authorized third-party service
              providers (for example, for credit bureau checks, CKYC
              validation and other integrations) as required to process your
              application. You consent to Direct Credit and its partners
              accessing your credit report, verifying your KYC details, and
              validating your application information with relevant
              authorities.
            </p>
            <p>
              <span className="font-semibold text-gray-700">
                Grievance Redressal:
              </span>{" "}
              Direct Credit has appointed a Grievance Redressal Officer
              (GRO) to address customer complaints. All grievances will be
              acknowledged within 48 working hours and resolved within 30
              days of receipt. If you are not satisfied with the resolution
              provided, you may escalate the matter to the relevant
              NBFC/bank partner as per their grievance redressal mechanism.
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg px-5 py-4 mt-2 space-y-1">
              <p className="font-bold text-gray-800">Name: Rajnikant Shukla</p>
              <p className="font-bold text-gray-800">
                Email: grievanceofficer@directcredit.in
              </p>
              <p className="font-bold text-gray-800">
                Mobile No: 8700860176
              </p>
              <p className="font-bold text-gray-800">
                Designation: Supervisor / Team Leader – Customer Experience
              </p>
              <p className="font-bold text-gray-800">
                Address: Vision Business Park, 2nd Floor, Tower A, I.T
                Square, Knowledge Park – 3, Greater Noida, Gautam Buddha
                Nagar, Uttar Pradesh – 201306
              </p>
            </div>
          </Section>

          <Section id="access" number="3" title="License and Website Access">
            <p>
              Direct Credit grants you a limited license to access and make
              personal use of the Website and the Services. This license
              does not permit you to: download or copy information for the
              benefit of any other individual, vendor or third party; cache
              content, create unauthorized hypertext links, or frame any
              content available through the Website; upload, post or
              transmit content you do not have the right to make available;
              upload or transmit viruses or other harmful code; impose an
              unreasonable or disproportionately large load on our
              infrastructure; or use data mining, robots, or similar
              automated data gathering tools. You may not bypass any measure
              used by Direct Credit to prevent or restrict access to the
              Website, and any unauthorized use will terminate the license
              granted to you.
            </p>
            <p>
              You further agree not to: use the Website or its content for
              any commercial purpose; make any speculative, false or
              fraudulent transaction; access or copy any content using a
              robot, spider, scraper or similar automated means without our
              written permission; violate robot exclusion measures; deep-link
              to any part of the Website without written permission; or
              frame, mirror or otherwise incorporate any part of the Website
              into another website without prior written authorization.
            </p>
          </Section>

          <Section id="eligibility" number="4" title="Eligibility">
            <p>
              The Service is not available to minors under the age of 18 or
              to users suspended or removed from the system by Direct Credit
              for any reason. Users may not hold more than one active
              account and are prohibited from selling, trading or otherwise
              transferring their account to another party. If you do not
              qualify under these conditions, you may not use the Service or
              the Website.
            </p>
          </Section>

          <Section id="account" number="5" title="Your Account">
            <p>
              By using the Website, you represent that you are of legal age
              to form a binding contract, are not barred from receiving
              services under Indian law or other applicable law, and will
              only use the Website to make legitimate purchases for yourself
              or for a person you are legally authorized to act for. You
              agree to provide true, accurate, current and complete
              information about yourself. If any information you provide is
              or becomes untrue, inaccurate or incomplete, Direct Credit may
              suspend or terminate your account and refuse further use of
              the Website.
            </p>
            <p>
              You are responsible for maintaining the confidentiality of
              your account and password and for all activities that occur
              under your account. We recommend that you log out at the end
              of each session, and you agree to notify Direct Credit
              immediately of any unauthorized use of your account or breach
              of security. Direct Credit reserves the right to refuse
              service, terminate accounts, or remove or edit content at its
              sole discretion, and to deny access to the Website for any
              reason, including a violation of these Terms or the Privacy
              Policy.
            </p>
            <p>
              Additional terms may apply to services you select, and you
              agree to abide by the rules and restrictions of any supplier
              you deal with, including timely payment of amounts due.
              Violation of a supplier's rules may result in cancellation of
              your purchase, denial of access to the relevant service,
              forfeiture of amounts paid, and/or debiting of your account for
              costs incurred as a result of such violation.
            </p>
          </Section>

          <Section id="content" number="6" title="Submitted Content">
            <p>
              Direct Credit does not claim ownership of any material you
              make available through the Website. Such material may, at
              Direct Credit's discretion, be included in the Service in
              whole, in part, or in modified form. By submitting content,
              you grant Direct Credit a perpetual, irrevocable, worldwide,
              royalty-free and non-exclusive license to use, copy,
              distribute, publicly display, modify, create derivative works
              from, and sublicense such content, and you represent that you
              have the right to grant this license.
            </p>
            <p>
              Direct Credit takes no responsibility and assumes no liability
              for content submitted by users, has no obligation to publish
              any submission, and reserves the right to determine which
              content is published. You may not submit or transmit any
              unlawful, threatening, defamatory, obscene or otherwise
              objectionable material, any commercial solicitation or
              advertising, or any material that infringes a third party's
              intellectual property or other rights. You are solely liable
              for any damages resulting from a violation of these
              restrictions.
            </p>
          </Section>

          <Section
            id="disclaimer"
            number="7"
            title="Disclaimer of Liability and Warranty"
          >
            <p>
              Content and Services provided through the Website may include
              inaccuracies or errors, including pricing errors, and we
              disclaim all liability for such errors, while reserving the
              right to correct them. Direct Credit makes no representation
              about the suitability of the information, products or services
              on the Website for any purpose, and their inclusion does not
              constitute an endorsement. All information, products and
              services are provided &quot;as is&quot;, without warranties of
              any kind, including implied warranties of merchantability,
              fitness for a particular purpose, title, and non-infringement,
              and without any guarantee that the Website or communications
              from Direct Credit are free of viruses or other harmful
              components.
            </p>
            <p>
              Suppliers offering services on the Website are independent,
              and Direct Credit is not liable for their acts, errors,
              omissions or negligence, or for any resulting personal injury,
              death, property damage or other losses. Direct Credit and its
              affiliates have no liability and will make no refund for any
              delay, cancellation, strike, force majeure or other cause
              beyond their control. In no event shall Direct Credit or its
              affiliates be liable for any direct, indirect, punitive,
              incidental, special or consequential damages arising from your
              access to, or use of, the Website, whether based on negligence,
              contract, tort, strict liability, or otherwise, even if
              advised of the possibility of such damages.
            </p>
          </Section>

          <Section
            id="availability"
            number="8"
            title="Disclaimer of Online Availability, Impressions and Click-Throughs"
          >
            <p>
              We do not guarantee or warrant the online availability,
              impressions, or click-through performance of the Website, its
              webpages, or any material, information, links or content
              presented on it, and any such content may be unavailable for
              online access at any time. Any advertising or sponsorship must
              be approved by Direct Credit before posting, must relate to
              relevant subject areas, and Direct Credit reserves the right
              to accept or reject any advertising sponsor for any reason.
            </p>
          </Section>

          <Section id="license-disclaimer" number="9" title="License Disclaimer">
            <p>
              Except for the limited license granted in Section 3 of these
              Terms, nothing on the Website shall be construed as conferring
              any license under Direct Credit's or any third party's
              intellectual property rights, whether by estoppel, implication
              or otherwise.
            </p>
          </Section>

          <Section id="local-laws" number="10" title="Local Laws">
            <p>
              Direct Credit controls and operates the Website from its
              headquarters in Mumbai, India, and makes no representation
              that its materials are appropriate or available for use in
              other locations. If you access the Website from another
              location, you are responsible for compliance with applicable
              local laws. Unless otherwise stated, marketing and promotional
              materials on the Website are directed solely to individuals,
              companies and entities located in India and comply with Indian
              law. Any disputes shall be subject to the exclusive
              jurisdiction of the courts at Mumbai.
            </p>
          </Section>

          <Section id="liability" number="11" title="Limitation of Liability">
            <p>
              Direct Credit and its subsidiaries, affiliates, officers,
              employees, agents, partners and licensors shall not be liable
              to you for any direct, indirect, incidental, special,
              consequential or exemplary damages, including damages for loss
              of profits, goodwill, use, data or other intangible losses,
              resulting from use of the Website, its content, or any related
              services. If Direct Credit or its affiliates are nonetheless
              found liable for any loss or damage connected with such use,
              that liability will not exceed, in the aggregate, the greater
              of (a) the service fees you paid to Direct Credit in
              connection with the relevant transaction, or (b) Rupees One
              Hundred (INR 100). This limitation reflects the allocation of
              risk between the parties, survives even if a limited remedy is
              found to have failed of its essential purpose, and inures to
              the benefit of Direct Credit, its affiliates and their
              respective suppliers.
            </p>
          </Section>

          <Section id="indemnity" number="12" title="Indemnity">
            <p>
              You agree to indemnify and hold Direct Credit, and its
              officers, directors, agents, subsidiaries, joint ventures and
              employees, harmless from and against any claims, causes of
              action, demands, losses, damages, fines, penalties, costs or
              expenses, including reasonable attorneys' fees, arising out of
              or related to your breach of these Terms, your violation of
              any law or third-party right, or your use of the Website.
            </p>
          </Section>

          <Section
            id="electronic-communication"
            number="13"
            title="Electronic Communication"
          >
            <p>
              When you use the Website or send emails to Direct Credit, you
              are communicating with us electronically, and you consent to
              receive communications from Direct Credit electronically,
              including by email, notices posted on the Website, phone, or
              other commonly used means. You agree that such electronic
              communications satisfy any legal requirement that
              communications be in writing.
            </p>
          </Section>

          <Section
            id="postings"
            number="14"
            title="Website-Provided Email and Postings"
          >
            <p>
              The Website may allow users to send messages to other users
              and non-users and to post content. Direct Credit is under no
              obligation to review such postings and assumes no
              responsibility for them, although we may monitor and remove
              any posting at our discretion. You agree not to use the
              Website to post or transmit unlawful, threatening, abusive,
              defamatory, obscene, hateful or otherwise objectionable
              material; advertisements or solicitations; impersonations or
              false information; personal information such as phone numbers
              or addresses; unauthorized statements on behalf of Direct
              Credit; unauthorized downloads of copyrighted material;
              repetitive or chain messages; or unsolicited bulk or
              commercial messages, including to people who do not know you
              or have not consented to receive them.
            </p>
          </Section>

          <Section id="links" number="15" title="Links">
            <p>
              The Website or third parties may provide links to other
              websites or resources. Because Direct Credit has no control
              over such websites, you agree that Direct Credit is not
              responsible for their availability, content, advertising,
              products or other materials, and shall not be liable for any
              damage or loss caused by, or in connection with, your use of
              or reliance on any such external website or resource.
            </p>
          </Section>

          <Section
            id="secure-areas"
            number="16"
            title="Access to Password-Protected/Secure Areas"
          >
            <p>
              Access to password-protected or secure areas of the Website is
              restricted to authorized users only. Unauthorized individuals
              attempting to access these areas may be subject to
              prosecution.
            </p>
          </Section>

          <Section
            id="modifications"
            number="17"
            title="Modification and Notification of Changes"
          >
            <p>
              Direct Credit reserves the right to make changes to the
              Website, related policies, these Terms and the Privacy Policy
              at any time. If we make a material modification, we may notify
              you by displaying a prominent announcement on the Website for
              thirty (30) days, which will be deemed sufficient notice. If
              you have not used the Website for more than 30 days, please
              check these Terms and the Privacy Policy before further use.
              Should you wish to terminate your account due to a
              modification, you may do so by emailing
              &quot;Termination&quot; to{" "}
              <a
                href="mailto:support@directcredit.in"
                className="text-blue-600 hover:underline"
              >
                support@directcredit.in
              </a>
              . Continued use of the Website after a change constitutes your
              acceptance of the revised Terms or Privacy Policy.
            </p>
          </Section>

          <Section id="trademarks" number="18" title="Trademarks">
            <p>
              The trademarks, logos and service marks displayed on the
              Website are the property of Direct Credit and other parties.
              Users may not use any such marks for any purpose, including as
              metatags on other websites, without written permission from
              the owner. All information and content on the Website,
              including software, is protected by copyright, and users may
              not modify, copy, distribute, transmit, publish, sell,
              license, or create derivative works from any content on the
              Website for commercial or public purposes.
            </p>
          </Section>

          <Section
            id="survival"
            number="19"
            title="Survival of Terms After Agreement Ends"
          >
            <p>
              Any provision of these Terms that imposes or contemplates
              continuing obligations on a party will survive the expiration
              or termination of these Terms, notwithstanding any other
              provision of these Terms or general legal principle to the
              contrary.
            </p>
          </Section>

          <Section id="general" number="20" title="General">
            <p>
              If any provision of these Terms is deemed invalid, void or
              unenforceable, the parties agree that effect should be given
              to their intentions as reflected in that provision, and the
              unenforceable provision shall be severable without affecting
              the validity of the remaining provisions. Headings are for
              reference only and do not limit the scope of any section.
            </p>
            <p>
              These Terms and your relationship with Direct Credit are
              governed by the laws of India, without regard to conflict of
              law principles, and you agree to submit to the personal
              jurisdiction of the courts located in Mumbai for any related
              legal proceedings. Direct Credit's failure to act on a breach
              does not waive its right to act on subsequent or similar
              breaches, and Direct Credit does not guarantee it will take
              action against every breach of these Terms. Except as
              expressly stated, there are no third-party beneficiaries to
              these Terms. These Terms constitute the entire agreement
              between you and Direct Credit regarding your use of the
              Website, superseding any prior agreements on the subject.
            </p>
          </Section>

          <Section id="contact" number="21" title="Contact Us">
            <p>
              If you have any questions about these Terms &amp; Conditions,
              or wish to raise a grievance, you can contact us:
            </p>
            <div className="flex items-center gap-3 mt-2">
              <Mail size={18} className="text-[#050824] flex-shrink-0" />
              <a
                href="mailto:support@directcredit.in"
                className="text-blue-600 hover:underline"
              >
                support@directcredit.in

              </a>
            </div>
          </Section>
        </article>
      </div>

      <Footer />
    </div>
  );
}