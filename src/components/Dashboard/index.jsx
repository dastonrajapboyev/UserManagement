// import React, { useState } from "react";
// import { Cog6ToothIcon } from "@heroicons/react/24/outline";
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

import React, { useState, useEffect } from "react";
import instance from "../Service/index";
import {
  NavLink,
  Outlet,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

const Dashboard = ({ onLogout, subscribers = 0 }) => {
  const [previousTasks, setPreviousTasks] = useState(0);
  const [previousDepartments, setPreviousDepartments] = useState(0);
  const [previousEmployees, setPreviousEmployees] = useState(0);
  const [previousSubscribers, setPreviousSubscribers] = useState(0);

  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [open, setOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  const hiddenRoutes = ["/employees", "/departments", "/tasks"];

  // const [searchQuery, setSearchQuery] = useState(""); // Step 1: Search query state
  // const [filteredResults, setFilteredResults] = useState([]); // Step 2: Filtered results

  const isMainHidden = hiddenRoutes.some((route) =>
    location.pathname.includes(route)
  );

  useEffect(() => {
    setPreviousTasks(tasks.length);
    setPreviousDepartments(departments.length);
    setPreviousEmployees(employees.length);
    setPreviousSubscribers(subscribers);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setPreviousTasks(tasks.length);
      setPreviousDepartments(departments.length);
      setPreviousEmployees(employees.length);
      setPreviousSubscribers(subscribers);
    }, []);

    return () => clearInterval(timer);
  }, [tasks, departments, employees, subscribers]);

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

  // Step 3: Handle search query changes
  // useEffect(() => {
  //   if (searchQuery === "") {
  //     setFilteredResults([]);
  //   } else {
  //     const filteredEmployees = employees.filter(
  //       (employee) =>
  //         employee.name &&
  //         employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  //     );
  //     const filteredDepartments = departments.filter(
  //       (department) =>
  //         department.name &&
  //         department.name.toLowerCase().includes(searchQuery.toLowerCase())
  //     );
  //     const filteredTasks = tasks.filter(
  //       (task) =>
  //         task.title &&
  //         task.title.toLowerCase().includes(searchQuery.toLowerCase())
  //     );

  //     setFilteredResults([
  //       ...filteredEmployees,
  //       ...filteredDepartments,
  //       ...filteredTasks,
  //     ]);
  //   }
  // }, [searchQuery, employees, departments, tasks]);

  const handleLogout = () => {
    localStorage.removeItem("refresh_token");
    navigate("/");
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
    console.log("Navigating to /departments");
    navigate("/dashboard/departments");
  };

  const handleViewAllEmployees = () => {
    console.log("Navigating to /employees");
    navigate("/dashboard/employees");
  };

  const handleViewAllTasks = () => {
    console.log("Navigating to /tasks");
    navigate("/dashboard/tasks");
  };

  return (
    <>
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
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
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
                          to="employees"
                          onClick={handleLinkClick}
                          className={({ isActive }) =>
                            `text-white hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ${
                              isActive
                                ? "bg-gray-800 text-blue-400"
                                : "hover:bg-gray-800"
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
          <div className="flex gap-5 h-16 shrink-0 items-center">
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company"
            />

            <span className="text-white gap-6"> Dashbaord</span>
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
                      to="employees"
                      onClick={handleLinkClick}
                      className={({ isActive }) =>
                        `text-white hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ${
                          isActive
                            ? "bg-gray-800 text-blue-400"
                            : "hover:bg-gray-800"
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
          <div className="flex flex-1 gap-x-4  justify-end   lg:gap-x-6">
            {/* <form className="relative flex flex-1" action="#" method="GET">
              <label htmlFor="search-field" className="sr-only">
                Search
              </label>
              <svg
                className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clipRule="evenodd"></path>
              </svg>
              <input
                id="search-field"
                className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                placeholder="Search..."
                type="search"
                name="search"
              />
            </form> */}

            <div className="flex justify-between items-center gap-x-4 lg:gap-x-6">
              <button
                type="button"
                className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                <span className="sr-only">View notifications</span>
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
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"></path>
                </svg>
              </button>

              <div
                className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                aria-hidden="false"></div>

              <div className="relative ">
                <button
                  type="button"
                  className="-m-1.5 flex items-center p-1.5"
                  aria-expanded={openProfile}
                  onClick={() => setOpenProfile(!openProfile)}>
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full bg-gray-50"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <span className="hidden lg:flex lg:items-center">
                    <span className="ml-4 text-sm font-semibold leading-6 text-gray-900">
                      Admin
                    </span>
                  </span>
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
        <main className="py-10">
          {!isMainHidden && (
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
                          {employees.length}
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
                          {departments.length}
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
          )}

          <Outlet />
          {isMainHidden && (
            <button
              onClick={() => navigate("/")}
              className=" p-3 mb-4 text-blue-500 hover:text-blue-700">
              <HomeIcon className="h-6 w-6 inline-block mr-2" />
              Back to Dashboard
            </button>
          )}
        </main>
      </div>
    </>
  );
};

export default Dashboard;
