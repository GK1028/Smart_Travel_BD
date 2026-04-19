# Smart Travel BD - Authentication & Features Guide

## Overview

Smart Travel BD is a comprehensive AI-powered travel planning application for Bangladesh with modern authentication, OTP verification, and advanced travel planning features.

## Recent Updates & Features

### 1. Date Picker UI Improvements
- Calendar background changed to white with improved contrast
- Dark text on calendar dates for better readability
- Emerald highlight for selected dates
- Clean, modern design that matches the app aesthetic

### 2. Budget Input Bug Fix
- Fixed issue where first digit couldn't be fully deleted
- Implemented proper controlled input handling
- Full backspace and clearing functionality
- Validates minimum budget of 2000 BDT

### 3. Expanded Travel Agent System
- **8 Agents (one per Bangladesh division):**
  - Karim Ahmed - Chattogram (Cox's Bazar Specialist)
  - Fatima Begum - Chattogram (Hill Tracts Guide)
  - Rajesh Chandra - Khulna (Wildlife & Nature)
  - Afia Rahman - Dhaka (Urban Explorer)
  - Bijoy Das - Sylhet (Tea Garden Expert)
  - Sumaya Akhter - Rajshahi (Historical Sites)
  - Habibur Rahman - Rangpur (Northern Region)
  - Priya Sharma - Barishal (River & Island Tours)

- Each agent has:
  - Profile image placeholder
  - Verified rating (4.6-4.9 stars)
  - Specialization details
  - Years of experience
  - Pricing: 1,000 BDT/day (includes pickup + guidance)
  - Division-based filtering support

### 4. Splash Screen
- Full-screen intro page with animated elements
- Displays: "Welcome to Smart Travel Planner for Bangladesh"
- Auto-redirects to main site after 5 seconds
- Smooth fade transition with animated backgrounds
- Access via: `/splash`

### 5. First-Time Login Flow
- Automatically detects first-time visitors
- Shows splash screen on first visit
- Uses localStorage to track visitor status
- Redirects returning users directly to home
- Skips for already authenticated users

### 6. OTP Verification System
- Supports both **Email** and **SMS** verification methods
- 6-digit OTP input with smooth UX
- Features:
  - Auto-focus between digit inputs
  - Backspace navigation support
  - Resend code with 60-second cooldown
  - 10-minute code expiration
  - Max 5 verification attempts
  - Method switching (email ↔ SMS)
- Access via: `/verify`

### 7. Firebase-Ready Authentication System
- Complete login/signup UI ready for Firebase integration
- Mock authentication for development/demo
- **Firebase configuration placeholders:**
  ```
  NEXT_PUBLIC_FIREBASE_API_KEY
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
  NEXT_PUBLIC_FIREBASE_PROJECT_ID
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
  NEXT_PUBLIC_FIREBASE_APP_ID
  ```
- **OTP Integration Ready For:**
  - Twilio (SMS)
  - SendGrid (Email)
  - Firebase Authentication (Email/SMS)
  - Custom Backend Service

## Authentication Architecture

### Current Implementation (Mock)
Located in `/lib/auth.ts`:
- Uses localStorage for user storage
- Mock OTP generation and verification
- Perfect for development and testing

### Firebase Integration Guide
See `/lib/firebase-auth-adapter.ts` for full example implementation.

**Steps to integrate Firebase:**

1. **Create Firebase Project:**
   - Visit https://console.firebase.google.com
   - Create new project
   - Enable Authentication (Email/Password)

2. **Configure Environment Variables:**
   ```bash
   # .env.local
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

3. **Install Firebase SDK:**
   ```bash
   npm install firebase
   ```

4. **Update Authentication:**
   - Switch imports in `/context/auth-context.tsx`
   - Use Firebase implementation instead of mock auth
   - Firebase Firestore for user profiles

5. **Setup OTP Service:**
   
   **Option A: Twilio (SMS)**
   ```bash
   npm install twilio
   # Add to .env.local:
   TWILIO_ACCOUNT_SID=your_sid
   TWILIO_AUTH_TOKEN=your_token
   TWILIO_PHONE_NUMBER=+1234567890
   ```

   **Option B: SendGrid (Email)**
   ```bash
   npm install @sendgrid/mail
   # Add to .env.local:
   SENDGRID_API_KEY=your_key
   ```

   **Option C: Firebase Custom Claims + Backend**
   - Create backend endpoint for OTP
   - Integrate with your email/SMS provider
   - Handle OTP verification server-side

## File Structure

```
app/
├── login/page.tsx           # Login form
├── signup/page.tsx          # Signup form + OTP trigger
├── verify/page.tsx          # OTP verification page
├── splash/page.tsx          # Splash screen (5 sec intro)
└── page.tsx                 # Main travel planner

components/
├── travel-agent-service.tsx # 8 agents (division-based)
├── ai-travel-plan.tsx       # Plan generator with fixed inputs
├── first-visit-guard.tsx    # First-time visitor logic
└── ...other components

lib/
├── auth.ts                  # Mock auth + OTP service
├── firebase-auth-adapter.ts # Firebase integration guide
└── famous-foods.ts          # Food data

context/
└── auth-context.tsx         # Authentication context provider

public/images/
└── agent-[1-8].jpg         # Agent profile placeholders
```

## Page Routes

| Route | Purpose |
|-------|---------|
| `/` | Main travel planner homepage |
| `/login` | User login |
| `/signup` | User registration |
| `/verify` | OTP verification |
| `/splash` | Intro splash screen |
| `/premium` | Premium features (optional) |

## Authentication Flow

### Signup Flow
1. User fills registration form (`/signup`)
2. Clicks "Create Account"
3. OTP sent to email
4. Redirected to verification page (`/verify`)
5. User enters 6-digit code
6. Verified → Redirected to home (`/`)

### Login Flow
1. User enters credentials (`/login`)
2. System validates credentials
3. User logged in → Redirected to home (`/`)

### First-Time Visitor
1. User visits site for first time
2. Splash screen shown (5 seconds)
3. Auto-redirects to home
4. Status saved in localStorage

## Security Notes

### Production Recommendations
1. **Never hardcode API keys** - Use environment variables
2. **Enable HTTPS** - Required for production
3. **Implement CORS** - Secure cross-origin requests
4. **Rate limiting** - Prevent OTP brute force attacks
5. **Password strength** - Enforce strong passwords
6. **Session management** - Use secure, HTTP-only cookies
7. **Two-factor auth** - Consider adding 2FA

### OTP Security
- 6-digit codes (1 million possible combinations)
- 10-minute expiration
- Max 5 attempts
- Rate limiting recommended (backend)
- Implement CAPTCHA for repeated failures

## Styling & Design

- **Color Scheme:** Emerald (#0a3622), Gold (#d4a52f), Navy (#1a1a2e)
- **Font:** Poppins (headings), Inter (body)
- **Components:** shadcn/ui with custom theming
- **Animations:** Framer Motion for splash screen

## Testing

### Mock Authentication (Default)
```javascript
// Test credentials work with any email/password combo
Email: test@example.com
Password: testPassword123
```

### Firebase Authentication
```javascript
// Will use Firebase when configured
// Create test users in Firebase Console
```

### Testing OTP (Mock)
```javascript
// Generate any 6-digit code in console
// Example: 123456
// Will be verified for demo purposes
```

## Environment Variables

### Required (all optional for mock mode)
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
```

### Optional (for advanced features)
```
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=
SENDGRID_API_KEY=
EMAIL_FROM_ADDRESS=
```

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Environment Variables on Vercel
1. Go to Project Settings
2. Navigate to Environment Variables
3. Add all required Firebase/OTP keys
4. Redeploy

## Support & Troubleshooting

### Common Issues

**Calendar not showing properly:**
- Ensure Calendar component is imported from `/components/ui/calendar`
- Check Tailwind CSS is properly configured

**Budget input not clearing:**
- Clear cache and reload
- Should now support full deletion

**OTP code not working:**
- Check localStorage in browser DevTools
- Demo codes must be 6 digits
- Verify no special characters

**Firebase not connecting:**
- Check environment variables are set
- Ensure Firebase project is active
- Verify authentication is enabled in Firebase Console

## Future Enhancements

- [ ] Google/Facebook OAuth integration
- [ ] Biometric authentication (fingerprint/face)
- [ ] Two-factor authentication (2FA)
- [ ] Social login (Google, Facebook)
- [ ] Password reset flow
- [ ] Phone number verification
- [ ] User profile management
- [ ] Travel history & saved trips

## Contributing

To contribute:
1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit pull request

## License

This project is part of Smart Travel BD Platform.
