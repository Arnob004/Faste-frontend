import React from "react";
import QrScanner from "./Features/QrScanner";
import QrCodeShow from "./Features/QrCodeShow";

const QrFeatureView = ({ darkMode, qrSubOption, qrData }) => {
  const textColor = darkMode ? "text-white" : "text-zinc-900";

  const renderView = () => {
    switch (qrSubOption) {
      case "scan":
        return <QrScanner />;
      case "show":
        return <QrCodeShow data={qrData || "default-id"} size={200} />;
      default:
        return <p className={`${textColor} mt-6`}>No option selected</p>;
    }
  };

  return (
    <div className={`${textColor} col-span-2 text-center font-semibold`}>
      {renderView()}
    </div>
  );
};

export default QrFeatureView;
