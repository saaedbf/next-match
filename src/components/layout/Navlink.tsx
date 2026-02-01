"use client";
import { NavbarItem } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  title: string;
};

export default function Navlink({ href, title }: Props) {
  const path = usePathname();
  return (
    <NavbarItem isActive={path === href} as={Link} href={href}>
      {title}
    </NavbarItem>
  );
}
