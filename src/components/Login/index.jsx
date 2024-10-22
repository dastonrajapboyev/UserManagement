// import React, { useState } from "react";
// import instance from "../Service/index";
// import { useNavigate } from "react-router-dom";

// const Login = ({ setToken }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // if (email !== "admin@gmail.com" || password !== "admin") {
//     //   setError("Invalid email or password. Please try again.");
//     //   return;
//     // }
//     try {
//       const response = await instance.post("/auth/login", {
//         email,
//         password,
//       });

//       if (response.data.success) {
//         const refreshToken = response.data.tokens.refreshToken;
//         localStorage.setItem("token", refreshToken);
//         localStorage.setItem("userEmail", email);
//         setToken(refreshToken);
//         console.log(refreshToken, "ref");
//         navigate("/dashboard");
//         setSuccess("Admin added successfully!");
//         setEmail("");
//         setPassword("");
//         console.log(response.data);
//       } else {
//         setError(
//           response.data.message || "Failed to add admin. Please try again."
//         );
//       }
//     } catch (err) {
//       console.error("Login failed:", err);
//       setError("Login failed. Please check your email and password.");
//     }
//   };

//   return (
//     <div>
//       <div className="flex min-h-screen flex-col justify-center items-center px-6 lg:px-8">
//         <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <h1>login</h1>
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium leading-6 text-gray-900">
//                 Email address
//               </label>
//               <div className="mt-2">
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 />
//               </div>
//             </div>

//             <div>
//               <div className="flex items-center justify-between">
//                 <label
//                   htmlFor="password"
//                   className="block text-sm font-medium leading-6 text-gray-900">
//                   Password
//                 </label>
//               </div>
//               <div className="mt-2">
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   autoComplete="current-password"
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 />
//               </div>
//             </div>

//             {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

//             <div>
//               <button
//                 type="submit"
//                 className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
//                 Sign in
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import instance from "../Service/index";
import { useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await instance.post("/auth/login", {
        login,
        password,
      });

      if (response.data.success) {
        const refreshToken = response.data.tokens.refreshToken;
        localStorage.setItem("token", refreshToken);
        localStorage.setItem("userLogin", login); // Save the login (formerly email)
        setToken(refreshToken);
        console.log(refreshToken, "ref");
        navigate("/dashboard");
        setSuccess("Admin added successfully!");
        setLogin("");
        setPassword("");
        console.log(response.data);
      } else {
        setError(
          response.data.message || "Failed to add admin. Please try again."
        );
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Login failed. Please check your login and password.");
    }
  };

  return (
    <div>
      <div className="flex min-h-screen flex-col justify-center items-center px-6 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h1>Admin Login</h1>
            <div>
              <label
                htmlFor="login"
                className="block text-sm font-medium leading-6 text-gray-900">
                Login
              </label>
              <div className="mt-2">
                <input
                  id="login"
                  name="login"
                  type="text"
                  autoComplete="username"
                  required
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
