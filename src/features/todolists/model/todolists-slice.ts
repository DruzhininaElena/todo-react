import {createAsyncThunk} from '@reduxjs/toolkit'
import {Todolist} from '@/features/todolists/api/todolistsApi.types.ts';
import {todolistsApi} from '@/features/todolists/api/todolistApi.ts';
import {createAppSlice} from '@/common/utils';
import {changeAppStatusAC} from '@/app/app-slice.ts';

export const todolistsSlice = createAppSlice({
    name: 'todolists',
    initialState: [] as DomainTodolist[],
    reducers: (create) => ({
        fetchTodolistsTC: create.asyncThunk(
            async (_, thunkAPI) => {
                try {
                    thunkAPI.dispatch(changeAppStatusAC({status: 'loading'}))
                    const res = await todolistsApi.getTodolists()
                    thunkAPI.dispatch(changeAppStatusAC({status: 'succeeded'}))
                    return { todolists: res.data }
                } catch (error) {
                    thunkAPI.dispatch(changeAppStatusAC({status: 'failed'}))
                    return thunkAPI.rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    action.payload?.todolists.forEach(tl => {
                        state.push({ ...tl, filter: 'all' })
                    })
                },
            }
        ),
        createTodolistTC: create.asyncThunk(
            async (args: { title: string }, thunkAPI) => {
                try {
                    thunkAPI.dispatch(changeAppStatusAC({status: 'loading'}))
                    const res = await todolistsApi.createTodolist(args.title)
                    thunkAPI.dispatch(changeAppStatusAC({status: 'succeeded'}))
                    return res.data.data.item
                } catch (err) {
                    thunkAPI.dispatch(changeAppStatusAC({status: 'failed'}))
                    return thunkAPI.rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    state.push({...action.payload, filter: 'all'})
                },
            }
        ),
        deleteTodolistTC: create.asyncThunk(
            async (args: { id: string }, thunkAPI) => {
                try {
                    thunkAPI.dispatch(changeAppStatusAC({status: 'loading'}))
                    await todolistsApi.deleteTodolist(args.id)
                    thunkAPI.dispatch(changeAppStatusAC({status: 'succeeded'}))
                    return args
                } catch (err) {
                    thunkAPI.dispatch(changeAppStatusAC({status: 'failed'}))
                    return thunkAPI.rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    const index = state.findIndex((todo) => todo.id === action.payload.id)
                    if (index !== -1) state.splice(index, 1)
                },
            }
        ),
        changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValue }>((state, action) => {
            const todolist = state.find((todo) => todo.id === action.payload.id)
            if (todolist) todolist.filter = action.payload.filter
        })
    }),
    extraReducers: (builder) => {
        builder
            .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
                const index = state.findIndex((todo) => todo.id === action.payload.id)
                if (index !== -1) state[index].title = action.payload.title
            })
    },
    selectors: {
        selectTodolists: (state) => state
    }
})

export const {
    fetchTodolistsTC,
    changeTodolistFilterAC,
    createTodolistTC,
    deleteTodolistTC
} = todolistsSlice.actions
export const {selectTodolists} = todolistsSlice.selectors
export const todolistsReducer = todolistsSlice.reducer

// Thunk

export const changeTodolistTitleTC = createAsyncThunk(`${todolistsSlice.name}/changeTodolistTitleTC`,
    async (args: { id: string, title: string }, {rejectWithValue}) => {
        try {
            await todolistsApi.changeTodolistTitle(args)
            return args
        } catch (err) {
            return rejectWithValue(null)
        }
    }
)

export type DomainTodolist = Todolist & {
    filter: FilterValue
}

export type FilterValue = 'all' | 'active' | 'completed'
