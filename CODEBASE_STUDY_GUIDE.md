# Codebase Study Guide: Catering Booking App

## 🏗️ OVERALL ARCHITECTURE

Your app is a **React Native mobile application** for a catering booking platform. It uses a **Redux + Redux-Saga architecture** with a Symfony backend API.

### Technology Stack:
- **Frontend Framework**: React Native
- **State Management**: Redux (Redux Toolkit) + Redux-Saga middleware
- **Navigation**: React Navigation (Stack Navigator)
- **Persistent Storage**: AsyncStorage (for JWT tokens)
- **Backend**: Symfony API (http://192.168.5.38:8000/api)

---

## 📊 DATA FLOW: From App Load to User Interaction

### **Phase 1: Application Startup**

```
App Loads
    ↓
Redux Store Initializes (with persisted state from AsyncStorage)
    ↓
Redux-Saga Middleware starts listening for actions
    ↓
Root Navigation Component checks Redux state: state.auth.isLoggedIn
    ↓
   IF isLoggedIn === true → SHOW MainNav (main app screens)
   IF isLoggedIn === false → SHOW AuthNav (login/register screens)
```

### **Phase 2: User Login Flow**

```
User enters credentials on Login Screen
    ↓
Screen dispatches loginRequest action
    ↓
Redux-Saga's watchAuth saga INTERCEPTS the action
    ↓
Saga makes HTTP POST call to /api/login with credentials
    ↓
Backend returns { token, user } response
    ↓
Saga saves token to AsyncStorage AND dispatches loginSuccess action
    ↓
Redux updates state.auth with user & token
    ↓
Navigation automatically switches to MainNav
```

### **Phase 3: Protected API Requests**

```
Screen needs data (e.g., user's bookings)
    ↓
Screen dispatches loadBookingsRequest action
    ↓
watchBookings saga intercepts the action
    ↓
Saga retrieves token from AsyncStorage
    ↓
API client makes GET request with Authorization header: "Bearer <token>"
    ↓
Backend validates token and returns data
    ↓
Saga dispatches loadBookingsSuccess with data
    ↓
Redux updates state.booking.bookings
    ↓
Screen components re-render with new data
```

### **Phase 4: Logout**

```
User clicks Logout button
    ↓
Screen dispatches logout action
    ↓
Redux resets auth state (user, token, isLoggedIn = false)
    ↓
Navigation switches back to AuthNav
    ↓
AsyncStorage token persists, but Redux state is cleared
```

---

## 📁 FILE & FOLDER BREAKDOWN

### **`/redux`** - State Management Core
Purpose: Define the shape of data and how it changes

| File | Responsibility |
|------|---|
| **store.js** | Creates Redux store with saga middleware; sets up persistence via redux-persist; defines auth with its own persist config |
| **authSlice.js** | Manages authentication state (user, token, isLoggedIn, loading, error); uses Redux Toolkit createSlice for clean reducer syntax |
| **bookingSlice.js** | Manages bookings list state (bookings array, loading, error); handles adding, canceling, and loading bookings |

**Redux State Shape:**
```javascript
{
  auth: {
    user: { id, email, name, ... },
    token: "JWT_TOKEN_STRING",
    isLoggedIn: boolean,
    isLoading: boolean,
    error: null | "error message"
  },
  booking: {
    bookings: [ { id, packageName, status, createdAt, ... } ],
    loading: boolean,
    error: null | "error message"
  }
}
```

---

### **`/app`** - Business Logic & Side Effects

#### **`actions.js`**
Purpose: Defines Redux action types and action creators
- **Action Types**: `LOGIN_REQUEST`, `LOGIN_SUCCESS`, `LOGIN_FAILURE`, `LOGOUT_REQUEST`
- **Action Creators**: Exported functions (e.g., `loginRequest(username, password)`) that create action objects
- These are dispatched by screens and intercepted by sagas

#### **`sagas/`** - Redux-Saga Middleware
Purpose: Handle **asynchronous operations** (API calls, delays, etc.)

| File | Responsibility |
|------|---|
| **index.js** | Root saga that forks (combines) all other sagas using `all()` and `fork()` |
| **auth.js** | **watchAuth**: Listens for LOGIN_REQUEST actions; **handleLogin**: Makes API call to Symfony /api/login, saves token, dispatches success/failure |
| **bookings.js** | **watchBookings**: Listens for loadBookingsRequest; **loadBookings**: Fetches user's bookings from API using token |

**Why Sagas?** They allow you to:
- Make async API calls without blocking the UI
- Intercept and chain multiple actions
- Handle errors gracefully
- Keep business logic separate from components

---

### **`/api`** - Backend Communication Channel

| File | Responsibility |
|------|---|
| **client.js** | HTTP utility that auto-injects JWT token into all requests; logs all requests/responses for debugging; handles error cases |

**Key Features:**
- Retrieves token from `tokenStorage` before each request
- Adds `Authorization: Bearer <token>` header automatically
- Converts response body to JSON
- Throws errors on non-200 responses with detailed logging

---

### **`/utils`** - Helper Functions & Constants

| File | Responsibility |
|------|---|
| **tokenStorage.js** | Saves/retrieves JWT token from AsyncStorage; includes decoding and console logging for debugging |
| **apiClient.js** | HTTP wrapper (`apiClient.get()`, `apiClient.post()`, etc.) that uses the client.js utilities |
| **apiEndpoints.js** | Centralized API endpoint definitions (authAPI, bookingsAPI, packagesAPI) that use apiClient |
| **routes.js** | Navigation route names as constants (LOGIN, REGISTER, HOME, PACKAGES, BOOKINGS, PROFILE, CONTACT) |
| **images.js** | Image URIs and asset references |
| **index.js** | Aggregates exports from other utils for easy import |

---

### **`/navigations`** - Navigation Structure
Purpose: Define screen flow and routing

| File | Responsibility |
|------|---|
| **index.js** | **Root Navigator**: Checks `state.auth.isLoggedIn`; conditionally renders AuthNav or MainNav |
| **AuthNav.js** | Stack navigator for unauthenticated users; screens: Login → Register |
| **MainNav.js** | Stack navigator for authenticated users; screens: Home, Packages, BookPackage, Bookings, Profile, Contact |

**Navigation Pattern:**
- Uses React Navigation's Stack Navigator
- Each screen is a route
- `isLoggedIn` flag controls which navigator is visible
- Logging out resets isLoggedIn, automatically switching back to AuthNav

---

### **`/screens`** - User Interface Components

| File | Responsibility |
|------|---|
| **HomeScreen.js** | Welcome screen after login; displays user greeting, statistics (pending/confirmed bookings), quick links to other sections |
| **LoginScreen.js** | Login form (handled by `auth/Login.js`) |
| **RegisterScreen.js** | Registration form (handled by `auth/Register.js`) |
| **PackagesScreen.js** | Lists all catering packages available |
| **BookPackageScreen.js** | Form to create a new booking for a selected package |
| **BookingsScreen.js** | Lists user's past and current bookings with status |
| **ProfileScreen.js** | User profile information |
| **ContactScreen.js** | Contact/support information |
| **TokenDebugScreen.js** | Debugging tool to view token details |

**Screen Pattern:**
- Use `useSelector()` to read Redux state
- Use `useDispatch()` to dispatch actions
- Use `useNavigation()` to navigate between screens

---

### **`/components`** - Reusable UI Elements

| File | Responsibility |
|------|---|
| **CustomButton.js** | Styled button component used across the app |
| **CustomTextInput.js** | Styled text input field |
| **PackageCard.js** | Card component to display individual catering packages |

---

## 🔄 KEY INTERACTIONS & COMMUNICATION PATTERNS

### **1. State → UI Binding (Selectors)**

Screens subscribe to Redux state using `useSelector()`:

```javascript
// In HomeScreen.js
const user = useSelector(state => state.auth.user);
const bookings = useSelector(state => state.booking.bookings);
const isLoading = useSelector(state => state.auth.isLoading);
```

**Result:** When Redux state changes, component automatically re-renders

---

### **2. User Action → Saga → API → Reducer → State**

Example: User clicks "Login"

```javascript
// Step 1: DISPATCH ACTION (from LoginScreen.js)
dispatch(loginRequest({ username: "user@example.com", password: "pwd123" }));

// Step 2: SAGA INTERCEPTS (in sagas/auth.js)
function* handleLogin(action) {
  // Make API call
  const response = yield call(loginApi, action.payload);
  
  // Save token to AsyncStorage
  yield call(saveToken, response.token);
  
  // Dispatch success action to Redux
  yield put(loginSuccess({ user: response.user, token: response.token }));
}

// Step 3: REDUCER UPDATES STATE (in authSlice.js)
loginSuccess(state, action) {
  state.user = action.payload.user;
  state.token = action.payload.token;
  state.isLoggedIn = true;
}

// Step 4: UI RE-RENDERS (in navigation/index.js)
const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
{isLoggedIn ? <MainNav /> : <AuthNav />}  // Automatically switches
```

---

### **3. Protected API Requests with Token Injection**

When any API request is made, the token is automatically included:

```javascript
// In utils/apiClient.js
async function makeRequest(endpoint, options = {}) {
  const token = await getToken();  // Retrieved from AsyncStorage
  
  const headers = {
    'Authorization': `Bearer ${token}`,  // Automatically added
    'Content-Type': 'application/json',
  };
  
  const response = await fetch(API_BASE_URL + endpoint, {
    ...options,
    headers,
  });
  
  return response.json();
}
```

**Result:** Every request to the backend includes the JWT, allowing backend to authenticate the user

---

### **4. Token Persistence Across App Restarts**

```javascript
// In authSlice.js
const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,  // Saves to device storage
  blacklist: [],
};

// On app restart:
// 1. Redux-persist automatically rehydrates Redux state from AsyncStorage
// 2. If token exists in Redux, user is considered logged in
// 3. Navigation component checks isLoggedIn and shows MainNav
// 4. Token is ready for use in API requests
```

---

## 🎯 TYPICAL USER FLOWS (with files involved)

### **Flow 1: User Logs In**
```
LoginScreen.js
  ↓ (dispatch loginRequest)
redux/authSlice.js (updates isLoading)
  ↓ (action intercepted)
app/sagas/auth.js (makes API call)
  ↓ (saves token)
utils/tokenStorage.js
  ↓ (dispatch loginSuccess)
redux/authSlice.js (updates user, token, isLoggedIn)
  ↓ (state changes)
navigations/index.js (detects isLoggedIn=true)
  ↓ (renders MainNav)
HomeScreen.js (displays user welcome)
```

### **Flow 2: Viewing Bookings**
```
BookingsScreen.js
  ↓ (useEffect dispatch loadBookingsRequest)
redux/bookingSlice.js (sets loading=true)
  ↓ (action intercepted)
app/sagas/bookings.js (intercepts and calls fetchProtectedResource)
  ↓
api/client.js (retrieves token, adds to headers)
  ↓
utils/apiClient.js (makes GET /api/bookings request)
  ↓ (backend validates token)
Backend API
  ↓ (returns user's bookings)
app/sagas/bookings.js (dispatch loadBookingsSuccess)
  ↓
redux/bookingSlice.js (updates bookings array)
  ↓
BookingsScreen.js (re-renders with new booking list)
```

### **Flow 3: User Logs Out**
```
HomeScreen.js
  ↓ (dispatch logout)
redux/authSlice.js (clears user, token, isLoggedIn=false)
  ↓ (state changes)
navigations/index.js (detects isLoggedIn=false)
  ↓ (renders AuthNav)
LoginScreen.js (user back at login)
```

---

## 🔐 Authentication & Token Management

**How tokens work in your app:**

1. **Login**: User credentials sent → backend validates → returns JWT token
2. **Storage**: Token saved in AsyncStorage (encrypted, persists across app restarts)
3. **Request**: Every API request automatically includes token in Authorization header
4. **Validation**: Backend checks token validity; returns 401 if expired
5. **Logout**: Token cleared from AsyncStorage and Redux

**Token Flow:**
```
Symfony Backend issues JWT
  ↓
Saga stores in AsyncStorage via saveToken()
  ↓
Saga stores in Redux state.auth.token
  ↓
API client retrieves token via getToken()
  ↓
Token added to Authorization header for every request
  ↓
Backend validates and returns protected data
```

---

## 🐛 DEBUGGING FEATURES

Your app includes extensive console logging:

| Location | Logs |
|----------|------|
| **tokenStorage.js** | 🔐 Token save/retrieve/clear with timestamps |
| **sagas/auth.js** | 🌐 API calls, responses, token decoding |
| **apiClient.js** | 📨 All HTTP requests/responses, status codes |

**To debug:** Open React Native debugger and check Console tab. All actions include timestamps and data details.

---

## 📋 QUICK REFERENCE: Adding a New Feature

### Example: Add a "Favorites" feature

```javascript
// 1. Create reducer in redux/bookingSlice.js
toggleFavorite(state, action) {
  const booking = state.bookings.find(b => b.id === action.payload);
  if (booking) booking.isFavorite = !booking.isFavorite;
}

// 2. Create action in the slice exports
export const { toggleFavorite } = bookingSlice.actions;

// 3. Use in screen
const dispatch = useDispatch();
const onFavorite = (bookingId) => {
  dispatch(toggleFavorite(bookingId));
};

// 4. If it requires API call, create saga in app/sagas/bookings.js
// 5. Add endpoint in utils/apiEndpoints.js if needed
```

---

## 🎓 KEY CONCEPTS TO EXPLAIN IN YOUR REVIEW

1. **Redux State Management**: "I use Redux with Redux Toolkit for centralized state so multiple screens can access the same data"

2. **Redux-Saga**: "Sagas handle all async operations like API calls. They intercept actions, perform side effects, then dispatch new actions to update Redux"

3. **Token-Based Auth**: "Tokens are securely stored in AsyncStorage and automatically attached to every API request by the apiClient"

4. **Conditional Navigation**: "Navigation is based on Redux state—if user is logged in, they see MainNav; otherwise, AuthNav"

5. **Persistence**: "Redux-persist automatically saves auth data to device storage, so users stay logged in after app restart"

6. **Separation of Concerns**: "Business logic lives in sagas, UI state in Redux, and API communication in apiClient.js"

---

## ✅ Session Checklist: What You Should Know

- [ ] Understand the Redux store structure and what each slice manages
- [ ] Explain how a saga intercepts an action and performs an API call
- [ ] Walk through the login flow from button press to MainNav appearing
- [ ] Explain why tokens need to be stored both in AsyncStorage and Redux
- [ ] Know what each file in `/utils` does and why it's separated
- [ ] Explain how components get data using `useSelector()` and dispatch actions using `useDispatch()`
- [ ] Understand conditional rendering: `isLoggedIn ? <MainNav /> : <AuthNav />`
- [ ] Explain how the API client automatically injects tokens
- [ ] Describe what redux-persist does (saves/restores state)
- [ ] Know how logout works and why navigation automatically switches

---

Good luck with your code review! 🚀
