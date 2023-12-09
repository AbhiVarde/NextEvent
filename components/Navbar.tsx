"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import { GrClose } from "react-icons/gr";

interface MenuItemProps {
  label: string;
  onClick?: () => void;
}

const MenuItem = ({ label, onClick }: MenuItemProps) => {
  const path = usePathname();
  const encodedLabel = encodeURIComponent(
    label.toLowerCase().replace(/\s+/g, "-")
  );
  const isActive =
    path === `/${encodedLabel}` || path.startsWith(`/${encodedLabel}/`);

  return (
    <div className="inline-block" onClick={onClick}>
      <Link
        href={`/${encodeURIComponent(
          label.toLowerCase().replace(/\s+/g, "-")
        )}`}
        passHref
        className={`text-sm hover:text-[#ededed] ${
          isActive ? "text-[#ededed]" : "text-[#888888]"
        }`}
      >
        {label}
      </Link>
    </div>
  );
};

const Navbar = () => {
  const router = useRouter();
  const menuItems: MenuItemProps[] = [
    { label: "My Events" },
    { label: "Find Events" },
    { label: "Create Events" },
    { label: "Guides" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const renderMenuItems = (items: MenuItemProps[]) => (
    <>
      {items.map((item) => (
        <MenuItem key={item.label} label={item.label} onClick={closeMenu} />
      ))}
    </>
  );

  return (
    <nav className="font-Inter fixed backdrop-filter backdrop-blur w-full bg-black border-b border-[hsla(0,0%,100%,.14)]">
      <div className="container px-4 md:px-8 lg:px-12 mx-0 w-full">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-6">
            <button
              className="text-base sm:text-lg font-medium text-white"
              onClick={() => router.push("/")}
            >
              NextEvent
            </button>
            <div className="hidden md:flex space-x-4">
              {renderMenuItems(menuItems)}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              className="bg-[#ededed] text-sm py-2 px-3 font-medium rounded-md text-black"
              onClick={() => router.push("/login")}
            >
              LogIn
            </button>
            <div className="md:hidden">
              <button
                className="text-white"
                onClick={toggleMenu}
                aria-label="Open Menu"
              >
                {isMenuOpen ? (
                  <GrClose />
                ) : (
                  <FontAwesomeIcon icon={faBarsStaggered} />
                )}
              </button>
            </div>
          </div>
        </div>
        <div
          className={`${
            isMenuOpen
              ? "block absolute w-full rounded-b-xl left-0 bg-black p-4"
              : "hidden"
          } md:hidden`}
        >
          <div className="flex flex-col space-y-4">
            {renderMenuItems(menuItems)}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
