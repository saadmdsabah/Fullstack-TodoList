const express = require("express");
const router = express.Router();
const isAuthenticated = require("../controllers/isAuthenticated");
const {
  login,
  home,
  register,
  registerPost,
  addTask,
  addTaskPost,
  taskDetails,
  markAsCompleted,
  getProfile,
} = require("../controllers/mainController");

const {
  logoutUser,
  editTask,
  editTaskPut,
  getEditProfile,
  editProfilePut,
  forgotPassword,
  forgotPasswordPost,
  changePassword,
  changePasswordPut,
  loginAuth,
} = require("../controllers/mainController2");

const upload = require("../config/cloudinary");

router.get("/login", login);

router.get("/", isAuthenticated, home);

router.post("/login", loginAuth);

router.get("/register", register);

router.post("/register", registerPost);

router.get("/addtask", isAuthenticated, addTask);

router.post("/addtask", addTaskPost);

router.get("/:id/details", isAuthenticated, taskDetails);

router.delete("/:id/complete", isAuthenticated, markAsCompleted);

router.get("/profile", isAuthenticated, getProfile);

router.get("/logout", isAuthenticated, logoutUser);

router.get("/:id/edit", isAuthenticated, editTask);

router.put("/:id/edit", editTaskPut);

router.get("/edit/profile", isAuthenticated, getEditProfile);

router.put("/edit/profile",isAuthenticated,upload.single("file"),editProfilePut);

router.get("/forgot-password", forgotPassword);

router.post("/forgot-password", forgotPasswordPost);

router.get("/reset-password/:token", changePassword);

router.put("/reset-password/:token", changePasswordPut);

module.exports = router;