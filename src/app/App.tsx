import {ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {useAppDispatch, useAppSelector} from '@/common/hooks'
import {getTheme} from '@/common/theme'
import {Header} from '@/common/components/Header/Header.tsx'
import {selectThemeMode, setIsLoggedIn} from '@/app/app-slice.ts'
import {ErrorSnackbar} from '@/common/components'
import {Routing} from '@/common/routing'
import {useEffect, useState} from 'react';
import {CircularProgress} from '@mui/material';
import styles from './App.module.css'
import {useMeQuery} from '@/features/auth/api/authApi.ts';
import {ResultCode} from '@/common/enums';

export const App = () => {
    const [isInitialized, setIsInitialized] = useState(false)
    const dispatch = useAppDispatch()

    const {data, isLoading} = useMeQuery()

    const themeMode = useAppSelector(selectThemeMode)

    const theme = getTheme(themeMode)

    useEffect(() => {
        if (isLoading) return
        setIsInitialized(true)
        if (data?.resultCode === ResultCode.Success) {
            dispatch(setIsLoggedIn({isLoggedIn: true}))
        }
    }, [isLoading, data]);

    const circularProgress = <div className={styles.circularProgressContainer}>
        <CircularProgress size={150} thickness={3}/>
    </div>

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            {!isInitialized ? circularProgress : (
                <>
                    <Header/>
                    <Routing/>
                    <ErrorSnackbar/>
                </>
            )}
        </ThemeProvider>
    )
}
