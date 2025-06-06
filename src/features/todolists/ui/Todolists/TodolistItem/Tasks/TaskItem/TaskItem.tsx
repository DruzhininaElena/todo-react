import {Checkbox, IconButton, ListItem} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import {deleteTaskTC, updateTaskTC} from '@/features/todolists/model/tasks-slice.ts'
import {ChangeEvent} from 'react'
import {EditableSpan} from '@/common/components'
import {useAppDispatch, useAppSelector} from '@/common/hooks'
import {DomainTask} from '@/features/todolists/api/tasksApi.types.ts';
import {TaskStatus} from '@/common/enums';
import {selectTodolists} from '@/features/todolists/model/todolists-slice.ts';

type Props = {
    task: DomainTask
    todolistId: string
}
export const TaskItem = ({task, todolistId}: Props) => {
    const dispatch = useAppDispatch()
    const todolists = useAppSelector(selectTodolists)

    const deleteTaskHandler = () => {
        dispatch(deleteTaskTC({taskId: task.id, todolistId}))
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        dispatch(
            updateTaskTC({
                todolistId,
                taskId: task.id,
                domainModel: {status: newStatusValue ? TaskStatus.Completed : TaskStatus.New},
            }),
        )
    }

    const changeTaskTitleHandler = (title: string) => {
        dispatch(updateTaskTC({todolistId, taskId: task.id, domainModel: {title}}))
    }

    const isTaskCompleted = task.status === TaskStatus.Completed
    const liDecoration = isTaskCompleted ? 'line-through' : 'none'
    const currentTodolist = todolists.find(tl => tl.id === todolistId)
    const isLoadingEntityStatus = currentTodolist?.entityStatus ==='loading'

    return (
        <ListItem disablePadding sx={{textDecoration: liDecoration}} className={isTaskCompleted ? 'is-done' : ''}>
            <Checkbox checked={isTaskCompleted} onChange={changeTaskStatusHandler} disabled={isLoadingEntityStatus}/>
            <EditableSpan value={task.title} changeTaskTitle={changeTaskTitleHandler} disabled={isLoadingEntityStatus}/>
            <IconButton aria-label="delete" onClick={deleteTaskHandler} disabled={isLoadingEntityStatus}>
                <DeleteIcon fontSize={'small'}/>
            </IconButton>
        </ListItem>
    )
}
