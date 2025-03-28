import {TaskItem} from './TaskItem.tsx';
import {Task} from '../App.tsx';

type Props = {
    tasks: Task[]
    deleteTask: (taskId: string) => void
    changeTaskStatus: (isDone: boolean, taskId: string) => void

};
export const Tasks = ({tasks, deleteTask, changeTaskStatus}: Props) => {
    return (
        <ul>
            {tasks.map(task => {
                return (
                    <TaskItem
                        task={task}
                        deleteTask={((taskId: string) => deleteTask(taskId))}
                        changeTaskStatus={(isDone: boolean, taskId: string) => changeTaskStatus(isDone, taskId)}
                    />
                )
            })}
        </ul>
    );
};