import {createAppSlice} from '@/common/utils';
import {tasksApi} from '@/features/todolists/api/tasksApi.ts';
import {DomainTask, TaskStatus, UpdateTaskModel} from '@/features/todolists/api/tasksApi.types.ts';
import {changeAppStatusAC} from '@/app/app-slice.ts';

export const tasksSlice = createAppSlice({
    name: 'tasks',
    initialState: {} as TasksState,
    reducers: create => ({
        fetchTasksTC: create.asyncThunk(
            async (todolistId: string, thunkAPI) => {
                try {
                    thunkAPI.dispatch(changeAppStatusAC({status: 'loading'}))
                    const res = await tasksApi.getTasks(todolistId)
                    thunkAPI.dispatch(changeAppStatusAC({status: 'succeeded'}))
                    return {todolistId, tasks: res.data.items}
                } catch (error) {
                    thunkAPI.dispatch(changeAppStatusAC({status: 'failed'}))
                    return thunkAPI.rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    state[action.payload.todolistId] = action.payload.tasks
                },
            }
        ),
        createTaskTC: create.asyncThunk(
            async (payload: { todolistId: string; title: string }, thunkAPI) => {
                try {
                    thunkAPI.dispatch(changeAppStatusAC({status: 'loading'}))
                    const res = await tasksApi.createTasks(payload)
                    thunkAPI.dispatch(changeAppStatusAC({status: 'succeeded'}))
                    return {todolistId: payload.todolistId, task: res.data.data.item}

                } catch (error) {
                    thunkAPI.dispatch(changeAppStatusAC({status: 'failed'}))
                    return thunkAPI.rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    state[action.payload.todolistId].unshift(action.payload.task)
                },
            }
        ),
        deleteTaskTC: create.asyncThunk(
            async (payload: { taskId: string; todolistId: string }, thunkAPI) => {
                try {
                    await tasksApi.deleteTask(payload)
                    return payload

                } catch (error) {
                    return thunkAPI.rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    const arrTasks = state[action.payload.todolistId]
                    const index = arrTasks.findIndex((todo) => todo.id === action.payload.taskId)
                    if (index !== -1) arrTasks.splice(index, 1)
                },
            }
        ),
        changeTaskStatusTC: create.asyncThunk(
            async (payload: {
                task: DomainTask
                status: TaskStatus
            }, thunkAPI) => {
                try {
                    thunkAPI.dispatch(changeAppStatusAC({status: 'loading'}))
                    const {task, status} = payload

                    const model: UpdateTaskModel = {
                        title: task.title,
                        description: task.description,
                        priority: task.priority,
                        startDate: task.startDate,
                        deadline: task.deadline,
                        status
                    }
                    const res = await tasksApi.changeTaskStatus({taskId: task.id, todolistId: task.todoListId, model})
                    thunkAPI.dispatch(changeAppStatusAC({status: 'succeeded'}))
                    return { task: res.data.data.item }

                } catch (error) {
                    return thunkAPI.rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    const task = state[action.payload.task.todoListId].find((task) => task.id === action.payload.task.id)
                    if (task) {
                        task.status = action.payload.task.status
                    }
                }
            }
        ),
        changeTaskTitleTC: create.asyncThunk(
            async (payload: {
                task: DomainTask
                title: string
            }, thunkAPI) => {
                try {
                    thunkAPI.dispatch(changeAppStatusAC({status: 'loading'}))
                    const {task, title} = payload

                    const model: UpdateTaskModel = {
                        title,
                        description: task.description,
                        priority: task.priority,
                        startDate: task.startDate,
                        deadline: task.deadline,
                        status: task.status
                    }
                    const res = await tasksApi.changeTaskTitle({taskId: task.id, todolistId: task.todoListId, model})
                    thunkAPI.dispatch(changeAppStatusAC({status: 'succeeded'}))
                    return { task: res.data.data.item }

                } catch (error) {
                    thunkAPI.dispatch(changeAppStatusAC({status: 'failed'}))
                    return thunkAPI.rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    const task = state[action.payload.task.todoListId].find((task) => task.id === action.payload.task.id)
                    if (task) {
                        task.title = action.payload.task.title
                    }
                }
            }
        ),
    }),
    selectors: {
        selectTasks: (state) => state
    }
})

export const {
    fetchTasksTC,
    deleteTaskTC,
    createTaskTC,
    changeTaskStatusTC,
    changeTaskTitleTC
} = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer

export const {selectTasks} = tasksSlice.selectors

export type TasksState = Record<string, DomainTask[]>
