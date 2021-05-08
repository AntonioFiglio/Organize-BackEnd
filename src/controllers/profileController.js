const User = require("../model/User");
const bcript = require("bcryptjs");

module.exports = {
  async changePassword(req, res) {
    const { email, currentPassword, newPassword } = req.body;

    try {
      if (!email || !currentPassword || !newPassword) {
        return res.status(400).json({ message: "Missing arguments" });
      }

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      if (!(await bcript.compare(currentPassword, user.password))) {
        return res.status(400).json({ message: "Invalid password" });
      }

      user.password = newPassword;
      await user.save();

      user.password = undefined;

      return res.status(200).json({ message: "sucess", user });
    } catch (err) {
      return res.status(400).json({ message: "Failed change password" });
    }
  },
};
