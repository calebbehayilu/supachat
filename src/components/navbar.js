import Link from "next/link";
import { auth } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {
  const [user, loading] = useAuthState(auth);

  return (
    <nav className="mt-5 flex justify-around">
      <Link href={"/"}>
        <h1 className=" mt-1 sm:text-3xl">🔥Supachat </h1>
      </Link>
      <ul className="flex">
        <Link href={"/"} className="px-4 pt-2">
          <li>Home</li>
        </Link>
        <Link href={"/chat"} className="px-4 pt-2">
          <li>Chat</li>
        </Link>
        <Link href={"/about"} className="px-4 pt-2">
          <li>About</li>
        </Link>
        {user && (
          <li className="px-4">
            <div>
              <Link href={"/home/dashboard"}>
                <img
                  src={user.photoURL}
                  alt="avatar"
                  referrerPolicy="no-referrer"
                  className="w-12 rounded-full"
                />
              </Link>
            </div>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
