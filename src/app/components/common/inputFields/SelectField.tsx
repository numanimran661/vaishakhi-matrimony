import { SelectFieldProps } from "@/types/formTypes";
import React from "react";

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  options,
  className = "",
  onChange
}) => {

  return (
    <div className={`flex flex-col ${className} mt-4 text-[#949494]`}>
      <label
        htmlFor={name}
        className="mb-2 text-[16px] text-[#1C264E] font-semibold leading-5"
      >
        {label}
      </label>
      <select
        id={name}
        onChange={onChange}
        className="px-3 py-2 border border-gray rounded-xl h-12 focus:outline-none bg-white"
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
