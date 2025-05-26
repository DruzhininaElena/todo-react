import {Checkbox, IconButton, ListItem} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import {deleteTaskTC, updateTaskTC} from '@/features/todolists/model/tasks-slice.ts'
import {ChangeEvent} from 'react'
import {EditableSpan} from '@/common/components'
import {useAppDispatch} from '@/common/hooks'
import {DomainTask, TaskStatus, UpdateTaskModel} from '@/features/todolists/api/tasksApi.types.ts';

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
    const domainModel: UpdateTaskModel = {
      title: task.title,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      status: isDone ? TaskStatus.Completed : TaskStatus.New
    }
    dispatch(updateTaskTC({ todolistId: task.todoListId, taskId: task.id, domainModel }))
  }

  const changeTaskTitleHandler = (title: string) => {
    const domainModel: UpdateTaskModel = {
      title,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      status: task.status
    }
    dispatch(updateTaskTC({ todolistId: task.todoListId, taskId: task.id, domainModel }))
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
