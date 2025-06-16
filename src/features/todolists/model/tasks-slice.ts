import {createAppSlice} from '@/common/utils'
import {tasksApi} from '@/features/todolists/api/tasksApi.ts'
import {DomainTask, DomainTaskSchema, UpdateTaskModel} from '@/features/todolists/api/tasksApi.types.ts'
import {changeAppStatusAC} from '@/app/app-slice.ts'
import {clearDataAC, createTodolistTC, deleteTodolistTC} from '@/features/todolists/model/todolists-slice.ts'
import {RootState} from '@/app/store.ts'
import {ResultCode} from '@/common/enums'
import {handleServerNetworkError} from '@/common/utils/handleServerNetworkError.ts'
import {handleServerAppError} from '@/common/utils/handleServerAppError.ts'

export const tasksSlice = createAppSlice({
    name: 'tasks',
    initialState: {} as TasksState,
    extraReducers: (builder) => {
        builder
            .addCase(createTodolistTC.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(deleteTodolistTC.fulfilled, (state, action) => {
                delete state[action.payload.id]
            })
            .addCase(clearDataAC, () => {
                return {}
            })
    },
    reducers: (create) => {
        return {
            fetchTasksTC: create.asyncThunk<
                { todolistId: string; tasks: DomainTask[] },
                string,
                {
                    rejectValue: null
                }
            >(
                async (todolistId: string, {dispatch, rejectWithValue}) => {
                    try {
                        dispatch(changeAppStatusAC({status: 'loading'}))
                        const res = await tasksApi.getTasks(todolistId)
                        const tasks = DomainTaskSchema.array().parse(res.data.items)
                        dispatch(changeAppStatusAC({status: 'succeeded'}))
                        return {todolistId, tasks}
                    } catch (error) {
                        handleServerNetworkError(dispatch, error)
                        return rejectWithValue(null)
                    }
                },
                {
                    fulfilled: (state, action) => {
                        state[action.payload.todolistId] = action.payload.tasks
                    },
                },
            ),
            createTaskTC: create.asyncThunk(
                async (args: { todolistId: string; title: string }, {dispatch, rejectWithValue}) => {
                    try {
                        dispatch(changeAppStatusAC({status: 'loading'}))
                        const res = await tasksApi.createTasks(args)
                        if (res.data.resultCode === ResultCode.Success) {
                            dispatch(changeAppStatusAC({status: 'succeeded'}))
                            return {task: res.data.data.item}
                        }
                        handleServerAppError(res.data, dispatch)
                        return rejectWithValue(null)
                    } catch (error) {
                        handleServerNetworkError(dispatch, error)
                        return rejectWithValue(null)
                    }
                },
                {
                    fulfilled: (state, action) => {
                        state[action.payload.task.todoListId].unshift(action.payload.task)
                    },
                },
            ),
            deleteTaskTC: create.asyncThunk(
                async (args: { taskId: string; todolistId: string }, {dispatch, rejectWithValue}) => {
                    try {
                        dispatch(changeAppStatusAC({status: 'loading'}))
                        const res = await tasksApi.deleteTask(args)
                        if (res.data.resultCode === ResultCode.Success) {
                            dispatch(changeAppStatusAC({status: 'succeeded'}))
                            return args
                        }
                        handleServerAppError(res.data, dispatch)
                        return rejectWithValue(null)
                    } catch (error) {
                        handleServerNetworkError(dispatch, error)
                        return rejectWithValue(null)
                    }
                },
                {
                    fulfilled: (state, action) => {
                        const arrTasks = state[action.payload.todolistId]
                        const index = arrTasks.findIndex((todo) => todo.id === action.payload.taskId)
                        if (index !== -1) arrTasks.splice(index, 1)
                    },
                },
            ),
            updateTaskTC: create.asyncThunk(
                async (
                    args: { todolistId: string; taskId: string; domainModel: Partial<UpdateTaskModel> },
                    {dispatch, getState, rejectWithValue},
                ) => {
                    const {todolistId, taskId, domainModel} = args

                    const allTodolistTasks = (getState() as RootState).tasks[todolistId]
                    const task = allTodolistTasks.find((task) => task.id === taskId)

                    if (!task) {
                        return rejectWithValue(null)
                    }

                    const model: UpdateTaskModel = {
                        description: task.description,
                        title: task.title,
                        priority: task.priority,
                        startDate: task.startDate,
                        deadline: task.deadline,
                        status: task.status,
                        ...domainModel,
                    }

                    try {
                        dispatch(changeAppStatusAC({status: 'loading'}))
                        const res = await tasksApi.updateTask({todolistId, taskId, model})
                        if (res.data.resultCode === ResultCode.Success) {
                            dispatch(changeAppStatusAC({status: 'succeeded'}))
                            return {task: res.data.data.item}
                        }
                        handleServerAppError(res.data, dispatch)
                        return rejectWithValue(null)
                    } catch (error) {
                        handleServerNetworkError(dispatch, error)
                        return rejectWithValue(null)
                    }
                },
                {
                    fulfilled: (state, action) => {
                        const allTodolistTasks = state[action.payload.task.todoListId]
                        const taskIndex = allTodolistTasks.findIndex((task) => task.id === action.payload.task.id)
                        if (taskIndex !== -1) state[action.payload.task.todoListId][taskIndex] = action.payload.task
                    },
                },
            ),
        }
    },
    selectors: {
        selectTasks: (state) => state,
    },
})

export const {fetchTasksTC, deleteTaskTC, createTaskTC, updateTaskTC} = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer

export const {selectTasks} = tasksSlice.selectors

export type TasksState = Record<string, DomainTask[]>
