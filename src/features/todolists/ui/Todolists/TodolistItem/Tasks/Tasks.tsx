import {List} from '@mui/material'
import {DomainTodolist} from '@/features/todolists/model/todolists-slice.ts'
import {TaskItem} from './TaskItem/TaskItem.tsx'
import {TaskStatus} from '@/common/enums';
import {useGetTasksQuery} from '@/features/todolists/api/tasksApi.ts';


type Props = {
    todolist: DomainTodolist
}

export const Tasks = ({todolist}: Props) => {

    const {id, filter} = todolist

    const {data} = useGetTasksQuery(id)

    let filteredTasks = data?.items
    if (filter === 'active') {
        filteredTasks = filteredTasks?.filter(task => task.status === TaskStatus.New)
    }
    if (filter === 'completed') {
        filteredTasks = filteredTasks?.filter(task => task.status === TaskStatus.Completed)
    }

    return (
        <>
            {filteredTasks?.length === 0 ? (
                <p>No tasks in the list</p>
            ) : (
                <List disablePadding sx={{pt: '20px'}}>
                    {filteredTasks && filteredTasks?.map((task) => (
                        <TaskItem key={task.id} task={task} todolistId={id}/>
                    ))}
                </List>
            )}
        </>
    )
}
