"use client";
import SignupWithPassword from "../SignupWithPassword";
import GoogleSigninButton from "../GoogleSigninButton";
import Link from "next/link";

export default function Signup() {
  return (
    <>
      <GoogleSigninButton text="Sign in" />
      <div className="my-6 flex items-center justify-center">
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
        <div className="block w-full min-w-fit bg-white px-3 text-center font-medium dark:bg-gray-dark">
          Or sign in with email
        </div>
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
      </div>
      <div>
        <SignupWithPassword />
      </div>
      <div className="mt-6 text-center">
        <p>
          Already have an account?{" "}
          <Link href="/auth/Signin" className="text-primary">
            Sign in
          </Link>
        </p>
      </div>
    </>
  );
}
