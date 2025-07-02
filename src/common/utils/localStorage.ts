import {AppState} from '@/app/app-slice.ts';

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        if (err instanceof Error)
        return undefined;
    }
};

export const saveState = (state: { app: AppState }) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem("state", serializedState)
  } catch {
    // ignore write errors
  }
}