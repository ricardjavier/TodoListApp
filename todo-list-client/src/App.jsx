import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/tasks')
            .then(response => setTasks(response.data))
            .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    const addTask = () => {
        axios.post('http://localhost:5000/tasks', { name: newTask, completed: false })
            .then(response => {
                setTasks([...tasks, response.data]);
                setNewTask('');
            })
            .catch(error => console.error('Error adding task:', error));
    };

    return (
        <div>
            <h1>To-Do List</h1>
            <input
                type="text"
                value={newTask}
                onChange={e => setNewTask(e.target.value)}
            />
            <button onClick={addTask}>Add Task</button>
            <ul>
                {tasks.map(task => (
                    <li key={task._id}>{task.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
