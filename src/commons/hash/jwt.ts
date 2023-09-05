const jwt = require('jsonwebtoken');




export const generateJwt = (payload: Object): Promise<string> => {
  const secret = process.env.SECRET_KEY_JWT;
  const expiredToken = process.env.SECRET_KEY_EXPIRE_JWT
  return jwt.sign(payload, secret, {expiresIn: expiredToken});
};

export const verifyJwt = (token:string) => {
  const secret = process.env.SECRET_KEY_JWT;
  return jwt.verify(token, secret)
}