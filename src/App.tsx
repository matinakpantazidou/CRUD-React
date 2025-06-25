import TaskList from "./components/TaskList";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            CRUD App
          </h1>
          <p className="text-gray-600 mt-2">
            Welcome to the task management app technical challenge. The app
            already has the "Get All Tasks" functionality implemented. Your goal
            is to implement the remaining CRUD operations.
          </p>
        </div>

        <TaskList />
      </div>
    </div>
  );
}

export default App;
