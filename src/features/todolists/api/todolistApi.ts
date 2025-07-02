import {
  CreateTodolistResponse,
  createTodolistResponseSchema,
  Todolist,
  todolistSchema,
} from "@/features/todolists/api/todolistsApi.types.ts"
import {DefaultResponse, defaultResponseSchema} from '@/common/types'
import { baseApi } from "@/app/baseApi.ts"
import { DomainTodolist } from "@/features/todolists/lib/types"

export const todolistsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTodolists: builder.query<DomainTodolist[], void>({
      query: () => "/todo-lists",
      transformResponse: (todolists: Todolist[]) => {
        return todolists.map((tl) => ({ ...tl, filter: "all" }))
      },
      extraOptions: { dataSchema: todolistSchema.array() },
      providesTags: ["Todolist"],
    }),
    createTodolist: builder.mutation<CreateTodolistResponse, string>({
      query: (title) => ({ method: "post", url: "/todo-lists", body: { title } }),
      extraOptions: { dataSchema: createTodolistResponseSchema },
      invalidatesTags: ["Todolist"],
    }),
    deleteTodolist: builder.mutation<DefaultResponse, string>({
      query: (id) => ({ method: "delete", url: `/todo-lists/${id}` }),
      extraOptions: { dataSchema: defaultResponseSchema },
      invalidatesTags: ["Todolist"],
      onQueryStarted: async (todolistId, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          todolistsApi.util.updateQueryData("getTodolists", undefined, (state) => {
            const index = state.findIndex((todolist) => todolist.id === todolistId)
            if (index !== -1) {
              state.splice(index, 1)
            }
          }),
        )
        try {
          await queryFulfilled
        } catch (err) {
          patchResult.undo()
        }
      },
    }),
    changeTodolistTitle: builder.mutation<DefaultResponse, { id: string; title: string }>({
      query: ({ id, title }) => ({ method: "put", url: `/todo-lists/${id}`, body: { title } }),
      extraOptions: { dataSchema: defaultResponseSchema },
      invalidatesTags: ["Todolist"],
    }),
    changeTodolistsOrder: builder.mutation<
      DefaultResponse,
      { id: string; putAfterItemId: string | null; newOrder: DomainTodolist[] }
    >({
      query: ({ id, putAfterItemId }) => ({
        method: "put",
        url: `/todo-lists/${id}/reorder`,
        body: { putAfterItemId },
      }),
      extraOptions: { dataSchema: defaultResponseSchema },
      invalidatesTags: ["Todolist"],
      onQueryStarted: async ({ newOrder }, { dispatch, queryFulfilled }) => {
        let patchResults: any[] = []
        patchResults.push(
          dispatch(
            todolistsApi.util.updateQueryData("getTodolists", undefined, () => {
              return newOrder
            }),
          ),
        )

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

export const {
  useGetTodolistsQuery,
  useCreateTodolistMutation,
  useDeleteTodolistMutation,
  useChangeTodolistTitleMutation,
  useChangeTodolistsOrderMutation,
} = todolistsApi