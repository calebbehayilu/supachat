import { auth, db } from "../../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState, useRef } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import ChatMessage from "@/components/chatmessage";

const Chat = (props) => {
  const { room } = props;

  const [user, loading] = useAuthState(auth);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messageRef = collection(db, "messages");

  const ref = useRef(null);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    const queryMessages = query(
      messageRef,
      where("room", "==", room),
      orderBy("createdAt")
    );

    const unsuscrib = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });

      setMessages(messages);
      handleClick();
    });

    return () => unsuscrib();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message === "") return;

    await addDoc(messageRef, {
      text: message,
      createdAt: serverTimestamp(),
      user: user.displayName,
      photoUrl: user.photoURL,
      room,
    });

    setMessage("");
  };

  return (
    <div>
      <main className="text-center">
        <h1>Chat Main</h1>
        <div className="w-[380px]  ">
          <div className=" max-h-[410px] overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-300">
            {messages &&
              messages.map((messages) => (
                <div>
                  {" "}
                  <ChatMessage message={messages} />{" "}
                  <span className="m-0" ref={ref}></span>
                </div>
              ))}
          </div>
          <section className="flex m-2 w-max">
            <form onSubmit={handleSubmit} action="" className="">
              <input
                type="text"
                placeholder="Type your message . . . "
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                className="py-1 px-6 w-72 rounded-xl mx-2 text-slate-600  focus:border-0"
              />
              <button
                type="submit"
                className="bg-blue-400 px-5 py-1 rounded-xl mt-2  "
              >
                Send
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Chat;
