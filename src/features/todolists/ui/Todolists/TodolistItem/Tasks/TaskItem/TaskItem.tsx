import {Checkbox, IconButton, ListItem} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import {ChangeEvent} from 'react'
import {EditableSpan} from '@/common/components'
import {useAppSelector} from '@/common/hooks'
import {DomainTask} from '@/features/todolists/api/tasksApi.types.ts'
import {TaskStatus} from '@/common/enums'
import {selectTodolists} from '@/features/todolists/model/todolists-slice.ts'
import {useDeleteTaskMutation, useUpdateTaskMutation} from '@/features/todolists/api/tasksApi.ts';
import {createUpdateTaskModel} from '@/common/utils';

type Props = {
    task: DomainTask
    todolistId: string
}
export const TaskItem = ({task, todolistId}: Props) => {
    const todolists = useAppSelector(selectTodolists)

    const [deleteTask] = useDeleteTaskMutation()
    const [updateTask] = useUpdateTaskMutation()

    const deleteTaskHandler = () => {
        deleteTask({taskId: task.id, todolistId})
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New

        const model = createUpdateTaskModel({status}, task)

        updateTask({todolistId, taskId: task.id, model})
    }

    const changeTaskTitleHandler = (title: string) => {

        const model = createUpdateTaskModel({title}, task)

        updateTask({todolistId, taskId: task.id, model})
    }

    const isTaskCompleted = task.status === TaskStatus.Completed
    const liDecoration = isTaskCompleted ? 'line-through' : 'none'
    const currentTodolist = todolists.find((tl) => tl.id === todolistId)
    const isLoadingEntityStatus = currentTodolist?.entityStatus === 'loading'

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
