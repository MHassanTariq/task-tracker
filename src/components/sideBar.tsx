import Logo from "../assets/svgs/logo";
import colors from "../utils/colors";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <div className={`xsm:hidden lg:flex flex-col p-7 ${colors.navBarBg} w-60`}>
      <Logo />
      <ul className="mt-9 space-y-9">
        <li className="flex items-center">
          <Link
            to="/backlog"
            className="flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white"
          >
            Backlog
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
