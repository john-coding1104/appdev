import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
} from '../actions';

interface AuthState {
  user: unknown | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

interface AuthAction {
  type: string;
  payload?: unknown;
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

export default function auth(state = initialState, action: AuthAction): AuthState {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        isLoggedIn: true,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload as string,
      };
    case LOGOUT_REQUEST:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
