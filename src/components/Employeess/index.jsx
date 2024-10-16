// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import instance from "../Service/index";
// import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";

// const AlertMessage = ({ message, onClose }) => {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       onClose();
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, [onClose]);

//   return (
//     <div className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 p-4 bg-blue-500 text-white rounded shadow-lg z-50">
//       {message}
//     </div>
//   );
// };

// const EmployeeManagement = () => {
//   const [employees, setEmployees] = useState([]);
//   const [employeeData, setEmployeeData] = useState({
//     full_name: "",
//     role: "",
//     email: "",
//     password: "",
//   });
//   const [editId, setEditId] = useState(null);
//   const [alertMessage, setAlertMessage] = useState("");
//   const [isCreating, setIsCreating] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await instance.get("/employees", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setEmployees(response.data.data);
//         console.log(response.data.data, "res");
//       } catch (err) {
//         showAlert("Failed to fetch employees.");
//         console.error("Error fetching employees:", err);
//       }
//     };

//     fetchEmployees();
//   }, []);

//   const showAlert = (message) => {
//     setAlertMessage(message);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEmployeeData({ ...employeeData, [name]: value });
//   };

//   const isFormValid = () => {
//     return (
//       employeeData.full_name &&
//       employeeData.email &&
//       employeeData.role &&
//       (!editId ? employeeData.password : true)
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");
//       let response;

//       if (editId) {
//         response = await instance.put(
//           `/employees/update/${editId}`,
//           employeeData,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setEmployees((prevEmployees) =>
//           prevEmployees.map((emp) =>
//             emp._id === editId ? { ...emp, ...employeeData } : emp
//           )
//         );
//         showAlert("Employee successfully updated.");
//       } else {
//         response = await instance.post("/employees/create", employeeData, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setEmployees((prevEmployees) => [...prevEmployees, response.data]);
//         showAlert("Employee successfully added.");
//       }

//       if (response.status >= 200 && response.status < 300) {
//         setEmployeeData({ full_name: "", role: "", email: "", password: "" }); // Include role in the reset
//         setEditId(null);
//         setIsCreating(false);
//       } else {
//         showAlert("Error saving employee.");
//       }
//     } catch (error) {
//       showAlert("Error saving employee.");
//       console.error("Error:", error.response || error.message);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!id) return;

//     try {
//       const token = localStorage.getItem("token");
//       await instance.delete(`/employees/delete/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setEmployees(employees.filter((employee) => employee._id !== id));
//       showAlert("Employee successfully deleted.");
//     } catch (err) {
//       showAlert("Failed to delete employee.");
//       console.error("Error deleting employee:", err);
//     }
//   };

//   const renderEmployeeForm = () => (
//     <form onSubmit={handleSubmit}>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700">
//           Full Name
//         </label>
//         <input
//           type="text"
//           name="full_name"
//           value={employeeData.full_name}
//           onChange={handleInputChange}
//           className="mt-1 p-2 border border-gray-300 rounded w-full"
//           required
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700">Role</label>
//         <select
//           name="role"
//           value={employeeData.role}
//           onChange={handleInputChange}
//           className="mt-1 p-2 border border-gray-300 rounded w-full"
//           required>
//           <option value="">Select role</option>
//           <option value="user">User</option>
//           <option value="admin">Admin</option>
//         </select>
//       </div>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700">Email</label>
//         <input
//           type="email"
//           name="email"
//           value={employeeData.email}
//           onChange={handleInputChange}
//           className="mt-1 p-2 border border-gray-300 rounded w-full"
//           required
//         />
//       </div>
//       {!editId && (
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
//       )}
//       <button
//         type="submit"
//         disabled={!isFormValid()}
//         className={`w-full py-2 px-4 text-white ${
//           isFormValid()
//             ? "bg-blue-500 hover:bg-blue-600"
//             : "bg-gray-300 cursor-not-allowed"
//         } rounded`}>
//         {editId ? "Update Employee" : "Add Employee"}
//       </button>
//     </form>
//   );

