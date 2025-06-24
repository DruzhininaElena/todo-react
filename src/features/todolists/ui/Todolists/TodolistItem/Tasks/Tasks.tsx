import {List} from '@mui/material'
import {TaskItem} from './TaskItem/TaskItem.tsx'
import {TaskStatus} from '@/common/enums';
import {useGetTasksQuery} from '@/features/todolists/api/tasksApi.ts';
import {TasksSkeleton} from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/TasksSkeleton/TasksSkeleton.tsx';
import {DomainTodolist} from '@/features/todolists/lib/types';
import {useState} from 'react';
import {
    TasksPagination
} from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/TasksPagination/TasksPagination.tsx';


type Props = {
    todolist: DomainTodolist
}

export const Tasks = ({todolist}: Props) => {

    const [page, setPage] = useState(1)

    const {id, filter} = todolist

    const {data, isLoading} = useGetTasksQuery({todolistId: id, params: {page}})

    let filteredTasks = data?.items
    if (filter === 'active') {
        filteredTasks = filteredTasks?.filter(task => task.status === TaskStatus.New)
    }
    if (filter === 'completed') {
        filteredTasks = filteredTasks?.filter(task => task.status === TaskStatus.Completed)
    }

    if (isLoading) {
        return <TasksSkeleton />
    }

    return (
        <>
            {filteredTasks?.length === 0 ? (
                <p>No tasks in the list</p>
            ) : (
                <>
                    <List disablePadding sx={{pt: '20px'}}>
                        {filteredTasks && filteredTasks?.map((task) => (
                            <TaskItem key={task.id} task={task} todolist={todolist}/>
                        ))}
                    </List>
                    <TasksPagination totalCount={data?.totalCount || 0} page={page} setPage={setPage}/>
                </>
            )}
        </>
    )
}
