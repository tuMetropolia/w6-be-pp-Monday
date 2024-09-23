const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  console.log(authorization);
  console.log(authorization.split(" "));
  console.log(authorization.split(" ")[0]);
  console.log(authorization.split(" ")[1]);
  console.log("We get the headers back as a string, split the string into 2 elements and add it to an array. The token is the second element of the array");

  

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
// We create 'user' field in the request, transform JWT token into a user object ID
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