//   const renderEmployeeList = () => (
//     <div className="overflow-x-auto mt-4">
//       <table className="w-full divide-y divide-gray-200">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//               Full Name
//             </th>
//             <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//               Role
//             </th>
//             <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//               Email
//             </th>
//             <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {employees.map((employee, id) => (
//             <tr key={id} className="hover:bg-gray-100">
//               <td className="px-4 py-4 text-sm text-gray-900">
//                 {employee.full_name}
//               </td>
//               <td className="px-4 py-4 text-sm text-gray-900">
//                 {employee.role}
//               </td>
//               <td className="px-4 py-4 text-sm text-gray-900">
//                 {employee.email}
//               </td>
//               <td className="px-4 py-4 text-sm text-gray-900 flex space-x-4">
//                 <button
//                   onClick={() => {
//                     setEditId(employee._id);
//                     setEmployeeData({
//                       full_name: employee.full_name,
//                       email: employee.email,
//                       password: "",
//                     });
//                     setIsCreating(true);
//                   }}
//                   className="text-blue-500 hover:text-blue-700">
//                   <PencilIcon className="h-5 w-5" />
//                 </button>
//                 <button
//                   onClick={() => handleDelete(employee._id)}
//                   className="text-red-500 hover:text-red-700">
//                   <TrashIcon className="h-5 w-5" />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );

//   return (
//     <div className="p-4 sm:p-6 bg-white border border-gray-200 rounded-lg shadow-md">
//       <div className="flex flex-wrap gap-y-4 items-center justify-between mb-4">
//         <h2 className="text-2xl font-semibold">
//           {isCreating
//             ? editId
//               ? "Edit Employee"
//               : "Add Employee"
//             : "Employee List"}
//         </h2>
//         <button
//           onClick={() => {
//             setIsCreating(!isCreating);
//             setEditId(null);
//             setEmployeeData({ full_name: "", email: "", password: "" });
//           }}
//           className="flex items-center py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
//           {!isCreating && <PlusIcon className="h-5 w-5 mr-2" />}
//           {isCreating ? "Back to List" : "Add Employee"}
//         </button>
//       </div>

//       {alertMessage && (
//         <AlertMessage
//           message={alertMessage}
//           onClose={() => setAlertMessage("")}
//         />
//       )}

//       {isCreating ? (
//         renderEmployeeForm()
//       ) : employees.length > 0 ? (
//         renderEmployeeList()
//       ) : (
//         <p className="text-gray-500 text-center">
//           No employees found. Click "Add Employee" to create one.
//         </p>
//       )}
//     </div>
//   );
// };

// export default EmployeeManagement;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../Service/index";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";
import { Dialog } from "@headlessui/react";

