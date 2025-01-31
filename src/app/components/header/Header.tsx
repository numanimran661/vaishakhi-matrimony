"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CloseIcon,
  Hamburger,
  LockIcon,
  LogoDark,
} from "../common/allImages/AllImages";
import Button from "../common/buttons/Button";
import { usePathname, useRouter } from "next/navigation";

const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <div>
              <button
                className="text-white lg:hidden"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <Image src={CloseIcon} alt="close" width={24} height={24} />
                ) : (
                  <Image
                    src={Hamburger}
                    alt="hamburger"
                    width={24}
                    height={24}
                  />
                )}
              </button>
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

          {/* Buttons */}
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
        </div>
      </div>
    </header>
  );
};

export default Header;
