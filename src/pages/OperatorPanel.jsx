
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { IndianRupee } from "lucide-react";
import { initSocket } from "../socket";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const STATUS_FLOW = [
  "Pending",
  "Submitted",
  "Pending Confirmation",
  "Confirmed",
  "In Review",
  "Completed",
];

const nextStatusOf = (current) => {
  const idx = STATUS_FLOW.indexOf(current);
  if (idx === -1 || idx === STATUS_FLOW.length - 1) return null;
  return STATUS_FLOW[idx + 1];
};

const OperatorPanel = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState({});
  const [uploadingAppId, setUploadingAppId] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [statusCounts, setStatusCounts] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const docLabels = {
    tenthMarksheet: "10th Marksheet",
    tenthCertificate: "10th Certificate",
    twelfthMarksheet: "12th Marksheet",
    twelfthCertificate: "12th Certificate",
    graduationDegree: "Graduation Degree",
    pgCertificate: "PG Certificate",
    domicile: "Domicile Certificate",
    casteValidity: "Caste Validity",
    otherDocument: "Other Document",
  };

  const statusOptions = [
    "All",
    "Submitted",
    "Rejected",
    "Pending Confirmation",
    "Confirmed",
    "In Review",
    "Completed",
  ];

  useEffect(() => {
    if (user?.token) fetchApplications();
  }, [user?.token]);

 

useEffect(() => {
  if (!user?.token) return;
  const socket = initSocket(user.token);

  // 🟢 Draft Applications (payment fail/cancel झाले तरी)
  socket.on("applicationDrafted", (draftApp) => {
    setApplications((prev) => {
      const exists = prev.find((a) => a._id === draftApp._id);
      if (exists) {
        return prev.map((a) => (a._id === draftApp._id ? draftApp : a));
      }
      return [draftApp, ...prev];
    });
  });

  // 🟢 Payment Success नंतर Submitted Applications
  socket.on("applicationCreated", (newApp) => {
    setApplications((prev) => {
      const exists = prev.find((a) => a._id === newApp._id);
      if (exists) {
        return prev.map((a) => (a._id === newApp._id ? newApp : a));
      }
      return [newApp, ...prev];
    });
  });

  socket.on("applicationStatusUpdated", (updatedApp) => {
    setApplications((prev) =>
      prev.map((app) => (app._id === updatedApp._id ? updatedApp : app))
    );
  });

  socket.on("certificateUploaded", (updatedApp) => {
    setApplications((prev) =>
      prev.map((app) => (app._id === updatedApp._id ? updatedApp : app))
    );
  });

  socket.on("correctionSent", (updatedApp) => {
    setApplications((prev) => {
      const updatedApps = prev.map((app) =>
        app._id === updatedApp._id ? updatedApp : app
      );
      countStatus(updatedApps);
      return updatedApps;
    });
  });

  return () => {
    socket.off("applicationDrafted");
    socket.off("applicationCreated");
    socket.off("applicationStatusUpdated");
    socket.off("certificateUploaded");
    socket.off("correctionSent");
  };
}, [user]);

//   useEffect(() => {
//   if (user?.token) fetchApplications();
// }, [user?.token]);

// useEffect(() => {
//   if (!user?.token) return;
//   const socket = initSocket(user.token);

//   // 🟢 Draft Applications (payment fail/cancel झाले तरी)
//   socket.on("applicationDrafted", (draftApp) => {
//     setApplications((prev) => {
//       const exists = prev.find((a) => a._id === draftApp._id);
//       if (exists) {
//         // जर आधीपासून असेल तर update कर
//         return prev.map((a) => (a._id === draftApp._id ? draftApp : a));
//       }
//       // नसेल तर add कर
//       return [draftApp, ...prev];
//     });
//   });

//   // 🟢 Payment Success नंतर Submitted Applications
//   socket.on("applicationCreated", (newApp) => {
//     setApplications((prev) => {
//       const exists = prev.find((a) => a._id === newApp._id);
//       if (exists) {
//         return prev.map((a) => (a._id === newApp._id ? newApp : a));
//       }
//       return [newApp, ...prev];
//     });
//   });

//   socket.on("applicationStatusUpdated", (updatedApp) => {
//     setApplications((prev) =>
//       prev.map((app) => (app._id === updatedApp._id ? updatedApp : app))
//     );
//   });

