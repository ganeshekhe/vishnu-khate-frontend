import React from "react";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-orange-100 to-white py-20 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Apply for Govt. Services Online
          </h1>
          <p className="text-gray-600 mb-6">
            Get your PAN, Aadhar, Domicile, Income, and more documents processed
            quickly and securely from anywhere.
          </p>
         
        </div>
        <div className="md:w-1/2 flex justify-end">
  <img
    src="/logo.jpg"
    alt="eSeva Hero"
    className="w-[300px] rounded-2xl shadow-lg"
  />
</div>

      </div>
    </section>
  );
};

export default HeroSection;


// import React from "react";
// import { MessageSquare } from "lucide-react";
// import { useAuth } from "../context/AuthContext";

// const HeroSection = () => {
//   const { user } = useAuth();

//   const handleChatClick = () => {
//     const adminNumber = "919834883059"; // Country code + number
//     const userName = user?.name || "User";
//     const message = `Hello Admin, my name is ${userName} from CEP Service Portal. I need assistance regarding my account or application.`;

//     // WhatsApp chat URL
//     const whatsappURL = `https://wa.me/${adminNumber}?text=${encodeURIComponent(
//       message
//     )}`;

//     // Try to open WhatsApp
//     const newWindow = window.open(whatsappURL, "_blank", "noopener,noreferrer");

//     // If WhatsApp not installed (fallback after 2s)
//     setTimeout(() => {
//       if (!newWindow || newWindow.closed || typeof newWindow.closed === "undefined") {
//         // Detect platform (Android/iOS/Desktop)
//         const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

//         if (isMobile) {
//           // Redirect to WhatsApp app store
//           window.location.href =
//             "https://play.google.com/store/apps/details?id=com.whatsapp";
//         } else {
//           // Show alert for desktop users
//           alert("WhatsApp not detected on your device. Please use WhatsApp Web or install WhatsApp.");
//         }
//       }
//     }, 2000);
//   };

//   return (
//     <section className="bg-gradient-to-r from-orange-100 to-white py-20 px-4 relative">
//       <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
//         <div className="md:w-1/2">
//           <h1 className="text-4xl font-bold text-gray-800 mb-4">
//             Apply for Govt. Services Online
//           </h1>
//           <p className="text-gray-600 mb-6">
//             Get your PAN, Aadhar, Domicile, Income, and more documents processed
//             quickly and securely from anywhere.
//           </p>
//         </div>

//         <div className="md:w-1/2 flex justify-end">
//           <img
//             src="/logo.jpg"
//             alt="eSeva Hero"
//             className="w-[300px] rounded-2xl shadow-lg"
//           />
//         </div>
//       </div>

//       <button
//         onClick={handleChatClick}
//         className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 font-medium"
//       >
//         <MessageSquare size={20} />
//         Chat Admin
//       </button>
//     </section>
//   );
// };

// export default HeroSection;
