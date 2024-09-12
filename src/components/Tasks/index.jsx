// import React, { useState, useEffect } from "react";
// import { io } from "socket.io-client";
// import instance from "../Service/index";

// const baseURL = "http://94.131.122.152:3002";
// let socket;

// const Tasks = () => {
//   const [taskData, setTaskData] = useState({
//     description: "",
//     due_date: "",
//     priority: "high",
//     status: "new",
//     assigner_id: "",
//     assignee_id: "",
//   });

//   const [employees, setEmployees] = useState([]);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     // Initialize socket only if not already initialized
//     if (!socket) {
//       socket = io.connect(baseURL);

//       socket.on("connect", () => {
//         console.log("Connected to socket server");
//       });

//       socket.on("task-assigned", (notification) => {
//         alert(`New Task Assigned: ${notification.message}`);
//       });
//     }

//     fetchEmployees();

//     // Cleanup function to disconnect socket and remove event listeners
//     return () => {
//       if (socket) {
//         socket.off("task-assigned"); // Remove specific event listener
//         socket.disconnect(); // Disconnect the socket
//         socket = null; // Reset the socket reference
//       }
//     };
//   }, []); // Empty dependency array ensures this effect only runs once

//   const fetchEmployees = async () => {
//     try {
//       const token = localStorage.getItem("refresh_token");

//       if (!token) {
//         setMessage("Please log in to view employees.");
//         return;
//       }

