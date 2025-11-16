import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SecondPage from "./SecondPage";
import LoginPage from "./LoginPage";
import StreamPage from "./StreamPage";
import NewPage from "./NewPage";
import NewsPage from "./NewsPage";
import AppsPage from "./AppsPage";
import DynamicPage from "./pages/DynamicPage";
import TabbedStreams from "./components/TabbedStreams";

function LandingPage() {
  const handleOpenNews = () => {
    // Get the current URL and construct news URL
    const currentPath = window.location.pathname;
    const basePath = currentPath.replace(/\/$/, ''); // Remove trailing slash
    const newsPath = basePath + '/news';
    const newsUrl = window.location.origin + newsPath;
    window.open(newsUrl, '_blank', 'width=1200,height=800,resizable=yes,scrollbars=yes');
  };

  const handleOpenApps = () => {
    // Get the current URL and construct apps URL
    const currentPath = window.location.pathname;
    const basePath = currentPath.replace(/\/$/, ''); // Remove trailing slash
    const appsPath = basePath + '/apps';
    const appsUrl = window.location.origin + appsPath;
    window.open(appsUrl, '_blank', 'width=1200,height=800,resizable=yes,scrollbars=yes');
  };

  return (
    <div className="landing-container">
      <div className="news-button-wrapper" enable-xr>
        <button 
          className="news-window-button"
          onClick={handleOpenNews}
          title="Open News Outlets"
        >
          📰 News
        </button>
        <button 
          className="news-window-button"
          onClick={handleOpenApps}
          title="Open Apps"
          style={{ marginTop: '0.5rem' }}
        >
          📱 Apps
        </button>
      </div>
      <TabbedStreams />
    </div>
  );
}

function App() {
  // @ts-ignore - __XR_ENV_BASE__ is a global variable defined at build time
  const basePath = typeof __XR_ENV_BASE__ !== 'undefined' ? __XR_ENV_BASE__ : '';
  return (
    <Router basename={basePath}>
      <Routes>
        <Route path="/second-page" element={<SecondPage />} />
        <Route path="/new-page" element={<NewPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/apps" element={<AppsPage />} />
        <Route path="/dynamic-page" element={<DynamicPage />} />
        <Route path="/login/:platform" element={<LoginPage />} />
        <Route path="/stream/:platform" element={<StreamPage />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
