export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  fullText: string;
  category: string;
  imageUrl: string;
  date: string;
  source: string;
  views: number;
  likes: number;
  commentsCount: number;
  shares?: number;
  trendingScore?: number;
  createdAt?: number;
  authorId?: string;
  authorHandle?: string;
}

export interface WeatherCity {
  id: string;
  city: string;
  temp: number;
  condition: string;
  icon: string;
}

export interface OpinionPoll {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
    votes: number;
  }[];
  createdAt: number;
  isActive: boolean;
}
