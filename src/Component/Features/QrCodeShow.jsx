import React, { useState } from "react";

const QrCodeShow = ({ data = "abcd123", size = 150 }) => {
  const [loading, setLoading] = useState(true);

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
    data
  )}&size=${size}x${size}`;

  return (
    <div className="flex justify-center items-center mt-20">
      <div className="bg-white rounded-xl p-2 shadow-md">
        {loading && (
          <div
            className="flex items-center justify-center"
            style={{ width: size, height: size }}
          >
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
