import {DomainTask, GetTasksResponse, UpdateTaskModel} from '@/features/todolists/api/tasksApi.types.ts'
import {BaseResponse} from '@/common/types'
import {baseApi} from '@/app/baseApi.ts';

export const tasksApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTasks: builder.query<GetTasksResponse, string>({
            query: (todolistId) => `/todo-lists/${todolistId}/tasks`,
            providesTags: ['Task']
        }),
        createTasks: builder.mutation<BaseResponse<{ item: DomainTask }>, { todolistId: string; title: string }>({
            query: ({todolistId, title}) => ({method: 'post', url: `/todo-lists/${todolistId}/tasks`, body: {title}}),
            invalidatesTags: ['Task']
        }),
        deleteTask: builder.mutation<BaseResponse, { todolistId: string; taskId: string }>({
            query: ({todolistId, taskId}) => ({method: 'delete', url: `/todo-lists/${todolistId}/tasks/${taskId}`}),
            invalidatesTags: ['Task']
        }),
        updateTask: builder.mutation<BaseResponse, {
            todolistId: string;
            taskId: string;
            model: UpdateTaskModel
        }>({
            query: ({todolistId, taskId, model}) => ({method: 'put', url: `/todo-lists/${todolistId}/tasks/${taskId}`, body: model}),
            invalidatesTags: ['Task']
        })
    }),
})

export const {useGetTasksQuery, useCreateTasksMutation, useDeleteTaskMutation, useUpdateTaskMutation} = tasksApi
