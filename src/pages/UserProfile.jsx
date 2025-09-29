



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";

// const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// const UserProfile = () => {
//   const { user } = useAuth();

//   const [formData, setFormData] = useState({
//     name: "",
//     gender: "",
//     dob: "",
//     caste: "",
//   });

//   const [uploadedDocs, setUploadedDocs] = useState({});
//   const [profilePic, setProfilePic] = useState("");
//   const [files, setFiles] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const documentFields = [
//     "tenthCertificate",
//     "tenthMarksheet",
//     "twelfthCertificate",
//     "twelfthMarksheet",
//     "graduationDegree",
//     "domicile",
//     "pgCertificate",
//     "casteValidity",
//     "otherDocument",
//   ];

//   const labelMap = {
//     tenthCertificate: "10th Certificate",
//     tenthMarksheet: "10th Marksheet",
//     twelfthCertificate: "12th Certificate",
//     twelfthMarksheet: "12th Marksheet",
//     graduationDegree: "Graduation Degree",
//     domicile: "Domicile",
//     pgCertificate: "PG Certificate",
//     casteValidity: "Caste Validity",
//     otherDocument: "Other Document",
//   };

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await axios.get(`${BASE_URL}/api/users/${user.id}/profile`, {
//           headers: { Authorization: `Bearer ${user.token}` },
//         });

//         setFormData({
//           name: res.data.name || "",
//           gender: res.data.gender || "",
//           dob: res.data.dob ? res.data.dob.substring(0, 10) : "",
//           caste: res.data.caste || "",
//         });

//         const docs = { ...res.data };

//         documentFields.forEach((field) => {
//           if (docs[field]?.filename) {
//             docs[field].filepath = `${BASE_URL}/api/files/${docs[field].filename}`;
//           }
//           if (field === "otherDocument" && Array.isArray(docs[field])) {
//             docs[field] = docs[field].map((f) => ({
//               ...f,
//               filepath: `${BASE_URL}/api/files/${f.filename}`,
//             }));
//           }
//         });

//         if (docs.profilePic?.filename) {
//           setProfilePic(`${BASE_URL}/api/files/${docs.profilePic.filename}`);
//         }

//         setUploadedDocs(docs);
//       } catch (err) {
//         console.error("❌ Failed to load profile:", err);
//       }
//     };

//     if (user) fetchProfile();
//   }, [user]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (fieldName, file) => {
//     if (!file) return;

//     if (Array.isArray(file)) {
//       // Multi-file for otherDocument
//       const validFiles = file.filter((f) => f.size <= 5 * 1024 * 1024);
//       setFiles((prev) => ({ ...prev, [fieldName]: validFiles }));
//     } else {
//       if (file.size > 5 * 1024 * 1024) {
//         alert("❌ File too large (max 5MB)");
//         return;
//       }
//       setFiles((prev) => ({ ...prev, [fieldName]: file }));
//     }
//   };

//   const handleProfilePicChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFiles((prev) => ({ ...prev, profilePic: file }));
//       setProfilePic(URL.createObjectURL(file));
//     }
//   };

//   const handleDeleteDoc = async (fieldName, index = null) => {
//     if (!window.confirm("Are you sure you want to delete this document?")) return;

//     try {
//       const res = await axios.delete(`${BASE_URL}/api/users/profile/document/${fieldName}`, {
//         headers: { Authorization: `Bearer ${user.token}` },
//         data: { index }, // index required for multi-file (otherDocument)
//       });

//       setUploadedDocs(res.data.user);
//       setMessage("✅ Document deleted");
//       setTimeout(() => setMessage(""), 3000);
//     } catch (err) {
//       console.error("❌ Delete failed:", err);
//       alert("❌ Failed to delete document.");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const form = new FormData();
//     form.append("name", formData.name);
//     form.append("gender", formData.gender);
//     form.append("dob", formData.dob);
//     form.append("caste", formData.caste);

//     Object.keys(files).forEach((field) => {
//       if (field === "otherDocument" && Array.isArray(files[field])) {
//         files[field].forEach((f) => form.append(field, f));
//       } else {
//         form.append(field, files[field]);
//       }
//     });

//     try {
//       setLoading(true);
//       const res = await axios.put(`${BASE_URL}/api/users/profile`, form, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${user.token}`,
//         },
//       });

//       const updatedUser = res.data.user;
//       const updatedDocs = { ...updatedUser };

//       documentFields.forEach((field) => {
//         if (updatedUser[field]?.filename) {
//           updatedDocs[field].filepath = `${BASE_URL}/api/files/${updatedUser[field].filename}`;
//         }
//         if (field === "otherDocument" && Array.isArray(updatedUser[field])) {
//           updatedDocs[field] = updatedUser[field].map((f) => ({
//             ...f,
//             filepath: `${BASE_URL}/api/files/${f.filename}`,
//           }));
//         }
//       });

//       if (updatedUser.profilePic?.filename) {
//         setProfilePic(`${BASE_URL}/api/files/${updatedUser.profilePic.filename}`);
//       }

//       setUploadedDocs(updatedDocs);
//       setFiles({});
//       setMessage("✅ Profile updated");
//       setTimeout(() => setMessage(""), 3000);
//     } catch (err) {
//       console.error("❌ Update failed:", err);
//       alert("❌ Failed to update profile.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-8">
//       <h2 className="text-2xl font-bold text-pink-600 mb-4 text-center">My Profile</h2>

//       {message && <div className="bg-green-100 text-green-700 p-2 rounded mb-4">{message}</div>}

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Profile Pic */}
//         <div className="flex justify-center">
//           <div className="relative w-24 h-24">
//             <img src={profilePic || "/default-user.png"} alt="Profile" className="w-24 h-24 rounded-full border-4 border-pink-500 shadow-lg object-cover" />
//             <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full cursor-pointer shadow">
//               <input type="file" onChange={handleProfilePicChange} className="hidden" />
//               <span role="img" aria-label="edit">✏️</span>
//             </label>
//           </div>
//         </div>

//         {/* Personal Info */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label className="block mb-1 text-sm font-medium">Name</label>
//             <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border p-2 rounded" required />
//           </div>
//           <div>
//             <label className="block mb-1 text-sm font-medium">Gender</label>
//             <select name="gender" value={formData.gender} onChange={handleChange} className="w-full border p-2 rounded">
//               <option value="">Select</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//               <option value="other">Other</option>
//             </select>
//           </div>
//           <div>
//             <label className="block mb-1 text-sm font-medium">Date of Birth</label>
//             <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full border p-2 rounded" />
//           </div>
//           <div>
//             <label className="block mb-1 text-sm font-medium">Caste</label>
//             <select name="caste" value={formData.caste} onChange={handleChange} className="w-full border p-2 rounded">
//               <option value="">Select</option>
//               <option value="SC">SC</option>
//               <option value="ST">ST</option>
//               <option value="OBC">OBC</option>
//               <option value="General">General</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>
//         </div>

//         {/* Documents */}
//         <div className="border p-4 rounded-lg bg-pink-50 mt-4">
//           <h4 className="font-semibold text-pink-700 mb-2">📄 Documents</h4>
//           {documentFields.map((field) => (
//             <div key={field} className="mb-3">
//               <label className="text-sm block mb-1">{labelMap[field]}</label>
//               <input
//                 type="file"
//                 multiple={field === "otherDocument"}
//                 onChange={(e) => {
//                   const fileData = field === "otherDocument" ? Array.from(e.target.files) : e.target.files[0];
//                   handleFileChange(field, fileData);
//                 }}
//                 className="block w-full border p-2 rounded"
//               />

//               {uploadedDocs[field] && (
//                 <div className="mt-1 flex flex-col space-y-1 text-sm bg-white p-2 rounded shadow">
//                   {(field === "otherDocument" ? uploadedDocs[field] : [uploadedDocs[field]]).map((doc, idx) => (
//                     <div key={idx} className="flex justify-between items-center">
//                       <span className="text-gray-600">{doc.filename}</span>
//                       <div className="flex space-x-2">
//                         <a href={doc.filepath || `${BASE_URL}/api/files/${doc.filename}`} target="_blank" rel="noreferrer">View</a>
//                         {/* <button type="button" onClick={() => handleDeleteDoc(field, idx)} className="text-red-500 hover:text-red-700 text-xs">
//                           Delete 🗑
//                         </button> */}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Submit Button */}
//         <button type="submit" disabled={loading} className="w-full bg-pink-600 text-white p-2 rounded hover:bg-pink-700 shadow">
//           {loading ? "Saving..." : "Update Profile"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UserProfile;











import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const UserProfile = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    caste: "",
  });

  const [uploadedDocs, setUploadedDocs] = useState({});
  const [profilePic, setProfilePic] = useState("");
  const [files, setFiles] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const documentFields = [
    "tenthCertificate",
    "tenthMarksheet",
    "twelfthCertificate",
    "twelfthMarksheet",
    "graduationDegree",
    "domicile",
    "pgCertificate",
    "casteValidity",
    "otherDocument",
  ];

  const labelMap = {
    tenthCertificate: "10th Certificate",
    tenthMarksheet: "10th Marksheet",
    twelfthCertificate: "12th Certificate",
    twelfthMarksheet: "12th Marksheet",
    graduationDegree: "Graduation Degree",
    domicile: "Domicile",
    pgCertificate: "PG Certificate",
    casteValidity: "Caste Validity",
    otherDocument: "Other Document",
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/users/${user.id}/profile`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        setFormData({
          name: res.data.name || "",
          gender: res.data.gender || "",
          dob: res.data.dob ? res.data.dob.substring(0, 10) : "",
          caste: res.data.caste || "",
        });

        const docs = { ...res.data };
        documentFields.forEach((field) => {
          if (docs[field]?.filename) {
            docs[field].filepath = `${BASE_URL}/api/files/${docs[field].filename}`;
          }
          if (field === "otherDocument" && Array.isArray(docs[field])) {
            docs[field] = docs[field].map((f) => ({
              ...f,
              filepath: `${BASE_URL}/api/files/${f.filename}`,
            }));
          }
        });

        if (docs.profilePic?.filename) {
          setProfilePic(`${BASE_URL}/api/files/${docs.profilePic.filename}`);
        }

        setUploadedDocs(docs);
      } catch (err) {
        console.error("❌ Failed to load profile:", err);
      }
    };

    if (user) fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateFile = (file, maxSizeMB, allowedTypes) => {
    if (!file) return { valid: true };
    if (Array.isArray(file)) {
      for (let f of file) {
        if (f.size > maxSizeMB * 1024 * 1024) {
          return { valid: false, message: `File "${f.name}" is too large (max ${maxSizeMB}MB)` };
        }
        if (!allowedTypes.includes(f.type)) {
          return { valid: false, message: `File "${f.name}" type not allowed` };
        }
      }
      return { valid: true };
    } else {
      if (file.size > maxSizeMB * 1024 * 1024) {
        return { valid: false, message: `File "${file.name}" is too large (max ${maxSizeMB}MB)` };
      }
      if (!allowedTypes.includes(file.type)) {
        return { valid: false, message: `File "${file.name}" type not allowed` };
      }
      return { valid: true };
    }
  };

  const handleFileChange = (fieldName, file) => {
    if (!file) return;

    let maxSize = fieldName === "profilePic" ? 1 : fieldName === "otherDocument" ? 2 : 2;
    let allowedTypes = fieldName === "profilePic" ? ["image/jpeg", "image/png", "image/jpg"] : ["image/jpeg", "image/png", "image/jpg", "application/pdf"];

    const validation = validateFile(file, maxSize, allowedTypes);
    if (!validation.valid) {
      setErrors({ ...errors, [fieldName]: validation.message });
      return;
    }

    setErrors({ ...errors, [fieldName]: "" });
    setFiles((prev) => ({ ...prev, [fieldName]: file }));

    if (fieldName === "profilePic") {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = {};

    // Basic form validation
    if (!formData.name.trim()) formErrors.name = "Name is required";
    if (!formData.gender) formErrors.gender = "Gender is required";
    if (!formData.dob) formErrors.dob = "Date of Birth is required";
    if (!formData.caste) formErrors.caste = "Caste is required";

    // File validation
    if (files.profilePic) {
      const res = validateFile(files.profilePic, 1, ["image/jpeg", "image/png", "image/jpg"]);
      if (!res.valid) formErrors.profilePic = res.message;
    }
    documentFields.forEach((field) => {
      if (files[field]) {
        let maxSize = field === "otherDocument" ? 2 : 2;
        let allowedTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
        const res = validateFile(files[field], maxSize, allowedTypes);
        if (!res.valid) formErrors[field] = res.message;
      }
    });

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const form = new FormData();
    form.append("name", formData.name);
    form.append("gender", formData.gender);
    form.append("dob", formData.dob);
    form.append("caste", formData.caste);

    Object.keys(files).forEach((field) => {
      if (field === "otherDocument" && Array.isArray(files[field])) {
        files[field].forEach((f) => form.append(field, f));
      } else {
        form.append(field, files[field]);
      }
    });

    try {
      setLoading(true);
      const res = await axios.put(`${BASE_URL}/api/users/profile`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const updatedUser = res.data.user;
      const updatedDocs = { ...updatedUser };

      documentFields.forEach((field) => {
        if (updatedUser[field]?.filename) {
          updatedDocs[field].filepath = `${BASE_URL}/api/files/${updatedUser[field].filename}`;
        }
        if (field === "otherDocument" && Array.isArray(updatedUser[field])) {
          updatedDocs[field] = updatedUser[field].map((f) => ({
            ...f,
            filepath: `${BASE_URL}/api/files/${f.filename}`,
          }));
        }
      });

      if (updatedUser.profilePic?.filename) {
        setProfilePic(`${BASE_URL}/api/files/${updatedUser.profilePic.filename}`);
      }

      setUploadedDocs(updatedDocs);
      setFiles({});
      setMessage("✅ Profile updated successfully");
      setTimeout(() => setMessage(""), 3000);
      setErrors({});
    } catch (err) {
      console.error("❌ Update failed:", err);
      setMessage("❌ Failed to update profile");
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-8">
      <h2 className="text-2xl font-bold text-pink-600 mb-4 text-center">My Profile</h2>

      {message && <div className="bg-green-100 text-green-700 p-2 rounded mb-4">{message}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Pic */}
        <div className="flex justify-center">
          <div className="relative w-24 h-24">
            <img
              src={profilePic || "/default-user.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-pink-500 shadow-lg object-cover"
            />
            <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full cursor-pointer shadow">
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={(e) => handleFileChange("profilePic", e.target.files[0])}
                className="hidden"
              />
              <span role="img" aria-label="edit">✏️</span>
            </label>
          </div>
        </div>
        {errors.profilePic && <p className="text-red-600 text-sm text-center">{errors.profilePic}</p>}

        {/* Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <p className="text-red-600 text-sm">{errors.gender}</p>}
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            {errors.dob && <p className="text-red-600 text-sm">{errors.dob}</p>}
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Caste</label>
            <select
              name="caste"
              value={formData.caste}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Select</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="OBC">OBC</option>
              <option value="General">General</option>
              <option value="Other">Other</option>
            </select>
            {errors.caste && <p className="text-red-600 text-sm">{errors.caste}</p>}
          </div>
        </div>

        {/* Documents */}
        <div className="border p-4 rounded-lg bg-pink-50 mt-4">
          <h4 className="font-semibold text-pink-700 mb-2">📄 Documents</h4>
          {documentFields.map((field) => (
            <div key={field} className="mb-3">
              <label className="text-sm block mb-1">{labelMap[field]}</label>
              <input
                type="file"
                multiple={field === "otherDocument"}
                accept={field === "profilePic" ? ".jpg,.jpeg,.png" : ".pdf,.jpg,.jpeg,.png"}
                onChange={(e) => {
                  const fileData = field === "otherDocument" ? Array.from(e.target.files) : e.target.files[0];
                  handleFileChange(field, fileData);
                }}
                className="block w-full border p-2 rounded"
              />
              {errors[field] && <p className="text-red-600 text-sm">{errors[field]}</p>}

              {uploadedDocs[field] && (
                <div className="mt-1 flex flex-col space-y-1 text-sm bg-white p-2 rounded shadow">
                  {(field === "otherDocument" ? uploadedDocs[field] : [uploadedDocs[field]]).map((doc, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span className="text-gray-600">{doc.filename}</span>
                      <div className="flex space-x-2">
                        <a href={doc.filepath || `${BASE_URL}/api/files/${doc.filename}`} target="_blank" rel="noreferrer">View</a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-600 text-white p-2 rounded hover:bg-pink-700 shadow"
        >
          {loading ? "Saving..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
