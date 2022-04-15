
import './tasks.css'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export const Tasks = () => {
    const { id } = useParams()
    const [startDate, setStartDate] = useState(new Date());

    const tasks = useSelector(state => state.pageState?.events[id]?.tasks)
// console.log(tasks)
    return (
        <div className="tasks-container">
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        </div>
    )
}