"use client";
import React from "react";
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
} from "@heroui/react";
import ThemeSwitch from "./theme-switch";

export default function Menubar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { theme } = useTheme();

  const menuItems = [
    { text: "Accueil", href: "/" },
    { text: "À propos", href: "/a-propos" },
    { text: "Quiz", href: "/quiz" },
    { text: "Tarifs", href: "/tarifs" },
    { text: "Contact", href: "/contact" },
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
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
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/">
            Accueil
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/a-propos">
            À propos
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/quiz">
            Quiz
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/tarifs">
            Tarifs
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link aria-current="page" href="/contact">
            Contact
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem isActive>
          <Link
            className={`p-2 border-4 rounded-full hover:bg-default-200 ${theme === 'light' ? 'border-light' : 'border-dark'}`}
            href="tel:0651271749"
          >
            06 51 27 17 49
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden sm:flex">
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="items-center mt-8 gap-5 font-medium">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              href={item.href}
              size="lg"
            >
              {item.text}
            </Link>
          </NavbarMenuItem>
        ))}
        <ThemeSwitch />
      </NavbarMenu>
    </Navbar>
  );
}
