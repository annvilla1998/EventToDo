import { useState } from 'react'
import { setCompletedTask } from '../../store/events'
import { useDispatch } from 'react-redux'


export const SetCompleted = ({task}) => {
    const [checked, setChecked] = useState(task.completed)
    const dispatch = useDispatch()

    // useEffect(() => {
    
    //     const completedTask = {
    //         id: task.id,
    //         completed: checked
    //     }
    //     dispatch(setCompletedTask(completedTask))
    // }, [checked, dispatch,task.id])
    const onChange = async() => {
        setChecked(!checked)
        const completedTask = {
            id: task.id,
            completed: !checked
        }
        dispatch(setCompletedTask(completedTask))
    }

    return (
        <>
            {/* <input className="task-checkbox" 
                type="checkbox"
                onChange={({ target: { value, checked }}) => {
                    setChecked((checked ? false : true)); onChange()}
                } 
                value={task.completed}
                /> */}
            <input className="task-checkbox" 
                type="checkbox"
                onChange={onChange}
                checked={checked}
                />
           
        </>
    )
}