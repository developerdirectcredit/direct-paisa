export default function AppPromo() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto rounded-3xl border p-10 grid md:grid-cols-2 gap-8">

        <img
          src="/images/direct-credit-app.png"
          className="rounded-xl"
        />

        <div>
          <h2 className="text-4xl font-bold">
            Get Credit Score FREE
          </h2>

          <ul className="mt-6 space-y-3">
            <li>✓ Exclusive Offers</li>
            <li>✓ Instant Loans</li>
            <li>✓ Rewards</li>
          </ul>

          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl mt-6">
            Download App
          </button>
        </div>

      </div>
    </section>
  );
}


// export default function AppPromo() {
//   return (
//     <section className="bg-white py-20">
//       <div className="max-w-6xl mx-auto px-4">

//         <div className="rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
 
//           <img
//             src="/images/direct-credit-app.png"
//             alt="Direct Credit App"
//             // className="w-full h-auto"
//              className="mx-auto"
//           /> 

    

//         </div>

//       </div>
//     </section>
//   );
// }