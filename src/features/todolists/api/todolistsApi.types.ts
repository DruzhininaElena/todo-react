import {z} from 'zod/v4'

export const TodolistSchema = z.object({
  id: z.string(),
  title: z.string(),
  addedDate: z.string(),
  order: z.number(),
})

export type Todolist = z.infer<typeof TodolistSchema>
