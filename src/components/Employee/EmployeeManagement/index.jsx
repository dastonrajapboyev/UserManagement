// // EmployeeManagement.js
// import React, { useState, useEffect } from "react";
// import { PencilIcon } from "@heroicons/react/solid"; // iconlar uchun
// import instance from "../../Service/index"; // API ga murojaat qilish uchun
// import EmployeeCRUD from "../EmployeeCrud";

// const EmployeeManagement = () => {
//   const [employees, setEmployees] = useState([]);
//   const [employeesHemis, setEmployeesHemis] = useState([]);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [employeeData, setEmployeeData] = useState({});

//   // Xodimlar ma'lumotlarini olish
//   useEffect(() => {
//     fetchEmployees();
//     fetchEmployeesHemis();
//   }, []);

//   const fetchEmployees = async () => {
//     try {
//       const response = await instance.get("/employees");
//       setEmployees(response.data.data);
//     } catch (error) {
//       console.error("Error fetching employees:", error);
//     }
//   };

//   const fetchEmployeesHemis = async () => {
//     try {
//       const response = await instance.get("/employees"); // hemis xodimlari uchun API
//       setEmployeesHemis(response.data.hemis);
//     } catch (error) {
//       console.error("Error fetching hemis employees:", error);
//     }
//   };

//   const handleEmployeeDetail = (employee) => {
//     setSelectedEmployee(employee);
//   };

//   const renderEmployeeHemisList = () => (
//     <div className="overflow-x-auto mt-4">
//       <table className="w-full divide-y divide-gray-200">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//               Image
//             </th>
//             <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//               Full Name
//             </th>
//             <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//               Academic Degree
//             </th>
//             <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//               Department
//             </th>
//             <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//               Staff Position
//             </th>
//             <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//               Employee Type
//             </th>
//             <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//               Employee Status
//             </th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {employeesHemis.map((hemi, id) => (
//             <tr
//               key={id}
//               className="hover:bg-gray-100 cursor-pointer"
//               onClick={() => handleEmployeeDetail(hemi)}>
//               <td className="px-4 py-4 text-sm text-gray-900">
//                 <img
//                   src={hemi.image}
//                   alt={hemi.full_name}
//                   className="h-16 w-16 rounded-full object-cover"
//                 />
//               </td>
//               <td className="px-4 py-4 text-sm text-gray-900">
//                 {hemi.full_name}
//               </td>
//               <td className="px-4 py-4 text-sm text-gray-900">
//                 {hemi.academicDegree?.name || "N/A"}
//               </td>
//               <td className="px-4 py-4 text-sm text-gray-900">
//                 {hemi.department?.name || "N/A"}
//               </td>
//               <td className="px-4 py-4 text-sm text-gray-900">
//                 {hemi.staffPosition?.name || "N/A"}
//               </td>
//               <td className="px-4 py-4 text-sm text-gray-900">
//                 {hemi.employeeType?.name || "N/A"}
//               </td>
//               <td className="px-4 py-4 text-sm text-gray-900">
//                 {hemi.employeeStatus?.name || "N/A"}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );

//   const renderEmployeeList = () => (
//     <div className="overflow-x-auto mt-4">
//       <table className="w-full divide-y divide-gray-200">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//               Image
//             </th>
//             <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//               Full Name
//             </th>
//             <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//               Role
//             </th>
//             <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//               Email
//             </th>
//             <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {employees.map((employee, id) => (
//             <tr
//               key={id}
//               className="hover:bg-gray-100 cursor-pointer"
//               onClick={() => handleEmployeeDetail(employee)}>
//               <td className="px-4 py-4 text-sm text-gray-900">
//                 {employee.image && (
//                   <img
//                     src={employee.image}
//                     alt="Employee"
//                     className="h-16 w-16 rounded-full object-cover"
//                   />
//                 )}
//               </td>
//               <td className="px-4 py-4 text-sm text-gray-900">
//                 {employee.full_name}
//               </td>
//               <td className="px-4 py-4 text-sm text-gray-900">
//                 {employee.role}
//               </td>
//               <td className="px-4 py-4 text-sm text-gray-900">
//                 {employee.login}
//               </td>
//               <td className="px-4 py-4 text-sm text-gray-900 flex space-x-4">
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setEditId(employee._id);
//                     setEmployeeData(employee);
//                     setIsModalOpen(true);
//                   }}
//                   className="text-yellow-500 hover:text-yellow-700">
//                   <PencilIcon className="h-5 w-5" />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );

