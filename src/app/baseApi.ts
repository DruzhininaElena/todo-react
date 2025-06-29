import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {AUTH_TOKEN} from '@/common/constants';
import {handleError} from '@/common/utils/handleError.ts';

export const baseApi = createApi({
    reducerPath: 'todolistsApi',
    tagTypes: ['Todolist', 'Task'],
    baseQuery: async (args, api, extraOptions) => {
        // await new Promise((res) => setTimeout(res, 2000))

        const result = await fetchBaseQuery({
            baseUrl: import.meta.env.VITE_BASE_URL,
            prepareHeaders: (headers) => {
                headers.set('API-KEY', import.meta.env.VITE_API_KEY)
                headers.set('Authorization', `Bearer ${localStorage.getItem(AUTH_TOKEN)}`)
            }
        })(args, api, extraOptions)

        handleError(api, result)

        return result
    },
    endpoints: () => ({}),
    // keepUnusedDataFor: 120
    refetchOnFocus: true,
    refetchOnReconnect: true
})