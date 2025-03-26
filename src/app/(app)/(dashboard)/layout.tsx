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
import { useAuth } from "@/context/AuthContext";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser && token) {
      const user = JSON.parse(storedUser);

      if (user.profileCompleted) {
        setIsLoading(false);
      } else {
        if (!pathname.includes("tell-us-more-about-yourself")) {
          showToast("Please complete your profile first", "error");
          router.push("/tell-us-more-about-yourself");
        }
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
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
