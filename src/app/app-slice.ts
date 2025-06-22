import {createSlice, isFulfilled, isPending, isRejected} from '@reduxjs/toolkit'
import {RequestStatus} from '@/common/types';
import {todolistsApi} from '@/features/todolists/api/todolistApi.ts';
import {tasksApi} from '@/features/todolists/api/tasksApi.ts';


export const appSlice = createSlice({
    name: 'app',
    initialState: {
        themeMode: 'dark' as ThemeMode,
        status: 'idle' as RequestStatus,
        error: null as (string | null),
        isLoggedIn: false,
    },
    extraReducers: (builder) => {
        builder.addMatcher(isPending, (state, action) => {
            if (
                todolistsApi.endpoints.getTodolists.matchPending(action) ||
                tasksApi.endpoints.getTasks.matchPending(action)
            ) {
                return
            }
                state.status = 'loading'
            })
        builder.addMatcher(isFulfilled, (state) => {
                state.status = 'succeeded'
            })
        builder.addMatcher(isRejected, (state) => {
                state.status = 'failed'
            })
    },
    reducers: (create) => ({
        setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
        }),
        changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
            state.themeMode = action.payload.themeMode
        }),
        changeAppStatusAC: create.reducer<{ status: RequestStatus }>((state, action) => {
            state.status = action.payload.status
        }),
        setAppErrorAC: create.reducer<{ error: string | null }>((state, action) => {
            state.error = action.payload.error
        })
    }),
    selectors: {
        selectThemeMode: (state) => state.themeMode,
        selectStatus: (state) => state.status,
        selectAppError: (state) => state.error,
        selectIsLoggedIn: (state) => state.isLoggedIn
    }
})

export const {changeThemeModeAC, changeAppStatusAC, setAppErrorAC, setIsLoggedIn} = appSlice.actions
export const {selectThemeMode, selectStatus, selectAppError, selectIsLoggedIn} = appSlice.selectors
export const appReducer = appSlice.reducer

export type ThemeMode = 'dark' | 'light'
