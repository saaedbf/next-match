"use client";
import { calcualateAge } from "@/lib/utils";
import { Card, CardFooter, Image } from "@heroui/react";
import { Member } from "@prisma/client";
import Link from "next/link";
import React from "react";

type Props = {
  member: Member;
};
export default function MemberCard({ member }: Props) {
  return (
    <Card fullWidth isPressable as={Link} href={`/members/${member.userId}`}>
      <Image
        width={300}
        isZoomed
        alt={member.name}
        src={member.image || "/images/user.png"}
        className="aspect-square object-cover"
      />
      <CardFooter className="bg-[linear-gradient(to_top,rgba(0,0,0,0.8),transparent)] flex absolute bottom-0 z-10 justify-start overflow-hidden ">
        <div className="flex flex-col text-white">
          <span className="font-semibold">
            {member.name},{calcualateAge(member.dateOfBirth)}
          </span>
          <span className="text-sm">{member.city}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
