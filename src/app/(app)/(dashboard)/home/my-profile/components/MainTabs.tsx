import { mainTabs } from "@/constants/formConstants";
import { Tab } from "@headlessui/react";

interface MainTabsProps {
  selectedMainTab: number;
  setSelectedMainTab: (index: number) => void;
}
// Main Tabs Component
const MainTabs = ({ selectedMainTab, setSelectedMainTab }: MainTabsProps) => (
  <Tab.List className="flex flex-col pb-2 overflow-x-auto border-r border-gray w-1/5">
    {mainTabs.map((tab, index) => (
      <Tab
        key={tab}
        className={({ selected }: { selected: boolean }) =>
          `px-4 py-2 text-sm font-normal text-left text-normal transition-all outline-none pr-20 ${
            selected ? "text-primary border-r-2 border-primary" : "text-darkBlue"
          }`
        }
      >
        {tab}
      </Tab>
    ))}
  </Tab.List>
);
export default MainTabs;