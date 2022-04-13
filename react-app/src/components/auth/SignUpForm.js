import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link } from 'react-router-dom';
import { signUp } from '../../store/session';
import './login.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, profileImage));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='loginFormContainer'>
        <div className="loginForm">
            <div className="loginLogo">
              eventtodo<img alt="logo" src="logo.png"/>
            </div>
            <div className="loginFormContent">
                <h1>Sign up</h1>
                <div>Plan around priorities to be able to experience the music you love!!</div>
              <form onSubmit={onSignUp}>
                <div id="errors">
                  {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                  ))}
                </div>
                <div className="login-inputs">
                  <label>User Name</label>
                  <input
                    type='text'
                    name='username'
                    onChange={updateUsername}
                    value={username}
                  ></input>
                </div>
                <div className="login-inputs">
                  <label>Email</label>
                  <input
                    type='text'
                    name='email'
                    onChange={updateEmail}
                    value={email}
                  ></input>
                </div>
                <div className="login-inputs">
                    <label>Profile Picture (Optional)</label>
                    <input
                    type='text'
                    name="profileImage"
                    value={profileImage}
                    onChange={e => setProfileImage(e.target.value)}
                    />
                </div>
                <div className="login-inputs">
                  <label>Password</label>
                  <input
                    type='password'
                    name='password'
                    onChange={updatePassword}
                    value={password}
                  ></input>
                </div>
                <div className="login-inputs">
                  <label>Repeat Password</label>
                  <input
                    type='password'
                    name='repeat_password'
                    onChange={updateRepeatPassword}
                    value={repeatPassword}
                    required={true}
                  ></input>
                </div>
                <button type='submit'>Sign Up</button>
              </form>
            </div>
            <div className="signupLink">
            <p>Already signed up?
              <Link to="/login">Log in</Link>
              </p>
          </div>
        </div>
      </div>
  );
};

export default SignUpForm;
