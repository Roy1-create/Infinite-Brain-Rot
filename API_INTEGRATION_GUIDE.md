# Social Media API Integration Guide

This guide explains how to connect your demo app to real social media accounts using official APIs.

## Overview

The app supports integration with:
- **Twitter/X API v2** - For tweets and timeline
- **Instagram Basic Display API** - For photos and media
- **LinkedIn API v2** - For professional posts

## Prerequisites

1. Developer accounts on each platform
2. API credentials (keys, secrets, tokens)
3. OAuth redirect URLs configured

## Setup Instructions

### 1. Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your API credentials in `.env.local`

### 2. Twitter/X API Setup

#### Step 1: Create a Twitter Developer Account
1. Go to https://developer.twitter.com/
2. Sign up for a developer account
3. Create a new app/project

#### Step 2: Get API Credentials
1. Navigate to your app's "Keys and Tokens" section
2. Generate:
   - API Key and Secret
   - Bearer Token (for read-only access)
   - OAuth 2.0 Client ID and Secret

#### Step 3: Configure OAuth
1. Add callback URL: `http://localhost:5173/auth/twitter/callback`
2. Set required scopes: `tweet.read`, `users.read`, `offline.access`

#### Step 4: Update .env.local
```env
VITE_TWITTER_API_KEY=your_api_key
VITE_TWITTER_API_SECRET=your_api_secret
VITE_TWITTER_BEARER_TOKEN=your_bearer_token
VITE_TWITTER_CLIENT_ID=your_client_id
```

**API Documentation:** https://developer.twitter.com/en/docs/twitter-api

---

### 3. Instagram API Setup

#### Step 1: Create a Facebook App
1. Go to https://developers.facebook.com/
2. Create a new app
3. Add "Instagram Basic Display" product

#### Step 2: Configure Instagram Basic Display
1. Add Instagram Testers (your Instagram account)
2. Set OAuth Redirect URI: `http://localhost:5173/auth/instagram/callback`
3. Get App ID and App Secret

#### Step 3: Update .env.local
```env
VITE_INSTAGRAM_APP_ID=your_app_id
VITE_INSTAGRAM_APP_SECRET=your_app_secret
```

**API Documentation:** https://developers.facebook.com/docs/instagram-basic-display-api

---

### 4. LinkedIn API Setup

#### Step 1: Create a LinkedIn App
1. Go to https://www.linkedin.com/developers/apps
2. Create a new app
3. Request access to required products

#### Step 2: Configure OAuth
1. Add authorized redirect URLs: `http://localhost:5173/auth/linkedin/callback`
2. Request scopes: `r_liteprofile`, `r_emailaddress`, `w_member_social`
3. Get Client ID and Client Secret

#### Step 3: Update .env.local
```env
VITE_LINKEDIN_CLIENT_ID=your_client_id
VITE_LINKEDIN_CLIENT_SECRET=your_client_secret
```

**API Documentation:** https://learn.microsoft.com/en-us/linkedin/

---

## Security Considerations

### ⚠️ Important: Backend Required for Production

The current implementation shows OAuth flows, but **you MUST implement token exchange on your backend** for security:

1. **Never expose client secrets in frontend code**
2. **Token exchange should happen server-side**
3. **Store access tokens securely**

### Recommended Backend Implementation

Create API endpoints on your backend:

```javascript
// Example: /api/twitter/token
app.post('/api/twitter/token', async (req, res) => {
  const { code } = req.body;
  // Exchange code for token using client secret (server-side only)
  const token = await exchangeCodeForToken(code);
  res.json({ access_token: token });
});
```

---

## Usage in the App

### Option 1: Use Real APIs (with credentials)

1. Set up environment variables
2. The app will automatically use real APIs when credentials are available
3. Users will go through OAuth flow on first login

### Option 2: Use Mock Data (current default)

If no credentials are set, the app falls back to mock data automatically.

---

## Testing OAuth Flow

1. Start the dev server: `npm run dev`
2. Click on a social media section
3. You'll be redirected to the platform's OAuth page
4. After authorization, you'll be redirected back with a code
5. The app exchanges the code for an access token (needs backend)
6. Use the token to fetch real data

---

## Troubleshooting

### "No access token available"
- Make sure you've completed OAuth flow
- Check that tokens are stored in localStorage
- Verify redirect URIs match exactly

### "API error: 401 Unauthorized"
- Check that API credentials are correct
- Verify tokens haven't expired
- Ensure required scopes are granted

### "CORS errors"
- Some APIs require backend proxy
- Use a backend server to make API calls
- Or use a CORS proxy service (development only)

---

## Rate Limits

Be aware of API rate limits:
- **Twitter:** 300 requests per 15 minutes (varies by endpoint)
- **Instagram:** 200 requests per hour per user
- **LinkedIn:** 100,000 requests per day (varies by product)

---

## Next Steps

1. Set up your API credentials
2. Implement backend token exchange
3. Test OAuth flows
4. Deploy with secure token storage

For production, consider:
- Using a backend API gateway
- Implementing token refresh
- Adding error handling and retry logic
- Caching API responses

