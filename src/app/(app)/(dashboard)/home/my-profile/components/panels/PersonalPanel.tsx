import Button from "@/app/components/common/buttons/Button";
import SelectField from "@/app/components/common/inputFields/SelectField";
import { dropdownOptions } from "@/constants/dummyConstants";
import { personalPanelFields } from "@/constants/formConstants";
import { FormData } from "@/types/formTypes";

interface PersonalPanelProps {
  formData: FormData;
  handleChange: (name: string, value: string) => void;
}

// Basic Preferences Panel Component
const PersonalPanel = ({ formData, handleChange }: PersonalPanelProps) => (
  <div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {personalPanelFields.map((item, i) => (
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

export default PersonalPanel;
