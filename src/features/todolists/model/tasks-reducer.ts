import {createTodolistAC, deleteTodolistAC} from './todolists-reducer.ts';
import {createAction, createReducer, nanoid} from '@reduxjs/toolkit';

const initialState: TasksState = {}

export const deleteTaskAC = createAction<{
    taskId: string,
    todolistId: string
}>('tasks/deleteTask')

export const createTaskAC = createAction<{
    todolistId: string,
    title: string
}>('tasks/createTask')

export const changeTaskStatusAC = createAction<{
    todolistId: string
    taskId: string
    isDone: boolean
}>('tasks/changeTaskStatus')

export const changeTaskTitleAC = createAction<{
    todolistId: string
    taskId: string
    title: string
}>('tasks/changeTaskTitle')

export const tasksReducer = createReducer(initialState, builder => {
    builder
        .addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })
        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.id] = []
        })
        .addCase(deleteTaskAC, (state, action) => {
            const arrTasks = state[action.payload.todolistId]
            const index = arrTasks.findIndex(todo => todo.id === action.payload.taskId)
            if (index !== -1) arrTasks.splice(index, 1)
        })
        .addCase(createTaskAC, (state, action) => {
            state[action.payload.todolistId].unshift({
                id: nanoid(),
                title: action.payload.title,
                isDone: false
            })
        })
        .addCase(changeTaskStatusAC, (state, action) => {
            const arrTasks = state[action.payload.todolistId]
            const tasks = arrTasks.find(task => task.id === action.payload.taskId)
            if (tasks) tasks.isDone = action.payload.isDone
        })
        .addCase(changeTaskTitleAC, (state, action) => {
            const arrTasks = state[action.payload.todolistId]
            const tasks = arrTasks.find(task => task.id === action.payload.taskId)
            if (tasks) tasks.title = action.payload.title
        })
})

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type TasksState = {
    [todolistId: string]: Array<Task>
}