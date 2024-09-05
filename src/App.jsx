// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Dashboard from "./components/Dashboard";
// import Departments from "./components/Departments";
// import CreateDepartment from "./components/CreateDepartments/index";
// import Login from "./components/LoginPage";
// import "./App.css";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Dashboard />}>
//           <Route path="/" element={<Login />} />
//           <Route path="departments" element={<Departments />} />
//           <Route path="create-department" element={<CreateDepartment />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Departments from "./components/Departments";
import CreateDepartment from "./components/CreateDepartments/index";
import Login from "./components/LoginPage";
import instance from "./components/Service/index";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [authStatus, setAuthStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await instance.get("/auth/verify", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setAuthStatus(response.status === 200);
        } else {
          setAuthStatus(false);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setAuthStatus(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display loading indicator while checking auth
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            authStatus === false ? (
              <Login />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />
        <Route
          path="/dashboard/*" // Ensure this path matches the nested routes
          element={<Dashboard />}>
          <Route path="departments" element={<Departments />} />
          <Route path="create-department" element={<CreateDepartment />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
