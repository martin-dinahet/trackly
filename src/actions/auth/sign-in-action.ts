"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { extractErrorMessage } from "@/lib/error";

const signInSchema = z.object({
  email: z.email().min(1),
  password: z.string().min(1),
});

export async function signInAction(_prevState: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const { success, data } = signInSchema.safeParse({ email, password });
  if (!success) return { ok: false, message: "Invalid input", email, password };

  try {
    await auth.api.signInEmail({ body: { email: data.email, password: data.password } });
    redirect("/dashboard");
  } catch (error) {
    return {
      ok: false,
      message: extractErrorMessage(error),
      email,
      password,
    };
  }
}
