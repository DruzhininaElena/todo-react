import {Todolist} from '@/features/todolists/api/todolistsApi.types.ts';

export type FilterValue = 'all' | 'active' | 'completed'

export type DomainTodolist = Todolist & {
    filter: FilterValue
}