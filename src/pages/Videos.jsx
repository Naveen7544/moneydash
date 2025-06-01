import React from "react";

const videoLinks = [
  {
    title: "Nifty & Sensex Market Outlook",
    url: "https://www.youtube.com/embed/B4UpEX1EKJ4",
  },
  {
    title: "Stock Market Today: Big Movers",
    url: "https://www.youtube.com/embed/2r1C6dL8Y_g",
  },
  {
    title: "How to Analyze Stocks Like a Pro",
    url: "https://www.youtube.com/embed/ax9Te1-W5Kc",
  },
];

export default function Videos() {
  return (
    <main className="p-8 pt-6">
      <h2 className="text-3xl font-bold text-emerald-400 mb-6">Market Videos</h2>
      <p className="text-slate-300 mb-6">Watch the latest stock market video analysis and financial news.</p>
      
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {videoLinks.map((video, idx) => (
          <div key={idx} className="rounded-xl overflow-hidden shadow-md">
            <iframe
              className="w-full aspect-video"
              src={video.url}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <p className="mt-2 text-center text-slate-200">{video.title}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
