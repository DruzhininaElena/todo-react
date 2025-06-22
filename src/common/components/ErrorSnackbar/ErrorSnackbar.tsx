import {SyntheticEvent} from 'react'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import {useSelector} from 'react-redux';
import {setAppErrorAC, selectAppError} from '@/app/app-slice.ts';
import {useAppDispatch} from '@/common/hooks';

export const ErrorSnackbar = () => {
    const error = useSelector(selectAppError)
    const dispatch = useAppDispatch()

    const handleClose = (_: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }

        dispatch(setAppErrorAC({error: null}))
    }

    return (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
                {error}
            </Alert>
        </Snackbar>
    )
}