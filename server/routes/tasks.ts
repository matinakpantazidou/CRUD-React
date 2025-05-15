import { Router } from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController";

const router = Router();

/**
 * GET /api/tasks
 * Get all tasks
 * This is the only fully implemented endpoint for the technical interview
 */
router.get("/", getAllTasks);

/**
 * GET /api/tasks/:id
 * Get a specific task by ID
 * This route exists but the controller is not implemented (for candidates)
 */
router.get("/:id", getTaskById);

/**
 * POST /api/tasks
 * Create a new task
 * This route exists but the controller is not implemented (for candidates)
 */
router.post("/", createTask);

/**
 * PUT /api/tasks/:id
 * Update an existing task
 * This route exists but the controller is not implemented (for candidates)
 */
router.put("/:id", updateTask);

/**
 * DELETE /api/tasks/:id
 * Delete a task
 * This route exists but the controller is not implemented (for candidates)
 */
router.delete("/:id", deleteTask);

export { router as taskRoutes };
