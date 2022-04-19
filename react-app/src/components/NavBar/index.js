
import React from 'react';
import { useState, useEffect } from 'react'
import { NavBarDropDown } from '../NavBarDropDown/index'
import './NavBar.css'

const NavBar = ({ user }) => {
  const [showDropDown, setShowDropDown] = useState(false)

  const clickHandler = () => {
    showDropDown === false ? setShowDropDown(true) : setShowDropDown(false)
  }

  useEffect(() => {
    if (!showDropDown) return;

    const closeMenu = () => {
        setShowDropDown(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showDropDown]);



  return (
    <nav className="navBar">       
        <div className='navbarDropDownContainer'>
          <div className="profile-circle">
            <img
                src={user.profile_image}
                onClick={clickHandler}
                className='navbar-profile-photo'
                alt='profile pic' />
          </div>
            {showDropDown &&
                <NavBarDropDown user={user} />
            }
        </div>
    </nav>
  );
}

export default NavBar;
