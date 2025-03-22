import {FilterValue, Task} from '../App.tsx';
import {Button} from './Button.tsx';
import {ChangeEvent, KeyboardEvent, useState} from 'react';

type Props = {
    title: string
    tasks: Task[]
    date?: string
    deleteTask: (taskId: string) => void
    changeFilter: (filterValue: FilterValue) => void
    createTask: (newTaskTitle: string) => void
    changeTaskStatus: (isDone: boolean, taskId: string) => void
    currentFilterStatus: FilterValue
}

export const TodolistItem = (Props: Props) => {

    const {title, tasks, date, deleteTask, changeFilter, createTask, changeTaskStatus, currentFilterStatus} = Props

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onAllClickHandler = () => changeFilter('all')
    const onActiveClickHandler = () => changeFilter('active')
    const onCompletedClickHandler = () => changeFilter('completed')

    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
        setError(null)
    }

    const createTaskHandler = () => {
        const trimmedTitle = newTaskTitle.trim()
        if (trimmedTitle !== '') {
            createTask(trimmedTitle)
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    const createTaskOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') createTaskHandler()
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={changeTaskTitleHandler}
                       onKeyDown={createTaskOnEnterHandler}
                       className={error ? 'error' : ''}
                />
                <Button title={'+'} onClick={createTaskHandler}/>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        const deleteTaskHandler = () => deleteTask(task.id)
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatus(newStatusValue, task.id)
                        }
                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox" checked={task.isDone}
                                       onChange={changeTaskStatusHandler}/>
                                <span>{task.title}</span>
                                <Button title={'x'} onClick={deleteTaskHandler}/>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button title={'All'}
                        onClick={onAllClickHandler}
                        className={currentFilterStatus === 'all' ? 'active-filter' : ''}
                />
                <Button title={'Active'}
                        onClick={onActiveClickHandler}
                        className={currentFilterStatus === 'active' ? 'active-filter' : ''}
                />
                <Button title={'Completed'}
                        onClick={onCompletedClickHandler}
                        className={currentFilterStatus === 'completed' ? 'active-filter' : ''}
                />
            </div>
            <div>{date}</div>
        </div>
    )
}