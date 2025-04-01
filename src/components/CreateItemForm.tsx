import {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Grid, IconButton, TextField} from '@mui/material';
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
        <Grid container sx={{alignItems: 'center'}}>
            <TextField
                sx={{flexGrow: '1'}}
                value={newTaskTitle}
                label="Type value"
                onChange={changeItemTitleHandler}
                onKeyDown={createTaskOnEnterHandler}
                error={!!error}
                helperText={error}
            />
            <IconButton
                aria-label="add"
                onClick={createItemHandler}>
                <AddBoxIcon color={'primary'}/>
            </IconButton>
        </Grid>
    );
};