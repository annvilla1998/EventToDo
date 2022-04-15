import { useSelector } from "react-redux"
import './today.css'
import { TodayTasks } from '../Today/todayTasks'

export const Today = () => {
    const userTasks = useSelector(state =>state.session.user.tasks)
    // const taskArr = Object.values(userTasks)

    return (
        <div className="today-container">
            <h2>Today</h2>
            {userTasks.map(task => (
                <div key={task.id}>
                    <TodayTasks task={task}/>
                </div>
            ))}
        </div>
    )
}