// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import NewsCard from "../components/NewsCard";
// import Loader from "../components/Loader";

// const NEWS_API_URL = `https://news-api-backend-p1gk.onrender.com/api/news`;

// // Alpha Vantage API settings
// const ALPHA_VANTAGE_API_KEY = "XROTOBLFK4Z0FL0X";

// // The symbols you want stock info for
// const STOCK_SYMBOLS = ["RELIANCE.BSE", "TCS.BSE", "INFY.BSE"]; 

// export default function Dashboard() {
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [stocks, setStocks] = useState([]);

//   // Fetch News
//   useEffect(() => {
//     const controller = new AbortController();

//     fetch(NEWS_API_URL, { signal: controller.signal })
//       .then((res) => res.json())
//       .then((data) => setArticles(data || []))
//       .catch((err) => setError(err.message))
//       .finally(() => setLoading(false));

//     return () => controller.abort();
//   }, []);

//   // Fetch stocks from Alpha Vantage
//   useEffect(() => {
//     const fetchStocks = async () => {
//       try {
//         const stocksData = [];

//         for (const symbol of STOCK_SYMBOLS) {
//           const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`;
//           const response = await axios.get(url);
//           const quote = response.data["Global Quote"];

//           console.log("responseresponse",response)
//           if (quote && Object.keys(quote).length > 0) {
//             stocksData.push({
//               symbol: quote["01. symbol"],
//               price: parseFloat(quote["05. price"]),
//               changePercent: parseFloat(quote["10. change percent"]),
//               lastTradingDay: quote["07. latest trading day"],
//             });
//           } else {
//             console.warn("No data for symbol", symbol);
//           }
//         }

//         setStocks(stocksData);
//         setError(null);
//       } catch (err) {
//         setError("Stock Fetch Error: " + err.message);
//         console.error("Stock Fetch Error:", err);
//       }
//     };

//     fetchStocks();

//     const interval = setInterval(fetchStocks, 180000); // Refresh every 3 minutes

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <main className="p-8 pt-2">
//       {/* 📊 Stock Widget */}
//       <div className="bg-gray-900 p-4 rounded-xl shadow mb-6 border border-emerald-400 max-w-2xl">
//         <h3 className="text-xl font-semibold text-emerald-300 mb-4">📈 Stock Prices</h3>
//         {error && <p className="text-red-500 mb-2">{error}</p>}
//         {stocks.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-200">
//             {stocks.map((stock) => (
//               <div key={stock.symbol} className="p-3 rounded bg-gray-800 border border-gray-700">
//                 <p className="font-bold text-emerald-400">{stock.symbol}</p>
//                 <p>Price: ₹{stock.price.toFixed(2)}</p>
//                 <p>Change: {stock.changePercent.toFixed(2)}%</p>
//                 <p className="text-sm text-slate-400">Last Trading Day: {stock.lastTradingDay}</p>
//               </div>
//             ))}
//           </div>
//         ) : (
//           !error && <p className="text-slate-400">Fetching stock data...</p>
//         )}
//       </div>

//       {/* 📰 News Section */}
//       <h2 className="text-3xl font-bold mb-6 text-emerald-400">Top Headlines in India</h2>
//       <p className="text-slate-300 mb-6">Get the latest breaking news and top stories happening across India.</p>

//       {loading && <p className="text-slate-400">Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
//         {articles.map((article, idx) => (
//           <NewsCard key={idx} article={article} />
//         ))}
//       </div>
//     </main>
//   );
// }


// _____________________________________________________________

