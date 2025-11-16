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
    // Helper function to get static image based on article title keywords
    const getImageForTitle = (title: string, articleId: string): string => {
      const lowerTitle = title.toLowerCase();
      const idNum = parseInt(articleId) || 1;
      
      // Tech/Innovation related - static images
      if (lowerTitle.includes('tech') || lowerTitle.includes('innovation') || lowerTitle.includes('ai') || lowerTitle.includes('technology')) {
        const techImages = [
          'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
          'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
          'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
          'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
        ];
        return techImages[(idNum - 1) % techImages.length];
      }
      // Market/Economic related - static images
      if (lowerTitle.includes('market') || lowerTitle.includes('stock') || lowerTitle.includes('economic') || lowerTitle.includes('earnings')) {
        const marketImages = [
          'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
          'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800',
          'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
          'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800',
        ];
        return marketImages[(idNum - 1) % marketImages.length];
      }
      // Climate/Environment related - static images
      if (lowerTitle.includes('climate') || lowerTitle.includes('environment') || lowerTitle.includes('renewable')) {
        const climateImages = [
          'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800',
          'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
          'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800',
          'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
        ];
        return climateImages[(idNum - 1) % climateImages.length];
      }
      // Sports related - static images
      if (lowerTitle.includes('sport') || lowerTitle.includes('championship') || lowerTitle.includes('game')) {
        const sportsImages = [
          'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
          'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800',
          'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
          'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800',
        ];
        return sportsImages[(idNum - 1) % sportsImages.length];
      }
      // Journalism/Media related - static images
      if (lowerTitle.includes('journalism') || lowerTitle.includes('media') || lowerTitle.includes('future')) {
        const mediaImages = [
          'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800',
          'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800',
          'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800',
          'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800',
        ];
        return mediaImages[(idNum - 1) % mediaImages.length];
      }
      // Arts/Culture related - static images
      if (lowerTitle.includes('art') || lowerTitle.includes('culture') || lowerTitle.includes('museum') || lowerTitle.includes('exhibition')) {
        const artImages = [
          'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800',
          'https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=800',
          'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800',
          'https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=800',
        ];
        return artImages[(idNum - 1) % artImages.length];
      }
      // Politics related - static images
      if (lowerTitle.includes('politic') || lowerTitle.includes('policy')) {
        const politicsImages = [
          'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800',
          'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800',
          'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800',
          'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800',
        ];
        return politicsImages[(idNum - 1) % politicsImages.length];
      }
      // Science/Medical related - static images
      if (lowerTitle.includes('science') || lowerTitle.includes('medical') || lowerTitle.includes('research') || lowerTitle.includes('breakthrough')) {
        const scienceImages = [
          'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800',
          'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800',
          'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800',
          'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800',
        ];
        return scienceImages[(idNum - 1) % scienceImages.length];
      }
      // Corporate/Business related - static images
      if (lowerTitle.includes('corporate') || lowerTitle.includes('merger') || lowerTitle.includes('business')) {
        const businessImages = [
          'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800',
          'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800',
          'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800',
          'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800',
        ];
        return businessImages[(idNum - 1) % businessImages.length];
      }
      // Energy related - static images
      if (lowerTitle.includes('energy') || lowerTitle.includes('milestone')) {
        const energyImages = [
          'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800',
          'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800',
          'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800',
          'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800',
        ];
        return energyImages[(idNum - 1) % energyImages.length];
      }
      
      // Default static images
      const defaultImages = [
        'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800',
        'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800',
        'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800',
        'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800',
      ];
      return defaultImages[(idNum - 1) % defaultImages.length];
    };
    if (outlet === "cnn") {
      return [
        {
          id: "1",
          title: "Breaking: Major Tech Innovation Announced",
          author: "Tech Correspondent",
          source: "CNN",
          content: "A groundbreaking new technology has been unveiled that could revolutionize the way we interact with digital content. Industry leaders are calling it a game-changer.",
          timestamp: "1h",
          image: getImageForTitle("Breaking: Major Tech Innovation Announced", "1"),
        },
        {
          id: "2",
          title: "Global Markets React to Economic News",
          author: "Business Reporter",
          source: "CNN",
          content: "Financial markets around the world showed significant movement today following the latest economic indicators. Analysts are watching closely for trends.",
          timestamp: "3h",
          image: getImageForTitle("Global Markets React to Economic News", "2"),
        },
        {
          id: "3",
          title: "Climate Summit Reaches Historic Agreement",
          author: "Environment Editor",
          source: "CNN",
          content: "World leaders have reached a consensus on new climate policies that aim to reduce carbon emissions by 50% over the next decade.",
          timestamp: "5h",
          image: getImageForTitle("Climate Summit Reaches Historic Agreement", "3"),
        },
        {
          id: "4",
          title: "Sports: Championship Game Preview",
          author: "Sports Analyst",
          source: "CNN",
          content: "The highly anticipated championship match is set for this weekend. Experts weigh in on what to expect from both teams.",
          timestamp: "7h",
          image: getImageForTitle("Sports: Championship Game Preview", "4"),
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
          image: getImageForTitle("In-Depth Analysis: The Future of Journalism", "1"),
        },
        {
          id: "2",
          title: "Arts & Culture: Museum Opens New Exhibition",
          author: "Culture Critic",
          source: "The New York Times",
          content: "A major art museum has unveiled its latest collection, featuring works from contemporary artists exploring themes of identity and belonging.",
          timestamp: "4h",
          image: getImageForTitle("Arts & Culture: Museum Opens New Exhibition", "2"),
        },
        {
          id: "3",
          title: "Politics: Policy Changes Announced",
          author: "Political Reporter",
          source: "The New York Times",
          content: "New legislation has been introduced that could have far-reaching effects on healthcare and education systems nationwide.",
          timestamp: "6h",
          image: getImageForTitle("Politics: Policy Changes Announced", "3"),
        },
        {
          id: "4",
          title: "Science: Breakthrough in Medical Research",
          author: "Science Writer",
          source: "The New York Times",
          content: "Researchers have made significant progress in understanding a complex disease, opening new possibilities for treatment options.",
          timestamp: "8h",
          image: getImageForTitle("Science: Breakthrough in Medical Research", "4"),
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
          image: getImageForTitle("Market Update: Stocks Rally on Strong Earnings", "1"),
        },
        {
          id: "2",
          title: "Corporate News: Merger Announcement",
          author: "Business Reporter",
          source: "Bloomberg",
          content: "Two industry giants have announced plans to merge, creating one of the largest companies in the sector. The deal is expected to close next quarter.",
          timestamp: "3h",
          image: getImageForTitle("Corporate News: Merger Announcement", "2"),
        },
        {
          id: "3",
          title: "Technology: AI Investment Surges",
          author: "Tech Reporter",
          source: "Bloomberg",
          content: "Venture capital funding for artificial intelligence startups has reached record levels this quarter, signaling strong investor interest in the sector.",
          timestamp: "5h",
          image: getImageForTitle("Technology: AI Investment Surges", "3"),
        },
        {
          id: "4",
          title: "Energy: Renewable Energy Milestone",
          author: "Energy Correspondent",
          source: "Bloomberg",
          content: "Renewable energy sources have now surpassed fossil fuels in electricity generation for the first time in several major markets.",
          timestamp: "7h",
          image: getImageForTitle("Energy: Renewable Energy Milestone", "4"),
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
                  {article.image ? (
                    article.image.startsWith('http') ? (
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className="stream-section-image-real" 
                        style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '0.75rem' }}
                      />
                    ) : (
                      <div className="stream-section-image">{article.image}</div>
                    )
                  ) : null}
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

