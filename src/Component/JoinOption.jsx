import React from "react";

const JoinOption = ({ icon, label, darkMode, onClick }) => {
  const buttonBg = darkMode ? "bg-zinc-600 hover:bg-zinc-500" : "bg-gray-200 hover:bg-gray-300";
  const textColor = darkMode ? "text-white" : "text-zinc-900";

  return (
    <button
      className={`${buttonBg} flex flex-col cursor-pointer justify-center items-center gap-2 rounded-xl p-4 font-semibold transition shadow-md`}
      aria-label={label}
      onClick={onClick}
      type="button"
    >
      <div className={textColor}>{icon}</div>
      <span className={`${textColor} text-center text-sm`}>{label}</span>
    </button>
  );
};

export default JoinOption;
