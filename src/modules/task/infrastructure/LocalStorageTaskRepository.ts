import { ItaskRepository } from "../domain/ITaskReposoty";
import { BaseTask, Task } from "../domain/Task";

export class LocalStorageTaskRepository implements ItaskRepository {
  async getAllTask() {
    const tasksString = localStorage.getItem("tasks");

    if(!tasksString){
      return [];
    }

    const tasks: Task[] = JSON.parse(tasksString);

    return tasks;
  }

  async saveTask(task: BaseTask) {
    const tasks = await this.getAllTask();

    const newTask = {
      ...task,
      id: crypto.randomUUID()
    }

    tasks.push(newTask);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    return newTask;
  }

  async removeTask(id: string) {
    const tasks = await this.getAllTask();

    const newTasks = tasks.filter(task => task.id !== id)

    localStorage.setItem("tasks", JSON.stringify(newTasks));
  }

  async updateTask(task: Task) {
    const tasks = await this.getAllTask();

    const newTasks = tasks.map(t => t.id === task.id ? task : t);

    localStorage.setItem("tasks", JSON.stringify(newTasks));

    return task;
  }
}