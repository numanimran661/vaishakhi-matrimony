import Button from "@/app/components/common/buttons/Button";
import InputField from "@/app/components/common/inputFields/InputField";
import { FormData } from "@/types/formTypes";

interface PreferencesPanelProps {
  formData: FormData;
  handleChange: (name: string, value: string) => void;
}

// Preferences Panel Component
const CriteriaPanel = ({ formData, handleChange }: PreferencesPanelProps) => (
  <div>
    <div>
      <div>
        <InputField
          type="textarea"
          label={"Partner Expectation"}
          name={"partner_expectation"}
          value={formData["partner_expectation"]}
          onChange={(e) => handleChange("partner_expectation", e.target.value)}
          className="w-full"
        />
      </div>
    </div>
    <Button label="Save Changes" className="mt-5" />
  </div>
);

export default CriteriaPanel;
