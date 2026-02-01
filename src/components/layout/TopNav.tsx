"use client";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";
import Link from "next/link";
import { GiMatchTip } from "react-icons/gi";
import Navlink from "./Navlink";

export default function TopNav() {
  return (
    <Navbar
      maxWidth="xl"
      className="bg-linear-to-r from-purple-400 to-purple-700"
      classNames={{
        item: [
          "text-xl",
          "text-white",
          "uppercase",
          "data-[active=true]:text-yellow-200",
        ],
      }}
    >
      <NavbarBrand as={Link} href="/">
        <GiMatchTip size={40} className="text-gray-200" />
        <div className="font-bold text-3xl flex">
          <span className="text-gray-900">Next</span>
          <span className="text-gray-200">Match</span>
        </div>
      </NavbarBrand>
      <NavbarContent justify="center">
        <Navlink href="/members" title="Match" />
        <Navlink href="/lists" title="Lists" />
        <Navlink href="/messages" title="Messages" />
      </NavbarContent>
      <NavbarContent justify="end">
        <Button variant="bordered" className="text-white">
          Login
        </Button>
        <Button variant="bordered" className="text-white">
          Register
        </Button>
      </NavbarContent>
    </Navbar>
  );
}
