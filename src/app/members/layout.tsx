import React, { ReactNode } from "react";
import { getMemberByUserId } from "../actions/membersAction";
import MemberSideBar from "./MemberSideBar";
import { notFound } from "next/navigation";
import { Card } from "@heroui/react";
import ClientCard from "./ClientCard";
import { auth } from "@/auth";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session?.user) return notFound();
  const member = await getMemberByUserId(session.user.id);
  if (!member) return notFound();
  return (
    <div className="grid px-10 grid-cols-12 h-[80vh] gap-5">
      <div className="col-span-3">
        <MemberSideBar member={member} />
      </div>
      <div className="col-span-9">
        <ClientCard>{children}</ClientCard>
      </div>
    </div>
  );
}