//   socket.on("certificateUploaded", (updatedApp) => {
//     setApplications((prev) =>
//       prev.map((app) => (app._id === updatedApp._id ? updatedApp : app))
//     );
//   });

//   socket.on("correctionSent", (updatedApp) => {
//     setApplications((prev) => {
//       const updatedApps = prev.map((app) =>
//         app._id === updatedApp._id ? updatedApp : app
//       );
//       countStatus(updatedApps);
//       return updatedApps;
//     });
//   });

//   return () => {
//     socket.off("applicationDrafted");
//     socket.off("applicationCreated");
//     socket.off("applicationStatusUpdated");
//     socket.off("certificateUploaded");
//     socket.off("correctionSent");
//   };
// }, [user]);


  const fetchApplications = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/applications`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const apps = res.data.reverse();
      setApplications(apps);
      countStatus(apps);
    } catch (err) {
      toast.error("❌ Error fetching applications");
      console.error("❌ Error fetching apps:", err);
    }
  };

  const countStatus = (apps) => {
    const counts = { All: apps.length };
    statusOptions.forEach((status) => (counts[status] = 0));
    apps.forEach((app) => {
      counts[app.status] = (counts[app.status] || 0) + 1;
    });
    setStatusCounts(counts);
  };

  const handleFileChange = (e, appId, field = "formPdf") => {
    setSelectedFiles((prev) => ({
      ...prev,
      [appId]: { ...(prev[appId] || {}), [field]: e.target.files[0] },
    }));
  };

  const handleInputChange = (e, appId, field) => {
    setSelectedFiles((prev) => ({
      ...prev,
      [appId]: { ...(prev[appId] || {}), [field]: e.target.value },
    }));
  };

  const handleUpload = async (appId) => {
    const file = selectedFiles[appId]?.formPdf;
    const operatorId = selectedFiles[appId]?.operatorId || "";
    const operatorPassword = selectedFiles[appId]?.operatorPassword || "";

    if (!file || file.type !== "application/pdf")
      return toast.error("⚠️ Please select a valid PDF file");

    try {
      const formData = new FormData();
      formData.append("formPdf", file);
      formData.append("operatorId", operatorId);
      formData.append("operatorPassword", operatorPassword);

      setUploadingAppId(appId);
      await axios.put(`${BASE_URL}/api/applications/${appId}/upload-pdf`, formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("📤 Form uploaded successfully");
      setUploadingAppId(null);
      fetchApplications();
    } catch (err) {
      console.error("❌ Upload error:", err);
      toast.error("❌ Upload failed");
      setUploadingAppId(null);
    }
  };

  const handleUploadCertificate = async (appId) => {
    const file = selectedFiles[appId]?.certificate;
    if (!file || file.type !== "application/pdf")
      return toast.error("⚠️ Please select a valid certificate PDF");

    try {
      const formData = new FormData();
      formData.append("certificate", file);

      setUploadingAppId(appId);
      await axios.put(`${BASE_URL}/api/applications/${appId}/uploadCertificate`, formData, {
        headers: { Authorization: `Bearer ${user.token}`, "Content-Type": "multipart/form-data" },
      });
      toast.success("🏆 Certificate uploaded successfully");
      setUploadingAppId(null);
      fetchApplications();
    } catch (err) {
      console.error("❌ Certificate upload error:", err);
      toast.error("❌ Certificate upload failed");
      setUploadingAppId(null);
    }
  };

  const handleReject = async (appId) => {
    const reason = prompt("Enter rejection reason:");
    if (!reason?.trim()) return toast.error("⚠️ Rejection reason is required");
    try {
      await axios.put(
        `${BASE_URL}/api/applications/${appId}/reject`,
        { reason },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      toast.success("❌ Application rejected");
      fetchApplications();
    } catch (err) {
      console.error("❌ Reject error:", err);
      toast.error("❌ Rejection failed");
    }
  };

  const handleNextStatus = async (appId, currentStatus) => {
    const nextStatus = nextStatusOf(currentStatus);
    if (!nextStatus) {
      toast.error("⚠️ No next status available");
      return;
    }

    try {
      const res = await axios.put(
        `${BASE_URL}/api/applications/${appId}/status`,
        { status: nextStatus },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      toast.success("➡️ Status updated to " + (res.data.application?.status || nextStatus));
      fetchApplications();
    } catch (err) {
      console.error("❌ Status update error:", err.response?.data || err.message);
      toast.error("❌ Failed to update status");
    }
  };

  const openProfile = async (userId) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/users/${userId}/profile`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setSelectedProfile(res.data);
      setShowProfileModal(true);
    } catch (err) {
      console.error("❌ Profile load error:", err);
      alert("Failed to load profile");
    }
  };

  const handleDeleteDoc = async (fieldName, index = 0) => {
    if (!window.confirm(`Delete ${docLabels[fieldName]}?`)) return;
    try {
      const res = await axios.delete(
        `${BASE_URL}/api/users/profile/document/${selectedProfile._id}/${fieldName}/${index}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setSelectedProfile(res.data.user);
      alert(`${docLabels[fieldName]} deleted`);
      fetchApplications();
    } catch (err) {
      console.error("❌ Delete document error:", err);
      alert("Failed to delete document");
    }
  };

  const handleDownload = async (filename) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/files/${filename}`, {
        responseType: "blob",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Failed to download");
    }
  };

  const categories = [
    "All",
    ...new Set(applications.map((app) => app.service?.category?.name).filter(Boolean)),
  ];

  const handleDownloadAllDocs = async (userId) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/applications/${userId}/download-all`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      alert(res.data.message || "Documents downloaded successfully");
    } catch (err) {
      console.error("❌ Download all docs failed:", err);
      alert("Failed to download all documents");
    }
  };

  const filteredApps = applications.filter((app) => {
    const matchesStatus = statusFilter === "All" || app.status === statusFilter;
    const matchesCategory =
      categoryFilter === "All" || app.service?.category?.name === categoryFilter;

    if (!searchQuery) return matchesStatus && matchesCategory;

    const searchLower = searchQuery.toLowerCase().trim();

    const userNameMatch =
      typeof app.user?.name === "string" &&
      app.user.name.toLowerCase().includes(searchLower);

    const mobileMatch = app.user?.mobile && app.user.mobile.toString().includes(searchQuery);

    const serviceMatch =
      typeof app.service?.name === "string" &&
      app.service.name.toLowerCase().includes(searchLower);

    const subServiceMatch =
      typeof app.subService?.name === "string" &&
      app.subService.name.toLowerCase().includes(searchLower);

    const categoryMatch =
      typeof app.service?.category?.name === "string" &&
      app.service.category.name.toLowerCase().includes(searchLower);

    return (
      matchesStatus &&
      matchesCategory &&
      (userNameMatch || mobileMatch || serviceMatch || subServiceMatch || categoryMatch)
    );
  });

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="max-w-7xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-16">
        <h2 className="text-3xl font-extrabold mb-6 text-indigo-700">👨‍💻 Operator Panel</h2>

        {/* Search & Filter */}
        <div className="mb-6 flex flex-wrap gap-3 items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, mobile, service or category"
            className="px-4 py-2 border rounded-md w-80 focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
          >
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <div className="flex gap-2 flex-wrap">
            {statusOptions.map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-1.5 rounded-md border font-medium text-sm ${
                  statusFilter === status
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-indigo-600 border-indigo-400"
                }`}
              >
                {status} ({statusCounts[status] || 0})
              </button>
            ))}
          </div>
        </div>

        {/* Applications Table */}
        {filteredApps.length === 0 ? (
          <p className="text-gray-500">No applications found.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl shadow border border-gray-200">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-indigo-50 text-indigo-800">
                <tr>
                  <th className="px-4 py-3 border">Applicant</th>
                  <th className="px-4 py-3 border">Service</th>
                  <th className="px-4 py-3 border">Status</th>
                  <th className="px-4 py-3 border">Payment</th>
                  <th className="px-4 py-3 border">Profile</th>
                  <th className="px-4 py-3 border">User ID / Password</th>
                  <th className="px-4 py-3 border">Upload</th>
                  <th className="px-4 py-3 border">Corrections</th>
                  <th className="px-4 py-3 border">Actions</th>
                  <th className="px-4 py-3 border">Chat</th>
                </tr>
              </thead>
              <tbody>
                {filteredApps.map((app) => (
                  <tr key={app._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 border">
                      {app.user?.name}
                      <br />
                      <span className="text-xs text-gray-500">{app.user?.mobile}</span>
                    </td>
                    <td className="px-4 py-3 border">
                      {app.service?.name}
                      {app.subService?.name ? ` → ${app.subService.name}` : ""}
                    </td>
                    <td className="px-4 py-3 border">{app.status}</td>
                    <td className="px-4 py-3 border">
                      {app.paymentInfo ? (
                        <span
                          className={`px-2 py-1 rounded-md text-xs inline-flex items-center gap-1 ${
                            app.paymentInfo.paymentStatus === "Paid"
                              ? "bg-green-100 text-green-700 border border-green-300"
                              : app.paymentInfo.paymentStatus === "Failed"
                              ? "bg-red-100 text-red-700 border border-red-300"
                              : "bg-yellow-100 text-yellow-700 border border-yellow-300"
                          }`}
                        >
                          <IndianRupee size={12} />
                          {app.paymentInfo.paymentStatus} (₹{app.paymentInfo.amount || 0})
                        </span>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>

                    <td className="px-4 py-3 border flex flex-col gap-2">
                      <button
                        onClick={() => openProfile(app.user?._id)}
                        className="px-3 py-1 bg-indigo-600 text-white rounded text-sm w-full hover:bg-indigo-700 hover:shadow-lg hover:scale-105 transition transform duration-200 ease-in-out"
                      >
                        View Profile
                      </button>
                      <button
                        onClick={() => handleDownloadAllDocs(app.user?._id)}
                        className="px-3 py-1 bg-green-600 text-white rounded text-sm w-full hover:bg-green-700 hover:shadow-lg hover:scale-105 transition transform duration-200 ease-in-out"
                      >
                        Download All Docs
                      </button>
                    </td>

                   
<td className="px-4 py-3 border">
  <div>
    <span className="font-medium text-sm">ID:</span>{" "}
    {app.operatorCredentials?.operatorId || "N/A"}
  </div>
  <div>
    <span className="font-medium text-sm">Pass:</span>{" "}
    {app.operatorCredentials?.operatorPassword || "N/A"}
  </div>
</td>

                    <td className="px-4 py-3 border space-y-2">
                      {(app.status === "Pending Confirmation" || app.status === "Submitted") && (
                        <>
                      
                          <input
  type="text"
  placeholder="User ID"
  value={selectedFiles[app._id]?.operatorId || app.operatorCredentials?.operatorId || ""}
  onChange={(e) => handleInputChange(e, app._id, "operatorId")}
  className="block w-full border px-2 py-1 text-sm rounded"
/>

<input
  type="password"
  placeholder="Password"
  value={selectedFiles[app._id]?.operatorPassword || app.operatorCredentials?.operatorPassword || ""}
  onChange={(e) => handleInputChange(e, app._id, "operatorPassword")}
  className="block w-full border px-2 py-1 text-sm rounded"
/>

                          <input
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => handleFileChange(e, app._id, "formPdf")}
                            className="block w-full text-sm text-gray-700"
                          />
                          <button
                            onClick={() => handleUpload(app._id)}
                            className="px-3 py-1 bg-indigo-600 text-white rounded w-full text-sm"
                          >
                            Upload Form
                          </button>
                        </>
                      )}
                      {/* {app.status === "Confirmed" && (
                        <>
                          <input
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => handleFileChange(e, app._id, "certificate")}
                            className="block w-full text-sm text-gray-700"
                          />
                          <button
                            onClick={() => handleUploadCertificate(app._id)}
                            className="px-3 py-1 bg-green-600 text-white rounded w-full text-sm"
                          >
                            Upload Certificate
                          </button>
                        </>
                      )} */}
                      {/* {(app.status === "Confirmed" || app.status === "In Review") && (
  <>
    <input
      type="file"
      accept="application/pdf"
      onChange={(e) => handleFileChange(e, app._id, "certificate")}
      className="block w-full text-sm text-gray-700"
    />
    <button
      onClick={() => handleUploadCertificate(app._id)}
      className="px-3 py-1 bg-green-600 text-white rounded w-full text-sm"
    >
      Upload Certificate
    </button>
  </>
)} */}
{(app.status === "Confirmed" || app.status === "In Review") && (
  <>
    <input
      type="file"
      accept="application/pdf"
      onChange={(e) => handleFileChange(e, app._id, "certificate")}
      className="block w-full text-sm text-gray-700"
    />
    <button
      onClick={() => handleUploadCertificate(app._id)}
      className="px-3 py-1 bg-green-600 text-white rounded w-full text-sm"
    >
      Upload Certificate
    </button>
  </>
)}


                      {app.status !== "Pending Confirmation" &&
                        app.status !== "Submitted" &&
                        app.status !== "Confirmed" && (
                          <span className="text-gray-400 text-sm">N/A</span>
                        )}
                    </td>

                    <td className="px-4 py-3 border">
                      {app.correctionComment ? (
                        <span className="text-red-500 text-sm">{app.correctionComment}</span>
                      ) : (
                        <span className="text-gray-400 text-sm">No corrections</span>
                      )}
                    </td>

                    <td className="px-4 py-3 border text-center space-y-1">
                      {app.status !== "Confirmed" && app.status !== "Rejected" && (
                        <button
                          onClick={() => handleReject(app._id)}
                          className="px-3 py-1 bg-red-600 text-white rounded w-full text-sm"
                        >
                          Reject
                        </button>
                      )}
                      {app.status !== "Completed" && app.status !== "Rejected" && (
                        <button
                          onClick={() => handleNextStatus(app._id, app.status)}
                          className="px-3 py-1 bg-indigo-500 text-white rounded w-full text-sm"
                        >
                          Next
                        </button>
                      )}
                    </td>

                    <td className="px-4 py-3 border text-center">
                      {app.user?.mobile ? (
                        <a
                          href={`https://wa.me/91${app.user.mobile}?text=${encodeURIComponent(
                            `Hello ${app.user.name}, regarding your application.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition"
                        >
                          Chat
                        </a>
                      ) : (
                        <span className="text-gray-400 text-sm">No number</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Profile Modal */}
      {showProfileModal && selectedProfile && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-gradient-to-br from-white via-gray-100 to-gray-50 p-6 rounded-3xl shadow-2xl max-w-lg w-full relative transform transition-all duration-300 hover:scale-[1.02]">
            <button
              onClick={() => setShowProfileModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-3xl transition-colors duration-300"
             >
               ×
             </button>
             <h3 className="text-3xl font-extrabold mb-4 text-indigo-700 flex items-center gap-2 animate-slide-in-left">
              👤 User Profile
             </h3>
            <div className="space-y-2 text-gray-700 text-sm">
               <p><strong>Name:</strong> {selectedProfile.name}</p>
               <p><strong>Gender:</strong> {selectedProfile.gender}</p>
              <p><strong>DOB:</strong> {selectedProfile.dob ? new Date(selectedProfile.dob).toLocaleDateString() : "N/A"}</p>
              <p><strong>Caste:</strong> {selectedProfile.caste}</p>
             </div>

             <div className="mt-6">
               <h4 className="text-lg font-semibold mb-2 text-indigo-600">📄 Documents</h4>
              <div className="max-h-56 overflow-y-auto space-y-3">
               {Object.entries(docLabels).map(([key, label]) => {
                  const file = selectedProfile[key];
                   if (!file) return null;
                   const filesArray = Array.isArray(file) ? file : [file];
                  return filesArray.map((f, idx) => (
                     <div
                       key={`${key}-${idx}`}
                       className="flex justify-between items-center border border-gray-200 p-3 rounded-xl bg-white shadow hover:shadow-lg transition-shadow duration-300"
                    >
                      <span className="text-gray-800 font-medium">
                        {label} {filesArray.length > 1 ? `(${idx + 1})` : ""}
                      </span>
                       <div className="flex gap-2">
                       <a
                          href={`${BASE_URL}/api/files/${f.filename || f}`}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="text-blue-600 underline hover:text-blue-800 transition-colors duration-300"
                        >
                          View
                       </a>
                        <button
                           onClick={() => handleDownload(f.filename || f)}
                          className="text-green-600 hover:text-green-800 transition-colors duration-300"
                        >
                           Download
                         </button>
                        <button
                           onClick={() => handleDeleteDoc(key, idx)}
                           className="text-red-600 hover:text-red-800 transition-colors duration-300"
                         >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ));
                })}
               </div>             </div>
           </div>
         </div>
      )}

    </div>
    </div>
   );
 };
     

export default OperatorPanel;
