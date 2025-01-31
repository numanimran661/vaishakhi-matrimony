import React, { ChangeEvent } from "react";
import Image from "next/image";

type InputFieldProps = {
  label?: string;
  name: string;
  type?: "text" | "email" | "password" | "number" | "textarea";
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
  classNameLabel?: string;
  icon?: string;
  altText?: string;
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
  icon,
  altText = "icon",
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
            className={`${
              icon && "pl-10 "
            } px-3 py-2 border border-gray rounded-xl h-28 focus:outline-none w-full placeholder:text-top`}
          />
        ) : (
          <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`${
              icon && "pl-10 "
            } px-3 py-2 border border-gray rounded-xl h-12 focus:outline-none w-full pr-10`}
          />
        )}
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Image src={icon} alt={altText} width={20} height={20} />
          </div>
        )}
      </div>
    {/* <div className={`flex flex-col ${className} mt-4`}>
      <label htmlFor={name} className={`mb-2 text-[16px] text-[#1C264E] font-semibold leading-5${classNameLabel}`}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="px-3 py-2 border border-gray rounded-xl h-12 focus:outline-none"
      /> */}
    </div>
  );
};

export default InputField;
