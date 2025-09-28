
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";
// import { getSocket } from "../socket";



// const BASE_URL = import.meta.env.VITE_BACKEND_URL;
// function AdminPanel() {
//   const { user } = useAuth();
//   const [applications, setApplications] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [services, setServices] = useState([]);
  
//   const [categories, setCategories] = useState([]);

//   const [newService, setNewService] = useState("");
//   const [parentService, setParentService] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [fees, setFees] = useState({
//     SC: 0,
//     ST: 0,
//     OBC: 0,
//     General: 0,
//     Other: 0,
//   });
//    const [platformFee, setPlatformFee] = useState(0); // 🔹 Added for service
//    const [editingService, setEditingService] = useState(null);
//   const [newSubService, setNewSubService] = useState("");
//   const [editingSubService, setEditingSubService] = useState(null);
  
//   const [subFees, setSubFees] = useState({
//     SC: 0,
//     ST: 0,
//     OBC: 0,
//     General: 0,
//     Other: 0,
//   });

//   const [subPlatformFee, setSubPlatformFee] = useState(0); // 🔹 Added for subservice
//   const [newCategory, setNewCategory] = useState("");
//   const [newNoticeUrl, setNewNoticeUrl] = useState(""); 
//   const [notices, setNotices] = useState([]);
  
//   const [newNotice, setNewNotice] = useState("");
//   const [editedNotice, setEditedNotice] = useState("");
//   const [editingNoticeId, setEditingNoticeId] = useState(null);
//   const [selectedTab, setSelectedTab] = useState("applications");
//   const [statusFilter, setStatusFilter] = useState("All");
  
//   const [certificateFiles, setCertificateFiles] = useState({});
//   const [heroTitle, setHeroTitle] = useState("");
//   const [heroSubtitle, setHeroSubtitle] = useState("");
//   const [heroImage, setHeroImage] = useState(null);
//   const [heroSlides, setHeroSlides] = useState([]);


//   const authHeaders = user?.token ? { Authorization: `Bearer ${user.token}` } : {};

//   // count helper
//   const countByStatus = (status) => {
//     if (status === "All") return applications.length;
//     return applications.filter(
//       (app) => app.status?.toLowerCase() === status.toLowerCase()
//     ).length;
//   };

//   const filteredApplications =
//     statusFilter === "All"
//       ? applications
//       : applications.filter((app) => app.status === statusFilter);


     

// useEffect(() => {
//   const socket = getSocket();
//   if (!socket) return;

//   const handleCreated = (service) => {
//     setServices(prev => [...prev, service]);
//   };
//   const handleUpdated = (service) => {
//     setServices(prev => prev.map(s => s._id === service._id ? service : s));
//   };
//   const handleDeleted = ({ id }) => {
//     setServices(prev => prev.filter(s => s._id !== id));
//   };
 

//   socket.on("services:created", handleCreated);
//   socket.on("services:updated", handleUpdated);
//   socket.on("services:deleted", handleDeleted);
 


//   return () => {
//     socket.off("services:created", handleCreated);
//     socket.off("services:updated", handleUpdated);
//     socket.off("services:deleted", handleDeleted);
    
//   };
// }, []);

//   // ---------- initial fetch ----------
//   useEffect(() => {
//     if (!user?.token) return;

//     const fetchData = async () => {
//       try {
//         // NOTE: order here must match destructuring below
//         const [
//           appRes,
//           userRes,
//           serviceRes,
//           catRes,
//           noticeRes,
//         ] = await Promise.all([
//           axios.get(`${BASE_URL}/api/applications`, { headers: authHeaders }),
//           axios.get(`${BASE_URL}/api/users`, { headers: authHeaders }),
//           axios.get(`${BASE_URL}/api/services`, { headers: authHeaders }),
//           axios.get(`${BASE_URL}/api/categories`, { headers: authHeaders }),
//           axios.get(`${BASE_URL}/api/notices`, { headers: authHeaders }),
//         ]);

//         setApplications(Array.isArray(appRes.data) ? appRes.data.reverse() : []);
//         setUsers(userRes.data || []);
//         setServices(serviceRes.data || []);
//         setCategories(catRes.data || []);
//         setNotices(noticeRes.data || []);
//       } catch (err) {
//         console.error("Admin data fetch error:", err);
//       }
//     };

//     fetchData();
//     fetchHeroSlides();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   },  [user?.token] ) ;


// const handleDeleteCategory = async (id) => {
//   if (!window.confirm("Delete this category?")) return;
//   try {
//     await axios.delete(`${BASE_URL}/api/categories/${id}`, { headers: authHeaders });
//     setCategories(prev => prev.filter(c => c._id !== id));
//   } catch (err) {
//     console.error("Failed to delete category", err);
//     alert("Failed to delete category");
//   }
// };


//   const handleAddOrUpdateService = async () => {
//     if (!newService.trim()) return alert("Enter service name");

//     const payload = {
//       name: newService.trim(),
//       category: selectedCategory || null,
//       parentService: parentService || null,
//       fees,
//       platformFee, // 🔹 Added
//     };

//     try {
//       if (editingService) {
//         const res = await axios.put(
//           `${BASE_URL}/api/services/${editingService._id}`,
//           payload,
//           { headers: authHeaders }
//         );
//         setServices((prev) => prev.map((s) => (s._id === editingService._id ? res.data : s)));
//       } else {
//         const res = await axios.post(`${BASE_URL}/api/services`, payload, { headers: authHeaders });
//         setServices((prev) => [...prev, res.data]);
//       }
//       resetServiceForm();
//     } catch (err) {
//       console.error("Failed to save service", err);
//       alert("Failed to save service");
//     }
//   };

//   // ====== Delete Service ======
//   const handleDeleteService = async (id) => {
//     if (!window.confirm("Delete this service?")) return;
//     try {
//       await axios.delete(`${BASE_URL}/api/services/${id}`, { headers: authHeaders });
//       setServices(prev => prev.filter(s => s._id !== id));
//     } catch (err) {
//       console.error("Delete failed", err);
//     }
//   };




//   const handleEditClick = (service) => {
//     setNewService(service.name);
//     setSelectedCategory(service.category?._id || service.category || "");
//     setParentService(service.parentService?._id || service.parentService || "");
//     setFees(service.fees || { SC: 0, ST: 0, OBC: 0, General: 0, Other: 0 });
//     setPlatformFee(service.platformFee || 0); // 🔹 Added
//     setEditingService(service);
//   };




//   const handleAddOrUpdateSubService = async (serviceId) => {
//     if (!newSubService.trim()) return alert("Enter subservice name");

//     const payload = {
//       name: newSubService.trim(),
//       fees: subFees,
//       platformFee: subPlatformFee, // 🔹 Added
//     };

//     try {
//       let res;
//       if (editingSubService) {
//         res = await axios.put(
//           `${BASE_URL}/api/services/${serviceId}/subservices/${editingSubService._id}`,
//           payload,
//           { headers: authHeaders }
//         );
//       } else {
//         res = await axios.put(
//           `${BASE_URL}/api/services/${serviceId}/subservices`,
//           payload,
//           { headers: authHeaders }
//         );
//       }

//       setServices((prev) => prev.map((s) => (s._id === serviceId ? res.data : s)));
//       resetSubServiceForm();
//     } catch (err) {
//       console.error("Failed to add/update subservice", err);
//     }
//   };


//   // ====== Edit Subservice Click ======

//   const handleEditSubClick = (sub) => {
//     setNewSubService(sub.name);
//     setSubFees(sub.fees || { SC: 0, ST: 0, OBC: 0, General: 0, Other: 0 });
//     setSubPlatformFee(sub.platformFee || 0); // 🔹 Added
//     setEditingSubService(sub);
//   };

//   // ====== Delete Subservice ======
//   const handleDeleteSubService = async (serviceId, subId) => {
//     if (!window.confirm("Delete this subservice?")) return;
//     try {
//       const res = await axios.delete(
//         `${BASE_URL}/api/services/${serviceId}/subservices/${subId}`,
//         { headers: authHeaders }
//       );
//       setServices(prev => prev.map(s => s._id === serviceId ? res.data : s));
//     } catch (err) {
//       console.error("Delete subservice failed", err);
//     }
//   };


//   // ====== Add Category ======
//   const handleAddCategory = async () => {
//     if (!newCategory.trim()) return;
//     try {
//       const res = await axios.post(`${BASE_URL}/api/categories`, { name: newCategory }, { headers: authHeaders });
//       setCategories(prev => [...prev, res.data]);
//       setNewCategory("");
//     } catch (err) {
//       console.error("Failed to add category", err);
//     }
//   };

//   // ====== Reset Forms ======


