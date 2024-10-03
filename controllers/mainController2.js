const { User, List } = require("../model/models");
const bcrypt = require("bcrypt");
require("dotenv").config();
const sendOTP = require("../config/emailresetLink");
const jwt = require("jsonwebtoken");

const passport = require("passport");
require("../controllers/passport")(passport);

const logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
};

async function editTask(req, res) {
  const id = req.params.id;
  const task = await List.findById(id);
  res.render("editTask", {
    title: "Edit Task",
    task,
    id,
    user: req.user,
    url: process.env.LOGO_URL,
  });
}

async function editTaskPut(req, res) {
  const newData = req.body;
  const id = req.params.id;

  const updatedTask = await List.findByIdAndUpdate(id, newData, {
    new: true,
    runValidators: true,
  });
  if (!updatedTask) {
    return res.send("Not found");
  } else {
    res.redirect("/");
  }
}

const getEditProfile = (req, res) => {
  res.render("editProfile", {
    title: "Edit Profile",
    user: req.user,
    url: process.env.LOGO_URL,
  });
};

async function editProfilePut(req, res) {
  let filePath = req.user.profilePic;
  if (req.file) {
    filePath = req.file.path;
  }
  const { username, email } = req.body;
  const id = req.user._id;

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { username, email, profilePic: filePath },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedUser) {
    return res.send("Not found");
  } else {
    res.redirect("/profile");
  }
}

const forgotPassword = (req, res) => {
  res.render("otpvalidation", {
    title: "Forgot Password",
    user: req.user,
    url: process.env.LOGO_URL,
    error: "",
    email: "",
  });
};

async function forgotPasswordPost(req, res) {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.redirect("/register");
  } else {
    sendOTP(email);
    res.render("otpvalidation", {
      title: "Forgot Password",
      user: req.user,
      url: process.env.LOGO_URL,
      error: "Link has been sent to your email",
    });
  }
}

const changePassword = (req, res) => {
  const { token } = req.params;
  try {
    res.render("changePassword", {
      title: "Change Password",
      user: req.user,
      url: process.env.LOGO_URL,
      error: "",
      token,
    });
  } catch (error) {
    res.send(error.message);
  }
};

async function changePasswordPut(req, res) {
  const { token } = req.params;
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  const email = payload.email;
  const { password, newPassword } = req.body;

  if (password !== newPassword) {
    return res.render("changePassword", {
      title: "Change Password",
      user: req.user,
      url: process.env.LOGO_URL,
      error: "password doesn't match",
      token,
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.findOne({ email });
  user.password = hashedPassword;
  user.save();
  res.redirect("/login");
}

const loginAuth = (req, res, next) => {
  const { email, password } = req.body;

  // If email or password is empty, redirect to login page
  if (!email || !password) {
    return res.redirect("/login");
  }
  // Use passport's local strategy for authentication
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.redirect("/login");
    }
    if (!user) {
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.redirect("/login");
      }
      return res.redirect("/");
    });
  })(req, res, next);
};

module.exports = {
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
};
