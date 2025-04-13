import {Container, Grid} from '@mui/material';
import {CreateItemForm} from '@/common/components/CreateItemForm/CreateItemForm.tsx';
import {useAppDispatch} from '@/common/hooks/useAppDispatch.ts';
import {createTodolistAC} from '@/features/todolists/model/todolists-reducer.ts';
import {Todolists} from '@/features/todolists/ui/Todolists/Todolists.tsx';

export const Main = () => {

    const dispatch = useAppDispatch()

    function createTodolist(title: string) {
        dispatch(createTodolistAC(title))
    }

    return (
        <Container maxWidth={'lg'}>
            <Grid
                container
                sx={{m: '30px 0'}}>
                <CreateItemForm createItem={createTodolist}/>
            </Grid>
            <Grid container spacing={4}>
                <Todolists/>
            </Grid>
        </Container>
    );
};