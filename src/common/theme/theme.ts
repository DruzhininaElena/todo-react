import { createTheme } from "@mui/material/styles"
import { deepPurple } from "@mui/material/colors"
import { ThemeMode } from "@/app/app-slice.ts"

export const getTheme = (themeMode: ThemeMode) => {
  return createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: deepPurple[500],
      },
    },
  })
}
