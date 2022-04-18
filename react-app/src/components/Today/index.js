import { useSelector } from "react-redux"
import './today.css'
import { TodayTasks } from '../Today/todayTasks'

export const Today = () => {
    const userTasks = useSelector(state =>state.session.user.tasks)
    // const taskArr = Object.values(userTasks)
    let today = new Date()
    const day = String(today.getDate()).padStart(2, '0')
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    today= `${month}/${day}/${year}`

//     let todayTasks = [];
//     for(let i = 0; i < userTasks.length; i++){
//         const task = userTasks[i];
//         const date = new Date(task.due_date)
//         const dueDate = date.getDate()
//         const dueMonth = date.getMonth()
//         const dueYear = date.getFullYear()
//         const parsedDueDate = `${dueMonth}/${dueDate}/${dueYear}`
//         if(parsedDueDate === today) {
//             todayTasks.push(task)
//         }
//     }
// console.log(todayTasks)

    return (
        <div className="today-container">
            <h2>Today</h2>
            {userTasks.map(task => (
                <div key={task.id}>
                    <TodayTasks today={today} task={task}/>
                </div>
            ))}
        </div>
    )
}