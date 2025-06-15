import {LoginInputs} from '@/features/auth/lib/schemas/loginSchema.ts';
import {createAppSlice} from '@/common/utils';
import {changeAppStatusAC} from '@/app/app-slice.ts';
import {authApi} from '@/features/auth/api/authApi.ts';
import {handleServerNetworkError} from '@/common/utils/handleServerNetworkError.ts';
import {ResultCode} from '@/common/enums';
import {handleServerAppError} from '@/common/utils/handleServerAppError.ts';
import {AUTH_TOKEN} from '@/common/constants';

export const authSlice = createAppSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
    },
    reducers: create => ({
        loginTC: create.asyncThunk(
            async (data: LoginInputs, {dispatch, rejectWithValue}) => {
                try {
                    dispatch(changeAppStatusAC({status: 'loading'}))
                    const res = await authApi.login(data)
                    localStorage.setItem(AUTH_TOKEN, res.data.data.token)
                    if (res.data.resultCode === ResultCode.Success) {
                        dispatch(changeAppStatusAC({status: 'succeeded'}))
                        return {isLoggedIn: true}
                    }
                    handleServerAppError(res.data, dispatch)
                    return rejectWithValue(null)
                } catch (error) {
                    handleServerNetworkError(dispatch, error)
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    state.isLoggedIn = action.payload.isLoggedIn
                },
            }
        ),
        logoutTC: create.asyncThunk(
            async (_, {dispatch, rejectWithValue}) => {
                try {
                    dispatch(changeAppStatusAC({status: 'loading'}))
                    await authApi.logout()
                    localStorage.removeItem(AUTH_TOKEN)
                    dispatch(changeAppStatusAC({status: 'succeeded'}))
                    return {isLoggedIn: false}

                } catch (error) {
                    handleServerNetworkError(dispatch, error)
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    state.isLoggedIn = action.payload.isLoggedIn
                },
            }
        ),
        initializeAppTC: create.asyncThunk(
            async (_, {dispatch, rejectWithValue}) => {
                try {
                    const res = await authApi.me()
                    if (res.data.resultCode === ResultCode.Success) {
                        return {isLoggedIn: true}
                    } else {
                        handleServerAppError(res.data, dispatch)
                        return rejectWithValue(null)
                    }

                } catch (error) {
                    handleServerNetworkError(dispatch, error)
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    state.isLoggedIn = action.payload.isLoggedIn
                },
            }
        ),
    }),
    selectors: {
        selectIsLoggedIn: (state) => state.isLoggedIn
    }
})

export const {selectIsLoggedIn} = authSlice.selectors
export const {loginTC, logoutTC, initializeAppTC} = authSlice.actions
export const authReducer = authSlice.reducer