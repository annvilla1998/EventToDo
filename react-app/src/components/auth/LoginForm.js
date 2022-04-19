import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { login } from '../../store/session';
import './login.css'
import logo from '../../assets/logo.png'
import image1 from '../../assets/eventtodocarouselimage1.jpg'
import image2 from '../../assets/eventtodocarouselimage2.webp'
import image3 from '../../assets/eventtodocarouselimage3.jpg'
import image4 from '../../assets/eventtodocarouselimage4.jpg'

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

  const demoLogin = async(e) => {
    e.preventDefault();
    const demoEmail = 'demo@aa.io';
    const demoPwd = 'password'
    await dispatch(login(demoEmail, demoPwd))
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/today' />;
  }


  //carousel
  const carousel = [...document.querySelectorAll('.carousel img')];

  let carouselImageIndex = 0;

  const changeCarousel = () => {
    carousel[carouselImageIndex].className = "";
    if(carouselImageIndex >= carousel.length - 1){
      carouselImageIndex = 0;
    } else{
      carouselImageIndex++;
    }
    
    carousel[carouselImageIndex].className = "active";

  }

  setInterval(() => {
      changeCarousel();
  }, 6000);

  return (
    <div id="login-wrapper">
      <div className="carousel-container">
        <div className="carousel">
          <img src={image1} className="active" alt=""></img>
          <img src={image2} className="" alt=""></img>
          <img src={image3} className="" alt=""></img>
          <img src={image4} className="" alt=""></img>
          {/* <img src="" alt=""></img> */}
        </div>
      </div>
      <div id="login-page">
        <div className='loginFormContainer'>
          <div className="loginForm">
              <div className="animate__animated animate__backInLeft" id="loginLogo">
                eventtodo<img alt="logo" src={logo}/>
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
                    <p>Want to try it out before signing up?</p>
                    <button type="button" onClick={demoLogin}>Log In As Demo User</button>
                  </form>
              </div>
              <div className="signupLink">
                <p>Don't have an account? 
                  <Link to="/sign-up">Sign up</Link>
                  </p>
              </div>
            </div>
          </div>
          <footer>
              <a className="tech-icons" href="https://github.com/annvilla1998" target="blank"><i className="fa-brands fa-github"></i></a>
              <div id="tech" >Reactjs</div>
              <div id="tech" >Redux</div>
              <div id="tech" >Javascript</div>
              <div id="tech" >Python</div>
              <div id="tech" >Flask</div>
              <div id="tech" >SQLAlchemy</div>
              <div id="tech" >PostgreSQL</div>
              <div id="tech" >HTML</div>
              <div id="tech" >CSS</div>
              <a className="tech-icons" href="https://www.linkedin.com/in/anabel-villalobos-5772ab196/" target=_blank"><i className="fa-brands fa-linkedin"></i></a>
          </footer>
      </div>
    </div>
  );
};

export default LoginForm;
