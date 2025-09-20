


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
    <div className="sticky top-0 z-50 w-full bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-800 border-b border-purple-700 shadow-lg">
      <div className="overflow-hidden whitespace-nowrap">
        <div className="inline-flex items-center animate-marquee">
          {notices.length === 0 ? (
            <span className="text-gray-300 px-6 py-3 italic tracking-wide">
              📰 No notices available.
            </span>
          ) : (
            [...notices, ...notices].map((notice, index) => (
              <div
                key={`${notice._id}-${index}`}
                className="flex items-center gap-3 px-6 py-3 hover:bg-purple-700/50 rounded-lg transition-all duration-300"
              >
                {getRandomIcon(index)}
                {notice.url ? (
                  <a
                    href={notice.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-300 hover:text-teal-400 font-medium tracking-wide transition-colors"
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
