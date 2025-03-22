import {Task} from '../App.tsx';
import {Button} from './Button.tsx';
import {ChangeEvent} from 'react';

type Props = {
    task: Task
    deleteTask: (taskId: string) => void
    changeTaskStatus: (isDone: boolean, taskId: string) => void
};
export const TaskItem = ({task, deleteTask, changeTaskStatus}: Props) => {

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
    );
};