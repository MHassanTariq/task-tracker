import colors from "./colors";

const styles = {
  horizontalCenter: "justify-center",
  centerChildren: "justify-center items-center",
  verticalCenter: "items-center",
  spaceBetween: "justify-between",
  flexRow: "flex flex-row",
  btnMedium: "rounded-md p-2 text-sm font-bold",
  btnSmall: "rounded-md p-2 text-xs font-bold",
  btnLarge: "rounded-md p-4 text-base font-bold",
  bodyArea: "flex flex-1 flex-col pt-5 lg:px-14 gap-5 ",
  standardBtn:
    "font-bold text-base border-2 rounded flex justify-center items-center",
  sideBarSelectedItem: `${colors.btnGradient} rounded-full font-bold flex flex-1 ${colors.text} px-4 py-1`,
  sideBarUnselectedItem: `flex flex-1 ${colors.text} px-4 py-1`,
  modalContainer: "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  p-6 rounded-lg shadow-lg max-w-lg w-full"

};

export default styles;
