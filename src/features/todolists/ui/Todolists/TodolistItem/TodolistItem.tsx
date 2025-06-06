import {TabsFilter} from './TabsFilter/TabsFilter.tsx'
import {TodolistTitle} from './TodolistTitle/TodolistTitle.tsx'
import {DomainTodolist} from '@/features/todolists/model/todolists-slice.ts'

import {createTaskTC} from '@/features/todolists/model/tasks-slice.ts'
import {Tasks} from './Tasks/Tasks.tsx'
import {CreateItemForm} from '@/common/components'
import {useAppDispatch} from '@/common/hooks'

type Props = {
  todolist: DomainTodolist
}

export const TodolistItem = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const createTaskHandler = (title: string) => {
    dispatch(createTaskTC({ title, todolistId: todolist.id }))
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <TabsFilter todolist={todolist} />
      <CreateItemForm createItem={createTaskHandler} label='Create new task' disabled={todolist.entityStatus ==='loading'}/>
      <Tasks todolist={todolist} />
    </div>
  )
}
