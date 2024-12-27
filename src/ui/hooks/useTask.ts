import { useEffect, useState } from "react";
import { BaseTask, Task } from "../../modules/task/domain/Task";
import { TaskService } from "../../modules/task/domain/TaskService";
import { LocalStorageTaskRepository } from "../../modules/task/infrastructure/LocalStorageTaskRepository";

// const apiTaskRepository = new ApiTaskRepository();
const localStorageTaskRepository = new LocalStorageTaskRepository();
const taskService = new TaskService(localStorageTaskRepository);

export const useTask = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleCreateTask = (task: BaseTask, currentForm: HTMLFormElement) => {
    taskService
    .saveTask(task)
    .then((task) => {
      setTasks([...tasks, task]);
      currentForm.reset();
    });
  }

  const handleRemoveTask = (id: string) => {
    taskService.removeTask(id).then(() => {
      setTasks(tasks.filter((task) => task.id !== id));
    });
  };

  const handleUpdateTask = (task: Task) => {
    const updatedTask = { ...task, completed: !task.completed };
    taskService.updateTask(updatedTask).then(() => {
      setTasks(tasks.map((t) => (t.id === task.id ? updatedTask : t)));
    });
  };

  useEffect(() => {
    taskService.getAllTask().then((tasks) => {
      setTasks(tasks);
    });
  }, []);

  return {
    handleCreateTask,
    tasks,
    handleRemoveTask,
    handleUpdateTask,
  }
}