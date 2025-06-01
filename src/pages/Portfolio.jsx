import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Realistic monthly data for 3 years for 10 Indian stocks (simplified example)
// Each stock: Array of objects { month: "YYYY-MM", price, volume }
const stocks = [
  {
    name: "Reliance Industries",
    symbol: "RELIANCE",
    logo: "https://companiesmarketcap.com/img/company-logos/64/RELIANCE.NS.png",
    marketCap: "₹18.5T",
    data: generateMonthlyData(36, 2400, 3000, 1000000, 3000000),
  },
  {
    name: "Tata Consultancy Services",
    symbol: "TCS",
    logo: "https://companiesmarketcap.com/img/company-logos/64/TCS.NS.png",
    marketCap: "₹13.2T",
    data: generateMonthlyData(36, 3100, 3700, 500000, 1500000),
  },
  {
    name: "HDFC Bank",
    symbol: "HDFCBANK",
    logo: "https://companiesmarketcap.com/img/company-logos/256/HDB.webp",
    marketCap: "₹12.9T",
    data: generateMonthlyData(36, 1400, 1650, 600000, 1800000),
  },
  {
    name: "Infosys",
    symbol: "INFY",
    logo: "https://companiesmarketcap.com/img/company-logos/256/INFY.webp",
    marketCap: "₹6.2T",
    data: generateMonthlyData(36, 1300, 1500, 400000, 1200000),
  },
  {
    name: "ICICI Bank",
    symbol: "ICICIBANK",
    logo: "https://companiesmarketcap.com/img/company-logos/256/IBN.webp",
    marketCap: "₹7.9T",
    data: generateMonthlyData(36, 1000, 1200, 800000, 2000000),
  },
  {
    name: "Hindustan Unilever",
    symbol: "HINDUNILVR",
    logo: "https://companiesmarketcap.com/img/company-logos/64/HINDUNILVR.NS.png",
    marketCap: "₹6.8T",
    data: generateMonthlyData(36, 2400, 2700, 200000, 800000),
  },
  {
    name: "Kotak Mahindra Bank",
    symbol: "KOTAKBANK",
    logo: "https://companiesmarketcap.com/img/company-logos/64/KOTAKBANK.NS.png",
    marketCap: "₹3.4T",
    data: generateMonthlyData(36, 1600, 1800, 500000, 1300000),
  },
  {
    name: "Larsen & Toubro",
    symbol: "LT",
    logo: "https://companiesmarketcap.com/img/company-logos/64/LT.NS.png",
    marketCap: "₹4.8T",
    data: generateMonthlyData(36, 3200, 3500, 300000, 1000000),
  },
  {
    name: "Bajaj Finance",
    symbol: "BAJFINANCE",
    logo: "https://companiesmarketcap.com/img/company-logos/64/BAJFINANCE.NS.png",
    marketCap: "₹4.6T",
    data: generateMonthlyData(36, 6500, 7500, 100000, 400000),
  },
  {
    name: "State Bank of India",
    symbol: "SBIN",
    logo: "https://companiesmarketcap.com/img/company-logos/64/SBIN.NS.png",
    marketCap: "₹5.9T",
    data: generateMonthlyData(36, 600, 700, 1000000, 3500000),
  },
];

// Helper function to generate synthetic monthly data (price and volume)
function generateMonthlyData(monthCount, minPrice, maxPrice, minVol, maxVol) {
  const data = [];
  const startYear = 2022;
  let currentPrice = (minPrice + maxPrice) / 2;
  for (let i = 0; i < monthCount; i++) {
    const year = startYear + Math.floor(i / 12);
    const month = (i % 12) + 1;
    // Simulate price with some noise/random walk
    currentPrice += (Math.random() - 0.5) * (maxPrice - minPrice) * 0.05;
    currentPrice = Math.max(minPrice, Math.min(maxPrice, currentPrice));
    // Simulate volume with noise
    const volume =
      Math.floor(minVol + Math.random() * (maxVol - minVol));
    data.push({
      month: `${year}-${month.toString().padStart(2, "0")}`,
      price: Number(currentPrice.toFixed(2)),
      volume,
    });
  }
  return data;
}

export default function Portfolio() {
  return (
    <main className="p-8 bg-slate-900 min-h-screen">
      <h1 className="text-4xl font-bold text-emerald-400 mb-8">Top 10 Indian Stocks - Portfolio</h1>
      <p className="text-slate-300 mb-10">
        Realistic price and volume charts over the last 3 years.
      </p>

      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
        {stocks.map((stock, idx) => (
          <div
            key={idx}
            className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700"
          >
            {/* Header with logo + name */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={stock.logo}
                alt={stock.name}
                className="w-12 h-12 rounded-full border border-slate-600"
              />
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {stock.name}
                </h2>
                <p className="text-slate-400 text-sm">{stock.symbol}</p>
                <p className="text-slate-300 text-sm mt-1">
                  Market Cap: {stock.marketCap}
                </p>
              </div>
            </div>

            {/* Charts container */}
            <div className="flex gap-4">
              {/* Price Line Chart */}
              <div className="flex-1 h-56">
                <h3 className="text-slate-300 mb-2">Price Trend (₹)</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stock.data}>
                    <CartesianGrid stroke="#2c2f33" strokeDasharray="3 3" />
                    <XAxis
                      dataKey="month"
                      tick={{ fill: "#94a3b8" }}
                      minTickGap={20}
                      tickFormatter={(tick) => tick.slice(0, 7)}
                    />
                    <YAxis
                      tick={{ fill: "#94a3b8" }}
                      domain={["auto", "auto"]}
                      allowDecimals={true}
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#222", borderRadius: 8 }}
                      labelStyle={{ color: "#fff" }}
                      itemStyle={{ color: "#10b981" }}
                      formatter={(value) => `₹${value}`}
                    />
                    <Legend
                      wrapperStyle={{ color: "#94a3b8", fontSize: 12 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Volume Bar Chart */}
              <div className="flex-1 h-56">
                <h3 className="text-slate-300 mb-2">Volume Trend</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stock.data}>
                    <CartesianGrid stroke="#2c2f33" strokeDasharray="3 3" />
                    <XAxis
                      dataKey="month"
                      tick={{ fill: "#94a3b8" }}
                      minTickGap={20}
                      tickFormatter={(tick) => tick.slice(0, 7)}
                    />
                    <YAxis
                      tick={{ fill: "#94a3b8" }}
                      domain={["auto", "auto"]}
                      allowDecimals={false}
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#222", borderRadius: 8 }}
                      labelStyle={{ color: "#fff" }}
                      itemStyle={{ color: "#3b82f6" }}
                      formatter={(value) => value.toLocaleString()}
                    />
                    <Legend
                      wrapperStyle={{ color: "#94a3b8", fontSize: 12 }}
                    />
                    <Bar
                      dataKey="volume"
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
