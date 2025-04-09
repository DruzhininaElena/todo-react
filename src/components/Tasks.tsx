import {TaskItem} from './TaskItem.tsx';
import {Task} from '../app/App.tsx';
import { List } from '@mui/material';

type Props = {
    tasks: Task[]
    deleteTask: (taskId: string) => void
    changeTaskStatus: (isDone: boolean, taskId: string) => void
    changeTaskTitle: (newTitle: string, taskId: string) => void

};
export const Tasks = ({tasks, deleteTask, changeTaskStatus, changeTaskTitle}: Props) => {
    return (
        <List disablePadding sx={{pt: '20px'}}>
            {tasks.map(task => {
                return (
                    <TaskItem
                        key={task.id}
                        task={task}
                        deleteTask={((taskId: string) => deleteTask(taskId))}
                        changeTaskStatus={(isDone: boolean, taskId: string) => changeTaskStatus(isDone, taskId)}
                        changeTaskTitle={(newTitle: string) => changeTaskTitle(newTitle, task.id)}
                    />
                )
            })}
        </List>
    );
};