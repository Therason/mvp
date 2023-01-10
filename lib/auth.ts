import { hash, compare } from "bcryptjs";

// hashing helper function
export async function hashPass(pass: string) {
  const hashed = await hash(pass, 12);
  return hashed;
}

// password verification helper function
export async function verify(pass: string, hashed: string) {
  const matches = await compare(pass, hashed);
  return matches;
}
