import {createAsyncThunk, createSlice, nanoid} from '@reduxjs/toolkit'
import {Todolist} from '@/features/todolists/api/todolistsApi.types.ts';
import {todolistsApi} from '@/features/todolists/api/todolistApi.ts';

export const todolistsSlice = createSlice({
    name: 'todolists',
    initialState: [] as DomainTodolist[],
    reducers: (create) => ({
        deleteTodolistAC: create.reducer<{ id: string }>((state, action) => {
            const index = state.findIndex((todo) => todo.id === action.payload.id)
            if (index !== -1) state.splice(index, 1)
        }),
        changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValue }>((state, action) => {
            const todolist = state.find((todo) => todo.id === action.payload.id)
            if (todolist) todolist.filter = action.payload.filter
        }),
        createTodolistAC: create.preparedReducer((title: string) => ({
            payload: {
                title,
                id: nanoid()
            }
        }), (state, action) => {
            state.push({...action.payload, filter: 'all', order: 1, addedDate: ''})
        })
    }),
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodolistsTC.fulfilled, (_state, action) => {
                return action.payload.todolists.map(tl => ({...tl, filter: 'all'}))
            })
            .addCase(fetchTodolistsTC.rejected, (_state, action) => {
                console.log(action.payload)
            })
            .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
                const index = state.findIndex((todo) => todo.id === action.payload.id)
                if (index !== -1) state[index].title = action.payload.title
            })
            .addCase(changeTodolistTitleTC.rejected, (_state, action) => {
                console.log(action.payload)
            })
            .addCase(deleteTodolistTC.fulfilled, (state, action) => {
                const index = state.findIndex((todo) => todo.id === action.payload.id)
                if (index !== -1) state.splice(index, 1)
            })
            .addCase(deleteTodolistTC.rejected, (_state, action) => {
                console.log(action.payload)
            })
            .addCase(createTodolistTC.fulfilled, (state, action) => {
                state.push({...action.payload, filter: 'all'})
            })
            .addCase(createTodolistTC.rejected, (_state, action) => {
                console.log(action.payload)
            })
    },
    selectors: {
        selectTodolists: (state) => state
    }
})

export const {
    deleteTodolistAC,
    changeTodolistFilterAC,
    createTodolistAC,
} = todolistsSlice.actions
export const {selectTodolists} = todolistsSlice.selectors
export const todolistsReducer = todolistsSlice.reducer

// Thunk

export const fetchTodolistsTC = createAsyncThunk(`${todolistsSlice.name}/fetchTodolistsTC`,
    async (_arg, {rejectWithValue}) => {
        try {
            const res = await todolistsApi.getTodolists()
            return {todolists: res.data}
        } catch (err) {
            return rejectWithValue(null)
        }
    }
)

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

export const createTodolistTC = createAsyncThunk(`${todolistsSlice.name}/createTodolistTC`,
    async (args: { title: string }, {rejectWithValue}) => {
        try {
            const res = await todolistsApi.createTodolist(args.title)
            return res.data.data.item
        } catch (err) {
            return rejectWithValue(null)
        }
    }
)

export const deleteTodolistTC = createAsyncThunk(`${todolistsSlice.name}/deleteTodolistTC`,
    async (args: { id: string }, {rejectWithValue}) => {
        try {
            await todolistsApi.deleteTodolist(args.id)
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
