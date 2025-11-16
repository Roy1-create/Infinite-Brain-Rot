import { useState, useEffect, useCallback, useRef } from "react";
import "../App.css";

interface NewsArticle {
  id: string;
  title: string;
  author: string;
  source: string;
  content: string;
  timestamp: string;
  image?: string;
  url?: string;
}

interface NewsSectionProps {
  outlet: "cnn" | "nytimes" | "bloomberg";
  gradient: string;
}

function NewsSection({ outlet, gradient }: NewsSectionProps) {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef(0);

  const generateMockArticles = (outlet: string): NewsArticle[] => {
    if (outlet === "cnn") {
      return [
        {
          id: "1",
          title: "Breaking: Major Tech Innovation Announced",
          author: "Tech Correspondent",
          source: "CNN",
          content: "A groundbreaking new technology has been unveiled that could revolutionize the way we interact with digital content. Industry leaders are calling it a game-changer.",
          timestamp: "1h",
          image: "📺",
        },
        {
          id: "2",
          title: "Global Markets React to Economic News",
          author: "Business Reporter",
          source: "CNN",
          content: "Financial markets around the world showed significant movement today following the latest economic indicators. Analysts are watching closely for trends.",
          timestamp: "3h",
          image: "📈",
        },
        {
          id: "3",
          title: "Climate Summit Reaches Historic Agreement",
          author: "Environment Editor",
          source: "CNN",
          content: "World leaders have reached a consensus on new climate policies that aim to reduce carbon emissions by 50% over the next decade.",
          timestamp: "5h",
          image: "🌍",
        },
        {
          id: "4",
          title: "Sports: Championship Game Preview",
          author: "Sports Analyst",
          source: "CNN",
          content: "The highly anticipated championship match is set for this weekend. Experts weigh in on what to expect from both teams.",
          timestamp: "7h",
          image: "⚽",
        },
      ];
    } else if (outlet === "nytimes") {
      return [
        {
          id: "1",
          title: "In-Depth Analysis: The Future of Journalism",
          author: "Editorial Staff",
          source: "The New York Times",
          content: "As the media landscape continues to evolve, we examine how traditional journalism is adapting to new technologies and changing reader expectations.",
          timestamp: "2h",
          image: "📰",
        },
        {
          id: "2",
          title: "Arts & Culture: Museum Opens New Exhibition",
          author: "Culture Critic",
          source: "The New York Times",
          content: "A major art museum has unveiled its latest collection, featuring works from contemporary artists exploring themes of identity and belonging.",
          timestamp: "4h",
          image: "🎨",
        },
        {
          id: "3",
          title: "Politics: Policy Changes Announced",
          author: "Political Reporter",
          source: "The New York Times",
          content: "New legislation has been introduced that could have far-reaching effects on healthcare and education systems nationwide.",
          timestamp: "6h",
          image: "🏛️",
        },
        {
          id: "4",
          title: "Science: Breakthrough in Medical Research",
          author: "Science Writer",
          source: "The New York Times",
          content: "Researchers have made significant progress in understanding a complex disease, opening new possibilities for treatment options.",
          timestamp: "8h",
          image: "🔬",
        },
      ];
    } else if (outlet === "bloomberg") {
      return [
        {
          id: "1",
          title: "Market Update: Stocks Rally on Strong Earnings",
          author: "Market Analyst",
          source: "Bloomberg",
          content: "Major indices closed higher today as several tech companies reported better-than-expected quarterly earnings, boosting investor confidence.",
          timestamp: "1h",
          image: "💹",
        },
        {
          id: "2",
          title: "Corporate News: Merger Announcement",
          author: "Business Reporter",
          source: "Bloomberg",
          content: "Two industry giants have announced plans to merge, creating one of the largest companies in the sector. The deal is expected to close next quarter.",
          timestamp: "3h",
          image: "🏢",
        },
        {
          id: "3",
          title: "Technology: AI Investment Surges",
          author: "Tech Reporter",
          source: "Bloomberg",
          content: "Venture capital funding for artificial intelligence startups has reached record levels this quarter, signaling strong investor interest in the sector.",
          timestamp: "5h",
          image: "🤖",
        },
        {
          id: "4",
          title: "Energy: Renewable Energy Milestone",
          author: "Energy Correspondent",
          source: "Bloomberg",
          content: "Renewable energy sources have now surpassed fossil fuels in electricity generation for the first time in several major markets.",
          timestamp: "7h",
          image: "⚡",
        },
      ];
    } else {
      return [];
    }
  };

  const fetchArticles = useCallback(async () => {
    try {
      // For now, use mock data
      // In the future, this could fetch real news from APIs
      const mockArticles = generateMockArticles(outlet);
      setTimeout(() => {
        setArticles(mockArticles);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error(`Error fetching ${outlet} articles:`, error);
      const mockArticles = generateMockArticles(outlet);
      setArticles(mockArticles);
      setIsLoading(false);
    }
  }, [outlet]);

  useEffect(() => {
    setIsLoading(true);
    fetchArticles();

    // Set up auto-refresh every 30 seconds
    const refreshInterval = setInterval(() => {
      fetchArticles();
    }, 30000);

    return () => clearInterval(refreshInterval);
  }, [outlet, fetchArticles]);

  // Auto-scroll functionality - optimized for VisionOS
  useEffect(() => {
    if (isLoading || !scrollContainerRef.current || articles.length === 0) {
      return;
    }

    const container = scrollContainerRef.current;
    const scrollSpeed = 0.8; // pixels per frame (smooth scroll)
    let animationFrameId: number;
    let isPaused = false;
    let isUserInteracting = false;

    const autoScroll = () => {
      if (isPaused || isUserInteracting) {
        animationFrameId = requestAnimationFrame(autoScroll);
        return;
      }

      scrollPositionRef.current += scrollSpeed;
      container.scrollTop = scrollPositionRef.current;

      const maxScroll = container.scrollHeight - container.clientHeight;
      
      if (scrollPositionRef.current >= maxScroll - 1) {
        // Smoothly reset to top for continuous loop
        scrollPositionRef.current = 0;
        container.scrollTop = 0;
      }

      animationFrameId = requestAnimationFrame(autoScroll);
    };

    // Pause on interaction (mouse, touch, pointer events for VisionOS compatibility)
    const handleInteractionStart = () => {
      isPaused = true;
      isUserInteracting = true;
    };

    const handleInteractionEnd = () => {
      isUserInteracting = false;
      // Wait a bit before resuming to avoid immediate restart
      setTimeout(() => {
        if (!isUserInteracting) {
          isPaused = false;
          scrollPositionRef.current = container.scrollTop;
        }
      }, 500);
    };

    // Mouse events (for desktop/browser)
    container.addEventListener('mouseenter', handleInteractionStart);
    container.addEventListener('mouseleave', handleInteractionEnd);
    
    // Touch events (for mobile/VisionOS)
    container.addEventListener('touchstart', handleInteractionStart, { passive: true });
    container.addEventListener('touchend', handleInteractionEnd, { passive: true });
    
    // Pointer events (for VisionOS and modern browsers)
    container.addEventListener('pointerenter', handleInteractionStart);
    container.addEventListener('pointerleave', handleInteractionEnd);
    
    // Pause on scroll (user manually scrolling)
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      isPaused = true;
      isUserInteracting = true;
      scrollPositionRef.current = container.scrollTop;
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isUserInteracting = false;
        isPaused = false;
      }, 1000);
    };
    container.addEventListener('scroll', handleScroll, { passive: true });

    // Start auto-scrolling after a short delay
    const startDelay = setTimeout(() => {
      scrollPositionRef.current = container.scrollTop;
      autoScroll();
    }, 1000);

    return () => {
      clearTimeout(startDelay);
      clearTimeout(scrollTimeout);
      container.removeEventListener('mouseenter', handleInteractionStart);
      container.removeEventListener('mouseleave', handleInteractionEnd);
      container.removeEventListener('touchstart', handleInteractionStart);
      container.removeEventListener('touchend', handleInteractionEnd);
      container.removeEventListener('pointerenter', handleInteractionStart);
      container.removeEventListener('pointerleave', handleInteractionEnd);
      container.removeEventListener('scroll', handleScroll);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isLoading, articles.length]);

  return (
    <div className="stream-section-container" style={{ background: gradient }} enable-xr>
      <div 
        className="stream-section-content"
        ref={scrollContainerRef}
      >
        {isLoading ? (
          <div className="stream-section-loading">
            <div className="loading-spinner-small"></div>
          </div>
        ) : (
          <div className="stream-section-posts">
            {articles.map((article) => (
              <div key={article.id} className="stream-section-post" enable-xr>
                <div className="stream-section-post-header">
                  <div className="stream-section-avatar">{article.image || "📰"}</div>
                  <div className="stream-section-author">
                    <div className="stream-section-author-name">{article.source}</div>
                    <div className="stream-section-author-handle">{article.author}</div>
                  </div>
                  <div className="stream-section-timestamp">{article.timestamp}</div>
                </div>

                <div className="stream-section-post-content">
                  <h3 style={{ margin: "0 0 0.75rem 0", color: "#333", fontSize: "1.1rem", fontWeight: "700" }}>
                    {article.title}
                  </h3>
                  <p>{article.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default NewsSection;

