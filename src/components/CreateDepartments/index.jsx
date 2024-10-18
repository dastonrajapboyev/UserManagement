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
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (department) {
      setNewDepartment(department);
    }
  }, [department]);

  useEffect(() => {
    const isFormComplete =
      newDepartment.name &&
      newDepartment.code &&
      newDepartment.structureType.name &&
      newDepartment.structureType.code &&
      newDepartment.localityType.name &&
      newDepartment.localityType.code;

    setIsButtonDisabled(!isFormComplete);
  }, [newDepartment]);

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

  // const handleSave = async () => {
  //   const token = localStorage.getItem("token");

  //   try {
  //     if (department) {
  //       await instance.put(
  //         `/departments/update/${department._id}`,
  //         newDepartment,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       window.alert("Department updated successfully!");
  //     } else {
  //       await instance.post("/departments/create", newDepartment, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       window.alert("Department created successfully!");
  //     }

  //     if (onSave) {
  //       onSave();
  //     }

  //     navigate("/departments");
  //   } catch (error) {
  //     console.error("Error saving department:", error);
  //     window.alert("An error occurred while saving the department.");
  //   }
  // };

  const handleSave = async () => {
    const token = localStorage.getItem("token");

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
        window.alert("Department updated successfully!");
      } else {
        await instance.post("/departments/create", newDepartment, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        window.alert("Department created successfully!");
      }

      // Notify parent component that save was successful
      if (onSave) {
        onSave(); // This can close the modal and refresh the department list
      }
    } catch (error) {
      console.error("Error saving department:", error);
      window.alert("An error occurred while saving the department.");
    }
  };
  return (
    <div className=" mt-2 max-w-md   shadow-md space-y-0">
      <h2 className="text-2xl font-bold text-center mb-2">
        {department ? "Edit Department" : "Create Department"}
      </h2>

      <div className="space-y-3 w-full p-0">
        <input
          type="text"
          name="name"
          placeholder="Bo'lim nomi"
          value={newDepartment.name}
          onChange={handleChange}
          className="block w-full px-3 py-2 border rounded-md text-sm shadow-sm placeholder-gray-500 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="text"
          name="code"
          placeholder="Bolim kodi"
          value={newDepartment.code}
          onChange={handleChange}
          className="block w-full px-3 py-2 border rounded-md text-sm shadow-sm placeholder-gray-500 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="text"
          name="structureType.name"
          placeholder="Struktura turi nomi"
          value={newDepartment.structureType.name}
          onChange={handleChange}
          className="block w-full px-3 py-2 border rounded-md text-sm shadow-sm placeholder-gray-500 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="text"
          name="structureType.code"
          placeholder="Struktura turi kodi"
          value={newDepartment.structureType.code}
          onChange={handleChange}
          className="block w-full px-3 py-2 border rounded-md text-sm shadow-sm placeholder-gray-500 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="text"
          name="localityType.name"
          placeholder="Hudud turi nomi"
          value={newDepartment.localityType.name}
          onChange={handleChange}
          className="block w-full px-3 py-2 border rounded-md text-sm shadow-sm placeholder-gray-500 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="text"
          name="localityType.code"
          placeholder="Hudud turi kodi"
          value={newDepartment.localityType.code}
          onChange={handleChange}
          className="block w-full px-3 py-2 border rounded-md text-sm shadow-sm placeholder-gray-500 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="text"
          name="parent"
          placeholder="Ota-onalar bo'limi (ixtiyoriy)"
          value={newDepartment.parent || ""}
          onChange={handleChange}
          className="block w-full px-3 py-2 border rounded-md text-sm shadow-sm placeholder-gray-500 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button
          onClick={handleSave}
          disabled={isButtonDisabled}
          className={`w-full text-white font-bold py-2 px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            isButtonDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-500"
          }`}>
          {department ? "Update Department" : "Create Department"}
        </button>
      </div>
    </div>
  );
};

export default CreateDepartment;
