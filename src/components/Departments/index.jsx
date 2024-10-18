// import instance from "../Service/index";
// import CreateDepartment from "../CreateDepartments";
// import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/solid";
// import { useEffect, useState } from "react";

// const Departments = () => {
//   const [departments, setDepartments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isCreating, setIsCreating] = useState(false);
//   const [selectedDepartment, setSelectedDepartment] = useState(null);

//   // const fetchDepartments = async () => {
//   //   try {
//   //     const token = localStorage.getItem("token");
//   //     const response = await instance.get("/departments", {
//   //       headers: {
//   //         Authorization: `Bearer ${token}`,
//   //       },
//   //     });
//   //     console.log(response.data);
//   //     if (Array.isArray(response.data)) {
//   //       setDepartments(response.data);
//   //     } else {
//   //       console.error("Unexpected response format", response.data);
//   //       setError("Unexpected response format");
//   //     }
//   //   } catch (err) {
//   //     console.error("Error fetching departments:", err);
//   //     setError(err.message);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const fetchDepartments = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await instance.get("/departments", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       // Log the entire response
//       console.log("Full response:", response);

//       // Check if response.data is an array
//       if (Array.isArray(response.data.data)) {
//         setDepartments(response.data.data);
//       } else {
//         console.error("Unexpected response format:", response.data.data);
//         setError("Unexpected response format");
//       }
//     } catch (err) {
//       console.error("Error fetching departments:", err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSave = () => {
//     fetchDepartments();
//     setIsCreating(false);
//   };

//   useEffect(() => {
//     fetchDepartments();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       await instance.delete(`/departments/delete/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setDepartments((prev) =>
//         prev.filter((department) => department._id !== id)
//       );
//     } catch (error) {
//       console.error("Error deleting department:", error);
//       setError("Error deleting department. Please try again.");
//     }
//   };

//   const handleEditClick = (department) => {
//     setSelectedDepartment(department);
//     setIsCreating(true);
//   };

//   const handleCreateNew = () => {
//     setSelectedDepartment(null);
//     setIsCreating(true);
//   };

//   if (loading) {
//     return <div className="text-center text-gray-500">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-red-500">Error: {error}</div>;
//   }

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       <div className="flex justify-between">
//         <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-4">
//           Departments
//         </h1>
//         <div className="flex justify-start mb-6">
//           {!isCreating && (
//             <button
//               onClick={handleCreateNew}
//               className="flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition duration-300 ease-in-out">
//               <PlusIcon className="h-5 w-5 mr-2" />
//             </button>
//           )}
//         </div>
//       </div>
//       {isCreating ? (
//         <CreateDepartment department={selectedDepartment} onSave={handleSave} />
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="border rounded-lg min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50 text-left">
//               <tr>
//                 <th className="px-4 py-2">Name</th>
//                 <th className="px-4 py-2">Code</th>
//                 <th className="px-4 py-2">Structure Type</th>
//                 <th className="px-4 py-2">Locality Type</th>
//                 <th className="px-4 py-2">Parent</th>
//                 <th className="px-4 py-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {departments.map((department) => (
//                 <tr key={department._id}>
//                   <td className="px-4 py-4">{department.name}</td>
//                   <td>{department.code}</td>
//                   <td>
//                     {department.structureType.name} (
//                     {department.structureType.code})
//                   </td>
//                   <td>
//                     {department.localityType.name} (
//                     {department.localityType.code})
//                   </td>
//                   <td>{department.parent || "None"}</td>
//                   <td>
//                     <button
//                       onClick={() => handleEditClick(department)}
//                       className="text-yellow-600 hover:text-yellow-900">
//                       <PencilIcon className="h-5 w-5" />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(department._id)}
//                       className="ml-4 text-red-600 hover:text-red-900">
//                       <TrashIcon className="h-5 w-5" />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Departments;

///  ---------------------------------------------

// import { Fragment, useState, useEffect } from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/solid";
// import instance from "../Service/index";
// import CreateDepartment from "../CreateDepartments";

