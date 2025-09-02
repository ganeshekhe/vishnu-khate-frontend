// // // src/components/NoticesSection.jsx
// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import {
// //   MdOutlineAnnouncement,
// //   MdNotificationsActive,
// //   MdCampaign,
// //   MdEventNote,
// // } from "react-icons/md";

// // const noticeIcons = [
// //   MdOutlineAnnouncement,
// //   MdNotificationsActive,
// //   MdCampaign,
// //   MdEventNote,
// // ];

// // const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// // const NoticesSection = () => {
// //   const [notices, setNotices] = useState([]);

// //   useEffect(() => {
// //     const fetchNotices = async () => {
// //       try {
// //         const res = await axios.get(`${BASE_URL}/api/notices`);
// //         setNotices(res.data);
// //       } catch (error) {
// //         console.error("Failed to fetch notices", error);
// //       }
// //     };

// //     fetchNotices();
// //   }, []);

  

// //   return (
// //     <section className="bg-white mt-10 py-10 px-4 md:px-8">
// //       {/* Only Horizontal Mode */}
// //       <div className="overflow-hidden whitespace-nowrap bg-gray-100 border border-gray-300 rounded-md py-3 px-2">
// //         <div
// //           style={{
// //             display: "inline-block",
// //             animation: "scrollLeft 55s linear infinite",
// //           }}
// //         >
// //           {notices.length === 0 ? (
// //             <span className="text-gray-500">No notices available.</span>
// //           ) : (
// //             notices.map((notice, index) => {
// //               const Icon = noticeIcons[index % noticeIcons.length];
// //               return (
// //                 <span
// //                   key={notice._id}
// //                   className="inline-flex items-center text-gray-800 font-medium mr-10"
// //                 >
// //                   <Icon className="text-blue-500 mr-2 animate-bounce" />
// //                   {notice.title}
// //                 </span>
// //               );
// //             })
// //           )}
// //         </div>
// //       </div>

// //       {/* Styles */}
// //       <style>
// //         {`
// //           @keyframes scrollLeft {
// //             0% { transform: translateX(100%); }
// //             100% { transform: translateX(-100%); }
// //           }
// //         `}
// //       </style>
// //     </section>
// //   );
// // };

// // export default NoticesSection;



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
      <Icon className="text-yellow-400 text-xl flex-shrink-0 animate-pulse drop-shadow-lg" />
    );
  };

  return (
    <div className="sticky top-0 z-50 w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700 shadow-md">
      <div className="overflow-hidden whitespace-nowrap">
        <div className="inline-flex items-center animate-marquee">
          {notices.length === 0 ? (
            <span className="text-gray-400 px-6 py-3 italic tracking-wide">
              📰 No notices available.
            </span>
          ) : (
            [...notices, ...notices].map((notice, index) => (
              <div
                key={`${notice._id}-${index}`}
                className="flex items-center gap-2 px-6 py-3 hover:bg-gray-800/60 rounded-lg transition-all"
              >
                {getRandomIcon(index)}
                {notice.url ? (
                  <a
                    href={notice.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-300 hover:text-cyan-400 font-medium tracking-wide transition-colors"
                  >
                    {notice.title}
                  </a>
                ) : (
                  <span className="text-gray-100 font-medium tracking-wide">
                    {notice.title}
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <style>
        {`
          @keyframes marquee {
            0%   { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 25s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}
      </style>
    </div>
  );
};

export default NoticesSection;
