import { useState, useRef } from "react";
import "./VideoPost.css";

interface VideoPostProps {
  videoSrc: string;
  poster?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
}

function VideoPost({
  videoSrc,
  poster,
  autoplay = false,
  loop = true,
  muted = true,
  controls = true,
}: VideoPostProps) {
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleVideoError = () => {
    setIsLoading(false);
    setHasError(true);
    console.error('Video failed to load:', videoSrc);
  };



  return (
    <div className="video-post-container" enable-xr>
      <div className="video-wrapper">
        {isLoading && (
          <div className="video-loading">
            <div className="loading-spinner-small"></div>
            <span>Loading video...</span>
          </div>
        )}
        <video
          ref={videoRef}
          src={videoSrc}
          poster={poster}
          className="video-post"
          loop={loop}
          muted={muted}
          controls={controls}
          playsInline
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
        {!controls && (
          <button
            className="video-play-button"
            onClick={handlePlayPause}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? "⏸️" : "▶️"}
          </button>
        )}
      </div>
    </div>
  );
}

export default VideoPost;

