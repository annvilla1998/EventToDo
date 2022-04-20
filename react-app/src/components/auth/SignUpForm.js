import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link } from 'react-router-dom';
import { signUp } from '../../store/session';
import './login.css'
import logo from '../../assets/logo.png'
import image1 from '../../assets/eventtodocarouselimage1.jpg'
import image2 from '../../assets/eventtodocarouselimage2.webp'
import image3 from '../../assets/eventtodocarouselimage3.jpg'
import image4 from '../../assets/eventtodocarouselimage4.jpg'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [mousedOver, setMousedOver] = useState(false);


  const validate = () => {
    const validationErrors = []

    if (password !== repeatPassword) validationErrors.push("Your passwords don't match")

    // if (!email) validationErrors.push('Please provide an Email');

    // if (!username) validationErrors.push('Please provide Username');

    // if(!email.trim()
    // .match(/^(?!\.)[\w+\-.]+(?<!\.)@[\w-]+(\.[a-z\d-]+)*\.[a-z]+$/i)){
    //   validationErrors.push('Please provide a valid Email');
    // }

    // if(profileImage && (!profileImage.includes(".jpg")
    //  || !profileImage.endsWith(".jpeg")
    //  || !profileImage.endsWith(".png")
    //  || !profileImage.endsWith(".jfif")
    //  || !profileImage.endsWith(".pjpeg")
    //  || !profileImage.endsWith(".pjp"))){
    //    validationErrors.push("Please provide a valid image file (.jpg, .png, .jpeg)")
    // }
    // const isImgLink = (url) => {
    //   if (typeof url !== 'string') {
    //     return false;
    //   }
    //   return (url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) !== null);
    // }

    // if((profileImage && !isImgLink(profileImage))){
    //   validationErrors.push("Please provide a valid image file (.jpg, .png, .jpeg)")
    // }
    
    return validationErrors

  }


  //carousel
  useEffect(() => {
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
        }, 4000);
  },[mousedOver])

  const onSignUp = async (e) => {
    e.preventDefault();
    const errors = validate()
    
    if(errors.length > 0) return setErrors(errors)
    
    const data = await dispatch(signUp(username, email, password, profileImage));
    if(data) {
      setErrors(data)
    }
    // setErrors([])
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
    <div onMouseOver={() => setMousedOver(true)} id="login-wrapper">
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
                <div className="signupForm">
                    <div id="loginLogo">
                      eventtodo<img alt="logo" src={logo}/>
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
                            placeholder="Username"
                            onChange={updateUsername}
                            value={username}
                          ></input>
                        </div>
                        <div className="login-inputs">
                          <label>Email</label>
                          <input
                            type='text'
                            name='email'
                            placeholder="Email"
                            onChange={updateEmail}
                            value={email}
                          ></input>
                        </div>
                        <div className="login-inputs">
                            <label>Profile Picture (Optional)</label>
                            <input
                            type='text'
                            name="profileImage"
                            placeholder="Profile Picture"
                            value={profileImage}
                            onChange={e => setProfileImage(e.target.value)}
                            />
                        </div>
                        <div className="login-inputs">
                          <label>Password</label>
                          <input
                            type='password'
                            name='password'
                            placeholder="Password"
                            onChange={updatePassword}
                            value={password}
                          ></input>
                        </div>
                        <div className="login-inputs">
                          <label>Confirm Password</label>
                          <input
                            type='password'
                            name='repeat_password'
                            placeholder="Confirm Password"
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
              <a className="tech-icons" href="https://www.linkedin.com/in/anabel-villalobos-5772ab196/" target="blank"><i className="fa-brands fa-linkedin"></i></a>
            </footer>
        </div>
      </div>
  );
};

export default SignUpForm;
