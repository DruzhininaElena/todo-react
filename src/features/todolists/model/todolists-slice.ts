import {Todolist} from '@/features/todolists/api/todolistsApi.types.ts'
import {createAppSlice} from '@/common/utils'
import {RequestStatus} from '@/common/types'

export const todolistsSlice = createAppSlice({
    name: 'todolists',
    initialState: [] as DomainTodolist[],
    reducers: (create) => {
        return {
            changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValue }>((state, action) => {
                const todolist = state.find((todo) => todo.id === action.payload.id)
                if (todolist) todolist.filter = action.payload.filter
            }),
            changeTodolistStatusAC: create.reducer<{ id: string; status: RequestStatus }>((state, action) => {
                const todolist = state.find((todo) => todo.id === action.payload.id)
                if (todolist) todolist.entityStatus = action.payload.status
            }),
        }
    },
    selectors: {
        selectTodolists: (state) => state,
    },
})

export const {
    changeTodolistFilterAC,
    changeTodolistStatusAC,
} = todolistsSlice.actions
export const {selectTodolists} = todolistsSlice.selectors
export const todolistsReducer = todolistsSlice.reducer

export type DomainTodolist = Todolist & {
    filter: FilterValue
    entityStatus: RequestStatus
}

export type FilterValue = 'all' | 'active' | 'completed'
