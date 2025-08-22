// src/components/NoticesSection.jsx
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

  return (
    <section className="bg-white mt-10 py-10 px-4 md:px-8">
      {/* Only Horizontal Mode */}
      <div className="overflow-hidden whitespace-nowrap bg-gray-100 border border-gray-300 rounded-md py-3 px-2">
        <div
          style={{
            display: "inline-block",
            animation: "scrollLeft 55s linear infinite",
          }}
        >
          {notices.length === 0 ? (
            <span className="text-gray-500">No notices available.</span>
          ) : (
            notices.map((notice, index) => {
              const Icon = noticeIcons[index % noticeIcons.length];
              return (
                <span
                  key={notice._id}
                  className="inline-flex items-center text-gray-800 font-medium mr-10"
                >
                  <Icon className="text-blue-500 mr-2 animate-bounce" />
                  {notice.title}
                </span>
              );
            })
          )}
        </div>
      </div>

      {/* Styles */}
      <style>
        {`
          @keyframes scrollLeft {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `}
      </style>
    </section>
  );
};

export default NoticesSection;
