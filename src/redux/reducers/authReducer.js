import { SET_LOGIN_TOKEN, CLEAR_LOGIN, SHOW_SIGNUP } from '../actions/authActions';
import Immutable from 'immutable';

export const initialState = new Immutable.Map({
  isLoggedIn: false,
  loginToken: '', 
  userId: '', 
  firstName: '',
  lastName: '',
  userType: '',
  showSignup: true,
});

const authReducer = (state = initialState, action) => {
  let payload = action.payload;
  switch (action.type) {
    case SET_LOGIN_TOKEN:
      return state.set('loginToken', payload.loginToken)
                  .set('tokenExpiration', payload.tokenExpiration)
                  .set('userId', payload.userId)
                  .set('isLoggedIn', payload.loginToken !== null);
    case CLEAR_LOGIN:
      return state.set('loginToken', "")
                  .set('tokenExpiration', "")
                  .set('userId', null)
                  .set('showSignup', true)
                  .set('isLoggedIn', false);
    case SHOW_SIGNUP:
      if (payload.userInfo) {
        return state.set('firstName', payload.userInfo.firstName || state.firstName)
                    .set('lastName', payload.userInfo.lastName || state.lastName)
                    .set('userId', payload.userInfo._id || state.userId)
                    .set('showSignup', payload.showSignup)
                    .set('userType', payload.userInfo.userType || state.userType);
                } else {
                  return state.set('showSignup', payload.showSignup)
                              .set('userId', payload.userId || state.userId)
                }
    default:
      break
  }
  return state;
}

export default authReducer
