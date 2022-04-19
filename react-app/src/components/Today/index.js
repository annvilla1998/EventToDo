import { useSelector } from "react-redux"
import './today.css'
import { TodayTasks } from '../Today/todayTasks'

export const Today = () => {
    const userTasks = useSelector(state =>state.session.user.tasks)
    const taskArr = Object.values(userTasks)
    let today = new Date()
    // const day = today.getDate()
    // const month = today.getMonth()
    // const year = today.getFullYear();
    // today= `${month}/${day}/${year}`
    today = today.toLocaleDateString()

    let todayTasks = [];
    for(let i = 0; i < taskArr.length; i++){
        const task = taskArr[i];
        const date = new Date(task.due_date)
        const dueDate = date.getDate()
        const dueMonth = date.getMonth() 
        const dueYear = date.getFullYear()
        const parsedDueDate = `${dueMonth + 1}/${dueDate + 1}/${dueYear}`
        // const parsedDueDate = date.toLocaleDateString()
        if(parsedDueDate === today) {
            todayTasks.push(task)
        }
    }

    return (
        <div className="today-container">
            <h2>Today</h2>
            {todayTasks.map(task => (
                <div key={task.id}>
                    <TodayTasks today={today} task={task}/>
                </div>
            ))}
        </div>
    )
}