import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { login } from '../../store/session';
import './login.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='loginFormContainer'>
      <div className="loginForm">
          <div className="loginLogo">
            eventtodo<img src="logo.png"/>
          </div>
          <div className="loginFormContent">
              <h1>Log in</h1>
              <form onSubmit={onLogin}>
                <div id="errors">
                  {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                  ))}
                </div>
                <div className="login-inputs">
                  <label htmlFor='email'>Email</label>
                  <input
                    name='email'
                    type='text'
                    placeholder='Email'
                    value={email}
                    onChange={updateEmail}
                  />
                </div>
                <div className="login-inputs">
                  <label htmlFor='password'>Password</label>
                  <input
                    name='password'
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={updatePassword}
                  />
                </div>
                <button type='submit'>Login</button>
              </form>
          </div>
          <div className="signupLink">
            <p>Don't have an account? 
              <Link to="/sign-up">Sign up</Link>
              </p>
          </div>
        </div>
      </div>
  );
};

export default LoginForm;
