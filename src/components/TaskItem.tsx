import { Check, Pencil, Trash2, Undo2 as UndoIcon } from "lucide-react";
import { Task } from "../types";
import { PRIORITY_COLORS, STATUS_COLORS } from "../config";

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
  onUpdate: (task: Task) => void;
}

export default function TaskItem({ task, onDelete, onUpdate }: TaskItemProps) {
  const { id, title, description, status, priority, created_at } = task;

  // Format date to be more readable
  const formattedDate = new Date(created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="p-4 hover:bg-gray-50 transition-colors group">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3
            className={`text-lg font-medium text-gray-900 truncate ${
              status === "completed" ? "line-through text-gray-400" : ""
            }`}
          >
            {title}
          </h3>

          <div className="mt-1 flex items-center space-x-2">
            <span
              className={`px-2 py-0.5 text-xs font-medium rounded-full ${STATUS_COLORS[status]}`}
            >
              {status === "in-progress"
                ? "In Progress"
                : status.charAt(0).toUpperCase() + status.slice(1)}
            </span>

            <span
              className={`px-2 py-0.5 text-xs font-medium rounded-full ${PRIORITY_COLORS[priority]}`}
            >
              {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
            </span>

            <span className="text-xs text-gray-500">
              Created: {formattedDate}
            </span>
          </div>

          <p
            className={`mt-2 text-sm line-clamp-2 ${
              status === "completed" ? "text-gray-400 line-through" : "text-gray-600"
            }`}
          >
            {description}
          </p>
        </div>

        <div className="flex items-center ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
        {status !== "completed" ? (
          // used react fragment as a wrapper to avoid unnecessary div so no additional elements are created in the DOM
          <>
            <button
              onClick={() => onUpdate({ ...task, status: "completed" })}
              className="p-1 text-green-600 hover:bg-green-100 rounded-full mr-1"
              aria-label="Mark as completed"
            >
              <Check size={18} />
            </button>

            <button
              onClick={() => onUpdate(task)}
              className="p-1 text-blue-600 hover:bg-blue-100 rounded-full mr-1"
              aria-label="Edit task"
            >
              <Pencil size={18} />
            </button>

            <button
              onClick={() => onDelete(id)}
              className="p-1 text-red-600 hover:bg-red-100 rounded-full"
              aria-label="Delete task"
            >
              <Trash2 size={18} />
            </button>
          </>
        ) : (
          <button
            onClick={() => onUpdate({ ...task, status: "in-progress" })}
            className="p-1 text-yellow-600 hover:bg-yellow-100 rounded-full"
            aria-label="Restore from completed"
          >
            <UndoIcon size={18} />
          </button>
        )}
        </div>
      </div>
    </div>
  );
}
