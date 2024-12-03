import { headers } from "next/headers"

export interface AuthUser {
  id: string
  // email: string;
  // name: string;
  // role: 'user' | 'admin';
}

export function getServerUser(): AuthUser | null {
  const headersList = headers()

  const userId = headersList.get("x-user-id")
  if (!userId) return null

  return {
    id: userId,
  }
}
