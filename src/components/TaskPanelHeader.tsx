import { Plus } from "lucide-react";

interface TaskPanelHeaderProps {
  onCreateTask: () => void;
}

export default function TaskPanelHeader({
  onCreateTask,
}: TaskPanelHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Task Manager</h1>
          <p className="text-blue-100 mt-1">Manage your tasks efficiently</p>
        </div>

        <button
          onClick={onCreateTask}
          className="flex items-center px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
        >
          <Plus size={20} className="mr-1" />
          <span>New Task</span>
        </button>
      </div>
    </div>
  );
}
