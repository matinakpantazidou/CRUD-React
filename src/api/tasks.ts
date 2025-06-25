import { API_URL } from "../config";
import { CreateTaskPayload, Task, UpdateTaskPayload } from "../types";

/**
 * Fetch all tasks from the API
 */
export const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await fetch(`${API_URL}/tasks`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    return [];
  }
};

/**
 * Create a new task
 *
 */
export const createTask = async (
  task: CreateTaskPayload
): Promise<Task | null> => {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });

    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Failed to create task:", error);
    return null;
  }
};

/**
 * Update an existing task
 *
 */
export const updateTask = async (
  id: string,
  task: UpdateTaskPayload
): Promise<Task | null> => {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });

    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Failed to update task:", error);
    return null;
  }
};

/**
 * Delete a task
 *
 */
export const deleteTask = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return true;
  } catch (error) {
    console.error("Failed to delete task:", error);
    return false;
  }
};
