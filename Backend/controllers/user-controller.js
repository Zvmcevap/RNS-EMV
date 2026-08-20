const users = require("../data/users");


function safeUser(user) {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}


const getMyProfile = async (req, res) => {
  try {
    const user = users.find(
      (user) => user._id === req.user.id
    );

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        user: safeUser(user),
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Error in fetching profile ${error.message}`,
    });
  }
};


const updateMyProfile = async (req, res) => {
  try {
    const user = users.find(
      (user) => user._id === req.user.id
    );

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    const {
      firstName,
      lastName,
      email,
      phone,
    } = req.body;

    if (firstName) {
      user.firstName = firstName;
    }

    if (lastName) {
      user.lastName = lastName;
    }

    if (email) {
      const normalizedEmail = email.toLowerCase();

      const emailInUse = users.some(
        (otherUser) =>
          otherUser._id !== user._id &&
          otherUser.email.toLowerCase() === normalizedEmail
      );

      if (emailInUse) {
        return res.status(400).json({
          status: "fail",
          message: "A user with this email already exists",
        });
      }

      user.email = normalizedEmail;
    }

    if (phone) {
      user.phone = phone;
    }

    res.status(200).json({
      status: "success",
      message: "Profile updated successfully",
      data: {
        user: safeUser(user),
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Error in updating profile ${error.message}`,
    });
  }
};


module.exports = {
  getMyProfile,
  updateMyProfile,
};
