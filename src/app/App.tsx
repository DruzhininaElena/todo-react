import {ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {useAppDispatch, useAppSelector} from '@/common/hooks'
import {getTheme} from '@/common/theme'
import {Header} from '@/common/components/Header/Header.tsx'
import {selectThemeMode} from '@/app/app-slice.ts'
import {ErrorSnackbar} from '@/common/components'
import {Routing} from '@/common/routing'
import {useEffect, useState} from 'react';
import {initializeAppTC} from '@/features/auth/model/auth-slice.ts';
import {CircularProgress} from '@mui/material';
import styles from './App.module.css'

export const App = () => {
    const [isInitialized, setIsInitialized] = useState(false)

    const dispatch = useAppDispatch()

    const themeMode = useAppSelector(selectThemeMode)

    const theme = getTheme(themeMode)

    useEffect(() => {
        dispatch(initializeAppTC()).finally(() => {
            setIsInitialized(true)
        })
    }, []);

    if (!isInitialized) {
        return (
            <div className={styles.circularProgressContainer}>
                <CircularProgress size={150} thickness={3} />
            </div>
        )
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Header/>
            <Routing/>
            <ErrorSnackbar/>
        </ThemeProvider>
    )
}
