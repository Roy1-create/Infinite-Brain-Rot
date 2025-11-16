import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import SecondPage from "./SecondPage";
import LoginPage from "./LoginPage";
import StreamPage from "./StreamPage";
import TabbedStreams from "./components/TabbedStreams";
import { initScene } from "@webspatial/react-sdk";

function LandingPage() {
  return (
    <div className="landing-container">
      <TabbedStreams />
    </div>
  );
}

function App() {
  return (
    <Router basename={__XR_ENV_BASE__}>
      <Routes>
        <Route path="/second-page" element={<SecondPage />} />
        <Route path="/login/:platform" element={<LoginPage />} />
        <Route path="/stream/:platform" element={<StreamPage />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
