import axios from "axios";
import { ItaskRepository } from "../domain/ITaskReposoty";
import { BaseTask, Task } from "../domain/Task";

export class ApiTaskRepository implements ItaskRepository {
  async getAllTask() {
    const tasks = await axios.get<Task[]>("https://jsonplaceholder.typicode.com/todos")
    return tasks.data
  }

  async saveTask(task: BaseTask) {
    const newTask = await axios.post<Task>("https://jsonplaceholder.typicode.com/todos", task)
    return newTask.data
  }

  async removeTask(id: string) {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
  }

  async updateTask(task: Task) {
    const newTask = await axios.put<Task>(`https://jsonplaceholder.typicode.com/todos/${task.id}`, task)
    return newTask.data
  }
}