"use client";
import { CardHeader, Divider, CardBody, Image } from "@heroui/react";
import { Photo } from "@prisma/client";
import { div } from "framer-motion/client";

export default function PhotosComp({
  photos,
}: {
  photos: Photo[] | null | undefined;
}) {
  return (
    <>
      <CardHeader className="text-2xl font-semibold text-secondary">
        Photos
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="grid grid-cols-5 gap-3">
          {photos &&
            photos?.map((photo) => (
              <div key={photo.id}>
                <Image
                  width={300}
                  height={300}
                  src={photo.url}
                  alt="image"
                  className="object-cover aspect-square"
                />
              </div>
            ))}
        </div>
      </CardBody>
    </>
  );
}
