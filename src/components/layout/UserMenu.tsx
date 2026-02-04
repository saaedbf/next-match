import { siginOutUser } from "@/app/actions/authActions";

import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@heroui/react";
import { Session } from "next-auth";
import Link from "next/link";
import React from "react";
type Props = {
  user: Session["user"];
};
export default function UserMenu({ user }: Props) {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <DropdownTrigger>
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform cursor-pointer"
              color="secondary"
              name={user?.name || "userName"}
              size="sm"
              src={user?.image || "/images/user.png"}
            />
          </DropdownTrigger>
        </DropdownTrigger>
      </DropdownTrigger>
      <DropdownMenu variant="flat" aria-label="User Actions">
        <DropdownSection showDivider>
          <DropdownItem
            key="username"
            isReadOnly
            as="span"
            className="h-14 flex flex-row"
            aria-label="username"
          >
            Signed In As {user?.name}
          </DropdownItem>
        </DropdownSection>
        <DropdownItem key="edit" as={Link} href="/membres/edit">
          Edit Profile
        </DropdownItem>
        <DropdownItem
          key="delete"
          color="danger"
          onClick={async () => siginOutUser()}
        >
          Sign Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
