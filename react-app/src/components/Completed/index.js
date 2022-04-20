import { useSelector, useDispatch } from 'react-redux'
import { CompletedTasks } from './completedTasks'
import { getCompletedTasks } from '../../store/events'
import '../Today/today.css'
import { useEffect } from 'react'

export const Completed = () => {

    const completedTasks = useSelector(state => state.pageState.tasks)
    const taskArr = Object.values(completedTasks)

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getCompletedTasks())
    },[dispatch])

    return (
        <div className="today-container">
            <h3>Completed</h3>
            {taskArr.map(task =>(
                <div key={task.id}>
                  <CompletedTasks task={task} />  
                </div>
            ))}
        </div>
    )
}