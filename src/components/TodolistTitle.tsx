import {EditableSpan} from './EditableSpan.tsx';
import {IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
    title: string
    deleteTodolist: () => void
    changeTodolistTitle: (title: string) => void
};
export const TodolistTitle = ({title, deleteTodolist, changeTodolistTitle}: Props) => {
    return (
        <>
            <h3 style={{textAlign: 'center'}}>
                <EditableSpan value={title} changeTaskTitle={changeTodolistTitle}/>
                <IconButton aria-label="delete" onClick={deleteTodolist} size={'small'}>
                    <DeleteIcon fontSize="inherit"/>
                </IconButton>
            </h3>
        </>
    );
};