import React, { useState, useEffect } from "react";
import instance from "../Service/index";
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/solid";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [taskData, setTaskData] = useState({
    description: "",
    due_date: "",
    priority: "high",
    status: "new",
    assigner_id: "",
    assignee_id: "",
  });
  const [employees, setEmployees] = useState([]);
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchTasks();
    fetchEmployees();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("refresh_token");
      const response = await instance.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("refresh_token");
      const response = await instance.get("/employees", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  const handleEditClick = (task) => {
    // Convert ISO string to "YYYY-MM-DD" format for editing
    const formattedDueDate = new Date(task.due_date)
      .toISOString()
      .split("T")[0];

    setTaskData({ ...task, due_date: formattedDueDate });
    setCurrentTaskId(task._id);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDeleteClick = async (taskId) => {
    try {
      const token = localStorage.getItem("refresh_token");
      await instance.delete(`/tasks/delete/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
      setMessage("Task deleted successfully.");
    } catch (error) {
      console.error("Error deleting task:", error);
      setMessage("Error deleting task.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("refresh_token");
      const taskPayload = {
        ...taskData,
        due_date: taskData.due_date,
      };

      if (isEditing) {
        await instance.put(`/tasks/update/${currentTaskId}`, taskPayload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessage("Task updated successfully.");
      } else {
        await instance.post("/tasks/create", taskPayload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessage("Task created successfully.");
      }

      setTaskData({
        description: "",
        due_date: "",
        priority: "high",
        status: "new",
        assigner_id: "",
        assignee_id: "",
      });
      setIsEditing(false);
      setShowForm(false);
      fetchTasks();
    } catch (error) {
      console.error("Error:", error.response || error.message);
      setMessage("Error occurred while creating or updating the task.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      {showForm && (
        <>
          <h2 className="text-2xl font-semibold mb-4">
            {isEditing ? "Edit Task" : "Create Task"}
          </h2>
          {message && <p className="mb-4 text-sm text-red-600">{message}</p>}
          <form onSubmit={handleSubmit}>
            {/* Form Fields */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <input
                type="text"
                name="description"
                value={taskData.description}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Due Date
              </label>
              <input
                type="date"
                name="due_date"
                value={taskData.due_date}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Priority
              </label>
              <select
                name="priority"
                value={taskData.priority}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="status"
                value={taskData.status}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required>
                <option value="new">New</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Assigner
              </label>
              <select
                name="assigner_id"
                value={taskData.assigner_id}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required>
                <option value="">Select Assigner</option>
                {employees.map((employee) => (
                  <option key={employee._id} value={employee._id}>
                    {employee.email}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Assignee
              </label>
              <select
                name="assignee_id"
                value={taskData.assignee_id}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required>
                <option value="">Select Assignee</option>
                {employees.map((employee) => (
                  <option key={employee._id} value={employee._id}>
                    {employee.email}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600">
              {isEditing ? "Update Task" : "Create Task"}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setShowForm(false);
                setTaskData({
                  description: "",
                  due_date: "",
                  priority: "high",
                  status: "new",
                  assigner_id: "",
                  assignee_id: "",
                });
              }}
              className="w-full py-2 px-4 mt-2 text-white bg-gray-500 rounded hover:bg-gray-600">
              Back to Tasks
            </button>
          </form>
        </>
      )}

      {!showForm && (
        <>
          <button
            onClick={() => {
              setShowForm(true);
              setIsEditing(false);
              setTaskData({
                description: "",
                due_date: "",
                priority: "high",
                status: "new",
                assigner_id: "",
                assignee_id: "",
              });
            }}
            className="mb-4 py-2 px-4 text-white bg-blue-500 rounded hover:bg-blue-600 flex items-center">
            <PlusIcon className="w-5 h-5 mr-2" /> Create Task
          </button>

          {/* Tasks List */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Tasks List</h3>
            <ul className="space-y-4">
              {tasks.map((task) => (
                <li
                  key={task._id}
                  className="flex items-center justify-between p-4 bg-gray-100 border rounded-lg">
                  <div>
                    <h4 className="font-bold">{task.description}</h4>
                    <p className="text-sm">
                      Due Date: {new Date(task.due_date).toLocaleDateString()}
                    </p>
                    <p className="text-sm">Priority: {task.priority}</p>
                    <p className="text-sm">
                      Assigner:{" "}
                      {
                        employees.find((emp) => emp._id === task.assigner_id)
                          ?.email
                      }
                    </p>
                    <p className="text-sm">
                      Assignee:{" "}
                      {
                        employees.find((emp) => emp._id === task.assignee_id)
                          ?.email
                      }
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditClick(task)}
                      className="p-1 text-white bg-green-500 rounded hover:bg-green-600">
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(task._id)}
                      className="p-1 text-white bg-red-500 rounded hover:bg-red-600">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Tasks;