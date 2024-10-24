import React, { useEffect, useState, useRef } from "react";
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
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setImageFile(file);
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImagePreview(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const MAX_IMAGE_SIZE = 3 * 1024 * 1024; // 3 MB
      if (file.size > MAX_IMAGE_SIZE) {
        showAlert(
          "Error: Image size exceeds the limit of 1 MB. Please choose a smaller image."
        );
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const formData = {
        full_name: employeeData.full_name,
        role: employeeData.role,
        login: employeeData.login,
        password: editId ? undefined : employeeData.password, // Don't send password if editing
        image: imagePreview || null, // Use the preview as the image URL, or null if not set
      };

      let response;
      if (editId) {
        response = await instance.put(`/employees/update/${editId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        response = await instance.post("/employees/create", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      if (
        response.status === 200 ||
        response.status === 204 ||
        response.data?.success
      ) {
        showAlert(editId ? "Employee updated." : "Employee created.");
        refreshEmployees();
        onClose();
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

  useEffect(() => {
    if (editId) {
      // Fetch employee data logic goes here
    } else {
      setEmployeeData({
        full_name: "",
        role: "",
        login: "",
        password: "",
      });
      setImageFile(null);
      setImagePreview(null);
    }
  }, [editId, setEmployeeData]);

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

  return (
    <Dialog open={isOpen} onClose={onClose}>
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

              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700">
                  Image
                </label>
                <div
                  className="cursor-pointer border border-gray-300 rounded-md p-2"
                  onClick={handleImageClick}>
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Image Preview"
                      className="w-full h-32 object-cover"
                    />
                  ) : (
                    <p className="text-gray-500">Click to upload an image</p>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  style={{ display: "none" }}
                />
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
