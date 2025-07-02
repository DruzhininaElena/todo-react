import {
  getTaskSchema,
  GetTasksResponse,
  TaskOperationResponse,
  taskOperationResponseSchema,
  UpdateTaskModel,
} from "@/features/todolists/api/tasksApi.types.ts"
import {DefaultResponse, defaultResponseSchema} from '@/common/types'
import { baseApi } from "@/app/baseApi.ts"
import { PAGE_SIZE } from "@/common/constants"

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<GetTasksResponse, { todolistId: string; params: { page: number } }>({
      query: ({ todolistId, params }) => ({
        url: `/todo-lists/${todolistId}/tasks`,
        params: { ...params, count: PAGE_SIZE },
      }),
      extraOptions: { dataSchema: getTaskSchema },
      providesTags: (_res, _err, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
    createTasks: builder.mutation<TaskOperationResponse, { todolistId: string; title: string }>({
      query: ({ todolistId, title }) => ({ method: "post", url: `/todo-lists/${todolistId}/tasks`, body: { title } }),
      extraOptions: { dataSchema: taskOperationResponseSchema },
      invalidatesTags: (_res, _err, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
    deleteTask: builder.mutation<DefaultResponse, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => ({ method: "delete", url: `/todo-lists/${todolistId}/tasks/${taskId}` }),
      extraOptions: { dataSchema: defaultResponseSchema },
      invalidatesTags: (_res, _err, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
    updateTask: builder.mutation<
      TaskOperationResponse,
      {
        todolistId: string
        taskId: string
        model: UpdateTaskModel
      }
    >({
      query: ({ todolistId, taskId, model }) => ({
        method: "put",
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        body: model,
      }),
      extraOptions: { dataSchema: taskOperationResponseSchema },
      invalidatesTags: (_res, _err, { todolistId }) => [{ type: "Task", id: todolistId }],
      onQueryStarted: async ({ todolistId, taskId, model }, { dispatch, queryFulfilled, getState }) => {
        const cachedArgsForQuery = tasksApi.util.selectCachedArgsForQuery(getState(), "getTasks")

        let patchResults: any[] = []
        cachedArgsForQuery.forEach(({ params }) => {
          patchResults.push(
            dispatch(
              tasksApi.util.updateQueryData("getTasks", { todolistId, params: { page: params.page } }, (state) => {
                const index = state.items.findIndex((task) => task.id === taskId)
                if (index !== -1) {
                  state.items[index] = { ...state.items[index], ...model }
                }
              }),
            ),
          )
        })

        try {
          await queryFulfilled
        } catch (err) {
          patchResults.forEach((patchResult) => {
            patchResult.undo()
          })
        }
      },
    }),
  }),
})

export const { useGetTasksQuery, useCreateTasksMutation, useDeleteTaskMutation, useUpdateTaskMutation } = tasksApi
