import styles from "../utils/styles";
import { PopupOption } from "./optionsPopup";
import { PrimaryButton, PrimaryButtonVariant } from "./primaryButton";

export type HeaderButtonProps = {
  text: string;
  variant: PrimaryButtonVariant;
  onClick?: () => void;
  options?: PopupOption[];
}[];

interface Props {
  buttons: HeaderButtonProps;
}

function Header({ buttons }: Props) {
  return (
    <header
      className={` p-7 ${styles.flexRow} ${styles.verticalCenter} justify-end gap-5`}
    >
      {buttons.map((button, index) => (
        <PrimaryButton
          type="button"
          onClick={button.onClick ?? undefined}
          variant={button.variant}
          text={button.text}
          key={index}
          options={button.options}
        />
      ))}
    </header>
  );
}

export default Header;
