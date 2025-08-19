// import React from "react";

// const features = [
//   { title: "Fast Processing", icon: "⚡" },
//   { title: "100% Secure", icon: "🔐" },
//   { title: "Expert Operators", icon: "👨‍💻" },
//   { title: "24x7 Access", icon: "🌐" },
// ];

// const HighlightsSection = () => {
//   return (
//     <section className="py-12 px-4">
//       <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
//         {features.map((f, idx) => (
//           <div
//             key={idx}
//             className="bg-white shadow p-6 rounded-xl hover:shadow-md"
//           >
//             <div className="text-3xl mb-2">{f.icon}</div>
//             <h3 className="font-semibold text-lg">{f.title}</h3>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default HighlightsSection;
import React from "react";

const features = [
  { title: "Fast Processing", icon: "⚡" },
  { title: "100% Secure", icon: "🔐" },
  { title: "Expert Operators", icon: "👨‍💻" },
  { title: "24x7 Access", icon: "🌐" },
];

const HighlightsSection = () => {
  return (
    <section className="py-16 px-6 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {features.map((f, idx) => (
          <div
            key={idx}
            className="relative bg-white p-8 rounded-2xl shadow-md border border-gray-100 
                       hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group overflow-hidden"
          >
            {/* Gradient overlay border hover */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-500 rounded-2xl transition-all duration-500"></div>

            {/* Icon in Circle */}
            <div className="relative z-10 w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-3xl shadow-md group-hover:scale-110 transition-transform duration-500">
              {f.icon}
            </div>

            {/* Title */}
            <h3 className="relative z-10 font-semibold text-lg text-gray-700 group-hover:text-purple-700 transition-colors duration-500">
              {f.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HighlightsSection;
