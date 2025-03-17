// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return <section>{children}</section>
// }

"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { showToast } from "@/app/components/ui/CustomToast";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);

      if (user.profileCompleted) {
        setIsLoading(false);
      } else {
        showToast("Please complete your profile first", 'error')
        router.push("/tell-us-more-about-yourself");
        setIsLoading(false);
      }
    }
  }, [pathname]);

  //   if (isLoading) {
  //     return (
  //       <div className="flex items-center justify-center h-screen">
  //         Loading...
  //       </div>
  //     );
  //   }

  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          Loading...
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default ProtectedLayout;
