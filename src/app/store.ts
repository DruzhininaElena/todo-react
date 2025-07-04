import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { appReducer, appSlice } from "./app-slice.ts"
import { setupListeners } from "@reduxjs/toolkit/query"
import { baseApi } from "@/app/baseApi.ts"
import {loadState, saveState} from '@/common/utils';

const rootReducer = combineReducers({
  [appSlice.name]: appReducer,
  [baseApi.reducerPath]: baseApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
  preloadedState: loadState()
})

store.subscribe(() => {
    saveState({
        app: store.getState().app
    });
});

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store
