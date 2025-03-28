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

export type Todolist = {
    id: string
    title: string
    filter: FilterValue
}

export type TaskState = {
    [todolistId: string]: Array<Task>
}

export const App = () => {

    const todolistId_1 = v1()
    const todolistId_2 = v1()

    const [todolists, setTodolists] = useState<Array<Todolist>>(
        [
            {
                id: todolistId_1,
                title: 'What to learn',
                filter: 'all'
            },
            {
                id: todolistId_2,
                title: 'What to buy',
                filter: 'all'
            }
        ]
    )

    const [tasks, setTasks] = useState<TaskState>({
        [todolistId_1]: [
            {id: v1(), title: 'H' + 'TML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'Typescript', isDone: false},
            {id: v1(), title: 'RTK query', isDone: false},
        ],
        [todolistId_2]: [
            {id: v1(), title: 'Water', isDone: true},
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Fish', isDone: false},
            {id: v1(), title: 'Milk', isDone: false}
        ]
    })


    function deleteTask(taskId: string, todolistId: string) {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)
        })
    }

    function createTask(newTaskTitle: string, todolistId: string) {
        setTasks({
            ...tasks,
            [todolistId]: [{id: v1(), title: newTaskTitle, isDone: false}, ...tasks[todolistId]]
        })
    }

    function changeFilter(filterValue: FilterValue, todolistId: string) {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: filterValue} : tl))

    }

    function changeTaskStatus(isDone: boolean, taskId: string, todolistId: string) {
        setTasks(
            {
                ...tasks,
                [todolistId]: tasks[todolistId].map(task => task.id == taskId ? {...task, isDone} : task)
            }
        )
    }

    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
    }


    const todolistsComponents = todolists.map(tl => {

        const filteredTasks = () => {
            let tasksForTodolist = tasks[tl.id];

            switch (tl.filter) {
                case 'active':
                    return tasksForTodolist = tasks[tl.id].filter(t => !t.isDone)
                case 'completed':
                    return tasksForTodolist = tasks[tl.id].filter(t => t.isDone)
                default:
                    return tasksForTodolist
            }
        }

        return (
            <TodolistItem
                key={tl.id}
                todolistId={tl.id}
                title={tl.title}
                tasks={filteredTasks()}
                deleteTask={deleteTask}
                changeFilter={changeFilter}
                createTask={createTask}
                changeTaskStatus={changeTaskStatus}
                currentFilterStatus={tl.filter}
                deleteTodolist={deleteTodolist}
            />
        )
    })

    return (
        <div className="app">
            {!todolists.length ? <h2>No todolists</h2> : todolistsComponents}
        </div>
    )
}

