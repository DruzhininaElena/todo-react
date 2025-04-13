import {List} from '@mui/material';
import {useAppSelector} from '@/common/hooks/useAppSelector.ts';
import {selectTasks} from '@/features/todolists/model/tasks-selector.ts';
import {Todolist} from '@/features/todolists/model/todolists-reducer.ts';
import {TaskItem} from './TaskItem/TaskItem.tsx';

type Props = {
    todolist: Todolist
}

export const Tasks = ({todolist}: Props) => {

    const {id, filter} = todolist

    const tasks = useAppSelector(selectTasks)

    const filteredTasks = () => {
        let tasksForTodolist = tasks[id];

        switch (filter) {
            case 'active':
                return tasksForTodolist = tasks[id].filter(t => !t.isDone)
            case 'completed':
                return tasksForTodolist = tasks[id].filter(t => t.isDone)
            default:
                return tasksForTodolist
        }
    }

    return (
        <>
            {filteredTasks().length === 0 ? (
                <p>No tasks in the list</p>
            ) : (
                <List disablePadding sx={{pt: '20px'}}>
                    {filteredTasks().map(task => (
                        <TaskItem key={task.id} task={task} todolistId={id}/>
                    ))}
                </List>
            )}
        </>
    );
};