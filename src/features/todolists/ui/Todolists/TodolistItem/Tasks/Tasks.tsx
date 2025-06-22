import {List} from '@mui/material'
import {TaskItem} from './TaskItem/TaskItem.tsx'
import {TaskStatus} from '@/common/enums';
import {useGetTasksQuery} from '@/features/todolists/api/tasksApi.ts';
import {DomainTodolist} from '@/features/todolists/api/todolistsApi.types.ts';
import {TasksSkeleton} from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/TasksSkeleton/TasksSkeleton.tsx';


type Props = {
    todolist: DomainTodolist
}

export const Tasks = ({todolist}: Props) => {

    const {id, filter} = todolist

    // const dispatch = useAppDispatch()

    const {data, isLoading} = useGetTasksQuery(id)

    // useEffect(() => {
    //     if(error) {
    //         if('status' in error) {
    //             const errorMessage = 'error' in error ? error.error : JSON.stringify(error.data)
    //             dispatch(setAppErrorAC({error: errorMessage}))
    //         } else {
    //             dispatch(setAppErrorAC({error: error.message || 'Some error occurred'}))
    //         }
    //     }
    // }, [error]);

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
                <List disablePadding sx={{pt: '20px'}}>
                    {filteredTasks && filteredTasks?.map((task) => (
                        <TaskItem key={task.id} task={task} todolist={todolist}/>
                    ))}
                </List>
            )}
        </>
    )
}
