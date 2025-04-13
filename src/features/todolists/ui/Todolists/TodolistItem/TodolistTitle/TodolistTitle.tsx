import {EditableSpan} from '../../../../../../common/components/EditableSpan/EditableSpan.tsx';
import {IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {useAppDispatch} from '@/common/hooks/useAppDispatch.ts';
import {changeTodolistTitleAC, deleteTodolistAC, Todolist} from '@/features/todolists/model/todolists-reducer.ts';

type Props = {
    todolist: Todolist
};
export const TodolistTitle = ({todolist}: Props) => {

    const{title, id} = todolist

    const dispatch = useAppDispatch()

    const changeTaskTitleHandler = (newTitle: string) => {
        dispatch(changeTodolistTitleAC({title: newTitle, id}))
    }
    const deleteTodolistHandler = () => {
        dispatch(deleteTodolistAC({id}))
    }


    return (
        <>
            <h3 style={{textAlign: 'center'}}>
                <EditableSpan value={title} changeTaskTitle={changeTaskTitleHandler}/>
                <IconButton aria-label="delete" onClick={deleteTodolistHandler} size={'small'}>
                    <DeleteIcon fontSize="inherit"/>
                </IconButton>
            </h3>
        </>
    );
};