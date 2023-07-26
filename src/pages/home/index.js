import { auth } from "../../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

const MainPage = () => {
  const [user, loading] = useAuthState(auth);
  const route = useRouter();

  if (loading) return <h1>Loading ...</h1>;
  if (!user) route.push("/");
  if (user)
    return (
      <div className=" m-5">
        <h1>Home Page </h1>
        <button
          onClick={() => auth.signOut()}
          className="bg-teal-200  rounded-xl px-4 py-2"
        >
          Log Out
        </button>
      </div>
    );
};

export default MainPage;
