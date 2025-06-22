import {EditableSpan} from '@/common/components'
import {IconButton} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import {
    todolistsApi,
    useChangeTodolistTitleMutation,
    useDeleteTodolistMutation
} from '@/features/todolists/api/todolistApi.ts';
import {useAppDispatch} from '@/common/hooks';
import {RequestStatus} from '@/common/types';
import {DomainTodolist} from '@/features/todolists/api/todolistsApi.types.ts';

type Props = {
    todolist: DomainTodolist
}
export const TodolistTitle = ({todolist}: Props) => {

    const {title, id, entityStatus} = todolist

    const dispatch = useAppDispatch()

    const [deleteTodolist] = useDeleteTodolistMutation()
    const [changeTodolistTitle] = useChangeTodolistTitleMutation()


    const changeTaskTitleHandler = (newTitle: string) => {
        changeTodolistTitle({title: newTitle, id})
    }

    const changeTodolistStatus = (entityStatus: RequestStatus) => {
        dispatch(todolistsApi.util.updateQueryData('getTodolists', undefined, (todolists) => {
            const todolist = todolists.find((todo) => todo.id === id)
            if (todolist) todolist.entityStatus = entityStatus
        }))
    }

    const deleteTodolistHandler = () => {
        changeTodolistStatus('loading')

        deleteTodolist(id)
            .unwrap()
            .catch((_err) => {
                changeTodolistStatus('idle')
            })
    }

    return (
        <>
            <h3 style={{textAlign: 'center'}}>
                <EditableSpan value={title} changeTaskTitle={changeTaskTitleHandler}
                              disabled={entityStatus === 'loading'}/>
                <IconButton aria-label="delete" onClick={deleteTodolistHandler} size={'small'}
                            disabled={entityStatus === 'loading'}>
                    <DeleteIcon fontSize="inherit"/>
                </IconButton>
            </h3>
        </>
    )
}
