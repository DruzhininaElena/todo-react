import {DomainTask, UpdateTaskModel} from '@/features/todolists/api/tasksApi.types.ts';

export const createUpdateTaskModel = (domainModel: Partial<UpdateTaskModel>, task: DomainTask) => {
    return {
        description: task.description,
        title: task.title,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        status: task.status,
        ...domainModel,
    }
}