import { setLoginToken, setShowSignUp } from '../redux/actions/authActions';
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
  fetch('http://localhost:4000/graphqlapi', {
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
      throw new Error(translate(resdata.errors && resdata.errors[0].message ? resdata.error.message: "login_error"))
    }
    if (resdata.data.login.token) {
      store.dispatch(setLoginToken(resdata.data.login));
    }
  })
  .catch(err => {
    alert(err)
  });
}