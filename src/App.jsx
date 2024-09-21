// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
// } from "react-router-dom";
// import Dashboard from "./components/Dashboard";
// import Departments from "./components/Departments";
// import CreateDepartment from "./components/CreateDepartments/index";
// import AddAdmin from "./components/LoginPage";
// import "./App.css";
// import EmployeeCreate from "./components/Employees";
// import EmployeeEdit from "./components/EmployeeEdit";
// import Tasks from "./components/Tasks";
// import EmployeeList from "./components/EmployeList";
// import { useState, useEffect } from "react";
// import Login from "./components/Login";
// function App() {
//   const [token, setToken] = useState(localStorage.getItem("refresh_token")); // Using refresh_token

//   useEffect(() => {
//     const handleStorageChange = () => {
//       const storedToken = localStorage.getItem("refresh_token");
//       setToken(storedToken);
//     };

//     window.addEventListener("storage", handleStorageChange);

//     // Check the token from localStorage on every page reload
//     const storedToken = localStorage.getItem("refresh_token");
//     if (storedToken) {
//       setToken(storedToken);
//     }

//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("refresh_token");
//     setToken(null);
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             !token ? (
//               <AddAdmin setToken={setToken} />
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
//           <Route path="employee-create" element={<EmployeeCreate />} />
//           <Route path="employees/update/:id" element={<EmployeeEdit />} />
//           <Route path="tasks" element={<Tasks />} />
//           <Route path="employees" element={<EmployeeList />} />
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
import Dashboard from "./components/Dashboard";
import Departments from "./components/Departments";
import CreateDepartment from "./components/CreateDepartments/index";
import AddAdmin from "./components/LoginPage";
import "./App.css";
import EmployeeCreate from "./components/Employees";
import EmployeeEdit from "./components/EmployeeEdit";
import Tasks from "./components/Tasks";
import EmployeeList from "./components/EmployeList";
import { useState, useEffect } from "react";
import Login from "./components/Login";

function App() {
  const [token, setToken] = useState(localStorage.getItem("refresh_token")); // Using refresh_token

  useEffect(() => {
    const handleStorageChange = () => {
      const storedToken = localStorage.getItem("refresh_token");
      setToken(storedToken);
    };

    window.addEventListener("storage", handleStorageChange);

    const storedToken = localStorage.getItem("refresh_token");
    if (storedToken) {
      setToken(storedToken);
    }

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("refresh_token");
    setToken(null);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            !token ? (
              <AddAdmin setToken={setToken} />
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
          <Route path="employee-create" element={<EmployeeCreate />} />
          <Route path="employees/update/:id" element={<EmployeeEdit />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="employees" element={<EmployeeList />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
