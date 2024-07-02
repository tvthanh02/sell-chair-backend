const express = require("express");

const { authorize } = require("../middleware/auth");
const {
  getCurrentUser,
  register,
  login,
  logout,
} = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.get("/current", authorize, async (req, res) => {
  const { payload } = req.headers;

  const userCurrent = await getCurrentUser(payload.id);

  res.status(200).json({
    data: userCurrent,
  });
});

authRouter.post("/register", async (req, res) => {
  try {
    await register(req.body);
    res.status(201).json({
      message: "Register Account Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      error: 1,
      message: "Internal Server Error. Register Failure",
    });
  }
});

authRouter.post("/login", async (req, res) => {
  const [accessToken, refreshToken] = await login(req.body);
  !accessToken &&
    !refreshToken &&
    res.status(500).json({
      error: 1,
      message: "Internal Server Error. Login Failure",
    });

  res.status(200).json({
    accessToken,
    refreshToken,
    message: "Login Successfully!",
  });
});

authRouter.post("/logout", authorize, async (req, res) => {
  try {
    await logout(req.body);
    res.status(200).json({
      message: "Logout Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      error: 1,
      message: "Internal Server Error. Logout Failure",
    });
  }
});

module.exports = authRouter;
