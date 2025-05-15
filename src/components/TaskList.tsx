import { useEffect, useState } from "react";
import { getTasks } from "../api/tasks";
import { Task, CreateTaskPayload, UpdateTaskPayload } from "../types";
import TaskItem from "./TaskItem";
import TaskPanelHeader from "./TaskPanelHeader";
import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";
import TaskForm from "./TaskForm";
import ConfirmDialog from "./ConfirmDialog";

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UI state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const data = await getTasks();
        setTasks(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch tasks. Please try again later.");
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Handle create task action - to be implemented by the candidate
  const handleCreateTask = () => {
    setCurrentTask(undefined);
    setIsFormOpen(true);
  };

  // Handle submit task (create or update) - to be implemented by the candidate
  const handleSubmitTask = async (
    data: CreateTaskPayload | UpdateTaskPayload
  ) => {
    alert(
      `Task form submitted with data: ${JSON.stringify(
        data
      )}\n\nThis functionality should be implemented by the candidate`
    );
    setIsFormOpen(false);
  };

  // Handle delete task action - to be implemented by the candidate
  const handleDeleteTask = async (id: string) => {
    setTaskToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  // Handle confirm delete - to be implemented by the candidate
  const handleConfirmDelete = async () => {
    if (taskToDelete) {
      alert(
        `Delete confirmed for task ID: ${taskToDelete}\n\nThis functionality should be implemented by the candidate`
      );
      setIsDeleteDialogOpen(false);
      setTaskToDelete(null);
    }
  };

  // Handle update task action - to be implemented by the candidate
  const handleUpdateTask = async (task: Task) => {
    setCurrentTask(task);
    setIsFormOpen(true);
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-md">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <TaskPanelHeader onCreateTask={handleCreateTask} />

      {tasks.length === 0 ? (
        <EmptyState onCreateTask={handleCreateTask} />
      ) : (
        <div className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={handleDeleteTask}
              onUpdate={handleUpdateTask}
            />
          ))}
        </div>
      )}

      {/* Task form modal */}
      {isFormOpen && (
        <TaskForm
          initialData={currentTask}
          onSubmit={handleSubmitTask}
          onCancel={() => setIsFormOpen(false)}
        />
      )}

      {/* Confirm delete dialog */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        confirmText="Delete"
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleteDialogOpen(false)}
      />
    </div>
  );
}
