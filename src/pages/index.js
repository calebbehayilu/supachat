import Image from "next/image";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const [user, loading] = useAuthState(auth);
  const route = useRouter();
  const googleProvider = new GoogleAuthProvider();

  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      route.push("/home");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      route.push("/home");
    } else {
      console.log("login");
    }
  } , [user]);

  if (loading) return <h1>Loading ...</h1>
  if (user) route.push("/home") 
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 `}
    >
      <div className="bg-slate-300 shadow-2xl rounded-xl flex flex-col">
        <h1 className="mt-5 mx-10 text-2xl text-gray-800">Sign up</h1>

        <form action="" className="flex flex-col w-80 mx-10 my-2">
          <input
            className=" px-10 py-2 rounded-lg mt-2 mx-4  "
            type="text"
            placeholder="Username"
            required
          />
          <input
            className=" px-10 py-2 rounded-lg mt-2 mx-4  "
            type="password"
            placeholder="Password"
            required
          />
          <section className="flex justify-between mx-4">
            <button className=" bg-red-400 px-5 py-2 rounded-lg mt-2 w-32 ">
              Log In
            </button>
            <button className=" bg-blue-400 px-5 py-2 rounded-lg mt-2 w-32 ">
              Sign up
            </button>
          </section>
        </form>

        <button
          className=" bg-red-400 px-5 py-2 rounded-lg m-2  w-auto self-center"
          onClick={GoogleLogin}
        >
          Sign in With Google
        </button>
      </div>
    </main>
  );
}
