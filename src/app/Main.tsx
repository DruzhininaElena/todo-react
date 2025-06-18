import {Container, Grid} from '@mui/material'
import {Todolists} from '@/features/todolists/ui/Todolists/Todolists.tsx'
import {CreateItemForm} from '@/common/components'
import {useCreateTodolistMutation} from '@/features/todolists/api/todolistApi.ts';

export const Main = () => {

    const [createTodolist] = useCreateTodolistMutation()

    return (
        <Container maxWidth={'lg'}>
            <Grid container sx={{m: '30px 0'}}>
                <CreateItemForm createItem={(title) => createTodolist(title)} label="Create new todolist"/>
            </Grid>
            <Grid container spacing={4}>
                <Todolists/>
            </Grid>
        </Container>
    )
}
