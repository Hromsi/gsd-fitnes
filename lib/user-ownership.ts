import { getCurrentUser } from "@/lib/current-user";

export async function requireCurrentUser() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("No authenticated user is available for this request.");
  }

  return user;
}

export async function requireCurrentUserId() {
  const user = await requireCurrentUser();
  return user.id;
}
