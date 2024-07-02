const express = require("express");
const router = express.Router();
const {
  addLike,
  removeLike,
  addWishlist,
  removeWishlist,
  getUserInteractions,
  getUserWishlist,
  getUserLikes,
} = require("../Controller/userInteractionController");
const verifyJWT = require("../Middleware/verifyJWT");

router.post("/likes", verifyJWT, addLike);
router.delete("/likes", verifyJWT, removeLike);
router.post("/wishlist", verifyJWT, addWishlist);
router.delete("/wishlist", verifyJWT, removeWishlist);
router.get(
  "/user-interaction/:userId/:tmdbId/:type",
  verifyJWT,
  getUserInteractions
);
router.get("/:userId/wishlist", verifyJWT, getUserWishlist);

module.exports = router;
