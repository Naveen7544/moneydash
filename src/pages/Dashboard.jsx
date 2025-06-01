import React, { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";

const API_URL = `https://news-api-backend-p1gk.onrender.com/api/news`;

export default function Dashboard() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(API_URL, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => setArticles(data || [])) // <-- changed here
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  return (
    <main className="p-8 pt-2">
      <h2 className="text-3xl font-bold mb-6 text-emerald-400">
        Top Headlines in India
      </h2>
      <p className="text-slate-300 mb-6">
        Get the latest breaking news and top stories happening across India.
      </p>

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
