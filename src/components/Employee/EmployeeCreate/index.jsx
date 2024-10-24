// // EmployeeCreate.js
// import React, { useState } from "react";
// import instance from "../../Service/index"; // Update the path if necessary

// const EmployeeCreate = ({ isOpen, onClose, fetchEmployees }) => {
//   const [employeeData, setEmployeeData] = useState({
//     full_name: "",
//     login: "",
//     role: "",
//     image: "",
//     // Add other necessary fields
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEmployeeData({ ...employeeData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await instance.post("/employees", employeeData);
//       fetchEmployees();
//       onClose();
//     } catch (error) {
//       console.error("Error creating employee:", error);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
//       <div className="bg-white p-6 rounded shadow-lg">
//         <h2 className="text-lg font-semibold">Add New Employee</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="full_name"
//             value={employeeData.full_name}
//             onChange={handleChange}
//             placeholder="Full Name"
//             required
//             className="block w-full border p-2 mb-4"
//           />
//           <input
//             type="text"
//             name="login"
//             value={employeeData.login}
//             onChange={handleChange}
//             placeholder="Login"
//             required
//             className="block w-full border p-2 mb-4"
//           />
//           <input
//             type="text"
//             name="role"
//             value={employeeData.role}
//             onChange={handleChange}
//             placeholder="Role"
//             required
//             className="block w-full border p-2 mb-4"
//           />
//           <input
//             type="text"
//             name="image"
//             value={employeeData.image}
//             onChange={handleChange}
//             placeholder="Image URL"
//             className="block w-full border p-2 mb-4"
//           />
//           {/* Add other fields as necessary */}
//           <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//             Add Employee
//           </button>
//           <button
//             type="button"
//             onClick={onClose}
//             className="ml-2 bg-gray-300 p-2 rounded">
//             Cancel
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EmployeeCreate;
