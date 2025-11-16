import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./App.css";
import { twitterAPI, instagramAPI, linkedInAPI } from "./services/socialMediaAPI";

function LoginPage() {
  const { platform } = useParams<{ platform: string }>();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const platformConfig = {
    twitter: {
      name: "Twitter",
      icon: "𝕏",
      gradient: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
    },
    instagram: {
      name: "Instagram",
      icon: "📷",
      gradient: "linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #FCAF45 100%)",
    },
    linkedin: {
      name: "LinkedIn",
      icon: "💼",
      gradient: "linear-gradient(135deg, #0077B5 0%, #00A0DC 100%)",
    },
  };

  const config = platformConfig[platform as keyof typeof platformConfig] || platformConfig.twitter;

  // Check if API credentials are configured
  const hasAPICredentials = () => {
    if (platform === 'twitter') {
      return !!(import.meta.env.VITE_TWITTER_CLIENT_ID || import.meta.env.VITE_TWITTER_BEARER_TOKEN);
    } else if (platform === 'instagram') {
      return !!import.meta.env.VITE_INSTAGRAM_APP_ID;
    } else if (platform === 'linkedin') {
      return !!import.meta.env.VITE_LINKEDIN_CLIENT_ID;
    }
    return false;
  };

  const handleOAuthLogin = () => {
    if (platform === 'twitter') {
      twitterAPI.initiateAuth();
    } else if (platform === 'instagram') {
      instagramAPI.initiateAuth();
    } else if (platform === 'linkedin') {
      linkedInAPI.initiateAuth();
    }
  };

  const handleDemoLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to stream page after successful login
      navigate(`/stream/${platform}`);
    }, 1000);
  };

  return (
    <div className="login-container" style={{ background: config.gradient }}>
      <div className="login-card" enable-xr>
        <div className="login-header">
          <div className="login-icon">{config.icon}</div>
          <h1>Welcome to {config.name}</h1>
          <p>Sign in to continue</p>
        </div>

        {hasAPICredentials() && (
          <div className="oauth-section">
            <button 
              type="button"
              className="oauth-button" 
              onClick={handleOAuthLogin}
              disabled={isLoading}
            >
              🔐 Connect with {config.name}
            </button>
            <div className="divider">
              <span>OR</span>
            </div>
          </div>
        )}

        <form onSubmit={handleDemoLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email or Username</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email or username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "Signing in..." : hasAPICredentials() ? "Demo Login" : "Sign In"}
          </button>
        </form>

        <div className="login-footer">
          <button
            className="back-button"
            onClick={() => navigate("/")}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

