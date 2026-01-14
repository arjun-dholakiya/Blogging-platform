const crypto = require("crypto");

exports.generateOTP = () => {
  const otp = crypto.randomBytes(4).readUInt32BE(0) % 900000 + 100000;
  return otp.toString();
}
