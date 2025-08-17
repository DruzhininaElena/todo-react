import { setAppErrorAC, setNeedCaptcha } from "@/app/app-slice.ts"
import { ResultCode } from "@/common/enums"
import { BaseQueryApi, FetchBaseQueryError, FetchBaseQueryMeta, QueryReturnValue } from "@reduxjs/toolkit/query"
import {isErrorWithMessage} from '@/common/utils/isErrorWithMessage.ts';


export const handleError = (
  api: BaseQueryApi,
  result: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>,
) => {
  let error = "Some error occurred"

  // 1. Global query errors
  if (result.error) {
    switch (result.error.status) {
      case "FETCH_ERROR":
      case "CUSTOM_ERROR":
        error = result.error.error
        break
      case "PARSING_ERROR":
        error = "Parsing error"
        break
      case 403:
        error = "403 Forbidden Error. Check API-KEY"
        break
      case 400:
      case 500:
        if (isErrorWithMessage(result.error.data)) {
          error = result.error.data.message
        } else {
          error = JSON.stringify(result.error.data)
        }
        break
      default:
        error = JSON.stringify(result.error)
        break
    }
    api.dispatch(setAppErrorAC({ error }))
  }

  // 2. Result code errors
  if ((result.data as { resultCode: ResultCode }).resultCode === ResultCode.Error) {
    const messages = (result.data as { messages: string[] }).messages
    error = messages.length ? messages[0] : error
    if (messages[0] !== 'You are not authorized') {
      api.dispatch(setAppErrorAC({ error }))
    }
  }

  if ((result.data as { resultCode: ResultCode }).resultCode === ResultCode.Captcha) {
    api.dispatch(setNeedCaptcha(true))
    const messages = (result.data as { messages: string[] }).messages
    error = messages.length ? messages[0] : error
    api.dispatch(setAppErrorAC({ error }))
  }
}