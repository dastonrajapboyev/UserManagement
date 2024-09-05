// import React, { useEffect, useState } from "react";
// import instance from "../Service/index";

// const Departments = () => {
//   const [departments, setDepartments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isCreating, setIsCreating] = useState(false);
//   const [isNewDepartment, setIsNewDepartment] = useState(true);
//   const [selectedDepartment, setSelectedDepartment] = useState({
//     name: "",
//     code: "",
//     structureType: { code: "", name: "" },
//     localityType: { code: "", name: "" },
//     parent: null,
//   });

//   useEffect(() => {
//     const fetchDepartments = async () => {
//       try {
//         const response = await instance.get("/departments");
//         if (Array.isArray(response.data)) {
//           setDepartments(response.data);
//         } else {
//           console.error("Unexpected response format", response.data);
//           setError("Unexpected response format");
//         }
//       } catch (err) {
//         console.error("Error fetching departments:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDepartments();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name.includes("structureType.") || name.includes("localityType.")) {
//       const [parentKey, childKey] = name.split(".");
//       setSelectedDepartment((prev) => ({
//         ...prev,
//         [parentKey]: {
//           ...prev[parentKey],
//           [childKey]: value,
//         },
//       }));
//     } else {
//       setSelectedDepartment((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleCreate = async () => {
//     try {
//       const response = await instance.post(
//         "/departments/create",
//         selectedDepartment
//       );
//       console.log("Department Created:", response.data);
//       setDepartments((prev) => [...prev, response.data]);
//       setSelectedDepartment({
//         name: "",
//         code: "",
//         structureType: { code: "", name: "" },
//         localityType: { code: "", name: "" },
//         parent: null,
//       });
//       setIsCreating(false);
//     } catch (error) {
//       console.error("Error creating department:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await instance.delete(`/departments/delete/${id}`);
//       setDepartments((prev) =>
//         prev.filter((department) => department._id !== id)
//       );
//     } catch (error) {
//       console.error("Error deleting department:", error);
//     }
//   };

//   const handleUpdate = async () => {
//     try {
//       const response = await instance.put(
//         `/departments/update/${selectedDepartment._id}`,
//         selectedDepartment
//       );
//       console.log("Department Updated:", response.data);
//       setDepartments((prev) =>
//         prev.map((department) =>
//           department._id === selectedDepartment._id ? response.data : department
//         )
//       );
//       setSelectedDepartment({
//         name: "",
//         code: "",
//         structureType: { code: "", name: "" },
//         localityType: { code: "", name: "" },
//         parent: null,
//       });
//       setIsCreating(false);
//     } catch (error) {
//       console.error("Error updating department:", error);
//     }
//   };

//   const handleEditClick = (department) => {
//     setIsCreating(true);
//     setIsNewDepartment(false);
//     setSelectedDepartment(department);
//   };

//   if (loading) {
//     return <div className="text-center text-gray-500">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-red-500">Error: {error}</div>;
//   }

