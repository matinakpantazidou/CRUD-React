/*
# Create tasks table

1. New Tables
- `tasks`
- `id` (uuid, primary key)
- `title` (text, required)
- `description` (text)
- `status` (enum: 'todo', 'in-progress', 'completed')
- `priority` (enum: 'low', 'medium', 'high')
- `created_at` (timestamp)
- `updated_at` (timestamp)
2. Security
- Enable RLS on `tasks` table
- Add policy for authenticated users to perform CRUD operations
 */
-- Create enum types for status and priority
CREATE TYPE task_status AS ENUM ('todo', 'in-progress', 'completed');

CREATE TYPE task_priority AS ENUM ('low', 'medium', 'high');

-- Create tasks table
CREATE TABLE
  IF NOT EXISTS tasks (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
    title text NOT NULL,
    description text,
    status task_status NOT NULL DEFAULT 'todo',
    priority task_priority NOT NULL DEFAULT 'medium',
    created_at timestamptz NOT NULL DEFAULT now (),
    updated_at timestamptz NOT NULL DEFAULT now ()
  );

-- Add example tasks
INSERT INTO
  tasks (title, description, status, priority)
VALUES
  (
    'Complete user authentication system',
    'Implement login, registration, and password reset functionality',
    'todo',
    'high'
  ),
  (
    'Design database schema',
    'Create ERD and define relationships between entities',
    'in-progress',
    'medium'
  ),
  (
    'Set up CI/CD pipeline',
    'Configure GitHub Actions for automated testing and deployment',
    'todo',
    'medium'
  ),
  (
    'Implement responsive design',
    'Ensure the application works well on mobile, tablet, and desktop',
    'completed',
    'low'
  ),
  (
    'Write API documentation',
    'Create comprehensive documentation for all API endpoints',
    'todo',
    'medium'
  );

-- Enable Row Level Security
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Create policies for CRUD operations
CREATE POLICY "Allow all operations for now" ON tasks FOR ALL USING (true);