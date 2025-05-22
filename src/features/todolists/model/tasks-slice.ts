import {createTodolistAC, deleteTodolistAC} from './todolists-slice.ts'
import {createSlice, nanoid} from '@reduxjs/toolkit'

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {} as TasksState,
    reducers: create => ({
        deleteTaskAC: create.reducer<{ taskId: string; todolistId: string }>((state, action) => {
            const arrTasks = state[action.payload.todolistId]
            const index = arrTasks.findIndex((todo) => todo.id === action.payload.taskId)
            if (index !== -1) arrTasks.splice(index, 1)
        }),
        createTaskAC: create.reducer<{ todolistId: string; title: string }>((state, action) => {
            state[action.payload.todolistId].unshift({
                id: nanoid(),
                title: action.payload.title,
                isDone: false,
            })
        }),
        changeTaskStatusAC: create.reducer<{
            todolistId: string
            taskId: string
            isDone: boolean
        }>((state, action) => {
            const arrTasks = state[action.payload.todolistId]
            const tasks = arrTasks.find((task) => task.id === action.payload.taskId)
            if (tasks) tasks.isDone = action.payload.isDone
        }),
        changeTaskTitleAC: create.reducer<{
            todolistId: string
            taskId: string
            title: string
        }>((state, action) => {
            const arrTasks = state[action.payload.todolistId]
            const tasks = arrTasks.find((task) => task.id === action.payload.taskId)
            if (tasks) tasks.title = action.payload.title
        })
    }),
    extraReducers: (builder) => {
        builder
            .addCase(createTodolistAC, (state, action) => {
                state[action.payload.id] = []
            })
            .addCase(deleteTodolistAC, (state, action) => {
                delete state[action.payload.id]
            })
    },
    selectors: {
        selectTasks: (state) => state
    }
})

export const {
    deleteTaskAC,
    createTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC
} = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer

export const {selectTasks} = tasksSlice.selectors

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type TasksState = {
    [todolistId: string]: Array<Task>
}