//       const response = await instance.get("/employees", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setEmployees(response.data);
//       console.log("Fetched employees:", response.data);
//     } catch (error) {
//       console.error("Error fetching employees:", error);
//       setMessage("Error fetching employees. Please try again.");
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setTaskData({ ...taskData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("refresh_token");

//       if (!token) {
//         setMessage("Please log in to create a task.");
//         return;
//       }

//       const response = await instance.post("/tasks/create", taskData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setMessage("Task successfully created.");
//       socket.emit("task-created", response.data);
//       setTaskData({
//         description: "",
//         due_date: "",
//         priority: "high",
//         status: "new",
//         assigner_id: "",
//         assignee_id: "",
//       });
//     } catch (error) {
//       setMessage("Error occurred while creating the task.");
//       console.error("Error:", error.response || error.message);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md">
//       <h2 className="text-2xl font-semibold mb-4">Create Task</h2>
//       {message && <p className="mb-4 text-sm text-green-600">{message}</p>}
//       <form onSubmit={handleSubmit}>
//         {/* Description */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Description
//           </label>
//           <textarea
//             name="description"
//             value={taskData.description}
//             onChange={handleInputChange}
//             className="mt-1 p-2 border border-gray-300 rounded w-full"
//             required
//           />
//         </div>

//         {/* Due Date */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Due Date
//           </label>
//           <input
//             type="datetime-local"
//             name="due_date"
//             value={taskData.due_date}
//             onChange={handleInputChange}
//             className="mt-1 p-2 border border-gray-300 rounded w-full"
//             required
//           />
//         </div>

//         {/* Priority */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Priority
//           </label>
//           <select
//             name="priority"
//             value={taskData.priority}
//             onChange={handleInputChange}
//             className="mt-1 p-2 border border-gray-300 rounded w-full">
//             <option value="high">High</option>
//             <option value="medium">Medium</option>
//             <option value="low">Low</option>
//           </select>
//         </div>

//         {/* Status */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Status
//           </label>
//           <select
//             name="status"
//             value={taskData.status}
//             onChange={handleInputChange}
//             className="mt-1 p-2 border border-gray-300 rounded w-full">
//             <option value="new">New</option>
//             <option value="in_progress">In Progress</option>
//             <option value="completed">Completed</option>
//           </select>
//         </div>

//         {/* Assigner */}
//         <div className="mb-4">
//           <label
//             htmlFor="assigner_id"
//             className="block text-sm font-medium text-gray-700">
//             Assigner
//           </label>
//           <select
//             id="assigner_id"
//             name="assigner_id"
//             value={taskData.assigner_id}
//             onChange={handleInputChange}
//             className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             required>
//             <option value="">Select Assigner</option>
//             {employees.map((employee) => (
//               <option key={employee._id} value={employee._id}>
//                 {employee.email} - {employee.role}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Assignee */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Assignee
//           </label>
//           <select
//             name="assignee_id"
//             value={taskData.assignee_id}
//             onChange={handleInputChange}
//             className="mt-1 p-2 border border-gray-300 rounded w-full"
//             required>
//             <option value="">Select Assignee</option>
//             {employees.map((employee) => (
//               <option key={employee._id} value={employee._id}>
//                 {employee.email} - {employee.role}
//               </option>
//             ))}
//           </select>
//         </div>

//         <button
//           type="submit"
//           className="w-full py-2 px-4 text-white bg-blue-500 rounded hover:bg-blue-600">
//           Create Task
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Tasks;

import React, { useState, useEffect } from "react";
import instance from "../Service/index";

const Tasks = () => {
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

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("refresh_token");

      if (!token) {
        setMessage("Please log in to view employees.");
        return;
      }

      const response = await instance.get("/employees", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setMessage("Error fetching employees. Please try again.");
    }
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setTaskData({ ...taskData, [name]: value });
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskData,
      [name]: name === "due_date" ? new Date(value).toISOString() : value, // Format due_date correctly
    });
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setTaskData({
  //     ...taskData,
  //     [name]: name === "due_date" ? value.replace("T", " ") + ":00Z" : value, // Adjust format if needed
  //   });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const token = localStorage.getItem("refresh_token");

  //     if (!token) {
  //       setMessage("Please log in to create a task.");
  //       return;
  //     }

  //     const taskPayload = {
  //       description: taskData.description,
  //       due_date: new Date(taskData.due_date).toISOString(),
  //       priority: taskData.priority,
  //       status: taskData.status,
  //       assigner_id: taskData.assigner_id,
  //       assignee_id: taskData.assignee_id,
  //     };

  //     const response = await instance.post("/tasks/create", taskPayload, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     setMessage("Task successfully created.");
  //     setTaskData({
  //       description: "",
  //       due_date: "",
  //       priority: "high",
  //       status: "new",
  //       assigner_id: "",
  //       assignee_id: "",
  //     });
  //   } catch (error) {
  //     const errorMessage =
  //       error.response?.data?.errors?.[0]?.msg ||
  //       "Error occurred while creating the task.";
  //     setMessage(errorMessage);
  //     console.error("Error:", error.response || error.message);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("refresh_token");

      if (!token) {
        setMessage("Please log in to create a task.");
        return;
      }

      // Ensure due_date is formatted in ISO 8601 format
      const taskPayload = {
        description: taskData.description,
        due_date: new Date(taskData.due_date).toISOString(), // Convert to ISO 8601
        priority: taskData.priority,
        status: taskData.status,
        assigner_id: taskData.assigner_id,
        assignee_id: taskData.assignee_id,
      };

      const response = await instance.post("/tasks/create", taskPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Task successfully created.");
      setTaskData({
        description: "",
        due_date: "",
        priority: "high",
        status: "new",
        assigner_id: "",
        assignee_id: "",
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.errors?.[0]?.msg ||
        "Error occurred while creating the task.";
      setMessage(errorMessage);
      console.error("Error:", error.response || error.message);
    }
  };
  return (
    <div className="max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create Task</h2>
      {message && <p className="mb-4 text-sm text-red-600">{message}</p>}
      <form onSubmit={handleSubmit}>
        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={taskData.description}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>

        {/* Due Date */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Due Date
          </label>
          {/* <input
            type="datetime-local"
            name="due_date"
            value={taskData.due_date}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          /> */}

          <input
            type="datetime-local"
            name="due_date"
            value={
              taskData.due_date
                ? new Date(taskData.due_date).toISOString().slice(0, 16)
                : ""
            } // Format to match input value
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>

        {/* Priority */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Priority
          </label>
          <select
            name="priority"
            value={taskData.priority}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full">
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Status */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            name="status"
            value={taskData.status}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full">
            <option value="new">New</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Assigner */}
        <div className="mb-4">
          <label
            htmlFor="assigner_id"
            className="block text-sm font-medium text-gray-700">
            Assigner
          </label>
          <select
            id="assigner_id"
            name="assigner_id"
            value={taskData.assigner_id}
            onChange={handleInputChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required>
            <option value="">Select Assigner</option>
            {employees.map((employee) => (
              <option key={employee._id} value={employee._id}>
                {employee.email} - {employee.role}
              </option>
            ))}
          </select>
        </div>

        {/* Assignee */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Assignee
          </label>
          <select
            name="assignee_id"
            value={taskData.assignee_id}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required>
            <option value="">Select Assignee</option>
            {employees.map((employee) => (
              <option key={employee._id} value={employee._id}>
                {employee.email} - {employee.role}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 text-white bg-blue-500 rounded hover:bg-blue-600">
          Create Task
        </button>
      </form>
    </div>
  );
};

export default Tasks;
