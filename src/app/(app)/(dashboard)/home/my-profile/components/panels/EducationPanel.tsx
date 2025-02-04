import Button from "@/app/components/common/buttons/Button";
import SelectField from "@/app/components/common/inputFields/SelectField";
import { dropdownOptions } from "@/constants/dummyConstants";
import { educationFields } from "@/constants/formConstants";
import { FormData } from "@/types/formTypes";

interface PreferencesPanelProps {
  formData: FormData;
  handleChange: (name: string, value: string) => void;
}

// Preferences Panel Component
const EducationPanel = ({
  formData,
  handleChange,
}: PreferencesPanelProps) => (
  <div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {educationFields.map((item, i) => (
        <div key={i}>
          <SelectField
            label={item.label}
            name={item.name}
            value={formData[item.name]}
            onChange={(e) => handleChange(item.name, e.target.value)}
            options={dropdownOptions}
            className="w-full"
          />
        </div>
      ))}
    </div>
    <Button label="Save Changes" className="mt-5" />
  </div>
);

export default EducationPanel;
