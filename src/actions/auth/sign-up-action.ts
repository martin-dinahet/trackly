"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { extractErrorMessage } from "@/lib/error";

const signUpSchema = z.object({
  username: z.string().min(1),
  email: z.email().min(1),
  password: z.string().min(1),
});

export async function signUpAction(_prevState: unknown, formData: FormData) {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const { success, data } = signUpSchema.safeParse({ username, email, password });
  if (!success) return { ok: false, message: "Invalid input", username, email, password };
  try {
    await auth.api.signUpEmail({
      body: {
        name: data.username,
        email: data.email,
        password: data.password,
      },
    });
    redirect("/dashboard");
  } catch (error) {
    return { ok: false, message: extractErrorMessage(error), username, email, password };
  }
}
