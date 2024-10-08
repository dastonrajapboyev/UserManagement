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
      const token = localStorage.getItem("token");
      const response = await instance.get("/departments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

  const handleSave = () => {
    fetchDepartments();
    setIsCreating(false);
  };

  useEffect(() => {
    fetchDepartments();
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
    setIsCreating(true);
  };

  const handleCreateNew = () => {
    setSelectedDepartment(null);
    setIsCreating(true);
  };

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
          {!isCreating && (
            <button
              onClick={handleCreateNew}
              className="flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition duration-300 ease-in-out">
              <PlusIcon className="h-5 w-5 mr-2" />
            </button>
          )}
        </div>
      </div>
      {isCreating ? (
        <CreateDepartment department={selectedDepartment} onSave={handleSave} />
      ) : (
        <div className="overflow-x-auto">
          <table className="border rounded-lg min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Code</th>
                <th className="px-4 py-2">Structure Type</th>
                <th className="px-4 py-2">Locality Type</th>
                <th className="px-4 py-2">Parent</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {departments.map((department) => (
                <tr key={department._id}>
                  <td className="px-4 py-4">{department.name}</td>
                  <td>{department.code}</td>
                  <td>
                    {department.structureType.name} (
                    {department.structureType.code})
                  </td>
                  <td>
                    {department.localityType.name} (
                    {department.localityType.code})
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
        </div>
      )}
    </div>
  );
};

export default Departments;
