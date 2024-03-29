import { AuthState } from "../reducers/authReducer";

export const SET_LOGIN_TOKEN = "SET_LOGIN_TOKEN";
export const SHOW_SIGNUP = "SHOW_SIGNUP";
export const CLEAR_LOGIN = "CLEAR_LOGIN";
export const SET_LOGIN_FAILED = 'SET_LOGIN_FAILED';
export const RESET_LOGIN = "RESET_LOGIN";
// @ts-ignore
export function setLoginToken(data) {
  return {
    type: SET_LOGIN_TOKEN,
    payload: {
      loginToken: data.token,
      userId: data.userId,
      tokenExpiration: data.tokenExpiration,
    },
  };
}

export function doLogout() {
  return {
    type: CLEAR_LOGIN
  };
}

// @ts-ignore
export function setLoginFailed(message) {
  return {
    type: SET_LOGIN_FAILED,
    payload: {
      message,
    },
  };
}

// @ts-ignore
export function resetLogin(message) {
  return {
    type: RESET_LOGIN,
  };
}

// @ts-ignore
export function setShowSignUp(data) {
  return {
    type: SHOW_SIGNUP,
    payload: {
      showSignup: data.showSignup,
      userInfo: data.userInfo || null,
    },
  };
}
