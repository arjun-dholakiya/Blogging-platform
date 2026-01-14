const jwt = require("jsonwebtoken");
const {User} = require("../database/models");
const blacklist = require("../utils/tokenBlacklist");

const authMiddleware = async (req,res,next) => {
  try {
    // check if authorization token is available or not
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({error:"Authorization Token Missing"})
    }

    const token = authHeader.split(" ")[1];

    if (await blacklist.exists(token)) {
        return res.status(401).json({error:"Invalid Token"})
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id);
    if (!user) {
        return res.status(401).json({error:"Invalid token: User not found"})
    }

    req.user = user;
    next();

  } catch (error) {
    return res.status(401).json({error:"Unauthorized: "+error.message})
  }
}

module.exports = authMiddleware;