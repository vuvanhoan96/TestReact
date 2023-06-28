import { useState } from "react";
import '../style/TodoApp.scss'
import Tasks from "./Tasks";

const TodoApp = () => {

    const [tasks, setTasks] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [filter, setFilter] = useState('all')

    const addTask = () => {

        if (inputValue.trim() !== '') {
            const newTask = {
                id: Math.floor(Math.random() * 100),
                text: inputValue,
                completed: false
            }
            setTasks([...tasks, newTask])
            setInputValue('')
        }
    }
    const completeTask = taskId => {

        const updatedTasks = tasks.map(task => task.id === taskId
            ? { ...task, completed: !task.completed } : task)

        setTasks(updatedTasks)
    }
    const deleteTask = (taskId) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId)

        setTasks(updatedTasks)
    }
    const deleteAllTasks = () => {
        setTasks([])
    }
    const filteredTasks = tasks.filter((task) => {
        if (filter === 'all') {
            return true;
        } else if (filter === 'active') {
            return !task.completed;
        } else if (filter === 'completed') {
            return task.completed;
        }
        return true;
    });
    return (
        <div className="todo-app">
            <h1>#Todo</h1>
            <div className="container">
                <Tasks
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    addTask={addTask}
                    tasks={tasks}
                    setTasks={setTasks}
                    completeTask={completeTask}
                    deleteTask={deleteTask}
                    deleteAllTasks={deleteAllTasks}
                    filteredTasks={filteredTasks}
                    setFilter={setFilter}
                    filter={filter}
                />
            </div>
        </div>
    )
}
export default TodoApp;