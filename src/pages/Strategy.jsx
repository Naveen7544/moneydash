// import React from "react";
// // import book1st from "../assets/pdf/Book_1st.pdf"

//   const strategies = [
//   {
//     title: "Intraday Trading Strategy",
//     description: "Learn how to trade intraday with real-time tips and signals.",
//     pdfUrl:"/pdf/Book_1st.pdf",
//   },
//   {
//     title: "Delivery Based Trading",
//     description: "Understand long-term delivery trading with proven methods.",
//     pdfUrl: "/pdfs/delivery-strategy.pdf",
//   },
//   {
//     title: "ETF Investment Strategy",
//     description: "Explore ETF strategies to diversify your portfolio efficiently.",
//     pdfUrl: "/pdfs/etf-strategy.pdf",
//   },
//   {
//     title: "MTF Trading Strategy",
//     description: "Master Medium Term Framework (MTF) trading for steady profits.",
//     pdfUrl: "/pdfs/mtf-strategy.pdf",
//   },
//   {
//     title: "Hammer Candle Pattern",
//     description: "Identify hammer candle patterns for better entry and exit points.",
//     pdfUrl: "/pdfs/hammer-candle-strategy.pdf",
//   },
// ];

// export default function Strategy() {
//   return (
//     <main className="p-8 bg-gray-50 min-h-screen">
//       <h1 className="text-4xl font-bold text-emerald-600 mb-6">Trading Strategies</h1>
//       <p className="text-gray-700 max-w-xl mb-8">
//         Read these detailed Indian stock market trading strategies. Learn about intraday, delivery, ETF, MTF, and candlestick patterns without downloading.
//       </p>

//       {/* Your AdSense Ad Placeholder */}
//       <div className="mb-10">
//         {/* 
//           Place your Google AdSense code here
//           Example:
//           <ins className="adsbygoogle"
//                style={{ display: 'block' }}
//                data-ad-client="ca-pub-xxxxxxxxxx"
//                data-ad-slot="1234567890"
//                data-ad-format="auto"
//                data-full-width-responsive="true"></ins>
//           <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
//         */}
//         <div className="bg-gray-200 text-center py-10 rounded text-gray-500">AdSense Ad Here</div>
//       </div>

//       <div className="grid gap-12 md:grid-cols-2">
//         {strategies.map(({ title, description, pdfUrl }, idx) => (
//           <div key={idx} className="bg-white rounded-lg shadow-md p-4 border border-gray-300">
//             <h2 className="text-2xl font-semibold mb-2 text-gray-900">{title}</h2>
//             <p className="mb-4 text-gray-700">{description}</p>

//             {/* Embed PDF for reading only */}
//             {/* <iframe
//               src={pdfUrl}
//               title={title}
//               width="100%"
//               height="400px"
//               className="border rounded"
//               sandbox="allow-scripts allow-same-origin"
//             /> */}
//             <iframe
//   src={pdfUrl}
//   title={title}
//   width="100%"
//   height="400px"
//   className="border rounded"
//   type="application/pdf"
//   sandbox="allow-same-origin allow-scripts"
// >
//   Your browser does not support PDFs.
// </iframe>

//           </div>
//         ))}
//       </div>
//     </main>
//   );
// }

import React from "react";

const strategies = [
  {
    title: "Intraday Trading Strategy",
    description: "Learn how to trade intraday with real-time tips and signals.",
    pdfUrl: "/pdf/Book_1st.pdf", // Must be in /public/pdf/
  },
  {
    title: "Delivery Based Trading",
    description: "Understand long-term delivery trading with proven methods.",
    pdfUrl: "/pdfs/delivery-strategy.pdf",
  },
  // Add more PDFs if needed...
];

export default function Strategy() {
  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-emerald-600 mb-6">Trading Strategies</h1>
      <p className="text-gray-700 max-w-xl mb-8">
        Read these detailed Indian stock market trading strategies.
      </p>

      <div className="grid gap-12 md:grid-cols-2">
        {strategies.map(({ title, description, pdfUrl }, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-md p-4 border border-gray-300">
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">{title}</h2>
            <p className="mb-4 text-gray-700">{description}</p>

            <iframe
           src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
              title={title}
              width="100%"
              height="400px"
              className="border rounded"
              style={{ border: "1px solid #ccc" }}
                //  sandbox="allow-same-origin allow-scripts"
            >
              <p>Your browser does not support PDF embedding. <a href={pdfUrl}>Click here to view it</a>.</p>
            </iframe>
          </div>
        ))}
      </div>
    </main>
  );
}


