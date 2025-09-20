
import React from "react";

const steps = [
  "Update Profile",
  "Select Service",
  "Submit & Review",
  "Get Certificate",
];

const StepsSection = () => {
  return (
    <section className="py-16 px-6 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-12 tracking-wide">
          How It Works
        </h2>

        {/* Steps */}
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex-1 bg-white p-8 rounded-2xl shadow-md relative overflow-hidden border border-gray-100 group transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
            >
              {/* Gradient overlay hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition duration-500"></div>

              {/* Step Circle */}
              <div className="relative z-10 w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-500">
                {index + 1}
              </div>

              {/* Step Title */}
              <p className="relative z-10 text-lg font-semibold text-gray-700 group-hover:text-white transition-colors duration-500">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
