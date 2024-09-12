// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
// } from "react-router-dom";
// import Dashboard from "./components/Dashboard";
// import Departments from "./components/Departments";
// import CreateDepartment from "./components/CreateDepartments/index";
// import Login from "./components/LoginPage";
// import "./App.css";
// import EmployeeCreate from "./components/Employees";
// import EmployeeEdit from "./components/EmployeeEdit"; // Import EmployeeEdit component
// import Tasks from "./components/Tasks";
// import EmployeeList from "./components/EmployeList";
// import { useState } from "react";

// function App() {
//   const token = localStorage.getItem("refresh_token");
//   const [selectedDepartment, setSelectedDepartment] = useState(null);

//   return (
//     <Router>
//       <Routes>
//         <Route
//           path="/"
//           element={!token ? <Login /> : <Navigate to="/dashboard" replace />}
//         />
//         <Route
//           path="/dashboard/*"
//           element={token ? <Dashboard /> : <Navigate to="/" replace />}>
//           <Route
//             path="departments"
//             element={<Departments department={selectedDepartment} />}
//           />
//           <Route path="create-department" element={<CreateDepartment />} />
//           <Route path="employee-create" element={<EmployeeCreate />} />
//           <Route path="employees/update/:id" element={<EmployeeEdit />} />
//           <Route path="tasks" element={<Tasks />} />
//           <Route path="login" element={<Login />} />
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
import Login from "./components/LoginPage";
import "./App.css";
import EmployeeCreate from "./components/Employees";
import EmployeeEdit from "./components/EmployeeEdit";
import Tasks from "./components/Tasks";
import EmployeeList from "./components/EmployeList";
import { useState } from "react";

function App() {
  const token = localStorage.getItem("refresh_token");
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={!token ? <Login /> : <Navigate to="/dashboard" replace />}
        />
        <Route
          path="/dashboard/*"
          element={token ? <Dashboard /> : <Navigate to="/" replace />}>
          <Route
            path="departments"
            element={<Departments department={selectedDepartment} />}
          />
          <Route path="create-department" element={<CreateDepartment />} />
          <Route path="employee-create" element={<EmployeeCreate />} />
          <Route path="employees/update/:id" element={<EmployeeEdit />} />{" "}
          {/* Change to EmployeeEdit */}
          <Route path="tasks" element={<Tasks />} />
          <Route path="employees" element={<EmployeeList />} />
        </Route>
        {/* Redirect to login if the route does not match */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
