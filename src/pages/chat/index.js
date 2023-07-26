import Link from "next/link";
import { auth, db } from "../../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import Chat from "./chat";

const ChatHome = () => {
  const [user, loading] = useAuthState(auth);
  const [room, setRoom] = useState(null);

  const roomInputRef = useRef(null);

  const route = useRouter();
  if (loading) return <h1>Loading . . . </h1>;
  if (!user) route.push("/");
  if (user)
    return (
      <div className="flex justify-center m-5 p-5 max-h-screen">
        {room ? (
          <Chat room={room} />
        ) : (
          <div className="flex flex-col ] ">
            <label htmlFor="" className="text-center mb-1">
              Enter Room Name
            </label>
            <input
              ref={roomInputRef}
              className="py-1 px-6 rounded-xl mx-2 text-slate-600  focus:border-0"
            />
            <button className=" mx-2 bg-blue-400 px-5 py-1 rounded-xl mt-2" onClick={() => setRoom(roomInputRef.current.value)}>
              Enter Chat
            </button>
          </div>
        )}
      </div>
    );
};

export default ChatHome;
