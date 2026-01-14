const { User } = require("../../../../database/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Signup
exports.signup = async (data) => {
  const { name, email, password, login_type, social_provider, social_id } = data;

  if (login_type === "normal") {
    // Check if email exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) throw new Error("User is already registered");

    if (!password) throw new Error("Please enter password");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      login_type: "normal",
      login_status: false,
    });

    return { user };
  }

  else if (login_type === "social") {
    if (!social_id || !social_provider) throw new Error("Please enter Social ID & Provider");

    const formattedSocialId = `${social_id}@${social_provider}`;
    const existingSocialUser = await User.findOne({ where: { social_id: formattedSocialId } });
    if (existingSocialUser) throw new Error("User is already registered");

    const user = await User.create({
      name,
      social_id: formattedSocialId,
      social_provider,
      login_type: "social",
      login_status: false,
      ...(email ? { email } : {}), // store email only if provided
    });

    return { user };
  }

  else {
    throw new Error("Invalid login type");
  }
};

// Login
exports.login = async (data) => {
  const { email, password, login_type = "normal", social_provider, social_id } = data;

  let user;

  if (login_type === "normal") {
    if (!email || !password) throw new Error("Email & Password are required");

    user = await User.findOne({ where: { email, login_type: "normal" } });
    if (!user) throw new Error("User not registered");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");
  }

  else if (login_type === "social") {
    if (!social_id || !social_provider) throw new Error("Social ID & Provider are required");

    const formattedSocialId = `${social_id}@${social_provider}`;
    user = await User.findOne({ where: { social_id: formattedSocialId } });
    if (!user) throw new Error("User not registered");
  }

  else {
    throw new Error("Invalid login type");
  }

  // Update login status
  user.login_status = true;
  await user.save();

  // Generate JWT token
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });

  return { user, token };
};
