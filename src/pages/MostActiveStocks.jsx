import React, { useEffect, useState } from 'react';

const API_KEY = 'd0tmglpr01qlvahd382gd0tmglpr01qlvahd3830';

const STOCK_SYMBOLS = [
  { symbol: 'AAPL', name: 'Apple' },
  { symbol: 'TSLA', name: 'Tesla' },
  { symbol: 'MSFT', name: 'Microsoft' },
  { symbol: 'GOOGL', name: 'Alphabet' },
  { symbol: 'AMZN', name: 'Amazon' },
  { symbol: 'META', name: 'Meta' },
  { symbol: 'NVDA', name: 'NVIDIA' },
];

export default function MiniStockTicker() {
  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const results = await Promise.all(
          STOCK_SYMBOLS.map(async ({ symbol, name }) => {
            const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`);
            const data = await res.json();
            return {
              name,
              symbol,
              price: data.c?.toFixed(2) ?? 'N/A',
              change: data.d?.toFixed(2) ?? 'N/A',
              changePercent: data.dp?.toFixed(2) ?? 'N/A',
            };
          })
        );
        setStocks(results);
      } catch (err) {
        setError('Failed to load stock data');
      }
    };

    fetchStockData();
    const interval = setInterval(fetchStockData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (error) return <div className="bg-red-500 text-white text-xs p-1 text-center">{error}</div>;
  if (!stocks.length) return null;

  const StockItems = () => (
    <>
      {stocks.map((stock, index) => (
        <div key={index} className="flex items-center mx-6">
          <span className="text-emerald-400 font-semibold mr-2">{stock.name}:</span>
          <span className="text-white">${stock.price}</span>
          <span className={`ml-2 ${parseFloat(stock.change) >= 0 ? 'text-green-400' : 'text-red-500'}`}>
            ({stock.change}, {stock.changePercent}%)
          </span>
        </div>
      ))}
    </>
  );

  return (
    <div className="bg-black h-[30px] overflow-hidden w-full relative">
      <div className="flex whitespace-nowrap animate-marquee">
        <StockItems />
        <StockItems /> {/* Duplicate for seamless scroll */}
      </div>
    </div>
  );
}
