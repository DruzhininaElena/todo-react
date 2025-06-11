import { TaskPriority, TaskStatus } from "@/common/enums"
import { z } from "zod/v4"

export const DomainTaskSchema = z.object({
  description: z.string().nullable(),
  title: z.string(),
  status: z.enum(TaskStatus),
  priority: z.enum(TaskPriority),
  startDate: z.iso.datetime({local: true}).nullable(),
  deadline: z.iso.datetime({local: true}).nullable(),
  id: z.string(),
  todoListId: z.string(),
  order: z.number(),
  addedDate: z.iso.datetime({local: true}),
  // addedDate: z.string(),
})

export type DomainTask = z.infer<typeof DomainTaskSchema>

export type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: DomainTask[]
}

export type UpdateTaskModel = {
  description: string | null
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string | null
  deadline: string | null
}
