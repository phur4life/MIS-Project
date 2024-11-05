import { User } from "@/models/User";

export async function findOrCreateUser(email, userData = { role: "user" }) {
  let user = await User.findOne({ email });
  if (!user) {
    user = new User({
      email,
      name: userData.name || "anonymous",
      role: userData.role || "user",
      profileImage: userData.profileImage || "/images/logo/logo.png", // Use profileImage field
      authProvider: "google",
      ...userData,
    });
    await user.save();
  }
  return user;
}
