const authServices = require("../services/authServices");

/* Signup */
exports.signup = async (req,res) => {
    try {
        const user = await authServices.signup(req.body);
        res.status(200).json({
            message:"User Registered Successfully",
            user
        });
    } catch (error) {
        res.status(401).json({error:error.message})
    }
}

/* Login */
exports.login = async (req,res) => {
  try {
    const {user,token} = await authServices.login(req.body);
    res.status(201).json({
        message:"login Successfully Done",
        user,
        token
    })
  } catch (error) {
    res.status(401).json({error:error.message})
  }
}

