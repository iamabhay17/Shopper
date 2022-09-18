const express = require("express");
const {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} = require("../controller/userController");
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

//get users

router.route("/").get(protect, admin, getUsers);

//login route
router.post("/login", authUser);

//profie route
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

//register route
router.post("/register", registerUser);

//delete user
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

module.exports = router;
