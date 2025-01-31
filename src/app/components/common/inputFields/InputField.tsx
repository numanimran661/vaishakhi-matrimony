import { InputFieldProps } from '@/types/formTypes';
import React from 'react';

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  className = '',
  classNameLabel = "",
}) => {
  return (
    <div className={`flex flex-col ${className} mt-4`}>
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
      />
    </div>
  );
};

export default InputField;
