import {TodolistItem} from './TodolistItem/TodolistItem.tsx'
import {useChangeTodolistsOrderMutation, useGetTodolistsQuery} from '@/features/todolists/api/todolistApi.ts';
import {TodolistSkeleton} from '../Todolists/TodolistSkeleton/TodolistSkeleton.tsx';
import {Grid} from '@mui/material';
import {DndContext, DragEndEvent} from '@dnd-kit/core';
import {SortableContext} from '@dnd-kit/sortable';
import {restrictToWindowEdges} from '@dnd-kit/modifiers';
import {changeTodolistsOrder} from '@/common/utils';

export const Todolists = () => {

    const {data: todolists, isLoading} = useGetTodolistsQuery()
    const [trigger] = useChangeTodolistsOrderMutation()

    if (isLoading) {
        return (
            <Grid container spacing={4}>
                {Array(3).fill(null).map((_, id) => (
                    <TodolistSkeleton key={id}/>
                ))}
            </Grid>
        )
    }

    const handleDragEnd = (event: DragEndEvent) => {
        if (todolists) {
            changeTodolistsOrder(event, todolists, trigger)
        }
    };

    return (
        <DndContext onDragEnd={handleDragEnd} modifiers={[restrictToWindowEdges]}>
            <SortableContext items={todolists || []}>
                <Grid container spacing={4}>

                    {todolists?.map((tl) => {
                        return (
                            <TodolistItem key={tl.id} todolist={tl}/>
                        )
                    })}
                </Grid>
            </SortableContext>
        </DndContext>

    )
}
