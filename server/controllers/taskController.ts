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
 * 1. Extract the id from req.params
 * 2. Query the database for a task with that ID
 * 3. Return the task if found, or a 404 if not
 */
export const getTaskById = async (req: Request, res: Response) => {
  return res.status(501).json({
    error: "Not implemented",
    message: "TB implemented",
  });
};

/**
 * Create a new task
 *
 * 1. Validate the request body
 * 2. Insert the new task into the database
 * 3. Return the created task
 */
export const createTask = async (req: Request, res: Response) => {
  try {
    const result = taskSchema.safeParse(req.body); // validate the incoming request body
    if (!result.success) {
      return res.status(400).json({ error: "Invalid input", issues: result.error.issues });
    } // If validation fails, it returns a 400 Bad Request

    const { data, error } = await supabase.from("tasks").insert([result.data]).select().single(); //It inserts the validated data into the tasks table using Supabase - .select().single() fetches and returns the inserted row (the newly created task)

    if (error) throw error;
    return res.status(201).json(data); //On success, it sends a 201 Created response with the newly created task
  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(500).json({ error: "Failed to create task" });
  }
};

/**
 * Update a task
 *
 * 1. Extract the id from req.params
 * 2. Validate the request body
 * 3. Update the task in the database
 * 4. Return the updated task
 */
export const updateTask = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = taskSchema.partial().safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: "Invalid input", issues: result.error.issues });
    }

    const { data, error } = await supabase
      .from("tasks")
      .update(result.data)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error updating task:", error);
    return res.status(500).json({ error: "Failed to update task" });
  }
};

/**
 * Delete a task
 *
 * 1. Extract the id from req.params
 * 2. Delete the task from the database
 * 3. Return a success message
 */
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const id = req.params.id; // Extract the task ID from the request parameters
    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) throw error;
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    return res.status(500).json({ error: "Failed to delete task" });
  }
};
