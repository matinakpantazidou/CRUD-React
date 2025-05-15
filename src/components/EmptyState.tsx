import { ClipboardList, Plus } from "lucide-react";

interface EmptyStateProps {
  onCreateTask: () => void;
}

export default function EmptyState({ onCreateTask }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="rounded-full bg-blue-100 p-3 mb-4">
        <ClipboardList size={32} className="text-blue-600" />
      </div>

      <h3 className="text-lg font-medium text-gray-900 mb-1">No tasks yet</h3>
      <p className="text-gray-500 text-center max-w-md mb-6">
        Get started by creating your first task. Tasks help you track and
        organize your work efficiently.
      </p>

      <button
        onClick={onCreateTask}
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        <Plus size={20} className="mr-1" />
        <span>Create Your First Task</span>
      </button>
    </div>
  );
}
