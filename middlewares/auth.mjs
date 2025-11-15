import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'No Authorization header' });

  const [scheme, token] = authHeader.split(' ');
  if (scheme !== 'Bearer' || !token) return res.status(401).json({ message: 'Invalid Authorization header' });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ message: err.name === 'TokenExpiredError' ? 'Token expired' : 'Invalid token' });
  }
};