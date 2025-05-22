import { Button } from "@mui/material"
import { changeTodolistFilterAC, FilterValue } from "@/features/todolists/model/todolists-slice.ts"
import { useAppDispatch } from "@/common/hooks"

type Props = {
  filter: FilterValue
  currentFilter: FilterValue
  id: string
}
export const TabFilter = ({ filter, currentFilter, id }: Props) => {
  const dispatch = useAppDispatch()

  const changeTodolistFilterHandler = () => {
    dispatch(changeTodolistFilterAC({ filter: filter, id }))
  }

  return (
    <Button
      disableElevation
      onClick={changeTodolistFilterHandler}
      color={"primary"}
      variant={currentFilter === filter ? "contained" : "outlined"}
    >
      {filter}
    </Button>
  )
}
