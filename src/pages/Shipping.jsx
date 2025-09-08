// src/pages/Shipping.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const STATUS_FLOW = [
  "Pending",
  "Submitted",
  "Pending Confirmation",
  "Confirmed",
  "In Review",
  "Completed"
];

const Shipping = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [statusCounts, setStatusCounts] = useState({});

  useEffect(() => {
    if (user?.token) fetchApplications();
  }, [user?.token]);

  const fetchApplications = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/applications`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const apps = res.data;
      setApplications(apps);
      countStatus(apps);
    } catch (err) {
      console.error("Error fetching applications:", err);
    }
  };

  const countStatus = (apps) => {
    const counts = {};
    STATUS_FLOW.forEach(status => counts[status] = 0);
    apps.forEach(app => {
      counts[app.status] = (counts[app.status] || 0) + 1;
    });
    setStatusCounts(counts);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 to-purple-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-3xl w-full border-l-4 border-purple-500">
        <h1 className="text-4xl font-extrabold text-purple-600 mb-6">📦 Shipping Status</h1>

        {applications.length === 0 ? (
          <p className="text-gray-700">No applications found.</p>
        ) : (
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {STATUS_FLOW.map((status) => (
              <li key={status} className="flex justify-between">
                <span>{status}</span>
                <span>{statusCounts[status] || 0} Applications</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 text-gray-700">
          <p className="mb-2">All documents are delivered digitally via email and user portal.</p>
          <p className="mb-2">Please ensure your contact details are correct while submitting applications.</p>
          <p className="text-gray-500 text-sm mt-4">
            For assistance, contact Vishnu Khate - 9689992252, Shubham Bhandekar - 9834883059
          </p>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
