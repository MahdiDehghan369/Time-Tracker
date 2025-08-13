const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = new express();
const errorHandler = require("./utils/errorHandler");

const authRouter = require("./modules/auth/auth.routes");
const timeEntryRouter = require("./modules/time-entry/timeEntry.routes");
const reportRouter = require("./modules/report/report.routes");
const userRouter = require("./modules/user/user.routes");

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
  try {
    return res.status(404).json({
      success: true,
      message: "Welcome to ClockIn :)",
    });
  } catch (error) {
    next(error);
  }
});

app.use("/auth", authRouter);
app.use("/time-entries", timeEntryRouter);
app.use("/reports", reportRouter);
app.use("/users", userRouter);

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "Not Found :(",
  });
});

app.use(errorHandler);

module.exports = app;
