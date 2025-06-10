import "./App.css"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { useAppSelector } from "@/common/hooks"
import { getTheme } from "@/common/theme"
import { Header } from "@/common/components/Header/Header.tsx"
import { selectThemeMode } from "@/app/app-slice.ts"
import { ErrorSnackbar } from "@/common/components"
import { Routing } from "@/common/routing"

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)

  const theme = getTheme(themeMode)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Routing />
      <ErrorSnackbar />
    </ThemeProvider>
  )
}
