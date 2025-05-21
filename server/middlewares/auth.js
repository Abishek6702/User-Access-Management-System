const jwt = require("jsonwebtoken");

// verify to token 
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// chek the role is admin and give only acces to those
exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "Admin") return res.sendStatus(403);
  next();
};

// chek the role is manager and give only acces to those
exports.isManager = (req, res, next) => {
  if (req.user.role !== "Manager") return res.sendStatus(403);
  next();
};