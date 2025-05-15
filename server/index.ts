import express from "express";
import cors from "cors";
import { taskRoutes } from "./routes/tasks";

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/tasks", taskRoutes);

// Health check route
app.get("/health", (_, res) => {
  res.status(200).json({ status: "ok" });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`API available at http://localhost:${port}/api`);
  console.log("Press Ctrl+C to stop the server");
});
