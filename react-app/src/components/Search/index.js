import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import './search.css'


export const SearchBar = () => {
    const [tasks, setTasks] = useState([])
    const [query, setQuery] = useState("")
    const [showDropdown, setShowDropdown] = useState(false)
    const [text, setText] = useState("")

    useEffect(() => {
      async function fetchData() {
        const response = await fetch('/api/tasks/all');
        const responseData = await response.json();
        setTasks(Object.values(responseData));
      }
      fetchData();
    }, []);

    useEffect(() => {
        if (!showDropdown) return;
        let ignoreSearch = document.getElementById("search")

        const closeMenu = (e) => {
            let target = e.target
            if(target === ignoreSearch || ignoreSearch.contains(target)){
                return;
            }
            setShowDropdown(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showDropdown]);

    const getFilteredTasks = (query, tasks) => {

        if(!query) {
            return tasks;
        }
        
        return tasks.filter(task => task.name.toLowerCase().includes(query.toLowerCase()))
    }
   const filteredTasks = getFilteredTasks(query, tasks)
    

    return (
        <div className="search">
            <input type="text"
            onChange={e => {setQuery(e.target.value);setText(e.target.value)}}
            id="search"
            placeholder="Search For Tasks"
            autoComplete='off'
            value={text}
            onClick={() => setShowDropdown(true)}
            />
            {showDropdown && (
                <div id="search-list" >
                    {filteredTasks.map(value => (
                        <Link  key={value.id} onClick={() => {setShowDropdown(false);setText("")}} to={`/events/${value.event_id}`}>
                            <div className="task-link-search">
                            {value.name}
                            </div>
                        </Link>
                    ))}
                </div>            
            )}
        </div>    
    )
}


