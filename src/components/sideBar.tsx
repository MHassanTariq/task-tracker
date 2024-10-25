import Logo from "../assets/svgs/logo";
import colors from "../utils/colors";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <div className={`xsm:hidden lg:flex flex-col p-7 ${colors.navBarBg} w-60`}>
      <Logo />
      <ul className="mt-8  space-7-8">
        <li className="flex items-center">
          <Link
            to="/Home"
            className={`${colors.btnGradient} flex flex-1 rounded-full ${colors.text} px-2 py-1`}
          >
            TaskBoard
          </Link>
        </li>
      </ul>
      <ul className="mt-9 space-y-9">
        <li className="flex items-center">
          <Link to="/backlog" className="btnGradient">
            Backlog
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
