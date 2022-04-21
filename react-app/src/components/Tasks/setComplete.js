import { useState, useEffect } from 'react'
import { setCompletedTask } from '../../store/events'
import { useDispatch } from 'react-redux'


export const SetCompleted = ({task}) => {
    const [checked, setChecked] = useState(task.completed)
    const dispatch = useDispatch()

    useEffect(() => {
    
        const completedTask = {
            id: task.id,
            completed: checked
        }
        dispatch(setCompletedTask(completedTask))
    }, [checked, dispatch,task.id])
    console.log(checked)
    // const onChange = async() => {
    //     const completedTask = {
    //         id: task.id,
    //         completed: checked
    //     }
    //     dispatch(setCompletedTask(completedTask))
    // }

    return (
        <>
            <input className="task-checkbox" 
                type="checkbox"
                onChange={({ target: { value, checked }}) => {
                    setChecked((checked ? true : false))}
                } 
                checked={checked}
                />
        </>
    )
}