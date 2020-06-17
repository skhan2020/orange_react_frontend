import { setLoginToken, setShowSignUp, setLoginFailed } from '../redux/actions/authActions';
import { translate } from '../localization/service';
import { observeLogin } from '../redux/observers/loginObserver'
import { retrieveTodoList} from './todo'
import store from '../redux/store';
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
  fetch('https://cryptic-depths-54668.herokuapp.com/graphqlapi', {
    method: 'POST',
    body: JSON.stringify(reqBody),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
    return res.json();
  })
  .then(resdata => {
    if (resdata.errors && resdata.errors.length) {
      throw new Error(translate(resdata.errors && resdata.errors[0].message ? resdata.errors[0].message: "login_error"))
    }
    if (resdata.data.login.token) {
      store.dispatch(setLoginToken(resdata.data.login));
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
  fetch('http://localhost:4000/graphqlapi', {
    method: 'POST',
    body: JSON.stringify(reqBody),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
    if (res.status !== 200 && res.status !== 201) {
      throw new Error(translate("signup_error"))
    }
    return res.json();
  })
  .then(resdata => {
    if (resdata.errors && resdata.errors.length) {
      throw new Error(translate(resdata.errors[0].message))
    }
    if (resdata.data && resdata.data.createUser && resdata.data.createUser._id) {
      store.dispatch(setShowSignUp({showSignup: false, userInfo: resdata.data.createUser}));
    }
  })
  .catch(err => {
    store.dispatch(setLoginFailed(err.message));
  }
  );
}

observeLogin(store, loggedIn => {
  if (!loggedIn) {
    return;
  }
  retrieveTodoList();
});