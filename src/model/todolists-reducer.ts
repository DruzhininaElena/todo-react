import {FilterValue, Todolist} from '../App.tsx';
import {v1} from 'uuid';

const initialState: Todolist[] = []

type Actions = DeleteTodolistAction | CreateTodolistAction | ChangeTodolistTitleAction | ChangeTodolistFilterAction

export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>
export type ChangeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterAction = ReturnType<typeof changeTodolistFilterAC>

//////////////Action creators

export const deleteTodolistAC = (id: string) => {
    return {type: 'delete_todolist', payload: {id}} as const
}

export const createTodolistAC = (title: string) => {
    const id = v1()
    return {type: 'create_todolist', payload: {title, id}} as const
}

export const changeTodolistTitleAC = ({id, title}: {
    id: string
    title: string
}) => {
    return {type: 'change_todolist_title', payload: {id, title}} as const
}

export const changeTodolistFilterAC = ({id, filter}: {
    id: string
    filter: FilterValue
}) => {
    return {type: 'change_todolist_filter', payload: {id, filter}} as const
}

//////////////////////

export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
    switch (action.type) {
        case 'delete_todolist': {
            return state.filter(tl => tl.id !== action.payload.id)
        }
        case  'create_todolist': {
            return [
                {id: action.payload.id, title: action.payload.title, filter: 'all'},
                ...state
            ]
        }
        case 'change_todolist_title': {
            return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
        }
        case 'change_todolist_filter': {
            return state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
        }
        default:
            return state
    }
}