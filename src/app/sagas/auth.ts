import { call, put, takeLatest } from 'redux-saga/effects';
import { loginRequest, loginSuccess, loginFailure, logout } from '../../redux/authSlice';
import { saveToken, clearToken, decodeToken } from '../../utils/tokenStorage';
import { loginApi } from '../../api/authApi';
import { LoginCredentials, User, LoginResponse } from '../../types';

function* handleLogin(action: ReturnType<typeof loginRequest>) {
  try {
    const { username, password } = action.payload;
    const response: LoginResponse = yield call(loginApi, { username, password });

    // Decode token to show payload in debugger
    decodeToken(response.token);

    // Save token to AsyncStorage
    yield call(saveToken, response.token);

    console.log(' [LOGIN SUCCESS] User logged in', {
      username: response.username,
      timestamp: new Date().toISOString(),
    });

    const user: User = {
      username: response.user?.username || response.username,
      id: response.user?.id,
      name: response.user?.name,
    };

    yield put(loginSuccess({
      token: response.token,
      user,
    }));
  } catch (err) {
    console.log(err);
    const errorMessage = err instanceof Error ? err.message : 'Login failed';
    yield put(loginFailure(errorMessage));
  }
}

function* handleLogout() {
  try {
    yield call(clearToken);
    console.log(' [LOGOUT] User logged out');
  } catch (error) {
    console.error(' [LOGOUT ERROR]', error);
  }
}

export function* watchAuth() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(logout.type, handleLogout);
}