// const Departments = () => {
//   const [departments, setDepartments] = useState([]);
//   const [departmentsHemis, setDepartmentsHemis] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedDepartment, setSelectedDepartment] = useState(null);

//   const fetchDepartments = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await instance.get("/departments", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (Array.isArray(response.data.data)) {
//         setDepartments(response.data.data);
//         setDepartmentsHemis(response.data.hemis); // Update hemis list (if it exists)
//         console.log(response.data.hemis);
//       } else {
//         console.error("Unexpected response format:", response.data.data);
//         setError("Unexpected response format");
//       }
//     } catch (err) {
//       console.error("Error fetching departments:", err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSave = () => {
//     fetchDepartments();
//     setIsModalOpen(false);
//   };

//   useEffect(() => {
//     fetchDepartments();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       await instance.delete(`/departments/delete/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setDepartments((prev) =>
//         prev.filter((department) => department._id !== id)
//       );
//     } catch (error) {
//       console.error("Error deleting department:", error);
//       setError("Error deleting department. Please try again.");
//     }
//   };

//   const handleEditClick = (department) => {
//     setSelectedDepartment(department);
//     setIsModalOpen(true);
//   };

//   const handleCreateNew = () => {
//     setSelectedDepartment(null);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   if (loading) {
//     return <div className="text-center text-gray-500">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-red-500">Error: {error}</div>;
//   }

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       <div className="flex justify-between">
//         <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-4">
//           Departments
//         </h1>
//         <div className="flex justify-start mb-6">
//           {!isModalOpen && (
//             <button
//               onClick={handleCreateNew}
//               className="flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition duration-300 ease-in-out">
//               <PlusIcon className="h-5 w-5 mr-2" />
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Dialog Modal */}
//       <Transition appear show={isModalOpen} as={Fragment}>
//         <Dialog as="div" className="relative z-10" onClose={closeModal}>
//           {/* Overlay */}
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0">
//             <div className="fixed inset-0 bg-black bg-opacity-25" />
//           </Transition.Child>

//           <div className="fixed inset-0 flex items-center justify-center mt-10">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 scale-95"
//               enterTo="opacity-100 scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 scale-100"
//               leaveTo="opacity-0 scale-95">
//               <Dialog.Panel className="w-full max-w-xs sm:max-w-md md:max-w-lg h-auto transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
//                 {/* CreateDepartment Component */}
//                 <CreateDepartment
//                   department={selectedDepartment}
//                   onSave={handleSave}
//                 />

//                 <button
//                   onClick={closeModal}
//                   className="mt-4 bg-gray-600 text-white py-2 px-4 rounded-md">
//                   Close
//                 </button>
//               </Dialog.Panel>
//             </Transition.Child>
//           </div>
//         </Dialog>
//       </Transition>

//       <div className="overflow-x-auto">
//         <table className="border rounded-lg min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50 text-left">
//             <tr>
//               <th className="px-4 py-2">Name</th>
//               <th className="px-4 py-2">Code</th>
//               <th className="px-4 py-2">Structure Type</th>
//               <th className="px-4 py-2">Locality Type</th>
//               <th className="px-4 py-2">Parent</th>
//               <th className="px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {departments.map((department) => (
//               <tr key={department._id}>
//                 <td className="px-4 py-4">{department.name}</td>
//                 <td>{department.code}</td>
//                 <td>
//                   {department.structureType.name} (
//                   {department.structureType.code})
//                 </td>
//                 <td>
//                   {department.localityType.name} ({department.localityType.code}
//                   )
//                 </td>
//                 <td>{department.parent || "None"}</td>
//                 <td>
//                   <button
//                     onClick={() => handleEditClick(department)}
//                     className="text-yellow-600 hover:text-yellow-900">
//                     <PencilIcon className="h-5 w-5" />
//                   </button>
//                   <button
//                     onClick={() => handleDelete(department._id)}
//                     className="ml-4 text-red-600 hover:text-red-900">
//                     <TrashIcon className="h-5 w-5" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Departments;

///++++++++++++++++++++++++++++++

