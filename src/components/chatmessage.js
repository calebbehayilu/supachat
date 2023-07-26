import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../utils/firebase";

const ChatMessage = (props) => {
  const [user, loading] = useAuthState(auth);
  const { text, user: messageUser, photoUrl } = props.message;

  const sent = "  flex-row-reverse justify-start";
  const received = "justify-start ";

  const messageUserText = messageUser === user.displayName ? sent : received;
  return (
    <div className="rounded-lg">
      <div className={`flex ${messageUserText} text-yellow-400 m-5 break-all`}>
        <img
          className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0 "
          src={
            photoUrl ||
            "https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg"
          }
          alt=""
        />
        <h1 className="relative ml-1 text-sm py-2 px-4 rounded-xl ">{text}</h1>
      </div>
    </div>
  );
};

export default ChatMessage;
