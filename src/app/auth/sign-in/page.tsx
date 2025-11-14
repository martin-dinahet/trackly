import { redirect } from "next/navigation";
import { SignInForm } from "@/components/auth/sign-in-form";
import { isAuthenticated } from "@/lib/check-authenticated";

export default async function SignInPage() {
  if (await isAuthenticated()) return redirect("/dashboard");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <SignInForm />
    </div>
  );
}