//   const resetServiceForm = () => {
//     setNewService("");
//     setSelectedCategory("");
//     setParentService("");
//     setFees({ SC: 0, ST: 0, OBC: 0, General: 0, Other: 0 });
//     setPlatformFee(0); // 🔹 Reset
//     setEditingService(null);
//   };




// const resetSubServiceForm = () => {
//     setNewSubService("");
//     setSubFees({ SC: 0, ST: 0, OBC: 0, General: 0, Other: 0 });
//     setSubPlatformFee(0); // 🔹 Reset
//     setEditingSubService(null);
//   };

//   const fetchHeroSlides = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/api/heroslides`);
//       setHeroSlides(res.data || []);
//     } catch (err) {
//       console.error("Failed to fetch hero slides", err);
//     }
//   };

 

//   // ---------- certificate upload ----------
//   const handleCertificateFileSelect = (appId, file) => {
//     setCertificateFiles((prev) => ({ ...prev, [appId]: file }));
//   };

//   const handleCertificateUpload = async (e, appId) => {
//     e.preventDefault();
//     const file = certificateFiles[appId];
//     if (!file) return alert("Please select a certificate file");
//     const formData = new FormData();
//     formData.append("certificate", file);
//     try {
//       await axios.put(`${BASE_URL}/api/applications/${appId}/certificate`, formData, {
//         headers: { ...authHeaders, "Content-Type": "multipart/form-data" },
//       });
//       alert("Certificate uploaded successfully!");
//       const appRes = await axios.get(`${BASE_URL}/api/applications`, { headers: authHeaders });
//       setApplications(Array.isArray(appRes.data) ? appRes.data.reverse() : []);
//       setCertificateFiles((prev) => {
//         const copy = { ...prev };
//         delete copy[appId];
//         return copy;
//       });
//     } catch (err) {
//       console.error("Certificate upload failed:", err);
//       alert("Certificate upload failed");
//     }
//   };

//   // ---------- hero upload/delete ----------
//   const handleHeroUpload = async (e) => {
//     e.preventDefault();
//     if (!heroTitle.trim() || !heroSubtitle.trim() || !heroImage) return alert("Please fill all fields");
//     const formData = new FormData();
//     formData.append("title", heroTitle);
//     formData.append("subtitle", heroSubtitle);
//     formData.append("image", heroImage);
//     try {
//       await axios.post(`${BASE_URL}/api/heroslides`, formData, {
//         headers: { ...authHeaders, "Content-Type": "multipart/form-data" },
//       });
//       alert("Hero banner uploaded successfully!");
//       setHeroTitle("");
//       setHeroSubtitle("");
//       setHeroImage(null);
//       fetchHeroSlides();
//     } catch (err) {
//       console.error("Hero upload failed:", err);
//       alert("Hero upload failed");
//     }
//   };

//   const handleHeroDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this slide?")) return;
//     try {
//       await axios.delete(`${BASE_URL}/api/heroslides/${id}`, { headers: authHeaders });
//       fetchHeroSlides();
//     } catch (err) {
//       console.error("Delete failed", err);
//       alert("Failed to delete banner");
//     }
//   };

//     // ---------- delete user ----------
//   const handleDeleteUser = async (userId) => {
//     if (!window.confirm("Are you sure you want to delete this user?")) return;
//     try {
//       await axios.delete(`${BASE_URL}/api/users/${userId}`, { headers: authHeaders });
//       setUsers((prev) => prev.filter((u) => u._id !== userId));
//       alert("User deleted successfully!");
//     } catch (err) {
//       console.error("User delete failed:", err);
//       alert("Failed to delete user");
//     }
//   };




// const handleAddNotice = async () => {
//   try {
//     const res = await axios.post(`${BASE_URL}/api/notices`,
//       { title: newNotice, url: newNoticeUrl }, // 🔹 URL पाठवलं
//       { headers: authHeaders }
//     );
//     setNotices((prev) => [...prev, res.data]);
//     setNewNotice("");
//     setNewNoticeUrl(""); // 🔹 Reset
//   } catch (err) {
//     console.error("Error adding notice", err);
//     alert("Failed to add notice");
//   }
// };
//   const handleDeleteNotice = async (id) => {
//     try {
//       await axios.delete(`${BASE_URL}/api/notices/${id}`, { headers: authHeaders });
//       setNotices((prev) => prev.filter((n) => n._id !== id));
//     } catch (err) {
//       console.error("Error deleting notice", err);
//       alert("Failed to delete notice");
//     }
//   };

//   const handleSaveEdit = async (id) => {
//     try {
//       const res = await axios.put(`${BASE_URL}/api/notices/${id}`, { title: editedNotice }, { headers: authHeaders });
//       setNotices((prev) => prev.map((n) => (n._id === id ? { ...n, title: res.data.title } : n)));
//       setEditingNoticeId(null);
//       setEditedNotice("");
//     } catch (err) {
//       console.error("Error updating notice", err);
//       alert("Failed to update notice");
//     }
//   };

//   // ---------- users / roles ----------
//   const handleRoleChange = async (userId, newRole) => {
//     try {
//       await axios.put(`${BASE_URL}/api/users/${userId}/role`, { role: newRole }, { headers: authHeaders });
//       alert("Role updated successfully!");
//       const res = await axios.get(`${BASE_URL}/api/users`, { headers: authHeaders });
//       setUsers(res.data || []);
//     } catch (err) {
//       console.error("Role update failed", err);
//       alert("Role update failed");
//     }
//   };

//   // ---------- application status ----------
//   const handleStatusUpdate = async (applicationId, newStatus) => {
//     try {
//       await axios.put(`${BASE_URL}/api/applications/${applicationId}/status`, { status: newStatus }, { headers: authHeaders });
//       setApplications((prev) => prev.map((app) => (app._id === applicationId ? { ...app, status: newStatus } : app)));
//     } catch (err) {
//       console.error("Status update failed", err);
//       alert("Status update failed");
//     }
//   };




//   return (
//     <div className="p-4 md:p-6 lg:p-8 xl:p-10 bg-gradient-to-br from-gray-100 via-white to-gray-50 min-h-screen font-sans text-gray-800">
//       <h1 className="text-3xl mt-16 font-bold mb-16 text-center animate-fade-in drop-shadow-lg">Admin Dashboard</h1>

//       <div className="flex space-x-4 mb-6">
//         <button onClick={() => setSelectedTab("applications")} className={`px-4 py-2 rounded ${selectedTab === "applications" ? "bg-blue-700 text-white" : "bg-blue-500 text-white"}`}>Applications</button>
//         <button onClick={() => setSelectedTab("users")} className={`px-4 py-2 rounded ${selectedTab === "users" ? "bg-green-700 text-white" : "bg-green-500 text-white"}`}>Users</button>
//         <button onClick={() => setSelectedTab("services")} className={`px-4 py-2 rounded ${selectedTab === "services" ? "bg-purple-700 text-white" : "bg-purple-500 text-white"}`}>Services</button>
//         <button onClick={() => setSelectedTab("notices")} className={`px-4 py-2 rounded ${selectedTab === "notices" ? "bg-orange-700 text-white" : "bg-orange-500 text-white"}`}>Notices</button>
//         <button onClick={() => setSelectedTab("banners")} className={`px-4 py-2 rounded ${selectedTab === "banners" ? "bg-pink-700 text-white" : "bg-pink-500 text-white"}`}>Banner</button>
//       </div>

//       {/* Tabs content */}
//       {selectedTab === "banners" && (
       
//          <div>
//           <h2 className="text-xl font-semibold mb-4">Upload Hero Banner</h2>
//           <form onSubmit={handleHeroUpload} className="space-y-4 max-w-md">
//             <input type="text" placeholder="Title" value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} className="w-full px-4 py-2 border rounded" />
//             <input type="text" placeholder="Subtitle" value={heroSubtitle} onChange={(e) => setHeroSubtitle(e.target.value)} className="w-full px-4 py-2 border rounded" />
//             <input type="file" accept="image/*" onChange={(e) => setHeroImage(e.target.files[0])} className="w-full" required />
//             <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded">Upload Banner</button>
//           </form>

//           <h3 className="text-lg font-medium mt-8 mb-4">Uploaded Banners</h3>
//           <div className="grid md:grid-cols-2 gap-4">
//             {heroSlides.map((slide) => (
//               <div key={slide._id} className="border rounded overflow-hidden shadow relative">
// <img
//             src={`${BASE_URL}/api/files/${slide.image?.filename}`}
//             alt={slide.title}
//             className="w-full h-[180px] object-cover"
//           />
//                 <div className="p-3">
//                   <h4 className="font-bold text-lg">{slide.title}</h4>
//                   <p className="text-sm">{slide.subtitle}</p>
//                 </div>
//                 <button onClick={() => handleHeroDelete(slide._id)} className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded">Delete</button>
//               </div>
//             ))}
//           </div>
//         </div>
       
