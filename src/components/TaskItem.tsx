import {Task} from '../App.tsx';
import {ChangeEvent} from 'react';
import {EditableSpan} from './EditableSpan.tsx';
import DeleteIcon from '@mui/icons-material/Delete';
import {Checkbox, IconButton, ListItem} from '@mui/material';

type Props = {
    task: Task
    deleteTask: (taskId: string) => void
    changeTaskStatus: (isDone: boolean, taskId: string) => void
    changeTaskTitle: (newTitle: string) => void
};
export const TaskItem = ({task, deleteTask, changeTaskStatus, changeTaskTitle}: Props) => {

    const deleteTaskHandler = () => deleteTask(task.id)
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        changeTaskStatus(newStatusValue, task.id)
    }

    const liDecoration = task.isDone ? 'line-through' : 'none'

    return (
        <ListItem
            sx={{p: '0', textDecoration: liDecoration}}
            key={task.id}
            className={task.isDone ? 'is-done' : ''}>
            <Checkbox checked={task.isDone}
                   onChange={changeTaskStatusHandler} />
            <EditableSpan value={task.title} changeTaskTitle={changeTaskTitle} />
            <IconButton aria-label="delete" onClick={deleteTaskHandler} size={'small'}>
                <DeleteIcon fontSize="inherit"/>
            </IconButton>
        </ListItem>
    );
};