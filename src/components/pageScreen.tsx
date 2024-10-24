import { DragDropContext, OnDragEndResponder } from "react-beautiful-dnd";
import { Doodles } from "../assets/svgs/doodles";
import SideBar from "./sideBar";
import colors from "../utils/colors";
import styles from "../utils/styles";
import Header, { HeaderButtonProps } from "./header";

interface Props {
  headerButtons?: HeaderButtonProps;
  children?: React.ReactNode;
  onDragEnd?: OnDragEndResponder;
}

function PageScreen({ headerButtons = [], children, onDragEnd }: Props) {
  function renderScreenUI() {
    return (
      <div
        className={`flex relative flex-1 h-screen w-full ${colors.bg} overflow-hidden`}
      >
        <Doodles />
        <div className={`flex-1 relative ${colors.bodyBg} w-full h-full`}>
          <div className={`${styles.flexRow} h-full relative z-10 w-full`}>
            <SideBar />
            <div
              className={`flex flex-1 flex-col overflow-auto ${colors.bodyBg}`}
            >
              <Header buttons={headerButtons} />
              <div className="flex flex-1 flex-col pb-20 px-5">{children}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderDraggableScreenUI() {
    if (onDragEnd)
      return (
        <DragDropContext onDragEnd={onDragEnd}>
          {renderScreenUI()}
        </DragDropContext>
      );

    return renderScreenUI();
  }
  return renderDraggableScreenUI();
}

export default PageScreen;
