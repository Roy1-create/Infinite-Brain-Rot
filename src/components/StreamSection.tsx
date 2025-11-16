import { useState, useEffect, useCallback, useRef } from "react";
import { SocialMediaPost, twitterAPI, instagramAPI, tiktokAPI } from "../services/socialMediaAPI";
import VideoPost from "./VideoPost";
import "../App.css";

interface StreamSectionProps {
  platform: "twitter" | "instagram" | "linkedin" | "tiktok";
  gradient: string;
}

function StreamSection({ platform, gradient }: StreamSectionProps) {
  const [posts, setPosts] = useState<SocialMediaPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUsingRealData, setIsUsingRealData] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef(0);

  const generateMockPosts = (platform: string): SocialMediaPost[] => {
    if (platform === "twitter") {
      return [
        {
          id: "1",
          author: "Tech Enthusiast",
          authorHandle: "@techlover",
          avatar: "👤",
          content: "Just discovered an amazing new framework! The future of web development is looking bright. #WebDev #Tech",
          timestamp: "2h",
          likes: 124,
          comments: 23,
          shares: 45,
        },
        {
          id: "2",
          author: "Design Guru",
          authorHandle: "@designmaster",
          avatar: "🎨",
          content: "UI/UX trends for 2024: Minimalism meets functionality. Less is more, but make it meaningful.",
          timestamp: "4h",
          likes: 89,
          comments: 12,
          shares: 18,
        },
        {
          id: "3",
          author: "Code Wizard",
          authorHandle: "@codewizard",
          avatar: "⚡",
          content: "Spent the weekend building a new project. Sometimes the best learning happens when you're just experimenting!",
          timestamp: "6h",
          likes: 256,
          comments: 34,
          shares: 67,
          video: "/videos/twitter-demo-1.mp4",
          videoPoster: "/videos/twitter-demo-1-poster.jpg",
        },
      ];
    } else if (platform === "instagram") {
      return [
        {
          id: "1",
          author: "Travel Explorer",
          authorHandle: "@traveler",
          avatar: "✈️",
          content: "Beautiful sunset from today's adventure! 🌅 #Travel #Adventure #Sunset",
          timestamp: "1h",
          likes: 1234,
          comments: 89,
          image: "🌄",
        },
        {
          id: "2",
          author: "Foodie Life",
          authorHandle: "@foodielife",
          avatar: "🍕",
          content: "Homemade pasta perfection! Nothing beats fresh ingredients and love in the kitchen. 🍝",
          timestamp: "3h",
          likes: 892,
          comments: 45,
          video: "/videos/instagram-demo-1.mp4",
          videoPoster: "/videos/instagram-demo-1-poster.jpg",
        },
        {
          id: "3",
          author: "Fitness Journey",
          authorHandle: "@fitnessjourney",
          avatar: "💪",
          content: "Morning workout complete! Consistency is key. Day 45 of the journey! 💪",
          timestamp: "5h",
          likes: 567,
          comments: 23,
          image: "🏋️",
        },
      ];
    } else if (platform === "tiktok") {
      return [
        {
          id: "1",
          author: "Dance Creator",
          authorHandle: "@dancevibes",
          avatar: "💃",
          content: "New dance challenge! Try this move and tag me! 🎵 #DanceChallenge #TikTok",
          timestamp: "1h",
          likes: 5432,
          comments: 234,
          shares: 567,
          video: "/videos/tiktok-demo-1.mp4",
          videoPoster: "/videos/tiktok-demo-1-poster.jpg",
        },
        {
          id: "2",
          author: "Cooking Tips",
          authorHandle: "@cookingpro",
          avatar: "👨‍🍳",
          content: "Quick 30-second recipe hack that will change your life! 🍳✨",
          timestamp: "3h",
          likes: 8921,
          comments: 456,
          shares: 1234,
          video: "/videos/tiktok-demo-2.mp4",
          videoPoster: "/videos/tiktok-demo-2-poster.jpg",
        },
        {
          id: "3",
          author: "Comedy Central",
          authorHandle: "@funnyvids",
          avatar: "😂",
          content: "When you try to be cool but fail spectacularly 😅",
          timestamp: "5h",
          likes: 12345,
          comments: 789,
          shares: 2345,
          video: "/videos/tiktok-demo-3.mp4",
          videoPoster: "/videos/tiktok-demo-3-poster.jpg",
        },
        {
          id: "4",
          author: "Tech Reviews",
          authorHandle: "@techguru",
          avatar: "📱",
          content: "Testing the latest phone - here's what surprised me! 🔥",
          timestamp: "7h",
          likes: 6789,
          comments: 345,
          shares: 890,
        },
      ];
    } else {
      // Fallback to Twitter for unknown platforms
      return [
        {
          id: "1",
          author: "Default User",
          authorHandle: "@user",
          avatar: "👤",
          content: "Welcome to the feed!",
          timestamp: "1h",
          likes: 0,
          comments: 0,
        },
      ];
    }
  };

  const fetchRealData = useCallback(async () => {
    try {
      const storedToken = localStorage.getItem(`${platform}_access_token`);
      
      if (!storedToken) {
        // No token, use mock data
        const mockPosts = generateMockPosts(platform);
        setTimeout(() => {
          setPosts(mockPosts);
          setIsLoading(false);
        }, 500);
        return;
      }

      let realPosts: SocialMediaPost[] = [];
      
      if (platform === 'twitter') {
        realPosts = await twitterAPI.fetchTimeline(storedToken);
      } else if (platform === 'instagram') {
        realPosts = await instagramAPI.fetchMedia(storedToken);
      } else if (platform === 'tiktok') {
        realPosts = await tiktokAPI.fetchVideos(storedToken);
      }

      if (realPosts.length > 0) {
        setPosts(realPosts);
        setIsUsingRealData(true);
      } else {
        // Fall back to mock data if no real posts
        const mockPosts = generateMockPosts(platform);
        setPosts(mockPosts);
      }
    } catch (error) {
      console.error(`Error fetching real ${platform} data:`, error);
      // Fall back to mock data on error
      const mockPosts = generateMockPosts(platform);
      setPosts(mockPosts);
    } finally {
      setIsLoading(false);
    }
  }, [platform]);

  useEffect(() => {
    setIsLoading(true);
    setIsUsingRealData(false);
    
    // Try to fetch real data first
    fetchRealData();

    // Set up auto-refresh every 30 seconds for live stream effect
    const refreshInterval = setInterval(() => {
      fetchRealData();
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(refreshInterval);
  }, [platform, fetchRealData]);

  // Auto-scroll functionality
  useEffect(() => {
    if (isLoading || !scrollContainerRef.current || posts.length === 0) {
      return;
    }

    const container = scrollContainerRef.current;
    const scrollSpeed = 0.8; // pixels per frame (smooth scroll)
    let animationFrameId: number;
    let isPaused = false;

    const autoScroll = () => {
      if (isPaused) {
        animationFrameId = requestAnimationFrame(autoScroll);
        return;
      }

      scrollPositionRef.current += scrollSpeed;
      container.scrollTop = scrollPositionRef.current;

      // Check if we've reached the bottom
      const maxScroll = container.scrollHeight - container.clientHeight;
      
      if (scrollPositionRef.current >= maxScroll - 1) {
        // Smoothly reset to top for continuous loop
        scrollPositionRef.current = 0;
        container.scrollTop = 0;
      }

      animationFrameId = requestAnimationFrame(autoScroll);
    };

    // Pause on hover
    const handleMouseEnter = () => {
      isPaused = true;
    };

    const handleMouseLeave = () => {
      isPaused = false;
      // Sync scroll position when resuming
      scrollPositionRef.current = container.scrollTop;
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Start auto-scrolling after a short delay
    const startDelay = setTimeout(() => {
      scrollPositionRef.current = container.scrollTop;
      autoScroll();
    }, 1000);

    return () => {
      clearTimeout(startDelay);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isLoading, posts.length]);

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
            {posts.map((post) => (
              <div key={post.id} className="stream-section-post" enable-xr>
                <div className="stream-section-post-header">
                  <div className="stream-section-avatar">{post.avatar}</div>
                  <div className="stream-section-author">
                    <div className="stream-section-author-name">{post.author}</div>
                    <div className="stream-section-author-handle">{post.authorHandle}</div>
                  </div>
                  <div className="stream-section-timestamp">{post.timestamp}</div>
                </div>

                <div className="stream-section-post-content">
                  <p>{post.content}</p>
                  {post.video ? (
                    <VideoPost
                      videoSrc={post.video}
                      poster={post.videoPoster}
                      autoplay={false}
                      loop={true}
                      muted={true}
                      controls={true}
                    />
                  ) : post.image ? (
                    post.image.startsWith('http') ? (
                      <img src={post.image} alt="Post" className="stream-section-image-real" />
                    ) : (
                      <div className="stream-section-image">{post.image}</div>
                    )
                  ) : null}
                </div>

                <div className="stream-section-post-actions">
                  <span className="stream-section-action">❤️ {post.likes}</span>
                  <span className="stream-section-action">💬 {post.comments}</span>
                  {post.shares && (
                    <span className="stream-section-action">🔄 {post.shares}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StreamSection;

