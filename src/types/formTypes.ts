export type initialValuesProps = {
  fullName: string;
  age: string;
  gender: string;
  height: string;
  dob: string;
  maritalStatus: string;
  religion: string;
  motherTongue: string;
  cast: string;
  city: string;
};


export type SelectOption = {
  value: string;
  label: string;
};

export type SelectFieldConstantsProps = {
  label: string;
  name: string;
  options: SelectOption[];
}[];

export type SelectFieldProps = {
  label?: string;
  name: string;
  options: { value: string; label: string }[];
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
};

export type InputFieldProps = {
  label: string;
  name: string;
  type?: "text" | "email" | "password" | "number";
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  classNameLabel?: string;
};

export type initialValuesPersonalProps = {
  hd: string;
  occupation: string;
  employment: string;
  ai: string;
  wl: string;
};


export interface FormData {
  [key: string]: string;
}