// import React, { useState, useEffect } from "react";
// import { Dialog } from "@headlessui/react";
// import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";
// import instance from "../Service/index";

// const AlertMessage = ({ message, onClose }) => {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       onClose();
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, [onClose]);

//   return (
//     <div className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 p-4 bg-blue-500 text-white rounded shadow-lg z-50">
//       {message}
//     </div>
//   );
// };

// const Departments = () => {
//   const [departments, setDepartments] = useState([]);
//   const [departmentsHemis, setDepartmentsHemis] = useState([]);
//   const [departmentData, setDepartmentData] = useState({
//     name: "",
//     code: "",
//     structureType: "",
//     localityType: "",
//     parent: "",
//   });
//   const [editId, setEditId] = useState(null);
//   const [alertMessage, setAlertMessage] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchDepartmentsAndHemis = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await instance.get("/departments", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setDepartments(response.data.data); // Update departments list
//         setDepartmentsHemis(response.data.hemis || []); // Update hemis list
//       } catch (err) {
//         showAlert("Failed to fetch departments and hemis.");
//         console.error("Error fetching departments and hemis:", err);
//       }
//     };

//     fetchDepartmentsAndHemis();
//   }, []);

//   const showAlert = (message) => {
//     setAlertMessage(message);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setDepartmentData({ ...departmentData, [name]: value });
//   };
//   const handleStructureTypeChange = (e) => {
//     const { value } = e.target;
//     setDepartmentData((prevData) => ({
//       ...prevData,
//       structureType: { code: value }, // Assuming structureType is an object with a code property
//     }));
//   };

//   const isFormValid = () => {
//     return departmentData.name && departmentData.code; // Add more validation if needed
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");
//       let response;

//       if (editId) {
//         response = await instance.put(
//           `/departments/update/${editId}`,
//           departmentData,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setDepartments((prevDepartments) =>
//           prevDepartments.map((dept) =>
//             dept._id === editId ? { ...dept, ...departmentData } : dept
//           )
//         );
//         showAlert("Department successfully updated.");
//       } else {
//         response = await instance.post("/departments/create", departmentData, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setDepartments((prevDepartments) => [
//           ...prevDepartments,
//           response.data,
//         ]);
//         showAlert("Department successfully added.");
//       }

//       if (response.status >= 200 && response.status < 300) {
//         setDepartmentData({
//           name: "",
//           code: "",
//           structureType: "",
//           localityType: "",
//           parent: "",
//         });
//         setEditId(null);
//         setIsModalOpen(false);
//       } else {
//         showAlert("Error saving department.");
//       }
//     } catch (error) {
//       showAlert("Error saving department.");
//       console.error("Error:", error.response || error.message);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!id) return;

