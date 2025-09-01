// // src/components/NoticesSection.jsx
// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   MdOutlineAnnouncement,
//   MdNotificationsActive,
//   MdCampaign,
//   MdEventNote,
// } from "react-icons/md";

// const noticeIcons = [
//   MdOutlineAnnouncement,
//   MdNotificationsActive,
//   MdCampaign,
//   MdEventNote,
// ];

// const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// const NoticesSection = () => {
//   const [notices, setNotices] = useState([]);

//   useEffect(() => {
//     const fetchNotices = async () => {
//       try {
//         const res = await axios.get(`${BASE_URL}/api/notices`);
//         setNotices(res.data);
//       } catch (error) {
//         console.error("Failed to fetch notices", error);
//       }
//     };

//     fetchNotices();
//   }, []);

  

//   return (
//     <section className="bg-white mt-10 py-10 px-4 md:px-8">
//       {/* Only Horizontal Mode */}
//       <div className="overflow-hidden whitespace-nowrap bg-gray-100 border border-gray-300 rounded-md py-3 px-2">
//         <div
//           style={{
//             display: "inline-block",
//             animation: "scrollLeft 55s linear infinite",
//           }}
//         >
//           {notices.length === 0 ? (
//             <span className="text-gray-500">No notices available.</span>
//           ) : (
//             notices.map((notice, index) => {
//               const Icon = noticeIcons[index % noticeIcons.length];
//               return (
//                 <span
//                   key={notice._id}
//                   className="inline-flex items-center text-gray-800 font-medium mr-10"
//                 >
//                   <Icon className="text-blue-500 mr-2 animate-bounce" />
//                   {notice.title}
//                 </span>
//               );
//             })
//           )}
//         </div>
//       </div>

//       {/* Styles */}
//       <style>
//         {`
//           @keyframes scrollLeft {
//             0% { transform: translateX(100%); }
//             100% { transform: translateX(-100%); }
//           }
//         `}
//       </style>
//     </section>
//   );
// };

// export default NoticesSection;





import { useEffect, useState } from "react";
import axios from "axios";
import {
  MdOutlineAnnouncement,
  MdNotificationsActive,
  MdCampaign,
  MdEventNote,
} from "react-icons/md";

const noticeIcons = [
  MdOutlineAnnouncement,
  MdNotificationsActive,
  MdCampaign,
  MdEventNote,
];
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const NoticesSection = () => {
  const [notices, setNotices] = useState([]);

useEffect(() => {
     const fetchNotices = async () => {
       try {
        const res = await axios.get(`${BASE_URL}/api/notices`);
        setNotices(res.data);
     } catch (error) {
         console.error("Failed to fetch notices", error);
       }
     };

    fetchNotices();
     }, []);

  const getRandomIcon = (index) => {
    const Icon = noticeIcons[index % noticeIcons.length];
    return (
      <Icon className="text-cyan-400 mt-1 text-xl animate-pulse flex-shrink-0" />
    );
  };

  return (
    <section className="relative py-12 px-6 md:px-12 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      <h2 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-md tracking-wide">
        📰 Latest Notices
      </h2>

      <div
        className="max-w-3xl mx-auto overflow-hidden rounded-2xl border border-gray-700/50 backdrop-blur-xl bg-gray-800/70 shadow-2xl hover:shadow-cyan-500/20 transition-shadow duration-300"
        style={{ height: "260px", position: "relative" }}
      >
        <div
          className="scroll-container space-y-3 px-4 overflow-y-auto"
          style={{ animation: "scrollTopToBottom 18s linear infinite" }}
        >
          {notices.length === 0 ? (
            <p className="text-center text-gray-400 py-8 text-lg">
              No notices available.
            </p>
          ) : (
            notices.map((notice, index) => (
              <div
                key={notice._id}
                className="flex items-start gap-4 p-4 rounded-xl bg-gray-700/40 hover:bg-cyan-500/20 transition-all duration-300 shadow-sm border border-transparent hover:border-cyan-400/40"
              >
                {getRandomIcon(index)}
                {notice.url ? (
                  <a
                    href={notice.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-300 hover:text-cyan-400 underline font-medium text-lg transition-colors duration-200"
                  >
                    {notice.title}
                  </a>
                ) : (
                  <p className="text-gray-100 font-medium text-lg">
                    {notice.title}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <style>
        {`
          @keyframes scrollTopToBottom {
            0% { transform: translateY(0%); }
            100% { transform: translateY(-100%); }
          }

          .scroll-container:hover {
            animation-play-state: paused;
          }

          .scroll-container::-webkit-scrollbar {
            width: 8px;
          }

          .scroll-container::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #22d3ee, #2563eb);
            border-radius: 8px;
          }

          .scroll-container::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
          }
        `}
      </style>
    </section>
  );
};

export default NoticesSection;

