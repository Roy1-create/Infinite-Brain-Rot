/**
 * Social Media API Integration Service
 * 
 * This service handles authentication and data fetching from:
 * - Twitter/X API v2
 * - Instagram Basic Display API
 * - LinkedIn API v2
 * 
 * Setup Instructions:
 * 1. Get API credentials from each platform's developer portal
 * 2. Add credentials to .env.local file
 * 3. Set up OAuth redirect URLs
 */

// Environment variables (add these to .env.local)
const API_CONFIG = {
  twitter: {
    apiKey: import.meta.env.VITE_TWITTER_API_KEY || '',
    apiSecret: import.meta.env.VITE_TWITTER_API_SECRET || '',
    bearerToken: import.meta.env.VITE_TWITTER_BEARER_TOKEN || '',
    clientId: import.meta.env.VITE_TWITTER_CLIENT_ID || '',
    redirectUri: import.meta.env.VITE_TWITTER_REDIRECT_URI || `${window.location.origin}/auth/twitter/callback`,
  },
  instagram: {
    appId: import.meta.env.VITE_INSTAGRAM_APP_ID || '',
    appSecret: import.meta.env.VITE_INSTAGRAM_APP_SECRET || '',
    redirectUri: import.meta.env.VITE_INSTAGRAM_REDIRECT_URI || `${window.location.origin}/auth/instagram/callback`,
  },
  linkedin: {
    clientId: import.meta.env.VITE_LINKEDIN_CLIENT_ID || '',
    clientSecret: import.meta.env.VITE_LINKEDIN_CLIENT_SECRET || '',
    redirectUri: import.meta.env.VITE_LINKEDIN_REDIRECT_URI || `${window.location.origin}/auth/linkedin/callback`,
  },
  tiktok: {
    clientKey: import.meta.env.VITE_TIKTOK_CLIENT_KEY || '',
    clientSecret: import.meta.env.VITE_TIKTOK_CLIENT_SECRET || '',
    redirectUri: import.meta.env.VITE_TIKTOK_REDIRECT_URI || `${window.location.origin}/auth/tiktok/callback`,
  },
};

export interface SocialMediaPost {
  id: string;
  author: string;
  authorHandle: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares?: number;
  image?: string;
  video?: string;
  videoPoster?: string;
  url?: string;
}

/**
 * TWITTER/X API Integration
 * 
 * Setup: https://developer.twitter.com/en/portal/dashboard
 * API Docs: https://developer.twitter.com/en/docs/twitter-api
 */
export class TwitterAPI {
  private accessToken: string | null = null;

  // Step 1: Initiate OAuth flow
  initiateAuth(): void {
    const authUrl = `https://twitter.com/i/oauth2/authorize?` +
      `response_type=code&` +
      `client_id=${API_CONFIG.twitter.clientId}&` +
      `redirect_uri=${encodeURIComponent(API_CONFIG.twitter.redirectUri)}&` +
      `scope=tweet.read%20users.read%20offline.access&` +
      `state=twitter_auth_state&` +
      `code_challenge=challenge&` +
      `code_challenge_method=plain`;
    
    window.location.href = authUrl;
  }

