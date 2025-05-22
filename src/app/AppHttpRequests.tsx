import { type ChangeEvent, type CSSProperties, useEffect, useState } from "react"
import Checkbox from "@mui/material/Checkbox"
import { CreateItemForm, EditableSpan } from "@/common/components"
import type { Todolist } from "@/features/todolists/api/todolistsApi.types.ts"
import { todolistsApi } from "@/features/todolists/api/todolistApi.ts"
import { tasksApi } from "@/features/todolists/api/tasksApi.ts"
import { DomainTask, TaskStatus, UpdateTaskModel } from "@/features/todolists/api/tasksApi.types.ts"

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([])
  const [tasks, setTasks] = useState<Record<string, DomainTask[]>>({})

  useEffect(() => {
    todolistsApi.getTodolists().then((res) => {
      const todolists = res.data
      setTodolists(todolists)
      todolists.forEach((tl) => {
        tasksApi.getTasks(tl.id).then((res) => {
          setTasks((prevTasks) => ({ ...prevTasks, [tl.id]: res.data.items }))
        })
      })
    })
  }, [])

  const createTodolist = (title: string) => {
    todolistsApi.createTodolist(title).then((res) => {
      const newTodolist = res.data.data.item
      setTodolists([newTodolist, ...todolists])
    })
  }

  const deleteTodolist = (id: string) => {
    todolistsApi.deleteTodolist(id).then(() => setTodolists(todolists.filter((tl) => tl.id !== id)))
  }

  const changeTodolistTitle = (id: string, title: string) => {
    todolistsApi
      .changeTodolistTitle({id, title})
      .then(() => setTodolists(todolists.map((tl) => (tl.id === id ? { ...tl, title } : tl))))
  }

  const createTask = (todolistId: string, title: string) => {
    tasksApi.createTasks({ todolistId, title }).then((res) => {
      setTasks({ ...tasks, [todolistId]: [res.data.data.item, ...tasks[todolistId]] })
    })
  }

  const deleteTask = (todolistId: string, taskId: string) => {
    tasksApi.deleteTask({ todolistId, taskId }).then(() => {
      setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter((task) => task.id !== taskId) })
    })
  }

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>, task: DomainTask) => {
    const todolistId = task.todoListId
    const model: UpdateTaskModel = {
      title: task.title,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      status: e.target.checked ? TaskStatus.Completed : TaskStatus.New,
    }
    tasksApi.changeTaskStatus({ todolistId, taskId: task.id, model }).then((res) => {
      setTasks({
        ...tasks,
        [todolistId]: tasks[todolistId].map((el) => (el.id === task.id ? res.data.data.item : el)),
      })
    })
  }

  const changeTaskTitle = (task: DomainTask, title: string) => {
    const todolistId = task.todoListId
    const model: UpdateTaskModel = {
      title,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      status: task.status,
    }
    tasksApi.changeTaskTitle({ todolistId, taskId: task.id, model }).then((res) => {
      setTasks({
        ...tasks,
        [todolistId]: tasks[todolistId].map((el) => (el.id === task.id ? res.data.data.item : el)),
      })
    })
  }

  return (
    <div style={{ margin: "20px" }}>
      <CreateItemForm createItem={createTodolist} />
      {todolists.map((todolist) => (
        <div key={todolist.id} style={container}>
          <div>
            <EditableSpan changeTaskTitle={(title) => changeTodolistTitle(todolist.id, title)} value={todolist.title} />
            <button onClick={() => deleteTodolist(todolist.id)}>x</button>
          </div>
          <CreateItemForm createItem={(title) => createTask(todolist.id, title)} />
          {tasks[todolist.id]?.map((task) => (
            <div key={task.id}>
              <Checkbox checked={task.status === TaskStatus.Completed} onChange={(e) => changeTaskStatus(e, task)} />
              <EditableSpan changeTaskTitle={(title) => changeTaskTitle(task, title)} value={task.title} />
              <button onClick={() => deleteTask(todolist.id, task.id)}>x</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

const container: CSSProperties = {
  border: "1px solid black",
  margin: "20px 0",
  padding: "10px",
  width: "300px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
}
