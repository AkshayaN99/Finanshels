import React, { useState } from 'react';
import axios from 'axios';

const AddTask = () => {
    const [taskName, setTaskName] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/tasks', { name: taskName })
            .then(response => {
                setTaskName('');
                console.log('Task added:', response.data);
            })
            .catch(error => console.error('Error adding task:', error));
    };

    return (
        <div>
            <h2>Add Task</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    required
                />
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default AddTask;
