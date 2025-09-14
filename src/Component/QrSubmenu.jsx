import React from "react";
import { IoMdQrScanner } from "react-icons/io";
import { RiQrCodeLine } from "react-icons/ri";
import JoinOption from "./JoinOption";

const QrSubmenu = ({ darkMode, openQrSubOption }) => {
  return (
    <>
      <JoinOption
        icon={<IoMdQrScanner size={32} />}
        label="Scan QR"
        darkMode={darkMode}
        onClick={() => openQrSubOption("scan")}
      />
      <JoinOption
        icon={<RiQrCodeLine size={32} />}
        label="Show QR"
        darkMode={darkMode}
        onClick={() => openQrSubOption("show")}
      />
    </>
  );
};

export default QrSubmenu;
