import React, { useState, useEffect } from "react";
import instance from "../Service/index";
import {
  NavLink,
  Outlet,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import {
  CogIcon,
  OfficeBuildingIcon,
  HomeIcon,
  UserGroupIcon,
  ClipboardListIcon,
  MenuIcon,
  XIcon,
  LogoutIcon,
} from "@heroicons/react/solid";

import "../../index.css";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Dashboard = ({ onLogout, subscribers = 0 }) => {
  const [previousTasks, setPreviousTasks] = useState(0);
  const [previousDepartments, setPreviousDepartments] = useState(0);
  const [previousEmployees, setPreviousEmployees] = useState(0);
  const [previousSubscribers, setPreviousSubscribers] = useState(0);

  const [employee, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Fix missing state
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  const [userEmail, setUserEmail] = useState("");
  const isDashboard = location.pathname === "/dashboard";

  const [date, setDate] = useState(new Date());

  const hiddenRoutes = ["/employee", "/departments", "/tasks"];

  const isMainHidden = hiddenRoutes.some((route) =>
    location.pathname.includes(route)
  );

  const onChange = (newDate) => {
    setDate(newDate);
  };

  // Effect to set initial counts for previous records
  useEffect(() => {
    setPreviousTasks(tasks.length);
    setPreviousDepartments(departments.length);
    setPreviousEmployees(employee.length);
    setPreviousSubscribers(subscribers);
  }, []);

  // Update previous counts at an interval (1 minute)
  useEffect(() => {
    const timer = setInterval(() => {
      setPreviousTasks(tasks.length);
      setPreviousDepartments(departments.length);
      setPreviousEmployees(employee.length);
      setPreviousSubscribers(subscribers);
    }, 1000); // 1 minute interval

    return () => clearInterval(timer);
  }, [tasks, departments, employee, subscribers]);

  // Fetch data on component mount
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

    const fetchData = async () => {
      setLoading(true); // Start loading
      await Promise.all([fetchDepartments(), fetchEmployees(), fetchTasks()]);
      setLoading(false); // Stop loading once all data is fetched
    };

    fetchData();
  }, [token]);

  // Redirect to login if token is invalid
  useEffect(() => {
    if (!isTokenValid) {
      navigate("/", { replace: true });
    }
  }, [isTokenValid, navigate]);

  // Handle clicks outside sidebar to close it
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

  // Handle logout action
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    localStorage.removeItem("refresh_token"); // Remove refresh token
    navigate("/"); // Redirect to login
    onLogout();
  };

  const handleLinkClick = () => {
    if (isDashboard) {
      navigate("/departments");
    }
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  const handleViewAllDepartments = () => {
    navigate("/dashboard/departments");
  };

  const handleViewAllEmployees = () => {
    navigate("/dashboard/employee");
  };

  const handleViewAllTasks = () => {
    navigate("/dashboard/tasks");
  };
  useEffect(() => {
    const storedEmail = localStorage.getItem("userLogin");
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  return (
    <>
      {loading ? (
        <div className="loader-container">
          <RotatingLines width="100" />
        </div>
      ) : (
        <div>
          <div
            className={`relative z-50 lg:hidden ${open ? "block" : "hidden"}`}
            aria-modal="true">
            <div
              className={`fixed inset-0 bg-gray-900/80 transition-opacity ease-linear duration-300 ${
                open ? "opacity-100" : "opacity-0"
              }`}></div>

            <div className="fixed inset-0 flex">
              <div
                className={`relative mr-16 flex w-full max-w-xs flex-1 transition-transform ease-in-out duration-500 ${
                  open ? "translate-x-0" : "-translate-x-full"
                }`}
                onClick={() => setOpen(false)}>
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button
                    type="button"
                    className="-m-2.5 p-2.5"
                    onClick={() => setOpen(false)}>
                    <span className="sr-only">Close sidebar</span>
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      aria-hidden="true">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>

                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                  <div className="flex h-16 shrink-0 items-center text-white">
                    Dashboard
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          <li>
                            <NavLink
                              to="departments"
                              onClick={handleLinkClick}
                              className={({ isActive }) =>
                                ` text-white group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ${
                                  isActive
                                    ? "bg-gray-800 text-blue-400"
                                    : "hover:bg-gray-800"
                                }`
                              }>
                              <OfficeBuildingIcon className="h-6 w-6 mr-3" />
                              Departments
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="employee"
                              onClick={handleLinkClick}
                              className={({ isActive }) =>
                                `text-white hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ${
                                  isActive
                                    ? "bg-gray-800 text-blue-400"
                                    : "hover:bg-gray-800"
                                }`
                              }>
                              <UserGroupIcon className="h-6 w-6 mr-3" />
                              Employee
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="tasks"
                              onClick={handleLinkClick}
                              className={({ isActive }) =>
                                `text-white hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ${
                                  isActive
                                    ? "bg-gray-800 text-blue-400"
                                    : "hover:bg-gray-800"
                                }`
                              }>
                              <ClipboardListIcon className="h-6 w-6 mr-3" />
                              Tasks
                            </NavLink>
                          </li>
                        </ul>
                      </li>
                      <li></li>
                    </ul>
                  </nav>
                  <div className="flex gap-6">
                    <CogIcon className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-white" />

                    <span className="text-white">Settings</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
              <nav className="flex flex-1 flex-col mt-10">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      <li>
                        <NavLink
                          to="departments"
                          onClick={handleLinkClick}
                          className={({ isActive }) =>
                            ` text-white group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ${
                              isActive
                                ? "bg-gray-800 text-blue-400"
                                : "hover:bg-gray-800"
                            }`
                          }>
                          <OfficeBuildingIcon className="h-6 w-6 mr-3" />
                          Departments
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="employee"
                          onClick={handleLinkClick}
                          className={({ isActive }) =>
                            `text-white hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ${
                              isActive
                                ? "bg-gray-800 text-blue-400"
                                : "hover:bg-gray-800"
                            }`
                          }>
                          <UserGroupIcon className="h-6 w-6 mr-3" />
                          Employee
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="tasks"
                          onClick={handleLinkClick}
                          className={({ isActive }) =>
                            `text-white hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ${
                              isActive
                                ? "bg-gray-800 text-blue-400"
                                : "hover:bg-gray-800"
                            }`
                          }>
                          <ClipboardListIcon className="h-6 w-6 mr-3" />
                          Tasks
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>

              <div className="flex items-center justify-between text-xs font-semibold leading-6 text-gray-400">
                <CogIcon className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-white" />

                <span>Settings</span>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                  x-state-description='undefined: "bg-gray-800 text-white", undefined: "text-gray-400 hover:text-white hover:bg-gray-800"'>
                  <svg
                    className="h-6 w-6 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 7.5V4.5a1.5 1.5 0 011.5-1.5h15a1.5 1.5 0 011.5 1.5v3M3 12v-1.5A1.5 1.5 0 014.5 9h15a1.5 1.5 0 011.5 1.5V12M3 16.5V15a1.5 1.5 0 011.5-1.5h15A1.5 1.5 0 0121 15v1.5M3 21V19.5a1.5 1.5 0 011.5-1.5h15A1.5 1.5 0 0121 19.5V21"
                    />
                  </svg>
                  Account
                </a>
              </div>
            </div>
          </div>

          <div className="lg:pl-72">
            <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
              <button
                type="button"
                className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                onClick={() => setOpen(true)}>
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
                </svg>
              </button>

              <div
                className="h-6 w-px bg-gray-900/10 lg:hidden"
                aria-hidden="true"></div>

              {/* header */}
              <div className="flex flex-1 justify-between  gap-x-4     lg:gap-x-6">
                <div className="flex gap-5 h-16 shrink-0 items-center">
                  <button onClick={handleBackToDashboard} className=" gap-6">
                    {" "}
                    <h1 className="font-bold">Dashbaord</h1>
                  </button>
                </div>
                <div className="flex  justify-between items-center gap-x-4 lg:gap-x-6">
                  <button
                    type="button"
                    className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">View notifications</span>
                    {/* <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"></path>
                    </svg> */}
                  </button>

                  <div
                    className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                    aria-hidden="false"></div>

                  <span className="hidden lg:flex lg:items-center">
                    <p>welcome</p>
                    <span className="ml-4 text-sm font-semibold leading-6 text-gray-900">
                      {userEmail || "Admin"}{" "}
                    </span>
                  </span>
                  <div className="relative ">
                    <button
                      type="button"
                      className="-m-1.5 flex items-center p-1.5"
                      aria-expanded={openProfile}
                      onClick={() => setOpenProfile(!openProfile)}>
                      <span className="sr-only">Open user menu</span>

                      <p className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition duration-200">
                        sign out
                      </p>
                    </button>

                    {openProfile && (
                      <div className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                        <a
                          href="#"
                          className="block px-3 py-1 text-sm leading-6 text-gray-900"
                          onClick={() => setOpenProfile(false)}>
                          Your profile
                        </a>
                        <a
                          href="#"
                          className="block px-3 py-1 text-sm leading-6 text-gray-900"
                          onClick={handleLogout}>
                          Sign out
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Render filtered results */}
            </div>
            <div className="flex flex-col m-4 md:flex-row p-4 bg-gray-100 rounded-lg shadow-md ">
              <main className="py-10 w-full">
                {!isMainHidden && (
                  <>
                    <div className="px-4 sm:px-6 lg:px-8">
                      <div className="relative h-full overflow-hidden rounded-xl">
                        <svg
                          className="absolute inset-0 h-full w-full stroke-gray-900/10"
                          fill="none">
                          <defs>
                            <pattern
                              id="pattern"
                              x="0"
                              y="0"
                              width="10"
                              height="10"
                              patternUnits="userSpaceOnUse">
                              <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3"></path>
                            </pattern>
                          </defs>
                          <rect stroke="none" width="100%" height="100%"></rect>
                        </svg>

                        <div className="p-4">
                          <h3 className="text-base font-semibold leading-6 text-gray-900">
                            Statistics
                          </h3>

                          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6">
                              <dt>
                                <div className="absolute rounded-md bg-indigo-500 p-3">
                                  <svg
                                    className="h-6 w-6 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M12 14.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm0 0v3.75M12 2.5v.008"
                                    />
                                  </svg>
                                </div>
                                <p className="ml-16 truncate text-sm font-medium text-gray-500">
                                  Total Employees
                                </p>
                              </dt>
                              <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                                <p className="text-2xl font-semibold text-gray-900">
                                  {" "}
                                  {employee.hemis.length + employee.data.length}
                                </p>
                                <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                                  <button
                                    onClick={handleViewAllEmployees}
                                    className="font-medium text-indigo-600 hover:text-indigo-500">
                                    View all
                                  </button>
                                </div>
                              </dd>
                            </div>
                            <div className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6">
                              <dt>
                                <div className="absolute rounded-md bg-indigo-500 p-3">
                                  <svg
                                    className="h-6 w-6 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M6 6v6h4V6H6zm12 0v6h-4V6h4zm-6 6h-4v6h4v-6zm6 0h-4v6h4v-6z"
                                    />
                                  </svg>
                                </div>
                                <p className="ml-16 truncate text-sm font-medium text-gray-500">
                                  Total Departments
                                </p>
                              </dt>
                              <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                                <p className="text-2xl font-semibold text-gray-900">
                                  {" "}
                                  {departments.hemis.length +
                                    departments.data.length}
                                </p>
                                <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                                  <button
                                    onClick={handleViewAllDepartments}
                                    className="font-medium text-indigo-600 hover:text-indigo-500">
                                    View all
                                  </button>
                                </div>
                              </dd>
                            </div>

                            <div className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6">
                              <dt>
                                <div className="absolute rounded-md bg-indigo-500 p-3">
                                  <svg
                                    className="h-6 w-6 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M10 12h4m-2-2v4m0-4V4m0 4l-4 4m2 0h4m-4 4h4m0 0l4 4m-4-4l4-4"
                                    />
                                  </svg>
                                </div>
                                <p className="ml-16 truncate text-sm font-medium text-gray-500">
                                  Total Tasks
                                </p>
                              </dt>
                              <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                                <p className="text-2xl font-semibold text-gray-900">
                                  {tasks.length}
                                </p>
                                <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                                  <button
                                    onClick={handleViewAllTasks}
                                    className="font-medium text-indigo-600 hover:text-indigo-500">
                                    View all
                                  </button>
                                </div>
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <Outlet />
                {isMainHidden && (
                  <button
                    onClick={handleBackToDashboard}
                    className=" p-3 mb-4 text-blue-500 hover:text-blue-700">
                    <HomeIcon className="h-6 w-6 inline-block mr-2" />
                    Back to Dashboard
                  </button>
                )}
              </main>
              {!isMainHidden && (
                <div className="calendar-container mt-10 mr-4">
                  <Calendar onChange={onChange} value={date} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
