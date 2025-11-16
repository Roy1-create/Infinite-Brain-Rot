# How to Add Videos and GIFs to Social Media Feeds

This guide explains how to add videos or GIFs to the Twitter, Instagram, and TikTok feed placeholders.

## Quick Start

### Option 1: Add MP4 Videos (Recommended)

1. **Place your video files** in the `public/videos/` directory
2. **Update the mock data** in `src/components/StreamSection.tsx` to reference your videos
3. **Videos will automatically loop** (already configured)

### Option 2: Use GIFs

GIFs can be used in two ways:
- **As images** (simpler, but larger file sizes)
- **Converted to MP4** (better performance, smaller files)

---

## Method 1: Adding MP4 Videos

### Step 1: Add Video Files

Place your video files in `public/videos/` with descriptive names:

```
public/videos/
  ├── twitter-video-1.mp4
  ├── twitter-video-1-poster.jpg  (optional thumbnail)
  ├── instagram-video-1.mp4
  ├── tiktok-video-1.mp4
  └── ...
```

### Step 2: Update StreamSection.tsx

Open `src/components/StreamSection.tsx` and find the `generateMockPosts` function. Update the posts to include your videos:

**Example for Twitter:**
```typescript
{
  id: "1",
  author: "Tech Enthusiast",
  authorHandle: "@techlover",
  avatar: "👤",
  content: "Check out this amazing video!",
  timestamp: "2h",
  likes: 124,
  comments: 23,
  shares: 45,
  video: "/videos/twitter-video-1.mp4",  // Add this line
  videoPoster: "/videos/twitter-video-1-poster.jpg",  // Optional thumbnail
}
```

**Example for Instagram:**
```typescript
{
  id: "2",
  author: "Foodie Life",
  authorHandle: "@foodielife",
  avatar: "🍕",
  content: "Homemade pasta perfection!",
  timestamp: "3h",
  likes: 892,
  comments: 45,
  video: "/videos/instagram-video-1.mp4",  // Add this line
  videoPoster: "/videos/instagram-video-1-poster.jpg",  // Optional
}
```

**Example for TikTok:**
```typescript
{
  id: "1",
  author: "Dance Creator",
  authorHandle: "@dancevibes",
  avatar: "💃",
  content: "New dance challenge!",
  timestamp: "1h",
  likes: 5432,
  comments: 234,
  shares: 567,
  video: "/videos/tiktok-video-1.mp4",  // Add this line
  videoPoster: "/videos/tiktok-video-1-poster.jpg",  // Optional
}
```

### Step 3: Video Specifications

For best performance:
- **Format**: MP4 (H.264 codec)
- **Resolution**: 
  - 1080x1920 (9:16) for mobile/TikTok style
  - 1920x1080 (16:9) for desktop/Twitter style
- **Duration**: 15-60 seconds (shorter loads faster)
- **File Size**: Keep under 10MB per video
- **Frame Rate**: 30fps is sufficient

---

## Method 2: Using GIFs

### Option A: Use GIFs as Images (Simple)

GIFs will automatically loop when used as images. Update the post like this:

```typescript
{
  id: "1",
  // ... other fields
  image: "/videos/my-animated-gif.gif",  // Use GIF path here
}
```

**Note**: GIFs are larger files and may load slower than MP4 videos.

### Option B: Convert GIF to MP4 (Recommended)

Converting GIFs to MP4 gives you:
- ✅ Smaller file sizes (often 10x smaller)
- ✅ Better performance
- ✅ Automatic looping (already configured)

**Using FFmpeg (command line):**
```bash
# Convert GIF to MP4
ffmpeg -i input.gif -vf "scale=1080:1920:flags=lanczos" -c:v libx264 -pix_fmt yuv420p -movflags +faststart output.mp4

# Create a poster/thumbnail from the GIF
ffmpeg -i input.gif -ss 00:00:00 -vframes 1 poster.jpg
```

**Using Online Tools:**
- CloudConvert: https://cloudconvert.com/gif-to-mp4
- FreeConvert: https://www.freeconvert.com/gif-to-mp4
- EZGIF: https://ezgif.com/gif-to-mp4

Then use the MP4 as described in Method 1.

---

## Method 3: Using External Video URLs

You can also use videos from external URLs:

```typescript
{
  id: "1",
  // ... other fields
  video: "https://example.com/video.mp4",  // External URL
  videoPoster: "https://example.com/poster.jpg",  // Optional
}
```

---

## Creating Poster/Thumbnail Images

Poster images are shown before the video loads. Create them from your video:

**Using FFmpeg:**
```bash
# Extract a frame at 1 second
ffmpeg -i video.mp4 -ss 00:00:01 -vframes 1 poster.jpg

# Or extract the first frame
ffmpeg -i video.mp4 -vframes 1 poster.jpg
```

**Using Online Tools:**
- Take a screenshot from your video
- Use a video thumbnail generator
- Use the first frame of your video

---

## Video Features Already Configured

The `VideoPost` component already has these features enabled:
- ✅ **Auto-loop**: Videos loop automatically
- ✅ **Muted by default**: Videos start muted (required for autoplay)
- ✅ **Controls**: Users can play/pause
- ✅ **Responsive**: Videos scale to fit the container
- ✅ **Loading states**: Shows spinner while loading

---

## Example: Complete Post with Video

Here's a complete example of a post with a video:

```typescript
{
  id: "1",
  author: "Tech Enthusiast",
  authorHandle: "@techlover",
  avatar: "👤",
  content: "Just discovered an amazing new framework! The future of web development is looking bright. #WebDev #Tech",
  timestamp: "2h",
  likes: 124,
  comments: 23,
  shares: 45,
  video: "/videos/twitter-demo-1.mp4",
  videoPoster: "/videos/twitter-demo-1-poster.jpg",  // Optional but recommended
}
```

---

## Tips for Best Results

1. **Optimize your videos**: Use compression tools to reduce file size
2. **Keep videos short**: 15-30 seconds is ideal for social media
3. **Use poster images**: They improve perceived load time
4. **Test on different devices**: Ensure videos work on mobile and desktop
5. **Consider aspect ratios**: Match the platform's typical aspect ratio

---

## Troubleshooting

**Video not showing?**
- Check the file path is correct (should start with `/videos/`)
- Ensure the file exists in `public/videos/`
- Check browser console for errors
- Verify the video format is MP4 (H.264)

**Video not looping?**
- The `loop` prop is already set to `true` by default
- Check if the video file itself is corrupted

**Video too large/slow?**
- Compress the video using FFmpeg or HandBrake
- Reduce resolution or frame rate
- Consider converting GIFs to MP4

---

## Quick Reference

**File Location**: `public/videos/your-video.mp4`

**Reference in Code**: `video: "/videos/your-video.mp4"`

**Current Mock Data Location**: `src/components/StreamSection.tsx` → `generateMockPosts()` function

