import React, { useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router-dom";

const QrScanner = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const qrCodeRegionId = "reader";
    const html5QrCode = new Html5Qrcode(qrCodeRegionId);

    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length) {
          const backCamera =
            devices.find((device) =>
              device.label.toLowerCase().includes("back")
            ) || devices[0];

          const cameraId = backCamera.id;

          html5QrCode
            .start(
              cameraId,
              { fps: 10, qrbox: { width: 250, height: 250 } },
              (decodedText) => {
                console.log("QR Code detected: ", decodedText);

                // ✅ এখানে ডাটা পাঠাচ্ছি
                navigate("/share", { state: { qrData: decodedText } });
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
        .then(() => console.log("QR Code scanning stopped."))
        .catch((err) => console.error("Error while stopping scanner:", err));
    };
  }, [navigate]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h2 className="text-xl font-bold mb-4">QR Code Scanner</h2>
      <div id="reader"></div>
    </div>
  );
};

export default QrScanner;
