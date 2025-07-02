import {arrayMove} from '@dnd-kit/sortable';
import {DragEndEvent} from '@dnd-kit/core';
import {DomainTodolist} from '@/features/todolists/lib/types';

type TriggerParams =  {
    id: string;
    putAfterItemId: string | null;
    newOrder: DomainTodolist[]
}

export const changeTodolistsOrder = (
    event: DragEndEvent,
    todolists: DomainTodolist[],
    trigger: (params: TriggerParams) => void
) => {
    const {active, over} = event;

    if (!over || active.id === over.id) {
        return
    }

    const oldIndex = todolists.findIndex(tl => tl.id === active.id)
    const newIndex = todolists.findIndex(tl => tl.id === over.id)

    if (oldIndex !== -1 && newIndex !== -1) {
        const newOrder = arrayMove(todolists, oldIndex, newIndex)
        const putAfterItemId = newIndex === 0 ? null : newOrder[newIndex - 1].id
        trigger({id: newOrder[newIndex].id, putAfterItemId, newOrder})
    }
}