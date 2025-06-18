import {LoginInputs} from '@/features/auth/lib/schemas/loginSchema.ts';
import {BaseResponse} from '@/common/types';
import {baseApi} from '@/app/baseApi.ts';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => {
        return {
            login: builder.mutation<BaseResponse<{ userId: number; token: string }>, LoginInputs>({
                query: (body) => ({
                    url: '/auth/login',
                    method: 'POST',
                    body,
                }),
            }),
            logout: builder.mutation<BaseResponse, void>({
                query: () => ({method: 'delete', url: '/auth/login'})
            }),
            me: builder.query<BaseResponse<{ id: number; email: string; login: string }>, void>({
                query: () => '/auth/me'
            })
        }
    }
})

export const {useLoginMutation, useLogoutMutation, useMeQuery} = authApi