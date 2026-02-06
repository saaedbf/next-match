"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getAuthUserId } from "./authActions";

export async function toggleLikeMemebr(targrtUserId: string, isLiked: boolean) {
  try {
    const sourceUserId = await getAuthUserId();
    if (!sourceUserId) throw new Error("No user");
    if (isLiked) {
      await prisma.like.delete({
        where: {
          sourceUserId_targrtUserId: {
            sourceUserId,
            targrtUserId,
          },
        },
      });
    } else {
      await prisma.like.create({
        data: {
          sourceUserId,
          targrtUserId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function fetchCurrentUserLikeIds() {
  try {
    const sourceUserId = await getAuthUserId();
    const likeIds = await prisma.like.findMany({
      where: {
        sourceUserId,
      },
      select: {
        targrtUserId: true,
      },
    });
    return likeIds.map((like) => like.targrtUserId);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function fetchLikedMembers(type = "source") {
  try {
    const sourceUserId = await getAuthUserId();
    switch (type) {
      case "source":
        return await fetchSourceLike(sourceUserId);
      case "target":
        return await fetchTargetLike(sourceUserId);
      case "mutual":
        return await fetchMutualLike(sourceUserId);
      default:
        return [];
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function fetchSourceLike(userId: string) {
  const list = await prisma.like.findMany({
    where: {
      sourceUserId: userId,
    },
    select: {
      targetMember: true,
    },
  });
  return list.map((item) => item.targetMember);
}
async function fetchTargetLike(userId: string) {
  const list = await prisma.like.findMany({
    where: {
      targrtUserId: userId,
    },
    select: {
      sourceMember: true,
    },
  });
  return list.map((item) => item.sourceMember);
}
async function fetchMutualLike(userId: string) {
  const likedUsers = await prisma.like.findMany({
    where: {
      sourceUserId: userId,
    },
    select: {
      targrtUserId: true,
    },
  });
  const likedIds = likedUsers.map((item) => item.targrtUserId);
  const list = await prisma.like.findMany({
    where: {
      AND: [{ targrtUserId: userId }, { sourceUserId: { in: likedIds } }],
    },
    select: {
      sourceMember: true,
    },
  });
  return list.map((item) => item.sourceMember);
}
