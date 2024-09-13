import React, { useState } from "react";
import instance from "../Service/index";
import { useNavigate } from "react-router-dom";

const AddAdmin = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.get("/auth/addAdmin");

      if (response.data.success) {
        const refreshToken = response.data.data.refresh_token;
        localStorage.setItem("refresh_token", refreshToken);
        setToken(refreshToken);

        setSuccess("Admin added successfully!");
        setEmail("");
        setPassword("");
        console.log("Admin added successfully");
        console.log(response.data);

        navigate("/dashboard");
      } else {
        setError(
          response.data.message || "Failed to add admin. Please try again."
        );
      }
    } catch (err) {
      if (err.response) {
        console.error("Error response data:", err.response.data);
        setError(
          err.response.data.message ||
            `Failed to add admin: ${err.response.statusText}`
        );
      } else if (err.request) {
        console.error("Error request:", err.request);
        setError("No response from server. Please try again.");
      } else {
        console.error("Error message:", err.message);
        setError(`Error: ${err.message}`);
      }
    }
  };

  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            {success && (
              <div className="text-green-500 text-sm mb-4">{success}</div>
            )}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Add Admin
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAdmin;
