import { z } from "zod/v4"
import {FilterValue, RequestStatus} from '@/common/types';

export const TodolistSchema = z.object({
  id: z.string(),
  title: z.string(),
  addedDate: z.string(),
  order: z.number(),
})

export type Todolist = z.infer<typeof TodolistSchema>

export type DomainTodolist = Todolist & {
  filter: FilterValue
  entityStatus: RequestStatus
}
