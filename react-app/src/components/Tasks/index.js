import './tasks.css'


export const Tasks = ({task}) => {


    return (
        <div className="task-list">
            <div className="task-container">
                <div className="task-list-container" key={task.id}>
                    <input className="task-checkbox" type="checkbox" />
                    <div className="task-name-description">
                        <li className="task name">{task?.name}</li>
                        <li className="task description">{task?.description}</li>
                        <li className="task due-date">{task?.due_date}</li>
                    </div>
                </div>
                    
            </div>
        </div>
    )
}