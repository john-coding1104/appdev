import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { loginRequest, loginSuccess, loginFailure, logout } from '../../redux/authSlice';
import { saveToken, clearToken, decodeToken } from '../../utils/tokenStorage';

// KEEPING YOUR API URL UNCHANGED (do not modify per request)
const API_BASE_URL = 'http://192.168.5.38:8000/api';

// Real Symfony API call (generator compatible with redux-saga)
function* loginApi({ username, password }) {
  try {
    console.log('🌐 [API CALL] Sending login request to Symfony backend', {
      username,
      timestamp: new Date().toISOString(),
    });

    const response = yield call(fetch, `${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    console.log(response);

    const contentType = response.headers && response.headers.get ? response.headers.get('content-type') : '';

    if (!response.ok) {
      if (contentType && contentType.includes('application/json')) {
        const errorData = yield call([response, response.json]);
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }
      const text = yield call([response, response.text]);
      throw new Error(text ? text.substring(0, 200) : `HTTP ${response.status}`);
    }

    let data;
    if (contentType && contentType.includes('application/json')) {
      data = yield call([response, response.json]);
    } else {
      const text = yield call([response, response.text]);
      throw new Error(`Unexpected response content-type: ${contentType} - ${text.substring(0,200)}`);
    }

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
    console.log('❌ [API ERROR]', error);
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
   console.log(err)
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

