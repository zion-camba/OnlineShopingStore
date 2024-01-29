import React from "react";

interface ButtonProps {
  label: string;
  isDisabled?: boolean;
  onClick: () => void;
}

const Button = ({ label, isDisabled, onClick }: ButtonProps) => {
  return (
    <button
      style={{
        borderRadius: 25,
        padding: 6,
        background: isDisabled ? "gray" : "green",
      }}
      onClick={onClick}
      disabled={isDisabled ? true : false}
    >
      {label}
    </button>
  );
};

export default Button;
