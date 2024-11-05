"use server";
import { signIn, signOut } from "@/auth";
export async function doSocialLogin(formData) {
  const action = formData.get("action", { redirectTo: "/admin/dashboard" });
  await signIn(action, { redirectTo: "/admin/dashboard" });
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

// app/api/auth/login/route.js
// "use server";
// import { signIn } from "@/auth";

// // Credential login server action
// export async function doCredentialLogin(formData) {
//   try {
//     const response = await signIn("credentials", {
//       email: formData.get("email"),
//       password: formData.get("password"),
//       redirect: false,
//     });

//     // Check if login was successful
//     if (response?.ok) {
//       return { success: true }; // Indicate success without fetching the session
//     }

//     throw new Error("Credential login failed");
//   } catch (error) {
//     console.error("Login Error:", error);
//     throw new Error(error.message || "An unexpected error occurred");
//   }
// }
