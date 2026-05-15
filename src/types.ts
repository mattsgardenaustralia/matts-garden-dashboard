export type TabId = 'overview' | 'videos' | 'trends' | 'ideas' | 'videoideas' | 'strategy' | 'competitors' | 'promotions' | 'growth' | 'brands' | 'checker' | 'outreach' | 'reports';

export interface VideoIdea {
  id: string;
  sourceKeyword: string;
  title: string;
  hook: string;
  concept: string;
  scriptOutline: string;
  caption: string;
  hashtags: string[];
  format: string;
  cta: string;
  duration: string;
  bestTimeToPost: string;
  viralPotential: number;
  addedAt: string;
}

export interface AccountMetrics {
  date: string;
  followers: number;
  totalLikes: number;
  totalShares: number;
  totalComments: number;
  profileViews: number;
  totalViews: number;
  engagementRate: number;
  avgWatchTime: number;
  retentionPct: number;
}

export interface Video {
  id: string;
  title: string;
  caption: string;
  uploadDate: string;
  videoLink: string;
  videoLength: number;
  topic: string;
  hashtags: string[];
  views: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  watchTime: number;
  retentionPct: number;
  followersGained: number;
  trafficSource: string;
  hookText: string;
  thumbnailText: string;
  performanceScore: number;
  viralityScore: number;
  seoScore: number;
  hookScore: number;
  retentionScore: number;
}

export interface Trend {
  id: string;
  keyword: string;
  category: string;
  trendType: string;
  growthPct: number;
  competition: string;
  viralPotential: number;
  suggestedHook: string;
  suggestedCaption: string;
  suggestedHashtags: string[];
  suggestedTitle: string;
  bestFormat: string;
  suggestedCta: string;
  updatedAt: string;
}

export interface Competitor {
  handle: string;
  name: string;
  followers: number;
  engagementRate: number;
  avgViews: number;
  postingFrequency: string;
  topTopics: string[];
  lastUpdated: string;
}

export interface ContentIdea {
  id: string;
  category: string;
  title: string;
  hook: string;
  caption: string;
  hashtags: string[];
  thumbnailText: string;
  videoStructure: string;
  viralPotential: number;
  idealLength: string;
  bestTime: string;
  seasonal: string;
  used: boolean;
}

export interface Promotion {
  id: string;
  videoId: string;
  videoTitle: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'paused';
  objective: 'views' | 'followers' | 'website' | 'profile_visits';
  budgetAud: number;
  spentAud: number;
  impressions: number;
  views: number;
  profileVisits: number;
  followersGained: number;
  likes: number;
  comments: number;
  shares: number;
  websiteClicks: number;
  cpm: number;
  cpv: number;
  cpf: number;
  ctr: number;
  targetAudience: string;
  ageRange: string;
  gender: string;
  locations: string[];
  roiScore: number;
}

export type BrandStatus = 'not_contacted' | 'contacted' | 'in_talks' | 'partnered' | 'declined';
export type BrandCategory = 'Seeds & Seedlings' | 'Soil & Fertiliser' | 'Garden Beds & Planters' | 'Tools & Equipment' | 'Pest & Weed Control' | 'Watering & Irrigation' | 'Composting & Worms' | 'Organic Products' | 'Garden Decor' | 'Education & Community';

export interface Brand {
  id: string;
  name: string;
  category: BrandCategory;
  website: string;
  description: string;
  australianOwned: boolean;
  australianMade: boolean;
  hasInfluencerProgram: boolean;
  hasAffiliateProgram: boolean;
  acceptsMicro: boolean;
  socialPresence: { tiktok?: string; instagram?: string; facebook?: string };
  estimatedFit: number;
  contactEmail: string;
  contactMethod: string;
  tags: string[];
  notes: string;
  status: BrandStatus;
  lastContactDate: string | null;
  dealType: string | null;
}

export interface Alert {
  id: string;
  type: 'trend' | 'performance' | 'competitor' | 'seasonal' | 'engagement';
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'success' | 'error';
  timestamp: string;
  read: boolean;
}
