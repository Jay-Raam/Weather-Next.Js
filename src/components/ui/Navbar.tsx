"use client";

import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import Image0002 from "@/components/image/Group51.png";
import DarkMode from "../ui/darkmode";
import { AlignJustify } from "lucide-react";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="text-white shadow-md">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          {/* Logo or Brand */}
          <Link href="/">
            <Image
              src={Image0002}
              alt="logo"
              width={200}
              height={53}
              priority={true}
              className="w-[180px] md:w-full h-auto"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-4 text-black dark:text-white">
            <Link href="/search">Search</Link>
            <Link href="/contact">Contact</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex justify-center-items-center gap-3">
            <button
              className="md:hidden flex items-center text-black dark:text-white"
              onClick={handleOpenNav}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <AlignJustify />
            </button>
            <DarkMode />
          </div>

          {/* Mobile Navigation Links */}
          {isOpen && (
            <div
              id="mobile-menu"
              className={`md:hidden absolute top-16 right-0 w-full text-white z-50 transition-transform duration-300 ease-in-out ${
                isOpen ? "translate-y-0" : "-translate-y-full"
              }`}
            >
              <div className="flex flex-col gap-8 items-center justify-center py-2 text-white bg-black  h-[100vh]">
                <Link href="/search" onClick={handleOpenNav}>
                  Search
                </Link>
                <Link href="/contact" onClick={handleOpenNav}>
                  Contact
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
