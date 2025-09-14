import React, { useState } from "react";

const QrCodeShow = () => {
  const [loading, setLoading] = useState(true);

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${"125sga"}&size=150x150`;

  return (
    <div className="flex justify-center items-center mt-20">
      <div className="bg-white rounded-xl p-1 shadow-md">
        {loading && (
          <div className="w-[150px] h-[150px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-700"></div>
          </div>
        )}
        <img
          src={qrUrl}
          alt="QR Code"
          className="rounded-xl p-1"
          style={{ display: loading ? "none" : "block" }}
          onLoad={() => setLoading(false)}
        />
      </div>
    </div>
  );
};

export default QrCodeShow;