  // Step 2: Exchange code for access token (usually done on backend)
  async exchangeCodeForToken(code: string): Promise<string> {
    // NOTE: This should be done on your backend for security
    // Never expose client secret in frontend code!
    const response = await fetch('/api/twitter/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    
    const data = await response.json();
    this.accessToken = data.access_token;
    localStorage.setItem('twitter_access_token', this.accessToken);
    return this.accessToken;
  }

  // Step 3: Fetch user's timeline
  async fetchTimeline(accessToken?: string): Promise<SocialMediaPost[]> {
    const token = accessToken || this.accessToken || localStorage.getItem('twitter_access_token');
    
    if (!token) {
      throw new Error('No access token available. Please authenticate first.');
    }

    try {
      // Using Twitter API v2 - User's home timeline
      const response = await fetch(
        'https://api.twitter.com/2/tweets/search/recent?query=from:me&max_results=10&tweet.fields=created_at,public_metrics,author_id&expansions=author_id&user.fields=username,profile_image_url',
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Twitter API error: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Transform Twitter API response to our Post format
      return this.transformTwitterPosts(data);
    } catch (error) {
      console.error('Error fetching Twitter timeline:', error);
      throw error;
    }
  }

  private transformTwitterPosts(data: any): SocialMediaPost[] {
    const users = data.includes?.users || [];
    const userMap = new Map(users.map((u: any) => [u.id, u]));

    return data.data?.map((tweet: any) => {
      const user = userMap.get(tweet.author_id);
      return {
        id: tweet.id,
        author: user?.name || 'Unknown',
        authorHandle: `@${user?.username || 'unknown'}`,
        avatar: user?.profile_image_url || '👤',
        content: tweet.text,
        timestamp: this.formatTimestamp(tweet.created_at),
        likes: tweet.public_metrics?.like_count || 0,
        comments: tweet.public_metrics?.reply_count || 0,
        shares: tweet.public_metrics?.retweet_count || 0,
        url: `https://twitter.com/i/web/status/${tweet.id}`,
      };
    }) || [];
  }

  private formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    return `${diffDays}d`;
  }
}

/**
 * INSTAGRAM API Integration
 * 
 * Setup: https://developers.facebook.com/docs/instagram-basic-display-api
 * API Docs: https://developers.facebook.com/docs/instagram-basic-display-api
 */
export class InstagramAPI {
  private accessToken: string | null = null;

  initiateAuth(): void {
    const authUrl = `https://api.instagram.com/oauth/authorize?` +
      `client_id=${API_CONFIG.instagram.appId}&` +
      `redirect_uri=${encodeURIComponent(API_CONFIG.instagram.redirectUri)}&` +
      `scope=user_profile,user_media&` +
      `response_type=code`;
    
    window.location.href = authUrl;
  }

  async exchangeCodeForToken(code: string): Promise<string> {
    // This should be done on your backend
    const response = await fetch('/api/instagram/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    
    const data = await response.json();
    this.accessToken = data.access_token;
    localStorage.setItem('instagram_access_token', this.accessToken);
    return this.accessToken;
  }

  async fetchMedia(accessToken?: string): Promise<SocialMediaPost[]> {
    const token = accessToken || this.accessToken || localStorage.getItem('instagram_access_token');
    
    if (!token) {
      throw new Error('No access token available. Please authenticate first.');
    }

    try {
      // Get user's media
      const response = await fetch(
        `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,like_count,comments_count&access_token=${token}`
      );

      if (!response.ok) {
        throw new Error(`Instagram API error: ${response.statusText}`);
      }

      const data = await response.json();
      return this.transformInstagramPosts(data);
    } catch (error) {
      console.error('Error fetching Instagram media:', error);
      throw error;
    }
  }

  private transformInstagramPosts(data: any): SocialMediaPost[] {
    return data.data?.map((media: any) => ({
      id: media.id,
      author: 'You',
      authorHandle: '@your_instagram',
      avatar: '📷',
      content: media.caption || '',
      timestamp: this.formatTimestamp(media.timestamp),
      likes: media.like_count || 0,
      comments: media.comments_count || 0,
      image: media.media_url || media.thumbnail_url,
      url: media.permalink,
    })) || [];
  }

  private formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffHours < 24) return `${diffHours}h`;
    return `${diffDays}d`;
  }
}

/**
 * LINKEDIN API Integration
 * 
 * Setup: https://www.linkedin.com/developers/apps
 * API Docs: https://learn.microsoft.com/en-us/linkedin/
 */
export class LinkedInAPI {
  private accessToken: string | null = null;

