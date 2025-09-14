import React, { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

const QrScanner = () => {
  const [loading, setLoading] = useState(true);
  const [flashAvailable, setFlashAvailable] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const [html5QrCode, setHtml5QrCode] = useState(null);

  useEffect(() => {
    const qrCodeRegionId = "reader";
    const qrScanner = new Html5Qrcode(qrCodeRegionId);
    setHtml5QrCode(qrScanner);

    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length) {
          const backCamera =
            devices.find((device) =>
              device.label.toLowerCase().includes("back")
            ) || devices[0];
          const cameraId = backCamera.id;

          qrScanner
            .start(
              cameraId,
              {
                fps: 10,
                qrbox: { width: 250, height: 250 },
              },
              (decodedText) => {
                console.log("QR Code detected:", decodedText);
                alert(`QR Code detected: ${decodedText}`);
              },
              (errorMessage) => {
                console.log("Scanning error:", errorMessage);
              }
            )
            .then(() => {
              setLoading(false);

              // flashlight availability check
              const track = qrScanner.getRunningTrack();
              if (track && track.getCapabilities) {
                const caps = track.getCapabilities();
                if (caps.torch) {
                  setFlashAvailable(true);
                }
              }
            })
            .catch((err) => {
              console.error("Unable to start scanning.", err);
              setLoading(false);
            });
        } else {
          console.error("No cameras found.");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error while fetching cameras:", err);
        setLoading(false);
      });

    return () => {
      qrScanner
        .stop()
        .then(() => {
          console.log("QR Code scanning stopped.");
        })
        .catch((err) => {
          console.error("Error while stopping scanner:", err);
        });
    };
  }, []);

  // Toggle Flashlight manually
  const toggleFlash = () => {
    if (!html5QrCode) return;
    const track = html5QrCode.getRunningTrack();
    if (track && track.applyConstraints) {
      track
        .applyConstraints({
          advanced: [{ torch: !flashOn }],
        })
        .then(() => {
          setFlashOn(!flashOn);
        })
        .catch((err) => console.error("Flash toggle error:", err));
    }
  };

  // Auto flashlight in darkness
  useEffect(() => {
    if (!html5QrCode) return;

    let interval = setInterval(() => {
      const video = document.querySelector("#reader video");
      if (video) {
        const brightness = getVideoBrightness(video);
        if (flashAvailable) {
          if (brightness < 40 && !flashOn) {
            toggleFlash(); // turn on
          } else if (brightness > 80 && flashOn) {
            toggleFlash(); // turn off
          }
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [html5QrCode, flashAvailable, flashOn]);

  // brightness detector from video frame
  const getVideoBrightness = (video) => {
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth / 4;
    canvas.height = video.videoHeight / 4;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let sum = 0;
    for (let i = 0; i < frame.data.length; i += 4) {
      sum += frame.data[i]; // only red channel enough for approx brightness
    }
    return sum / (frame.data.length / 4);
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">QR Code Scanner</h2>

      <div className="relative bg-white rounded-xl shadow-lg p-2">
        {loading && (
          <div className="absolute inset-0 flex justify-center items-center bg-white/70 rounded-xl">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-800"></div>
          </div>
        )}
        <div id="reader" className="w-[300px] h-[300px]"></div>
      </div>

      {flashAvailable && (
        <button
          onClick={toggleFlash}
          className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition"
        >
          {flashOn ? "Flashlight ON" : "Flashlight OFF"}
        </button>
      )}
    </div>
  );
};

export default QrScanner;