//       )}

      
// {selectedTab === "notices" && (
//   <div>
//     <h2 className="text-xl font-semibold mb-4">Manage Notices</h2>

//     <div className="mb-6 space-y-2">
//       <input
//         type="text"
//         placeholder="Enter notice title"
//         value={newNotice}
//         onChange={(e) => setNewNotice(e.target.value)}
//         className="border px-2 py-1 rounded w-full text-black"
//       />
//       <input
//         type="text"
//         placeholder="Enter URL (optional)"
//         value={newNoticeUrl}
//         onChange={(e) => setNewNoticeUrl(e.target.value)}
//         className="border px-2 py-1 rounded w-full text-black"
//       />
//       <button
//         onClick={handleAddNotice}
//         className="bg-orange-600 text-white px-4 py-2 rounded"
//       >
//         Add Notice
//       </button>
//     </div>

//     <ul className="space-y-3">
//       {notices.length === 0 ? (
//         <p className="text-gray-500">No notices available.</p>
//       ) : (
//         notices.map((notice) => (
//           <li
//             key={notice._id}
//             className="flex items-center justify-between bg-gray-100 p-3 rounded shadow"
//           >
//             {editingNoticeId === notice._id ? (
//               <div className="flex flex-col gap-2 w-full">
//                 <input
//                   type="text"
//                   value={editedNotice}
//                   onChange={(e) => setEditedNotice(e.target.value)}
//                   className="border px-2 py-1 rounded text-black"
//                   placeholder="Edit notice title"
//                 />
//                 <input
//                   type="text"
//                   value={newNoticeUrl}
//                   onChange={(e) => setNewNoticeUrl(e.target.value)}
//                   className="border px-2 py-1 rounded text-black"
//                   placeholder="Edit URL"
//                 />
//                 <button
//                   onClick={() => handleSaveEdit(notice._id)}
//                   className="bg-green-600 text-white px-2 py-1 rounded"
//                 >
//                   Save
//                 </button>
//               </div>
//             ) : notice.url ? (
//               <a
//                 href={notice.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-600 underline flex-1"
//               >
//                 {notice.title || notice.url}
//               </a>
//             ) : (
//               <span className="text-gray-800 flex-1">
//                 {notice.title || "No title"}
//               </span>
//             )}
//             {editingNoticeId !== notice._id && (
//               <div className="flex gap-2 ml-2">
//                 <button
//                   onClick={() => {
//                     setEditingNoticeId(notice._id);
//                     setEditedNotice(notice.title);
//                     setNewNoticeUrl(notice.url || "");
//                   }}
//                   className="bg-yellow-500 text-white px-2 py-1 rounded"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDeleteNotice(notice._id)}
//                   className="bg-red-600 text-white px-2 py-1 rounded"
//                 >
//                   Delete
//                 </button>
//               </div>
//             )}
//           </li>
//         ))
//       )}
//     </ul>
//   </div>
// )}

//       {selectedTab === "applications" && (
//         <div>
//           <h2 className="text-xl font-semibold mb-4">Applications</h2>

//           <div className="flex gap-3 mb-4 flex-wrap">
//             {["All", "Submitted", "Pending Confirmation", "In Review", "Confirmed", "Completed", "Rejected"].map((status) => (
//               <button key={status} onClick={() => setStatusFilter(status)} className={`px-3 py-1 rounded border ${statusFilter === status ? "bg-blue-600 text-white" : "bg-white text-blue-600 border-blue-600"}`}>
//                 {status} ({countByStatus(status)})
//               </button>
//             ))}
//           </div>

//           {filteredApplications.length === 0 ? (
//             <p>No applications found.</p>
//           ) : (
//             <div className="space-y-4">
//               {filteredApplications.map((app) => (
//                 <div key={app._id} className="border rounded p-4 shadow bg-white">
//                   <p><b>User:</b> {app.user?.name || "N/A"} ({app.user?.mobile || "N/A"})</p>
//                   <p><b>Service:</b> {app.service?.name || "N/A"}</p>
//                   <p>
//                     <b>Status:</b>{" "}
//                     <select value={app.status} onChange={(e) => handleStatusUpdate(app._id, e.target.value)} className="ml-2 border rounded px-2 py-1">
//                     <option value="Submitted">Submitted</option>
//                       <option value="In Review">In Review</option>
//                       <option value="Confirmed">Confirmed</option>
//                       <option value="Completed">Completed</option>
//                       <option value="Rejected">Rejected</option>
//                       <option value="Pending Confirmation">Pending Confirmation</option>
//                     </select>
//                   </p>
//                   <p><b>Submitted At:</b> {new Date(app.createdAt).toLocaleString()}</p>

//                   {app.status === "Completed" && (
//                     <div className="mt-2">
//                       <form onSubmit={(e) => handleCertificateUpload(e, app._id)} className="flex items-center gap-2">
//                         <input type="file" accept="application/pdf,image/*" onChange={(e) => handleCertificateFileSelect(app._id, e.target.files[0])} className="border rounded px-2 py-1" />
//                         <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded">Upload Certificate</button>
//                       </form>

//                       {app.certificateUrl && (
//                         <a href={`http://localhost:5000${app.certificateUrl}`} target="_blank" rel="noreferrer" className="text-blue-500 underline mt-1 block">View Certificate</a>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}

  
//             {selectedTab === "users" && (
//          <div>
//           <h2 className="text-xl font-semibold mb-2">All Users</h2>
//           {users.length === 0 ? (
//             <p>No users found.</p>
//           ) : (
//             <ul className="space-y-2">
//               {users.map((u) => (
//                 <li key={u._id} className="border rounded p-2 flex justify-between items-center">
//                   <div>
//                     <p><b>Name:</b> {u.name}</p>
//                     <p><b>Mobile:</b> {u.mobile}</p>
//                     <p>
//                       <b>Role:</b>{" "}
//                       <select
//                         value={u.role}
//                         onChange={(e) => handleRoleChange(u._id, e.target.value)}
//                         className="ml-2 border rounded"
//                       >
//                         <option value="user">user</option>
//                         <option value="operator">operator</option>
//                         <option value="admin">admin</option>
//                       </select>
//                     </p>
//                   </div>
//                   <button
//                     onClick={() => handleDeleteUser(u._id)}
//                     className="bg-red-600 text-white px-3 py-1 rounded"
//                   >
//                     Delete
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       )}


      


//       {selectedTab === "services" && (
//   <div className="p-6">
//     <h2 className="text-2xl font-bold mb-4">Admin Panel – Manage Services</h2>

//     {/* Category Add */}
//     {/* <div className="border p-4 rounded mb-4">
//       <h3 className="font-bold mb-2">Add Category</h3>
//       <input
//         type="text"
//         placeholder="Category name"
//         value={newCategory}
//         onChange={(e) => setNewCategory(e.target.value)}
//         className="border px-2 py-1 rounded w-full mb-2"
//       />
//       <button onClick={handleAddCategory} className="bg-green-600 text-white px-4 py-2 rounded">
//         Add Category
//       </button>
//     </div> */}
// <div className="border p-4 rounded mb-4">
//   <h3 className="font-bold mb-2">Add Category</h3>
//   <input
//     type="text"
//     placeholder="Category name"
//     value={newCategory}
//     onChange={(e) => setNewCategory(e.target.value)}
//     className="border px-2 py-1 rounded w-full mb-2"
//   />
//   <button onClick={handleAddCategory} className="bg-green-600 text-white px-4 py-2 rounded">
//     Add Category
//   </button>

//   <ul className="mt-4 space-y-2">
//     {categories.map(cat => (
//       <li key={cat._id} className="flex justify-between items-center border px-2 py-1 rounded">
//         <span>{cat.name}</span>
//         <button
//           onClick={() => handleDeleteCategory(cat._id)}
//           className="bg-red-600 text-white px-2 py-1 rounded text-sm"
//         >
//           Delete
//         </button>
//       </li>
//     ))}
//   </ul>
// </div>

//     {/* Service Add/Edit */}
//     <div className="border p-4 rounded mb-4">
//       <h3 className="font-bold mb-2">Add / Edit Service</h3>
//       <input
//         type="text"
//         placeholder="Service name"
//         value={newService}
//         onChange={(e) => setNewService(e.target.value)}
//         className="border px-2 py-1 rounded w-full mb-2"
//       />

