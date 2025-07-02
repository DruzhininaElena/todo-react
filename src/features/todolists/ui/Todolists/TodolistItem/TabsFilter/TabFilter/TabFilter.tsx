import {Button} from '@mui/material'
import {useAppDispatch} from '@/common/hooks'
import {todolistsApi} from '@/features/todolists/api/todolistApi.ts';
import {FilterValue} from '@/features/todolists/lib/types';

type Props = {
  filter: FilterValue
  currentFilter: FilterValue
  id: string
}
export const TabFilter = ({ filter, currentFilter, id }: Props) => {
  const dispatch = useAppDispatch()

  const changeTodolistFilterHandler = () => {
    dispatch(todolistsApi.util.updateQueryData('getTodolists', undefined, (todolists) => {
      const todolist = todolists.find((todo) => todo.id === id)
      if (todolist) todolist.filter = filter
    }))
  }

  return (
    <Button
      disableElevation
      onClick={changeTodolistFilterHandler}
      color={"secondary"}
      variant={currentFilter === filter ? "contained" : "outlined"}
    >
      {filter}
    </Button>
  )
}
