import React from "react";
import { Link } from "react-router-dom";
import { IoMoon, IoSunny, IoExitOutline } from "react-icons/io5";
import { MdCancel } from "react-icons/md";

const Header = ({ darkMode, user, iconColor, toggleDarkMode, showBackButton, onBackClick }) => {
  return (
    <div className="relative h-24 bg-gray-500/30 flex items-center px-4">
      {/* Exit Button */}
      <Link to="/">
        <button
          className="absolute top-3 cursor-pointer right-3 text-2xl rounded-full p-1 hover:bg-gray-600 transition"
          aria-label="Close"
        >
          <IoExitOutline className={iconColor} />
        </button>
      </Link>
      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className="absolute top-3 right-14 cursor-pointer text-2xl rounded-full p-1 hover:bg-gray-600 transition"
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? <IoSunny className={iconColor} /> : <IoMoon className={iconColor} />}
      </button>
      {/* Back Button */}
      {showBackButton && (
        <button
          onClick={onBackClick}
          className="absolute  top-20 right-3 text-2xl rounded-full p-1 hover:bg-gray-600 transition"
          aria-label="Back"
        >
          <MdCancel className={iconColor} />
        </button>
      )}

      {/* Avatar + Info */}
      <div
        className={`w-14 h-14 border-2 pt-2 rounded-full overflow-hidden ${darkMode ? "border-slate-500 bg-white" : "border-slate-400 bg-slate-200"
          }`}
      >
        {user.photo ? (
          <img src={user.photo} alt={user.name} className="w-full cursor-pointer h-full scale-105 object-cover" />
        ) : (
          <div className="flex justify-center items-center h-full text-black">👤</div>
        )}
      </div>
      <div className="leading-tight pl-2">
        <h1 className="text-xl font-semibold text-white capitalize truncate max-w-[170px]">
          {user.name}
        </h1>

        <p className="text-sm font-bold text-white">ID: {user.uid}</p>
      </div>
    </div>
  );
};

export default Header;
