import {Checkbox, IconButton, ListItem} from '@mui/material';
import {EditableSpan} from '@/common/components/EditableSpan/EditableSpan.tsx';
import DeleteIcon from '@mui/icons-material/Delete';
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, Task} from '@/features/todolists/model/tasks-reducer.ts';
import {ChangeEvent} from 'react';
import {useAppDispatch} from '@/common/hooks/useAppDispatch.ts';

type Props = {
    task: Task
    todolistId: string
};
export const TaskItem = ({task, todolistId}: Props) => {

    const dispatch = useAppDispatch()

    const deleteTaskHandler = () => {
        dispatch(deleteTaskAC({taskId: task.id, todolistId}))
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const isDone = e.currentTarget.checked
        dispatch(changeTaskStatusAC({todolistId, taskId: task.id, isDone}))
    }

    const changeTaskTitleHandler = (title: string) => {
        dispatch(changeTaskTitleAC({todolistId, taskId: task.id, title}))
    }

    const liDecoration = task.isDone ? 'line-through' : 'none'

    return (
        <ListItem
            disablePadding
            sx={{textDecoration: liDecoration}}
            className={task.isDone ? 'is-done' : ''}>
            <Checkbox checked={task.isDone}
                      onChange={changeTaskStatusHandler} />
            <EditableSpan value={task.title} changeTaskTitle={changeTaskTitleHandler} />
            <IconButton aria-label="delete" onClick={deleteTaskHandler} >
                <DeleteIcon fontSize={'small'}/>
            </IconButton>
        </ListItem>
    );
};