//   const renderEmployeeDetail = () => (
//     <div className="p-4">
//       {selectedEmployee ? (
//         <>
//           {selectedEmployee.image && (
//             <img
//               src={selectedEmployee.image}
//               alt={selectedEmployee.full_name || "No Name"}
//               className="h-32 w-32 rounded-full object-cover"
//             />
//           )}
//           <p>
//             <strong>To'liq ismi:</strong> {selectedEmployee.full_name || "N/A"}
//           </p>
//           <p>
//             <strong>Login:</strong> {selectedEmployee.login || "N/A"}
//           </p>
//           <p>
//             <strong>Role:</strong> {selectedEmployee.role || "N/A"}
//           </p>
//           <p>
//             <strong>Jinsi:</strong> {selectedEmployee.gender?.name || "N/A"}
//           </p>
//           <p>
//             <strong>Bo'lim:</strong>{" "}
//             {selectedEmployee.department?.name || "N/A"}
//           </p>
//           <p>
//             <strong>Status:</strong>{" "}
//             {selectedEmployee.employeeStatus?.name || "N/A"}
//           </p>
//           <p>
//             <strong>Xodim turi:</strong>{" "}
//             {selectedEmployee.employeeType?.name || "N/A"}
//           </p>
//           <p>
//             <strong>Stavkasi:</strong>{" "}
//             {selectedEmployee.employmentStaff?.name || "N/A"}
//           </p>
//           <p>
//             <strong>Xodim lavozimi:</strong>{" "}
//             {selectedEmployee.staffPosition?.name || "N/A"}
//           </p>
//           <p>
//             <strong>Kirgan yili:</strong>{" "}
//             {selectedEmployee.year_of_enter || "N/A"}
//           </p>
//         </>
//       ) : (
//         <p>No employee selected.</p>
//       )}
//     </div>
//   );

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-semibold">Employee Management</h2>
//       {renderEmployeeHemisList()}
//       {renderEmployeeList()}
//       {renderEmployeeDetail()}
//       {isModalOpen && (
//         <EmployeeCRUD
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           editId={editId}
//           employeeData={employeeData}
//           fetchEmployees={fetchEmployees}
//         />
//       )}
//     </div>
//   );
// };

// export default EmployeeManagement;

