import {FilterValue, Task} from '../App.tsx';
import {TabsFilter} from './TabsFilter.tsx';
import {AddTask} from './AddTask.tsx';
import {TodolistTitle} from './TodolistTitle.tsx';
import {Tasks} from './Tasks.tsx';

type Props = {
    todolistId: string
    title: string
    tasks: Task[]
    deleteTask: (taskId: string, todolistId: string) => void
    changeFilter: (filterValue: FilterValue, todolistId: string) => void
    createTask: (newTaskTitle: string, todolistId: string) => void
    changeTaskStatus: (isDone: boolean, taskId: string, todolistId: string) => void
    currentFilterStatus: FilterValue
    deleteTodolist: (todolistId: string) => void
}

export const TodolistItem = (Props: Props) => {

    const {
        title,
        tasks,
        currentFilterStatus,
        todolistId,

        deleteTodolist,
        deleteTask,
        changeFilter,
        createTask,
        changeTaskStatus,
    } = Props

    return (
        <div className={'todolist-item'}>
            <TodolistTitle
                title={title}
                deleteTodolist={() => deleteTodolist(todolistId)}
            />
            <TabsFilter
                currentFilterStatus={currentFilterStatus}
                changeFilter={(filterValue: FilterValue) => changeFilter(filterValue, todolistId)}
            />
            <AddTask
                createTask={(newTaskTitle: string) => createTask(newTaskTitle, todolistId)}
            />
            {tasks.length === 0 ? (
                <p>No tasks in the list</p>
            ) : (
                <Tasks
                    tasks={tasks}
                    deleteTask={(taskId: string) => deleteTask(taskId, todolistId)}
                    changeTaskStatus={(isDone: boolean, taskId: string) => changeTaskStatus(isDone, taskId, todolistId)}
                />
            )}
        </div>
    )
}