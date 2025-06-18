import {TabsFilter} from './TabsFilter/TabsFilter.tsx'
import {TodolistTitle} from './TodolistTitle/TodolistTitle.tsx'
import {DomainTodolist} from '@/features/todolists/model/todolists-slice.ts'
import {Tasks} from './Tasks/Tasks.tsx'
import {CreateItemForm} from '@/common/components'
import {useCreateTasksMutation} from '@/features/todolists/api/tasksApi.ts';

type Props = {
    todolist: DomainTodolist
}

export const TodolistItem = ({todolist}: Props) => {

    const [createTask] = useCreateTasksMutation()

    const createTaskHandler = (title: string) => {
        createTask({todolistId: todolist.id, title})
    }

    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <TabsFilter todolist={todolist}/>
            <CreateItemForm createItem={createTaskHandler} label="Create new task"
                            disabled={todolist.entityStatus === 'loading'}/>
            <Tasks todolist={todolist}/>
        </div>
    )
}
