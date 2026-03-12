import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { loginRequest, loginSuccess, loginFailure, logout } from '../../redux/authSlice';
import { saveToken, clearToken } from '../../utils/tokenStorage';

// Simulate Symfony /login API call — replace with real fetch() call later
function* fakeLoginApi({ email }) {
  yield delay(800);
  return { email, token: 'fake-jwt-token' };
}

function* handleLogin(action) {
  try {
    const { email, password } = action.payload;
    const response = yield call(fakeLoginApi, { email, password });
    yield call(saveToken, response.token);
    yield put(loginSuccess({ email: response.email }));
  } catch (err) {
    yield put(loginFailure(err.message || 'Login failed'));
  }
}

function* handleLogout() {
  yield call(clearToken);
}

export function* watchAuth() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(logout.type, handleLogout);
}