//     try {
//       const token = localStorage.getItem("token");
//       await instance.delete(`/departments/delete/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setDepartments(departments.filter((department) => department._id !== id));
//       showAlert("Department successfully deleted.");
//     } catch (err) {
//       showAlert("Failed to delete department.");
//       console.error("Error deleting department:", err);
//     }
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const renderDepartmentForm = () => (
//     <form onSubmit={handleSubmit}>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700">Name</label>
//         <input
//           type="text"
//           name="name"
//           value={departmentData.name}
//           onChange={handleInputChange}
//           className="mt-1 p-2 border border-gray-300 rounded w-full"
//           required
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700">Code</label>
//         <input
//           type="text"
//           name="code"
//           value={departmentData.code}
//           onChange={handleInputChange}
//           className="mt-1 p-2 border border-gray-300 rounded w-full"
//           required
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700">
//           Structure Type
//         </label>
//         <input
//           type="text"
//           name="structureType"
//           value={departmentData.structureType}
//           onChange={handleStructureTypeChange}
//           className="mt-1 p-2 border border-gray-300 rounded w-full"
//           required
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700">
//           Locality Type
//         </label>
//         <input
//           type="text"
//           name="localityType"
//           value={departmentData.localityType}
//           onChange={handleInputChange}
//           className="mt-1 p-2 border border-gray-300 rounded w-full"
//           required
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700">
//           Parent
//         </label>
//         <input
//           type="text"
//           name="parent"
//           value={departmentData.parent}
//           onChange={handleInputChange}
//           className="mt-1 p-2 border border-gray-300 rounded w-full"
//           required
//         />
//       </div>
//       <button
//         type="submit"
//         disabled={!isFormValid()}
//         className={`w-full py-2 px-4 text-white ${
//           isFormValid()
//             ? "bg-blue-500 hover:bg-blue-600"
//             : "bg-gray-300 cursor-not-allowed"
//         } rounded`}>
//         {editId ? "Update Department" : "Add Department"}
//       </button>
//     </form>
//   );

//   const renderHemisList = () => (
//     <div className="overflow-x-auto mt-4">
//       <table className="w-full divide-y divide-gray-200">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//               Mahalliylik turi
//             </th>
//             <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//               Bo'lim
//             </th>
//             <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//               Tuzilishi turi
//             </th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {departmentsHemis.map((hemi, id) => (
//             <tr key={id} className="hover:bg-gray-100">
//               <td className="px-4 py-4 text-sm text-gray-900">
//                 {hemi.localityType?.name}
//               </td>
//               <td className="px-4 py-4 text-sm text-gray-900">
//                 {hemi?.name || "N/A"}
//               </td>
//               <td className="px-4 py-4 text-sm text-gray-900">
//                 {hemi.structureType?.name || "N/A"}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );

//   const renderDepartmentList = () => (
//     <div className="overflow-x-auto mt-4">
//       <table className="w-full divide-y divide-gray-200">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//               Name
//             </th>
//             <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//               Code
//             </th>
//             <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {departments.map((department) => (
//             <tr key={department._id} className="hover:bg-gray-100">
//               <td className="px-4 py-4 text-sm text-gray-900">
//                 {department.name}
//               </td>
//               <td className="px-4 py-4 text-sm text-gray-900">
//                 {department.code}
//               </td>
//               <td className="px-4 py-4 text-sm text-gray-900 flex space-x-4">
//                 <button
//                   onClick={() => {
//                     setEditId(department._id);
//                     setDepartmentData({
//                       name: department.name,
//                       code: department.code,
//                       structureType: department.structureType,
//                       localityType: department.localityType,
//                       parent: department.parent,
//                     });
//                     setIsModalOpen(true);
//                   }}
//                   className="text-blue-500 hover:text-blue-700">
//                   <PencilIcon className="h-5 w-5" />
//                 </button>
//                 <button
//                   onClick={() => handleDelete(department._id)}
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
//       {renderHemisList()}
//       <br />
//       <hr />
//       <br />
//       <div className="flex flex-wrap gap-y-4 items-center justify-between mb-4">
//         <h2 className="text-2xl font-semibold">Department List</h2>
//         <button
//           onClick={() => {
//             setIsModalOpen(true);
//             setEditId(null);
//             setDepartmentData({
//               name: "",
//               code: "",
//               structureType: "",
//               localityType: "",
//               parent: "",
//             });
//           }}
//           className="flex items-center py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
//           <PlusIcon className="h-5 w-5 mr-2" />
//           Add Department
//         </button>
//       </div>
//       {alertMessage && (
//         <AlertMessage
//           message={alertMessage}
//           onClose={() => setAlertMessage("")}
//         />
//       )}
//       {renderDepartmentList()}
//       {/* Dialog for Adding/Editing Department */}
//       <Dialog open={isModalOpen} onClose={closeModal}>
//         <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />
//         <div className="fixed inset-0 flex justify-center p-4 xl:items-center lg:items-center md:items-center sm:mt-4 sm:items-start">
//           <Dialog.Panel className="mx-auto w-full mt-14 max-w-sm bg-white p-4 rounded overflow-y-auto max-h-[55vh] md:max-h-none">
//             <Dialog.Title className="text-lg font-medium text-gray-900">
//               {editId ? "Edit Department" : "Add Department"}
//             </Dialog.Title>
//             <div className="max-h-[70vh] overflow-y-auto">
//               {renderDepartmentForm()}
//             </div>
//             <button
//               onClick={closeModal} // Close the modal
//               className="mt-4 bg-gray-600 text-white py-2 px-4 rounded-md">
//               Close
//             </button>
//           </Dialog.Panel>
//         </div>
//       </Dialog>
//     </div>
//   );
// };

// export default Departments;import instance from "../Service/index";
import CreateDepartment from "../CreateDepartments"; // Ensure this is your form component
import { Dialog } from "@headlessui/react"; // Import Dialog from Headless UI
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import instance from "../Service/index";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [hemis, setHemis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal open/close state
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const fetchDepartmentsAndHemis = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await instance.get("/departments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (Array.isArray(response.data.data)) {
        setDepartments(response.data.data);
      } else {
        console.error(
          "Unexpected response format for departments",
          response.data
        );
        setError("Unexpected response format for departments");
      }

      if (Array.isArray(response.data.hemis)) {
        setHemis(response.data.hemis);
      } else {
        console.error("Unexpected response format for hemis", response.data);
        setError("Unexpected response format for hemis");
      }
    } catch (err) {
      console.error("Error fetching departments and hemis:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    fetchDepartmentsAndHemis();
    setIsModalOpen(false); // Close the modal after saving
  };

  useEffect(() => {
    fetchDepartmentsAndHemis();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await instance.delete(`/departments/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDepartments((prev) =>
        prev.filter((department) => department._id !== id)
      );
    } catch (error) {
      console.error("Error deleting department:", error);
      setError("Error deleting department. Please try again.");
    }
  };

  const handleEditClick = (department) => {
    setSelectedDepartment(department);
    setIsModalOpen(true);
  };

  const handleCreateNew = () => {
    setSelectedDepartment(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDepartment(null); // Reset the selected department
  };

  const renderHemisList = () => (
    <div className="overflow-x-auto mt-4">
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Mahalliylik turi
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Bo'lim
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Tuzilishi turi
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {hemis.map((hemi, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="px-4 py-4 text-sm text-gray-900">
                {hemi.localityType?.name}
              </td>
              <td className="px-4 py-4 text-sm text-gray-900">
                {hemi?.name || "N/A"}
              </td>
              <td className="px-4 py-4 text-sm text-gray-900">
                {hemi.structureType?.name || "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderDepartmentList = () => (
    <div className="overflow-x-auto mt-4">
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Code
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {departments.map((department) => (
            <tr key={department._id} className="hover:bg-gray-100">
              <td className="px-4 py-4 text-sm text-gray-900">
                {department.name}
              </td>
              <td className="px-4 py-4 text-sm text-gray-900">
                {department.code}
              </td>
              <td className="px-4 py-4 text-sm text-gray-900 flex space-x-4">
                <button
                  onClick={() => handleEditClick(department)}
                  className="text-blue-500 hover:text-blue-700">
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(department._id)}
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

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-4">
          Departments
        </h1>
        <div className="flex justify-start mb-6">
          <button
            onClick={handleCreateNew}
            className="flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition duration-300 ease-in-out">
            <PlusIcon className="h-5 w-5 mr-2" />
          </button>
        </div>
      </div>
      {renderHemisList()}
      {renderDepartmentList()}

      {/* Dialog for Adding/Editing Department */}
      <Dialog open={isModalOpen} onClose={closeModal}>
        <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />
        <div className="fixed inset-0 flex justify-center p-4 xl:items-center lg:items-center md:items-center sm:mt-4 sm:items-start">
          <Dialog.Panel className="mx-auto w-full mt-14 max-w-sm bg-white p-4 rounded overflow-y-auto max-h-[55vh] md:max-h-none">
            <Dialog.Title className="text-lg font-medium text-gray-900">
              {selectedDepartment ? "Edit Department" : "Add Department"}
            </Dialog.Title>
            <div className="max-h-[70vh] overflow-y-auto">
              <CreateDepartment
                department={selectedDepartment}
                onSave={handleSave}
              />
            </div>
            <button
              onClick={closeModal} // Close the modal
              className="mt-4 bg-gray-600 text-white py-2 px-4 rounded-md">
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default Departments;
