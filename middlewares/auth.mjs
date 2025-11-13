import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'No Authorization header provided' });
  }

  const [scheme, token] = authHeader.split(' ');

  if (!scheme || !token) {
    return res.status(401).json({ message: 'Malformed Authorization header' });
  }

  if (scheme !== 'Bearer') {
    return res.status(401).json({ message: 'Authorization scheme must be Bearer' });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    return res.status(401).json({ message: 'Invalid token' });
  }
};
