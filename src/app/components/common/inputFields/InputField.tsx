import React, { ChangeEvent, ElementType } from "react";

type InputFieldProps = {
  label?: string;
  name: string;
  type?: "text" | "email" | "password" | "number" | "textarea";
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
  classNameLabel?: string;
  icon?: ElementType;
  disabled?: boolean;
  error?: string; // Add error prop
  touched?: boolean; // Add touched prop
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  className = "",
  classNameLabel = "",
  icon: Icon,
  disabled = false,
  error, // Destructure error
  touched, // Destructure touched
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className={`mb-2 text-sm font-regular text-gray-700 ${classNameLabel}`}
        >
          {label}
        </label>
      )}
      <div className="relative">
        {type === "textarea" ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className={`${
              Icon && "pl-10 "
            } px-3 py-2 border ${
              error && touched ? "border-red-500" : "border-gray"
            } rounded-xl h-28 focus:outline-none w-full placeholder:text-top`}
          />
        ) : (
          <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className={`${
              Icon && "pl-10 "
            } px-3 py-2 border ${
              error && touched ? "border-red-500" : "border-gray"
            } rounded-xl h-12 focus:outline-none w-full pr-10`}
          />
        )}
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Icon width={20} height={20} />
          </div>
        )}
      </div>
      {/* Display error message if error exists and the field has been touched */}
      {error && touched && (
        <div className="text-red-500 text-sm mt-1">{error}</div>
      )}
    </div>
  );
};

export default InputField;