import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const UserApplicationPreview = () => {
  const { user } = useUser();
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/applications/my`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setApplications(res.data);
    } catch (err) {
      console.error("Error fetching applications:", err);
    }
  };

  const handleConfirm = async (id) => {
    try {
      await axios.put(
        `${BASE_URL}/api/applications/${id}/confirm`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      fetchApplications();
    } catch (err) {
      console.error("Error confirming application:", err);
    }
  };

  useEffect(() => {
    fetchApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Application Preview & Confirmation</h2>
      {applications.map((app) => (
        <div key={app._id} className="border p-4 mb-4 rounded shadow">
          <p>
            <strong>Service:</strong> {app.serviceName}
          </p>

          {app.formPdfPath && (
            <iframe
              src={`${BASE_URL}${app.formPdfPath}`}
              className="w-full h-96 my-4 border"
              title="Form PDF"
            />
          )}

          {app.status === "Pending Confirmation" && (
            <button
              onClick={() => handleConfirm(app._id)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Confirm Application
            </button>
          )}

          <p className="text-sm text-gray-600 mt-2">Status: {app.status}</p>
        </div>
      ))}
    </div>
  );
};

export default UserApplicationPreview;
