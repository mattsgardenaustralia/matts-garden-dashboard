import React, { useState, useEffect } from 'react';
import { TabId, AccountMetrics, Video, Trend, Competitor, ContentIdea, Alert, VideoIdea } from './types';
import { Sidebar } from './components/Sidebar';
import { ProfileScoreHeader } from './components/ProfileScoreHeader';
import { AccountOverview } from './components/AccountOverview';
import { VideoTracker } from './components/VideoTracker';
import { TrendEngine } from './components/TrendEngine';
import { ContentIdeas } from './components/ContentIdeas';
import { ContentStrategy } from './components/ContentStrategy';
import { CompetitorTracker } from './components/CompetitorTracker';
import { ExportPanel } from './components/ExportPanel';
import { FutureGrowth } from './components/FutureGrowth';
import { TitleChecker } from './components/TitleChecker';
import { BrandDeals } from './components/BrandDeals';
import { OutreachPipeline } from './components/OutreachPipeline';
import { VideoIdeas as VideoIdeasTab } from './components/VideoIdeas';
import { generateAccountMetrics, generateVideos, generateTrends, generateCompetitors, generateContentIdeas, generateAlerts } from './utils/sampleData';

interface LiveData {
  lastSynced: string;
  profile: {
    id: string; username: string; nickname: string;
    followerCount: number; followingCount: number; likeCount: number;
    postCount: number | null; isVerified: boolean; signature: string; avatarUrl: string;
  };
  posts?: Array<any>;
  history: Array<{ date: string; followers: number; totalLikes: number }>;
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [metrics, setMetrics] = useState<AccountMetrics[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [trends, setTrends] = useState<Trend[]>([]);
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [ideas, setIdeas] = useState<ContentIdea[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [liveData, setLiveData] = useState<LiveData | null>(null);
  const [videoIdeas, setVideoIdeas] = useState<VideoIdea[]>(() => {
    try { return JSON.parse(localStorage.getItem('mgd_video_ideas') || '[]'); } catch { return []; }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem('mgd_video_ideas', JSON.stringify(videoIdeas));
  }, [videoIdeas]);

  const handleAddVideoIdea = (idea: VideoIdea) => {
    setVideoIdeas(prev => {
      if (prev.some(i => i.id === idea.id)) return prev;
      return [...prev, idea];
    });
  };

  const handleRemoveVideoIdea = (id: string) => {
    setVideoIdeas(prev => prev.filter(i => i.id !== id));
  };

  useEffect(() => {
    const init = async () => {
      const m = generateAccountMetrics();
      const v = generateVideos();
      const t = generateTrends();
      const c = generateCompetitors();
      const ci = generateContentIdeas();
      const a = generateAlerts();

      try {
        const base = import.meta.env.BASE_URL || '/';
        const res = await fetch(`${base}live-data.json`);
        if (res.ok) {
          const live: LiveData = JSON.parse(await res.text());
          setLiveData(live);
          if (m.length > 0 && live.profile) {
            m[m.length - 1].followers = live.profile.followerCount;
            m[m.length - 1].totalLikes = live.profile.likeCount;
          }
        }
      } catch (e) {
        console.log('No live data, using sample');
      }

      setMetrics(m); setVideos(v); setTrends(t); setCompetitors(c); setIdeas(ci); setAlerts(a);
      setLoading(false);
    };
    init();
  }, []);

  const handleMarkIdeaUsed = (id: string) => {
    setIdeas(prev => prev.map(i => i.id === id ? { ...i, used: !i.used } : i));
  };

  if (loading) {
    return (
      <div style={{height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#0f172a'}}>
        <div style={{textAlign:'center',color:'#94a3b8'}}>
          <div style={{fontSize:32}}>🌱</div>
          <p style={{marginTop:12}}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const latest = metrics[metrics.length - 1];
  const myEngagement = latest ? latest.engagementRate : 0;
  const myFollowers = latest ? latest.followers : 0;

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <AccountOverview metrics={metrics} videos={videos} alerts={alerts} />;
      case 'videos': return <VideoTracker videos={videos} />;
      case 'trends': return <TrendEngine trends={trends} onAddVideoIdea={handleAddVideoIdea} videoIdeas={videoIdeas} />;
      case 'ideas': return <ContentIdeas ideas={ideas} onMarkUsed={handleMarkIdeaUsed} />;
      case 'strategy': return <ContentStrategy videos={videos} trends={trends} />;
      case 'competitors': return <CompetitorTracker competitors={competitors} myFollowers={myFollowers} myEngagement={myEngagement} />;
      case 'growth': return <FutureGrowth metrics={metrics} videos={videos} />;
      case 'brands': return <BrandDeals />;
      case 'checker': return <TitleChecker />;
      case 'outreach': return <OutreachPipeline />;
      case 'videoideas': return <VideoIdeasTab ideas={videoIdeas} onRemove={handleRemoveVideoIdea} />;
      case 'reports': return <ExportPanel videos={videos} trends={trends} competitors={competitors} ideas={ideas} metrics={metrics} />;
      default: return null;
    }
  };

  return (
    <div className="h-screen flex bg-base-100 text-base-content overflow-hidden">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} alerts={alerts} />
      <main className="flex-1 overflow-y-auto p-6">
        <ProfileScoreHeader metrics={metrics} videos={videos} liveData={liveData} />
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
