const compression = require("compression");
const express = require("express");
const session = require("express-session");
const { default: helmet } = require("helmet");
const app = express();
require("dotenv").config();
const MemoryStore = require("memorystore")(session);
const rateLimiter = require("./utils/rateLimiter");
const { handleApiRequest } = require("./middlewares/request.middleware");
const { checkNotFoundError } = require("./middlewares/error.middleware");
const { handleErrorResponse } = require("./utils/response");
const cors = require("cors");

// set default timezone
process.env.TZ = "Asia/Ho_Chi_Minh";

// init session
app.use(
  session({
    cookie: { maxAge: parseInt(process.env.SESSION_EXPIRES_IN) },
    store: new MemoryStore({
      checkPeriod: parseInt(process.env.SESSION_EXPIRES_IN),
    }),
    resave: false,
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
  })
);

// init middlewares
app.use(helmet()); // secure app by setting various HTTP headers
app.use(compression()); // compress all responses
app.use(express.json()); // parse application/json
app.use(express.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use("/", express.static(__dirname)); // serve static files
app.disable("x-powered-by"); // disable x-powered-by header
app.set("trust proxy", 1); // trust first proxy
app.use(
  rateLimiter(process.env.RATE_LIMITER_TIME, process.env.RATE_LIMITER_REQUESTS)
); // rate limiter
app.use(
  cors({
    origin: "*",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
); // enable cors

// init database
require("./database/init.database");

// request logger
app.use(handleApiRequest);

// init routes
app.use("/api/v1", require("./routes"));
app.get("/", (req, res) => {
  res.send("Medical Warehouse Management System");
});

// error handler
app.use(checkNotFoundError);
app.use(handleErrorResponse);

module.exports = app;
