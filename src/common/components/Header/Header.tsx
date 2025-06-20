import {AppBar, Container, IconButton, LinearProgress, Toolbar} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import {NavButton} from '@/common/components/NavButton/NavButton.ts'
import {SwitchThemes} from './SwitchThemes/SwitchThemes.ts'
import {changeThemeModeAC, selectIsLoggedIn, selectStatus, selectThemeMode, setIsLoggedIn} from '@/app/app-slice.ts'
import {useAppDispatch} from '@/common/hooks/useAppDispatch.ts'
import {useAppSelector} from '@/common/hooks/useAppSelector.ts'
import {getTheme} from '@/common/theme/theme.ts'
import {containerSx} from '@/common/components/Header/Header.style.ts'
import {useLogoutMutation} from '@/features/auth/api/authApi.ts';
import {AUTH_TOKEN} from '@/common/constants';
import {ResultCode} from '@/common/enums';

export const Header = () => {
    const themeMode = useAppSelector(selectThemeMode)
    const status = useAppSelector(selectStatus)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    const [logout] = useLogoutMutation()

    const dispatch = useAppDispatch()

    const theme = getTheme(themeMode)

    const changeMode = () => {
        dispatch(changeThemeModeAC({themeMode: themeMode === 'light' ? 'dark' : 'light'}))
    }

    const logoutHandler = () => {
        logout().then((res) => {
            if (res.data?.resultCode === ResultCode.Success) {
                localStorage.removeItem(AUTH_TOKEN)
                dispatch(setIsLoggedIn({ isLoggedIn: false }))
            }
        })
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Container maxWidth={'lg'} sx={containerSx}>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <div>
                        {isLoggedIn && (
                            <NavButton color={'inherit'} onClick={logoutHandler}>Log out</NavButton>
                        )}
                        <NavButton color={'inherit'} background={theme.palette.primary.dark}>
                            Faq
                        </NavButton>
                        <SwitchThemes sx={{m: 1}} defaultChecked onChange={changeMode}/>
                    </div>
                </Container>
            </Toolbar>
            {status === 'loading' && <LinearProgress/>}
        </AppBar>
    )
}
