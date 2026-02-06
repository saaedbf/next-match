import React from "react";
import {
  fetchCurrentUserLikeIds,
  fetchLikedMembers,
} from "../actions/likeAction";
import ListTabs from "./ListTabs";

export default async function ListsPage({
  searchParams,
}: {
  searchParams: { type: string };
}) {
  let type = "source";
  const sparams = await searchParams;
  if (sparams?.type) {
    type = sparams?.type;
  }
  console.log(type);
  const likeIds = await fetchCurrentUserLikeIds();
  const memberslike = await fetchLikedMembers(type);
  return (
    <div>
      <ListTabs likeIds={likeIds} members={memberslike} />
    </div>
  );
}
