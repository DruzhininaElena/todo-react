import {z, type ZodType} from 'zod/v4'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/query/react"
import {setAppErrorAC} from '@/app/app-slice.ts';
import {ResultCode} from '@/common/enums';

type TBaseQuery = BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError,
    { dataSchema?: ZodType },
    FetchBaseQueryMeta
>

/**
 * HOF that wraps a base query function with additional functionality for data validation using zod
 *
 * @param baseQuery The base query function to be wrapped.
 * @returns A modified version of the baseQuery with added data validation.
 */
export const baseQueryWithZodValidation: (baseQuery: TBaseQuery) => TBaseQuery =
  (baseQuery: TBaseQuery) => async (args, api, extraOptions) => {

    const returnValue = await baseQuery(args, api, extraOptions)

    const zodSchema = extraOptions?.dataSchema

    const { data } = returnValue

    if (data && data.resultCode === ResultCode.Success && zodSchema) {
      try {
        zodSchema.parse(data)
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.table(error.issues)
          api.dispatch(setAppErrorAC({ error: "Zod error. Смотри консоль" }))
        }
        throw error
      }
    }

    return returnValue
  }
