import { getMemberByUserId } from "@/app/actions/membersAction";
import { CardBody, CardHeader, Divider } from "@heroui/react";
import { notFound } from "next/navigation";
import MemberDetail from "./MemberDetail";

export default async function memberDetailedPage({
  params,
}: {
  params: { userId: string };
}) {
  const { userId } = await params;

  const member = await getMemberByUserId(userId);
  if (!member) return notFound();
  return <MemberDetail member={member} />;
}
