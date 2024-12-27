import TaskList from "../components/TaskList";
import { useTask } from "../hooks/useTask";

const TaskView = () => {
  const { tasks, handleCreateTask, handleRemoveTask, handleUpdateTask } =
    useTask();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentForm = e.target as HTMLFormElement;

    const formData = new FormData(currentForm);

    handleCreateTask(
      {
        title: formData.get("taskTitle") as string,
        completed: false,
      },
      currentForm
    );
  };

  return (
    <section className="bg-black min-h-screen text-white flex flex-col justify-center items-center gap-10">
      <h1 className="text-4xl font-bold">TODO App</h1>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          name="taskTitle"
          className="p-4 text-xl rounded-md text-black"
          type="text"
          placeholder="give me a task..."
          required
        />
        <button className="bg-blue-500 font-bold text-xl p-2 px-6 rounded-md max-w-max mx-auto">
          Add Task
        </button>
      </form>

      <TaskList
        tasks={tasks}
        onRemoveTask={handleRemoveTask}
        onUpdateTask={handleUpdateTask}
      />
    </section>
  );
};
export default TaskView;
