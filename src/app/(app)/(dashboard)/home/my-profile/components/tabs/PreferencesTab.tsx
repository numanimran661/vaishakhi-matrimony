import { FormData } from "@/types/formTypes";
import { Tab } from "@headlessui/react";
import React from "react";
import SubTabs from "../SubTabs";
import BasicPanel from "../panels/BasicPanel";
import ReligionPanel from "../panels/ReligionPanel";
import LocationPanel from "../panels/LocationPanel";
import EducationPanel from "../panels/EducationPanel";
import CriteriaPanel from "../panels/Criteria";
import { subTabs } from "@/constants/formConstants";

interface PreferencesTabProps {
  selectedSubTab: number;
  setSelectedSubTab: (index: number) => void;
  formData: FormData;
  handleChange: (name: string, value: string) => void;
}

const PreferencesTab = ({
  selectedSubTab,
  setSelectedSubTab,
  formData,
  handleChange,
}: PreferencesTabProps) => {
  return (
    <Tab.Group selectedIndex={selectedSubTab} onChange={setSelectedSubTab}>
      <SubTabs
        selectedSubTab={selectedSubTab}
        setSelectedSubTab={setSelectedSubTab}
        tabsList={subTabs}
      />
      <Tab.Panels className="mt-4">
        {selectedSubTab === 0 && (
          <BasicPanel formData={formData} handleChange={handleChange} />
        )}
        {selectedSubTab === 1 && (
          <ReligionPanel formData={formData} handleChange={handleChange} />
        )}
        {selectedSubTab === 2 && (
          <LocationPanel formData={formData} handleChange={handleChange} />
        )}
        {selectedSubTab === 3 && (
          <EducationPanel formData={formData} handleChange={handleChange} />
        )}
        {selectedSubTab === 4 && (
          <CriteriaPanel formData={formData} handleChange={handleChange} />
        )}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default PreferencesTab;
