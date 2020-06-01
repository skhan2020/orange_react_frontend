export const SET_LOGIN_TOKEN = "SET_LOGIN_TOKEN";
export const SHOW_SIGNUP = "SHOW_SIGNUP";
export const CLEAR_LOGIN = "CLEAR_LOGIN";

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

export function setShowSignUp(data) {
  return {
    type: SHOW_SIGNUP,
    payload: {
      showSignup: data.showSignup,
      userInfo: data.userInfo || null,
    },
  };
}
