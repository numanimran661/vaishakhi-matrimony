import React from "react";
import Link from "next/link";
import Image from "next/image";
import { LockIcon, LogoDark } from "../common/allImages/AllImages";
import Button from "../common/buttons/Button";

const Header: React.FC = () => {
  return (
    <header className="bg-white h-20">
      <div className="w-full fixed top-0 z-50 bg-white border-b border-gray">
        <div className="md:mx-12 lg:mx-20 mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
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
          <nav className="hidden md:flex space-x-8">
            <Link href="/">
              <span className="text-gray-600 hover:text-gray-800">Home</span>
            </Link>
            <Link href="/about">
              <span className="text-gray-600 hover:text-gray-800">About</span>
            </Link>
            <Link href="/success-stories">
              <span className="text-gray-600 hover:text-gray-800">
                Success Stories
              </span>
            </Link>
            <Link href="/pricing">
              <span className="text-gray-600 hover:text-gray-800">Pricing</span>
            </Link>
            <Link href="/contact">
              <span className="text-gray-600 hover:text-gray-800">Contact</span>
            </Link>
          </nav>

          {/* Buttons */}
          <div className="flex items-centers gap-1">
            <Button label="Login" variant="transparent" icon={LockIcon} />
            <Button label="Get Started" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
