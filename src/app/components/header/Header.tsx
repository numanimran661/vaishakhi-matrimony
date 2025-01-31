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
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
  const router = useRouter();
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
            />
          </div>

          {/* Navigation Links */}
          <nav
            className={`navbar lg:flex lg:flex-row lg:static lg:border-0 lg:p-0 p-4 border border-gray flex-col absolute left-0 top-20 bg-white gap-5 text-nowrap transition-all ${
              isMenuOpen ? "flex" : "hidden"
            }`}
          >
            <Link href="/home">
              <span className="text-gray-600 hover:text-gray-800">Home</span>
            </Link>
            <Link href="/about">
              <span className="text-gray-600 hover:text-gray-800">About</span>
            </Link>
            <Link href="/home/success-stories">
              <span className="text-gray-600 hover:text-gray-800">
                Success Stories
              </span>
            </Link>
            <Link href="/membership-plans">
              <span className="text-gray-600 hover:text-gray-800">Pricing</span>
            </Link>
            <Link href="/contact">
              <span className="text-gray-600 hover:text-gray-800">Contact</span>
            </Link>
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
