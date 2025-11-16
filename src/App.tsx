import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import SecondPage from "./SecondPage";
import LoginPage from "./LoginPage";
import StreamPage from "./StreamPage";
import NewPage from "./NewPage";
import NewsPage from "./NewsPage";
import DynamicPage from "./pages/DynamicPage";
import TabbedStreams from "./components/TabbedStreams";
import { initScene } from "@webspatial/react-sdk";

function LandingPage() {
  const handleOpenNews = () => {
    // Get the current URL and construct news URL
    const currentPath = window.location.pathname;
    const basePath = currentPath.replace(/\/$/, ''); // Remove trailing slash
    const newsPath = basePath + '/news';
    const newsUrl = window.location.origin + newsPath;
    window.open(newsUrl, '_blank', 'width=1200,height=800,resizable=yes,scrollbars=yes');
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
      </div>
      <TabbedStreams />
    </div>
  );
}

function App() {
  return (
    <Router basename={__XR_ENV_BASE__}>
      <Routes>
        <Route path="/second-page" element={<SecondPage />} />
        <Route path="/new-page" element={<NewPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/dynamic-page" element={<DynamicPage />} />
        <Route path="/login/:platform" element={<LoginPage />} />
        <Route path="/stream/:platform" element={<StreamPage />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
