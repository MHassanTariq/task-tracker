import styles from "../utils/styles";
import { PrimaryButton, PrimaryButtonVariant } from "./primaryButton";

export type HeaderButtonProps = {
  text: string;
  onClick: () => void;
  variant: PrimaryButtonVariant;
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
          onClick={button.onClick}
          variant={button.variant}
          text={button.text}
          key={index}
        />
      ))}
    </header>
  );
}

export default Header;
