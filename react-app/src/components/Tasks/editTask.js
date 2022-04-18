// import { useSelector, useDispatch } from 'react-redux'
// import { useState } from 'react'
// import { editOneTask, removeTask } from '../../store/events'
// import { Modal } from '../../context/modal';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// export const EditTask = ({task}) => {
//     const dispatch = useDispatch()
//     const [errors, setErrors] = useState([]);
//     const [editedTaskName, setEditedTaskName] = useState(task.name)
//     const [editedDescription, setEditedDescription] = useState(task.description)
//     const [editedDueDate, setEditedDueDate] = useState(new Date(task.due_date))
//     const sessionUser = useSelector(state => state.session.user);

//     const handleEditTask = async(e) => {
//         e.preventDefault()
//         if(editedTaskName !== ""){
//             const editedTask= {
//                 id: task.id,
//                 name: editedTaskName,
//                 user_id: sessionUser.id
//             }
//             await dispatch(editOneTask(editedTask))
//             setErrors([])
//         }else{
//             errors.push("Give your task a name!")
//         }
//     }




//     const cancelForm = async(e) => {
//         e.preventDefault()
//         const taskForm = document.querySelector(".edit-task-form form")
//         taskForm.style.display = "none"
//     } 

//     return (
//         <div className="edit-task-form">
//             <form style={{ display: 'none' }}>
//                 <div id="errors">
//                     {errors.map((error, ind) => (
//                         <div key={ind}>{error}</div>
//                     ))}
//                 </div>
//                 <input
//                     type="text"
//                     placeholder="Task Name"
//                     value={editedTaskName}
//                     onChange={e => setEditedTaskName(e.target.value)}
//                 />
//                 <textarea
//                     type="text"
//                     placeholder="Description"
//                     value={editedDescription}
//                     onChange={e => setEditedDescription(e.target.value)}
//                 />
//                 <DatePicker
//                     selected={editedDueDate}
//                     onChange={(date) => setEditedDueDate(date)}
//                 />
//                 <button onClick={handleEditTask}>Edit Task</button>
//                 <button onClick={cancelForm}>Cancel</button>
//             </form>
//         </div>
//     )
// }