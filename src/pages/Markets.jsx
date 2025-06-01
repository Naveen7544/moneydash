import React, { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";

const API_URL = `https://news-api-backend-p1gk.onrender.com/api/indian-market`;

export default function Markets() {
  const [marketArticles, setMarketArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchMarketArticles = async () => {
      try {
        const res = await fetch(API_URL, { signal: controller.signal });
        const data = await res.json();

        if (!isMounted) return;

        setMarketArticles(data);
      } catch (err) {
        if (err.name !== "AbortError" && isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchMarketArticles();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <main className="p-8 pt-2">
      <h2 className="text-3xl font-bold text-emerald-400 mb-6">
        Indian Market News
      </h2>
      <p className="text-slate-300 mb-6">
        Stay informed with the latest updates and developments in the Indian
        financial markets.
      </p>

      {loading && <p className="text-slate-400">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && marketArticles.length === 0 && (
        <p className="text-slate-400">No market news found at the moment.</p>
      )}

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {marketArticles.map((article, idx) => (
          <NewsCard key={idx} article={article} />
        ))}
      </div>
    </main>
  );
}
