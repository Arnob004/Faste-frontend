import React from "react";
import { LuSend } from "react-icons/lu";
import { MdCancel } from "react-icons/md";
import { RiAttachment2 } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

const SharePage = () => {
    // get scanned/connected user data from router state
    const location = useLocation();
    const { currentUser, connectedUser } = location.state || {
        currentUser: {
            name: "Me",
            photo: "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg",
        },
        connectedUser: {
            name: "Unknown",
            photo: "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg",
        },
    };

    return (
        <div>
            <div className="w-full h-screen flex justify-center items-center p-4 bg-zinc-900">
                <div className="w-full max-w-xs h-[90vh] rounded-3xl bg-zinc-700 flex flex-col overflow-hidden shadow-lg">
                    {/* top */}
                    <div className="relative w-full h-14 bg-zinc-600 flex items-center px-4 text-white font-semibold text-lg">
                        <Link to="/home">
                            <button className="absolute top-1 outline-none right-1 text-2xl text-white bg-zinc-700 rounded-full p-1 hover:bg-zinc-800 transition">
                                <MdCancel />
                            </button>
                        </Link>

                        <div className="w-full flex justify-around items-center">
                            {/* current user */}
                            <div className="capitalize flex gap-2.5 items-center">
                                <img
                                    className="w-10 h-10 rounded-full"
                                    src={currentUser.photo}
                                    alt={currentUser.name}
                                />
                                {currentUser.name}
                            </div>

                            {/* connected user */}
                            <div className="flex capitalize gap-2.5 items-center">
                                {connectedUser.name}
                                <img
                                    className="w-10 h-10 rounded-full"
                                    src={connectedUser.photo}
                                    alt={connectedUser.name}
                                />
                            </div>
                        </div>
                    </div>

                    {/* middle (chat area) */}
                    <div className="middle flex-grow bg-zinc-800 p-4 overflow-auto text-white">
                        <p className="text-center text-sm text-zinc-400">
                            Connected with <span className="font-bold">{connectedUser.name}</span>
                        </p>
                        {/* Chat messages will come here */}
                    </div>

                    {/* bottom (input) */}
                    <div className="bottom flex items-center gap-3 px-2 h-16 bg-zinc-600">
                        <button className="w-12 h-8 rounded-md flex justify-center items-center bg-amber-400 hover:bg-amber-300 transition">
                            <RiAttachment2 size={20} />
                        </button>
                        <input
                            type="text"
                            placeholder={`Message ${connectedUser.name}...`}
                            className="flex-grow bg-zinc-700 text-white rounded-md px-3 py-2 outline-none border border-zinc-500 focus:border-amber-400 transition"
                        />
                        <button className="w-12 h-8 rounded-md flex justify-center items-center bg-amber-400 hover:bg-amber-300 transition">
                            <LuSend size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SharePage;