  initiateAuth(): void {
    const state = 'linkedin_auth_state';
    const scope = 'r_liteprofile r_emailaddress w_member_social';
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?` +
      `response_type=code&` +
      `client_id=${API_CONFIG.linkedin.clientId}&` +
      `redirect_uri=${encodeURIComponent(API_CONFIG.linkedin.redirectUri)}&` +
      `state=${state}&` +
      `scope=${encodeURIComponent(scope)}`;
    
    window.location.href = authUrl;
  }

  async exchangeCodeForToken(code: string): Promise<string> {
    // This should be done on your backend
    const response = await fetch('/api/linkedin/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    
    const data = await response.json();
    this.accessToken = data.access_token;
    localStorage.setItem('linkedin_access_token', this.accessToken);
    return this.accessToken;
  }

  async fetchPosts(accessToken?: string): Promise<SocialMediaPost[]> {
    const token = accessToken || this.accessToken || localStorage.getItem('linkedin_access_token');
    
    if (!token) {
      throw new Error('No access token available. Please authenticate first.');
    }

    try {
      // Get user's posts (shares)
      const response = await fetch(
        'https://api.linkedin.com/v2/ugcPosts?q=authors&authors=List(me)',
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`LinkedIn API error: ${response.statusText}`);
      }

      const data = await response.json();
      return this.transformLinkedInPosts(data);
    } catch (error) {
      console.error('Error fetching LinkedIn posts:', error);
      throw error;
    }
  }

  private transformLinkedInPosts(data: any): SocialMediaPost[] {
    return data.elements?.map((post: any) => ({
      id: post.id,
      author: 'You',
      authorHandle: 'Professional',
      avatar: '💼',
      content: post.specificContent?.['com.linkedin.ugc.ShareContent']?.shareCommentary?.text || '',
      timestamp: this.formatTimestamp(post.created?.time || Date.now()),
      likes: post.numLikes || 0,
      comments: post.numComments || 0,
      url: post.shareUrl,
    })) || [];
  }

  private formatTimestamp(timestamp: number): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffHours < 24) return `${diffHours}h`;
    return `${diffDays}d`;
  }
}

/**
 * TIKTOK API Integration
 * 
 * Setup: https://developers.tiktok.com/
 * API Docs: https://developers.tiktok.com/doc/
 */
export class TikTokAPI {
  private accessToken: string | null = null;

  initiateAuth(): void {
    const authUrl = `https://www.tiktok.com/v2/auth/authorize?` +
      `client_key=${API_CONFIG.tiktok.clientKey}&` +
      `redirect_uri=${encodeURIComponent(API_CONFIG.tiktok.redirectUri)}&` +
      `scope=user.info.basic,video.list&` +
      `response_type=code&` +
      `state=tiktok_auth_state`;
    
    window.location.href = authUrl;
  }

  async exchangeCodeForToken(code: string): Promise<string> {
    // This should be done on your backend
    const response = await fetch('/api/tiktok/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    
    const data = await response.json();
    this.accessToken = data.access_token;
    localStorage.setItem('tiktok_access_token', this.accessToken);
    return this.accessToken;
  }

  async fetchVideos(accessToken?: string): Promise<SocialMediaPost[]> {
    const token = accessToken || this.accessToken || localStorage.getItem('tiktok_access_token');
    
    if (!token) {
      throw new Error('No access token available. Please authenticate first.');
    }

    try {
      const response = await fetch(
        'https://open.tiktokapis.com/v2/video/list/?fields=id,title,video_description,create_time,cover_image_url,share_url,view_count,like_count,comment_count,share_count',
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`TikTok API error: ${response.statusText}`);
      }

      const data = await response.json();
      return this.transformTikTokPosts(data);
    } catch (error) {
      console.error('Error fetching TikTok videos:', error);
      throw error;
    }
  }

  private transformTikTokPosts(data: any): SocialMediaPost[] {
    return data.data?.videos?.map((video: any) => ({
      id: video.id,
      author: 'You',
      authorHandle: '@your_tiktok',
      avatar: '🎵',
      content: video.video_description || video.title || '',
      timestamp: this.formatTimestamp(video.create_time),
      likes: video.like_count || 0,
      comments: video.comment_count || 0,
      shares: video.share_count || 0,
      video: video.cover_image_url,
      url: video.share_url,
    })) || [];
  }

  private formatTimestamp(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffHours < 24) return `${diffHours}h`;
    return `${diffDays}d`;
  }
}

// Export singleton instances
export const twitterAPI = new TwitterAPI();
export const instagramAPI = new InstagramAPI();
export const linkedInAPI = new LinkedInAPI();
export const tiktokAPI = new TikTokAPI();

