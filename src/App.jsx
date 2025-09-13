import { RiAttachment2 } from "react-icons/ri";
import { LuSend } from "react-icons/lu";
import { MdCancel } from "react-icons/md";
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center bg-gradient-to-br from-zinc-900 to-zinc-800">
        <div className="w-full max-w-xs h-[80vh] rounded-3xl bg-zinc-700 flex flex-col justify-center items-center space-y-8 p-8 shadow-xl">
          <h1 className="text-white text-3xl font-bold mb-4 text-center">Welcome to Snape</h1>
          <p className="text-zinc-300 text-center">
            Fast and easy file sharing with multiple connection options.
          </p>
          <Link to="/home" className="w-52 h-72 flex justify-center items-center bg-amber-400 hover:bg-amber-300 rounded-full font-semibold text-zinc-900 text-3xl hover:scale-95 cursor-pointer duration-300 font-serif shadow-md transition">
            Connect
          </Link>
          <small className="text-zinc-400 text-center max-w-xs">
            Connect with friends via QR code, search, WiFi hotspot, or link sharing.
          </small>
        </div>
      </div>
    </>
  );
}

export default App;
