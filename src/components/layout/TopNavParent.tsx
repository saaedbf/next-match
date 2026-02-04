import TopNav from "./TopNav";
import { auth } from "@/auth";

export default async function TopNavParent() {
  const session = await auth();

  return <TopNav user={session?.user} />;
}
