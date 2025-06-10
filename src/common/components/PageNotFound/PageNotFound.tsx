import { Link } from "react-router"
import styles from "./PageNotFound.module.css"
import { Button } from "@mui/material"

export const PageNotFound = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>404</h1>
    <h2 className={styles.subtitle}>page not found</h2>
    <Button size={"large"} variant={"contained"} component={Link} to="/">
      ВЕРНУТЬСЯ НА ГЛАВНУЮ
    </Button>
  </div>
)
