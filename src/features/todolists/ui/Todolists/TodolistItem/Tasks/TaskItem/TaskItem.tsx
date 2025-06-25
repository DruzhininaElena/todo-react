import {Checkbox, IconButton, ListItem} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import {ChangeEvent} from 'react'
import {EditableSpan} from '@/common/components'
import {DomainTask} from '@/features/todolists/api/tasksApi.types.ts'
import {TaskStatus} from '@/common/enums'
import {useDeleteTaskMutation, useUpdateTaskMutation} from '@/features/todolists/api/tasksApi.ts';
import {createUpdateTaskModel} from '@/common/utils';
import {DomainTodolist} from '@/features/todolists/lib/types';

type Props = {
    task: DomainTask
    todolist: DomainTodolist
}
export const TaskItem = ({task, todolist}: Props) => {

    const [deleteTask] = useDeleteTaskMutation()
    const [updateTask] = useUpdateTaskMutation()

    const deleteTaskHandler = () => {
        deleteTask({taskId: task.id, todolistId: todolist.id})
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New

        const model = createUpdateTaskModel({status}, task)

        updateTask({todolistId: todolist.id, taskId: task.id, model})
    }

    const changeTaskTitleHandler = (title: string) => {

        const model = createUpdateTaskModel({title}, task)

        updateTask({todolistId: todolist.id, taskId: task.id, model})
    }

    const isTaskCompleted = task.status === TaskStatus.Completed
    const liDecoration = isTaskCompleted ? 'line-through' : 'none'

    return (
        <ListItem disablePadding sx={{textDecoration: liDecoration}} className={isTaskCompleted ? 'is-done' : ''}>
            <Checkbox checked={isTaskCompleted} onChange={changeTaskStatusHandler}/>
            <EditableSpan value={task.title} changeTaskTitle={changeTaskTitleHandler}/>
            <IconButton aria-label="delete" onClick={deleteTaskHandler}>
                <DeleteIcon fontSize={'small'} />
            </IconButton>
        </ListItem>
    )
}
