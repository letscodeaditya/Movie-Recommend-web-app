const Like = require("../Model/likeModel");
const Wishlist = require("../Model/wishListModel");

const addLike = async (req, res) => {
  const { userId, tmdbId, type } = req.body;
  try {
    const newLike = new Like({ userId, tmdbId, type });
    await newLike.save();
    res.status(201).json(newLike);
  } catch (error) {
    console.error("Error creating like:", error); // Log the error
    res.status(500).json({ error: error.message });
  }
};

const removeLike = async (req, res) => {
  const { userId, tmdbId, type } = req.body;
  try {
    await Like.findOneAndDelete({ userId, tmdbId, type });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addWishlist = async (req, res) => {
  const { userId, tmdbId, type } = req.body;
  try {
    const newWishlist = new Wishlist({ userId, tmdbId, type });
    await newWishlist.save();
    res.status(201).json(newWishlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeWishlist = async (req, res) => {
  const { userId, tmdbId, type } = req.body;
  try {
    await Wishlist.findOneAndDelete({ userId, tmdbId, type });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserWishlist = async (req, res) => {
  const { userId } = req.params;

  try {
    const wishlist = await Wishlist.find({ userId });
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserLikes = async (req, res) => {
  const { userId } = req.params;

  try {
    const likes = await Like.find({ userId });
    res.status(200).json(likes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserInteractions = async (req, res) => {
  const { userId, tmdbId, type } = req.params;
  try {
    const liked = await Like.findOne({ userId, tmdbId, type });
    const wishlisted = await Wishlist.findOne({ userId, tmdbId, type });

    if (!liked && !wishlisted) {
      return res.status(404).json({
        message: "No interactions found for this user.",
        liked: false,
        wishlisted: false,
      });
    }

    res.status(200).json({
      liked: !!liked,
      wishlisted: !!wishlisted,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addLike,
  removeLike,
  addWishlist,
  removeWishlist,
  getUserWishlist,
  getUserInteractions,
};
