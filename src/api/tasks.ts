import { API_URL } from "../config";
import { CreateTaskPayload, Task, UpdateTaskPayload } from "../types";

/**
 * Fetch all tasks from the API
 * This is the only implemented endpoint for the technical interview
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
 * TODO: This is for the candidate to implement
 */
export const createTask = async (
  task: CreateTaskPayload
): Promise<Task | null> => {
  // TODO: Implement this function
  // The endpoint is POST ${API_URL}/tasks
  // Remember to:
  // - Use the correct HTTP method
  // - Set the correct headers
  // - Handle errors properly
  // - Return the newly created task or null if there's an error

  throw new Error("Not implemented");
};

/**
 * Update an existing task
 *
 * TODO: This is for the candidate to implement
 */
export const updateTask = async (
  id: string,
  task: UpdateTaskPayload
): Promise<Task | null> => {
  // TODO: Implement this function
  // The endpoint is PUT ${API_URL}/tasks/:id
  // Remember to:
  // - Use the correct HTTP method
  // - Set the correct headers
  // - Handle errors properly
  // - Return the updated task or null if there's an error

  throw new Error("Not implemented");
};

/**
 * Delete a task
 *
 * TODO: This is for the candidate to implement
 */
export const deleteTask = async (id: string): Promise<boolean> => {
  // TODO: Implement this function
  // The endpoint is DELETE ${API_URL}/tasks/:id
  // Remember to:
  // - Use the correct HTTP method
  // - Handle errors properly
  // - Return true if deletion was successful, false otherwise

  throw new Error("Not implemented");
};
