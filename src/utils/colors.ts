const mode = "dark";

const COLORS = {
  dark: {
    // text colors
    text: "text-gainsboro",
    fadedText: "text-silver",
    cardFadedText: "text-silver",
    titleText: "text-base md:text-2xl text-gainsboro font-bold",

    // btn colors
    greenBtn: "bg-green-700",
    redBtn: "bg-red-700",
    whiteBorderBtn: "border-2 border-gray-400",
    btnGradient:
      "bg-gradient-to-r from-lavanderBlue from-0% via-lavanderIndigo via-39% to-skyMagenta to-100%",
    txtBtnGradient:
      "text-gradient-to-r from-lavanderBlue from-0% via-lavanderIndigo via-39% to-skyMagenta to-100%",

    // border colors
    fadedBorderBg: "border-silver",

    // bg colors
    bg: "bg-gradient-to-bl from-duskyBlue to-darkTeal",
    navBarBg: "bg-black/[.3] backdrop-blur-xs",
    bodyBg: "bg-slate-400",
    taskCardBg: "bg-darkTeal/[0.7] backdrop-blur-xs",
    glassyDarkBg: "bg-darkTeal/[0.7] backdrop-blur-xs",
    modalOverlay: "bg-white ",
    modalbg: "#252A40"    
  },
};

export default COLORS[mode];
