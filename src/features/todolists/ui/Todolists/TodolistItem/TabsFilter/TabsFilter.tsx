import { ButtonGroup, Grid } from "@mui/material"
import {DomainTodolist, FilterValue} from '@/features/todolists/model/todolists-slice.ts'
import { TabFilter } from "@/features/todolists/ui/Todolists/TodolistItem/TabsFilter/TabFilter/TabFilter.tsx"

const buttons: FilterValue[] = ["all", "active", "completed"]

type Props = {
  todolist: DomainTodolist
}
export const TabsFilter = ({ todolist }: Props) => {
  const { id, filter } = todolist

  return (
    <Grid container spacing={1} sx={{ mt: "20px", mb: "25px", justifyContent: "center" }}>
      <ButtonGroup variant="outlined" size={"small"}>
        {buttons.map((el) => (
          <TabFilter key={el} filter={el} currentFilter={filter} id={id} />
        ))}
      </ButtonGroup>
    </Grid>
  )
}
