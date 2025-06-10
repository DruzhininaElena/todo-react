import { AppBar, Container, IconButton, LinearProgress, Toolbar } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { NavButton } from "@/common/components/NavButton/NavButton.ts"
import { SwitchThemes } from "./SwitchThemes/SwitchThemes.ts"
import { changeThemeModeAC, selectStatus, selectThemeMode } from "@/app/app-slice.ts"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { getTheme } from "@/common/theme/theme.ts"
import { containerSx } from "@/common/components/Header/Header.style.ts"
import { NavLink } from "react-router"
import { Path } from "@/common/routing/Routing.tsx"

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectStatus)

  const dispatch = useAppDispatch()

  const theme = getTheme(themeMode)

  const changeMode = () => {
    dispatch(changeThemeModeAC({ themeMode: themeMode === "light" ? "dark" : "light" }))
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Container maxWidth={"lg"} sx={containerSx}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <div>
            <NavLink to={Path.Main}>
              <NavButton color={"inherit"}>Home</NavButton>
            </NavLink>
            <NavLink to={Path.Login}>
              <NavButton color={"inherit"}>Sign in</NavButton>
            </NavLink>
            <NavButton color={"inherit"}>Sign up</NavButton>
            <NavButton color={"inherit"} background={theme.palette.primary.dark}>
              Faq
            </NavButton>
            <SwitchThemes sx={{ m: 1 }} defaultChecked onChange={changeMode} />
          </div>
        </Container>
      </Toolbar>
      {status === "loading" && <LinearProgress />}
    </AppBar>
  )
}
