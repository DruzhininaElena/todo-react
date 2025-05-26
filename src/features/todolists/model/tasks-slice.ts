import {createAppSlice} from '@/common/utils';
import {tasksApi} from '@/features/todolists/api/tasksApi.ts';
import {DomainTask, UpdateTaskModel} from '@/features/todolists/api/tasksApi.types.ts';
import {changeAppStatusAC} from '@/app/app-slice.ts';
import {createTodolistTC, deleteTodolistTC} from '@/features/todolists/model/todolists-slice.ts';

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
    },
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
                    return {task: res.data.data.item}

                } catch (error) {
                    thunkAPI.dispatch(changeAppStatusAC({status: 'failed'}))
                    return thunkAPI.rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    state[action.payload.task.todoListId].unshift(action.payload.task)
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
        updateTaskTC: create.asyncThunk(
            async (
                payload: { todolistId: string; taskId: string; domainModel: Partial<UpdateTaskModel> },
                {dispatch, rejectWithValue}
            ) => {
                try {
                    dispatch(changeAppStatusAC({status: 'loading'}))
                    const {todolistId, taskId, domainModel} = payload

                    const res = await tasksApi.updateTask({taskId, todolistId, model: domainModel})
                    dispatch(changeAppStatusAC({status: 'succeeded'}))
                    return {task: res.data.data.item}

                } catch (error) {
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    const index = state[action.payload.task.todoListId].findIndex(task => task.id === action.payload.task.id)
                    if (index !== -1) state[action.payload.task.todoListId][index] = action.payload.task
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
    updateTaskTC
} = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer

export const {selectTasks} = tasksSlice.selectors

export type TasksState = Record<string, DomainTask[]>
