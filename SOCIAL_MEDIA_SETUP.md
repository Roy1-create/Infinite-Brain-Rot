# Social Media API Setup - Quick Start

## Yes, you can link real social media accounts!

The app supports both **demo mode** (mock data) and **real API integration** (your actual accounts).

## Quick Setup

### 1. Create `.env.local` file

Create a file named `.env.local` in the root directory with your API credentials:

```env
# Twitter/X API
VITE_TWITTER_CLIENT_ID=your_client_id_here
VITE_TWITTER_BEARER_TOKEN=your_bearer_token_here

# Instagram API
VITE_INSTAGRAM_APP_ID=your_app_id_here

# LinkedIn API
VITE_LINKEDIN_CLIENT_ID=your_client_id_here
```

### 2. Get API Credentials

#### Twitter/X
1. Go to https://developer.twitter.com/en/portal/dashboard
2. Create a new app
3. Get your Client ID and Bearer Token
4. Add redirect URI: `http://localhost:5173/auth/twitter/callback`

#### Instagram
1. Go to https://developers.facebook.com/
2. Create an app and add "Instagram Basic Display"
3. Get your App ID
4. Add redirect URI: `http://localhost:5173/auth/instagram/callback`

#### LinkedIn
1. Go to https://www.linkedin.com/developers/apps
2. Create a new app
3. Get your Client ID
4. Add redirect URI: `http://localhost:5173/auth/linkedin/callback`

### 3. How It Works

**Without credentials (current):**
- App uses mock/demo data
- No authentication needed
- Perfect for testing the UI

**With credentials:**
- Login page shows "Connect with [Platform]" button
- Clicking it redirects to OAuth flow
- After authorization, real data is fetched
- Falls back to demo data if API fails

## Important Notes

⚠️ **For Production:** Token exchange should happen on your backend server for security. The current implementation shows the flow but requires a backend endpoint to exchange OAuth codes for tokens securely.

See `API_INTEGRATION_GUIDE.md` for detailed setup instructions and security best practices.

