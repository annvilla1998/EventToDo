import { useSelector } from 'react-redux'
import { CompletedTasks } from './completedTasks'
import '../Today/today.css'

export const Completed = () => {

    const allTasks = useSelector(state => state.session.user.tasks)
    const allTasksArr = Object.values(allTasks)
    const completedTasks = allTasksArr.filter(task => task.completed)

    

   

    return (
        <div className="today-container">
            <h2>Completed</h2>
            {completedTasks.map(task =>(
                <div key={task.id}>
                  <CompletedTasks task={task} />  
                </div>
            ))}
        </div>
    )
}