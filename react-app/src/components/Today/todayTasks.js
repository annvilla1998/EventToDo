

export const TodayTasks = ({task, today}) => {
    // const date = new Date(task.due_date)
    // const dueDate = date.getDate()
    // const dueMonth = date.getMonth()
    // const dueYear = date.getFullYear()
    // const parsedDueDate = `${dueMonth}/${dueDate}/${dueYear}`
    
    
    return  (
        <>
            <div className="task-list-container" key={task.id}>
                <input className="task checkbox" type="checkbox" />
                <div className="task-name-description">
                    <li className="task name">{task?.name}</li>
                    <li className="task description">{task?.description}</li>
                    <li className="task due-date">Scheduled for today</li>
                </div>
            </div>
        </>
    )
}