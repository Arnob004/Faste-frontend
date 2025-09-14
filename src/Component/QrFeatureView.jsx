import React from "react";
import QrScanner from "./Features/QrScanner";
import QrCodeShow from "./Features/QrCodeShow";

const QrFeatureView = ({ darkMode, qrSubOption }) => {
  const textColor = darkMode ? "text-white" : "text-zinc-900";

  return (
    <div className={`${textColor} col-span-2 text-center font-semibold`}>
      {qrSubOption === "scan" ? <QrScanner /> : <QrCodeShow />}
    </div>
  );
};

export default QrFeatureView;
