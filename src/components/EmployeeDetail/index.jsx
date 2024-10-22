import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import instance from "../Service/index";

const EmployeeDetail = () => {
  const { employeeId } = useParams(); // Get the employeeId from URL
  const [employeeDetail, setEmployeeDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployeeDetail = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await instance.get(`/employees/${employeeId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setEmployeeDetail(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch employee details.");
        setLoading(false);
        console.error("Error fetching employee details:", err);
      }
    };

    fetchEmployeeDetail();
  }, [employeeId]);

  if (loading) {
    return <div>Loading employee details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!employeeDetail) {
    return <div>No employee details available.</div>;
  }

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">
        {employeeDetail.full_name}
      </h2>

      <div className="mb-4">
        <strong>Role:</strong> {employeeDetail.role}
      </div>

      <div className="mb-4">
        <strong>Email:</strong> {employeeDetail.login}
      </div>

      {/* Additional information like department, academic degree, etc */}
      {employeeDetail.department && (
        <div className="mb-4">
          <strong>Department:</strong> {employeeDetail.department.name}
        </div>
      )}

      {employeeDetail.academicDegree && (
        <div className="mb-4">
          <strong>Academic Degree:</strong> {employeeDetail.academicDegree.name}
        </div>
      )}

      {/* Staff Position */}
      {employeeDetail.staffPosition && (
        <div className="mb-4">
          <strong>Staff Position:</strong> {employeeDetail.staffPosition.name}
        </div>
      )}

      {/* Employee Status */}
      {employeeDetail.employeeStatus && (
        <div className="mb-4">
          <strong>Employee Status:</strong> {employeeDetail.employeeStatus.name}
        </div>
      )}

      {/* Add any other fields you'd like to display */}
    </div>
  );
};

export default EmployeeDetail;