import React, { useState, useEffect } from "react";
import { PencilIcon, PlusIcon } from "@heroicons/react/solid"; // Import PlusIcon
import instance from "../../Service/index";
import EmployeeCRUD from "../EmployeeCrud";
import { Dialog } from "@headlessui/react"; // Import Dialog for EmployeeDetail

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [employeesHemis, setEmployeesHemis] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); // For EmployeeDetail modal
  const [editId, setEditId] = useState(null);
  const [employeeData, setEmployeeData] = useState({
    full_name: "",
    role: "",
    login: "",
    password: "",
    // image: null,
  });

  // Fetch employee data
  useEffect(() => {
    fetchEmployees();
    fetchEmployeesHemis();
  }, []);

  const showAlert = (message) => {
    alert(message); // You can customize this to use a different alert mechanism
  };

  const fetchEmployees = async () => {
    try {
      const response = await instance.get("/employees");
      setEmployees(response.data.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const fetchEmployeesHemis = async () => {
    try {
      const response = await instance.get("/employees");
      setEmployeesHemis(response.data.hemis);
    } catch (error) {
      console.error("Error fetching hemis employees:", error);
    }
  };

  const handleEmployeeDetail = (employee) => {
    setSelectedEmployee(employee);
    setIsDetailModalOpen(true); // Open the detail modal
  };

  const renderEmployeeHemisList = () => (
    <div className="overflow-x-auto mt-4">
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Image
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Full Name
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Academic Degree
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Department
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Staff Position
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Employee Type
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Employee Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employeesHemis.map((hemi, id) => (
            <tr
              key={id}
              className="hover:bg-gray-100 cursor-pointer"
              onClick={() => handleEmployeeDetail(hemi)}>
              <td className="px-4 py-4 text-sm text-gray-900">
                <img
                  src={hemi.image}
                  alt={hemi.full_name}
                  className="h-16 w-16 rounded-full object-cover"
                />
              </td>
              <td className="px-4 py-4 text-sm text-gray-900">
                {hemi.full_name}
              </td>
              <td className="px-4 py-4 text-sm text-gray-900">
                {hemi.academicDegree?.name || "N/A"}
              </td>
              <td className="px-4 py-4 text-sm text-gray-900">
                {hemi.department?.name || "N/A"}
              </td>
              <td className="px-4 py-4 text-sm text-gray-900">
                {hemi.staffPosition?.name || "N/A"}
              </td>
              <td className="px-4 py-4 text-sm text-gray-900">
                {hemi.employeeType?.name || "N/A"}
              </td>
              <td className="px-4 py-4 text-sm text-gray-900">
                {hemi.employeeStatus?.name || "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderEmployeeList = () => (
    <div className="overflow-x-auto mt-4">
      <table className="w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Image
            </th>
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
            <tr
              key={id}
              className="hover:bg-gray-100 cursor-pointer"
              onClick={() => handleEmployeeDetail(employee)}>
              <td className="px-4 py-4 text-sm text-gray-900">
                {employee.image && (
                  <img
                    src={employee.image}
                    alt="Employee"
                    className="h-16 w-16 rounded-full object-cover"
                  />
                )}
              </td>
              <td className="px-4 py-4 text-sm text-gray-900">
                {employee.full_name}
              </td>
              <td className="px-4 py-4 text-sm text-gray-900">
                {employee.role}
              </td>
              <td className="px-4 py-4 text-sm text-gray-900">
                {employee.login}
              </td>
              <td className="px-4 py-4 text-sm text-gray-900 flex space-x-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditId(employee._id);
                    setEmployeeData({
                      full_name: employee.full_name,
                      login: employee.login,
                      role: employee.role,
                      password: "", // Do not prefill the password for security
                    });
                    setIsModalOpen(true);
                  }}
                  className="text-yellow-500 hover:text-yellow-700">
                  <PencilIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderEmployeeDetail = () => (
    <Dialog
      open={isDetailModalOpen}
      onClose={() => setIsDetailModalOpen(false)}>
      <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />
      <div className="fixed inset-0 flex justify-center p-4">
        <Dialog.Panel className="mx-auto w-full mt-14 max-w-sm bg-white p-4 rounded">
          <Dialog.Title className="text-lg font-medium text-gray-900">
            Employee Details
          </Dialog.Title>
          <div className="p-4">
            {selectedEmployee ? (
              <>
                {selectedEmployee.image && (
                  <img
                    src={selectedEmployee.image}
                    alt={selectedEmployee.full_name || "No Name"}
                    className="h-32 w-32 rounded-full object-cover"
                  />
                )}
                <p>
                  <strong>To'liq ismi:</strong>{" "}
                  {selectedEmployee.full_name || "N/A"}
                </p>
                <p>
                  <strong>Login:</strong> {selectedEmployee.login || "N/A"}
                </p>
                <p>
                  <strong>Role:</strong> {selectedEmployee.role || "N/A"}
                </p>
                <p>
                  <strong>Jinsi:</strong>{" "}
                  {selectedEmployee.gender?.name || "N/A"}
                </p>
                <p>
                  <strong>Bo'lim:</strong>{" "}
                  {selectedEmployee.department?.name || "N/A"}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {selectedEmployee.employeeStatus?.name || "N/A"}
                </p>
                <p>
                  <strong>Xodim turi:</strong>{" "}
                  {selectedEmployee.employeeType?.name || "N/A"}
                </p>
                <p>
                  <strong>Stavkasi:</strong>{" "}
                  {selectedEmployee.employmentStaff?.name || "N/A"}
                </p>
                <p>
                  <strong>Xodim lavozimi:</strong>{" "}
                  {selectedEmployee.staffPosition?.name || "N/A"}
                </p>
                <p>
                  <strong>Kirgan yili:</strong>{" "}
                  {selectedEmployee.year_of_enter || "N/A"}
                </p>
              </>
            ) : (
              <p>No employee selected.</p>
            )}
          </div>
          <button
            onClick={() => setIsDetailModalOpen(false)}
            className="mt-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
            Close
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Employee Management</h1>

        <button
          onClick={() => {
            setEditId(null);
            setEmployeeData({
              full_name: "",
              role: "",
              login: "",
              password: "",
              image: null,
            }); // Reset the employee data
            setIsModalOpen(true);
          }}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <PlusIcon className="h-5 w-5 mr-1" />
          Add Employee
        </button>
      </div>
      {renderEmployeeList()}
      {renderEmployeeHemisList()}
      {/* {isModalOpen && (
        <EmployeeCRUD
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          editId={editId}
          employeeData={employeeData}
          refreshEmployees={fetchEmployees}
        />
      )} */}
      {isModalOpen && (
        <EmployeeCRUD
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          editId={editId}
          employeeData={employeeData}
          setEmployeeData={setEmployeeData} // Add this line
          refreshEmployees={fetchEmployees}
          showAlert={showAlert} // If you're using showAlert in EmployeeCRUD, ensure it's passed as well
        />
      )}
      {renderEmployeeDetail()}
    </div>
  );
};

export default EmployeeManagement;
