const {User, List} = require("../model/models");
const sortUserListByDeadline = require("../controllers/sorting");
const bcrypt = require("bcrypt");
require("dotenv").config();

const passport = require("passport");
require("../controllers/passport")(passport);

const login = (req, res) => {
  res.render("login", {
    title: "Login",
    user: req.user,
    url: process.env.LOGO_URL,
  });
};

async function home(req, res){
  const userFound = await User.findOne({ email: req.user.email });
  await userFound.populate("list");
  const userList = userFound.list;
  sortUserListByDeadline(userList);

  res.render("home", {
    list: userList,
    title: "Home",
    user: req.user,
    url: process.env.LOGO_URL,
  });
};

const register = (req, res) => {
  res.render("register", {
    title: "Sign up",
    user: req.user,
    url: process.env.LOGO_URL,
  });
};

async function registerPost(req, res){
  const { username, email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (userFound) {
      res.redirect("/login");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        username,
        email,
        password: hashedPassword,
      });
      await user.save();
      res.redirect("/login");
    }
  } catch (error) {
    console.log(error);
  }
};

const addTask = (req, res) => {
  res.render("add", {
    title: "Add Task",
    user: req.user,
    url: process.env.LOGO_URL,
  });
};

async function addTaskPost(req, res) {
  const email = req.user.email;
  const userFound = await User.findOne({ email });
  if (!userFound) {
    return res.redirect("/login");
  }
  const { task, description, deadline, priority } = req.body;
  const newList = new List({
    task,
    description,
    deadline,
    priority,
  });
  await newList.save();
  userFound.list.push(newList._id);
  await userFound.save();
  res.redirect("/");
};

async function taskDetails(req, res) {
  const id = req.params.id;
  const task = await List.findById(id);
  res.render("displayTask", {
    task,
    title: "Task Details",
    user: req.user,
    url: process.env.LOGO_URL,
  });
};

async function markAsCompleted(req, res) {
  const id = req.params.id;
  try {
    // Delete the task from the List collection
    await List.findByIdAndDelete(id);

    // Fetch the user without populating the list
    const userFound = await User.findOne({ email: req.user.email });

    // Find the index of the task ID to remove from the user's list
    const index = userFound.list.findIndex(
      (listItemId) => listItemId.toString() === id
    );

    // Only proceed if the index is valid
    if (index !== -1) {
      userFound.list.splice(index, 1); // Remove the task from the list
      await userFound.save(); // Save the updated user document
    }
  } catch (error) {
    console.log(error.message);
  }
  res.redirect("/");
};

async function getProfile(req, res) {
  const userid = req.user._id;
  const userFound = await User.findById(userid).populate("list");
  const userList = userFound.list;
  sortUserListByDeadline(userList);

  // Corrected condition to check if the userList is empty
  if (userList.length === 0) {
    return res.render("profile", {
      user: req.user,
      nextdeadline: "No tasks found",
      error: true,
      title: "Profile",
      user: req.user,
      url: process.env.LOGO_URL,
    });
  }
  res.render("profile", {
    user: req.user,
    nextdeadline: userList[0].deadline,
    error: false,
    title: "Profile",
    user: req.user,
    url: process.env.LOGO_URL,
  });
};

module.exports = {
  login,
  home,
  register,
  registerPost,
  addTask,
  addTaskPost,
  taskDetails,
  markAsCompleted,
  getProfile,
};
