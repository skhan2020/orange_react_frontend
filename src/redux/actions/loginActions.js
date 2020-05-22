export const SET_LOGIN_TOKEN = "SET_LOGIN_TOKEN"

export function setLoginToken(data) {
  return {
    type: "SET_LOGIN_TOKEN",
    payload: {
      token: data.token,
      userId: data.userId,
      tokenExpiration: data.tokenExpiration,
    },
  };
}

export function doLogout() {
  return {
    type: "CLEAR_LOGIN"
  };
}
