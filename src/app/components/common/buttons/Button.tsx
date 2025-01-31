import Image from "next/image";
import React from "react";

type ButtonProps = {
  label: string;
  onClick?: () => void;
  icon?: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "transparent" | "light" | "transparentOrange";
  disabled?: boolean;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
  icon,
}) => {
  const baseStyle = "px-5 py-3 flex justify-center items-center gap-1 font-semibold rounded-full";
  const variantStyles = {
    primary:
      "bg-primary text-white hover:bg-orange-700",
    secondary:
      "bg-white border border-primary text-primary hover:bg-gray-300",
    transparent:
      "bg-white text-darkBlue hover:text-blue-900",
    light:
      "bg-lightBlue text-darkBlue hover:text-blue-900",
    transparentOrange: "bg-transparent text-[#F97E27] border border-[#F97E27] rounded-full"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variantStyles[variant]} ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {icon && (
        <span>
          <Image src={icon} alt={""} />
        </span>
      )}
      <span className="text-nowrap">{label}</span>
    </button>
  );
};

export default Button;
