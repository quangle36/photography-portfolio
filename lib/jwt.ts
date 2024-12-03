import { IUser } from "@/models/User"
import * as jose from "jose"

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key"
)
const alg = "HS256"

export interface JWTPayload {
  sub: string
}

export const signToken = async (user: IUser): Promise<string> => {
  return new jose.SignJWT({ sub: user._id as string })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(JWT_SECRET)
}

export const verifyToken = async (token: string): Promise<JWTPayload> => {
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET)
    return payload as JWTPayload
  } catch (error) {
    throw new Error("Invalid token")
  }
}
