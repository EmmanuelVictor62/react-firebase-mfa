import React from "react";

import styles from "./button.module.scss";

interface ButtonProps {
  label: string;
  type: "button" | "submit";
  buttonStyles?: React.CSSProperties;
  handleClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  label,

  type,
  buttonStyles,
  handleClick,
}) => {
  return (
    <button
      role="button"
      type={type}
      className={`${styles["button"]} `}
      onClick={handleClick}
      style={buttonStyles}
    >
      {label}
    </button>
  );
};

export default Button;
