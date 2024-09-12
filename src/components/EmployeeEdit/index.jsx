import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import instance from "../Service/index"; // Axios instance

const EmployeeEdit = () => {
  const { id } = useParams(); // Get employee ID from URL
  const [employeeData, setEmployeeData] = useState({
    email: "",
    full_name: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem("refresh_token");
        const response = await instance.get(`/employees/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmployeeData({
          email: response.data.email,
          full_name: response.data.full_name,
        });
      } catch (err) {
        setError("Failed to fetch employee.");
        console.error("Error fetching employee:", err);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("refresh_token");
      const response = await instance.put(
        `/employees/update/${id}`,
        employeeData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Employee updated:", response.data);
      navigate("/dashboard/employees");
    } catch (error) {
      console.error("Error updating employee:", error);
      setError("Failed to update employee.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Edit Employee</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
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
        <button
          type="submit"
          className="w-full py-2 px-4 text-white bg-blue-500 rounded hover:bg-blue-600">
          Update
        </button>
      </form>
    </div>
  );
};

export default EmployeeEdit;
