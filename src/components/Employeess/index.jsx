import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../Service/index";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeData, setEmployeeData] = useState({
    full_name: "",
    email: "",
    password: "",
  });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("refresh_token");
        const response = await instance.get("/employees", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmployees(response.data);
      } catch (err) {
        setError("Failed to fetch employees.");
        console.error("Error fetching employees:", err);
      }
    };

    fetchEmployees();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("refresh_token");
      let response;

      if (editId) {
        // Update existing employee
        response = await instance.put(
          `/employees/update/${editId}`,
          employeeData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Update the employee in the list
        setEmployees((prevEmployees) =>
          prevEmployees.map((emp) =>
            emp._id === editId ? { ...emp, ...employeeData } : emp
          )
        );
      } else {
        // Create new employee
        response = await instance.post("/employees/create", employeeData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Add the new employee to the list
        setEmployees((prevEmployees) => [...prevEmployees, response.data]);
      }

      if (response.status >= 200 && response.status < 300) {
        setMessage(
          editId
            ? "Employee successfully updated."
            : "Employee successfully added."
        );
        setEmployeeData({ full_name: "", email: "", password: "" });
        setEditId(null);
        setIsCreating(false);

        // Navigate immediately after updating the state
        navigate("/dashboard/employees");
      } else {
        setError("Error saving employee.");
      }
    } catch (error) {
      setError("Error saving employee.");
      console.error("Error:", error.response || error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;

    try {
      const token = localStorage.getItem("refresh_token");
      await instance.delete(`/employees/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmployees(employees.filter((employee) => employee._id !== id));
    } catch (err) {
      setError("Failed to delete employee.");
      console.error("Error deleting employee:", err);
    }
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
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={employeeData.email}
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
        className="w-full py-2 px-4 text-white bg-blue-500 rounded hover:bg-blue-600">
        {editId ? "Update Employee" : "Add Employee"}
      </button>
    </form>
  );

  const renderEmployeeList = () => (
    <>
      {/* <h3 className="text-xl font-semibold mt-6">Employees Lista</h3> */}
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
                  {employee.email}
                </td>
                <td className="px-4 py-4 text-sm text-gray-900 flex space-x-4">
                  <button
                    onClick={() => {
                      setEditId(employee._id);
                      setEmployeeData({
                        full_name: employee.full_name,
                        email: employee.email,
                        password: "",
                      });
                      setIsCreating(true);
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
    </>
  );

  return (
    <div className="p-4 sm:p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      <div className="flex flex-wrap gap-y-4 items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">
          {isCreating
            ? editId
              ? "Edit Employee"
              : "Add Employee"
            : "Employee List"}
        </h2>
        <button
          onClick={() => {
            setIsCreating(!isCreating);
            setEditId(null);
            setEmployeeData({ full_name: "", email: "", password: "" });
          }}
          className="flex items-center py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
          <PlusIcon className="h-5 w-5 mr-2" />
          {isCreating ? "Back to List" : "Add Employee"}
        </button>
      </div>

      {message && <p className="mb-4 text-sm text-green-600">{message}</p>}
      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      {isCreating ? renderEmployeeForm() : renderEmployeeList()}
    </div>
  );
};

export default EmployeeManagement;
