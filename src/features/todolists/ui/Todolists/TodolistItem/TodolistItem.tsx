import {TabsFilter} from './TabsFilter/TabsFilter.tsx';
import {CreateItemForm} from '@/common/components/CreateItemForm/CreateItemForm.tsx';
import {TodolistTitle} from './TodolistTitle/TodolistTitle.tsx';
import {Todolist} from '@/features/todolists/model/todolists-reducer.ts';
import {useAppDispatch} from '@/common/hooks/useAppDispatch.ts';
import {createTaskAC} from '@/features/todolists/model/tasks-reducer.ts';
import {Tasks} from './Tasks/Tasks.tsx';

type Props = {
    todolist: Todolist
}

export const TodolistItem = ({todolist}: Props) => {
    const dispatch = useAppDispatch()

    const createTaskHandler = (title: string) => {
        dispatch(createTaskAC({title, todolistId: todolist.id}))
    }

    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <TabsFilter todolist={todolist}/>
            <CreateItemForm createItem={createTaskHandler}/>
            <Tasks todolist={todolist}/>
        </div>
    )
}