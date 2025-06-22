import {DomainTodolist, Todolist} from '@/features/todolists/api/todolistsApi.types.ts'
import {BaseResponse} from '@/common/types'
import {baseApi} from '@/app/baseApi.ts';

export const todolistsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTodolists: builder.query<DomainTodolist[], void>({
            query: () => '/todo-lists',
            transformResponse: (todolists: Todolist[]) => {
                return todolists.map((tl) => ({...tl, filter: 'all', entityStatus: 'idle'}))
            },
            providesTags: ['Todolist']
        }),
        createTodolist: builder.mutation<BaseResponse<{ item: Todolist }>, string>({
            query: (title) => ({method: 'post', url: '/todo-lists', body: {title}}),
            invalidatesTags: ['Todolist']
        }),
        deleteTodolist: builder.mutation<BaseResponse, string>({
            query: (id) => ({method: 'delete', url: `/todo-lists/${id}`}),
            invalidatesTags: ['Todolist']
        }),
        changeTodolistTitle: builder.mutation<BaseResponse, { id: string, title: string }>({
            query: ({id, title}) => ({method: 'put', url: `/todo-lists/${id}`, body: {title}}),
            invalidatesTags: ['Todolist']
        })
    }),
})

export const {useGetTodolistsQuery, useCreateTodolistMutation, useDeleteTodolistMutation, useChangeTodolistTitleMutation} = todolistsApi
