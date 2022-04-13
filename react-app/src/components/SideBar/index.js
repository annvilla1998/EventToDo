import './sidebar.css'
import { Events } from '../Events/index'

export const SideBar = ({user}) => {
    let events = Object.values(user.events)



    return (
        <div className="sidebar-container">
            <div className="sidebar-content">
                <Events events={events} />
            </div>
            <div id="resizer"></div>
            <div className="main content">
                
            </div>
        </div>
    )
}