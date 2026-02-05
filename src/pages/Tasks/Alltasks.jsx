import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, deleteTask } from "../../redux/slices/taskSlice";
import { Plus, Trash2, Edit, Clock, CheckCircle2, Circle } from "lucide-react";
import { Link } from "react-router-dom";

const AllTasks = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask(id));
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "in progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 font-medium text-gray-600">Loading tasks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
        <div className="w-full max-w-md rounded-lg border border-red-200 bg-red-50 p-6">
          <h3 className="mb-2 text-lg font-semibold text-red-800">Error</h3>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="mb-2 text-4xl font-bold text-gray-900">
                All Tasks
              </h1>
              <p className="text-gray-600">
                Manage and organize your tasks efficiently
              </p>
            </div>
            <Link
              to="/add-task"
              className="inline-flex transform items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl"
            >
              <Plus className="h-5 w-5" />
              Add New Task
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border-l-4 border-blue-500 bg-white p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                <p className="mt-1 text-3xl font-bold text-gray-900">
                  {tasks?.length || 0}
                </p>
              </div>
              <Circle className="h-10 w-10 text-blue-500 opacity-20" />
            </div>
          </div>

          <div className="rounded-lg border-l-4 border-green-500 bg-white p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="mt-1 text-3xl font-bold text-gray-900">
                  {tasks?.filter((t) => t.status?.toLowerCase() === "completed")
                    .length || 0}
                </p>
              </div>
              <CheckCircle2 className="h-10 w-10 text-green-500 opacity-20" />
            </div>
          </div>

          <div className="rounded-lg border-l-4 border-yellow-500 bg-white p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="mt-1 text-3xl font-bold text-gray-900">
                  {tasks?.filter((t) => t.status?.toLowerCase() === "pending")
                    .length || 0}
                </p>
              </div>
              <Clock className="h-10 w-10 text-yellow-500 opacity-20" />
            </div>
          </div>

          <div className="rounded-lg border-l-4 border-purple-500 bg-white p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="mt-1 text-3xl font-bold text-gray-900">
                  {tasks?.filter(
                    (t) => t.status?.toLowerCase() === "in progress"
                  ).length || 0}
                </p>
              </div>
              <Clock className="h-10 w-10 text-purple-500 opacity-20" />
            </div>
          </div>
        </div>

        {/* Tasks Grid */}
        {tasks?.length === 0 ? (
          <div className="rounded-lg bg-white p-12 text-center shadow-md">
            <div className="mx-auto max-w-md">
              <Circle className="mx-auto mb-4 h-16 w-16 text-gray-300" />
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                No tasks yet
              </h3>
              <p className="mb-6 text-gray-600">
                Get started by creating your first task
              </p>
              <Link
                to="/add-task"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
              >
                <Plus className="h-5 w-5" />
                Create Task
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tasks?.map((task) => (
              <div
                key={task._id}
                className="transform overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="mb-4 flex items-start justify-between">
                    <h3 className="line-clamp-2 flex-1 text-xl font-bold text-gray-900">
                      {task.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="mb-4 line-clamp-3 text-sm text-gray-600">
                    {task.description}
                  </p>

                  {/* Badges */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                        task.status
                      )}`}
                    >
                      {task.status}
                    </span>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(
                        task.priority
                      )}`}
                    >
                      {task.priority} Priority
                    </span>
                  </div>

                  {/* Due Date */}
                  {task.dueDate && (
                    <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 border-t border-gray-100 pt-4">
                    <Link
                      to={`/edit-task/${task._id}`}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-50 px-4 py-2 font-medium text-blue-700 transition-colors hover:bg-blue-100"
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-2 font-medium text-red-700 transition-colors hover:bg-red-100"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTasks;