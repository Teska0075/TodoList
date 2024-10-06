"use client"

import { useState, useEffect } from "react";
import css from "./TodoList.module.css"
import { FaTrash } from "react-icons/fa";


const TodoList = () => {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);

    // load tasks from localStorage
    useEffect(()=>{
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    },[])

    // save tasks to localStorage whenever tasks change
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    const handleInputChange = (e) => {
        setTask(e.target.value)
    }

    const addTask = (e) => {
        e.preventDefault();
        if(task.trim() === '') return;
        setTasks([...tasks, {text: task, completed: false}]);
        setTask('')
    }

    const removeTask = (index) => {
        const newTasks = tasks.filter((_,i) => i !== index);
        setTasks(newTasks);
    }

    const toggleTask = (index) => {
        const newTasks = tasks.map((task, i) => i === index ? {...task, completed: !task.completed} : task);
        setTasks(newTasks)
    }

    return (
        <div className={css.container}>
            <div className={css.title}>
                <h1>To-Do List</h1>
            </div>
            <form className={css.form} onSubmit={addTask}>
                <input
                    className={css.input}
                    type="text"
                    value={task}
                    onChange={handleInputChange}
                    placeholder="Add new task"
                />
                <button className={css.addBtn} type="submit" >Add +</button>
            </form>
            
            <div className={css.listContainer} >
            <ul className={css.ul} style={{padding: '0', listStyle: 'none'}}>
                {tasks.map((task, index) => (
                    <li className={css.listItem} key={index} >
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(index)}
                        />
                        <span
                            style={{
                                textDecoration: task.completed ? 'line-through' : 'none',
                                marginLeft: '10px'
                            }}
                            >
                            {task.text}
                        </span>
                        <button 
                            className={css.delBtn}
                            onClick={() => removeTask(index)}
                            >
                            <FaTrash/>
                        </button>
                    </li>
                ))}
            </ul>
                            </div>

        </div>
    )

}

export default TodoList