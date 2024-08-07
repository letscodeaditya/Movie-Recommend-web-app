const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const userRoutes = require("./Routes/userRoutes");
const userInterest = require("./Routes/userInterest");
const cookieParser = require("cookie-parser");

dotenv.config();
connectDB();
const app = express();

// CORS configuration
const corsOptions = {
  origin: ["http://localhost:5173", "https://watch-movies-tau.vercel.app"],
  credentials: true, // Allow credentials (cookies, authorization headers)
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/userint", userInterest);

const port = process.env.PORT;
app.listen(port);
