import * as bcrypt from 'bcrypt';

export const hashPassord = async (password: string) => {
  const hash = bcrypt.hash(password, 12);
  return hash;
};

export const compareHash = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};
