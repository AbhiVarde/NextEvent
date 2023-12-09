"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const links = [
    { label: "Contact us", href: "/contact" },
    { label: "Help", href: "/help" },
    { label: "About", href: "/about" },
  ];

  const currentPath = usePathname();

  return (
    <div className="w-full bg-black text-white border-t border-[hsla(0,0%,100%,.14)]">
      <footer className="container mx-auto px-4 py-5 md:px-8 lg:px-12 flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col items-center md:flex-row md:items-start text-center md:text-left mb-4 md:mb-0">
          <p className="text-sm text-gray-500 font-medium mb-2 md:mb-0">
            &copy; {new Date().getFullYear()} NextEvent, Inc.
          </p>
          <div className="flex items-center md:ml-4">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
            <small className="text-green-500 text-sm font-medium">
              All systems normal.
            </small>
          </div>
        </div>
        <div className="flex gap-5 text-[#888888] text-sm mb-4 md:mb-0">
          {links.map(({ label, href }, index) => (
            <Link
              key={index}
              href={href}
              passHref
              className={
                currentPath === href ? "text-white" : "hover:text-white"
              }
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="flex items-center divide-x gap-3 text-[#888888]">
          <Link
            href="https://github.com/your-github-url"
            target="_blank"
            rel="noopener noreferrer"
            className=" hover:text-white"
          >
            <FaGithub />
          </Link>
          <Link
            href="https://twitter.com/your-twitter-handle"
            target="_blank"
            rel="noopener noreferrer"
            className="pl-3 hover:text-white"
          >
            <FaXTwitter />
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
