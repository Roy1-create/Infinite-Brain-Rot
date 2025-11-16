# Prerecorded Video Demo Guide

## Overview

The app now supports prerecorded demo videos! You can add your own videos to make the social media streams more engaging and realistic.

## Quick Start

### 1. Add Your Videos

Place your video files in the `public/videos/` directory:

```
public/
  videos/
    twitter-demo-1.mp4
    twitter-demo-1-poster.jpg
    instagram-demo-1.mp4
    instagram-demo-1-poster.jpg
    linkedin-demo-1.mp4
    linkedin-demo-1-poster.jpg
```

### 2. Video Specifications

**Recommended Settings:**
- **Format**: MP4 (H.264)
- **Resolution**: 1080x1920 (vertical) or 1920x1080 (horizontal)
- **Duration**: 15-60 seconds
- **File Size**: Under 10MB per video
- **Frame Rate**: 30fps

**Poster Images:**
- **Format**: JPG or PNG
- **Resolution**: Match video aspect ratio
- **File Size**: Under 500KB

### 3. How It Works

Videos are automatically displayed in posts that have a `video` property. The app will:
- Show a loading spinner while the video loads
- Display the poster image before playback
- Provide play/pause controls
- Support autoplay, loop, and mute options

## Current Video Placements

The following posts are configured to show videos:

### Twitter
- Post #3: "Code Wizard" post - `/videos/twitter-demo-1.mp4`

### Instagram
- Post #2: "Foodie Life" post - `/videos/instagram-demo-1.mp4`

### LinkedIn
- Post #2: "Tech Professional" post - `/videos/linkedin-demo-1.mp4`

## Adding More Videos

To add videos to other posts, edit `src/StreamPage.tsx` and add video properties:

```typescript
{
  id: "1",
  author: "Your Name",
  // ... other fields
  video: "/videos/your-video.mp4",
  videoPoster: "/videos/your-video-poster.jpg",
}
```

## Video Recording Tips

### Screen Recording
1. Use screen recording software (QuickTime, OBS, etc.)
2. Record actual social media feeds or create mockups
3. Keep recordings short and focused
4. Add captions or text overlays if needed

### Creating Mockups
1. Design social media posts in Figma/Photoshop
2. Animate them in After Effects or similar
3. Export as MP4
4. Add realistic interactions (scrolling, tapping, etc.)

### Compression

Use FFmpeg to compress videos:

```bash
# Compress video
ffmpeg -i input.mp4 -vcodec h264 -crf 28 -preset slow output.mp4

# Create poster image
ffmpeg -i input.mp4 -ss 00:00:01 -vframes 1 poster.jpg

# Reduce file size
ffmpeg -i input.mp4 -vf scale=1080:1920 -b:v 2M output.mp4
```

## Video Component Features

The `VideoPost` component supports:

- **Autoplay**: Videos can start automatically
- **Loop**: Videos can loop continuously
- **Muted**: Videos can be muted by default
- **Controls**: Native video controls or custom play button
- **Poster**: Thumbnail image before playback
- **Loading States**: Shows spinner while loading

## Customization

Edit `src/components/VideoPost.tsx` to customize:
- Play button style
- Loading animation
- Video player controls
- XR/spatial effects

## Testing

1. Add your video files to `public/videos/`
2. Restart the dev server: `npm run dev`
3. Navigate to a stream page
4. Videos should appear in the configured posts

## Troubleshooting

### Video Not Showing
- Check file path is correct (`/videos/filename.mp4`)
- Ensure file is in `public/videos/` directory
- Check browser console for errors
- Verify video format is MP4 (H.264)

### Video Not Loading
- Check file size (keep under 10MB)
- Verify video codec (should be H.264)
- Check browser compatibility
- Try a different video file

### Performance Issues
- Compress videos further
- Use lower resolution
- Reduce video duration
- Consider lazy loading

## Example Video Ideas

### Twitter
- Screen recording of Twitter feed scrolling
- Animated tweet interactions
- Video tweet examples

### Instagram
- Instagram Stories-style videos
- Reels-style content
- Photo carousel animations

### LinkedIn
- Professional video posts
- Company updates
- Industry insights

## Next Steps

1. Record or create your demo videos
2. Compress and optimize them
3. Add them to `public/videos/`
4. Update `StreamPage.tsx` to reference them
5. Test in the app!

For more details, see `public/videos/README.md`

