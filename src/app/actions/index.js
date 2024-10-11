"use server";
import { signIn, signOut } from "@/auth";
export async function doSocialLogin(formData) {
  const action = formData.get("action", { redirectTo: "/home" });
  await signIn(action, { redirectTo: "/home" });
}
export async function doLogout() {
  await signOut({ redirectTo: "/" });
}

// Credential login server action
export async function doCredentialLogin(formData) {
  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
}
