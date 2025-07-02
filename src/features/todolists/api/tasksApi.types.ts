import { TaskPriority, TaskStatus } from "@/common/enums"
import { z } from "zod/v4"
import {baseResponseSchema} from '@/common/types';

export const domainTaskSchema = z.object({
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
})

export type DomainTask = z.infer<typeof domainTaskSchema>

export const getTaskSchema = z.object({
  error: z.string().nullable(),
  totalCount: z.number().int().nonnegative(),
  items: domainTaskSchema.array()
})

export type GetTasksResponse = z.infer<typeof getTaskSchema>

export type UpdateTaskModel = {
  description: string | null
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string | null
  deadline: string | null
}

export const taskOperationResponseSchema = baseResponseSchema(
    z.object({
      item: domainTaskSchema.optional(),
    }),
)
export type TaskOperationResponse = z.infer<typeof taskOperationResponseSchema>
