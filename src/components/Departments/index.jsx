import React, { useEffect, useState } from "react";
import instance from "../Service/index"; // Make sure this path is correct

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        console.log("Fetching departments...");
        const response = await instance.get("/departments");
        console.log("API Response:", response);

        // Check if response.data is an array
        if (Array.isArray(response.data)) {
          setDepartments(response.data);
          console.log("Departments Data:", response.data);
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

    fetchDepartments();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Departments</h1>
      {departments.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((department) => (
            <div
              key={department._id}
              className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
              <h3 className="flex px-1 font-semibold mb-2">
                department name: <strong> {department.name}</strong>
              </h3>
              <p className="text-gray-700 mb-1">
                <strong>Code:</strong> {department.code}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Structure:</strong> {department.structureType.name} (
                {department.structureType.code})
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Locality:</strong> {department.localityType.name} (
                {department.localityType.code})
              </p>
              <p className="text-gray-700">
                <strong>Parent:</strong>{" "}
                {department.parent ? department.parent : "None"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600">No departments found.</div>
      )}
    </div>
  );
};

export default Departments;
