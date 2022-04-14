import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './navdropdown.css'

export const NavBarDropDown = ({ user }) => {

    return (
        <div className='navbarDropDownMenu'>
            <div className='navbarDropDownList'>
                <div>
                    <NavLink to={`/users/${user.id}`} >
                        Profile
                    </NavLink>
                </div>
                <div>
                    <NavLink to='/users' activeClassName='active'>
                        Users
                    </NavLink>
                </div>
                <div>
                    <LogoutButton />
                </div>
            </div>
        </div>
    )
};