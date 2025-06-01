import React from "react";

function NewsCard({ article }) {
  return (
    <article className="flex flex-col bg-slate-800 rounded-3xl shadow-2xl hover:shadow-emerald-500 transition-shadow transform hover:scale-[1.03] overflow-hidden">
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Read more about ${article.title || "this article"}`}
        className="flex flex-col flex-grow"
      >
        {article.image ? (
          <img
            src={article.image}
            alt={article.title || "News Image"}
            loading="lazy"
            className="w-full h-52 object-cover rounded-t-3xl"
          />
        ) : (
          <div className="w-full h-52 bg-slate-700 flex items-center justify-center text-slate-500 font-semibold">
            No Image Available
          </div>
        )}

        <div className="p-6 flex flex-col flex-grow">
          <h2 className="text-xl font-semibold text-emerald-300 mb-3">
            {article.title || "Untitled"}
          </h2>

          <p className="text-slate-300 flex-grow line-clamp-4 mb-5">
            {article.description || "No description available."}
          </p>

          <div className="flex items-center text-slate-400 text-sm font-medium space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-emerald-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2v-7H3v7a2 2 0 002 2z"
              />
            </svg>
            <time dateTime={article.publishedAt}>
              {article.publishedAt
                ? new Date(article.publishedAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "Unknown date"}
            </time>
          </div>

          <div className="mt-4 text-slate-400 text-xs">
            Source: {article.source?.name || "Unknown"}
          </div>
        </div>
      </a>
    </article>
  );
}

export default NewsCard;
