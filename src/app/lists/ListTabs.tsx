"use client";

import { Tab, Tabs } from "@heroui/react";
import { Member } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Key, useTransition } from "react";
import MemberCard from "../members/MemberCard";
import LoadingComponent from "@/components/LoadingComponent";

type Props = {
  members: Member[];
  likeIds: string[];
};
export default function ListTabs({ members, likeIds }: Props) {
  const serachParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const [isPending, startTransition] = useTransition();
  const tabs = [
    { id: "source", label: "Member I Liked" },
    { id: "target", label: "Member Liked Me" },
    { id: "mutual", label: "Member Liked Mutual" },
  ];
  function handleTabChange(key: Key) {
    startTransition(() => {
      const params = new URLSearchParams(serachParams);
      params.set("type", key.toString());
      router.replace(`${pathName}?${params.toString()}`);
    });
  }
  return (
    <div className="flex w-full flex-col mt-10 gap-5 px-10">
      <Tabs
        aria-label="Like tabs"
        items={tabs}
        color="secondary"
        onSelectionChange={(key) => handleTabChange(key)}
      >
        {(item) => (
          <Tab key={item.id} title={item.label}>
            {isPending ? (
              <LoadingComponent />
            ) : (
              <>
                {members.length > 0 ? (
                  <>
                    <div className="px-8 mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-8">
                      {members &&
                        members.map((mem) => {
                          return (
                            <MemberCard
                              member={mem}
                              key={mem.id}
                              isLikeds={likeIds}
                            />
                          );
                        })}
                    </div>
                  </>
                ) : (
                  <>No Member</>
                )}
              </>
            )}
          </Tab>
        )}
      </Tabs>
    </div>
  );
}
