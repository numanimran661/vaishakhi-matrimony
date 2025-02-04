import React from 'react';

type DatePickerProps = {
  label: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  name,
  value,
  onChange,
  className = '',
}) => {
  return (
    <div className={`flex flex-col ${className} text-[#949494]`}>
      <label
        htmlFor={name}
        className="mb-2 text-[16px] text-[#1C264E] font-semibold leading-5"
      >
        {label}
      </label>
      <input
        type="date"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="px-3 py-2 border border-gray rounded-xl h-12 focus:outline-none bg-white uppercase"
      />
    </div>
  );
};

export default DatePicker;
