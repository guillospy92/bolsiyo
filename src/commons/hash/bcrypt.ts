const bcrypt = require('bcrypt')

export const hasPassword = async (plainPassword: string) => {
  return bcrypt.hash(plainPassword, 10);
}

export const verifyPassword = async (plainPassword: string, encryptPassword: string): Promise<boolean> => {
  return bcrypt.compare(plainPassword, encryptPassword);
}