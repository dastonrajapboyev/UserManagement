import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";
import instance from "../Service/index";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");
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

  const handleDelete = async (id) => {
    if (!id) {
      console.error("No ID provided for deletion.");
      return;
    }

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

  const handleEdit = (id) => {
    navigate(`/dashboard/employees/update/${id}`);
  };

  return (
    <div className="p-4 sm:p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      <div className="flex flex-wrap gap-y-4 items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Employees List</h2>
        <button
          onClick={() => navigate("/dashboard/employee-create")}
          className="flex items-center py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Employee
        </button>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
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
            {employees.length ? (
              employees.map((employee) => (
                <tr key={employee._id} className="hover:bg-gray-100">
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {employee.role}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {employee.email}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900 flex space-x-4">
                    <button
                      onClick={() => handleEdit(employee._id)}
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
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="px-4 py-4 text-center text-sm text-gray-500">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
