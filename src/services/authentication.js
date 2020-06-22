import { setLoginToken, setShowSignUp, setLoginFailed } from '../redux/actions/authActions';
import { translate } from '../localization/service';
import { observeLogin } from '../redux/observers/loginObserver'
import { retrieveTodoList} from './todo'
import store from '../redux/store';
import { doFetch } from './todo';
import { TRIAL_PERIOD } from '../constants'

export const signInHandler = (email, password) => {
  const reqBody = {
    query: `
      query Login($email: String!, $password: String!, $expiration: Int!){
        login(email: $email, password: $password, expiration: $expiration) {
          userId
          token
          tokenExpiration
        }
      }
    `,
    variables: {
      email,
      password,
      expiration: TRIAL_PERIOD
    }
  }
  doFetch(reqBody)
  .then(resdata => {
    if (resdata.data && resdata.data.login && resdata.data.login.token) {
      store.dispatch(setLoginToken(resdata.data.login));
    } else { 
      throw new Error(translate(resdata.errors && resdata.errors[0].message ? resdata.errors[0].message: "login_error"))
    }
  })
  .catch(err => {
    store.dispatch(setLoginFailed(err.message));
  });
}

export const signUpHandler = (email, password, firstName, lastName, type) => {
   const reqBody = {
      query: `mutation CreateUser ($email: String!, $password: String!, $lastName: String!, $firstName: String!, $type: String!){
        createUser(userInput: {
            email: $email,
            password: $password,
            lastName: $lastName,
            firstName: $firstName,
            type: $type
        }) {
            email
            _id
            lastName
            firstName
            type
        }
      }`,
      variables: {
        email,
        password,
        lastName,
        firstName,
        type
      }
    }
  doFetch(reqBody)
  .then(resdata => {
    if (resdata.errors && resdata.errors.length) {
      throw new Error(translate(resdata.errors[0].message))
    }
    if (resdata.data && resdata.data.createUser && resdata.data.createUser._id) {
      store.dispatch(setShowSignUp({showSignup: false, userInfo: resdata.data.createUser}));
    }
  })
  .catch(err => {
    debugger;
    console.log('Signup failed', err.message);
    store.dispatch(setLoginFailed(translate('signup_failed')));
  }
  );
}

observeLogin(store, loggedIn => {
  if (!loggedIn) {
    return;
  }
  retrieveTodoList();
});