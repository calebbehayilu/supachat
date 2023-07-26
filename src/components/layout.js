import Navbar from "./navbar";
import { Inter, Josefin_Sans } from "next/font/google";

const josefin_Sans = Josefin_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-josefin_sans",
});

const Layout = ({ children }) => {
  return (
    <div className={`${josefin_Sans.className} text-gray-200 
    flex flex-col justify-between overscroll-none`}>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
