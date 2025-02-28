import Button from "@/app/components/common/buttons/Button";
import DatePicker from "@/app/components/common/inputFields/DatePicker";
import InputField from "@/app/components/common/inputFields/InputField";
import SelectField from "@/app/components/common/inputFields/SelectField";
import { basicInfoFormFields } from "@/constants/formConstants";
import { FormData } from "@/types/formTypes";
import { Field } from "formik";

interface BasicPanelProps {
  formData: FormData;
  handleChange: (name: string, value: string) => void;
}

// Basic Preferences Panel Component
const BasicInfoPanel = ({ formData, handleChange }: BasicPanelProps) => (
  <div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      
    <Field
        as={InputField}
        label="Full Name"
        name="fullName"
        // value={values.fullName}
        placeholder="Full Name"
        className="w-full sm:w-[47%]"
        // error={errors.fullName}
        // touched={touched.fullName}
      />
      <Field
        as={DatePicker}
        // onChange={handleChange}
        // value={values.dob}
        name="dateOfBirth"
        label="Date Of Birth"
        className="w-full sm:w-[47%]"
        // error={errors.dateOfBirth}
        // touched={touched.dateOfBirth}
      />
      {basicInfoFormFields.map((item, i) => (
        <div key={i}>
          <SelectField
            label={item.label}
            name={item.name}
            value={formData[item.name]}
            onChange={(e) => handleChange(item.name, e.target.value)}
            options={item.options}
            className="w-full"
          />
        </div>
      ))}
    </div>
    <Button label="Save Changes" className="mt-5" />
  </div>
);

export default BasicInfoPanel;
