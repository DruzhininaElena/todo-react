import {TodolistItem} from './TodolistItem/TodolistItem.tsx'
import {useGetTodolistsQuery} from '@/features/todolists/api/todolistApi.ts';
import {TodolistSkeleton} from '../Todolists/TodolistSkeleton/TodolistSkeleton.tsx';

export const Todolists = () => {

    const {data: todolists, isLoading} = useGetTodolistsQuery()

    if (isLoading) {
        return (
            <>
                {Array(3).fill(null).map((_, id) => (
                        <TodolistSkeleton key={id}/>
                    ))}
            </>
        )
    }

    return (
        <>
            {todolists?.map((tl) => {
                return (
                    <TodolistItem key={tl.id} todolist={tl}/>
                )
            })}
        </>
    )
}
