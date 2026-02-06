import { fetchCurrentUserLikeIds } from "../actions/likeAction";
import { getMembers } from "../actions/membersAction";
import MemberCard from "./MemberCard";

async function membersPage() {
  const members = await getMembers();
  const isLikeds = await fetchCurrentUserLikeIds();
  console.log(members);
  return (
    <div className="px-8 mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-8">
      {members &&
        members.map((mem) => {
          return <MemberCard member={mem} key={mem.id} isLikeds={isLikeds} />;
        })}
    </div>
  );
}

export default membersPage;
