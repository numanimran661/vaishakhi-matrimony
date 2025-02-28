import Button from "@/app/components/common/buttons/Button";
import DatePicker from "@/app/components/common/inputFields/DatePicker";
import SelectField from "@/app/components/common/inputFields/SelectField";
import { religionFormFields } from "@/constants/formConstants";
import { FormData } from "@/types/formTypes";
import { Field } from "formik";

interface PreferencesPanelProps {
  formData: FormData;
  handleChange: (name: string, value: string) => void;
}

// Preferences Panel Component
const ReligionPanel = ({
  formData,
  handleChange,
}: PreferencesPanelProps) => (
  <div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {religionFormFields.map((item, i) => (
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
      <Field
        as={DatePicker}
        // onChange={handleChange}
        // value={values.dob}
        name="birthTime"
        label="Birth Time"
        className="w-full sm:w-[47%]"
        // error={errors.dateOfBirth}
        // touched={touched.dateOfBirth}
      />
    </div>
    <Button label="Save Changes" className="mt-5" />
  </div>
);

export default ReligionPanel;
