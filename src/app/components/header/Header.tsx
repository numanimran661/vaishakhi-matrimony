"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import {
  CloseIcon,
  DummyProfile,
  FemalePlaceholder,
  Hamburger,
  LockIcon,
  LogoDark,
  MalePlaceholder,
  NotificationsIcon,
  TablerMsgIcon,
} from "../common/allImages/AllImages";
import Button from "../common/buttons/Button";
import { usePathname, useRouter } from "next/navigation";
import NotificationsMenu from "./components/NotificationsMenu";
import ProfileImage from "../common/profileImage/ProfileImage";
import ProfileMenu from "./components/ProfileMenu";

const Header: React.FC = () => {
  // const user = localStorage.getItem("user");
  // const userObj = user ? JSON.parse(user) : null;
  
  const [userObj, setUserObj] = useState<any>({});
  const router = useRouter();
  const pathname = usePathname();
  const notificationsRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const token = Cookies.get("token");

  useEffect(() => {
    // Check if window is defined (i.e., we're in the browser)
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      setUserObj(user ? JSON.parse(user) : null);
    }
  }, []);
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       notificationsRef.current &&
  //       !notificationsRef.current.contains(event.target as Node)
  //     ) {
  //       setShowNotifications(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !menuBtnRef.current?.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLoginClick = () => {
    router.push("/auth/login");
  };

  const handleSignUpClick = () => {
    router.push("/auth/signup");
  };
  return (
    <header className="bg-white h-20">
      <div className="w-full fixed top-0 z-50 bg-white border-b border-gray">
        <div className="mx-auto px-4 py-4 flex justify-between items-center max-w-7xl">
          <div className="flex items-center">
            <div
              ref={menuBtnRef}
              className="text-white lg:hidden"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <CloseIcon alt="close" width={24} height={24} />
              ) : (
                <Hamburger alt="hamburger" width={24} height={24} />
              )}
            </div>
            {/* Logo */}
            <Image
              src={LogoDark}
              alt={"logo"}
              width={150}
              height={130}
              loading="lazy"
              placeholder="blur"
              onClick={() => router.push("/")}
            />
          </div>

          {/* Navigation Links */}
          <nav
            ref={menuRef}
            className={`navbar w-56 lg:w-auto flex lg:flex-row lg:static lg:border-0 lg:p-0 lg:translate-x-0 p-3 pr-5 border border-gray flex-col absolute left-0 top-20 bg-white gap-5 text-nowrap transition-all duration-300 ease-in-out ${
              isMenuOpen
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0 lg:opacity-100"
            }`}
          >
            {[
              { href: "/home", label: "Home" },
              { href: "/about", label: "About" },
              { href: "/home/success-stories", label: "Success Stories" },
              { href: "/membership-plans", label: "Pricing" },
              { href: "/contact", label: "Contact" },
            ].map((item, i) => (
              <Link key={i} href={item.href}>
                <div
                  className={`lg:hover:text-primary lg:p-0 p-2 rounded-lg ${
                    pathname === item.href
                      ? "lg:text-primary lg:bg-opacity-0 lg:font-semibold text-darkBlue bg-orange-100" // Active style
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  {item.label}
                </div>
              </Link>
            ))}
          </nav>

          {!token ? (
            <div className="flex items-centers gap-1">
              <Button
                label="Login"
                variant="transparent"
                icon={LockIcon}
                className="sm:flex hidden"
                onClick={handleLoginClick}
              />
              <Button label="Get Started" onClick={handleSignUpClick} />
            </div>
          ) : (
            <div className="flex gap-3">
              <div>
                <div ref={notificationsRef} className="relative">
                  <div
                    className="bg-gray50 rounded-full p-2 cursor-pointer"
                    onClick={() => setShowNotifications(!showNotifications)}
                  >
                    <NotificationsIcon />
                  </div>
                  <NotificationsMenu
                    isOpen={showNotifications}
                    onClose={() => setShowNotifications(false)}
                  />
                </div>
              </div>
              <div>
                <div
                  className="bg-gray50 rounded-full p-2 cursor-pointer"
                  onClick={() => router.push("/home/messages")}
                >
                  <TablerMsgIcon />
                </div>
              </div>
              <div>
                <div className="relative" ref={profileMenuRef}>
                  <div
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="cursor-pointer"
                  >
                    <ProfileImage
                      src={
                        Array.isArray(userObj?.userImages) && userObj?.userImages[0]
                          ? userObj?.userImages[0]
                          : userObj?.gender === "male"
                          ? MalePlaceholder.src
                          : FemalePlaceholder.src
                      }
                      alt="profile image"
                    />
                  </div>
                  <ProfileMenu
                    isOpen={isProfileMenuOpen}
                    onClose={() => setIsProfileMenuOpen(false)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
