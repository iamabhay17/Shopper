const Product = require("../model/productModel");
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../util/generateTokens");

//user login auth
//POST /api/users/login
// public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    if (await bcrypt.compare(password, user.password)) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ msg: "wrong password" });
      throw new Error("Invalid Email or Password");
    }
  } else {
    res.status(401).json({ msg: "user not found" });
    throw new Error("User Not Found");
  }
});

//user  profile
//GET /api/users/profule
// private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ msg: "not found" });
    throw new Error();
  }
});

//user  register
//GET /api/users/register
// public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400).json({ msg: "user already exist" });
    throw new Error();
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ msg: "invalid user data" });
    throw new Error();
  }
});

//update user  profile
//PUT /api/users/profile
// private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ msg: "not found" });
    throw new Error();
  }
});

//get Users
//Get /api/users/
// private/admin

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});
//delete Users
//Get /api/users/
// private/admin

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "User Removed" });
  } else {
    res.status(401);
    throw new Error("USer not found");
  }
});

//get User by id
//Get /api/users/:id
// private/admin

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(401);
    throw new Error("USer not found");
  }
});

//update user  profile
//PUT /api/users/:id
// private/admin

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401).json({ msg: "not found" });
    throw new Error();
  }
});

module.exports = {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  updateUser,
  getUserById,
  deleteUser,
};
