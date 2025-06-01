
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import Trending from "./pages/Trending";
import EditorsPicks from "./pages/EditorsPicks";
import Videos from "./pages/Videos";
import Markets from "./pages/Markets";
import Portfolio from "./pages/Portfolio";
import Strategy from "./pages/Strategy";




function App() {
  return (
    <Router>
      <div className="bg-gradient-to-br from-slate-900 to-black min-h-screen text-white">
        <Navbar />

        <main className="pt-20 px-4 md:px-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/editors-picks" element={<EditorsPicks />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/markets" element={<Markets />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/strategy" element={<Strategy />} />
          </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