//       <select
//         value={selectedCategory}
//         onChange={(e) => setSelectedCategory(e.target.value)}
//         className="border px-2 py-1 rounded w-full mb-2"
//       >
//         <option value="">-- Select Category --</option>
//         {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
//       </select>

//       <select
//         value={parentService}
//         onChange={(e) => setParentService(e.target.value)}
//         className="border px-2 py-1 rounded w-full mb-3"
//       >
//         <option value="">No parent (Main service)</option>
//         {services.filter(s => !s.parentService).map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
//       </select>

//       {Object.keys(fees).map(cast => (
//         <div key={cast} className="mb-2">
//           <label className="mr-2 font-medium">{cast} Fee:</label>
//           <input
//             type="number"
//             value={fees[cast]}
//             onChange={(e) => setFees({ ...fees, [cast]: Number(e.target.value) })}
//             className="border px-2 py-1 rounded w-32"
//           />
//         </div>
//       ))}

//       {/* 🔹 Service Platform Fee */}
//       <div className="mb-3">
//         <label className="mr-2 font-medium">Platform Fee:</label>
//         <input
//           type="number"
//           value={platformFee}
//           onChange={(e) => setPlatformFee(Number(e.target.value))}
//           className="border px-2 py-1 rounded w-32"
//         />
//       </div>

//       <div className="flex gap-2 mt-3">
//         <button onClick={handleAddOrUpdateService} className="bg-purple-600 text-white px-4 py-2 rounded">
//           {editingService ? "Update Service" : "Add Service"}
//         </button>
//         <button onClick={resetServiceForm} className="bg-gray-300 px-4 py-2 rounded">Reset</button>
//       </div>
//     </div>

//     {/* Service List */}
//     <ul className="space-y-4">
//       {services.map(srv => (
//         <li key={srv._id} className="border p-3 rounded">
//           <p className="font-bold">{srv.name}</p>
//           <p className="text-sm text-gray-600">Platform Fee: ₹{srv.platformFee || 0}</p> {/* 🔹 Show platformFee */}

//           <div className="ml-4 mt-2">
//             <h4 className="font-semibold">Subservices:</h4>
//             <ul>
//               {(srv.subservices || []).map(ss => (
//                 <li key={ss._id} className="ml-2 flex justify-between items-center">
//                   <div>
//                     {ss.name} — {Object.entries(ss.fees || {}).map(([cast, fee]) => `${cast}: ₹${fee}`).join(", ")}
//                     {" | "} Platform Fee: ₹{ss.platformFee || 0} {/* 🔹 Show subservice platformFee */}
//                   </div>
//                   <div className="flex gap-2">
//                     <button onClick={() => handleEditSubClick(ss)} className="text-blue-600">Edit</button>
//                     <button onClick={() => handleDeleteSubService(srv._id, ss._id)} className="text-red-600">Delete</button>
//                   </div>
//                 </li>
//               ))}
//             </ul>

//             <div className="mt-2">
//               <input
//                 type="text"
//                 placeholder="Subservice name"
//                 value={newSubService}
//                 onChange={(e) => setNewSubService(e.target.value)}
//                 className="border px-2 py-1 rounded mb-2 w-full"
//               />
//               {Object.keys(subFees).map(cast => (
//                 <div key={cast} className="mb-2">
//                   <label className="mr-2 font-medium">{cast} Fee:</label>
//                   <input
//                     type="number"
//                     value={subFees[cast]}
//                     onChange={(e) => setSubFees({ ...subFees, [cast]: Number(e.target.value) })}
//                     className="border px-2 py-1 rounded w-32"
//                   />
//                 </div>
//               ))}

//               {/* 🔹 Subservice Platform Fee */}
//               <div className="mb-3">
//                 <label className="mr-2 font-medium">Platform Fee:</label>
//                 <input
//                   type="number"
//                   value={subPlatformFee}
//                   onChange={(e) => setSubPlatformFee(Number(e.target.value))}
//                   className="border px-2 py-1 rounded w-32"
//                 />
//               </div>

//               <button
//                 onClick={() => handleAddOrUpdateSubService(srv._id)}
//                 className="bg-blue-600 text-white px-3 py-1 rounded"
//               >
//                 {editingSubService ? "Update Subservice" : "Add Subservice"}
//               </button>
//             </div>
//           </div>

//           <div className="mt-3 flex gap-2">
//             <button onClick={() => handleEditClick(srv)} className="text-blue-600">Edit</button>
//             <button onClick={() => handleDeleteService(srv._id)} className="text-red-600">Delete</button>
//           </div>
//         </li>
//       ))}
//     </ul>
//   </div>
// )}



      
//     </div>
//   );
// };

// export default AdminPanel;

















// AdminPanel.jsx
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";
// import { getSocket } from "../socket";

// const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// function AdminPanel() {
//   const { user } = useAuth();
//   const [applications, setApplications] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [services, setServices] = useState([]);
//   const [categories, setCategories] = useState([]);

//   const [newService, setNewService] = useState("");
//   const [parentService, setParentService] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [fees, setFees] = useState({
//     SC: 0,
//     ST: 0,
//     OBC: 0,
//     General: 0,
//     Other: 0,
//   });
//   const [platformFee, setPlatformFee] = useState(0);

//   const [editingService, setEditingService] = useState(null);
//   const [newSubService, setNewSubService] = useState("");
//   const [editingSubService, setEditingSubService] = useState(null);

//   const [subFees, setSubFees] = useState({
//     SC: 0,
//     ST: 0,
//     OBC: 0,
//     General: 0,
//     Other: 0,
//   });
//   const [subPlatformFee, setSubPlatformFee] = useState(0);

//   const [newCategory, setNewCategory] = useState("");
//   const [newNoticeUrl, setNewNoticeUrl] = useState("");
//   const [notices, setNotices] = useState([]);

//   const [newNotice, setNewNotice] = useState("");
//   const [editedNotice, setEditedNotice] = useState("");
//   const [editingNoticeId, setEditingNoticeId] = useState(null);

//   const [selectedTab, setSelectedTab] = useState("applications");
//   const [statusFilter, setStatusFilter] = useState("All");

//   const [certificateFiles, setCertificateFiles] = useState({});
//   const [heroTitle, setHeroTitle] = useState("");
//   const [heroSubtitle, setHeroSubtitle] = useState("");
//   const [heroImage, setHeroImage] = useState(null);
//   const [heroSlides, setHeroSlides] = useState([]);

//   // compute auth headers on-demand so token changes propagate
//   const getAuthHeaders = () =>
//     user?.token ? { Authorization: `Bearer ${user.token}` } : {};

//   // ---------- helper: count ----------
//   const countByStatus = (status) => {
//     if (status === "All") return applications.length;
//     return applications.filter(
//       (app) => (app.status || "").toLowerCase() === status.toLowerCase()
//     ).length;
//   };

//   const filteredApplications =
//     statusFilter === "All"
//       ? applications
//       : applications.filter((app) => app.status === statusFilter);

//   // ---------- socket for services + applications ----------
//   useEffect(() => {
//     const socket = getSocket();
//     if (!socket) return;

//     // services events (existing)
//     const handleServiceCreated = (service) => {
//       setServices((prev) => [...prev, service]);
//     };
//     const handleServiceUpdated = (service) => {
//       setServices((prev) => prev.map((s) => (s._id === service._id ? service : s)));
//     };
//     const handleServiceDeleted = ({ id }) => {
//       setServices((prev) => prev.filter((s) => s._id !== id));
//     };

//     socket.on("services:created", handleServiceCreated);
//     socket.on("services:updated", handleServiceUpdated);
//     socket.on("services:deleted", handleServiceDeleted);

//     // applications events (added — similar to OperatorPanel)
//     const handleAppCreated = (newApp) => {
//       setApplications((prev) => {
//         const exists = prev.find((a) => a._id === newApp._id);
//         if (exists) return prev.map((a) => (a._id === newApp._id ? newApp : a));
//         return [newApp, ...prev];
//       });
//     };
//     const handleAppUpdated = (updatedApp) => {
//       setApplications((prev) => prev.map((a) => (a._id === updatedApp._id ? updatedApp : a)));
//     };

//     const handleAppStatusUpdated = (updatedApp) => {
//       setApplications((prev) => prev.map((a) => (a._id === updatedApp._id ? updatedApp : a)));
//     };

//     socket.on("applicationCreated", handleAppCreated);
//     socket.on("applicationUpdated", handleAppUpdated);
//     socket.on("applicationStatusUpdated", handleAppStatusUpdated);
//     socket.on("certificateUploaded", handleAppUpdated);
//     socket.on("correctionSent", handleAppUpdated);

//     return () => {
//       socket.off("services:created", handleServiceCreated);
//       socket.off("services:updated", handleServiceUpdated);
//       socket.off("services:deleted", handleServiceDeleted);

