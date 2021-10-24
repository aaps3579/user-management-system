const jwt = require("jsonwebtoken");

/**
 * Extracts JWT Token from request object
 *
 * @param {express.request} req Request Information.
 * @return {string | null} Token extracted from request or null.
 */

function getTokenFromHeader(req) {
  if (
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Token") ||
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer")
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
}

/**
 * Validate JWT Token. Sends a 403(Not Authorized) response if not authenticated.
 *
 * @param {express.request} req Request Information.
 * @param {express.response} res Response Object.
 * @param {express.response} next Used to passed control to next middleware.
 */

module.exports.isAuthorized = function (req, res, next) {
  const token = getTokenFromHeader(req);
  if (!token) return res.sendStatus(403);
  try {
    const decoded = jwt.verify(token, process.env.key || "sssssh");
    // in production, admin verification should be done with database or environment variables.
    if (decoded.data == "admin") next();
    else res.sendStatus(401);
  } catch (err) {
    return res.sendStatus(401);
  }
};
