import {createSlice} from '@reduxjs/toolkit'
import {RequestStatus} from '@/common/types';


export const appSlice = createSlice({
  name: 'app',
  initialState: {
    themeMode: "light" as ThemeMode,
    status: 'loading' as RequestStatus
  },
  reducers: (create) => ({
    changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
    changeAppStatusAC: create.reducer<{ status: RequestStatus}>((state, action) => {
      state.status = action.payload.status
    })
  }),
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectStatus: (state) => state.status,
  }
})

export const {changeThemeModeAC, changeAppStatusAC} = appSlice.actions
export const {selectThemeMode, selectStatus} = appSlice.selectors
export const appReducer = appSlice.reducer

export type ThemeMode = "dark" | "light"