//       socket.off("applicationCreated", handleAppCreated);
//       socket.off("applicationUpdated", handleAppUpdated);
//       socket.off("applicationStatusUpdated", handleAppStatusUpdated);
//       socket.off("certificateUploaded", handleAppUpdated);
//       socket.off("correctionSent", handleAppUpdated);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // ---------- initial fetch ----------
//   useEffect(() => {
//     if (!user?.token) return;

//     const fetchData = async () => {
//       try {
//         // fetch applications first (we have a dedicated function)
//         await fetchApplications();

//         const [userRes, serviceRes, catRes, noticeRes] = await Promise.all([
//           axios.get(`${BASE_URL}/api/users`, { headers: getAuthHeaders() }),
//           axios.get(`${BASE_URL}/api/services`, { headers: getAuthHeaders() }),
//           axios.get(`${BASE_URL}/api/categories`, { headers: getAuthHeaders() }),
//           axios.get(`${BASE_URL}/api/notices`, { headers: getAuthHeaders() }),
//         ]);

//         setUsers(userRes.data || []);
//         setServices(serviceRes.data || []);
//         setCategories(catRes.data || []);
//         setNotices(noticeRes.data || []);
//       } catch (err) {
//         console.error("Admin data fetch error:", err);
//       }
//     };

//     fetchData();
//     fetchHeroSlides();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [user?.token]);

//   // ---------- fetchApplications (shared logic) ----------
//   const fetchApplications = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/api/applications`, {
//         headers: getAuthHeaders(),
//       });
//       const apps = Array.isArray(res.data) ? res.data.reverse() : [];
//       setApplications(apps);
//     } catch (err) {
//       console.error("Error fetching applications:", err);
//     }
//   };

//   // ---------- category delete ----------
//   const handleDeleteCategory = async (id) => {
//     if (!window.confirm("Delete this category?")) return;

//     try {
//       await axios.delete(`${BASE_URL}/api/categories/${id}`, { headers: getAuthHeaders() });
//       setCategories((prev) => prev.filter((c) => c._id !== id));
//     } catch (err) {
//       console.error("Failed to delete category", err);
//       alert("Failed to delete category");
//     }
//   };

//   // ---------- services add/update/delete ----------
//   const handleAddOrUpdateService = async () => {
//     if (!newService.trim()) return alert("Enter service name");

//     const payload = {
//       name: newService.trim(),
//       category: selectedCategory || null,
//       parentService: parentService || null,
//       fees,
//       platformFee,
//     };

//     try {
//       if (editingService) {
//         const res = await axios.put(
//           `${BASE_URL}/api/services/${editingService._id}`,
//           payload,
//           { headers: getAuthHeaders() }
//         );
//         setServices((prev) => prev.map((s) => (s._id === editingService._id ? res.data : s)));
//       } else {
//         const res = await axios.post(`${BASE_URL}/api/services`, payload, {
//           headers: getAuthHeaders(),
//         });
//         setServices((prev) => [...prev, res.data]);
//       }
//       resetServiceForm();
//     } catch (err) {
//       console.error("Failed to save service", err);
//       alert("Failed to save service");
//     }
//   };

//   const handleDeleteService = async (id) => {
//     if (!window.confirm("Delete this service?")) return;
//     try {
//       await axios.delete(`${BASE_URL}/api/services/${id}`, { headers: getAuthHeaders() });
//       setServices((prev) => prev.filter((s) => s._id !== id));
//     } catch (err) {
//       console.error("Delete failed", err);
//     }
//   };

//   const handleEditClick = (service) => {
//     setNewService(service.name);
//     setSelectedCategory(service.category?._id || service.category || "");
//     setParentService(service.parentService?._id || service.parentService || "");
//     setFees(service.fees || { SC: 0, ST: 0, OBC: 0, General: 0, Other: 0 });
//     setPlatformFee(service.platformFee || 0);
//     setEditingService(service);
//   };

//   const handleAddOrUpdateSubService = async (serviceId) => {
//     if (!newSubService.trim()) return alert("Enter subservice name");

//     const payload = {
//       name: newSubService.trim(),
//       fees: subFees,
//       platformFee: subPlatformFee,
//     };

//     try {
//       let res;
//       if (editingSubService) {
//         res = await axios.put(
//           `${BASE_URL}/api/services/${serviceId}/subservices/${editingSubService._id}`,
//           payload,
//           { headers: getAuthHeaders() }
//         );
//       } else {
//         res = await axios.put(`${BASE_URL}/api/services/${serviceId}/subservices`, payload, {
//           headers: getAuthHeaders(),
//         });
//       }

//       setServices((prev) => prev.map((s) => (s._id === serviceId ? res.data : s)));
//       resetSubServiceForm();
//     } catch (err) {
//       console.error("Failed to add/update subservice", err);
//     }
//   };

//   const handleEditSubClick = (sub) => {
//     setNewSubService(sub.name);
//     setSubFees(sub.fees || { SC: 0, ST: 0, OBC: 0, General: 0, Other: 0 });
//     setSubPlatformFee(sub.platformFee || 0);
//     setEditingSubService(sub);
//   };

//   const handleDeleteSubService = async (serviceId, subId) => {
//     if (!window.confirm("Delete this subservice?")) return;
//     try {
//       const res = await axios.delete(
//         `${BASE_URL}/api/services/${serviceId}/subservices/${subId}`,
//         { headers: getAuthHeaders() }
//       );
//       setServices((prev) => prev.map((s) => (s._id === serviceId ? res.data : s)));
//     } catch (err) {
//       console.error("Delete subservice failed", err);
//     }
//   };

//   // ---------- categories ----------
//   const handleAddCategory = async () => {
//     if (!newCategory.trim()) return;
//     try {
//       const res = await axios.post(
//         `${BASE_URL}/api/categories`,
//         { name: newCategory },
//         { headers: getAuthHeaders() }
//       );
//       setCategories((prev) => [...prev, res.data]);
//       setNewCategory("");
//     } catch (err) {
//       console.error("Failed to add category", err);
//     }
//   };

//   const resetServiceForm = () => {
//     setNewService("");
//     setSelectedCategory("");
//     setParentService("");
//     setFees({ SC: 0, ST: 0, OBC: 0, General: 0, Other: 0 });
//     setPlatformFee(0);
//     setEditingService(null);
//   };

//   const resetSubServiceForm = () => {
//     setNewSubService("");
//     setSubFees({ SC: 0, ST: 0, OBC: 0, General: 0, Other: 0 });
//     setSubPlatformFee(0);
//     setEditingSubService(null);
//   };

//   const fetchHeroSlides = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/api/heroslides`);
//       setHeroSlides(res.data || []);
//     } catch (err) {
//       console.error("Failed to fetch hero slides", err);
//     }
//   };

//   // ---------- certificate upload ----------
//   const handleCertificateFileSelect = (appId, file) => {
//     setCertificateFiles((prev) => ({ ...prev, [appId]: file }));
//   };

//   const handleCertificateUpload = async (e, appId) => {
//     e.preventDefault();
//     const file = certificateFiles[appId];
//     if (!file) return alert("Please select a certificate file");
//     const formData = new FormData();
//     formData.append("certificate", file);
//     try {
//       await axios.put(`${BASE_URL}/api/applications/${appId}/certificate`, formData, {
//         headers: { ...getAuthHeaders(), "Content-Type": "multipart/form-data" },
//       });
//       alert("Certificate uploaded successfully!");
//       await fetchApplications();
//       setCertificateFiles((prev) => {
//         const copy = { ...prev };
//         delete copy[appId];
//         return copy;
//       });
//     } catch (err) {
//       console.error("Certificate upload failed:", err);
//       alert("Certificate upload failed");
//     }
//   };

//   // ---------- hero upload/delete ----------
//   const handleHeroUpload = async (e) => {
//     e.preventDefault();
//     if (!heroTitle.trim() || !heroSubtitle.trim() || !heroImage) return alert("Please fill all fields");

//     const formData = new FormData();
//     formData.append("title", heroTitle);
//     formData.append("subtitle", heroSubtitle);
//     formData.append("image", heroImage);
//     try {
//       await axios.post(`${BASE_URL}/api/heroslides`, formData, {
//         headers: { ...getAuthHeaders(), "Content-Type": "multipart/form-data" },
//       });
//       alert("Hero banner uploaded successfully!");
//       setHeroTitle("");
//       setHeroSubtitle("");
//       setHeroImage(null);
//       fetchHeroSlides();
//     } catch (err) {
//       console.error("Hero upload failed:", err);
//       alert("Hero upload failed");
//     }
//   };

