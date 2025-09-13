import React from 'react';

const QrCodeShow = ({ data, setShowQr }) => {
  const close = () => {
    if (typeof setShowQr === 'function') setShowQr(false);
  };

  return (
    <div
      onClick={close}
      className="fixed inset-0 bg-transparent bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="relative bg-white dark:bg-slate-800 border text-gray-800 dark:text-white rounded-2xl shadow-xl  py-10 p-4"
      >
        {/* Close Button */}
        <button
          onClick={close}
          className="absolute hover:scale-110 hover:rotate-12 top-0 right-2.5 text-3xl font-bold text-gray-400 hover:text-red-500 transition-colors"
          title="Close"
        >
          &times;
        </button>
        {/* Title */}
        <h3 className="font-semibold text-center mb-6 text-2xl">Scan This QR Code</h3>
        {/* QR Image */}
        <div className="flex justify-center">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?data=${data}&size=150x150`}
            alt="User QR Code"
            className="rounded-xl p-3 scale-110 bg-white border border-gray-300 dark:border-gray-600 shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default QrCodeShow;
