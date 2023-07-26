import Link from "next/link";
import { auth } from "../../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  return (
    <div className="text-center">
      <h1>Welcome To the dashBoard</h1>

      <section>
       
      </section>
    </div>
  );
};

export default Dashboard;