const AlertMessage = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 p-4 bg-blue-500 text-white rounded shadow-lg z-50">
      {message}
    </div>
  );
};

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [employeesHemis, setEmployeesHemis] = useState([]);
  const [employeeData, setEmployeeData] = useState({
    full_name: "",
    role: "",
    login: "",
    password: "",
  });
  const [editId, setEditId] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployeesAndHemis = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await instance.get("/employees", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Ensure `response.data` has both `data` and `hemis`
        setEmployees(response.data.data); // Update employees list
        setEmployeesHemis(response.data.hemis); // Update hemis list (if it exists)
        console.log(response.data.hemis);
      } catch (err) {
        showAlert("Failed to fetch employees and hemis.");
        console.error("Error fetching employees and hemis:", err);
      }
    };

    fetchEmployeesAndHemis();
  }, []);

  const showAlert = (message) => {
    setAlertMessage(message);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const isFormValid = () => {
    return (
      employeeData.full_name &&
      employeeData.login &&
      employeeData.role &&
      (!editId ? employeeData.password : true)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      let response;

      if (editId) {
        response = await instance.put(
          `/employees/update/${editId}`,
          employeeData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEmployees((prevEmployees) =>
          prevEmployees.map((emp) =>
            emp._id === editId ? { ...emp, ...employeeData } : emp
          )
        );
        showAlert("Employee successfully updated.");
      } else {
        response = await instance.post("/employees/create", employeeData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmployees((prevEmployees) => [...prevEmployees, response.data]);
        showAlert("Employee successfully added.");
      }
      console.log(response.data);

      if (response.status >= 200 && response.status < 300) {
        setEmployeeData({ full_name: "", role: "", login: "", password: "" });
        setEditId(null);
        setIsModalOpen(false);
      } else {
        showAlert("Error saving employee.");
      }
    } catch (error) {
      showAlert("Error saving employee.");
      console.error("Error:", error.response || error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;

    try {
      const token = localStorage.getItem("token");
      await instance.delete(`/employees/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmployees(employees.filter((employee) => employee._id !== id));
      showAlert("Employee successfully deleted.");
    } catch (err) {
      showAlert("Failed to delete employee.");
      console.error("Error deleting employee:", err);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const renderEmployeeForm = () => (
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
        <label className="block text-sm font-medium text-gray-700">Role</label>
        <select
          name="role"
          value={employeeData.role}
          onChange={handleInputChange}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
          required>
          <option value="">Select role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Login</label>
        <input
          type="login"
          name="login"
          value={employeeData.login}
          onChange={handleInputChange}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
          required
        />
      </div>
      {!editId && (
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
      )}
      <button
        type="submit"
        disabled={!isFormValid()}
        className={`w-full py-2 px-4 text-white ${
          isFormValid()
            ? "bg-blue-500 hover:bg-blue-600"
            : "bg-gray-300 cursor-not-allowed"
        } rounded`}>
        {editId ? "Update Employee" : "Add Employee"}
      </button>
    </form>
  );

  const renderEmployeeList = () => (
    <div className="overflow-x-auto mt-4">
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Full Name
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employees.map((employee, id) => (
            <tr key={id} className="hover:bg-gray-100">
              <td className="px-4 py-4 text-sm text-gray-900">
                {employee.full_name}
              </td>
              <td className="px-4 py-4 text-sm text-gray-900">
                {employee.role}
              </td>
              <td className="px-4 py-4 text-sm text-gray-900">
                {employee.login}
              </td>
              <td className="px-4 py-4 text-sm text-gray-900 flex space-x-4">
                <button
                  onClick={() => {
                    setEditId(employee._id);
                    setEmployeeData({
                      full_name: employee.full_name,
                      email: employee.login,
                      role: employee.role,
                      password: "",
                    });
                    setIsModalOpen(true);
                  }}
                  className="text-blue-500 hover:text-blue-700">
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(employee._id)}
                  className="text-red-500 hover:text-red-700">
                  <TrashIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  const renderEmployeeHemisList = () => (
    <div className="overflow-x-auto mt-4">
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Image
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Full Name
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Academic Degree
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Department
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Staff Position
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Employee Type
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Employee Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employeesHemis.map((hemi, id) => (
            <tr key={id} className="hover:bg-gray-100">
              {/* Displaying employee image */}
              <td className="px-4 py-4 text-sm text-gray-900">
                <img
                  src={hemi.image}
                  alt={hemi.full_name}
                  className="h-16 w-16 rounded-full object-cover"
                />
              </td>
              {/* Full Name */}
              <td className="px-4 py-4 text-sm text-gray-900">
                {hemi.full_name}
              </td>
              {/* Academic Degree */}
              <td className="px-4 py-4 text-sm text-gray-900">
                {hemi.academicDegree?.name || "N/A"}
              </td>
              {/* Department */}
              <td className="px-4 py-4 text-sm text-gray-900">
                {hemi.department?.name || "N/A"}
              </td>
              {/* Staff Position */}
              <td className="px-4 py-4 text-sm text-gray-900">
                {hemi.staffPosition?.name || "N/A"}
              </td>
              {/* Employee Type */}
              <td className="px-4 py-4 text-sm text-gray-900">
                {hemi.employeeType?.name || "N/A"}
              </td>
              {/* Employee Status */}
              <td className="px-4 py-4 text-sm text-gray-900">
                {hemi.employeeStatus?.name || "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      <div className="flex flex-wrap gap-y-4 items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Employee List</h2>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setEditId(null);
            setEmployeeData({
              full_name: "",
              login: "",
              password: "",
              role: "",
            });
          }}
          className="flex items-center py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Employee
        </button>
      </div>

      {alertMessage && (
        <AlertMessage
          message={alertMessage}
          onClose={() => setAlertMessage("")}
        />
      )}

      {renderEmployeeHemisList()}
      {renderEmployeeList()}

      {/* Dialog for Adding/Editing Employee */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />
        <div className="fixed inset-0 flex justify-center p-4 xl:items-center lg:items-center md:items-center  sm:mt-4 sm:items-start">
          <Dialog.Panel className="mx-auto w-full mt-14 max-w-sm bg-white p-4 rounded overflow-y-auto max-h-[55vh] md:max-h-none">
            <Dialog.Title className="text-lg font-medium text-gray-900">
              {editId ? "Edit Employee" : "Add Employee"}
            </Dialog.Title>
            <div className="max-h-[70vh] overflow-y-auto">
              {renderEmployeeForm()}
            </div>
            <button
              onClick={() => setIsModalOpen(false)} // Close the modal
              className="mt-4 bg-gray-600 text-white py-2 px-4 rounded-md">
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default EmployeeManagement;
