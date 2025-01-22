import Matches from "@/app/(app)/(dashboard)/home/components/Matches";
import NearestMe from "@/app/(app)/(dashboard)/home/components/NearestMe";
import NewJoined from "@/app/(app)/(dashboard)/home/components/NewJoined";

export const homeTabs = [
    {
      title: "New Join",
      component: NewJoined,
    },
    {
      title: "Matches",
      component: Matches,
    },
    {
      title: "Nearest Me",
      component: NearestMe,
    },
  ];