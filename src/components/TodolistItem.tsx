import {FilterValue, Task} from '../App.tsx';
import {TabsFilter} from './TabsFilter.tsx';
import {TaskItem} from './TaskItem.tsx';
import {AddTask} from './AddTask.tsx';

type Props = {
    title: string
    tasks: Task[]
    deleteTask: (taskId: string) => void
    changeFilter: (filterValue: FilterValue) => void
    createTask: (newTaskTitle: string) => void
    changeTaskStatus: (isDone: boolean, taskId: string) => void
    currentFilterStatus: FilterValue
}

export const TodolistItem = (Props: Props) => {

    const {
        title,
        tasks,
        deleteTask,
        changeFilter,
        createTask,
        changeTaskStatus,
        currentFilterStatus
    } = Props

    return (
        <div>
            <h3>{title}</h3>
            <AddTask createTask={createTask}/>
            {tasks.length === 0 ? (
                <p>No tasks in the list</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        return (
                            <TaskItem task={task} deleteTask={deleteTask} changeTaskStatus={changeTaskStatus}/>
                        )
                    })}
                </ul>
            )}
            <TabsFilter currentFilterStatus={currentFilterStatus} changeFilter={changeFilter}/>
        </div>
    )
}