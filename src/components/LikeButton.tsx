import { toggleLikeMemebr } from "@/app/actions/likeAction";
import { useRouter } from "next/navigation";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
type Props = {
  targetUserId: string;
  isLike: boolean;
};
export default function LikeButton({ targetUserId, isLike }: Props) {
  const router = useRouter();
  async function toggleLike() {
    await toggleLikeMemebr(targetUserId, isLike);
    router.refresh();
  }
  return (
    <div
      onClick={toggleLike}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-0.5 -right-0.5"
      />
      <AiFillHeart
        size={24}
        className={isLike ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
}
