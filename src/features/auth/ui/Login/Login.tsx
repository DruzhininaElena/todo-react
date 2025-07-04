import {selectNeedCaptcha, selectThemeMode, setIsLoggedIn, setNeedCaptcha} from '@/app/app-slice'
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { getTheme } from "@/common/theme"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import TextField from "@mui/material/TextField"
import { Grid } from "@mui/material"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import styles from "./Login.module.css"
import { LoginInputs, loginSchema } from "@/features/auth/lib/schemas/loginSchema.ts"
import { zodResolver } from "@hookform/resolvers/zod"
import { useGetCaptchaUrlQuery, useLoginMutation } from "@/features/auth/api/authApi.ts"
import { ResultCode } from "@/common/enums"
import { AUTH_TOKEN } from "@/common/constants"

export const Login = () => {
  const dispatch = useAppDispatch()
  const [login] = useLoginMutation()

  const themeMode = useAppSelector(selectThemeMode)

  const needCaptcha = useAppSelector(selectNeedCaptcha)
  const theme = getTheme(themeMode)

  const {data} = useGetCaptchaUrlQuery(undefined, {skip: !needCaptcha})

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<LoginInputs>({
    defaultValues: { email: "", password: "", rememberMe: false },
    resolver: zodResolver(loginSchema),
  })

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    login(data).then((res) => {
      if (res.data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
        dispatch(setNeedCaptcha(false))
        localStorage.setItem(AUTH_TOKEN, res.data.data.token)
        reset()
      }
    })
  }

  return (
    <Grid container justifyContent={"center"} mb='50px'>
      <FormControl>
        <FormLabel>
          <p>
            To login get registered
            <a
              style={{ color: theme.palette.primary.main, marginLeft: "5px" }}
              href="https://social-network.samuraijs.com"
              target="_blank"
              rel="noreferrer"
            >
              here
            </a>
          </p>
          <p>or use common test account credentials:</p>
          <p>
            <b>Email:</b> free@samuraijs.com
          </p>
          <p>
            <b>Password:</b> free
          </p>
        </FormLabel>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <TextField label="Email" margin="normal" error={!!errors.email} {...register("email")} />
            {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
            <TextField type="password" label="Password" margin="normal" {...register("password")} />
            {errors.password && <span className={styles.errorMessage}>{errors.password.message}</span>}
            <FormControlLabel
              label="Remember me"
              control={
                <Controller
                  name="rememberMe"
                  control={control}
                  render={({ field: { value, ...rest } }) => <Checkbox {...rest} checked={value} />}
                />
              }
            />

            {needCaptcha && (
                <>
                  <img src={data?.url} alt="captcha"/>
                  <TextField label="Enter the text from the image" margin="normal" {...register("captcha")} />
                </>
            )}

            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </FormGroup>
        </form>
      </FormControl>
    </Grid>
  )
}
