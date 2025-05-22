import "./App.css"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { useAppSelector } from "@/common/hooks"
import { getTheme } from "@/common/theme"
import { Header } from "@/common/components/Header/Header.tsx"
import { Main } from "@/app/Main.tsx"
import {selectThemeMode} from '@/app/app-slice.ts';

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)

  const theme = getTheme(themeMode)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Main />
    </ThemeProvider>
  )
}
