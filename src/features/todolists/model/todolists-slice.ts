import { Todolist, TodolistSchema } from "@/features/todolists/api/todolistsApi.types.ts"
import { todolistsApi } from "@/features/todolists/api/todolistApi.ts"
import { createAppSlice } from "@/common/utils"
import { changeAppStatusAC } from "@/app/app-slice.ts"
import { RequestStatus } from "@/common/types"
import { ResultCode } from "@/common/enums"
import { handleServerNetworkError } from "@/common/utils/handleServerNetworkError.ts"
import { handleServerAppError } from "@/common/utils/handleServerAppError.ts"

export const todolistsSlice = createAppSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  reducers: (create) => {
    return {
      fetchTodolistsTC: create.asyncThunk(
        async (_, { dispatch, rejectWithValue }) => {
          try {
            dispatch(changeAppStatusAC({ status: "loading" }))
            const res = await todolistsApi.getTodolists()
            const todolists = TodolistSchema.array().parse(res.data)
            dispatch(changeAppStatusAC({ status: "succeeded" }))
            return { todolists }
          } catch (error) {
            handleServerNetworkError(dispatch, error)
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            action.payload?.todolists.forEach((tl) => {
              state.push({ ...tl, filter: "all", entityStatus: "idle" })
            })
          },
        },
      ),
      createTodolistTC: create.asyncThunk(
        async (title: string, { dispatch, rejectWithValue }) => {
          try {
            dispatch(changeAppStatusAC({ status: "loading" }))
            const res = await todolistsApi.createTodolist(title)
            if (res.data.resultCode === ResultCode.Success) {
              dispatch(changeAppStatusAC({ status: "succeeded" }))
              return { todolist: res.data.data.item }
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
            state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" })
          },
        },
      ),
      deleteTodolistTC: create.asyncThunk(
        async (id: string, { dispatch, rejectWithValue }) => {
          try {
            dispatch(changeAppStatusAC({ status: "loading" }))
            dispatch(changeTodolistStatusAC({ id, status: "loading" }))
            const res = await todolistsApi.deleteTodolist(id)
            if (res.data.resultCode === ResultCode.Success) {
              dispatch(changeAppStatusAC({ status: "succeeded" }))
              dispatch(changeTodolistStatusAC({ id, status: "succeeded" }))
              return { id }
            }
            handleServerAppError(res.data, dispatch)
            dispatch(changeTodolistStatusAC({ id, status: "failed" }))
            return rejectWithValue(null)
          } catch (error) {
            dispatch(changeAppStatusAC({ status: "failed" }))
            dispatch(changeTodolistStatusAC({ id, status: "failed" }))
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            const index = state.findIndex((todolist) => todolist.id === action.payload.id)
            if (index !== -1) {
              state.splice(index, 1)
            }
          },
        },
      ),
      changeTodolistTitleTC: create.asyncThunk(
        async (args: { id: string; title: string }, { dispatch, rejectWithValue }) => {
          try {
            dispatch(changeAppStatusAC({ status: "loading" }))
            const res = await todolistsApi.changeTodolistTitle(args)
            if (res.data.resultCode === ResultCode.Success) {
              dispatch(changeAppStatusAC({ status: "succeeded" }))
              return args
            }
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          } catch (err) {
            dispatch(changeAppStatusAC({ status: "failed" }))
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            const index = state.findIndex((todo) => todo.id === action.payload.id)
            if (index !== -1) state[index].title = action.payload.title
          },
        },
      ),
      changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValue }>((state, action) => {
        const todolist = state.find((todo) => todo.id === action.payload.id)
        if (todolist) todolist.filter = action.payload.filter
      }),
      changeTodolistStatusAC: create.reducer<{ id: string; status: RequestStatus }>((state, action) => {
        const todolist = state.find((todo) => todo.id === action.payload.id)
        if (todolist) todolist.entityStatus = action.payload.status
      }),
      resetTodolistsAC: create.reducer(() => []),
    }
  },
  selectors: {
    selectTodolists: (state) => state,
  },
})

export const {
  fetchTodolistsTC,
  createTodolistTC,
  deleteTodolistTC,
  changeTodolistTitleTC,
  changeTodolistFilterAC,
  changeTodolistStatusAC,
  resetTodolistsAC,
} = todolistsSlice.actions
export const { selectTodolists } = todolistsSlice.selectors
export const todolistsReducer = todolistsSlice.reducer

export type DomainTodolist = Todolist & {
  filter: FilterValue
  entityStatus: RequestStatus
}

export type FilterValue = "all" | "active" | "completed"
