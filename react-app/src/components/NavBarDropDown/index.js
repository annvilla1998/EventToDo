// import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './navdropdown.css'

export const NavBarDropDown = ({ user }) => {

    return (
        <div className='navbarDropDownMenu'>
            <div className='navbarDropDownList'>
                <div>
                    <LogoutButton />
                </div>
            </div>
        </div>
    )
};