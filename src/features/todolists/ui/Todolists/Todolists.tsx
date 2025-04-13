import {Grid, Paper} from '@mui/material';
import {TodolistItem} from './TodolistItem/TodolistItem.tsx';
import {useAppSelector} from '@/common/hooks/useAppSelector.ts';
import {selectTodolists} from '@/features/todolists/model/todolists-selector.ts';

export const Todolists = () => {

    const todolists = useAppSelector(selectTodolists)

    return (
        <>
            {todolists.map(tl => {
                return (
                    <Grid key={tl.id}
                          size={{xs: 12, sm: 6, md: 3}}
                    >
                        <Paper sx={{p: '10px 20px', mb: '20px'}} elevation={5}>
                            <TodolistItem
                                todolist={tl}
                            />
                        </Paper>
                    </Grid>
                )
            })}
        </>
    );
};