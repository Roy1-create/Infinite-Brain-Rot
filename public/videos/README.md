# Demo Videos Directory

This directory contains prerecorded demo videos for the social media streams.

## Video Files

Place your demo videos in this directory with the following naming convention:

### Twitter Videos
- `twitter-demo-1.mp4` - First Twitter demo video
- `twitter-demo-1-poster.jpg` - Poster/thumbnail image for the video
- `twitter-demo-2.mp4` - Second Twitter demo video (optional)
- `twitter-demo-2-poster.jpg` - Poster for second video (optional)

### Instagram Videos
- `instagram-demo-1.mp4` - First Instagram demo video
- `instagram-demo-1-poster.jpg` - Poster/thumbnail image
- `instagram-demo-2.mp4` - Second Instagram demo video (optional)
- `instagram-demo-2-poster.jpg` - Poster for second video (optional)

### LinkedIn Videos
- `linkedin-demo-1.mp4` - First LinkedIn demo video
- `linkedin-demo-1-poster.jpg` - Poster/thumbnail image
- `linkedin-demo-2.mp4` - Second LinkedIn demo video (optional)
- `linkedin-demo-2-poster.jpg` - Poster for second video (optional)

## Video Specifications

### Recommended Settings:
- **Format**: MP4 (H.264 codec)
- **Resolution**: 1080x1920 (9:16 for mobile) or 1920x1080 (16:9 for desktop)
- **Duration**: 15-60 seconds (shorter is better for demos)
- **File Size**: Keep under 10MB per video for faster loading
- **Frame Rate**: 30fps is sufficient

### Poster Images:
- **Format**: JPG or PNG
- **Resolution**: Match video aspect ratio
- **File Size**: Keep under 500KB

## How to Add Videos

1. Record or prepare your demo videos
2. Export them as MP4 files
3. Create poster/thumbnail images
4. Place files in this directory (`public/videos/`)
5. Update `StreamPage.tsx` to reference your video files

## Example Video Paths

In `StreamPage.tsx`, videos are referenced like this:
```typescript
{
  id: "3",
  // ... other fields
  video: "/videos/twitter-demo-1.mp4",
  videoPoster: "/videos/twitter-demo-1-poster.jpg",
}
```

## Tips

- Use screen recording software to capture realistic social media feeds
- Keep videos short and engaging
- Add captions or text overlays if needed
- Test videos on different devices and browsers
- Consider using video compression tools to reduce file sizes

## Video Compression Tools

- **HandBrake**: Free, open-source video transcoder
- **FFmpeg**: Command-line tool for video processing
- **Online tools**: CloudConvert, FreeConvert, etc.

## Example FFmpeg Commands

Compress a video:
```bash
ffmpeg -i input.mp4 -vcodec h264 -acodec mp2 output.mp4
```

Create a poster image:
```bash
ffmpeg -i input.mp4 -ss 00:00:01 -vframes 1 poster.jpg
```

Reduce file size:
```bash
ffmpeg -i input.mp4 -vf scale=1080:1920 -b:v 2M output.mp4
```

