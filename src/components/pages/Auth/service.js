import { setLoginToken } from '../../../redux/actions/loginActions';
import { translate } from '../../../localization/service';
import store from '../../../redux/store';

export const signInHandler = (email, password) => {
  const reqBody = {
    query: `
      query Login($email: String!, $password: String!){
        login(email: $email, password: $password) {
          userId
          token
          tokenExpiration
        }
      }
    `,
    variables: {
      email: email,
      password: password
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
      throw new Error(translate(res.errors && res.error.message ? res.error.message: "login_error"))
    }
    return res.json();
  })
  .then(resdata => {
    if (resdata.data.login.token) {
      console.log(resdata.data.login)
      store.dispatch(setLoginToken(resdata.data.login));
    }
  })
  .catch(err => {
    alert(err)
  }
  );
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
    if (resdata.data.login.token) {
      console.log(resdata.data.login)
      store.dispatch(setLoginToken(resdata.data.login));
    }
  })
  .catch(err => {
    alert(err)
  }
  );
}