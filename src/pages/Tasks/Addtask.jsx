import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../redux/slices/taskSlice";
import { useNavigate } from "react-router-dom";
import { Save, X, FileText, Calendar, Flag, ListChecks } from "lucide-react";

const AddTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.tasks);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
    dueDate: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      await dispatch(addTask(formData)).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-gray-900">
            Create New Task
          </h1>
          <p className="text-gray-600">
            Add a new task to your task management system
          </p>
        </div>

        {/* Form Card */}
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700"
                >
                  <FileText className="h-4 w-4" />
                  Task Title
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter task title"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.title
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 bg-white"
                  }`}
                />
                {errors.title && (
                  <p className="mt-1 flex items-center gap-1 text-sm text-red-600">
                    <span className="inline-block h-4 w-4">⚠</span>
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700"
                >
                  <ListChecks className="h-4 w-4" />
                  Description
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter task description"
                  rows="5"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${
                    errors.description
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 bg-white"
                  }`}
                />
                {errors.description && (
                  <p className="mt-1 flex items-center gap-1 text-sm text-red-600">
                    <span className="inline-block h-4 w-4">⚠</span>
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Status and Priority Row */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Status */}
                <div>
                  <label
                    htmlFor="status"
                    className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700"
                  >
                    <ListChecks className="h-4 w-4" />
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="in progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                {/* Priority */}
                <div>
                  <label
                    htmlFor="priority"
                    className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700"
                  >
                    <Flag className="h-4 w-4" />
                    Priority
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              {/* Due Date */}
              <div>
                <label
                  htmlFor="dueDate"
                  className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700"
                >
                  <Calendar className="h-4 w-4" />
                  Due Date
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.dueDate
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 bg-white"
                  }`}
                />
                {errors.dueDate && (
                  <p className="mt-1 flex items-center gap-1 text-sm text-red-600">
                    <span className="inline-block h-4 w-4">⚠</span>
                    {errors.dueDate}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4 border-t border-gray-200 pt-6 sm:flex-row">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex flex-1 transform items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5" />
                      Create Task
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={loading}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-gray-100 px-6 py-3 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <X className="h-5 w-5" />
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Helper Text */}
        <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">Tip:</span> Make sure to provide
            clear and descriptive information for better task management. Fields
            marked with <span className="text-red-500">*</span> are required.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddTask;