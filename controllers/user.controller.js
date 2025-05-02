const User = require("../models/User");

exports.users = async (req, res) => {
  let { search } = req.query;
  const userId = req.user.userId; // 👈 get logged-in user's id

  try {
    search = search.trim();
    const query = search
      ? {
          $and: [
            { _id: { $ne: userId } }, // 👈 exclude logged-in user
            {
              $or: [
                { name: { $regex: search, $options: "i" } },
                { phone: { $regex: search, $options: "i" } },
              ],
            },
          ],
        }
      : { _id: { $ne: userId } }; // if no search, show all users except self

    const users = await User.find(query).select("-password");

    res.status(200).json({ users, message: "All users retrived!" });
  } catch (error) {
    console.error("[All Users Error]", error);
    res.status(500).json({ message: "Server error" });
  }
};

//Single User
exports.singleUser = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const user = await User.findOne({ _id: id }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ user: user, message: "User retrived!" });
  } catch (error) {
    console.error("[Single User Error]", error);
    res.status(500).json({ message: "Server error" });
  }
};

// User Profile
exports.profile = async (req, res) => {
  const userId = req.user.userId; // Assuming you store the logged-in user's ID in req.user.userId

  try {
    const user = await User.findById(userId).select("-password");
    res.status(200).json({ user, message: "Profile retrieved!" }); // Corrected to 'user'
  } catch (error) {
    console.error("[Profile Error]", error);
    res.status(500).json({ message: "Server error" });
  }
};
