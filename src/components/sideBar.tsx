import Logo from "../assets/svgs/logo";
import { formatDate } from "../helpers/dateTimeHelper";
import colors from "../utils/colors";
import Seperator from "./seperator";
import { SideBarButton } from "./sidebarButton";

interface Props {
  dates: Date[];
  onClickDate: (date: Date) => void;
}

function SideBar({ dates, onClickDate }: Props) {
  return (
    <div className={`xsm:hidden lg:flex flex-col p-7 ${colors.navBarBg} w-60`}>
      <Logo />
      {/* <div className="mt-4 flex flex-col bg-silver overflow-scroll">
        <p>other buttons here</p>
        <p>other buttons here</p>
        <p>other buttons here</p>
      </div>
      <div className="mt-4 flex flex-col flex-1 overflow-scroll">
        <Seperator title={"Dates"} shouldRender position="center" />
        <SideBarButton
          text={formatDate(new Date())}
          onClick={() => {}}
          isSelected
        />
      </div> */}
    </div>
  );
}

export default SideBar;
