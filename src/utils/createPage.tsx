import { ReactNode } from "react";

/**
 * Creates a new page component with customizable content
 * @param config - Configuration object for the page
 * @returns A React component for the new page
 */
export function createPage(config: {
  title: string;
  content: ReactNode;
  backgroundColor?: string;
  showBackButton?: boolean;
  backButtonText?: string;
  backButtonPath?: string;
  className?: string;
}) {
  const {
    title,
    content,
    backgroundColor = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    showBackButton = true,
    backButtonText = "← Back to Home",
    backButtonPath = "/",
    className = "",
  } = config;

  return function NewPageComponent() {
    const navigate = require("react-router-dom").useNavigate();
    
    return (
      <div 
        className={`new-page-container ${className}`} 
        style={{ background: backgroundColor }}
        enable-xr
      >
        <div className="new-page-content">
          <h1>{title}</h1>
          <div className="new-page-body">
            {content}
          </div>
          
          {showBackButton && (
            <div className="new-page-actions">
              <button 
                className="new-page-button secondary"
                onClick={() => navigate(backButtonPath)}
              >
                {backButtonText}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };
}

/**
 * Example usage:
 * 
 * const MyCustomPage = createPage({
 *   title: "My Custom Page",
 *   content: (
 *     <div>
 *       <p>This is custom content!</p>
 *       <button>Click me</button>
 *     </div>
 *   ),
 *   backgroundColor: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
 *   backButtonPath: "/"
 * });
 */


