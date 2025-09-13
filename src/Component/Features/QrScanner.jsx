import React, { useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";

const QrScanner = () => {
  useEffect(() => {
    const qrCodeRegionId = "reader";
    const html5QrCode = new Html5Qrcode(qrCodeRegionId);

    // Available cameras fetch
    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length) {
          // প্রথম camera নাও (চাইলে dropdown দিয়ে select করা যাবে)
          const cameraId = devices[0].id;
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
    <div>
      <h2 className="text-xl font-bold mb-2">QR Code Scanner</h2>
      <div id="reader" style={{ width: "300px", height: "300px" }}></div>
    </div>
  );
};

export default QrScanner;