//   const handleHeroDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this slide?")) return;
//     try {
//       await axios.delete(`${BASE_URL}/api/heroslides/${id}`, { headers: getAuthHeaders() });
//       fetchHeroSlides();
//     } catch (err) {
//       console.error("Delete failed", err);
//       alert("Failed to delete banner");
//     }
//   };

//   // ---------- users / roles ----------
//   const handleDeleteUser = async (userId) => {
//     if (!window.confirm("Are you sure you want to delete this user?")) return;
//     try {
//       await axios.delete(`${BASE_URL}/api/users/${userId}`, { headers: getAuthHeaders() });
//       setUsers((prev) => prev.filter((u) => u._id !== userId));
//       alert("User deleted successfully!");
//     } catch (err) {
//       console.error("User delete failed", err);
//       alert("Failed to delete user");
//     }
//   };

//   const handleAddNotice = async () => {
//     try {
//       const res = await axios.post(
//         `${BASE_URL}/api/notices`,
//         { title: newNotice, url: newNoticeUrl },
//         { headers: getAuthHeaders() }
//       );
//       setNotices((prev) => [...prev, res.data]);
//       setNewNotice("");
//       setNewNoticeUrl("");
//     } catch (err) {
//       console.error("Error adding notice", err);
//       alert("Failed to add notice");
//     }
//   };

//   const handleDeleteNotice = async (id) => {
//     try {
//       await axios.delete(`${BASE_URL}/api/notices/${id}`, { headers: getAuthHeaders() });
//       setNotices((prev) => prev.filter((n) => n._id !== id));
//     } catch (err) {
//       console.error("Error deleting notice", err);
//       alert("Failed to delete notice");
//     }
//   };

//   const handleSaveEdit = async (id) => {
//     try {
//       const res = await axios.put(
//         `${BASE_URL}/api/notices/${id}`,
//         { title: editedNotice, url: newNoticeUrl },
//         { headers: getAuthHeaders() }
//       );
//       setNotices((prev) => prev.map((n) => (n._id === id ? { ...n, title: res.data.title, url: res.data.url } : n)));
//       setEditingNoticeId(null);
//       setEditedNotice("");
//       setNewNoticeUrl("");
//     } catch (err) {
//       console.error("Error updating notice", err);
//       alert("Failed to update notice");
//     }
//   };

//   const handleRoleChange = async (userId, newRole) => {
//     try {
//       await axios.put(`${BASE_URL}/api/users/${userId}/role`, { role: newRole }, { headers: getAuthHeaders() });
//       alert("Role updated successfully!");
//       const res = await axios.get(`${BASE_URL}/api/users`, { headers: getAuthHeaders() });
//       setUsers(res.data || []);
//     } catch (err) {
//       console.error("Role update failed", err);
//       alert("Role update failed");
//     }
//   };

//   const handleStatusUpdate = async (applicationId, newStatus) => {
//     try {
//       await axios.put(`${BASE_URL}/api/applications/${applicationId}/status`, { status: newStatus }, { headers: getAuthHeaders() });
//       setApplications((prev) => prev.map((app) => (app._id === applicationId ? { ...app, status: newStatus } : app)));
//     } catch (err) {
//       console.error("Status update failed", err);
//       alert("Status update failed");
//     }
//   };

//   // ---------- application helpers: download certificate/file ----------
//   const handleDownloadFile = async (filename) => {
//     try {
//       const response = await axios.get(`${BASE_URL}/api/files/${filename}`, {
//         responseType: "blob",
//         headers: getAuthHeaders(),
//       });
//       const blob = new Blob([response.data]);
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", filename);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(url);
//     } catch (err) {
//       alert("Failed to download");
//     }
//   };

//   // ---------- delete category / other helpers already above ----------

//   return (
//     <div className="p-4 md:p-6 lg:p-8 xl:p-10 bg-gradient-to-br from-gray-100 via-white to-gray-50 min-h-screen font-sans text-gray-800">
//       <h1 className="text-3xl mt-16 font-bold mb-16 text-center animate-fade-in drop-shadow-lg">Admin Dashboard</h1>

//       <div className="flex space-x-4 mb-6">
//         <button onClick={() => setSelectedTab("applications")} className={`px-4 py-2 rounded ${selectedTab === "applications" ? "bg-blue-700 text-white" : "bg-blue-500 text-white"}`}>Applications</button>
//         <button onClick={() => setSelectedTab("users")} className={`px-4 py-2 rounded ${selectedTab === "users" ? "bg-green-700 text-white" : "bg-green-500 text-white"}`}>Users</button>
//         <button onClick={() => setSelectedTab("services")} className={`px-4 py-2 rounded ${selectedTab === "services" ? "bg-purple-700 text-white" : "bg-purple-500 text-white"}`}>Services</button>
//         <button onClick={() => setSelectedTab("notices")} className={`px-4 py-2 rounded ${selectedTab === "notices" ? "bg-orange-700 text-white" : "bg-orange-500 text-white"}`}>Notices</button>
//         <button onClick={() => setSelectedTab("banners")} className={`px-4 py-2 rounded ${selectedTab === "banners" ? "bg-pink-700 text-white" : "bg-pink-500 text-white"}`}>Banner</button>
//       </div>

//       {/* Banners Tab */}
//       {selectedTab === "banners" && (
//         <div>
//           <h2 className="text-xl font-semibold mb-4">Upload Hero Banner</h2>
//           <form onSubmit={handleHeroUpload} className="space-y-4 max-w-md">
//             <input type="text" placeholder="Title" value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} className="w-full px-4 py-2 border rounded" />
//             <input type="text" placeholder="Subtitle" value={heroSubtitle} onChange={(e) => setHeroSubtitle(e.target.value)} className="w-full px-4 py-2 border rounded" />
//             <input type="file" accept="image/*" onChange={(e) => setHeroImage(e.target.files[0])} className="w-full" required />
//             <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded">Upload Banner</button>
//           </form>

//           <h3 className="text-lg font-medium mt-8 mb-4">Uploaded Banners</h3>
//           <div className="grid md:grid-cols-2 gap-4">
//             {heroSlides.map((slide) => (
//               <div key={slide._id} className="border rounded overflow-hidden shadow relative">
//                 <img src={`${BASE_URL}/api/files/${slide.image?.filename}`} alt={slide.title} className="w-full h-[180px] object-cover" />
//                 <div className="p-3">
//                   <h4 className="font-bold text-lg">{slide.title}</h4>
//                   <p className="text-sm">{slide.subtitle}</p>
//                 </div>
//                 <button onClick={() => handleHeroDelete(slide._id)} className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded">Delete</button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Notices Tab */}
//       {selectedTab === "notices" && (
//         <div>
//           <h2 className="text-xl font-semibold mb-4">Manage Notices</h2>

//           <div className="mb-6 space-y-2">
//             <input type="text" placeholder="Enter notice title" value={newNotice} onChange={(e) => setNewNotice(e.target.value)} className="border px-2 py-1 rounded w-full text-black" />
//             <input type="text" placeholder="Enter URL (optional)" value={newNoticeUrl} onChange={(e) => setNewNoticeUrl(e.target.value)} className="border px-2 py-1 rounded w-full text-black" />
//             <button onClick={handleAddNotice} className="bg-orange-600 text-white px-4 py-2 rounded">Add Notice</button>
//           </div>

//           <ul className="space-y-3">
//             {notices.length === 0 ? (
//               <p className="text-gray-500">No notices available.</p>
//             ) : (
//               notices.map((notice) => (
//                 <li key={notice._id} className="flex items-center justify-between bg-gray-100 p-3 rounded shadow">
//                   {editingNoticeId === notice._id ? (
//                     <div className="flex flex-col gap-2 w-full">
//                       <input type="text" value={editedNotice} onChange={(e) => setEditedNotice(e.target.value)} className="border px-2 py-1 rounded text-black" placeholder="Edit notice title" />
//                       <input type="text" value={newNoticeUrl} onChange={(e) => setNewNoticeUrl(e.target.value)} className="border px-2 py-1 rounded text-black" placeholder="Edit URL" />
//                       <button onClick={() => handleSaveEdit(notice._id)} className="bg-green-600 text-white px-2 py-1 rounded">Save</button>
//                     </div>
//                   ) : notice.url ? (
//                     <a href={notice.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline flex-1">
//                       {notice.title || notice.url}
//                     </a>
//                   ) : (
//                     <span className="text-gray-800 flex-1">{notice.title || "No title"}</span>
//                   )}
//                   {editingNoticeId !== notice._id && (
//                     <div className="flex gap-2 ml-2">
//                       <button onClick={() => { setEditingNoticeId(notice._id); setEditedNotice(notice.title); setNewNoticeUrl(notice.url || ""); }} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
//                       <button onClick={() => handleDeleteNotice(notice._id)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
//                     </div>
//                   )}
//                 </li>
//               ))
//             )}
//           </ul>
//         </div>
//       )}