import React, { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "../components/NewsCard";
import Loader from "../components/Loader";

const NEWS_API_URL = `https://news-api-backend-p1gk.onrender.com/api/news`;

// Alpha Vantage API settings
const ALPHA_VANTAGE_API_KEY = "XROTOBLFK4Z0FL0X";

// The symbols you want stock info for
const STOCK_SYMBOLS = ["RELIANCE.BSE", "TCS.BSE", "INFY.BSE"]; 

// Mini SVG Chart Icon component — simple up/down arrow with bars
const StockChartIcon = ({ changePercent }) => {
  const isPositive = changePercent >= 0;

  return (
    <svg
      className="inline-block mr-2"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={isPositive ? "#22c55e" : "#ef4444"} // green or red
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Bars */}
      <rect x="3" y="12" width="2" height="6" fill={isPositive ? "#22c55e" : "#ef4444"} />
      <rect x="8" y="9" width="2" height="9" fill={isPositive ? "#22c55e" : "#ef4444"} />
      <rect x="13" y="6" width="2" height="12" fill={isPositive ? "#22c55e" : "#ef4444"} />
      <rect x="18" y="3" width="2" height="15" fill={isPositive ? "#22c55e" : "#ef4444"} />
      {/* Arrow */}
      {isPositive ? (
        <polyline points="7 14 12 9 17 14" fill="none" stroke={isPositive ? "#22c55e" : "#ef4444"} strokeWidth="2" />
      ) : (
        <polyline points="7 10 12 15 17 10" fill="none" stroke={isPositive ? "#22c55e" : "#ef4444"} strokeWidth="2" />
      )}
    </svg>
  );
};

export default function Dashboard() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stocks, setStocks] = useState([]);

  // Fetch News
  useEffect(() => {
    const controller = new AbortController();

    fetch(NEWS_API_URL, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => setArticles(data || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  // Fetch stocks from Alpha Vantage
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const stocksData = [];

        for (const symbol of STOCK_SYMBOLS) {
          const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`;
          const response = await axios.get(url);
          const quote = response.data["Global Quote"];

          if (quote && Object.keys(quote).length > 0) {
            stocksData.push({
              symbol: quote["01. symbol"],
              price: parseFloat(quote["05. price"]),
              changePercent: parseFloat(quote["10. change percent"].replace("%", "")),
              lastTradingDay: quote["07. latest trading day"],
            });
          } else {
            console.warn("No data for symbol", symbol);
          }
        }

        setStocks(stocksData);
        setError(null);
      } catch (err) {
        setError("Stock Fetch Error: " + err.message);
        console.error("Stock Fetch Error:", err);
      }
    };

    fetchStocks();

    const interval = setInterval(fetchStocks, 180000); // Refresh every 3 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="p-8 pt-2">
      {/* 📊 Stock Widget */}
      <div className="bg-gray-900 p-6 rounded-xl shadow mb-6 border border-emerald-400 max-w-2xl mx-auto">
        <h3 className="text-xl font-semibold text-emerald-300 mb-6 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-emerald-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 17l6-6 4 4 8-8" />
          </svg>
          Stock Prices
        </h3>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {stocks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-slate-200">
            {stocks.map((stock) => {
              const isPositive = stock.changePercent >= 0;
              return (
                <div
                  key={stock.symbol}
                  className="p-4 rounded bg-gray-800 border border-gray-700 flex flex-col space-y-2 shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-emerald-400 flex items-center">
                      <StockChartIcon changePercent={stock.changePercent} />
                      {stock.symbol}
                    </p>
                    <p
                      className={`font-semibold ${
                        isPositive ? "text-green-400" : "text-red-500"
                      }`}
                    >
                      {isPositive ? "▲" : "▼"} {stock.changePercent.toFixed(2)}%
                    </p>
                  </div>
                  <p className="text-lg font-semibold">₹{stock.price.toFixed(2)}</p>
                  <p className="text-sm text-slate-400">Last Trading Day: {stock.lastTradingDay}</p>
                </div>
              );
            })}
          </div>
        ) : (
          !error && <p className="text-slate-400">Fetching stock data...</p>
        )}
      </div>

      {/* 📰 News Section */}
      <h2 className="text-3xl font-bold mb-6 text-emerald-400">Top Headlines in India</h2>
      <p className="text-slate-300 mb-6">Get the latest breaking news and top stories happening across India.</p>

      {loading && <p className="text-slate-400">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, idx) => (
          <NewsCard key={idx} article={article} />
        ))}
      </div>
    </main>
  );
}
