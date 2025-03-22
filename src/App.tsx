import './App.css'
import {TodolistItem} from './components/TodolistItem.tsx';
import {useState} from 'react';
import {v1} from 'uuid';


export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValue = 'all' | 'active' | 'completed'

export const App = () => {

    const [tasks, setTasks] = useState<Task[]>(
        [
            { id: v1(), title: 'H' + 'TML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
            { id: v1(), title: 'Redux', isDone: false },
            { id: v1(), title: 'Typescript', isDone: false },
            { id: v1(), title: 'RTK query', isDone: false },
        ]
    )

    const [filter, setFilter] = useState<FilterValue>('all')


    function deleteTask(taskId: string) {
        setTasks(tasks.filter(task => task.id !== taskId))
    }

    function createTask(newTaskTitle: string) {
        const newTask: Task = { id: v1(), title: newTaskTitle, isDone: false }
        setTasks([newTask, ...tasks])
    }

    function changeFilter(filterValue: FilterValue) {
        setFilter(filterValue)
    }

    function changeTaskStatus(isDone: boolean, taskId: string) {
        const newState = tasks.map(task => task.id == taskId ? { ...task, isDone } : task)
        setTasks(newState)
    }

    const filteredTasks=()=>{
        let tasksForTodolist = tasks;

        switch (filter) {
            case 'active': return tasksForTodolist = tasks.filter(t => !t.isDone)
            case 'completed': return tasksForTodolist = tasks.filter(t => t.isDone)
            default: return tasksForTodolist
        }
    }

    return (
        <div className="app">
            <TodolistItem title='What to learn'
                          tasks={filteredTasks()}
                          deleteTask={deleteTask}
                          changeFilter={changeFilter}
                          createTask={createTask}
                          changeTaskStatus={changeTaskStatus}
                          currentFilterStatus={filter}
            />
        </div>
    )
}

