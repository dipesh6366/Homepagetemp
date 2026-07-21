"use client";

import React from 'react';
import { Flame } from 'lucide-react';
import { NewsArticle } from '../types';

interface BreakingNewsTickerProps {
  articles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
}

export const BreakingNewsTicker: React.FC<BreakingNewsTickerProps> = ({ articles, onSelectArticle }) => {
  return (
    <div className="bg-red-700 text-white px-2 md:px-4 py-2 flex items-center overflow-hidden">
      <div className="flex items-center gap-2 font-bold whitespace-nowrap bg-red-900 px-3 py-1 mr-4 rounded shadow-sm z-10 shrink-0">
        <Flame className="h-4 w-4 animate-pulse" />
        ताज्या घडामोडी
      </div>
      <div className="flex-1 overflow-hidden relative h-5 flex items-center">
        <div className="whitespace-nowrap animate-marquee flex items-center gap-6 text-sm font-medium tracking-wide">
          {articles.length > 0 ? (
            articles.map((art) => (
              <span
                key={`ticker-${art.id}`}
                className="cursor-pointer hover:underline"
                onClick={() => onSelectArticle(art)}
              >
                • {art.title}
              </span>
            ))
          ) : (
            <span>• राज्यभरात मान्सूनपूर्व पावसाची हजेरी • दहावी-बारावीच्या पुरवणी परीक्षांच्या तारखा जाहीर • सेंसेक्स आणि निफ्टीमध्ये मोठी उसळी, गुंतवणूकदारांना दिलासा</span>
          )}
        </div>
      </div>
    </div>
  );
};