//       {/* Applications Tab */}
//       {selectedTab === "applications" && (
//         <div>
//           <h2 className="text-xl font-semibold mb-4">Applications</h2>

//           <div className="flex gap-3 mb-4 flex-wrap">
//             {["All", "Submitted", "Pending Confirmation", "In Review", "Confirmed", "Completed", "Rejected"].map((status) => (
//               <button key={status} onClick={() => setStatusFilter(status)} className={`px-3 py-1 rounded border ${statusFilter === status ? "bg-blue-600 text-white" : "bg-white text-blue-600 border-blue-600"}`}>
//                 {status} ({countByStatus(status)})
//               </button>
//             ))}
//           </div>

//           {filteredApplications.length === 0 ? (
//             <p>No applications found.</p>
//           ) : (
//             <div className="space-y-4">
//               {filteredApplications.map((app) => (
//                 <div key={app._id} className="border rounded p-4 shadow bg-white">
//                   <p><b>User:</b> {app.user?.name || "N/A"} ({app.user?.mobile || "N/A"})</p>
//                   <p><b>Service:</b> {app.service?.name || "N/A"}</p>
//                   <p>
//                     <b>Status:</b>{" "}
//                     <select value={app.status} onChange={(e) => handleStatusUpdate(app._id, e.target.value)} className="ml-2 border rounded px-2 py-1">
//                       <option value="Submitted">Submitted</option>
//                       <option value="In Review">In Review</option>
//                       <option value="Pending Confirmation">Pending Confirmation</option>
//                       <option value="Confirmed">Confirmed</option>
//                       <option value="Completed">Completed</option>
//                       <option value="Rejected">Rejected</option>
//                     </select>
//                   </p>
//                   <p><b>Submitted At:</b> {app.createdAt ? new Date(app.createdAt).toLocaleString() : "N/A"}</p>

//                   {app.status === "Completed" && (
//                     <div className="mt-2">
//                       <form onSubmit={(e) => handleCertificateUpload(e, app._id)} className="flex items-center gap-2">
//                         <input type="file" accept="application/pdf,image/*" onChange={(e) => handleCertificateFileSelect(app._id, e.target.files[0])} className="border rounded px-2 py-1" />
//                         <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded">Upload Certificate</button>
//                       </form>

//                       {app.certificate?.filename && (
//                         <div className="mt-2">
//                           <a href={`${BASE_URL}/api/files/${app.certificate.filename}`} target="_blank" rel="noreferrer" className="text-blue-500 underline mt-1 block">View Certificate</a>
//                           <button onClick={() => handleDownloadFile(app.certificate.filename)} className="text-green-600 mt-1">Download Certificate</button>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}

//       {/* Users Tab */}
//       {selectedTab === "users" && (
//         <div>
//           <h2 className="text-xl font-semibold mb-2">All Users</h2>
//           {users.length === 0 ? (
//             <p>No users found.</p>
//           ) : (
//             <ul className="space-y-2">
//               {users.map((u) => (
//                 <li key={u._id} className="border rounded p-2 flex justify-between items-center">
//                   <div>
//                     <p><b>Name:</b> {u.name}</p>
//                     <p><b>Mobile:</b> {u.mobile}</p>
//                     <p>
//                       <b>Role:</b>{" "}
//                       <select value={u.role} onChange={(e) => handleRoleChange(u._id, e.target.value)} className="ml-2 border rounded">
//                         <option value="user">user</option>
//                         <option value="operator">operator</option>
//                         <option value="admin">admin</option>
//                       </select>
//                     </p>
//                   </div>
//                   <button onClick={() => handleDeleteUser(u._id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       )}

//       {/* Services Tab */}
//       {selectedTab === "services" && (
//         <div className="p-6">
//           <h2 className="text-2xl font-bold mb-4">Admin Panel – Manage Services</h2>

//           <div className="border p-4 rounded mb-4">
//             <h3 className="font-bold mb-2">Add Category</h3>
//             <input type="text" placeholder="Category name" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="border px-2 py-1 rounded w-full mb-2" />
//             <button onClick={handleAddCategory} className="bg-green-600 text-white px-4 py-2 rounded">Add Category</button>

//             <ul className="mt-4 space-y-2">
//               {categories.map((cat) => (
//                 <li key={cat._id} className="flex justify-between items-center border px-2 py-1 rounded">
//                   <span>{cat.name}</span>
//                   <button onClick={() => handleDeleteCategory(cat._id)} className="bg-red-600 text-white px-2 py-1 rounded text-sm">Delete</button>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="border p-4 rounded mb-4">
//             <h3 className="font-bold mb-2">Add / Edit Service</h3>
//             <input type="text" placeholder="Service name" value={newService} onChange={(e) => setNewService(e.target.value)} className="border px-2 py-1 rounded w-full mb-2" />

//             <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="border px-2 py-1 rounded w-full mb-2">
//               <option value="">-- Select Category --</option>
//               {categories.map((cat) => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
//             </select>

//             <select value={parentService} onChange={(e) => setParentService(e.target.value)} className="border px-2 py-1 rounded w-full mb-3">
//               <option value="">No parent (Main service)</option>
//               {services.filter(s => !s.parentService).map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
//             </select>

//             {Object.keys(fees).map(cast => (
//               <div key={cast} className="mb-2">
//                 <label className="mr-2 font-medium">{cast} Fee:</label>
//                 <input type="number" value={fees[cast]} onChange={(e) => setFees({ ...fees, [cast]: Number(e.target.value) })} className="border px-2 py-1 rounded w-32" />
//               </div>
//             ))}

//             <div className="mb-3">
//               <label className="mr-2 font-medium">Platform Fee:</label>
//               <input type="number" value={platformFee} onChange={(e) => setPlatformFee(Number(e.target.value))} className="border px-2 py-1 rounded w-32" />
//             </div>

//             <div className="flex gap-2 mt-3">
//               <button onClick={handleAddOrUpdateService} className="bg-purple-600 text-white px-4 py-2 rounded">{editingService ? "Update Service" : "Add Service"}</button>
//               <button onClick={resetServiceForm} className="bg-gray-300 px-4 py-2 rounded">Reset</button>
//             </div>
//           </div>

//           <ul className="space-y-4">
//             {services.map(srv => (
//               <li key={srv._id} className="border p-3 rounded">
//                 <p className="font-bold">{srv.name}</p>
//                 <p className="text-sm text-gray-600">Platform Fee: ₹{srv.platformFee || 0}</p>

//                 <div className="ml-4 mt-2">
//                   <h4 className="font-semibold">Subservices:</h4>
//                   <ul>
//                     {(srv.subservices || []).map(ss => (
//                       <li key={ss._id} className="ml-2 flex justify-between items-center">
//                         <div>
//                           {ss.name} — {Object.entries(ss.fees || {}).map(([cast, fee]) => `${cast}: ₹${fee}`).join(", ")} {" | "} Platform Fee: ₹{ss.platformFee || 0}
//                         </div>
//                         <div className="flex gap-2">
//                           <button onClick={() => handleEditSubClick(ss)} className="text-blue-600">Edit</button>
//                           <button onClick={() => handleDeleteSubService(srv._id, ss._id)} className="text-red-600">Delete</button>
//                         </div>
//                       </li>
//                     ))}
//                   </ul>

//                   <div className="mt-2">
//                     <input type="text" placeholder="Subservice name" value={newSubService} onChange={(e) => setNewSubService(e.target.value)} className="border px-2 py-1 rounded mb-2 w-full" />
//                     {Object.keys(subFees).map(cast => (
//                       <div key={cast} className="mb-2">
//                         <label className="mr-2 font-medium">{cast} Fee:</label>
//                         <input type="number" value={subFees[cast]} onChange={(e) => setSubFees({ ...subFees, [cast]: Number(e.target.value) })} className="border px-2 py-1 rounded w-32" />
//                       </div>
//                     ))}

//                     <div className="mb-3">
//                       <label className="mr-2 font-medium">Platform Fee:</label>
//                       <input type="number" value={subPlatformFee} onChange={(e) => setSubPlatformFee(Number(e.target.value))} className="border px-2 py-1 rounded w-32" />
//                     </div>

//                     <button onClick={() => handleAddOrUpdateSubService(srv._id)} className="bg-blue-600 text-white px-3 py-1 rounded">{editingSubService ? "Update Subservice" : "Add Subservice"}</button>
//                   </div>
//                 </div>

