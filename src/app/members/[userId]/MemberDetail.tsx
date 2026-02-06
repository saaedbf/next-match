"use client";
import { CardHeader, Divider, CardBody } from "@heroui/react";
import { Member } from "@prisma/client";

export default function MemberDetail({ member }: { member: Member }) {
  return (
    <>
      <CardHeader className="text-2xl font-semibold text-secondary">
        Profile
      </CardHeader>
      <Divider />
      <CardBody>{member.description}</CardBody>
    </>
  );
}
