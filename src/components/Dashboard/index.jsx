// import React, { useState, useEffect } from "react";
// import { NavLink, Outlet, Navigate, useNavigate } from "react-router-dom";
// import {
//   OfficeBuildingIcon,
//   UserGroupIcon,
//   ClipboardListIcon,
//   MenuIcon,
//   XIcon,
//   LogoutIcon,
// } from "@heroicons/react/solid";

// const Dashboard = ({ onLogout }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const token = localStorage.getItem("refresh_token");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedToken = localStorage.getItem("refresh_token");
//     console.log("Stored token:", storedToken);
//     const handleResize = () => {
//       if (window.innerWidth > 768) {
//         setSidebarOpen(false);
//       }
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   useEffect(() => {
//     const handleRouteChange = () => {
//       if (window.innerWidth <= 768) {
//         setSidebarOpen(false);
//       }
//     };

//     window.addEventListener("popstate", handleRouteChange);
//     window.addEventListener("pushState", handleRouteChange);
//     window.addEventListener("replaceState", handleRouteChange);

//     return () => {
//       window.removeEventListener("popstate", handleRouteChange);
//       window.removeEventListener("pushState", handleRouteChange);
//       window.removeEventListener("replaceState", handleRouteChange);
//     };
//   }, []);

//   if (!token) {
//     return <Navigate to="/" replace />;
//   }

//   const linkClasses =
//     "flex items-center py-2 px-4 rounded-md transition duration-200";

//   const handleSidebarToggle = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   const handleLinkClick = () => {
//     if (window.innerWidth <= 768) {
//       setSidebarOpen(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("refresh_token");
//     navigate("/");
//     onLogout();
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <aside
//         className={`fixed inset-y-0 left-0 bg-gray-900 text-white w-64 p-6 transform ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:w-64 lg:flex lg:flex-col`}>
//         <div className="flex justify-between items-center mb-6 lg:hidden">
//           <h1 className="text-2xl font-bold flex items-center">
//             <OfficeBuildingIcon className="h-7 w-7 mr-3" />
//             Admin Dashboard
//           </h1>
//           <button
//             onClick={handleSidebarToggle}
//             className="text-white focus:outline-none">
//             {sidebarOpen ? (
//               <XIcon className="h-6 w-6" />
//             ) : (
//               <MenuIcon className="h-6 w-6" />
//             )}
//           </button>
//         </div>
//         <nav>
//           <ul className="space-y-4">
//             <li>
//               <NavLink
//                 to="departments"
//                 onClick={handleLinkClick}
//                 className={({ isActive }) =>
//                   `${linkClasses} ${
//                     isActive ? "bg-gray-800 text-blue-400" : "hover:bg-gray-800"
//                   }`
//                 }>
//                 <OfficeBuildingIcon className="h-6 w-6 mr-3" />
//                 Departments
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="employees"
//                 onClick={handleLinkClick}
//                 className={({ isActive }) =>
//                   `${linkClasses} ${
//                     isActive ? "bg-gray-800 text-blue-400" : "hover:bg-gray-800"
//                   }`
//                 }>
//                 <UserGroupIcon className="h-6 w-6 mr-3" />
//                 Employees
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="tasks"
//                 onClick={handleLinkClick}
//                 className={({ isActive }) =>
//                   `${linkClasses} ${
//                     isActive ? "bg-gray-800 text-blue-400" : "hover:bg-gray-800"
//                   }`
//                 }>
//                 <ClipboardListIcon className="h-6 w-6 mr-3" />
//                 Tasks
//               </NavLink>
//             </li>
//           </ul>
//         </nav>

//         <button
//           onClick={handleLogout}
//           className="flex items-center mt-6 text-red-500 hover:text-red-700">
//           <LogoutIcon className="h-6 w-6 mr-2" />
//           Logout
//         </button>
//       </aside>

//       <div className="flex flex-col flex-grow w-full">
//         <header className="lg:hidden flex items-center p-4 bg-gray-800 text-white">
//           <button
//             onClick={handleSidebarToggle}
//             className="text-white focus:outline-none">
//             {sidebarOpen ? (
//               <XIcon className="h-6 w-6" />
//             ) : (
//               <MenuIcon className="h-6 w-6" />
//             )}
//           </button>
//           <h1 className="text-xl ml-4">Admin Dashboard</h1>
//         </header>
//         <main className="flex-grow p-6">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// // export default Dashboard;

// import React, { useState, useEffect } from "react";
// import instance from "../Service/index";
// import { NavLink, Outlet, Navigate, useNavigate } from "react-router-dom";
// import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/solid";
// import {
//   OfficeBuildingIcon,
//   UserGroupIcon,
//   ClipboardListIcon,
//   MenuIcon,
//   XIcon,
//   LogoutIcon,
// } from "@heroicons/react/solid";

// const Dashboard = ({ onLogout }) => {
//   const [employees, setEmployees] = useState([]);
//   // const [error, setError] = useState("");
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [departments, setDepartments] = useState([]);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [isTokenValid, setIsTokenValid] = useState(true); // Track token validity
//   const token = localStorage.getItem("refresh_token");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedToken = localStorage.getItem("refresh_token");

//     if (!storedToken) {
//       setIsTokenValid(false); // If token is missing, redirect to login
//     } else {
//       // Optionally, validate token with the server here
//       // For example, by calling a `/validate-token` API
//       setIsTokenValid(true);
//     }

//     const handleResize = () => {
//       if (window.innerWidth > 768) {
//         setSidebarOpen(false);
//       }
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   useEffect(() => {
//     const handleRouteChange = () => {
//       if (window.innerWidth <= 768) {
//         setSidebarOpen(false);
//       }
//     };

//     window.addEventListener("popstate", handleRouteChange);
//     window.addEventListener("pushState", handleRouteChange);
//     window.addEventListener("replaceState", handleRouteChange);

//     return () => {
//       window.removeEventListener("popstate", handleRouteChange);
//       window.removeEventListener("pushState", handleRouteChange);
//       window.removeEventListener("replaceState", handleRouteChange);
//     };
//   }, []);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const token = localStorage.getItem("refresh_token");
//         const response = await instance.get("/tasks", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setTasks(response.data);
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//       }
//     };

//     fetchTasks();
//   }, []);

//   const fetchDepartments = async () => {
//     try {
//       const token = localStorage.getItem("refresh_token");
//       const response = await instance.get("/departments", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (Array.isArray(response.data)) {
//         setDepartments(response.data);
//       } else {
//         console.error("Unexpected response format", response.data);
//         setError("Unexpected response format");
//       }
//     } catch (err) {
//       console.error("Error fetching departments:", err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDepartments();
//   }, []);

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const token = localStorage.getItem("refresh_token");
//         const response = await instance.get("/employees", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setEmployees(response.data);
//       } catch (err) {
//         setError("Failed to fetch employees.");
//         console.error("Error fetching employees:", err);
//       }
//     };

//     fetchEmployees();
//   }, []);

//   if (!isTokenValid) {
//     return <Navigate to="/" replace />; // Redirect to login if token is invalid
//   }

//   const linkClasses =
//     "flex items-center py-2 px-4 rounded-md transition duration-200";

//   const handleSidebarToggle = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   const handleLinkClick = () => {
//     if (window.innerWidth <= 768) {
//       setSidebarOpen(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("refresh_token");
//     navigate("/");
//     onLogout();
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <aside
//         className={`fixed inset-y-0 left-0 bg-gray-900 text-white w-64 p-6 transform ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:w-64 lg:flex lg:flex-col`}>
//         <div className="flex justify-between items-center mb-6 lg:hidden">
//           <h1 className="text-2xl font-bold flex items-center">
//             <OfficeBuildingIcon className="h-7 w-7 mr-3" />
//             Admin Dashboard
//           </h1>
//           <button
//             onClick={handleSidebarToggle}
//             className="text-white focus:outline-none">
//             {sidebarOpen ? (
//               <XIcon className="h-6 w-6" />
//             ) : (
//               <MenuIcon className="h-6 w-6" />
//             )}
//           </button>
//         </div>
//         <nav>
//           <ul className="space-y-4">
//             <li>
//               <NavLink
//                 to="departments"
//                 onClick={handleLinkClick}
//                 className={({ isActive }) =>
//                   `${linkClasses} ${
//                     isActive ? "bg-gray-800 text-blue-400" : "hover:bg-gray-800"
//                   }`
//                 }>
//                 <OfficeBuildingIcon className="h-6 w-6 mr-3" />
//                 Departments
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="employees"
//                 onClick={handleLinkClick}
//                 className={({ isActive }) =>
//                   `${linkClasses} ${
//                     isActive ? "bg-gray-800 text-blue-400" : "hover:bg-gray-800"
//                   }`
//                 }>
//                 <UserGroupIcon className="h-6 w-6 mr-3" />
//                 Employees
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="tasks"
//                 onClick={handleLinkClick}
//                 className={({ isActive }) =>
//                   `${linkClasses} ${
//                     isActive ? "bg-gray-800 text-blue-400" : "hover:bg-gray-800"
//                   }`
//                 }>
//                 <ClipboardListIcon className="h-6 w-6 mr-3" />
//                 Tasks
//               </NavLink>
//             </li>
//           </ul>
//         </nav>

//         <button
//           onClick={handleLogout}
//           className="flex items-center mt-6 text-red-500 hover:text-red-700">
//           <LogoutIcon className="h-6 w-6 mr-2" />
//           Logout
//         </button>
//       </aside>

//       <div className="flex flex-col flex-grow w-full">
//         <header className="lg:hidden flex items-center p-4 bg-gray-800 text-white">
//           <button
//             onClick={handleSidebarToggle}
//             className="text-white focus:outline-none">
//             {sidebarOpen ? (
//               <XIcon className="h-6 w-6" />
//             ) : (
//               <MenuIcon className="h-6 w-6" />
//             )}
//           </button>
//           <h1 className="text-xl ml-4">Admin Dashboard</h1>
//         </header>
//         <main className="flex-grow p-6">
//           <Outlet />

//           {/* tasks */}

//           <div>
//             <h3 className="text-xl font-semibold mb-4">Tasks List</h3>
//             <ul className="space-y-4">
//               {tasks.map((task) => (
//                 <li
//                   key={task._id}
//                   className="flex items-center justify-between p-4 bg-gray-100 border rounded-lg">
//                   <div>
//                     <h4 className="font-bold">{task.description}</h4>
//                     <p className="text-sm">
//                       Due Date: {new Date(task.due_date).toLocaleDateString()}
//                     </p>
//                     <p className="text-sm">Priority: {task.priority}</p>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/*  */}
//           <br />

//           {/* departments */}

//           <div className="overflow-x-auto">
//             <h3 className="text-xl font-semibold mb-4">Departments</h3>
//             <table className="border rounded-lg min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50 text-left">
//                 <tr>
//                   <th className="px-4 py-2">Name</th>
//                   <th className="px-4 py-2">Code</th>
//                   <th className="px-4 py-2">Structure Type</th>
//                   <th className="px-4 py-2">Locality Type</th>
//                   <th className="px-4 py-2">Parent</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {departments.map((department) => (
//                   <tr key={department._id}>
//                     <td className="px-4 py-4">{department.name}</td>
//                     <td>{department.code}</td>
//                     <td>
//                       {department.structureType.name} (
//                       {department.structureType.code})
//                     </td>
//                     <td>
//                       {department.localityType.name} (
//                       {department.localityType.code})
//                     </td>
//                     <td>{department.parent || "None"}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <br />
//           {/* employees */}
//           <div className="overflow-x-auto">
//             <table className="w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//                     Role
//                   </th>
//                   <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//                     Email
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {employees.length ? (
//                   employees.map((employee) => (
//                     <tr key={employee._id} className="hover:bg-gray-100">
//                       <td className="px-4 py-4 text-sm text-gray-900">
//                         {employee.role}
//                       </td>
//                       <td className="px-4 py-4 text-sm text-gray-900">
//                         {employee.email}
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td
//                       colSpan="3"
//                       className="px-4 py-4 text-center text-sm text-gray-500">
//                       No employees found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
// import React, { useState, useEffect } from "react";
// import instance from "../Service/index";
// import { NavLink, Outlet, Navigate, useNavigate } from "react-router-dom";
// import {
//   PencilIcon,
//   TrashIcon,
//   PlusIcon,
//   OfficeBuildingIcon,
//   UserGroupIcon,
//   ClipboardListIcon,
//   MenuIcon,
//   XIcon,
//   LogoutIcon,
//   HomeIcon,
// } from "@heroicons/react/solid";

// const Dashboard = ({ onLogout }) => {
//   const [employees, setEmployees] = useState([]);
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [departments, setDepartments] = useState([]);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [isTokenValid, setIsTokenValid] = useState(true);
//   const [showContent, setShowContent] = useState(false);
//   const token = localStorage.getItem("refresh_token");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedToken = localStorage.getItem("refresh_token");
//     setIsTokenValid(!!storedToken);

//     const handleResize = () => {
//       if (window.innerWidth > 768) {
//         setSidebarOpen(false);
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   useEffect(() => {
//     const fetchDepartments = async () => {
//       try {
//         const response = await instance.get("/departments", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setDepartments(response.data);
//       } catch (err) {
//         setError("Failed to fetch departments.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDepartments();
//   }, [token]);

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const response = await instance.get("/employees", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setEmployees(response.data);
//       } catch (err) {
//         setError("Failed to fetch employees.");
//       }
//     };

//     fetchEmployees();
//   }, [token]);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await instance.get("/tasks", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setTasks(response.data);
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//       }
//     };

//     fetchTasks();
//   }, [token]);

//   if (!isTokenValid) {
//     return <Navigate to="/" replace />;
//   }

//   const handleSidebarToggle = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   const handleLinkClick = () => {
//     if (window.innerWidth <= 768) {
//       setSidebarOpen(false);
//     }
//     setShowContent(true);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("refresh_token");
//     navigate("/");
//     onLogout();
//   };

//   const handleHomeClick = () => {
//     navigate("/dashboard");
//     setShowContent(false); // Hide content when returning home
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <aside
//         className={`fixed inset-y-0 left-0 bg-gray-900 text-white w-64 p-6 transform ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:w-64 lg:flex lg:flex-col`}>
//         <nav>
//           <ul className="space-y-4">
//             <li>
//               <NavLink
//                 to="departments"
//                 onClick={handleLinkClick}
//                 className={({ isActive }) =>
//                   `flex items-center py-2 px-4 rounded-md transition duration-200 ${
//                     isActive ? "bg-gray-800 text-blue-400" : "hover:bg-gray-800"
//                   }`
//                 }>
//                 <OfficeBuildingIcon className="h-6 w-6 mr-3" />
//                 Departments
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="employees"
//                 onClick={handleLinkClick}
//                 className={({ isActive }) =>
//                   `flex items-center py-2 px-4 rounded-md transition duration-200 ${
//                     isActive ? "bg-gray-800 text-blue-400" : "hover:bg-gray-800"
//                   }`
//                 }>
//                 <UserGroupIcon className="h-6 w-6 mr-3" />
//                 Employees
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="tasks"
//                 onClick={handleLinkClick}
//                 className={({ isActive }) =>
//                   `flex items-center py-2 px-4 rounded-md transition duration-200 ${
//                     isActive ? "bg-gray-800 text-blue-400" : "hover:bg-gray-800"
//                   }`
//                 }>
//                 <ClipboardListIcon className="h-6 w-6 mr-3" />
//                 Tasks
//               </NavLink>
//             </li>
//           </ul>
//         </nav>

//         <button
//           onClick={handleLogout}
//           className="flex items-center mt-6 text-red-500 hover:text-red-700">
//           <LogoutIcon className="h-6 w-6 mr-2" />
//           Logout
//         </button>
//       </aside>

//       <div className="flex flex-col flex-grow w-full">
//         <header className="lg:hidden flex items-center p-4 bg-gray-800 text-white">
//           <button
//             onClick={handleSidebarToggle}
//             className="text-white focus:outline-none">
//             {sidebarOpen ? (
//               <XIcon className="h-6 w-6" />
//             ) : (
//               <MenuIcon className="h-6 w-6" />
//             )}
//           </button>
//           <h1 className="text-xl ml-4">Admin Dashboard</h1>
//         </header>
//         <main className="flex-grow p-6">
//           {showContent ? (
//             <>
//               <button
//                 onClick={handleHomeClick}
//                 className="mb-4 text-blue-500 hover:text-blue-700">
//                 <HomeIcon className="h-6 w-6 inline-block mr-2" />
//                 Back to Dashboard
//               </button>
//               <Outlet />
//             </>
//           ) : (
//             <div>
//               <h3 className="text-xl font-semibold mb-4">Tasks List</h3>
//               <ul className="space-y-4">
//                 {tasks.map((task) => (
//                   <li
//                     key={task._id}
//                     className="flex items-center justify-between p-4 bg-gray-100 border rounded-lg">
//                     <div>
//                       <h4 className="font-bold">{task.description}</h4>
//                       <p className="text-sm">
//                         Due Date: {new Date(task.due_date).toLocaleDateString()}
//                       </p>
//                       <p className="text-sm">Priority: {task.priority}</p>
//                     </div>
//                   </li>
//                 ))}
//               </ul>

//               <div className="overflow-x-auto">
//                 <h3 className="text-xl font-semibold mb-4">Departments</h3>
//                 <table className="border rounded-lg min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50 text-left">
//                     <tr>
//                       <th className="px-4 py-2">Name</th>
//                       <th className="px-4 py-2">Code</th>
//                       <th className="px-4 py-2">Structure Type</th>
//                       <th className="px-4 py-2">Locality Type</th>
//                       <th className="px-4 py-2">Parent</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {departments.map((department) => (
//                       <tr key={department._id}>
//                         <td className="px-4 py-4">{department.name}</td>
//                         <td>{department.code}</td>
//                         <td>
//                           {department.structureType.name} (
//                           {department.structureType.code})
//                         </td>
//                         <td>
//                           {department.localityType.name} (
//                           {department.localityType.code})
//                         </td>
//                         <td>{department.parent || "None"}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               <div className="overflow-x-auto">
//                 <h3 className="text-xl font-semibold mb-4">Employees</h3>
//                 <table className="w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//                         Role
//                       </th>
//                       <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
//                         Email
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {employees.length ? (
//                       employees.map((employee) => (
//                         <tr key={employee._id} className="hover:bg-gray-100">
//                           <td className="px-4 py-4 text-sm text-gray-900">
//                             {employee.role}
//                           </td>
//                           <td className="px-4 py-4 text-sm text-gray-900">
//                             {employee.email}
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td
//                           colSpan="2"
//                           className="px-4 py-4 text-center text-sm text-gray-500">
//                           No employees found.
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import React, { useState, useEffect } from "react";
// import instance from "../Service/index";
// import { NavLink, Outlet, Navigate, useNavigate } from "react-router-dom";
// import {
//   OfficeBuildingIcon,
//   UserGroupIcon,
//   ClipboardListIcon,
//   MenuIcon,
//   XIcon,
//   LogoutIcon,
//   HomeIcon,
// } from "@heroicons/react/solid";

// const Dashboard = ({ onLogout }) => {
//   const [employees, setEmployees] = useState([]);
//   const [tasks, setTasks] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [isTokenValid, setIsTokenValid] = useState(true);
//   const token = localStorage.getItem("refresh_token");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedToken = localStorage.getItem("refresh_token");
//     setIsTokenValid(!!storedToken);
//     const fetchData = async () => {
//       const [deptRes, empRes, taskRes] = await Promise.all([
//         instance.get("/departments", { headers: { Authorization: `Bearer ${token}` } }),
//         instance.get("/employees", { headers: { Authorization: `Bearer ${token}` } }),
//         instance.get("/tasks", { headers: { Authorization: `Bearer ${token}` } }),
//       ]);
//       setDepartments(deptRes.data);
//       setEmployees(empRes.data);
//       setTasks(taskRes.data);
//     };
//     fetchData();
//   }, [token]);

//   if (!isTokenValid) {
//     return <Navigate to="/" replace />;
//   }

//   const handleSidebarToggle = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("refresh_token");
//     navigate("/");
//     onLogout();
//   };

//   const taskStats = {
//     completed: tasks.filter(task => task.status === "completed").length,
//     pending: tasks.filter(task => task.status === "pending").length,
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <aside className={`fixed inset-y-0 left-0 bg-gray-900 text-white w-64 p-6 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:w-64 lg:flex lg:flex-col`}>
//         <nav>
//           <ul className="space-y-4">
//             <li>
//               <NavLink to="departments" className={({ isActive }) => `flex items-center py-2 px-4 rounded-md transition duration-200 ${isActive ? "bg-gray-800 text-blue-400" : "hover:bg-gray-800"}`}>
//                 <OfficeBuildingIcon className="h-6 w-6 mr-3" /> Departments
//               </NavLink>
//             </li>
//             <li>
//               <NavLink to="employees" className={({ isActive }) => `flex items-center py-2 px-4 rounded-md transition duration-200 ${isActive ? "bg-gray-800 text-blue-400" : "hover:bg-gray-800"}`}>
//                 <UserGroupIcon className="h-6 w-6 mr-3" /> Employees
//               </NavLink>
//             </li>
//             <li>
//               <NavLink to="tasks" className={({ isActive }) => `flex items-center py-2 px-4 rounded-md transition duration-200 ${isActive ? "bg-gray-800 text-blue-400" : "hover:bg-gray-800"}`}>
//                 <ClipboardListIcon className="h-6 w-6 mr-3" /> Tasks
//               </NavLink>
//             </li>
//           </ul>
//         </nav>
//         <button onClick={handleLogout} className="flex items-center mt-6 text-red-500 hover:text-red-700">
//           <LogoutIcon className="h-6 w-6 mr-2" /> Logout
//         </button>
//       </aside>

//       <div className="flex flex-col flex-grow w-full">
//         <header className="lg:hidden flex items-center p-4 bg-gray-800 text-white">
//           <button onClick={handleSidebarToggle} className="text-white focus:outline-none">
//             {sidebarOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
//           </button>
//           <h1 className="text-xl ml-4">Admin Dashboard</h1>
//         </header>
//         <main className="flex-grow p-6">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="bg-blue-500 rounded-lg shadow-lg p-6 text-white">
//               <h3 className="text-lg font-semibold mb-2">Total Employees</h3>
//               <p className="text-3xl">{employees.length}</p>
//             </div>
//             <div className="bg-green-500 rounded-lg shadow-lg p-6 text-white">
//               <h3 className="text-lg font-semibold mb-2">Total Departments</h3>
//               <p className="text-3xl">{departments.length}</p>
//             </div>
//             <div className="bg-yellow-500 rounded-lg shadow-lg p-6 text-white">
//               <h3 className="text-lg font-semibold mb-2">Tasks Overview</h3>
//               <p className="text-3xl">{taskStats.completed} Completed / {taskStats.pending} Pending</p>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useState, useEffect } from "react";
import instance from "../Service/index";
import { NavLink, Outlet, Navigate, useNavigate } from "react-router-dom";
import {
  OfficeBuildingIcon,
  UserGroupIcon,
  ClipboardListIcon,
  MenuIcon,
  XIcon,
  LogoutIcon,
  HomeIcon,
} from "@heroicons/react/solid";

const Dashboard = ({ onLogout }) => {
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const token = localStorage.getItem("refresh_token");
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("refresh_token");
    setIsTokenValid(!!storedToken);
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await instance.get("/departments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDepartments(response.data);
      } catch (err) {
        setError("Failed to fetch departments.");
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, [token]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await instance.get("/employees", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployees(response.data);
      } catch (err) {
        setError("Failed to fetch employees.");
      }
    };

    fetchEmployees();
  }, [token]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await instance.get("/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [token]);

  if (!isTokenValid) {
    return <Navigate to="/" replace />;
  }

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
    setShowContent(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("refresh_token");
    navigate("/");
    onLogout();
  };

  const handleHomeClick = () => {
    navigate("/dashboard");
    setShowContent(false);
  };

  const handleNavigateTasks = () => {
    navigate("/tasks");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside
        className={`fixed inset-y-0 left-0 bg-gray-900 text-white w-64 p-6 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:w-64 lg:flex lg:flex-col`}>
        <nav>
          <ul className="space-y-4">
            <li>
              <NavLink
                to="departments"
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `flex items-center py-2 px-4 rounded-md transition duration-200 ${
                    isActive ? "bg-gray-800 text-blue-400" : "hover:bg-gray-800"
                  }`
                }>
                <OfficeBuildingIcon className="h-6 w-6 mr-3" />
                Departments
              </NavLink>
            </li>
            <li>
              <NavLink
                to="employees"
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `flex items-center py-2 px-4 rounded-md transition duration-200 ${
                    isActive ? "bg-gray-800 text-blue-400" : "hover:bg-gray-800"
                  }`
                }>
                <UserGroupIcon className="h-6 w-6 mr-3" />
                Employees
              </NavLink>
            </li>
            <li>
              <NavLink
                to="tasks"
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `flex items-center py-2 px-4 rounded-md transition duration-200 ${
                    isActive ? "bg-gray-800 text-blue-400" : "hover:bg-gray-800"
                  }`
                }>
                <ClipboardListIcon className="h-6 w-6 mr-3" />
                Tasks
              </NavLink>
            </li>
          </ul>
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center mt-6 text-red-500 hover:text-red-700">
          <LogoutIcon className="h-6 w-6 mr-2" />
          Logout
        </button>
      </aside>

      <div className="flex flex-col flex-grow w-full">
        <header className="lg:hidden flex items-center p-4 bg-gray-800 text-white">
          <button
            onClick={handleSidebarToggle}
            className="text-white focus:outline-none">
            {sidebarOpen ? (
              <XIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
          <h1 className="text-xl ml-4">Admin Dashboard</h1>
        </header>
        <main className="flex-grow p-6">
          {showContent ? (
            <>
              <button
                onClick={handleHomeClick}
                className="mb-4 text-blue-500 hover:text-blue-700">
                <HomeIcon className="h-6 w-6 inline-block mr-2" />
                Back to Dashboard
              </button>
              <Outlet />
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="bg-blue-200 rounded-lg shadow-lg p-6 flex flex-col">
                  <div className="flex items-center mb-4">
                    <ClipboardListIcon className="h-8 w-8 text-blue-600 mr-2" />
                    <h3 className="text-lg font-semibold">Tasks Count</h3>
                  </div>
                  <span className="text-3xl font-bold mb-2">
                    {tasks.length}
                  </span>
                  <p className="text-gray-600">Total tasks available</p>
                </div>

                <div className="bg-green-200 rounded-lg shadow-lg p-6 flex flex-col">
                  <div className="flex items-center mb-4">
                    <OfficeBuildingIcon className="h-8 w-8 text-green-600 mr-2" />
                    <h3 className="text-lg font-semibold">Departments Count</h3>
                  </div>
                  <span className="text-3xl font-bold mb-2">
                    {departments.length}
                  </span>
                  <p className="text-gray-600">Total departments available</p>
                </div>

                <div className="bg-yellow-200 rounded-lg shadow-lg p-6 flex flex-col">
                  <div className="flex items-center mb-4">
                    <UserGroupIcon className="h-8 w-8 text-yellow-600 mr-2" />
                    <h3 className="text-lg font-semibold">Employees Count</h3>
                  </div>
                  <span className="text-3xl font-bold mb-2">
                    {employees.length}
                  </span>
                  <p className="text-gray-600">Total employees available</p>
                </div>
              </div>
              <br />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-blue-500 rounded-lg shadow-lg p-6 flex flex-col">
                  <h3 className="text-lg font-semibold mb-4">Tasks</h3>
                  {tasks.length ? (
                    tasks.map((task) => (
                      <div key={task._id} className="border-b mb-2 pb-2">
                        <h4 className="font-bold">{task.description}</h4>
                        <p className="text-sm">
                          Due: {new Date(task.due_date).toLocaleDateString()}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p>No tasks available.</p>
                  )}
                </div>

                <div className="bg-green-500 rounded-lg shadow-lg p-6 flex flex-col">
                  <h3 className="text-lg font-semibold mb-4">Departments</h3>
                  {departments.length ? (
                    departments.map((department) => (
                      <div key={department._id} className="border-b mb-2 pb-2">
                        <h4 className="font-bold">{department.name}</h4>
                        <p>Code: {department.code}</p>
                      </div>
                    ))
                  ) : (
                    <p>No departments found.</p>
                  )}
                </div>

                <div className="bg-yellow-500 rounded-lg shadow-lg p-6 flex flex-col">
                  <h3 className="text-lg font-semibold mb-4">Employees</h3>
                  {employees.length ? (
                    employees.map((employee) => (
                      <div key={employee._id} className="border-b mb-2 pb-2">
                        <p className="font-bold">{employee.role}</p>
                        <p>Email: {employee.email}</p>
                      </div>
                    ))
                  ) : (
                    <p>No employees found.</p>
                  )}
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
