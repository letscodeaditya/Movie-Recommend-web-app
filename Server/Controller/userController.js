const asyncHandler = require("express-async-handler");
const User = require("../Model/userModel");
const generateToken = require("../config/generateToken");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    gender,
    pic,
    username,
    country,
    privacy,
    theme,
  } = req.body;

  if (
    !name ||
    !email ||
    !password ||
    !gender ||
    !username ||
    !country ||
    !privacy ||
    !theme
  ) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    const userExits = await User.findOne({ $or: [{ email }, { username }] });

    if (userExits) {
      return res
        .status(400)
        .json({ message: "Email already exists or username is already taken" });
    }

    const user = await User.create({
      name,
      password,
      email,
      gender,
      pic,
      username,
      country,
      privacy,
      theme,
    });

    if (user) {
      return res.status(201).json({ message: "Account created successfully" });
    } else {
      return res.status(400).json({ message: "Failed to create new user" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const checkUserName = asyncHandler(async (req, res) => {
  const { username } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.json({
        available: false,
        message: "username already taken. plz try another",
      });
    } else {
      res.json({ available: true, message: "Username is available." });
    }
  } catch (error) {
    console.error("Error checking username availability:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //remove this
  console.log(`Login attempt with email: ${email}`);

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    console.error("User not found");
    res.status(401);
    throw new Error("Invalid email");
  }

  // Compare password
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (isPasswordMatch) {
    console.log("Password match, generating token...");

    // const accessToken = jwt.sign(
    //   {
    //     username: user.username,
    //   },
    //   process.env.ACCESS_TOKEN_SECRET,
    //   { expiresIn: "30m" }
    // );

    const refreshToken = jwt.sign(
      { username: user.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      jwt: refreshToken,
      user: {
        userId: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        pic: user.pic,
        country: user.country,
        privacy: user.privacy,
      },
    });
  } else {
    console.error("Invalid password");
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const refresh = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      const foundUser = await User.findOne({
        username: decoded.username,
      }).exec();

      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: foundUser.username,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      res.json({ accessToken });
    })
  );
};

const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Cookie cleared" });
};

const updateUserProfile = asyncHandler(async (req, res) => {
  const {
    name,
    username,
    oldPassword,
    newPassword,
    country,
    privacy,
    userId,
    email,
    pic,
  } = req.body;

  // Check if the new username is already taken by another user
  const existingUser = await User.findOne({ username });
  if (existingUser && existingUser.email !== email) {
    res.status(400);
    throw new Error("Username is already taken.");
  }

  // Find the user by ID
  const user = await User.findOne({ email });
  if (!user) {
    console.error("User not found");
    res.status(401);
    throw new Error("Invalid email");
  }

  // Compare password
  const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

  if (isPasswordMatch) {
    user.name = name || user.name;
    user.username = username || user.username;
    user.country = country || user.country;
    user.privacy = privacy || user.privacy;
    user.pic = pic || user.pic;

    if (newPassword) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      name: updatedUser.name,
      email: email,
      pic: updatedUser.pic,
      country: updatedUser.country,
      privacy: updatedUser.privacy,
    });
  } else {
    console.error("Invalid password");
    res.status(401);
    throw new Error("password");
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = {
  registerUser,
  checkUserName,
  loginUser,
  refresh,
  logout,
  updateUserProfile,
  deleteUser,
};
