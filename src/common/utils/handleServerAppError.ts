import { setAppErrorAC, changeAppStatusAC } from '@/app/app-slice'
import type { BaseResponse } from '@/common/types'
import type { Dispatch } from '@reduxjs/toolkit'

export const handleServerAppError = <T,>(data: BaseResponse<T>, dispatch: Dispatch) => {
    dispatch(setAppErrorAC({ error: data.messages.length ? data.messages[0] : 'Some error occurred' }))
    dispatch(changeAppStatusAC({ status: 'failed' }))
}