//                 <div className="mt-3 flex gap-2">
//                   <button onClick={() => handleEditClick(srv)} className="text-blue-600">Edit</button>
//                   <button onClick={() => handleDeleteService(srv._id)} className="text-red-600">Delete</button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AdminPanel;


import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { getSocket } from "../socket";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

function AdminPanel() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("applications");

  // ---------------- Applications ----------------
  const [applications, setApplications] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  const getAuthHeaders = () =>
    user?.token ? { Authorization: `Bearer ${user.token}` } : {};

  const countByStatus = (status) => {
    if (status === "All") return applications.length;
    return applications.filter(
      (app) => (app.status || "").toLowerCase() === status.toLowerCase()
    ).length;
  };

  const filteredApplications = applications.filter((app) => {
    const statusMatch =
      statusFilter === "All" || app.status === statusFilter;

    const dateMatch = dateFilter
      ? new Date(app.createdAt).toLocaleDateString() ===
        new Date(dateFilter).toLocaleDateString()
      : true;

    return statusMatch && dateMatch;
  });

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleAppCreated = (newApp) => {
      setApplications((prev) => [newApp, ...prev]);
    };
    const handleAppUpdated = (updatedApp) => {
      setApplications((prev) =>
        prev.map((a) => (a._id === updatedApp._id ? updatedApp : a))
      );
    };

    socket.on("applicationCreated", handleAppCreated);
    socket.on("applicationUpdated", handleAppUpdated);

    return () => {
      socket.off("applicationCreated", handleAppCreated);
      socket.off("applicationUpdated", handleAppUpdated);
    };
  }, []);

  useEffect(() => {
    if (!user?.token) return;
    fetchApplications();
    fetchUsers();
    fetchServices();
    fetchNotices();
    fetchBanners();
  }, [user?.token]);

  const fetchApplications = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/applications`, {
        headers: getAuthHeaders(),
      });
      setApplications(Array.isArray(res.data) ? res.data.reverse() : []);
    } catch (err) {
      console.error("Error fetching applications:", err);
    }
  };

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      await axios.put(
        `${BASE_URL}/api/applications/${applicationId}/status`,
        { status: newStatus },
        { headers: getAuthHeaders() }
      );
      setApplications((prev) =>
        prev.map((app) =>
          app._id === applicationId ? { ...app, status: newStatus } : app
        )
      );
    } catch (err) {
      console.error("Status update failed", err);
      alert("Status update failed");
    }
  };

  // ---------------- Users ----------------
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/users`, {
        headers: getAuthHeaders(),
      });
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  // ---------------- Services ----------------
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState("");

  const fetchServices = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/services`, {
        headers: getAuthHeaders(),
      });
      setServices(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching services:", err);
    }
  };

  const addService = async () => {
    if (!newService.trim()) return;
    try {
      const res = await axios.post(
        `${BASE_URL}/api/services`,
        { name: newService },
        { headers: getAuthHeaders() }
      );
      setServices((prev) => [...prev, res.data]);
      setNewService("");
    } catch (err) {
      console.error("Error adding service:", err);
    }
  };

  // ---------------- Notices ----------------
  const [notices, setNotices] = useState([]);
  const [newNotice, setNewNotice] = useState("");

  const fetchNotices = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/notices`, {
        headers: getAuthHeaders(),
      });
      setNotices(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching notices:", err);
    }
  };

  const addNotice = async () => {
    if (!newNotice.trim()) return;
    try {
      const res = await axios.post(
        `${BASE_URL}/api/notices`,
        { text: newNotice },
        { headers: getAuthHeaders() }
      );
      setNotices((prev) => [...prev, res.data]);
      setNewNotice("");
    } catch (err) {
      console.error("Error adding notice:", err);
    }
  };

  // ---------------- Hero Banners ----------------
  const [banners, setBanners] = useState([]);
  const [bannerFile, setBannerFile] = useState(null);

  const fetchBanners = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/banners`, {
        headers: getAuthHeaders(),
      });
      setBanners(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching banners:", err);
    }
  };

  const uploadBanner = async () => {
    if (!bannerFile) return;
    try {
      const formData = new FormData();
      formData.append("file", bannerFile);

      const res = await axios.post(`${BASE_URL}/api/banners`, formData, {
        headers: { ...getAuthHeaders(), "Content-Type": "multipart/form-data" },
      });

      setBanners((prev) => [...prev, res.data]);
      setBannerFile(null);
    } catch (err) {
      console.error("Error uploading banner:", err);
    }
  };

  // ---------------- UI ----------------
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Panel</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {[
          { key: "applications", label: "Applications" },
          { key: "users", label: "Users" },
          { key: "services", label: "Services" },
          { key: "notices", label: "Notices" },
          { key: "banners", label: "Hero Banners" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded ${
              activeTab === tab.key
                ? "bg-blue-600 text-white"
                : "bg-white border border-blue-600 text-blue-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Applications */}
      {activeTab === "applications" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Applications</h2>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-4">
            {[
              "All",
              "Submitted",
              "Pending Confirmation",
              "In Review",
              "Confirmed",
              "Completed",
              "Rejected",
            ].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1 rounded border ${
                  statusFilter === status
                    ? "bg-blue-600 text-white"
                    : "bg-white text-blue-600 border-blue-600"
                }`}
              >
                {status} ({countByStatus(status)})
              </button>
            ))}

            {/* Date filter */}
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="border px-3 py-1 rounded"
            />
            {dateFilter && (
              <button
                onClick={() => setDateFilter("")}
                className="px-3 py-1 rounded bg-red-500 text-white"
              >
                Clear Date
              </button>
            )}
          </div>

          {filteredApplications.length === 0 ? (
            <p className="text-gray-600">No applications found.</p>
          ) : (
            <div className="space-y-4">
              {filteredApplications.map((app) => (
                <div
                  key={app._id}
                  className="border rounded p-4 shadow bg-white"
                >
                  <p>
                    <b>User:</b> {app.user?.name || "N/A"} (
                    {app.user?.mobile || "N/A"})
                  </p>
                  <p>
                    <b>Service:</b> {app.service?.name || "N/A"}
                  </p>
                  <p>
                    <b>Status:</b>{" "}
                    <select
                      value={app.status}
                      onChange={(e) =>
                        handleStatusUpdate(app._id, e.target.value)
                      }
                      className="ml-2 border rounded px-2 py-1"
                    >
                      <option value="Submitted">Submitted</option>
                      <option value="In Review">In Review</option>
                      <option value="Pending Confirmation">
                        Pending Confirmation
                      </option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Completed</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </p>
                  <p>
                    <b>Submitted At:</b>{" "}
                    {app.createdAt
                      ? new Date(app.createdAt).toLocaleString()
                      : "N/A"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Users */}
      {activeTab === "users" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Users</h2>
          {users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            <ul className="list-disc ml-5">
              {users.map((u) => (
                <li key={u._id}>
                  {u.name} ({u.email}) - Role: {u.role}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Services */}
      {activeTab === "services" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Services</h2>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="New service"
              value={newService}
              onChange={(e) => setNewService(e.target.value)}
              className="border px-3 py-1 rounded flex-grow"
            />
            <button
              onClick={addService}
              className="px-4 py-1 bg-blue-600 text-white rounded"
            >
              Add
            </button>
          </div>
          {services.length === 0 ? (
            <p>No services found.</p>
          ) : (
            <ul className="list-disc ml-5">
              {services.map((s) => (
                <li key={s._id}>{s.name}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Notices */}
      {activeTab === "notices" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Notices</h2>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="New notice"
              value={newNotice}
              onChange={(e) => setNewNotice(e.target.value)}
              className="border px-3 py-1 rounded flex-grow"
            />
            <button
              onClick={addNotice}
              className="px-4 py-1 bg-blue-600 text-white rounded"
            >
              Add
            </button>
          </div>
          {notices.length === 0 ? (
            <p>No notices found.</p>
          ) : (
            <ul className="list-disc ml-5">
              {notices.map((n) => (
                <li key={n._id}>{n.text}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Banners */}
      {activeTab === "banners" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Hero Banners</h2>
          <div className="flex gap-2 mb-4">
            <input
              type="file"
              onChange={(e) => setBannerFile(e.target.files[0])}
              className="border px-3 py-1 rounded"
            />
            <button
              onClick={uploadBanner}
              className="px-4 py-1 bg-blue-600 text-white rounded"
            >
              Upload
            </button>
          </div>
          {banners.length === 0 ? (
            <p>No banners uploaded.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {banners.map((b) => (
                <img
                  key={b._id}
                  src={`${BASE_URL}/api/files/${b.filename}`}
                  alt="Banner"
                  className="rounded shadow"
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
