import React, { useState, useEffect } from "react";
import instance from "../Service/index";
import { useNavigate } from "react-router-dom";

const CreateDepartment = ({ department, onSave }) => {
  const navigate = useNavigate();
  const [newDepartment, setNewDepartment] = useState({
    name: "",
    code: "",
    structureType: { code: "", name: "" },
    localityType: { code: "", name: "" },
    parent: null,
  });

  useEffect(() => {
    if (department) {
      setNewDepartment(department);
    }
  }, [department]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("structureType.") || name.includes("localityType.")) {
      const [parentKey, childKey] = name.split(".");
      setNewDepartment((prev) => ({
        ...prev,
        [parentKey]: {
          ...prev[parentKey],
          [childKey]: value,
        },
      }));
    } else {
      setNewDepartment((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem("refresh_token");

    try {
      if (department) {
        await instance.put(
          `/departments/update/${department._id}`,
          newDepartment,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await instance.post("/departments/create", newDepartment, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      if (onSave) {
        onSave();
      }

      navigate("/dashboard/departments");
    } catch (error) {
      console.error("Error saving department:", error);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center mb-4">
        {department ? "Edit Department" : "Create Department"}
      </h2>

      <button
        onClick={() => navigate("/dashboard/departments")}
        className="mb-4 text-indigo-600 hover:underline">
        ← Back to Departments
      </button>

      <div className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Department Name"
          value={newDepartment.name}
          onChange={handleChange}
          className="block w-full px-3 py-2 border rounded-md text-sm shadow-sm placeholder-gray-500 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="text"
          name="code"
          placeholder="Department Code"
          value={newDepartment.code}
          onChange={handleChange}
          className="block w-full px-3 py-2 border rounded-md text-sm shadow-sm placeholder-gray-500 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="text"
          name="structureType.name"
          placeholder="Structure Type Name"
          value={newDepartment.structureType.name}
          onChange={handleChange}
          className="block w-full px-3 py-2 border rounded-md text-sm shadow-sm placeholder-gray-500 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="text"
          name="structureType.code"
          placeholder="Structure Type Code"
          value={newDepartment.structureType.code}
          onChange={handleChange}
          className="block w-full px-3 py-2 border rounded-md text-sm shadow-sm placeholder-gray-500 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="text"
          name="localityType.name"
          placeholder="Locality Type Name"
          value={newDepartment.localityType.name}
          onChange={handleChange}
          className="block w-full px-3 py-2 border rounded-md text-sm shadow-sm placeholder-gray-500 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="text"
          name="localityType.code"
          placeholder="Locality Type Code"
          value={newDepartment.localityType.code}
          onChange={handleChange}
          className="block w-full px-3 py-2 border rounded-md text-sm shadow-sm placeholder-gray-500 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="text"
          name="parent"
          placeholder="Parent Department (optional)"
          value={newDepartment.parent || ""}
          onChange={handleChange}
          className="block w-full px-3 py-2 border rounded-md text-sm shadow-sm placeholder-gray-500 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button
          onClick={handleSave}
          className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          {department ? "Update Department" : "Create Department"}
        </button>
      </div>
    </div>
  );
};

export default CreateDepartment;
