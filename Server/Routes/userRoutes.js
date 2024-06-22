const express = require("express");
const {
  registerUser,
  loginUser,
  checkUserName,
  refresh,
  logout,
} = require("../Controller/userController");
const verifyJWT = require("../Middleware/verifyJWT");

const router = express.Router();

router.route("/reg").post(registerUser);
router.route("/check-username").get(checkUserName);
router.route("/login").post(loginUser);
router.get("/profile", verifyJWT, async (req, res) => {
  res.json({
    message: "hi user",
  });
});
router.get("/check", verifyJWT, (req, res) => {
  res.status(200).json({
    message: "Protected route accessed successfully",
  });
});

router.route("/refresh").get(refresh);
router.route("/logout").post(logout);

module.exports = router;
