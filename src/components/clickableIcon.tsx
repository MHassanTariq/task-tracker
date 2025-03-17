import React from "react";

interface ClickableButtonProps {
  label: string;
  onClick: () => void;
  styleClass?: string; // Optional CSS class for styling
}

const ClickableButton: React.FC<ClickableButtonProps> = ({
  label,
  onClick,
  styleClass = "",
}) => {
  return (
    <button onClick={onClick} className={styleClass}>
      {label}
    </button>
  );
};

export default ClickableButton;
