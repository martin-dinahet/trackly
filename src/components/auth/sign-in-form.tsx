"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signInAction } from "@/actions/auth/sign-in-action";

export function SignInForm() {
  const [state, action, pending] = useActionState(signInAction, null);

  return (
    <form action={action}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend text-xl">Sign In</legend>
        {state?.message && (
          <div className="alert alert-error mb-4">
            <span>{state.message}</span>
          </div>
        )}
        <label className="label" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="input"
          placeholder="john.doe@mail.com"
          defaultValue={state?.email}
          required
        />
        <label className="label" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="input"
          placeholder="●●●●●●●●"
          defaultValue={state?.password}
          required
        />
        <button type="submit" disabled={pending} className="btn btn-neutral mt-4">
          {pending ? <span className="loading loading-spinner" /> : "Sign In"}
        </button>
        <button type="button" className="btn btn-link">
          <Link href="/auth/sign-up">Don't have an account? Sign Up</Link>
        </button>
      </fieldset>
    </form>
  );
}
