import StreamSection from "./StreamSection";
import "../App.css";

function TabbedStreams() {
  const twitterGradient = "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)";
  const instagramGradient = "linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #FCAF45 100%)";
  const tiktokGradient = "linear-gradient(135deg, #000000 0%, #FF0050 50%, #00F2EA 100%)";

  return (
    <div className="tabbed-streams-container" enable-xr>
      <div className="tabs-header" enable-xr>
        <div className="platform-header">
          <span className="tab-icon">𝕏</span>
          <span className="tab-name">Twitter</span>
        </div>
        <div className="platform-header">
          <span className="tab-icon">📷</span>
          <span className="tab-name">Instagram</span>
        </div>
        <div className="platform-header">
          <span className="tab-icon">🎵</span>
          <span className="tab-name">TikTok</span>
        </div>
      </div>

      <div className="panels-container">
        <div className="stream-panel" enable-xr>
          <StreamSection 
            platform="twitter" 
            gradient={twitterGradient} 
          />
        </div>
        <div className="stream-panel" enable-xr>
          <StreamSection 
            platform="instagram" 
            gradient={instagramGradient} 
          />
        </div>
        <div className="stream-panel" enable-xr>
          <StreamSection 
            platform="tiktok" 
            gradient={tiktokGradient} 
          />
        </div>
      </div>
    </div>
  );
}

export default TabbedStreams;

