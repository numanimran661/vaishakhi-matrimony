import Button from "@/app/components/common/buttons/Button";
import SelectField from "@/app/components/common/inputFields/SelectField";
import {
  dropdownOptions,
} from "@/constants/dummyConstants";
import { basicPanelFormFields } from "@/constants/formConstants";
import { FormData } from "@/types/formTypes";

interface BasicPanelProps {
  formData: FormData;
  handleChange: (name: string, value: string) => void;
}

// Basic Preferences Panel Component
const BasicPanel = ({ formData, handleChange }: BasicPanelProps) => (
  <div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {basicPanelFormFields.map((item, i) => (
        <div
          key={i}
          className={item.isRange ? "grid grid-cols-2 gap-2 items-end" : ""}
        >
          <SelectField
            label={item.label}
            name={item.name}
            value={formData[item.name]}
            onChange={(e) => handleChange(item.name, e.target.value)}
            options={item.options}
            className="w-full"
          />
          {item.isRange && (
            <div className="flex items-center gap-2">
              <label
                htmlFor={`${item.name}To`}
                className="text-sm text-darkBlue font-semibold leading-5 mt-2"
              >
                To
              </label>
              <SelectField
                name={`${item.name}To`}
                value={formData[`${item.name}To`]}
                onChange={(e) => handleChange(`${item.name}To`, e.target.value)}
                options={item.options}
                className="w-full"
              />
            </div>
          )}
        </div>
      ))}
    </div>
    <Button label="Save Changes" className="mt-5" />
  </div>
);

export default BasicPanel;
