import React from "react";

const DynamicBadge = ({ letter, notificationCount }) => {
  return (
    <div className="relative w-14 h-14">
      {/* Main Circle with Letter */}
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="#1f1f1f" />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          fontSize="40"
          fill="white"
          fontFamily="Arial"
        >
          {letter}
        </text>
      </svg>

      {/* Notification Badge */}
      {notificationCount > 0 && (
        <div className="absolute top-0 right-0 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">{notificationCount}</span>
        </div>
      )}
    </div>
  );
};

export default DynamicBadge;
