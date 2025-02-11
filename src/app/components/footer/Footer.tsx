import React from "react";
import Image from "next/image";
import { AppStore, GooglePlay, LogoLight } from "../common/allImages/AllImages";

const Footer = () => {
  return (
    <footer className="mx-auto bg-darkBlue text-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap">
          {/* Logo and Description */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-8 sm:text-left text-center lg:mb-0 pe-5">
            <div className="flex items-center sm:justify-normal justify-center mb-4">
              <Image src={LogoLight} alt="Logo" width={150} height={100} />
            </div>
            <p className="text-sm">
              Discover your ideal partner with Vaishakhi Matrimony, the top
              online platform for finding love.
            </p>
            <div className="flex space-x-4 mt-4">
              {/* Social Media Icons */}
              <a href="#" className="text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="text-white">
                <i className="fab fa-pinterest-p"></i>
              </a>
              <a href="#" className="text-white">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" className="text-white">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-8 lg:mb-0">
            <h3 className="font-bold mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-300 hover:text-white">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-300 hover:text-white">
                  Success Stories
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-300 hover:text-white">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-300 hover:text-white">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-8 lg:mb-0">
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-300 hover:text-white">
                  Help & Support
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-300 hover:text-white">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-300 hover:text-white">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Apps */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <h3 className="font-bold mb-4">Apps</h3>
            <div className="flex flex-col gap-3">
              <span>
                <Image
                  src={GooglePlay}
                  alt="Google Play"
                  width={135}
                  height={40}
                />
              </span>
              <span>
                <Image src={AppStore} alt="App Store" width={135} height={40} />
              </span>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-sm">
          &copy; Copyright 2024, All Rights Reserved By{" "}
          <span className="font-bold">Vaishakhi Matrimony.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
