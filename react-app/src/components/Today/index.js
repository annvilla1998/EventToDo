import { useSelector, useDispatch } from "react-redux"
import './today.css'
import { TodayTasks } from '../Today/todayTasks'
import { useEffect } from 'react'
import { getTodayTasks } from "../../store/events"

export const Today = () => {
    const todayTasks = useSelector(state => state.pageState.tasks)
    const taskArr = Object.values(todayTasks)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getTodayTasks())
    },[dispatch])

    return (
        <div className="today-container">
            <h3>Today</h3>
            {taskArr.map(task => (
                <div key={task.id}>
                    <TodayTasks task={task}/>
                </div>
            ))}
        </div>
    )
}