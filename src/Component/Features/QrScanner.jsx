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
    <>
      <style>
        {`
          #reader {
            position: relative;
            width: 300px;
            height: 300px;
            border: 3px solid #4CAF50; /* Green border for visibility */
            border-radius: 8px; /* Rounded corners if desired */
            box-sizing: border-box;
            margin: 0 auto;
          }

          /* Optional corners as accents */
          #reader::before, #reader::after {
            content: "";
            position: absolute;
            width: 20px;
            height: 20px;
            border: 3px solid #4CAF50;
            box-sizing: border-box;
          }

          /* Top-left corner */
          #reader::before {
            top: 0;
            left: 0;
            border-right: none;
            border-bottom: none;
          }

          /* Bottom-right corner */
          #reader::after {
            bottom: 0;
            right: 0;
            border-left: none;
            border-top: none;
          }
        `}
      </style>
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h2 className="text-xl font-bold mb-4">QR Code Scanner</h2>
        <div id="reader"></div>
      </div>
    </>
  );
};

export default QrScanner;
