"use server";

import { headers } from "next/headers";
import { auth } from "../auth";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import { IUser, Role } from "@/components/user/userTypes";

type UserId = string;



export const updateUserRole = async (
  userId: UserId,
  role: Role
) => {
  const data = await auth.api.setRole({
    body: {
      userId,
      role,
    },
    headers: await headers(),
  });

  revalidatePath("/dashboard/admin/users");

  return data;
};

export const updateUserProfile = async (
  data: IUser
) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const userId = session?.user?.id;

    if (!userId) {
      return {
        error: true,
        message: "Not authenticated",
      };
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: data.name,
        updatedAt: new Date(),
      },
    });

    revalidatePath("/dashboard/profile");

    return {
      success: true,
    };
  } catch (err) {
    return {
      error: true,
      message:
        err instanceof Error
          ? err.message
          : "Something went wrong",
    };
  }
};