"use client";
import { Button, Navbar, NavbarBrand, NavbarContent } from "@heroui/react";
import Link from "next/link";
import { GiMatchTip } from "react-icons/gi";
import Navlink from "./Navlink";
import { Session } from "next-auth";
import UserMenu from "./UserMenu";
type Props = {
  user: Session["user"];
};
export default function TopNav({ user }: Props) {
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
        {user?.email ? (
          <UserMenu user={user} />
        ) : (
          <>
            <Button
              as={Link}
              href="/login"
              variant="bordered"
              className="text-white"
            >
              Login
            </Button>
            <Button
              as={Link}
              href="/register"
              variant="bordered"
              className="text-white"
            >
              Register
            </Button>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
