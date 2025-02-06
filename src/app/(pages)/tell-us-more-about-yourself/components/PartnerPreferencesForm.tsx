import RadioField from "@/app/components/common/inputFields/RadioInput";
import SelectField from "@/app/components/common/inputFields/SelectField";
import { dropdownOptions } from "@/constants/dummyConstants";
import { basicPanelFormFields } from "@/constants/formConstants";
import { useState } from "react";

const tabs = [
  { id: 1, label: "Basic Info" },
  { id: 2, label: "Education & Career" },
  { id: 3, label: "Lifestyle & Habits" },
  { id: 4, label: "Location & Religion" },
  { id: 5, label: "Family Details" },
];

interface PartnerPreferencesProps {
  values: any;
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const PartnerPreferences: React.FC<PartnerPreferencesProps> = ({
  values,
  handleInputChange,
  handleSelectChange,
}) => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="w-full mx-auto">
      <h2 className="text-2xl font-bold text-darkBlue">Partner Preferences</h2>
      <div className="flex items-center justify-between mt-4 mb-6 w-full">
        {tabs.map((tab, index) => (
          <div key={tab.id} className="flex items-center w-full last:w-auto">
            <button
              className={`
          w-10 h-10 flex items-center justify-center rounded-full border text-sm font-semibold transition
          ${
            activeTab >= tab.id
              ? "bg-primary text-white border-primary"
              : "border-2 border-gray text-normal bg-gray50"
          }
        `}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.id}
            </button>
            {index !== tabs.length - 1 && (
              <div
                className={`h-1 flex-grow mx-2 transition-all ${
                  activeTab >= tab.id ? "bg-primary" : "bg-gray50"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 1 && <BasicInfo />}
        {activeTab === 2 && <ReligionInfo />}
        {activeTab === 3 && <LifestyleHabits />}
        {activeTab === 4 && <LocationReligion />}
        {activeTab === 5 && <FamilyDetails />}
      </div>
    </div>
  );
};
export default PartnerPreferences;

function BasicInfo() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Basic Info</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {basicPanelFormFields.map((item, i) => (
          <div
            key={i}
            className={item.isRange ? "grid grid-cols-2 gap-2 items-end" : ""}
          >
            <SelectField
              label={item.label}
              name={item.name}
              // value={formData[item.name]}
              // onChange={(e) => handleChange(item.name, e.target.value)}
              options={dropdownOptions}
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
                  // value={formData[`${item.name}To`]}
                  // onChange={(e) => handleChange(`${item.name}To`, e.target.value)}
                  options={dropdownOptions}
                  className={`max-w-48`}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ReligionInfo() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Religion Info</h3>
      <div className="grid grid-cols-2 gap-4">
        <SelectField
          label={"Religion"}
          name={"religion"}
          // value={formData[item.name]}
          // onChange={(e) => handleChange(item.name, e.target.value)}
          options={dropdownOptions}
          className="w-full"
        />
        <div className="mt-4">
          <label className="mb-2 text-sm text-darkBlue font-semibold leading-5">
            Caste
          </label>
          <div className="flex flex-wrap gap-4 mt-3">
            <RadioField name="caste" label="Brahmin" />

            <RadioField name="caste" label="Kshatriya" />

            <RadioField name="caste" label="Vaishya" />

            <RadioField name="caste" label="Shudra" />
          </div>
        </div>
        <SelectField
          label={"Mother Tongue"}
          name={"mother_tongue"}
          // value={formData[item.name]}
          // onChange={(e) => handleChange(item.name, e.target.value)}
          options={dropdownOptions}
          className="w-full"
        />
        <SelectField
          label={"Manglik"}
          name={"manglik"}
          // value={formData[item.name]}
          // onChange={(e) => handleChange(item.name, e.target.value)}
          options={dropdownOptions}
          className="w-full"
        />
        <SelectField
          label={"Star"}
          name={"star"}
          // value={formData[item.name]}
          // onChange={(e) => handleChange(item.name, e.target.value)}
          options={dropdownOptions}
          className="w-full"
        />
        <SelectField
          label={"Dosh"}
          name={"dosh"}
          // value={formData[item.name]}
          // onChange={(e) => handleChange(item.name, e.target.value)}
          options={dropdownOptions}
          className="w-full"
        />
        <SelectField
          label={"Birth Place"}
          name={"birth_place"}
          // value={formData[item.name]}
          // onChange={(e) => handleChange(item.name, e.target.value)}
          options={dropdownOptions}
          className="w-full"
        />
        <SelectField
          label={"Birth Time"}
          name={"Birth Time"}
          // value={formData[item.name]}
          // onChange={(e) => handleChange(item.name, e.target.value)}
          options={dropdownOptions}
          className="w-full"
        />
      </div>
    </div>
  );
}

function LifestyleHabits() {
  return (
    <div>
      <h3 className="text-lg font-semibold">Lifestyle & Habits</h3>
    </div>
  );
}

function LocationReligion() {
  return (
    <div>
      <h3 className="text-lg font-semibold">Location & Religion</h3>
    </div>
  );
}

function FamilyDetails() {
  return (
    <div>
      <h3 className="text-lg font-semibold">Family Details</h3>
    </div>
  );
}
