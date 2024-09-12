import React, { useState, useEffect } from "react";
import { NavLink, Outlet, Navigate } from "react-router-dom";
import {
  OfficeBuildingIcon,
  UserGroupIcon,
  ClipboardListIcon,
  MenuIcon,
  XIcon,
} from "@heroicons/react/solid";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const token = localStorage.getItem("refresh_token");

  useEffect(() => {
    // Add event listener for window resize
    const storedToken = localStorage.getItem("refresh_token");
    console.log("Stored token:", storedToken); // Debugging log
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSidebarOpen(false); // Close the sidebar on large screens
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Close sidebar when navigating to a new page on mobile
    const handleRouteChange = () => {
      if (window.innerWidth <= 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("popstate", handleRouteChange);
    window.addEventListener("pushState", handleRouteChange);
    window.addEventListener("replaceState", handleRouteChange);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
      window.removeEventListener("pushState", handleRouteChange);
      window.removeEventListener("replaceState", handleRouteChange);
    };
  }, []);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  const linkClasses =
    "flex items-center py-2 px-4 rounded-md transition duration-200";

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      setSidebarOpen(false); // Close the sidebar on mobile view
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 bg-gray-900 text-white w-64 p-6 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:w-64 lg:flex lg:flex-col`}>
        <div className="flex justify-between items-center mb-6 lg:hidden">
          <h1 className="text-2xl font-bold flex items-center">
            <OfficeBuildingIcon className="h-7 w-7 mr-3" />
            Admin Dashboard
          </h1>
          <button
            onClick={handleSidebarToggle}
            className="text-white focus:outline-none">
            {sidebarOpen ? (
              <XIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
        <nav>
          <ul className="space-y-4">
            <li>
              <NavLink
                to="departments"
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `${linkClasses} ${
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
                  `${linkClasses} ${
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
                  `${linkClasses} ${
                    isActive ? "bg-gray-800 text-blue-400" : "hover:bg-gray-800"
                  }`
                }>
                <ClipboardListIcon className="h-6 w-6 mr-3" />
                Tasks
              </NavLink>
            </li>
            <li>
              <NavLink
                to="login"
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `${linkClasses} ${
                    isActive ? "bg-gray-800 text-blue-400" : "hover:bg-gray-800"
                  }`
                }>
                <ClipboardListIcon className="h-6 w-6 mr-3" />
                Login
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
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
          <Outlet /> {/* Content for the selected route */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
