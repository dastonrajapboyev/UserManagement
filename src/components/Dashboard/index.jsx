import React, { useState, useEffect } from "react";
import instance from "../Service/index";
import {
  NavLink,
  Outlet,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
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
  const [departments, setDepartments] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setIsTokenValid(!!storedToken);

    const fetchDepartments = async () => {
      try {
        const response = await instance.get("/departments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDepartments(response.data);
      } catch (err) {
        console.error("Failed to fetch departments.");
      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await instance.get("/employees", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployees(response.data);
      } catch (err) {
        console.error("Failed to fetch employees.");
      }
    };

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

    fetchDepartments();
    fetchEmployees();
    fetchTasks();
  }, [token]);

  useEffect(() => {
    if (!isTokenValid) {
      return <Navigate to="/" replace />;
    }
  }, [isTokenValid]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById("sidebar");
      if (sidebar && !sidebar.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("refresh_token");
    navigate("/");
    onLogout();
  };

  const handleLinkClick = () => {
    if (isDashboard) {
      navigate("/tasks");
    }
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside
        id="sidebar"
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
              <XIcon className="h-6 w-6 z-10 relative" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
          <h1 className="text-xl ml-4">Admin Dashboard</h1>
        </header>
        <main className="flex-grow p-6">
          {isDashboard ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
                <div className="bg-blue-200 rounded-lg shadow-lg p-6 flex flex-col">
                  <h3 className="text-lg font-semibold">Tasks Count</h3>
                  <span className="text-3xl font-bold mb-2">
                    {tasks.length}
                  </span>
                  <p className="text-gray-600">Total tasks available</p>
                </div>

                <div className="bg-green-200 rounded-lg shadow-lg p-6 flex flex-col">
                  <h3 className="text-lg font-semibold">Departments Count</h3>
                  <span className="text-3xl font-bold mb-2">
                    {departments.length}
                  </span>
                  <p className="text-gray-600">Total departments available</p>
                </div>

                <div className="bg-yellow-200 rounded-lg shadow-lg p-6 flex flex-col">
                  <h3 className="text-lg font-semibold">Employees Count</h3>
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
          ) : (
            <button
              onClick={handleBackToDashboard}
              className="mb-4 text-blue-500 hover:text-blue-700">
              <HomeIcon className="h-6 w-6 inline-block mr-2" />
              Back to Dashboard
            </button>
          )}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
