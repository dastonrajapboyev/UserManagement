// import React from "react";
// import { Link, Outlet } from "react-router-dom";

// const Dashboard = () => {
//   return (
//     <div className="flex h-screen">
//       <aside className="w-64 bg-gray-800 text-white p-6">
//         <nav>
//           <ul>
//             <li>
//               <Link
//                 to="/departments"
//                 className="block py-2 px-4 hover:bg-gray-700">
//                 Departments
//               </Link>
//             </li>
//             {/* <li>
//               <Link
//                 to="/create-department"
//                 className="block py-2 px-4 hover:bg-gray-700">
//                 Create Department
//               </Link>
//             </li> */}
//           </ul>
//         </nav>
//       </aside>

//       <main className="flex-grow p-4">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default Dashboard;
import React from "react";
import { Link, Outlet, Navigate } from "react-router-dom";

const Dashboard = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white p-6">
        <nav>
          <ul>
            <li>
              <Link
                to="departments" // Remove leading slash for relative routes
                className="block py-2 px-4 hover:bg-gray-700">
                Departments
              </Link>
            </li>
            {/* <li>
              <Link
                to="create-department" // Remove leading slash for relative routes
                className="block py-2 px-4 hover:bg-gray-700">
                Create Department
              </Link>
            </li> */}
          </ul>
        </nav>
      </aside>

      <main className="flex-grow p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
