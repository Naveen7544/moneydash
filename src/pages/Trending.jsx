import React, { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import dummyImg from "../assets/dummy-img.jpg";

export default function Trending() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simple in-memory cache for Microlink screenshot URLs
  const microlinkCache = {};

  // Helper to extract image src from HTML content
  const extractImageFromHTML = (html) => {
    if (!html) return null;
    const div = document.createElement("div");
    div.innerHTML = html;
    const img = div.querySelector("img");
    return img?.src || null;
  };

  // Fetch screenshot URL from Microlink API
  const fetchMicrolinkSnapshot = async (url) => {
    if (microlinkCache[url]) return microlinkCache[url];

    try {
      const response = await fetch(
        `https://api.microlink.io?url=${encodeURIComponent(
          url
        )}&screenshot=true&meta=false&audio=false&video=false&embed=false`
      );
      const json = await response.json();
      if (json.status === "success" && json.data.screenshot?.url) {
        microlinkCache[url] = json.data.screenshot.url;
        return json.data.screenshot.url;
      }
    } catch (err) {
      console.warn("Microlink screenshot fetch failed for", url, err);
    }
    return null;
  };

useEffect(() => {
  const fetchMicrolinkSnapshot = async (url) => {
    try {
      const res = await fetch(
        `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true`
      );
      const json = await res.json();
      return json?.data?.screenshot?.url || null;
    } catch (error) {
      console.error("Microlink snapshot error:", error);
      return null;
    }
  };

  const fetchNews = async () => {
    const rssUrl =
      "https://news.google.com/rss/search?q=stock+market+india&hl=en-IN&gl=IN&ceid=IN:en";
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
      rssUrl
    )}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      if (data.status !== "ok") throw new Error(data.message || "API error");

      const formattedArticles = await Promise.all(
        data.items.slice(0, 10).map(async (item) => {
          let image =
            item.thumbnail?.trim() ||
            item.enclosure?.link?.trim() ||
            extractImageFromHTML(item.description) ||
            extractImageFromHTML(item.content);

          if (!image) {
            const snapshotUrl = await fetchMicrolinkSnapshot(item.link);
            image = snapshotUrl || dummyImg;
          }

          return {
            title: item.title,
            url: item.link,
            publishedAt: item.pubDate,
            description:
              item.description?.replace(/<[^>]+>/g, "") ||
              "No description available.",
            image,
            source: { name: "Google News" },
          };
        })
      );

      setArticles(formattedArticles);
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  fetchNews();
}, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-black text-white p-2">
      <h1 className="text-3xl font-bold text-emerald-400 text-center mb-2">
        Top Stock Market News from India
      </h1>
      <p className="text-slate-300 text-center mb-6">
        Real-time coverage of major stock movements, market analysis, and
        economic indicators.
      </p>

      {loading && <p className="text-center text-gray-400">Loading news...</p>}
      {error && (
        <p className="text-center text-red-500 font-semibold">
          Error loading news: {error}
        </p>
      )}

      {!loading && !error && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <NewsCard key={index} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
