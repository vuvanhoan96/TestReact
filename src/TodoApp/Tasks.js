import { useEffect } from "react";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../style/Tasks.scss'

const Tasks = ({ inputValue, setInputValue, addTask, tasks, setTasks, completeTask, deleteTask, deleteAllTasks, filteredTasks, setFilter, filter }) => {

    useEffect(() => {

        const saveTasks = localStorage.getItem('tasks')
        if (saveTasks) {
            setTasks(JSON.parse(saveTasks))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks])

    return (
        <div className="container">
            <div className='filter-container'>
                <button className={filter === 'all' ? 'btn-all' : ''} onClick={() => setFilter('all')}>All</button>
                <button className={filter === 'active' ? 'btn-active' : ''} onClick={() => setFilter('active')}>Active</button>
                <button className={filter === 'completed' ? 'btn-completed' : ''} onClick={() => setFilter('completed')}>Completed</button>
            </div>
            <input
                type="text"
                placeholder="add details"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button className="btn-add" onClick={addTask}>Add</button>
            <ul className="task-list">
                {filteredTasks.map((task) => (
                    <li key={task.id}>
                        <input
                            type="checkbox"
                            className="input-checkbox"
                            onClick={() => completeTask(task.id)} />

                        <h3 className={task.completed ? 'completed' : 'task'}>{task.text}</h3>

                        {filter === 'completed' && (<FontAwesomeIcon icon={faTrashCan}
                            className="icon"
                            onClick={() => deleteTask(task.id)} />)}
                    </li>
                ))}
            </ul>
            {tasks.length > 0 && filter === 'completed' && (
                <button className="delete-all-btn" onClick={deleteAllTasks}>
                    <FontAwesomeIcon icon={faTrashCan} />
                    <span> </span>
                    Delete All
                </button>
            )}
        </div >
    )
}

export default Tasks;