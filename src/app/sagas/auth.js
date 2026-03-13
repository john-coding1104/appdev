import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { loginRequest, loginSuccess, loginFailure, logout } from '../../redux/authSlice';
import { saveToken, clearToken, decodeToken } from '../../utils/tokenStorage';

// Using Wi-Fi IP for physical device connectivity
const API_BASE_URL = 'http://192.168.137.108:8000/api';

// Real Symfony API call
function* loginApi({ username, password }) {
  try {
    console.log('🌐 [API CALL] Sending login request to Symfony backend', {
      username,
      timestamp: new Date().toISOString(),
    });

    const response = yield fetch(`${API_BASE_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = yield response.json();
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }

    const data = yield response.json();
    
    console.log('✅ [API RESPONSE] Token received from Symfony', {
      timestamp: new Date().toISOString(),
      token: data.token,
      user: data.user,
      fullResponse: data,
    });

    // Decode token to show payload in debugger
    decodeToken(data.token);

    return {
      token: data.token,
      user: data.user,
      username,
    };
  } catch (error) {
    console.error('❌ [API ERROR]', {
      message: error.message,
      timestamp: new Date().toISOString(),
    });
    throw error;
  }
}

function* handleLogin(action) {
  try {
    const { username, password } = action.payload;
    const response = yield call(loginApi, { username, password });
    
    // Save token to AsyncStorage
    yield call(saveToken, response.token);
    
    console.log('🎉 [LOGIN SUCCESS] User logged in', {
      username: response.username,
      timestamp: new Date().toISOString(),
    });
    
    yield put(loginSuccess({ 
      token: response.token,
      user: {
        username: response.user?.username || response.username,
        id: response.user?.id,
        name: response.user?.name,
      },
    }));
  } catch (err) {
    console.error('❌ [LOGIN ERROR]', {
      error: err.message,
      timestamp: new Date().toISOString(),
    });
    yield put(loginFailure(err.message || 'Login failed'));
  }
}

function* handleLogout() {
  try {
    yield call(clearToken);
    console.log('✅ [LOGOUT] User logged out');
  } catch (error) {
    console.error('❌ [LOGOUT ERROR]', error);
  }
}

export function* watchAuth() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(logout.type, handleLogout);
}

