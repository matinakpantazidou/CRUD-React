import { Request, Response } from "express";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

// Validation schemas
const taskSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  description: z.string().max(500),
  status: z.enum(["todo", "in-progress", "completed"]),
  priority: z.enum(["low", "medium", "high"]),
});

/**
 * Get all tasks
 * This is the only controller that's fully implemented for the technical interview
 */
export const getAllTasks = async (_: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({
      error: "Failed to fetch tasks",
      details: error,
    });
  }
};

/**
 * Get a task by ID
 *
 * TODO: This is for the candidate to implement
 * They should:
 * 1. Extract the id from req.params
 * 2. Query the database for a task with that ID
 * 3. Return the task if found, or a 404 if not
 */
export const getTaskById = async (req: Request, res: Response) => {
  // This is intentionally not implemented for the interview
  return res.status(501).json({
    error: "Not implemented",
    message: "This endpoint should be implemented by the candidate",
  });
};

/**
 * Create a new task
 *
 * TODO: This is for the candidate to implement
 * They should:
 * 1. Validate the request body
 * 2. Insert the new task into the database
 * 3. Return the created task
 */
export const createTask = async (req: Request, res: Response) => {
  // This is intentionally not implemented for the interview
  return res.status(501).json({
    error: "Not implemented",
    message: "This endpoint should be implemented by the candidate",
  });
};

/**
 * Update a task
 *
 * TODO: This is for the candidate to implement
 * They should:
 * 1. Extract the id from req.params
 * 2. Validate the request body
 * 3. Update the task in the database
 * 4. Return the updated task
 */
export const updateTask = async (req: Request, res: Response) => {
  // This is intentionally not implemented for the interview
  return res.status(501).json({
    error: "Not implemented",
    message: "This endpoint should be implemented by the candidate",
  });
};

/**
 * Delete a task
 *
 * TODO: This is for the candidate to implement
 * They should:
 * 1. Extract the id from req.params
 * 2. Delete the task from the database
 * 3. Return a success message
 */
export const deleteTask = async (req: Request, res: Response) => {
  // This is intentionally not implemented for the interview
  return res.status(501).json({
    error: "Not implemented",
    message: "This endpoint should be implemented by the candidate",
  });
};
