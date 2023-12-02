"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import { GrClose } from "react-icons/gr";

interface MenuItemProps {
  label: string;
  subMenuItems?: { label: string; link: string }[];
  onClick?: () => void;
}

const MenuItem = ({ label, subMenuItems, onClick }: MenuItemProps) => {
  const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);
  const [path, setPath] = useState("");

  useEffect(() => {
    const currentPath = window.location.pathname;
    setPath(currentPath);
  }, []);

  const handleMouseEnter = () => {
    setIsSubMenuVisible(true);
  };

  const handleMouseLeave = () => {
    setIsSubMenuVisible(false);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {subMenuItems ? (
        <>
          <Link
            href={`/${label.toLowerCase()}`}
            passHref
            className="text-sm text-[#888888] hover:text-[#ededed] "
          >
            {label}
          </Link>
          {isSubMenuVisible && (
            <div className="origin-top-right absolute mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
              <div className="py-1">
                {subMenuItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.link}
                    passHref
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <Link
          href={`/${label.toLowerCase()}`}
          passHref
          className={
            path === label.toLowerCase()
              ? "active"
              : "text-sm text-[#888888] hover:text-[#ededed] "
          }
        >
          {label}
        </Link>
      )}
    </div>
  );
};

const Navbar = () => {
  const router = useRouter();
  const menuItems: MenuItemProps[] = [
    { label: "Dashboard" },
    {
      label: "Events",
      subMenuItems: [
        { label: "Upcoming Events", link: "/events/upcoming" },
        { label: "Past Events", link: "/events/past" },
        { label: "Create New Event", link: "/events/create" },
      ],
    },
    {
      label: "Venues",
      subMenuItems: [
        { label: "All Venues", link: "/venues/all" },
        { label: "Add New Venue", link: "/venues/add" },
      ],
    },
    { label: "About" },
    { label: "Contact" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuIconClasses = "block md:hidden text-white";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="font-Inter fixed backdrop-blur-md w-full bg-black border-b border-[hsla(0,0%,100%,.14)]">
      <div className="container relative mx-auto xs:px-4 md:px-6 lg:px-10">
        <div className="flex justify-between items-center py-5">
          <div className="flex items-center space-x-6">
            <button className="text-base sm:text-lg font-medium text-white">
              NextEvent
            </button>
            <div className="hidden md:block space-x-4 ">
              {menuItems.map((item) => (
                <MenuItem
                  key={item.label}
                  label={item.label}
                  subMenuItems={item.subMenuItems}
                  onClick={closeMenu}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              className="bg-[#ededed] text-sm py-2 px-3 font-medium p-[0px 12px] rounded-md text-black"
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
          } md:hidden `}
        >
          <div className="flex flex-col space-y-4">
            {menuItems.map((item) => (
              <MenuItem
                key={item.label}
                label={item.label}
                subMenuItems={item.subMenuItems}
                onClick={closeMenu}
              />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
