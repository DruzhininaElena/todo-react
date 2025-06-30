import {TabsFilter} from './TabsFilter/TabsFilter.tsx'
import {TodolistTitle} from './TodolistTitle/TodolistTitle.tsx'
import { DragIndicator } from '@mui/icons-material';
import {Tasks} from './Tasks/Tasks.tsx'
import {CreateItemForm} from '@/common/components'
import {useCreateTasksMutation} from '@/features/todolists/api/tasksApi.ts';
import {Grid, IconButton, Paper} from '@mui/material';
import {DomainTodolist} from '@/features/todolists/lib/types';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';



type Props = {
    todolist: DomainTodolist
}

export const TodolistItem = ({todolist}: Props) => {

    const [createTask] = useCreateTasksMutation()

    const {listeners, setNodeRef, transform, transition, isDragging} = useSortable({id: todolist.id});

    const createTaskHandler = (title: string) => {
        createTask({todolistId: todolist.id, title})
    }

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 999 : 'auto',
    };

    return (
        <Grid
            size={{xs: 12, sm: 6, md: 4}}
            ref={setNodeRef}
            style={style}
            sx={{position: 'relative'}}
        >
            <Paper sx={{p: '10px 20px', mb: '20px'}} elevation={5}>
                <div>
                    <IconButton
                        size='small'
                        {...listeners}
                        style={{cursor: 'grab', position: 'absolute', top: '5px', right: '5px'}}
                    >
                        <DragIndicator />
                    </IconButton>

                    <TodolistTitle todolist={todolist}/>
                    <TabsFilter todolist={todolist}/>
                    <CreateItemForm createItem={createTaskHandler} label="Create new task"/>
                    <Tasks todolist={todolist}/>
                </div>
            </Paper>
        </Grid>
    )
}
