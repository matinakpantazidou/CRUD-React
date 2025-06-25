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
 */
router.get("/", getAllTasks);

/**
 * GET /api/tasks/:id
 * Get a specific task by ID
 */
router.get("/:id", getTaskById);

/**
 * POST /api/tasks
 * Create a new task
 */
router.post("/", createTask);

/**
 * PUT /api/tasks/:id
 * Update an existing task
 */
router.put("/:id", updateTask);

/**
 * DELETE /api/tasks/:id
 * Delete a task
 */
router.delete("/:id", deleteTask);

export { router as taskRoutes };
