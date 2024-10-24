// import React, { useEffect, useState } from "react";
// import { Dialog } from "@headlessui/react";
// import instance from "../../Service/index";

// const EmployeeCRUD = ({
//   onClose,
//   isOpen,
//   employeeData,
//   setEmployeeData,
//   editId,
//   setEditId,
//   showAlert,
//   refreshEmployees,
// }) => {
//   const [loading, setLoading] = useState(false); // New loading state

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEmployeeData({ ...employeeData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true); // Start loading
//     try {
//       const token = localStorage.getItem("token");
//       const formData = {
//         full_name: employeeData.full_name,
//         role: employeeData.role,
//         login: employeeData.login,
//       };

//       if (!editId && !employeeData.password) {
//         showAlert("Password is required!");
//         setLoading(false); // Stop loading
//         return;
//       }

//       if (!editId) formData.password = employeeData.password;

//       let response;
//       if (editId) {
//         // Update employee
//         response = await instance.put(`/employees/update/${editId}`, formData, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//       } else {
//         // Create new employee
//         response = await instance.post("/employees/create", formData, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//       }

//       console.log("Response:", response); // Log the response to inspect its structure

//       // Check if the response indicates success
//       if (
//         response.status === 200 ||
//         response.status === 204 ||
//         response.data?.success
//       ) {
//         showAlert(editId ? "Employee updated." : "Employee created.");
//         refreshEmployees();
//         onClose(); // Close modal on success
//       } else {
//         showAlert("Failed to save employee. Please try again.");
//       }
//     } catch (error) {
//       showAlert("Error occurred. Please check the input.");
//       console.error("Error:", error);
//     } finally {
//       setLoading(false); // Stop loading
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await instance.delete(`/employees/delete/${editId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.status >= 200 && response.status < 300) {
//         showAlert("Employee successfully deleted.");
//         refreshEmployees();
//         onClose();
//       } else {
//         showAlert("Error deleting employee.");
//       }
//     } catch (error) {
//       showAlert("Error deleting employee.");
//       console.error("Error:", error.response || error.message);
//     }
//   };

//   useEffect(() => {
//     if (editId) {
//       const fetchEmployeeData = async () => {
//         try {
//           const token = localStorage.getItem("token");
//           const response = await instance.get(`/employees/${editId}`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });

//           // Only update `employeeData` if the data is received successfully
//           setEmployeeData({
//             full_name: response.data.full_name || "",
//             role: response.data.role || "",
//             login: response.data.login || "",
//             password: response.data.password || "", // Always keep the password empty on edit
//           });
//         } catch (error) {
//           showAlert("Error fetching employee data.");
//           console.error("Error:", error.response || error.message);
//         }
//       };

//       // fetchEmployeeData();
//     } else {
//       // Only reset `employeeData` when adding a new employee
//       setEmployeeData({
//         full_name: "",
//         role: "",
//         login: "",
//         password: "",
//       });
//     }
//   }, [editId, setEmployeeData]);

//   const handleClose = () => {
//     onClose();
//     // Reset the form only when closing the modal after editing or adding
//     setEmployeeData({
//       full_name: "",
//       role: "",
//       login: "",
//       password: "",
//     });
//   };

//   return (
//     <Dialog open={isOpen} onClose={handleClose}>
//       <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />
//       <div className="fixed inset-0 flex justify-center p-4">
//         <Dialog.Panel className="mx-auto w-full mt-14 max-w-sm bg-white p-4 rounded">
//           <Dialog.Title className="text-lg font-medium text-gray-900">
//             {editId ? "Edit Employee" : "Add Employee"}
//           </Dialog.Title>

//           {loading ? (
//             <div className="text-center text-gray-500">Loading...</div>
//           ) : (
//             <form onSubmit={handleSubmit}>
//               <div className="mt-2">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   name="full_name"
//                   value={employeeData.full_name}
//                   onChange={handleInputChange}
//                   required
//                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
//                 />
//               </div>

//               <div className="mt-2">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Role
//                 </label>
//                 <select
//                   name="role"
//                   value={employeeData.role}
//                   onChange={handleInputChange}
//                   required
//                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500">
//                   <option value="" disabled>
//                     Select Role
//                   </option>
//                   <option value="admin">Admin</option>
//                   <option value="user">User</option>
//                 </select>
//               </div>

//               <div className="mt-2">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Login
//                 </label>
//                 <input
//                   type="text"
//                   name="login"
//                   value={employeeData.login}
//                   onChange={handleInputChange}
//                   required
//                   className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
//                 />
//               </div>

//               {!editId && (
//                 <div className="mt-2">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     name="password"
//                     value={employeeData.password}
//                     onChange={handleInputChange}
//                     required
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
//                   />
//                 </div>
//               )}

//               <button
//                 type="submit"
//                 className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
//                 {editId ? "Update Employee" : "Add Employee"}
//               </button>
//             </form>
//           )}

//           {editId && !loading && (
//             <button
//               onClick={handleDelete}
//               className="mt-4 bg-red-500 text-white py-2 px-4 rounded">
//               Delete Employee
//             </button>
//           )}
//           <button
//             onClick={onClose}
//             className="mt-4 bg-gray-600 text-white py-2 px-4 rounded-md">
//             Close
//           </button>
//         </Dialog.Panel>
//       </div>
//     </Dialog>
//   );
// };

// export default EmployeeCRUD;

import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import instance from "../../Service/index";

const EmployeeCRUD = ({
  onClose,
  isOpen,
  employeeData,
  setEmployeeData,
  editId,
  setEditId,
  showAlert,
  refreshEmployees,
}) => {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null); // State for the selected image file
  const [imagePreview, setImagePreview] = useState(null); // State for the image preview

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the preview URL
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("full_name", employeeData.full_name);
      formData.append("role", employeeData.role);
      formData.append("login", employeeData.login);

      // Include image file if it exists
      let imageUrl = null;
      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append("image", imageFile);

        // Upload the image
        const imageResponse = await instance.post("/image", imageFormData, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (imageResponse.data?.success) {
          imageUrl = imageResponse.data.url; // Get the image URL from response
        } else {
          showAlert("Failed to upload image.");
          setLoading(false);
          return;
        }
      }

      if (!editId && !employeeData.password) {
        showAlert("Password is required!");
        setLoading(false);
        return;
      }

      if (!editId) formData.append("password", employeeData.password);
      if (imageUrl) formData.append("image", imageUrl); // Add the image URL to employee data

      let response;
      if (editId) {
        // Update employee
        response = await instance.put(`/employees/update/${editId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // Create new employee
        response = await instance.post("/employees/create", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      console.log("Response:", response);

      if (
        response.status === 200 ||
        response.status === 204 ||
        response.data?.success
      ) {
        showAlert(editId ? "Employee updated." : "Employee created.");
        refreshEmployees();
        onClose(); // Close modal on success
      } else {
        showAlert("Failed to save employee. Please try again.");
      }
    } catch (error) {
      showAlert("Error occurred. Please check the input.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await instance.delete(`/employees/delete/${editId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status >= 200 && response.status < 300) {
        showAlert("Employee successfully deleted.");
        refreshEmployees();
        onClose();
      } else {
        showAlert("Error deleting employee.");
      }
    } catch (error) {
      showAlert("Error deleting employee.");
      console.error("Error:", error.response || error.message);
    }
  };

  useEffect(() => {
    if (editId) {
      const fetchEmployeeData = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await instance.get(`/employees/${editId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setEmployeeData({
            full_name: response.data.full_name,
            role: response.data.role || "",
            login: response.data.login || "",
            password: response.data.password || "",
          });
        } catch (error) {
          showAlert("Error fetching employee data.");
          console.error("Error:", error.response || error.message);
        }
      };

      // fetchEmployeeData();
    } else {
      setEmployeeData({
        full_name: "",
        role: "",
        login: "",
        password: "",
      });
      setImageFile(null); // Reset image file state
      setImagePreview(null); // Reset image preview state
    }
  }, [editId, setEmployeeData]);

  const handleClose = () => {
    onClose();
    setEmployeeData({
      full_name: "",
      role: "",
      login: "",
      password: "",
    });
    setImageFile(null); // Reset image file state
    setImagePreview(null); // Reset image preview state
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />
      <div className="fixed inset-0 flex justify-center p-4">
        <Dialog.Panel className="mx-auto w-full mt-14 max-w-sm bg-white p-4 rounded">
          <Dialog.Title className="text-lg font-medium text-gray-900">
            {editId ? "Edit Employee" : "Add Employee"}
          </Dialog.Title>

          {loading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={employeeData.full_name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                />
              </div>

              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  name="role"
                  value={employeeData.role}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500">
                  <option value="" disabled>
                    Select Role
                  </option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700">
                  Login
                </label>
                <input
                  type="text"
                  name="login"
                  value={employeeData.login}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                />
              </div>

              {!editId && (
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={employeeData.password}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                  />
                </div>
              )}

              {/* Image upload section */}
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700">
                  Profile Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Image Preview"
                    className="mt-2 w-full h-32 object-cover rounded-md"
                  />
                )}
              </div>

              <button
                type="submit"
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                {editId ? "Update Employee" : "Add Employee"}
              </button>
            </form>
          )}

          {editId && !loading && (
            <button
              onClick={handleDelete}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded">
              Delete Employee
            </button>
          )}
          <button
            onClick={onClose}
            className="mt-4 bg-gray-600 text-white py-2 px-4 rounded-md">
            Close
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EmployeeCRUD;
