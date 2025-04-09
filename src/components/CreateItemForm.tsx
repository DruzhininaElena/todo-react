import {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Box, Grid, IconButton, TextField} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';

type Props = {
    createItem: (newTaskTitle: string) => void
};
export const CreateItemForm = ({createItem}: Props) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const changeItemTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
        setError(null)
    }

    const createItemHandler = () => {
        const trimmedTitle = newTaskTitle.trim()
        if (trimmedTitle !== '') {
            createItem(trimmedTitle)
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    const createTaskOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') createItemHandler()
    }


    return (
        <Grid container sx={{alignItems: 'center'}} wrap={'nowrap'}>
            <Box sx={{ position: 'relative', flexGrow: '1' }}>
                <TextField
                    size={'small'}
                    fullWidth
                    value={newTaskTitle}
                    label="Type value"
                    onChange={changeItemTitleHandler}
                    onKeyDown={createTaskOnEnterHandler}
                    error={!!error}
                />
                {error && (
                    <Box sx={{
                        position: 'absolute',
                        bottom: '-20px',
                        left: 0,
                        fontSize: '0.75rem',
                        color: 'error.main',
                        padding: '0 14px' // Совпадает с отступами TextField
                    }}>
                        {error}
                    </Box>
                )}
            </Box>
            <IconButton
                aria-label="add"
                onClick={createItemHandler}>
                <AddBoxIcon color={'primary'}/>
            </IconButton>
        </Grid>
    );
};