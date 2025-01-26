import React from 'react';

type InputFieldProps = {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'textarea';
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  className = '',
}) => {
  return (
    <div className={`flex flex-col ${className} mt-4`}>
      <label htmlFor={name} className="mb-2 text-sm font-regular text-gray-700">
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