//   return (
//     <div className="max-w-7xl mx-auto ">
//       <h1 className="text-4xl font-extrabold text-gray-900 text-center">
//         Departments
//       </h1>
//       <button
//         onClick={() => setIsCreating(!isCreating)}
//         className="mb-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition duration-300 ease-in-out">
//         {isCreating ? "Cancel" : "Create New Department"}
//       </button>
//       <div className="flex">
//         {isCreating && (
//           <div className="w-96 p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
//             <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">
//               {isNewDepartment ? "Create Department" : "Edit Department"}
//             </h2>
//             <div className="space-y-4">
//               {[
//                 "name",
//                 "code",
//                 "structureType.name",
//                 "structureType.code",
//                 "localityType.name",
//                 "localityType.code",
//                 "parent",
//               ].map((field, index) => (
//                 <input
//                   key={index}
//                   type="text"
//                   name={field}
//                   placeholder={field
//                     .replace(/([A-Z])/g, " $1")
//                     .replace(/^./, (str) => str.toUpperCase())}
//                   value={
//                     selectedDepartment[field.split(".")[0]]?.[
//                       field.split(".")[1]
//                     ] ||
//                     selectedDepartment[field] ||
//                     ""
//                   }
//                   onChange={handleChange}
//                   className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               ))}
//               <button
//                 onClick={isNewDepartment ? handleCreate : handleUpdate}
//                 className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
//                 {isNewDepartment ? "Create Department" : "Update Department"}
//               </button>
//             </div>
//           </div>
//         )}
//         {departments.length > 0 ? (
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//             {departments.map((department) => (
//               <div
//                 key={department._id}
//                 className="w-96 relative bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
//                 <div className=" bg-gradient-to-tr from-teal-500 to-teal-300 text-white text-center py-4">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     fill="currentColor"
//                     className="w-12 h-12 mx-auto">
//                     <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v2h-2zm0 4h2v6h-2zm-4-6h2v2H7zm0 4h2v6H7zm12-4h2v2h-2zm0 4h2v6h-2z" />
//                   </svg>
//                 </div>
//                 <div className="p-4">
//                   <h4 className="text-xl font-semibold text-gray-800 mb-2">
//                     {department.name}
//                   </h4>
//                   <p className="text-gray-600">
//                     <strong className="text-gray-800">Code:</strong>{" "}
//                     {department.code}
//                   </p>
//                   <p className="text-gray-600">
//                     <strong className="text-gray-800">Structure:</strong>{" "}
//                     {department.structureType.name} (
//                     {department.structureType.code})
//                   </p>
//                   <p className="text-gray-600">
//                     <strong className="text-gray-800">Locality:</strong>{" "}
//                     {department.localityType.name} (
//                     {department.localityType.code})
//                   </p>
//                   <p className="text-gray-600">
//                     <strong className="text-gray-800">Parent:</strong>{" "}
//                     {department.parent ? department.parent : "None"}
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => handleDelete(department._id)}
//                   className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     fill="currentColor"
//                     className="w-5 h-5">
//                     <path d="M6 19c0 1.104.896 2 2 2h8c1.104 0 2-.896 2-2V7H6v12zm4-8h2v6h-2v-6zm0-4h2v2h-2V7zM4 5h16V4H4v1zm2-3v1H2v1h2v1h16V4h2V3H6z" />
//                   </svg>
//                 </button>
//                 <button
//                   onClick={() => handleEditClick(department)}
//                   className="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 absolute top-2 right-16">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     fill="currentColor"
//                     className="w-5 h-5">
//                     <path d="M3 17.25V21h3.75l8.23-8.23-3.75-3.75L3 17.25zM20.71 7.29a1.003 1.003 0 000-1.41l-3.59-3.59a1.003 1.003 0 00-1.41 0l-2.83 2.83 3.75 3.75 2.83-2.83z" />
//                   </svg>
//                 </button>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center text-gray-500">No departments found.</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Departments;import React, { useEffect, useState } from "react";
import instance from "../Service/index";
import CreateDepartment from "../CreateDepartments";
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const fetchDepartments = async () => {
    try {
      const response = await instance.get("/departments");
      if (Array.isArray(response.data)) {
        setDepartments(response.data);
      } else {
        console.error("Unexpected response format", response.data);
        setError("Unexpected response format");
      }
    } catch (err) {
      console.error("Error fetching departments:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleDelete = async (id) => {
    try {
      await instance.delete(`/departments/delete/${id}`);
      setDepartments((prev) =>
        prev.filter((department) => department._id !== id)
      );
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };

  const handleEditClick = (department) => {
    setSelectedDepartment(department);
    setIsCreating(true);
  };

  const handleCreateNew = () => {
    setSelectedDepartment(null);
    setIsCreating(true);
  };

  const handleSave = () => {
    fetchDepartments(); // Fetch departments after save
    setIsCreating(false); // Close the creation form
  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-4">
        Departments
      </h1>
      <div className="flex justify-start">
        <button
          onClick={handleCreateNew}
          className="mb-6 flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition duration-300 ease-in-out">
          <PlusIcon className="h-5 w-5 mr-2" />
          Create New Department
        </button>
      </div>
      {isCreating ? (
        <CreateDepartment department={selectedDepartment} onSave={handleSave} />
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table Headers */}
          <thead className="bg-gray-50">{/* ... (Your headers here) */}</thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {departments.map((department) => (
              <tr key={department._id}>
                {/* Table Rows */}
                <td>{department.name}</td>
                <td>{department.code}</td>
                <td>
                  {department.structureType.name} (
                  {department.structureType.code})
                </td>
                <td>
                  {department.localityType.name} ({department.localityType.code}
                  )
                </td>
                <td>{department.parent || "None"}</td>
                <td>
                  <button
                    onClick={() => handleEditClick(department)}
                    className="text-yellow-600 hover:text-yellow-900">
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(department._id)}
                    className="ml-4 text-red-600 hover:text-red-900">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Departments;
