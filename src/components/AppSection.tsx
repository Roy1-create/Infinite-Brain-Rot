import "../App.css";

interface AppSectionProps {
  app: "email" | "linkedin" | "sportstv" | "duolingo";
  gradient: string;
}

function AppSection({ app, gradient }: AppSectionProps) {
  // Helper function to prepend __XR_ENV_BASE__ to paths when in AVP mode
  const getPath = (path: string): string => {
    // @ts-ignore - __XR_ENV_BASE__ is a global variable defined at build time
    const base = typeof __XR_ENV_BASE__ !== 'undefined' ? __XR_ENV_BASE__ : '';
    const isAVP = base !== '';
    
    if (isAVP && path.startsWith('/')) {
      const cleanBase = base.replace(/\/$/, '');
      return cleanBase + path;
    }
    return path;
  };

  // Image paths for each app
  const imagePaths: Record<string, string> = {
    email: "/images/email image.png",
    linkedin: "/images/linked image.jpg",
    duolingo: "/images/duolingo2.png",
  };

  // Video paths for apps that use videos
  const videoPaths: Record<string, string> = {
    sportstv: "/videos/formula1.mp4",
  };

  const hasVideo = videoPaths[app] !== undefined;
  const mediaPath = hasVideo ? videoPaths[app] : imagePaths[app] || imagePaths.email;

  return (
    <div className="stream-section-container" style={{ background: gradient }} enable-xr>
      <div className="stream-section-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0', height: '100%' }}>
        {hasVideo ? (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', height: '100%' }}>
              <video
                src={getPath(mediaPath)}
                autoPlay
                loop
                muted
                controls
                playsInline
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />
            </div>
          </div>
        ) : (
          <img 
            src={getPath(mediaPath)} 
            alt={app}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '8px'
            }}
          />
        )}
      </div>
    </div>
  );
}

export default AppSection;

