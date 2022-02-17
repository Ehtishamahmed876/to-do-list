import React, { useState, useEffect } from 'react';
// import './Todo.css';


function Task({ task, index, completeTask, removeTask }) {
    return (
        <div
            className=" flex border-2 rounded w-full border-white bg-gray-100 p-2 m-2"
            style={{ textDecoration: task.completed ? "line-through" : "" }}
        >
           <span className='flex-1'> {task.title}</span>
          
            <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red  hover:bg-red m-2 " onClick={() => removeTask(index)}>x</button>
            <button className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:bg-teal " onClick={() => completeTask(index)}>Complete</button>
          
        </div>
    );
}

function CreateTask({ addTask }) {
    const [value, setValue] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        addTask(value);
        setValue("");
    }
    return (
        <form className="flex mt-4" onSubmit={handleSubmit}>
            <input
                type="text"
                className="input shadow appearance-none border rounded w-auto py-2 px-3 mr-4  text-grey-darker"
                
                value={value}
                placeholder="Add a new task"
                onChange={e => setValue(e.target.value)}
            />
        </form>
    );
}

function Main() {
    const [tasksRemaining, setTasksRemaining] = useState(0);
    const [tasks, setTasks] = useState([
        {
            title: "Grab some Pizza",
            completed: true
        },
        {
            title: "Do your workout",
            completed: true
        },
        {
            title: "Hangout with friends",
            completed: false
        }
    ]);

    useEffect(() => { setTasksRemaining(tasks.filter(task => !task.completed).length) });


    const addTask = title => {
        const newTasks = [...tasks, { title, completed: false }];
        setTasks(newTasks);
    };

    const completeTask = index => {
        const newTasks = [...tasks];
        newTasks[index].completed = true;
        setTasks(newTasks);
    };

    const removeTask = index => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    };

    return (
        <div className='bg-blue-400 p-4 m-10'>
            <h1 className="text-black font-bold  ">Pending tasks ({tasksRemaining})</h1>
            <div className="border rounded w-auto py-2 px-3 mr-4 bg-green-500 text-grey-darker">
                {tasks.map((task, index) => (
                    <Task
                    task={task}
                    index={index}
                    completeTask={completeTask}
                    removeTask={removeTask}
                    key={index}
                    />
                ))}
            </div>
            <div className="create-task" >
                <CreateTask addTask={addTask} />
            </div>
        </div>
    );
}

export default Main;