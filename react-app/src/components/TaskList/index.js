import { useParams } from 'react-router-dom'
import { Tasks } from '../Tasks/index'
import '../Tasks/tasks.css'

export const TaskList = ({events}) => {
    // const location = useLocation()
    // const event = location.state?.event?.tasks
    // const tasksArr = Object?.values(event)
    const { id } = useParams()
    const tasks = events[id]?.tasks
    // const tasksArr = Object.values(event?.tasks)
    return (
        <div className="tasks-container">
            <h2>Tasks</h2>
                {tasks.map(task => (
                    <div key={task?.id}>
                        <Tasks task={task} />
                    </div>
                ))}
        </div>
    )
}