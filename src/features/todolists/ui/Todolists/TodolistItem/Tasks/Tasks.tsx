import {List} from '@mui/material'
import {DomainTodolist} from '@/features/todolists/model/todolists-slice.ts'
import {TaskItem} from './TaskItem/TaskItem.tsx'
import {useAppDispatch, useAppSelector} from '@/common/hooks'
import {fetchTasksTC, selectTasks} from '@/features/todolists/model/tasks-slice.ts';
import {useEffect} from 'react';
import {TaskStatus} from '@/common/enums';


type Props = {
    todolist: DomainTodolist
}

export const Tasks = ({todolist}: Props) => {
    const dispatch = useAppDispatch()

    const {id, filter} = todolist
    const tasks = useAppSelector(selectTasks)

    useEffect(() => {
        dispatch(fetchTasksTC(id))
    }, [])

    const filteredTasks = () => {
        let tasksForTodolist = tasks[id]

        switch (filter) {
            case 'active':
                return (tasksForTodolist = tasks[id].filter((t) => t.status === TaskStatus.New))
            case 'completed':
                return (tasksForTodolist = tasks[id].filter((t) => t.status === TaskStatus.Completed))
            default:
                return tasksForTodolist
        }
    }

    return (
        <>
            {filteredTasks()?.length === 0 ? (
                <p>No tasks in the list</p>
            ) : (
                <List disablePadding sx={{pt: '20px'}}>
                    {filteredTasks() && filteredTasks()?.map((task) => (
                        <TaskItem key={task.id} task={task} todolistId={id}/>
                    ))}
                </List>
            )}
        </>
    )
}
