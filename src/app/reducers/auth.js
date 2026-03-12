import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
} from '../actions';

const initialState = {
  user: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

export default function auth(state = initialState, action) {
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
        error: action.payload,
      };
    case LOGOUT_REQUEST:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}

