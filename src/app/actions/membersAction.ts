"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Photo } from "@prisma/client";

export async function getMembers() {
  const session = await auth();
  if (!session) return null;
  try {
    return prisma.member.findMany({
      where: {
        NOT: {
          id: session?.user?.id,
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
}
export async function getMemberByUserId(userId: string) {
  try {
    if (!userId) return null;
    return prisma.member.findUnique({
      where: {
        userId: userId,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
export async function getMemberPhotosByUserId(userId: string) {
  try {
    if (!userId) return null;
    const member = await prisma.member.findUnique({
      where: {
        userId: userId,
      },
      select: {
        photos: true,
      },
    });
    if (!member) return null;
    return member.photos.map((p) => p) as Photo[];
  } catch (error) {
    console.log(error);
  }
}
