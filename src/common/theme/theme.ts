import { createTheme } from "@mui/material/styles"
import { deepPurple, teal } from "@mui/material/colors"
import { ThemeMode } from "@/app/app-slice.ts"

export const getTheme = (themeMode: ThemeMode) => {
  return createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: deepPurple[500],
      },
      secondary: {
        main: teal[400], // #26a69a
      },
    },
  })
}
