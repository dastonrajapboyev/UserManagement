// import React, { useState } from "react";
// import instance from "../Service/index"; // Axios instance
// import { useNavigate } from "react-router-dom";

// const EmployeeForm = () => {
//   const [employeeData, setEmployeeData] = useState({
//     full_name: "",
//     email: "",
//     password: "",
//   });
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate(); // Use navigate for routing

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEmployeeData({ ...employeeData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("refresh_token");
//       const response = await instance.post("/employees/create", employeeData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setMessage("Employee successfully added.");
//       console.log(response.data);

//       setEmployeeData({
//         full_name: "",
//         email: "",
//         password: "",
//       });
//       // Redirect back to EmployeeList after successful creation
//       navigate("/dashboard/employees");
//     } catch (error) {
//       setMessage("Error adding employee.");
//       console.error("Error:", error.response || error.message);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md">
//       <h2 className="text-2xl font-semibold mb-4">Add Employee</h2>
//       <button
//         onClick={() => navigate("/dashboard/employees")}
//         className="mb-4 py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600">
//         Back to Employees
//       </button>
//       {message && <p className="mb-4 text-sm text-green-600">{message}</p>}
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Full Name
//           </label>
//           <input
//             type="text"
//             name="full_name"
//             value={employeeData.full_name}
//             onChange={handleInputChange}
//             className="mt-1 p-2 border border-gray-300 rounded w-full"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Email
//           </label>
//           <input
//             type="email"
//             name="email"
//             value={employeeData.email}
//             onChange={handleInputChange}
//             className="mt-1 p-2 border border-gray-300 rounded w-full"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Password
//           </label>
//           <input
//             type="password"
//             name="password"
//             value={employeeData.password}
//             onChange={handleInputChange}
//             className="mt-1 p-2 border border-gray-300 rounded w-full"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full py-2 px-4 text-white bg-blue-500 rounded hover:bg-blue-600">
//           Add Employee
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EmployeeForm;

// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import instance from "../Service/index"; // Axios instance

// const EmployeeForm = () => {
//   const { id } = useParams(); // Get the ID from the URL
//   const [employeeData, setEmployeeData] = useState({
//     full_name: "",
//     email: "",
//     password: "",
//   });
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   // useEffect(() => {
//   //   if (id) {
//   //     // Fetch employee data if ID exists (for editing)
//   //     const fetchEmployee = async () => {
//   //       try {
//   //         const token = localStorage.getItem("refresh_token");
//   //         const response = await instance.get(`/employees/${id}`, {
//   //           headers: {
//   //             Authorization: `Bearer ${token}`,
//   //           },
//   //         });
//   //         setEmployeeData(response.data);
//   //       } catch (error) {
//   //         setMessage("Error fetching employee data.");
//   //         console.error("Error:", error.response || error.message);
//   //       }
//   //     };
//   //     fetchEmployee();
//   //   }
//   // }, [id]);

//   // const handleInputChange = (e) => {
//   //   const { name, value } = e.target;
//   //   setEmployeeData({ ...employeeData, [name]: value });
//   // };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     const token = localStorage.getItem("refresh_token");
//   //     if (id) {
//   //       // Update existing employee
//   //       await instance.put(`/employees/update/${id}`, employeeData, {
//   //         headers: {
//   //           Authorization: `Bearer ${token}`,
//   //         },
//   //       });
//   //       setMessage("Employee successfully updated.");
//   //     } else {
//   //       // Create new employee
//   //       await instance.post("/employees/create", employeeData, {
//   //         headers: {
//   //           Authorization: `Bearer ${token}`,
//   //         },
//   //       });
//   //       setMessage("Employee successfully added.");
//   //     }
//   //     setEmployeeData({
//   //       full_name: "",
//   //       email: "",
//   //       password: "",
//   //     });
//   //     navigate("/dashboard/employees");
//   //   } catch (error) {
//   //     setMessage("Error saving employee.");
//   //     console.error("Error:", error.response || error.message);
//   //   }
//   // };

//   useEffect(() => {
//     if (id) {
//       // Fetch employee data if ID exists (for editing)
//       const fetchEmployee = async () => {
//         try {
//           const token = localStorage.getItem("refresh_token");
//           const response = await instance.get(`/employees/${id}`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           setEmployeeData(response.data);
//         } catch (error) {
//           setMessage("Error fetching employee data.");
//           console.error("Error:", error.response || error.message);
//         }
//       };
//       fetchEmployee();
//     }
//   }, [id]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEmployeeData({ ...employeeData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("refresh_token");
//       if (id) {
//         // Update existing employee
//         const response = await instance.put(
//           `/employees/update/${id}`,
//           employeeData,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         if (response.status === 200) {
//           setMessage("Employee successfully updated.");
//           navigate("/dashboard/employees");
//         } else {
//           setMessage("Error updating employee.");
//           console.error("Error:", response.data.error || error.message);
//         }
//       } else {
//         // Create new employee
//         const response = await instance.post(
//           "/employees/create",
//           employeeData,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         if (response.status === 201) {
//           setMessage("Employee successfully added.");
//           navigate("/dashboard/employees");
//         } else {
//           setMessage("Error adding employee.");
//           console.error("Error:", response.data.error || error.message);
//         }
//       }
//       setEmployeeData({
//         full_name: "",
//         email: "",
//         password: "",
//       });
//     } catch (error) {
//       setMessage("Error saving employee.");
//       console.error("Error:", error.response || error.message);
//     }
//   };
//   return (
//     <div className="max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md">
//       <h2 className="text-2xl font-semibold mb-4">
//         {id ? "Edit Employee" : "Add Employee"}
//       </h2>
//       <button
//         onClick={() => navigate("/dashboard/employees")}
//         className="mb-4 py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600">
//         Back to Employees
//       </button>
//       {message && <p className="mb-4 text-sm text-green-600">{message}</p>}
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Full Name
//           </label>
//           <input
//             type="text"
//             name="full_name"
//             value={employeeData.full_name}
//             onChange={handleInputChange}
//             className="mt-1 p-2 border border-gray-300 rounded w-full"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Email
//           </label>
//           <input
//             type="email"
//             name="email"
//             value={employeeData.email}
//             onChange={handleInputChange}
//             className="mt-1 p-2 border border-gray-300 rounded w-full"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Password
//           </label>
//           <input
//             type="password"
//             name="password"
//             value={employeeData.password}
//             onChange={handleInputChange}
//             className="mt-1 p-2 border border-gray-300 rounded w-full"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full py-2 px-4 text-white bg-blue-500 rounded hover:bg-blue-600">
//           {id ? "Update Employee" : "Add Employee"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EmployeeForm;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../Service/index"; // Axios instance

const EmployeeForm = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [employeeData, setEmployeeData] = useState({
    full_name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Fetch employee data if ID exists (for editing)
      const fetchEmployee = async () => {
        try {
          const token = localStorage.getItem("refresh_token");
          const response = await instance.get(`/employees/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setEmployeeData(response.data);
        } catch (error) {
          setMessage("Error fetching employee data.");
          console.error("Error:", error.response || error.message);
        }
      };
      fetchEmployee();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("refresh_token");
      let response;
      if (id) {
        // Update existing employee
        response = await instance.put(`/employees/update/${id}`, employeeData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        // Create new employee
        response = await instance.post("/employees/create", employeeData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      if (response.status >= 200 && response.status < 300) {
        setMessage(
          id ? "Employee successfully updated." : "Employee successfully added."
        );
        setEmployeeData({
          full_name: "",
          email: "",
          password: "",
        });
        // Delay navigation to ensure the message is shown before navigating
        setTimeout(() => navigate("/dashboard/employees"), 500);
      } else {
        setMessage("Error saving employee.");
      }
    } catch (error) {
      setMessage("Error saving employee.");
      console.error("Error:", error.response || error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">
        {id ? "Edit Employee" : "Add Employee"}
      </h2>
      <button
        onClick={() => navigate("/dashboard/employees")}
        className="mb-4 py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600">
        Back to Employees
      </button>
      {message && <p className="mb-4 text-sm text-green-600">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            name="full_name"
            value={employeeData.full_name}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={employeeData.email}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={employeeData.password}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 text-white bg-blue-500 rounded hover:bg-blue-600">
          {id ? "Update Employee" : "Add Employee"}
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
