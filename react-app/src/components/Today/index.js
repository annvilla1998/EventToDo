import { useSelector } from "react-redux"
import './today.css'

export const Today = () => {
    const userTasks = useSelector(state =>state.session.user.tasks)
    const taskArr = Object.values(userTasks)

    return (
        <div className="today-container">
            <h2>Today</h2>
            {taskArr.map(task => (
                <div key={task.id}>
                    <input className="task checkbox" type="checkbox" />
                    <div>{task.name}</div>
                    <div>{task.description}</div>
                    <div>{task.due_date}</div>
                </div>
            ))}
        </div>
    )
}