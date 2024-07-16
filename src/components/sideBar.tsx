import Logo from "../assets/svgs/logo";
import colors from "../utils/colors";

function SideBar() {
  return (
    <div className={`xsm:hidden lg:flex flex-col p-7 ${colors.navBarBg} w-60`}>
      <Logo />
    </div>
  );
}

export default SideBar;
