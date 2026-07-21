"use client";

import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  Calendar,
  CloudSun,
  Clock,
  ChevronRight,
  User,
  Menu
} from "lucide-react";
import { NewsArticle } from "../types";
import { mockArticles, mockWeather } from "../data";
import { getMarathiDateString, getMarathiTimeString } from "../lib/dateUtils";
import { BreakingNewsTicker } from "./BreakingNewsTicker";
import { OpinionPollCard } from "./OpinionPollCard";

const categories = [
  "सर्व",
  "महाराष्ट्र",
  "इतिहास",
  "राजकारण",
  "संपादकीय",
  "मनोरंजन",
  "राष्ट्रीय"
];

const Homepage: React.FC = () => {
  const [articles] = useState<NewsArticle[]>(mockArticles);
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("सर्व");
  const [visibleCount, setVisibleCount] = useState<number>(10);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [selectedDateStr, setSelectedDateStr] = useState<string>("");

  // Real-time Marathi running clock
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setSelectedDateStr(getMarathiDateString(now));
      setCurrentTime(getMarathiTimeString(now));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter + sort whenever the category changes
  useEffect(() => {
    setVisibleCount(10);
    if (selectedCategory === "सर्व") {
      const sortedByScore = [...articles].sort((a, b) => (b.trendingScore || 0) - (a.trendingScore || 0));
      setFilteredArticles(sortedByScore);
    } else {
      const sortedByDate = articles
        .filter((a) => a.category === selectedCategory)
        .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      setFilteredArticles(sortedByDate);
    }
  }, [selectedCategory, articles]);

  // TODO: wire these up to your own routes (e.g. Next.js <Link href={`/article/${art.id}`} />)
  const handleViewArticle = (_art: NewsArticle) => {};
  const handleViewAuthor = (_art: NewsArticle) => {};
  const goHome = () => {};
  const openMenu = () => {};
  const openAdmin = () => {};

  return (
    <div className="min-h-screen bg-[#fbfcfa] text-slate-800 font-sans selection:bg-red-700 selection:text-white pb-12">

      {/* 1. TOP UTILITY HEADER RAIL */}
      <div className="bg-slate-900 text-slate-350 text-xs py-2 px-4 shadow-sm border-b border-slate-800 select-none">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <button
              onClick={openMenu}
              className="p-1 hover:bg-slate-800 rounded transition-colors cursor-pointer text-slate-400 hover:text-white"
              title="Main Menu"
            >
              <Menu className="h-4 w-4" />
            </button>
            <span className="font-mono text-[10px] text-red-500 font-bold bg-red-950/50 px-2 py-0.5 rounded border border-red-900/30">
              आवृत्ती: डिजिटल विशेष (siteget.in)
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              {selectedDateStr || "८ जून २०२६"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded text-white font-mono font-bold">
              <Clock className="h-3 w-3 text-red-400 animate-pulse" />
              {currentTime || "१:०४:०० PM"}
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-[10px] uppercase font-bold text-slate-400">
              सत्यशोधक व पारदर्शक पत्रकारिता
            </span>
            <button
              onClick={openAdmin}
              className="p-1 hover:bg-slate-800 rounded transition-colors cursor-pointer text-slate-400 hover:text-white ml-2"
              title="Editorial Login"
            >
              <User className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. BRAND MASTHEAD PLATE */}
      <header
        className="max-w-7xl mx-auto px-4 py-6 text-center select-none cursor-pointer"
        onClick={goHome}
      >
        <div className="flex flex-col items-center justify-center space-y-1">
          <h1 className="font-serif font-black text-5xl md:text-6xl tracking-tight text-gray-900 hover:scale-[1.01] transition-transform duration-300">
            देशाचे लोक
          </h1>
          <p className="text-xs md:text-sm font-serif font-medium text-red-800 tracking-wider">
            सार्वभौमिक व पुरोगामी विचारांचे अग्रगण्य मराठी वृत्त व्यासपीठ
          </p>
        </div>

        <div className="news-border-double news-border-top-double mt-5 py-2.5 flex flex-col md:flex-row items-center justify-between text-xs text-gray-600 font-semibold gap-3">
          <div>पुणे, मुंबई आणि संपूर्ण महाराष्ट्र • वर्ष १ • अंक ७२</div>
          <div className="font-serif italic text-gray-500">&quot;समृद्ध विचारांचा लोकपंथ&quot;</div>
          <div>डिजिटल कल्पकता: siteget.in • विनामूल्य आवृत्ती</div>
        </div>
      </header>

      {/* 3. BREAKING NEWS TICKER */}
      <section className="max-w-7xl mx-auto px-4">
        <BreakingNewsTicker articles={articles} onSelectArticle={handleViewArticle} />
      </section>

      {/* 4. CATEGORY NAVIGATION BAR */}
      <nav className="max-w-7xl mx-auto px-4 mt-6">
        <div className="bg-white border-y border-gray-200 py-1 flex items-center overflow-x-auto select-none scrollbar-thin scrollbar-thumb-slate-200">
          <div className="flex mx-auto gap-1 py-1.5 px-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-sm font-bold font-serif whitespace-nowrap transition-all duration-150 rounded-lg cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-red-700 text-white shadow"
                    : "text-gray-700 hover:text-red-700 hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* 5. MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* LEFT 2 COLUMNS: FEATURED & FEED NEWS */}
          <div className="lg:col-span-2 space-y-8">

            <div className="border-b-2 border-red-700 pb-2 flex items-center justify-between select-none">
              <h2 className="font-serif font-black text-xl text-gray-900 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-red-700 animate-pulse" />
                {selectedCategory === "सर्व" ? "प्रथम मुखपृष्ठ घडामोडी" : `${selectedCategory} विभाग विशेष`}
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-gray-500 font-bold uppercase tracking-wider">
                आत्ताचे ताजे अपडेट्स
              </div>
            </div>

            {selectedCategory === "सर्व" ? (
              <div className="space-y-6">
                {/* 1. Hero Card - Top 1 Trending */}
                {filteredArticles.length > 0 && (
                  <article
                    className="bg-white group cursor-pointer border-b border-gray-200 pb-6"
                    onClick={() => handleViewArticle(filteredArticles[0])}
                  >
                    <div className="w-full h-[250px] md:h-[400px] rounded-xl overflow-hidden mb-4">
                      <img
                        src={filteredArticles[0].imageUrl}
                        alt={filteredArticles[0].title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <span className="text-[14px] font-bold text-gray-800">{filteredArticles[0].category}</span>
                      <h3 className="font-sans font-black text-gray-900 text-[28px] md:text-[36px] leading-[1.2] group-hover:text-red-700 transition-colors tracking-tight">
                        {filteredArticles[0].title}
                      </h3>
                      <div className="flex items-center gap-2 text-[13px] text-gray-500 font-medium py-1">
                        <span
                          className="flex items-center gap-1 text-gray-700 bg-gray-100 rounded-full px-2 py-0.5 cursor-pointer hover:bg-gray-200 transition-colors"
                          onClick={(e) => { e.stopPropagation(); handleViewAuthor(filteredArticles[0]); }}
                        >
                          <User className="w-3 h-3" /> {filteredArticles[0].source}
                          {filteredArticles[0].authorHandle && <span className="opacity-60 hidden sm:inline ml-0.5">𝕏 {filteredArticles[0].authorHandle}</span>}
                        </span>
                        <span>•</span>
                        <span>{filteredArticles[0].date}</span>
                      </div>
                      <p className="text-[16px] text-gray-600 font-serif leading-[1.6] line-clamp-3">
                        {filteredArticles[0].excerpt}
                      </p>
                    </div>
                  </article>
                )}

                {/* 2. Medium Featured Cards - Rank 2-4 */}
                {filteredArticles.length > 1 && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-b border-gray-200 pb-6">
                    {filteredArticles.slice(1, 4).map((art) => (
                      <article
                        key={art.id}
                        className="bg-white group cursor-pointer flex flex-col"
                        onClick={() => handleViewArticle(art)}
                      >
                        <div className="w-full h-40 rounded-lg overflow-hidden mb-3">
                          <img
                            src={art.imageUrl}
                            alt={art.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <span className="text-[12px] font-bold text-gray-800 mb-1">{art.category}</span>
                        <h4 className="font-sans font-bold text-gray-900 text-[18px] leading-[1.3] line-clamp-3 group-hover:text-red-700 transition-colors mb-2">
                          {art.title}
                        </h4>
                        <div className="mt-auto flex items-center gap-2 text-[11px] text-gray-500 font-medium pt-2">
                          <span
                            className="truncate max-w-[60%] flex items-center gap-1 cursor-pointer hover:bg-gray-100 rounded px-1 -ml-1 transition-colors"
                            onClick={(e) => { e.stopPropagation(); handleViewAuthor(art); }}
                          >
                            <User className="w-3 h-3" /> {art.source}
                            {art.authorHandle && <span className="opacity-60 hidden sm:inline ml-0.5">𝕏 {art.authorHandle}</span>}
                          </span>
                          <span>•</span>
                          <span>{art.date}</span>
                        </div>
                      </article>
                    ))}
                  </div>
                )}

                {/* 3. Compact Horizontal Cards - Rank 5-7 */}
                {filteredArticles.length > 4 && (
                  <div className="space-y-6 border-b border-gray-200 pb-6">
                    {filteredArticles.slice(4, 7).map((art) => (
                      <article
                        key={art.id}
                        className="group flex gap-4 bg-white items-start cursor-pointer"
                        onClick={() => handleViewArticle(art)}
                      >
                        <div className="w-[120px] h-[80px] md:w-[200px] md:h-[130px] shrink-0 rounded-lg overflow-hidden">
                          <img src={art.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" alt={art.title} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="mb-0.5">
                            <span className="text-[12px] font-bold text-gray-800">{art.category}</span>
                          </div>
                          <h4 className="font-sans font-bold text-gray-900 text-[16px] md:text-[20px] leading-[1.3] line-clamp-3 group-hover:text-red-700 transition-colors mb-2">
                            {art.title}
                          </h4>
                          <div className="flex items-center gap-2 text-[11px] md:text-[12px] text-gray-500 font-medium">
                            <span
                              className="truncate flex items-center gap-1 cursor-pointer hover:bg-gray-100 rounded px-1 -ml-1 transition-colors"
                              onClick={(e) => { e.stopPropagation(); handleViewAuthor(art); }}
                            >
                              <User className="w-3 h-3" /> {art.source}
                              {art.authorHandle && <span className="opacity-60 hidden sm:inline ml-0.5">𝕏 {art.authorHandle}</span>}
                            </span>
                            <span>•</span>
                            <span>{art.date}</span>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                )}

                {/* 4. Headline Lists - Rank 8+ */}
                {filteredArticles.length > 7 && (
                  <div className="space-y-5">
                    {filteredArticles.slice(7, Math.max(7, visibleCount)).map((art) => (
                      <article
                        key={art.id}
                        className="group bg-white flex flex-col justify-center cursor-pointer border-b border-gray-150 last:border-0 pb-5"
                        onClick={() => handleViewArticle(art)}
                      >
                        <span className="text-[12px] font-bold text-gray-800 mb-1">{art.category}</span>
                        <h4 className="font-sans font-bold text-gray-900 text-[16px] md:text-[18px] leading-[1.35] line-clamp-2 group-hover:text-red-700 transition-colors mb-1.5">
                          {art.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-gray-500 font-medium">
                          <span
                            className="flex items-center gap-1 cursor-pointer hover:bg-gray-100 rounded px-1 -ml-1 transition-colors"
                            onClick={(e) => { e.stopPropagation(); handleViewAuthor(art); }}
                          >
                            <User className="w-3 h-3" /> {art.source}
                            {art.authorHandle && <span className="opacity-60 hidden sm:inline ml-0.5">𝕏 {art.authorHandle}</span>}
                          </span>
                          <span>•</span>
                          <span>{art.date}</span>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* Normal Categorized Feed Row list */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredArticles.slice(0, visibleCount).map((art) => (
                  <article
                    key={art.id}
                    className="bg-white border border-gray-200 hover:border-gray-300 rounded-xl overflow-hidden shadow-2xs hover:shadow-sm transition-all duration-300 flex flex-col justify-between h-[380px]"
                  >
                    <div>
                      <div className="relative h-44 overflow-hidden select-none">
                        <img
                          src={art.imageUrl}
                          alt={art.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover hover:scale-102 transition-transform duration-300 cursor-pointer"
                          onClick={() => handleViewArticle(art)}
                        />
                        <span className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[9px] font-sans font-extrabold uppercase px-2 py-0.5 rounded tracking-wider">
                          {art.category}
                        </span>
                      </div>
                      <div className="p-4 space-y-1.5">
                        <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 select-none">
                          <span
                            className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded flex items-center gap-1 truncate cursor-pointer hover:bg-gray-200 transition-colors"
                            onClick={(e) => { e.stopPropagation(); handleViewAuthor(art); }}
                          >
                            {art.source}
                            {art.authorHandle && <span className="opacity-60">𝕏 {art.authorHandle}</span>}
                          </span>
                          <span>{art.date}</span>
                        </div>
                        <h4
                          onClick={() => handleViewArticle(art)}
                          className="font-serif font-bold text-gray-900 text-[15px] leading-snug line-clamp-2 hover:text-red-700 cursor-pointer transition-colors"
                        >
                          {art.title}
                        </h4>
                        <p className="text-xs text-gray-600 font-serif line-clamp-3 leading-relaxed">
                          {art.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 pt-1 border-t border-gray-100 flex items-center justify-between text-xs select-none">
                      <span className="text-gray-400 font-mono font-medium">
                        वाचले: {art.views + Math.floor(art.likes * 1.5)}
                      </span>
                      <button
                        onClick={() => handleViewArticle(art)}
                        className="text-red-700 hover:text-red-800 font-bold flex items-center gap-0.5 cursor-pointer"
                      >
                        अधिक वाचा
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </article>
                ))}

                {filteredArticles.length === 0 && (
                  <div className="col-span-full bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center text-gray-500 font-serif select-none">
                    या विभागात सध्या कोणतीही बातमी उपलब्ध नाही.
                  </div>
                )}
              </div>
            )}

            {/* Load More Button */}
            {filteredArticles.length > visibleCount && (
              <div className="mt-8 flex justify-center space-x-2">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 10)}
                  className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 font-bold text-sm rounded-full shadow-sm hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-center min-w-[150px]"
                >
                  आणखी बातम्या पहा (See More)
                </button>
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-8 lg:sticky lg:top-4">

            <div id="weather-sidebar-card" className="bg-white border border-gray-250 rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-150 pb-3 mb-4 select-none">
                <h4 className="font-serif font-bold text-gray-900 flex items-center gap-1.5">
                  <CloudSun className="h-5 w-5 text-sky-600" />
                  हवामान वृत्त (Maharashtra Weather)
                </h4>
                <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  तपशीलवार
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {mockWeather.map((c, i) => (
                  <div key={i} className="bg-slate-50 border border-gray-150 p-2.5 rounded-lg text-center space-y-0.5 select-none">
                    <span className="text-xs font-serif font-bold text-gray-800 block">{c.city}</span>
                    <span className="text-base font-mono font-bold text-orange-600 block">{c.temp}°C {c.icon}</span>
                    <span className="text-[10px] text-gray-500 block truncate font-medium font-serif">{c.condition}</span>
                  </div>
                ))}
              </div>

              <div className="text-[10px] text-slate-400 font-serif italic text-center mt-3 select-none">
                *अग्रोवन हवामान तज्ज्ञांकडून मिळालेली अधिकृत आकडेवारी.
              </div>
            </div>

            <OpinionPollCard />

          </aside>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 mt-16 pt-8 max-w-7xl mx-auto px-4 text-center select-none">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-gray-150 pb-8 text-sm text-gray-500">
          <div className="space-y-2">
            <h5 className="font-serif font-black text-gray-800 uppercase tracking-widest text-xs">देशाचे लोक</h5>
            <p className="text-xs font-serif leading-relaxed text-justify md:text-center text-gray-600">
              प्रत्येक मराठी मनाचा आवाज, महाराष्ट्रातील अस्सल घडामोडी, कृषी क्रांती, क्रीडा व संपन्न संस्कृतीचे साक्षीदार. आम्ही सत्य आणि केवळ सत्य शोधण्याचे व्रत अंगीकारले आहे.
            </p>
          </div>
          <div className="space-y-2">
            <h5 className="font-serif font-black text-gray-800 uppercase tracking-widest text-xs">विभाग सखोलता</h5>
            <div className="flex flex-wrap justify-center gap-2 text-xs">
              <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded">महाराष्ट्र</span>
              <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded">इतिहास</span>
              <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded">राजकारण</span>
              <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded">संपादकीय विशेष</span>
              <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded">मनोरंजन रंग</span>
            </div>
          </div>
          <div className="space-y-2">
            <h5 className="font-serif font-black text-gray-800 uppercase tracking-widest text-xs">डिजिटल हब</h5>
            <p className="text-xs text-gray-600 leading-relaxed text-justify md:text-center">
              आमच्याशी जुडून राहण्यासाठी आणि ताज्या घडामोडी ई-मेलवर मिळवण्यासाठी <strong className="text-red-700 font-sans">siteget.in</strong> वर आजच आपल्या नावाची नोंदणी करा.
            </p>
          </div>
        </div>

        <div className="pt-6 text-xs text-gray-400 font-semibold uppercase tracking-wider space-y-1">
          <p>© २०२६ देशाचे लोक (siteget.in). सर्व हक्क सुरक्षित.</p>
          <p className="font-serif italic capitalize text-[10px] text-gray-450 font-normal">
            हे एक प्रगत आणि विश्वासार्ह डिजिटल वृत्तपत्र प्रणाली मॉडेल आहे.
          </p>
        </div>
      </footer>

    </div>
  );
};

export default Homepage;
