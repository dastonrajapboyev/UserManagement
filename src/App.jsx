import "./App.css";
import CreateDepartment from "./components/CreateDepartments/index";
import Dashboard from "./components/Dashboard";
import Departments from "./components/Departments";
import Login from "./components/LoginPage";

function App() {
  return (
    <div className=" p-4">
      <Dashboard />
      <Login />
      <CreateDepartment />
      <Departments />
    </div>
  );
}

export default App;
