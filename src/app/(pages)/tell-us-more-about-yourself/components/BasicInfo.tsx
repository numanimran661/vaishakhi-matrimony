import { selectFields } from "@/app/components/common/allConstants/formConstants";
import DatePicker from "@/app/components/common/inputFields/DatePicker";
import InputField from "@/app/components/common/inputFields/InputField";
import SelectField from "@/app/components/common/inputFields/SelectField";

interface PersonalDetailsProps {
  values: any;
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const BasicInfoForm: React.FC<PersonalDetailsProps> = ({
  values,
  handleInputChange,
  handleSelectChange,
}) => {
  return (
    <>
      <h2 className="text-[24px] leading-[28.8px] text-darkBlue font-semibold w-full">
        Basic Info
      </h2>
      <InputField
        label="Full Name"
        name="fullName"
        value={values.fullName}
        onChange={handleInputChange}
        placeholder="Full Name"
        className="w-full sm:w-[47%]"
      />
      <DatePicker
        onChange={handleInputChange}
        value={values.dob}
        name="dob"
        label="Date Of Birth"
        className="w-full sm:w-[47%]"
      />

      {selectFields?.map((fieldData) => (
        <SelectField
          label={fieldData.label}
          name={fieldData.name}
          value={fieldData.name}
          onChange={handleSelectChange}
          options={fieldData.options}
          className="w-full sm:w-[47%]"
        />
      ))}
    </>
  );
};

export default BasicInfoForm;
