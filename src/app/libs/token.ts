import jwt from 'jsonwebtoken';
export const generateToken = (
  data: object,
  privateKey: string,
  expiresIn: string,
) => jwt.sign(data, privateKey, { expiresIn } as jwt.SignOptions);

export const verifyToken = (token: string, publicKey: string) =>
  jwt.verify(token, publicKey);
