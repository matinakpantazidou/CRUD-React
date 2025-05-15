// API base URL - switch between local development and production
export const API_URL = import.meta.env.PROD
  ? "/api"
  : "http://localhost:3000/api";

// Number of items to show per page
export const PAGE_SIZE = 10;

// Task status options
export const TASK_STATUSES = [
  { value: "todo", label: "To Do" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

// Task priority options
export const TASK_PRIORITIES = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

// Task priority colors
export const PRIORITY_COLORS = {
  low: "bg-blue-100 text-blue-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800",
};

// Task status colors
export const STATUS_COLORS = {
  todo: "bg-slate-100 text-slate-800",
  "in-progress": "bg-purple-100 text-purple-800",
  completed: "bg-green-100 text-green-800",
};
