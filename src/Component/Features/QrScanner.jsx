import React, { useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";

const QrScanner = () => {
  useEffect(() => {
    const qrCodeRegionId = "reader";
    const html5QrCode = new Html5Qrcode(qrCodeRegionId);
    // Get available cameras
    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length) {
          // Try to find back camera (environment facing)
          const backCamera = devices.find(device => device.label.toLowerCase().includes("back")) || devices[0];
          const cameraId = backCamera.id;
          html5QrCode
            .start(
              cameraId,
              {
                fps: 10,
                qrbox: { width: 250, height: 250 },
              },
              (decodedText) => {
                console.log("QR Code detected: ", decodedText);
                alert(`QR Code detected: ${decodedText}`);
              },
              (errorMessage) => {
                console.log("Scanning error: ", errorMessage);
              }
            )
            .catch((err) => {
              console.error("Unable to start scanning.", err);
            });
        } else {
          console.error("No cameras found.");
        }
      })
      .catch((err) => {
        console.error("Error while fetching cameras:", err);
      });

    return () => {
      html5QrCode
        .stop()
        .then(() => {
          console.log("QR Code scanning stopped.");
        })
        .catch((err) => {
          console.error("Error while stopping scanner:", err);
        });
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h2 className="text-xl font-bold mb-4">QR Code Scanner</h2>
      <div
        id="reader"
        className="relative w-[300px] h-[300px] border-4 border-green-500 rounded-lg box-border"
      >
        {/* Corner accents */}
        <div
          className="absolute top-0 left-0 w-5 h-5 border-4 border-green-500 border-r-0 border-b-0"
          style={{ boxSizing: "border-box" }}
        ></div>
        <div
          className="absolute bottom-0 right-0 w-5 h-5 border-4 border-green-500 border-l-0 border-t-0"
          style={{ boxSizing: "border-box" }}
        ></div>
      </div>
    </div>
  );
};

export default QrScanner;
