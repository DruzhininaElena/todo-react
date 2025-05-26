import {EditableSpan} from '@/common/components'
import {IconButton} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import {changeTodolistTitleTC, deleteTodolistTC, DomainTodolist} from '@/features/todolists/model/todolists-slice.ts'
import {useAppDispatch} from '@/common/hooks'

type Props = {
  todolist: DomainTodolist
}
export const TodolistTitle = ({ todolist }: Props) => {
  const { title, id } = todolist

  const dispatch = useAppDispatch()

  const changeTaskTitleHandler = (newTitle: string) => {
    dispatch(changeTodolistTitleTC({ title: newTitle, id }))
  }
  const deleteTodolistHandler = () => {
    dispatch(deleteTodolistTC(id))
  }

  return (
    <>
      <h3 style={{ textAlign: "center" }}>
        <EditableSpan value={title} changeTaskTitle={changeTaskTitleHandler} />
        <IconButton aria-label="delete" onClick={deleteTodolistHandler} size={"small"}>
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </h3>
    </>
  )
}
