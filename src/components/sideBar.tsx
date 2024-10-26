import { BacklogIcon } from "../assets/svgs/backlogIcon";
import Logo from "../assets/svgs/logo";
import { TaskListIcon } from "../assets/svgs/taskListIcon";
import colors from "../utils/colors";
import { Link, useLocation } from "react-router-dom";
import styles from "../utils/styles";

function SideBar() {
  const location = useLocation(); // Get the current location
  const unselectedStyles = `flex flex-1 ${colors.text} px-4 py-1`;
  const selectedStyles = `${colors.btnGradient} rounded-full font-bold ${unselectedStyles}`;

  function renderLinkAndIcon(path: string, text: string, Icon: React.FC) {
    const isSelected = location.pathname === path;
    const linkStyles = isSelected ? selectedStyles : unselectedStyles;

    return (
      <div className={`flex ${styles.verticalCenter} ${linkStyles} gap-2`}>
        <Icon />
        <Link to={path} className="flex flex-1">
          {text}
        </Link>
      </div>
    );
  }

  return (
    <div className={`xsm:hidden lg:flex flex-col p-5 ${colors.navBarBg} w-60`}>
      <Logo />
      <div className="mt-8 gap-5 flex flex-col">
        {renderLinkAndIcon("/", "Task Board", TaskListIcon)}
        {renderLinkAndIcon("/backlog", "Backlog", BacklogIcon)}
      </div>
    </div>
  );
}

export default SideBar;
