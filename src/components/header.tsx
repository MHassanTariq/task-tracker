import styles from "../utils/styles";
import DrawerMenu from "./drawerMenu";
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
  function renderHeaderButtons() {
    return (
      <header
        className={`${styles.flexRow} ${styles.verticalCenter} justify-end gap-2 md:gap-5  flex-1`}
      >
        {buttons.map((button, index) => (
          <PrimaryButton
            type="button"
            onClick={button.onClick ?? undefined}
            variant={button.variant}
            text={button.text}
            options={button.options}
            key={index}
          />
        ))}
      </header>
    );
  }

  return (
    <div
      className={`p-7 ${styles.flexRow} justify-between ${styles.verticalCenter} `}
    >
      <DrawerMenu />
      {renderHeaderButtons()}
    </div>
  );
}

export default Header;
