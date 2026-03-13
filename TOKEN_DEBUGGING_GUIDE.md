# Token Debugging & Storage Guide

## 🔐 How to View Token in Debugger

### Step 1: Open React Native DevTools
- **Android**: Press `D` in terminal running the Metro bundler
- **iOS**: Press `I` in terminal running the Metro bundler
- Select `Debug in Chrome` or use React Native Debugger

### Step 2: View Console Logs During Login
When user logs in, you'll see logs in the debugger console:

```
🌐 [API CALL] Sending login request to Symfony backend
   {email: "user@example.com", timestamp: "2026-03-13T..."}

✅ [API RESPONSE] Token received from Symfony
   {token: "eyJhbGciOiJIUzI1NiIs...", user: {...}, fullResponse: {...}}

📋 [TOKEN PAYLOAD DECODED]
   {payload: {sub: "123", email: "user@example.com", exp: 1234567890}}

🔐 [TOKEN SAVED] 
   {timestamp: "...", tokenLength: 256, token: "eyJhbGciOi..."}

🎉 [LOGIN SUCCESS] User logged in
   {email: "user@example.com", timestamp: "..."}
```

## 📋 Token Structure

Your JWT token has 3 parts:
```
HEADER.PAYLOAD.SIGNATURE
```

The **PAYLOAD** (middle part) is automatically decoded and logged. It contains:
- `exp`: Expiration time (Unix timestamp)
- `sub` or `user_id`: User identifier
- `email`: User email
- Other claims from your Symfony backend

## 💾 Token Storage & Retrieval

### Automatic Storage
- **Stored in**: AsyncStorage (persistent device storage)
- **Retrieved when**: App restarts
- **Location**: `src/utils/tokenStorage.js`

### Manual Access
```javascript
import { getToken, decodeToken, isTokenExpired } from '../../utils/tokenStorage';

// Get token from storage
const token = await getToken();

// Decode token payload
const payload = decodeToken(token);
console.log(payload); // {sub, email, exp, ...}

// Check if expired
const expired = isTokenExpired(token);
```

## 🌐 Using Token in API Calls

### Redux State Access
The token is now stored in Redux state:
```javascript
import { useSelector } from 'react-redux';

const MyComponent = () => {
  const { token, user, isLoggedIn } = useSelector(state => state.auth);
  
  console.log(token); // View token anytime
  console.log(user);  // View user data
};
```

### Automatic Token Attachment
All API calls automatically include the token:
```javascript
import { apiClient } from '../../utils/apiClient';

// Token is automatically added as Bearer token
const bookings = await apiClient.get('/api/bookings');

// With POST data
const result = await apiClient.post('/api/bookings', {
  package_id: 1,
  event_date: '2026-03-20',
});
```

## 🔧 Configuration

### Update Symfony Backend URL
Edit `src/app/sagas/auth.js` and `src/utils/apiClient.js`:
```javascript
const API_BASE_URL = 'http://your-symfony-backend.local'; // Change here
```

### Expected Symfony Login Response
Your Symfony `/api/login` endpoint should return:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 123,
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

## 🧪 Testing Token Flow

### Test in Redux DevTools
1. Download Redux DevTools extension for Chrome
2. In app, go to login screen
3. Enter credentials and login
4. In Redux DevTools, you'll see:
   - `loginRequest` action (loading)
   - `loginSuccess` action (shows token in Redux state)
   - Auth state includes: `user`, `token`, `isLoggedIn`

### View AsyncStorage Content
```javascript
// Add this to a debug screen
import { getToken, decodeToken } from '../../utils/tokenStorage';

const DebugToken = async () => {
  const token = await getToken();
  const payload = decodeToken(token);
  console.log('Token:', token);
  console.log('Payload:', payload);
};
```

## ⏰ Token Expiration Handling

The app logs expiration automatically:
```
⏰ [TOKEN EXPIRATION CHECK]
   {expiresAt: "2026-03-20T10:30:00Z", isExpired: false}
```

### Implement Auto-Refresh (Optional)
Add this to your saga to refresh tokens before expiration:
```javascript
import { isTokenExpired } from '../../utils/tokenStorage';

// Check before each API call
const token = yield getToken();
if (isTokenExpired(token)) {
  // Trigger refresh token flow
}
```

## 🛠️ Common Issues

### Issue: Token not appearing in debugger
- ✅ Ensure Metro bundler is running
- ✅ Open React Native DevTools (press D)
- ✅ Check Console tab, not Network tab

### Issue: Token disappears on app restart
- ✅ Token should persist in AsyncStorage
- ✅ Check `tokenStorage.js` logs for errors
- ✅ May need to clear AsyncStorage manually

### Issue: API calls not using token
- ✅ Check Redux state has `token` property
- ✅ Verify API calls use `apiClient` utility
- ✅ Check Network tab for `Authorization` header
