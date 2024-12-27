import { ItaskRepository } from "./ITaskReposoty";
import { BaseTask, Task } from "./Task";

export class TaskService implements ItaskRepository {
  constructor(private taskRepository: ItaskRepository){}

  async getAllTask() {
    return this.taskRepository.getAllTask();
  }

  async saveTask(task: BaseTask) {
    return this.taskRepository.saveTask(task);
  }

  async removeTask(id: string) {
    return this.taskRepository.removeTask(id);
  }

  async updateTask(task: Task) {
    return this.taskRepository.updateTask(task);
  }
}