import React, { useState } from "react";
import JoinOption from "../JoinOption";
import QrSubmenu from "../QrSubmenu";
import QrFeatureView from "../QrFeatureView";
import FeatureView from "../FeatureView";
import { RiQrCodeLine } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { FaWifi } from "react-icons/fa";
import { BiLinkAlt } from "react-icons/bi";
import Header from "../Header";
import useUser from "../hooks/useUser";
import useDarkMode from "../hooks/useDarkMode";

const HomePage = () => {
  const { user } = useUser();
  const { darkMode, toggleDarkMode } = useDarkMode();

  const [activeJoinOption, setActiveJoinOption] = useState(null);
  const [qrSubOption, setQrSubOption] = useState(null);

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

  const cardBg = darkMode ? "bg-zinc-700" : "bg-white";
  const iconColor = darkMode ? "text-white" : "text-zinc-900";

  const showBackButton = qrSubOption || activeJoinOption;

  return (
    <div className="w-full h-screen flex justify-center items-center p-6 bg-black">
      <div className={`w-full max-w-xs h-[calc(100%-60px)] rounded-3xl ${cardBg} shadow-xl overflow-hidden`}>
        <Header
          darkMode={darkMode}
          user={user}
          iconColor={iconColor}
          toggleDarkMode={toggleDarkMode}
          showBackButton={showBackButton}
          onBackClick={qrSubOption ? closeQrSubOption : closeJoinOption}
        />

        <div className="p-6 grid grid-cols-2 gap-6">
          {!activeJoinOption && (
            <>
              <JoinOption icon={<RiQrCodeLine size={32} />} label="Join via QR Code" darkMode={darkMode} onClick={() => openJoinOption("qr")} />
              <JoinOption icon={<FiSearch size={32} />} label="Search by ID" darkMode={darkMode} onClick={() => openJoinOption("search")} />
              <JoinOption icon={<FaWifi size={32} />} label="WiFi Hotspot" darkMode={darkMode} onClick={() => openJoinOption("wifi")} />
              <JoinOption icon={<BiLinkAlt size={32} />} label="Share Link" darkMode={darkMode} onClick={() => openJoinOption("link")} />
            </>
          )}

          {activeJoinOption === "qr" && !qrSubOption && <QrSubmenu darkMode={darkMode} openQrSubOption={openQrSubOption} />}
          {activeJoinOption === "qr" && qrSubOption && <QrFeatureView darkMode={darkMode} qrSubOption={qrSubOption} />}
          {activeJoinOption && activeJoinOption !== "qr" && <FeatureView darkMode={darkMode} joinOption={activeJoinOption} />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
