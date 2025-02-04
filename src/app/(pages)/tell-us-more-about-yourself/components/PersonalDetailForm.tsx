import SelectField from "@/app/components/common/inputFields/SelectField";
import { dropdownOptions } from "@/constants/dummyConstants";
import { personalPanelFields } from "@/constants/formConstants";

interface PersonalDetailsProps {
  values: any;
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const PersonalDetailForm: React.FC<PersonalDetailsProps> = ({
  values,
  handleInputChange,
  handleSelectChange,
}) => {
  return (
    <>
      <h2 className="text-[24px] leading-[28.8px] w-full text-darkBlue font-semibold">
        Personal Details
      </h2>

      {personalPanelFields?.map((fieldData) => (
        <SelectField
          label={fieldData.label}
          name={fieldData.name}
          value={values[fieldData.name]}
          onChange={handleSelectChange}
          options={dropdownOptions}
          className="w-full sm:w-[47%]"
        />
      ))}
    </>
  );
};

export default PersonalDetailForm;
