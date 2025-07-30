import { verifyToken } from "../services/token.js";

export const auth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('Token is ', authHeader);

  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized User' });
  }

  const token = authHeader.split(" ")[1];

  try {
    const email = verifyToken(token);
    req.email = email;
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    res.status(401).json({ message: 'Unauthorized User' });
  }
};
