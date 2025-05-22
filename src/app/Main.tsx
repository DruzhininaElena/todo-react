import {Container, Grid} from '@mui/material'
import {useAppDispatch} from '@/common/hooks/useAppDispatch.ts'
import {createTodolistTC} from '@/features/todolists/model/todolists-slice.ts'
import {Todolists} from '@/features/todolists/ui/Todolists/Todolists.tsx'
import {CreateItemForm} from '@/common/components'

export const Main = () => {
  const dispatch = useAppDispatch()

  function createTodolist(title: string) {
    dispatch(createTodolistTC({title}))
    // dispatch(createTodolistAC({title, id: nanoid()}))
  }

  return (
    <Container maxWidth={"lg"}>
      <Grid container sx={{ m: "30px 0" }}>
        <CreateItemForm createItem={createTodolist} />
      </Grid>
      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  )
}
