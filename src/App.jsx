// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
// } from "react-router-dom";
// // import Dashboard from "./components/Dashboard";
// import Departments from "./components/Departments";
// import CreateDepartment from "./components/CreateDepartments/index";
// import "./App.css";
// import Tasks from "./components/Tasks";
// import Employeess from "./components/Employeess";
// import { useState, useEffect } from "react";
// import Login from "./components/Login";
// import Dashboard from "./components/Dashboard/index";
// import EmployeeDetail from "./components/EmployeeDetail";

// function App() {
//   const [token, setToken] = useState(localStorage.getItem("token"));

//   useEffect(() => {
//     const handleStorageChange = () => {
//       const storedToken = localStorage.getItem("token");
//       setToken(storedToken);
//     };

//     window.addEventListener("storage", handleStorageChange);

//     const storedToken = localStorage.getItem("token");
//     if (storedToken) {
//       setToken(storedToken);
//     }

//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setToken(null);
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             !token ? (
//               <Login setToken={setToken} />
//             ) : (
//               <Navigate to="/dashboard" replace />
//             )
//           }
//         />
//         <Route
//           path="/dashboard/*"
//           element={
//             token ? (
//               <Dashboard onLogout={handleLogout} />
//             ) : (
//               <Navigate to="/" replace />
//             )
//           }>
//           <Route path="departments" element={<Departments />} />
//           <Route path="create-department" element={<CreateDepartment />} />
//           <Route path="tasks" element={<Tasks />} />
//           <Route path="employees" element={<Employeess />} />
//           <Route path="/employees/:employeeId" element={<EmployeeDetail />} />
//         </Route>
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Departments from "./components/Departments";
import CreateDepartment from "./components/CreateDepartments/index";
import "./App.css";
import Tasks from "./components/Tasks";
import Employeess from "./components/Employeess";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard/index";
import EmployeeDetail from "./components/EmployeeDetail";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    };

    window.addEventListener("storage", handleStorageChange);

    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            !token ? (
              <Login setToken={setToken} />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />
        <Route
          path="/dashboard/*"
          element={
            token ? (
              <Dashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }>
          <Route path="departments" element={<Departments />} />
          <Route path="create-department" element={<CreateDepartment />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="employees" element={<Employeess />} />
          {/* Change absolute path to relative */}
          <Route path="employees/:employeeId" element={<EmployeeDetail />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
