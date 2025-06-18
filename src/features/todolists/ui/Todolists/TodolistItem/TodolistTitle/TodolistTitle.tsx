import {EditableSpan} from '@/common/components'
import {IconButton} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import {DomainTodolist} from '@/features/todolists/model/todolists-slice.ts'
import {useChangeTodolistTitleMutation, useDeleteTodolistMutation} from '@/features/todolists/api/todolistApi.ts';

type Props = {
  todolist: DomainTodolist
}
export const TodolistTitle = ({ todolist }: Props) => {

  const { title, id, entityStatus } = todolist

  const [deleteTodolist] = useDeleteTodolistMutation()
  const [changeTodolistTitle] = useChangeTodolistTitleMutation()


  const changeTaskTitleHandler = (newTitle: string) => {
    changeTodolistTitle({ title: newTitle, id })
  }

  const deleteTodolistHandler = () => deleteTodolist(id)

  return (
    <>
      <h3 style={{ textAlign: "center" }}>
        <EditableSpan value={title} changeTaskTitle={changeTaskTitleHandler} disabled={entityStatus === 'loading'}/>
        <IconButton aria-label="delete" onClick={deleteTodolistHandler} size={"small"} disabled={entityStatus === 'loading'}>
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </h3>
    </>
  )
}
