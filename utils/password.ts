import bcrypt from "bcryptjs";

export async function hashPassword(password: string) {
  const saltRounds = 20;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}
