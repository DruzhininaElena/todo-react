import {EditableSpan} from '@/common/components'
import {IconButton} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import {useChangeTodolistTitleMutation, useDeleteTodolistMutation} from '@/features/todolists/api/todolistApi.ts';
import {DomainTodolist} from '@/features/todolists/lib/types';

type Props = {
    todolist: DomainTodolist
}
export const TodolistTitle = ({todolist}: Props) => {

    const {title, id} = todolist


    const [deleteTodolist] = useDeleteTodolistMutation()
    const [changeTodolistTitle] = useChangeTodolistTitleMutation()


    const changeTaskTitleHandler = (newTitle: string) => {
        changeTodolistTitle({title: newTitle, id})
    }

    const deleteTodolistHandler = async () => deleteTodolist(id)

    return (
        <>
            <h3 style={{textAlign: 'center'}}>
                <EditableSpan value={title} changeTaskTitle={changeTaskTitleHandler}/>
                <IconButton aria-label="delete" onClick={deleteTodolistHandler} size={'small'}>
                    <DeleteIcon fontSize="inherit"/>
                </IconButton>
            </h3>
        </>
    )
}
