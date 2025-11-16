import NewsSection from "./NewsSection";
import "../App.css";

function NewsTabbedStreams() {
  const cnnGradient = "linear-gradient(135deg, #CC0000 0%, #8B0000 100%)";
  const nytGradient = "linear-gradient(135deg, #000000 0%, #333333 100%)";
  const bloombergGradient = "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #333333 100%)";

  return (
    <div className="tabbed-streams-container" enable-xr>
      <div className="tabs-header" enable-xr>
        <div className="platform-header">
          <span className="tab-icon">📺</span>
          <span className="tab-name">CNN</span>
        </div>
        <div className="platform-header">
          <span className="tab-icon">📰</span>
          <span className="tab-name">NY Times</span>
        </div>
        <div className="platform-header">
          <span className="tab-icon">💼</span>
          <span className="tab-name">Bloomberg</span>
        </div>
      </div>

      <div className="panels-container">
        <div className="stream-panel" enable-xr>
          <NewsSection 
            outlet="cnn" 
            gradient={cnnGradient} 
          />
        </div>
        <div className="stream-panel" enable-xr>
          <NewsSection 
            outlet="nytimes" 
            gradient={nytGradient} 
          />
        </div>
        <div className="stream-panel" enable-xr>
          <NewsSection 
            outlet="bloomberg" 
            gradient={bloombergGradient} 
          />
        </div>
      </div>
    </div>
  );
}

export default NewsTabbedStreams;


