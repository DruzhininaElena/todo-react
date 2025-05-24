import {Checkbox, IconButton, ListItem} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import {changeTaskStatusTC, changeTaskTitleTC, deleteTaskTC} from '@/features/todolists/model/tasks-slice.ts'
import {ChangeEvent} from 'react'
import {EditableSpan} from '@/common/components'
import {useAppDispatch} from '@/common/hooks'
import {DomainTask, TaskStatus} from '@/features/todolists/api/tasksApi.types.ts';

type Props = {
  task: DomainTask
  todolistId: string
}
export const TaskItem = ({ task, todolistId }: Props) => {
  const dispatch = useAppDispatch()

  const deleteTaskHandler = () => {
    dispatch(deleteTaskTC({ taskId: task.id, todolistId }))
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const isDone = e.currentTarget.checked
    dispatch(changeTaskStatusTC({ task, status: isDone ? TaskStatus.Completed : TaskStatus.New }))
  }

  const changeTaskTitleHandler = (title: string) => {
    dispatch(changeTaskTitleTC({ task, title }))
  }

  const isTaskCompleted = task.status === TaskStatus.Completed
  const liDecoration = isTaskCompleted ? "line-through" : "none"

  return (
    <ListItem disablePadding sx={{ textDecoration: liDecoration }} className={isTaskCompleted ? "is-done" : ""}>
      <Checkbox checked={isTaskCompleted} onChange={changeTaskStatusHandler} />
      <EditableSpan value={task.title} changeTaskTitle={changeTaskTitleHandler} />
      <IconButton aria-label="delete" onClick={deleteTaskHandler}>
        <DeleteIcon fontSize={"small"} />
      </IconButton>
    </ListItem>
  )
}
