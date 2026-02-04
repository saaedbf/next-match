"use server";
import bcrypt from "bcryptjs";
import {
  registerSchema,
  RegisterSchema,
} from "./../../lib/schemas/registerSchema";
import { prisma } from "@/lib/prisma";
import { ActionResult } from "@/types";
import { User } from "@prisma/client";
import { LoginSchema } from "@/lib/schemas/loginSchema";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function registerUser(
  data: RegisterSchema,
): Promise<ActionResult<User>> {
  try {
    const validated = registerSchema.safeParse(data);
    if (!validated.success) {
      return { status: "error", error: validated.error.issues };
    }
    const { name, email, password } = data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) return { status: "error", error: "User AlReady Exists!" };

    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashPassword: hashedPassword,
      },
    });
    return { status: "success", data: user };
  } catch (error) {
    return { status: "error", error: "Error:" };
    console.log(error);
  }
}
export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}
export async function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id } });
}
export async function siginOutUser() {
  await signOut({ redirectTo: "/" });
}
export async function siginInUser(
  data: LoginSchema,
): Promise<ActionResult<string>> {
  try {
    const { email, password } = data;
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { status: "success", data: "Logged In" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { status: "error", error: "InvalidCredential" };
        default:
          return { status: "error", error: "Somthing Wrong" };
      }
    }
    return { status: "error", error: "Somthing else Wrong:" };
    console.log(error);
  }
}
