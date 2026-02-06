"use client";
import LikeButton from "@/components/LikeButton";
import { calcualateAge } from "@/lib/utils";
import { Card, CardFooter, Image } from "@heroui/react";
import { Member } from "@prisma/client";
import Link from "next/link";
import React from "react";

type Props = {
  member: Member;
  isLikeds: string[];
};
export default function MemberCard({ member, isLikeds }: Props) {
  const isliked = isLikeds.includes(member.userId);
  function preventClickAction(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
  }
  return (
    <Card fullWidth isPressable as={Link} href={`/members/${member.userId}`}>
      <Image
        width={300}
        isZoomed
        alt={member.name}
        src={member.image || "/images/user.png"}
        className="aspect-square object-cover"
      />
      <div onClick={preventClickAction}>
        <div className="absolute top-3 right-3 z-50">
          <LikeButton isLike={isliked} targetUserId={member.userId} />
        </div>
      </div>
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
