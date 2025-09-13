import React, { useState, useEffect } from 'react';
import { MdCancel } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { IoMoon, IoSunny } from 'react-icons/io5';
import { RiQrCodeLine } from 'react-icons/ri';
import { FiSearch } from 'react-icons/fi';
import { FaWifi } from "react-icons/fa";
import { BiLinkAlt } from 'react-icons/bi';
import { IoMdQrScanner } from "react-icons/io";
import { IoExitOutline } from "react-icons/io5";
import QrCodeShow from '../Features/QrCodeShow';
import QrScanner from '../Features/QrScanner';

const HomePage = () => {
  // Persist dark mode in localStorage
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('darkMode');
    return stored === null ? true : stored === 'true';
  });
  const [activeJoinOption, setActiveJoinOption] = useState(null); // 'qr' | 'search' | 'wifi' | 'link' | null
  const [qrSubOption, setQrSubOption] = useState(null); // 'scan' | 'show' | null

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const openJoinOption = (option) => {
    setActiveJoinOption(option);
    setQrSubOption(null);
  };

  const closeJoinOption = () => {
    setActiveJoinOption(null);
    setQrSubOption(null);
  };

  const openQrSubOption = (subOption) => setQrSubOption(subOption);

  const closeQrSubOption = () => setQrSubOption(null);

  const cardBg = darkMode ? 'bg-zinc-700' : 'bg-white';
  const iconColor = darkMode ? 'text-white' : 'text-zinc-900';
  const textColor = darkMode ? 'text-white' : 'text-zinc-900';

  // Conditionally render back button depending on QR submenu or join option level
  const showBackButton = qrSubOption || activeJoinOption;

  return (
    <div className="w-full h-screen flex justify-center items-center p-6 bg-black">
      <div className={`w-full max-w-xs h-[calc(100%-60px)] rounded-3xl ${cardBg} shadow-xl overflow-hidden`}>
        <Header
          darkMode={darkMode}
          iconColor={iconColor}
          toggleDarkMode={toggleDarkMode}
          showBackButton={showBackButton}
          onBackClick={qrSubOption ? closeQrSubOption : closeJoinOption}
        />
        <div className="p-6 grid grid-cols-2 gap-6">
          {!activeJoinOption && (
            <>
              <JoinOption icon={<RiQrCodeLine size={32} />} label="Join via QR Code" darkMode={darkMode} onClick={() => openJoinOption('qr')} />
              <JoinOption icon={<FiSearch size={32} />} label="Search by ID" darkMode={darkMode} onClick={() => openJoinOption('search')} />
              <JoinOption icon={<FaWifi size={32} />} label="WiFi Hotspot" darkMode={darkMode} onClick={() => openJoinOption('wifi')} />
              <JoinOption icon={<BiLinkAlt size={32} />} label="Share Link" darkMode={darkMode} onClick={() => openJoinOption('link')} />
            </>
          )}
          {activeJoinOption === 'qr' && !qrSubOption && (
            <QrSubmenu darkMode={darkMode} openQrSubOption={openQrSubOption} />
          )}
          {activeJoinOption === 'qr' && qrSubOption && (
            <QrFeatureView darkMode={darkMode} qrSubOption={qrSubOption} />
          )}
          {activeJoinOption && activeJoinOption !== 'qr' && (
            <FeatureView darkMode={darkMode} joinOption={activeJoinOption} />
          )}
        </div>
      </div>
    </div>
  );
};

// Header with dark mode toggle, cancel, avatar, and back button
const Header = ({ darkMode, iconColor, toggleDarkMode, showBackButton, onBackClick }) => (
  <div className="relative h-24 bg-gray-500/30 flex items-center px-4">
    <Link to="/">
      <button className="absolute top-3 right-3 text-2xl rounded-full p-1 hover:bg-gray-600 transition" aria-label="Close">
        <IoExitOutline className={iconColor} />
      </button>
    </Link>

    <button
      onClick={toggleDarkMode}
      className="absolute top-3 right-14 text-2xl rounded-full p-1 hover:bg-gray-600 transition"
      aria-label="Toggle Dark Mode"
    >
      {darkMode ? <IoSunny className={iconColor} /> : <IoMoon className={iconColor} />}
    </button>

    {showBackButton && (
      <button
        onClick={onBackClick}
        className="absolute top-20 right-3 text-2xl rounded-full p-1 hover:bg-gray-600 transition"
        aria-label="Back"
      >
        <MdCancel className={iconColor} />
      </button>
    )}

    <div className="flex gap-4 items-center ml-1">
      <img
        className="w-16 h-16 rounded-full border-2 border-white"
        src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
        alt="Arnob"
      />
      <div className={darkMode ? 'text-white' : 'text-zinc-900'}>
        <p className="text-xl capitalize font-semibold">arnob pandit</p>
        <p className="text-lg font-mono">ID: Aztg54s</p>
      </div>
    </div>
  </div>
);

// The main Join Option button component
const JoinOption = ({ icon, label, darkMode, onClick }) => {
  const buttonBg = darkMode ? 'bg-zinc-600 hover:bg-zinc-500' : 'bg-gray-200 hover:bg-gray-300';
  const textColor = darkMode ? 'text-white' : 'text-zinc-900';

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

// QR submenu with "Scan QR" and "Show QR" buttons
const QrSubmenu = ({ darkMode, openQrSubOption }) => (
  <>
    <JoinOption
      icon={<IoMdQrScanner size={32} />}
      label="Scan QR"
      darkMode={darkMode}
      onClick={() => openQrSubOption('scan')}
    />
    <JoinOption
      icon={<RiQrCodeLine size={32} />}
      label="Show QR"
      darkMode={darkMode}
      onClick={() => openQrSubOption('show')}
    />
  </>
);

// Display area for QR scan or QR code views
const QrFeatureView = ({ darkMode, qrSubOption }) => {
  const textColor = darkMode ? 'text-white' : 'text-zinc-900';

  return (
    <div className={`${textColor} col-span-2 text-center font-semibold`}>
      {qrSubOption === 'scan' ? (
        <QrScanner/>
      ) : (
        <>
          <div className="flex justify-center items-center mt-20">
            <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${"125sga"}&size=150x150`} className='p-2 ' alt="" />
          </div>
        </>
      )}
    </div>
  );
};

// Placeholder display for other join options, can be replaced with real UI 
const FeatureView = ({ darkMode, joinOption }) => {
  const textColor = darkMode ? 'text-white' : 'text-zinc-900';
  const labels = {
    search: 'Search by ID option selected',
    wifi: 'WiFi Hotspot option selected',
    link: 'Share Link option selected',
  };

  return (
    <div className={`${textColor} col-span-2 text-center font-semibold`}>
      {labels[joinOption] || 'Unknown option'}
    </div>
  );
};

export default HomePage;
