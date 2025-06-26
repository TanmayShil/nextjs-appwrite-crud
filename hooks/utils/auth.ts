import { account } from "./appwrite";

export async function getCurrentUser() {
  try {
    return await account.get();
  } catch {
    return null;
  }
}