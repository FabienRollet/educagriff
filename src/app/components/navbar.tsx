"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@heroui/react";
import ThemeSwitch from "./theme-switch";

export default function Menubar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isEmailPopoverOpen, setIsEmailPopoverOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const menuItems = [
    { text: "Accueil", href: "/" },
    { text: "Qui-suis-je ?", href: "/a-propos" },
    { text: "Quiz", href: "/quiz" },
    { text: "Tarifs", href: "/tarifs" },
    { text: "Contact", href: "/contact" },
    {
      text: "",
      href: "https://www.instagram.com/educagriff/",
      external: true,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.10-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
        </svg>
      ),
    },
    {
      text: "",
      href: "https://www.facebook.com/profile.php?id=61569164953323",
      external: true,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current"
        >
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
        </svg>
      ),
    },
  ];

  const handleEmailCopy = () => {
    navigator.clipboard.writeText("educagriff@gmail.com").then(() => {
      if (window.innerWidth <= 768) {
        alert("Email copié !");
      } else {
        setIsEmailPopoverOpen(true);
        setTimeout(() => setIsEmailPopoverOpen(false), 2000);
      }
    });
  };

  const EmailPopoverContent = () => (
    <div className="p-1 rounded-full border-1 border-black text-black bg-white">
      Email copié !
    </div>
  );

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className={`${
        resolvedTheme === "light" ? "bg-[--background]" : "bg-[--foreground]"
      }`}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link className="flex" color="foreground" href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={50}
              height={50}
              className="mr-2"
            />
            <p className="font-bold text-inherit md:hidden lg:block">
              Educagriff
            </p>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.href}>
            <Link
              color="foreground"
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              className="relative group flex items-center gap-2"
            >
              {item.icon && <span className="mr-0">{item.icon}</span>}
              {item.text}
              <span
                className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-current 
                           transition-all duration-300 ease-in-out 
                           group-hover:w-full"
              />
            </Link>
          </NavbarItem>
        ))}
        <NavbarItem className="flex">
          <Popover
            isOpen={isEmailPopoverOpen}
            onOpenChange={setIsEmailPopoverOpen}
            showArrow={true}
            color="default"
          >
            <PopoverTrigger>
              <button
                className="hover:opacity-75 m-0 transition-opacity"
                onClick={handleEmailCopy}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                </svg>
              </button>
            </PopoverTrigger>
            <PopoverContent>
              <EmailPopoverContent />
            </PopoverContent>
          </Popover>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem isActive>
          <Link
            className={`p-2 border-4 rounded-full hover:bg-default-200 ${
              resolvedTheme === "light" ? "border-light" : "border-dark"
            }`}
            href="tel:0651271749"
          >
            06 51 27 17 49
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden sm:flex">
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="items-center gap-5 pt-10 font-medium">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color="foreground"
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              className="relative group flex text-lg items-center gap-2"
            >
              {item.icon && <span className="mr-0">{item.icon}</span>}
              {item.text}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <button
            className="hover:opacity-75 m-0 transition-opacity flex items-center gap-2 text-lg"
            onClick={handleEmailCopy}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
            </svg>
          </button>
        </NavbarMenuItem>
        <ThemeSwitch />
      </NavbarMenu>
    </Navbar>
  );
}
