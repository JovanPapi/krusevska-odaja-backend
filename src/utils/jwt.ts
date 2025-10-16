import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "secret";

/**
 * Service method that generate JWT token based on username, with expiration date of 8h and secret key with HS256 algorithm
 *
 * @param {object} payload - Plain object that contains username and password of user in a key-value pair
 * @return String value that represents JWT generated token
 */
export function generateToken(payload: object): string {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "3h" });
}

/**
 * Service method that validates the token of an admin
 *
 * @param {string} token - Token that needs to be verified
 * @return String value that represents whether the admin token passed verification or not
 */
export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
}
