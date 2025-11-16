import AppSection from "./AppSection";
import "../App.css";

function AppsTabbedStreams() {
  const emailGradient = "transparent";
  const linkedinGradient = "transparent";
  const sportsGradient = "transparent";
  const duolingoGradient = "transparent";

  return (
    <div className="tabbed-streams-container" enable-xr>
      <div className="panels-container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr" }}>
        <div className="stream-panel news-panel" enable-xr>
          <div className="panel-header" enable-xr>
            <span className="tab-icon">📧</span>
            <span className="tab-name">Email</span>
          </div>
          <AppSection 
            app="email" 
            gradient={emailGradient} 
          />
        </div>
        <div className="stream-panel news-panel" enable-xr>
          <div className="panel-header" enable-xr>
            <span className="tab-icon">💼</span>
            <span className="tab-name">LinkedIn</span>
          </div>
          <AppSection 
            app="linkedin" 
            gradient={linkedinGradient} 
          />
        </div>
        <div className="stream-panel news-panel" enable-xr>
          <div className="panel-header" enable-xr>
            <span className="tab-icon">📺</span>
            <span className="tab-name">Sports TV</span>
          </div>
          <AppSection 
            app="sportstv" 
            gradient={sportsGradient} 
          />
        </div>
        <div className="stream-panel news-panel" enable-xr>
          <div className="panel-header" enable-xr>
            <span className="tab-icon">🦉</span>
            <span className="tab-name">Duolingo</span>
          </div>
          <AppSection 
            app="duolingo" 
            gradient={duolingoGradient} 
          />
        </div>
      </div>
    </div>
  );
}

export default AppsTabbedStreams;

