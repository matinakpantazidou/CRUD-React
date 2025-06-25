import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../api/tasks";
import { Task, CreateTaskPayload, UpdateTaskPayload } from "../types";
import TaskItem from "./TaskItem";
import TaskPanelHeader from "./TaskPanelHeader";
import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";
import TaskForm from "./TaskForm";
import ConfirmDialog from "./ConfirmDialog";
import NoResults from "./NoResults";

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UI state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  // Search and sort state
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest");

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

  const handleCreateTask = () => {
    setCurrentTask(undefined);
    setIsFormOpen(true);
  };

  const handleSubmitTask = async (
    data: CreateTaskPayload | UpdateTaskPayload
  ) => {
    const isEdit = !!currentTask;
    const result = isEdit
      ? await updateTask(currentTask!.id, data as UpdateTaskPayload)
      : await createTask(data as CreateTaskPayload);

    if (result) {
      const updatedTasks = isEdit
        ? tasks.map((t) => (t.id === result.id ? result : t))
        : [result, ...tasks];

      setTasks(updatedTasks);
      setIsFormOpen(false);
    } else {
      alert("Failed to save task.");
    }
  };

  const handleDeleteTask = async (id: string) => {
    setTaskToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (taskToDelete) {
      const success = await deleteTask(taskToDelete);
      if (success) {
        setTasks((prev) => prev.filter((t) => t.id !== taskToDelete));
      } else {
        alert("Failed to delete task.");
      }

      setIsDeleteDialogOpen(false);
      setTaskToDelete(null);
    }
  };

  // const handleUpdateTask = async (task: Task) => {
  //   setCurrentTask(task);
  //   setIsFormOpen(true);
  // };

  const filteredTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortOption) {
        case "az":
          return a.title.localeCompare(b.title);
        case "za":
          return b.title.localeCompare(a.title);
        case "oldest":
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case "newest":
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

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

  function handleMarkCompleted(updatedTask: Task) {
    const newTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(newTasks); // or your equivalent state update
  }

  // const priorityCounts = 
  // {
  //   low: tasks.filter(task => task.priority === "low").length,
  //   medium: tasks.filter(task => task.priority === "medium").length,
  //   high: tasks.filter(task => task.priority === "high").length,

  // };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <TaskPanelHeader onCreateTask={handleCreateTask} />

      {/* <div>
        <span>Priority: </span>
        <span>High({priorityCounts.high})</span>
        <span>Medium({priorityCounts.medium})</span>
        <span>Low({priorityCounts.low})</span>
      </div> */}
  
      {/* Search and Sort */}
      <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        {/* Search input with X button */}
        <div className="relative w-full sm:w-1/2">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              aria-label="Clear search"
            >
              &times;
            </button>
          )}
        </div>
  
        {/* Sort dropdown */}
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="w-full sm:w-auto px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="az">A → Z</option>
          <option value="za">Z → A</option>
        </select>
      </div>
  
      {/* Filtered task list or empty state */}
      {tasks.length === 0 ? (
        <EmptyState onCreateTask={handleCreateTask} />
      ) : filteredTasks.length === 0 ? (
        <NoResults />
      ) : (
        <div className="divide-y divide-gray-200">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={handleDeleteTask}
              onUpdate={(updatedTask) => {
                if (updatedTask.status === "completed") {
                  handleMarkCompleted(updatedTask);
                } else {
                  // open edit form
                  setCurrentTask(task);
                  setIsFormOpen(true);
                }
              }}
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