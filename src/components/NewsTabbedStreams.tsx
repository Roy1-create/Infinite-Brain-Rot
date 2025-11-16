import NewsSection from "./NewsSection";
import "../App.css";

function NewsTabbedStreams() {
  const cnnGradient = "transparent";
  const nytGradient = "transparent";
  const bloombergGradient = "transparent";

  return (
    <div className="tabbed-streams-container" enable-xr>
      <div className="panels-container">
        <div className="stream-panel news-panel" enable-xr>
          <div className="panel-header" enable-xr>
            <span className="tab-icon">📺</span>
            <span className="tab-name">CNN</span>
          </div>
          <NewsSection 
            outlet="cnn" 
            gradient={cnnGradient} 
          />
        </div>
        <div className="stream-panel news-panel" enable-xr>
          <div className="panel-header" enable-xr>
            <span className="tab-icon">📰</span>
            <span className="tab-name">NY Times</span>
          </div>
          <NewsSection 
            outlet="nytimes" 
            gradient={nytGradient} 
          />
        </div>
        <div className="stream-panel news-panel" enable-xr>
          <div className="panel-header" enable-xr>
            <span className="tab-icon">💼</span>
            <span className="tab-name">Bloomberg</span>
          </div>
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


