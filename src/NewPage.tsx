import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function NewPage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("Welcome to the New Page!");

  return (
    <div className="new-page-container" enable-xr>
      <div className="new-page-content">
        <h1>New Page</h1>
        <p className="new-page-message">{message}</p>
        
        <div className="new-page-actions">
          <button 
            className="new-page-button"
            onClick={() => setMessage("Button clicked! 🎉")}
          >
            Click Me
          </button>
          
          <button 
            className="new-page-button create-page-button"
            onClick={() => navigate("/dynamic-page")}
            title="This button uses the createPage function to navigate to a dynamically created page"
          >
            🚀 Create New Page (using createPage function)
          </button>
          
          <button 
            className="new-page-button secondary"
            onClick={() => navigate("/")}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewPage;

