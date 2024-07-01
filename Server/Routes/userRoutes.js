const express = require("express");
const {
  registerUser,
  loginUser,
  checkUserName,
  refresh,
  logout,
  updateUserProfile,
  deleteUser,
} = require("../Controller/userController");
const verifyJWT = require("../Middleware/verifyJWT");

const router = express.Router();

router.route("/reg").post(registerUser);
router.route("/check-username").post(checkUserName);

router.route("/login").post(loginUser);

router.get("/check", verifyJWT, (req, res) => {
  res.status(200).json({
    message: "Protected route accessed successfully",
  });
});
router.route("/profile").put(verifyJWT, updateUserProfile);
router.route("/delete").delete(verifyJWT, deleteUser);
router.route("/refresh").get(refresh);
router.route("/logout").post(logout);

module.exports = router;
