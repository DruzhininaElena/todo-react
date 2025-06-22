import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import styles from './TodolistSkeleton.module.css'
import {TasksSkeleton} from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/TasksSkeleton/TasksSkeleton.tsx';
import {Grid, Paper} from '@mui/material';

export const TodolistSkeleton = () => (
    <Grid size={{xs: 12, sm: 6, md: 3}}>
        <Paper sx={{p: '10px 20px', mb: '20px'}} elevation={5}>
            <div className={styles.container}>
                <div className={styles.title}>
                    <Skeleton width={100} height={50}/>
                    <Skeleton width={20} height={40}/>
                </div>
                <Box sx={{display: 'flex', justifyContent: 'center', gap: '2px'}}>
                    {Array(3)
                        .fill(null)
                        .map((_, id) => (
                            <Skeleton key={id} width={80} height={50}/>
                        ))}
                </Box>
                <div className={styles.createItemForm}>
                    <div className={styles.input}>
                        <Skeleton width={'100%'} height={60}/>
                    </div>
                    <Skeleton width={20} height={30}/>
                </div>
                <TasksSkeleton/>
            </div>
        </Paper>
    </Grid>
)