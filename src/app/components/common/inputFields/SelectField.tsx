import React from "react";
import { useField } from "formik";

type SelectFieldProps = {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  className?: string;
};

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  options,
  className = "",
}) => {
  // Connect the field to Formik
  const [field, meta] = useField(name);

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
        {...field} // Spread Formik's field props
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
      {meta.touched && meta.error && (
        <span className="text-red-500 text-sm mt-1">{meta.error}</span>
      )}
    </div>
  );
};

export default SelectField;
