import { createPage } from "../utils/createPage";

// Create a new page using the createPage utility function
const DynamicPage = createPage({
  title: "Dynamically Created Page",
  content: (
    <div>
      <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
        This page was created using the <code>createPage</code> function! 🚀
      </p>
      <div style={{ 
        background: "rgba(100, 108, 255, 0.1)", 
        padding: "1.5rem", 
        borderRadius: "12px",
        marginTop: "1rem"
      }}>
        <h3 style={{ marginTop: 0, color: "#646cff" }}>Features:</h3>
        <ul style={{ textAlign: "left", display: "inline-block" }}>
          <li>✅ Created programmatically</li>
          <li>✅ Customizable content</li>
          <li>✅ Beautiful gradient background</li>
          <li>✅ XR/VR compatible</li>
        </ul>
      </div>
      <p style={{ marginTop: "2rem", fontStyle: "italic", color: "#888" }}>
        You can create as many pages as you want using this function!
      </p>
    </div>
  ),
  backgroundColor: "linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #4facfe 100%)",
  backButtonText: "← Back to New Page",
  backButtonPath: "/new-page"
});

export default DynamicPage;


