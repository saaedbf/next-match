import { getMemberPhotosByUserId } from "@/app/actions/membersAction";
import PhotosComp from "./PhotosComp";

export default async function PhotosPage({
  params,
}: {
  params: { userId: string };
}) {
  const { userId } = await params;
  const photos = await getMemberPhotosByUserId(userId);
  console.log(userId);
  console.log(photos);
  return <PhotosComp photos={photos} />;
}
