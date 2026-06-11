import { PhoneCall } from "lucide-react";

export default function TalkToExpertPopup() {
  return (
    <div className="absolute right-0 top-10 w-[350px] bg-white rounded-xl shadow-2xl border p-6 z-50">

      <div className="absolute -top-2 right-10 w-4 h-4 bg-white border-l border-t rotate-45"></div>

      <div className="flex items-center gap-3 mb-5">
        <span className="text-3xl">🧑‍💼</span>

        <h3 className="font-bold text-2xl">
          Talk to Expert
        </h3>
      </div>

      <div className="space-y-5">

        <div>
          <p className="text-gray-500 mb-1">
            Sales Enquiry
          </p>

          <p className="font-bold text-xl">
            Call Us:
            <span className="text-blue-600 ml-1">
              +91 9010031003
            </span>
          </p>
        </div>

        <div>
          <p className="text-gray-500 mb-1">
            Service Helpline
          </p>

          <p className="font-bold text-xl">
            Call Us:
            <span className="text-blue-600 ml-1">
              +91 9010031003
            </span>
          </p>
        </div>

        {/* <p className="text-gray-600 leading-7">
            <strong> Direct Credit Office</strong>
            Vision Business Park,
             2nd Floor, Tower A, I.T Square,
            Knowledge Park - 3, Greater Noida,
            Gautam Buddha Nagar, UP - 201306 
            Our advisors are available 7 days a week,
          <strong> 9:30 am - 6:30 pm </strong>
          to assist you with the best offers or help resolve any queries.
        </p> */}
           <p className="text-gray-600 leading-7">
  <strong className="block text-black mb-2">
    Direct Credit Office
  </strong>

  Vision Business Park,<br />
  2nd Floor, Tower A, I.T Square,<br />
  Knowledge Park - 3, Greater Noida,<br />
  Gautam Buddha Nagar, UP - 201306

  <strong className="block text-black mt-4 mb-2">
    Our Advisors
  </strong>

  Available 7 days a week,
  <strong> 9:30 AM - 6:30 PM </strong>
  to assist you with the best offers or help resolve any queries.
</p>




      </div>
    </div>
  );
}