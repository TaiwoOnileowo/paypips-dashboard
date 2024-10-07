"use client";
import { useState } from "react";
import logo from "@/assets/images/logo.png";
import { navLinks } from "@/lib/data/websitedata";
import { FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav
      className={`come-down text-white bg-dark-bg backdrop-filter border border-gray-500 lato   fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-[10px] rounded-md  duration-300 w-[90%] z-[1000] max-w-[756px] 
       `}
    >
      <div className="flex items-center justify-between w-full">
        <a href="https://t.me/paypips_adminBot">
          <Image
            src={logo}
            alt="PayPips logo"
            className="w-10 h-10 object-contain"
          />
        </a>
        <div className="hidden md:flex gap-8 items-center">
          <ul className="flex items-center justify-center gap-8">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  href={`${link.href}`}
                  className={`hover:text-primary-purple transition duration-300 `}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <a href="https://t.me/paypips_adminBot">
            <button className="border border-white text-white py-2 px-4 rounded-md hover:bg-white hover:text-black transition-all ease-in-out duration-300">
              Get Started
            </button>
          </a>
        </div>
        <div className="md:hidden flex items-center">
          <button
            className="text-2xl   text-white focus:outline-none"
            onClick={toggleMenu}
          >
            {menuOpen ? (
              <FiX className="animate-burger-close" />
            ) : (
              <FiMenu className="animate-burger-open" />
            )}
          </button>
        </div>
      </div>
      <div
        className={`fixed right-0 transition-opacity transform ${
          menuOpen ? "flex" : "hidden"
        } md:hidden  flex-col bg-gray-900  p-6 rounded-[20px] items-center justify-center space-y-6`}
      >
        <ul className="flex flex-col items-center justify-center gap-6">
          {navLinks.map((link, index) => (
            <li key={index} className="text-sm xs:text-lg">
              <Link
                href={`${link.href}`}
                onClick={toggleMenu}
                className={`hover:text-highlight transition duration-300  ${
                  menuOpen ? "animate-fade-in" : "animate-fade-out"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <button className="border border-white hover:bg-blue-accent text-white py-2 px-2 text-sm xs:text-base xs:px-4 rounded-md transition-all ease-in-out duration-300">
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default Header;
