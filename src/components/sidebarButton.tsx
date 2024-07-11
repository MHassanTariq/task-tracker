import { ButtonBase } from "@mui/material";

interface Props {
  text: string;
  onClick?: () => void;
  isSelected?: boolean;
}

export function SideBarButton({ text, isSelected = false, onClick }: Props) {
  function getAppearanceFromVariant() {
    const btnTextStyle = "text-gainsboro font-bold text-base";
    if (!isSelected) return btnTextStyle;
    return `${btnTextStyle} bg-ebonyClay`;
  }

  return (
    <ButtonBase type={"button"} onClick={onClick}>
      <p
        className={`${getAppearanceFromVariant()} rounded py-1.5 px-3.5 flex flex-1`}
      >
        {text}
      </p>
    </ButtonBase>
  );
}
