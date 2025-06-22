import {TabsFilter} from './TabsFilter/TabsFilter.tsx'
import {TodolistTitle} from './TodolistTitle/TodolistTitle.tsx'

import {Tasks} from './Tasks/Tasks.tsx'
import {CreateItemForm} from '@/common/components'
import {useCreateTasksMutation} from '@/features/todolists/api/tasksApi.ts';
import {DomainTodolist} from '@/features/todolists/api/todolistsApi.types.ts';
import {Grid, Paper} from '@mui/material';

type Props = {
    todolist: DomainTodolist
}

export const TodolistItem = ({todolist}: Props) => {

    const [createTask] = useCreateTasksMutation()

    const createTaskHandler = (title: string) => {
        createTask({todolistId: todolist.id, title})
    }

    return (
        <Grid size={{xs: 12, sm: 6, md: 3}}>
            <Paper sx={{p: '10px 20px', mb: '20px'}} elevation={5}>
                <div>
                    <TodolistTitle todolist={todolist}/>
                    <TabsFilter todolist={todolist}/>
                    <CreateItemForm createItem={createTaskHandler} label="Create new task"
                                    disabled={todolist.entityStatus === 'loading'}/>
                    <Tasks todolist={todolist}/>
                </div>
            </Paper>
        </Grid>
    )
}
