import {createSlice} from '@reduxjs/toolkit'
import {RequestStatus} from '@/common/types';


export const appSlice = createSlice({
  name: 'app',
  initialState: {
    themeMode: "light" as ThemeMode,
    status: 'idle' as RequestStatus,
    error: null as (string | null),
    isLoggedIn: false,
  },
  reducers: (create) => ({
    setIsLoggedIn: create.reducer<{isLoggedIn: boolean}>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
    changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
    changeAppStatusAC: create.reducer<{ status: RequestStatus}>((state, action) => {
      state.status = action.payload.status
    }),
    changeAppErrorAC: create.reducer<{ error: string | null}>((state, action) => {
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

export const {changeThemeModeAC, changeAppStatusAC, changeAppErrorAC, setIsLoggedIn} = appSlice.actions
export const {selectThemeMode, selectStatus, selectAppError, selectIsLoggedIn} = appSlice.selectors
export const appReducer = appSlice.reducer

export type ThemeMode = "dark" | "light"
