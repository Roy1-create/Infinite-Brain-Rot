import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./App.css";
import { SocialMediaPost } from "./services/socialMediaAPI";
import VideoPost from "./components/VideoPost";

function StreamPage() {
  const { platform } = useParams<{ platform: string }>();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<SocialMediaPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const platformConfig = {
    twitter: {
      name: "Twitter",
      icon: "𝕏",
      gradient: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
      color: "#000000",
    },
    instagram: {
      name: "Instagram",
      icon: "📷",
      gradient: "linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #FCAF45 100%)",
      color: "#E4405F",
    },
    linkedin: {
      name: "LinkedIn",
      icon: "💼",
      gradient: "linear-gradient(135deg, #0077B5 0%, #00A0DC 100%)",
      color: "#0077B5",
    },
  };

  const config = platformConfig[platform as keyof typeof platformConfig] || platformConfig.twitter;

  // Load demo data immediately (bypassing login)
  useEffect(() => {
    setIsLoading(true);

    // Show demo data immediately
    const mockPosts = generateMockPosts(platform || "twitter");
    setTimeout(() => {
      setPosts(mockPosts);
      setIsLoading(false);
    }, 500);
  }, [platform]);

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
        {
          id: "4",
          author: "Startup Founder",
          authorHandle: "@startupfounder",
          avatar: "🚀",
          content: "Launch day is approaching! Excited to share what we've been building. Stay tuned for updates!",
          timestamp: "8h",
          likes: 512,
          comments: 78,
          shares: 123,
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
        {
          id: "4",
          author: "Art Studio",
          authorHandle: "@artstudio",
          avatar: "🎨",
          content: "New piece in progress. Art is a journey, not a destination. 🎨",
          timestamp: "7h",
          likes: 1456,
          comments: 67,
          image: "🖼️",
        },
      ];
    } else {
      // LinkedIn
      return [
        {
          id: "1",
          author: "Industry Leader",
          authorHandle: "Senior Executive",
          avatar: "👔",
          content: "Excited to share insights from our latest quarterly results. Innovation and teamwork drive success. Grateful for our amazing team!",
          timestamp: "3h",
          likes: 234,
          comments: 45,
        },
        {
          id: "2",
          author: "Tech Professional",
          authorHandle: "Software Engineer",
          avatar: "💻",
          content: "Just completed an amazing project using cutting-edge technology. The power of collaboration and continuous learning never ceases to amaze me.",
          timestamp: "5h",
          likes: 178,
          comments: 32,
          video: "/videos/linkedin-demo-1.mp4",
          videoPoster: "/videos/linkedin-demo-1-poster.jpg",
        },
        {
          id: "3",
          author: "Business Consultant",
          authorHandle: "Strategy Advisor",
          avatar: "📊",
          content: "Key takeaway from today's conference: Adaptability and resilience are the cornerstones of modern business success.",
          timestamp: "7h",
          likes: 312,
          comments: 56,
        },
        {
          id: "4",
          author: "Career Coach",
          authorHandle: "Professional Development",
          avatar: "🎯",
          content: "Remember: Your career is a marathon, not a sprint. Focus on growth, learning, and building meaningful connections.",
          timestamp: "9h",
          likes: 445,
          comments: 78,
        },
      ];
    }
  };

  return (
    <div className="stream-container" style={{ background: config.gradient }}>
      <div className="tabs-header">
        <div className="platform-header">
          <span className="tab-icon">{config.icon}</span>
          <span className="tab-name">{config.name}</span>
        </div>
      </div>

      <div className="stream-content">
        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading your feed...</p>
          </div>
        ) : (
          <div className="posts-container">
            {posts.map((post) => (
              <div key={post.id} className="post-card" enable-xr>
                <div className="post-header">
                  <div className="post-avatar">{post.avatar}</div>
                  <div className="post-author">
                    <div className="post-author-name">{post.author}</div>
                    <div className="post-author-handle">{post.authorHandle}</div>
                  </div>
                  <div className="post-timestamp">{post.timestamp}</div>
                </div>

                <div className="post-content">
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
                      <img src={post.image} alt="Post" className="post-image-real" />
                    ) : (
                      <div className="post-image">{post.image}</div>
                    )
                  ) : null}
                </div>

                <div className="post-actions">
                  <button className="post-action">
                    <span>❤️</span> {post.likes}
                  </button>
                  <button className="post-action">
                    <span>💬</span> {post.comments}
                  </button>
                  {post.shares && (
                    <button className="post-action">
                      <span>🔄</span> {post.shares}
                    </button>
                  )}
                  {post.url && (
                    <a href={post.url} target="_blank" rel="noopener noreferrer" className="post-action">
                      <span>🔗</span> View
                    </a>
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

export default StreamPage;

