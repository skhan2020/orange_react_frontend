import React, { useState } from 'react'
import { setLoginToken } from '../../redux/actions/loginActions'
import { useDispatch } from 'react-redux'
import './index.scss'

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const dispatch  = useDispatch();

  const switchModeHandler = () => {
    setIsLogin(!isLogin);
  }

  const submitHandler = event => {
    // validate the inputs
    event.preventDefault();
    if (!email.length || !password.length) {
      alert("Please enter all items!");
      return;
    }

    let reqBody = {
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
    if (!isLogin) {
      reqBody = {
        query: `mutation CreateUser ($email: String!, $password: String!){
          createUser(userInput: {
              email: $email,
              password: $password
          }) {
              email
              _id
          }
        }`,
        variables: {
          email: email,
          password: password
        }
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
        throw new Error("Failed!")
      }
      return res.json();
    })
    .then(resdata => {
      if (resdata.data.login.token) {
        console.log(resdata.data.login)
        dispatch(setLoginToken(resdata.data.login));
      }
    })
    .catch(err => {
      console.log(err)
    }
    );
  }
  return (
    <form className="form" onSubmit={submitHandler}>
      <div className="form-control">
        <label htmlFor="email">E-mail</label>
        <input type="email" id="email"
          value={email} onChange={event => setEmail(event.currentTarget.value)}></input>
      </div>
      <div className="form-control">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={password}
        onChange={event => setPassword(event.currentTarget.value)}></input>
      </div>
      <div className="form-action">
        <button type="submit">Submit</button>
        <button type="button" onClick={switchModeHandler} >Switch to {isLogin ? 'Signup' : 'Login'}</button>
      </div>
    </form>
  )
}

export default AuthPage