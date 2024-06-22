const asyncHandler = require("express-async-handler");
const User = require("../Model/userModel");
// const generateToken = require("../config/generateToken");
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
    res.status(400);
    throw new Error("please enter all fields");
  }

  const userExits = await User.findOne({ $or: [{ email }, { username }] });

  if (userExits) {
    res.status(400);
    throw new Error("user already exits");
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
    res.status(201).json({
      _id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
      pic: user.pic,
      country: user.country,
      theme: user.theme,
      privacy: user.privacy,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("failed to create new user");
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

    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: user.username,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" }
    );

    const refreshToken = jwt.sign(
      { username: user.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: "None", //cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });

    res.json({
      accessToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        pic: user.pic,
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

module.exports = { registerUser, checkUserName, loginUser, refresh, logout };
