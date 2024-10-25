import { BacklogIcon } from "../assets/svgs/backlogIcon";
import Logo from "../assets/svgs/logo";
import { TaskListIcon } from "../assets/svgs/taskListIcon";
import colors from "../utils/colors";
import { Link } from "react-router-dom";
import styles from "../utils/styles";

function SideBar() {
  const unselectedStyles = `flex flex-1 ${colors.text} px-2 py-1`;
  const selectedStyles = `${colors.btnGradient} rounded-full font-bold ${unselectedStyles}`;

  function renderLinkAndIcon(
    path: string,
    text: string,
    className: string,
    Icon: React.FC
  ) {
    return (
      <div className={`flex ${styles.verticalCenter} ${className} gap-2`}>
        <Icon />
        <Link to={path}>{text}</Link>
      </div>
    );
  }

  return (
    <div className={`xsm:hidden lg:flex flex-col p-5 ${colors.navBarBg} w-60`}>
      <Logo />
      <div className="mt-8 gap-5 flex flex-col">
        {renderLinkAndIcon("/", "Task Board", selectedStyles, TaskListIcon)}
        {renderLinkAndIcon(
          "/backlog",
          "Backlog",
          unselectedStyles,
          BacklogIcon
        )}
      </div>
    </div>
  );
}

export default SideBar;
