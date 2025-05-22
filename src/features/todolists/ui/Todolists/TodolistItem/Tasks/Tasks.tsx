import { List } from "@mui/material"
import {DomainTodolist} from '@/features/todolists/model/todolists-slice.ts'
import { TaskItem } from "./TaskItem/TaskItem.tsx"
import { useAppSelector } from "@/common/hooks"
import {selectTasks} from '@/features/todolists/model/tasks-slice.ts';

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const tasks = useAppSelector(selectTasks)

  const filteredTasks = () => {
    let tasksForTodolist = tasks[id]

    switch (filter) {
      case "active":
        return (tasksForTodolist = tasks[id].filter((t) => !t.isDone))
      case "completed":
        return (tasksForTodolist = tasks[id].filter((t) => t.isDone))
      default:
        return tasksForTodolist
    }
  }

  return (
    <>
      {filteredTasks()?.length === 0 ? (
        <p>No tasks in the list</p>
      ) : (
        <List disablePadding sx={{ pt: "20px" }}>
          {filteredTasks() && filteredTasks()?.map((task) => (
            <TaskItem key={task.id} task={task} todolistId={id} />
          ))}
        </List>
      )}
    </>
  )
}
