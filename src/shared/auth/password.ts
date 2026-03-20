import bcrypt from "bcrypt";

const DEFAULT_SALT_ROUNDS = 10;

function getSaltRounds(): number {
  const value = process.env.BCRYPT_SALT_ROUNDS;

  if (!value) {
    return DEFAULT_SALT_ROUNDS;
  }

  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed < 4 || parsed > 15) {
    return DEFAULT_SALT_ROUNDS;
  }

  return parsed;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, getSaltRounds());
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
