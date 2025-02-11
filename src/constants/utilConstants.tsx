import Matches from "@/app/(app)/(dashboard)/home/components/Matches";
import NearestMe from "@/app/(app)/(dashboard)/home/components/NearestMe";
import NewJoined from "@/app/(app)/(dashboard)/home/components/NewJoined";
import {
  ActiveStatusIcon,
  ConnectionsIcon,
  MembershipPlansIcon,
  PrivacyPolicyIcon,
  ProfileIcon,
  SuccessStoriesIcon,
} from "@/app/components/common/allImages/AllImages";

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

export const menuItems = [
  {
    icon: <ProfileIcon />,
    label: "Profile",
    path: "/home/my-profile",
  },
  {
    icon: <ActiveStatusIcon />,
    label: "Active Status",
    path: "/home/active-status",
  },
  {
    icon: <ConnectionsIcon />,
    label: "Connections",
    path: "/home/connections",
  },
  {
    icon: <MembershipPlansIcon />,
    label: "Membership Plan",
    path: "/home/membership-plans",
  },
  {
    icon: <SuccessStoriesIcon />,
    label: "Success Stories",
    path: "/home/success-stories",
  },
  {
    icon: <PrivacyPolicyIcon />,
    label: "Privacy & Policy",
    path: "/home/privacy-policy",
  },
];
